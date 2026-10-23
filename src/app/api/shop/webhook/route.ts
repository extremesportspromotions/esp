import { createOrder, stripeSignatureOk, unpackLines, type Recipient } from "@/lib/shop";

/**
 * Stripe webhook (checkout.session.completed). Creates the fulfilment order for
 * paid ESP kit sessions. Orders are drafts unless PRINTFUL_CONFIRM_ORDERS=true.
 * Needs STRIPE_WEBHOOK_SECRET (the endpoint's whsec_ signing secret) and PRINTFUL_API_TOKEN.
 */
export const runtime = "nodejs";

type Addr = { line1?: string; line2?: string | null; city?: string; state?: string | null; postal_code?: string; country?: string };
type Session = {
  id: string;
  payment_status?: string;
  metadata?: Record<string, string>;
  customer_details?: { name?: string; email?: string; phone?: string; address?: Addr };
  shipping_details?: { name?: string; address?: Addr };
  collected_information?: { shipping_details?: { name?: string; address?: Addr } };
};

export async function POST(req: Request): Promise<Response> {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response("not configured", { status: 503 });
  const payload = await req.text();
  if (!stripeSignatureOk(payload, req.headers.get("stripe-signature") ?? "", secret)) return new Response("bad signature", { status: 400 });

  const event = JSON.parse(payload) as { type?: string; data?: { object?: Session } };
  const s = event.data?.object;
  if (event.type !== "checkout.session.completed" || !s || s.metadata?.kind !== "shop") return Response.json({ received: true });
  if (s.payment_status !== "paid") return Response.json({ received: true, skipped: "unpaid" });

  const ship = s.collected_information?.shipping_details ?? s.shipping_details;
  const a = ship?.address;
  const lines = unpackLines(s.metadata?.items ?? "");
  if (!a?.line1 || !a.postal_code || lines.length === 0) {
    console.error("Shop order missing address or items", s.id);
    return new Response("missing data", { status: 500 });
  }
  const recipient: Recipient = {
    name: ship?.name || s.customer_details?.name || "Customer",
    address1: a.line1,
    address2: a.line2 || undefined,
    city: a.city || "",
    country_code: a.country || "GB",
    zip: a.postal_code,
    email: s.customer_details?.email,
    phone: s.customer_details?.phone,
  };

  const r = await createOrder({
    sessionId: s.id,
    recipient,
    lines,
    shippingId: s.metadata?.shipping_id,
    shippingPence: Number(s.metadata?.shipping_pence) || undefined,
  });
  if (!r.ok) {
    // A repeat delivery of the same event hits the duplicate external_id; treat as done.
    const msg = String(r.data?.error?.message ?? r.data?.result ?? "");
    if (/external.?id/i.test(msg) && /exist|already|unique/i.test(msg)) return Response.json({ received: true, duplicate: true });
    console.error("Order create failed", r.status, s.id);
    return new Response("order failed", { status: 502 });
  }
  return Response.json({ received: true, order: r.data?.result?.id, status: r.data?.result?.status });
}
