import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { merch, type Merch, type MerchVariant } from "@/components/shop/merch";

/** Server-side helpers for the ESP kit shop: prices, delivery rates and fulfilment orders. */

const PF = "https://api.printful.com";
export const STORE_ID = process.env.PRINTFUL_STORE_ID || "18950600";

const byId = new Map<number, { p: Merch; v: MerchVariant }>();
for (const p of merch) for (const v of p.variants) byId.set(v.id, { p, v });
export const lookup = (id: number) => byId.get(id);

export type Line = { id: number; qty: number };

/** Validates a cart from the browser. Prices are never taken from the browser. */
export function cleanLines(raw: unknown): Line[] | null {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 30) return null;
  const out = new Map<number, number>();
  for (const r of raw) {
    const id = Number((r as Line)?.id);
    const qty = Math.floor(Number((r as Line)?.qty));
    if (!byId.has(id) || byId.get(id)!.v.oos || !(qty >= 1 && qty <= 10)) return null;
    out.set(id, Math.min(10, (out.get(id) ?? 0) + qty));
  }
  return [...out].map(([id, qty]) => ({ id, qty }));
}

/** Compact cart for Stripe metadata (500 char limit): "id:qty,id:qty". */
export const packLines = (lines: Line[]) => lines.map((l) => `${l.id}:${l.qty}`).join(",");
export function unpackLines(s: string): Line[] {
  return s.split(",").map((x) => x.split(":").map(Number)).filter(([id, q]) => byId.has(id) && q > 0).map(([id, qty]) => ({ id, qty }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function pf(path: string, init: RequestInit = {}): Promise<{ ok: boolean; status: number; data: any }> {
  const token = process.env.PRINTFUL_API_TOKEN;
  if (!token) return { ok: false, status: 503, data: null };
  const res = await fetch(`${PF}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "X-PF-Store-Id": STORE_ID, "Content-Type": "application/json", ...(init.headers ?? {}) },
    cache: "no-store",
  });
  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data };
}

/** Cheapest UK delivery rate for the cart, in pence. */
export async function ukDelivery(lines: Line[]): Promise<{ pence: number; name: string; id: string } | null> {
  const items = lines.map((l) => ({ variant_id: byId.get(l.id)!.v.vid, quantity: l.qty }));
  const r = await pf("/shipping/rates", {
    method: "POST",
    body: JSON.stringify({ recipient: { country_code: "GB" }, items, currency: "GBP", locale: "en_GB" }),
  });
  const rates = (r.data?.result ?? []) as { id: string; name: string; rate: string; currency: string }[];
  const gbpRates = rates.filter((x) => x.currency === "GBP").sort((a, b) => Number(a.rate) - Number(b.rate));
  const best = gbpRates.find((x) => x.id === "STANDARD") ?? gbpRates[0];
  if (!r.ok || !best) {
    console.error("Delivery rate error", r.status);
    return null;
  }
  return { pence: Math.round(Number(best.rate) * 100), name: best.name, id: best.id };
}

/** Printful external_id: up to 32 chars, so a stable hash of the Stripe session id. */
export const externalId = (sessionId: string) => createHash("sha256").update(sessionId).digest("hex").slice(0, 32);

export type Recipient = {
  name: string; address1: string; address2?: string; city: string; state_code?: string; country_code: string; zip: string; email?: string; phone?: string;
};

/** Creates the fulfilment order. Draft unless PRINTFUL_CONFIRM_ORDERS=true. */
export async function createOrder(opts: { sessionId: string; recipient: Recipient; lines: Line[]; shippingId?: string; shippingPence?: number }) {
  const confirm = process.env.PRINTFUL_CONFIRM_ORDERS === "true";
  const body = {
    external_id: externalId(opts.sessionId),
    shipping: opts.shippingId ?? "STANDARD",
    recipient: opts.recipient,
    items: opts.lines.map((l) => ({ sync_variant_id: l.id, quantity: l.qty, retail_price: (byId.get(l.id)!.v.pence / 100).toFixed(2) })),
    retail_costs: opts.shippingPence != null ? { currency: "GBP", shipping: (opts.shippingPence / 100).toFixed(2) } : undefined,
  };
  return pf(`/orders?confirm=${confirm ? "true" : "false"}`, { method: "POST", body: JSON.stringify(body) });
}

export const deleteDraftOrder = (id: number | string) => pf(`/orders/${id}`, { method: "DELETE" });

/** Verifies a Stripe-Signature header (v1 HMAC-SHA256, 5 minute tolerance). */
export function stripeSignatureOk(payload: string, header: string, secret: string, now = Date.now()): boolean {
  const parts = Object.fromEntries(header.split(",").map((kv) => kv.split("=")).filter((x) => x.length === 2).map(([k, v]) => [k.trim(), v.trim()]));
  const sigs = header.split(",").filter((kv) => kv.trim().startsWith("v1=")).map((kv) => kv.trim().slice(3));
  const t = Number(parts.t);
  if (!t || Math.abs(now / 1000 - t) > 300 || sigs.length === 0) return false;
  const expected = Buffer.from(createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex"));
  return sigs.some((s) => s.length === expected.length && timingSafeEqual(Buffer.from(s), expected));
}
