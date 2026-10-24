import { variantImg, variantName } from "@/components/shop/merch";
import { cleanLines, lookup, packLines, ukDelivery } from "@/lib/shop";

/**
 * Creates a Stripe Checkout Session for ESP kit. Prices come from merch.ts and
 * UK delivery from the fulfilment partner's live rates, never the browser.
 * Needs STRIPE_SECRET_KEY and PRINTFUL_API_TOKEN.
 */
export const runtime = "nodejs";

const ALLOWED_HOSTS = new Set([
  "www.extremesportspromotions.com",
  "extremesportspromotions.com",
  "esp-lemon.vercel.app",
  "localhost:3000",
]);

const hits = new Map<string, number[]>();
function limited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > max;
}

export async function POST(req: Request): Promise<Response> {
  let url: URL;
  try {
    url = new URL(req.headers.get("origin") ?? "");
  } catch {
    return Response.json({ ok: false }, { status: 403 });
  }
  if (!ALLOWED_HOSTS.has(url.host)) return Response.json({ ok: false }, { status: 403 });

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return Response.json({ ok: false, reason: "not-configured" }, { status: 503 });

  const body = (await req.json().catch(() => null)) as { items?: unknown } | null;
  const lines = cleanLines(body?.items);
  if (!lines) return Response.json({ ok: false, reason: "items" }, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(`shop:${ip}`, 12, 10 * 60_000)) return Response.json({ ok: false }, { status: 429 });

  const delivery = await ukDelivery(lines);
  if (!delivery) return Response.json({ ok: false, reason: "delivery" }, { status: 502 });

  const base = url.host.startsWith("localhost") ? `http://${url.host}` : `https://${url.host}`;
  const form = new URLSearchParams({
    mode: "payment",
    success_url: `${base}/shop/thanks?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/shop`,
    "shipping_address_collection[allowed_countries][0]": "GB",
    "phone_number_collection[enabled]": "true",
    "shipping_options[0][shipping_rate_data][type]": "fixed_amount",
    "shipping_options[0][shipping_rate_data][display_name]": "UK delivery",
    "shipping_options[0][shipping_rate_data][fixed_amount][amount]": String(delivery.pence),
    "shipping_options[0][shipping_rate_data][fixed_amount][currency]": "gbp",
    "metadata[kind]": "shop",
    "metadata[items]": packLines(lines),
    "metadata[shipping_id]": delivery.id,
    "metadata[shipping_pence]": String(delivery.pence),
    "payment_intent_data[description]": "ESP kit order",
  });
  lines.forEach((l, i) => {
    const { p, v } = lookup(l.id)!;
    form.set(`line_items[${i}][quantity]`, String(l.qty));
    form.set(`line_items[${i}][price_data][currency]`, "gbp");
    form.set(`line_items[${i}][price_data][unit_amount]`, String(v.pence));
    form.set(`line_items[${i}][price_data][product_data][name]`, `ESP ${p.name}${variantName(p, v) ? ` (${variantName(p, v)})` : ""}`);
    form.set(`line_items[${i}][price_data][product_data][images][0]`, `https://www.extremesportspromotions.com${variantImg(p, v)}`);
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
  });
  const data = (await res.json().catch(() => null)) as { url?: string; error?: { type?: string; code?: string } } | null;
  if (!res.ok || !data?.url) {
    console.error("Stripe error", res.status, data?.error?.type ?? "", data?.error?.code ?? "");
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true, url: data.url });
}
