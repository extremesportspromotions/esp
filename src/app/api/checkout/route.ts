import { MATCH_FEE_PRICES } from "@/lib/matchFees";

/**
 * Creates a Stripe Checkout Session for the ESP match fee, after the enquiry
 * has been sent. The price comes from MATCH_FEE_PRICES, never the browser.
 * Needs STRIPE_SECRET_KEY (a restricted key with Checkout Sessions: Write).
 */
export const runtime = "nodejs";

const ALLOWED_HOSTS = new Set([
  "www.extremesportspromotions.com",
  "extremesportspromotions.com",
  "esp-lemon.vercel.app",
  "localhost:3000",
]);
const EMAIL_RE = /^[^\s@<>"]{1,64}@[^\s@<>"]{1,190}\.[a-z]{2,24}$/i;

const hits = new Map<string, number[]>();
function limited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

function textOf(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request): Promise<Response> {
  const origin = req.headers.get("origin") ?? "";
  let url: URL;
  try {
    url = new URL(origin);
  } catch {
    return Response.json({ ok: false }, { status: 403 });
  }
  if (!ALLOWED_HOSTS.has(url.host)) return Response.json({ ok: false }, { status: 403 });

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return Response.json({ ok: false, reason: "not-configured" }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const fee = MATCH_FEE_PRICES[textOf(body.fee, 40)];
  const email = textOf(body.email, 254);
  if (!fee || !EMAIL_RE.test(email)) return Response.json({ ok: false }, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(`ip:${ip}`, 8, 10 * 60_000)) return Response.json({ ok: false }, { status: 429 });

  const base = url.host.startsWith("localhost") ? `http://${url.host}` : `https://${url.host}`;
  const name = textOf(body.name, 100);
  const sport = textOf(body.sport, 60);
  const phone = textOf(body.phone, 40);

  const form = new URLSearchParams({
    mode: "payment",
    customer_email: email,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "gbp",
    "line_items[0][price_data][unit_amount]": String(fee.pence),
    "line_items[0][price_data][product_data][name]": `ESP match fee: ${fee.name}`,
    "line_items[0][price_data][product_data][description]":
      "Finding and introducing your UK coach. Training is billed separately by the coach or club.",
    success_url: `${base}/enquiry/paid?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/enquiry/payment-cancelled`,
    "metadata[name]": name,
    "metadata[sport]": sport,
    "metadata[phone]": phone,
    "metadata[fee]": fee.name,
    "payment_intent_data[description]": `ESP match fee: ${fee.name}${sport ? ` (${sport})` : ""}${name ? ` for ${name}` : ""}`,
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
