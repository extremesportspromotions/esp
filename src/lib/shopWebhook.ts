import { createOrder, splitLines, unpackLines, type Recipient } from "@/lib/shop";
import { buildOrder, sendCustomerEmail, sendOrderAlerts, type PartnerStatus, type ShopSession } from "@/lib/orderMail";

/** Handles a verified Stripe event for the shop. See src/app/api/shop/webhook/route.ts. */
export type ShopEvent = { type?: string; data?: { object?: ShopSession & { payment_status?: string } } };

export async function handleEvent(event: ShopEvent, origin: string): Promise<Response> {
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
  const { auto, made } = splitLines(lines);

  // 1. Partner order, kit lines only.
  let partner: PartnerStatus = { state: "none" };
  if (auto.length) {
    const recipient: Recipient = {
      name: ship?.name || s.customer_details?.name || "Customer",
      address1: a.line1,
      address2: a.line2 || undefined,
      city: a.city || "",
      country_code: a.country || "GB",
      zip: a.postal_code,
      email: s.customer_details?.email,
      phone: s.customer_details?.phone || undefined,
    };
    try {
      const r = await createOrder({
        sessionId: s.id,
        recipient,
        lines: auto,
        shippingId: s.metadata?.shipping_id || undefined,
        shippingPence: Number(s.metadata?.shipping_pence) || undefined,
      });
      if (r.ok) partner = { state: "created", id: r.data?.result?.id, status: r.data?.result?.status };
      else {
        // A repeat delivery of the same event hits the duplicate external_id; treat as done.
        const msg = String(r.data?.error?.message ?? r.data?.result ?? "");
        partner = /external.?id/i.test(msg) && /exist|already|unique/i.test(msg) ? { state: "duplicate" } : { state: "failed" };
        if (partner.state === "failed") console.error("Order create failed", r.status, s.id);
      }
    } catch {
      console.error("Order create threw", s.id);
      partner = { state: "failed" };
    }
  }

  // 2. Alerts, for every order (they report the partner result too).
  const order = buildOrder(s, lines, partner);
  const alerts = await sendOrderAlerts(order).catch(() => ({ telegram: { ok: false, status: 0 }, email: { ok: false, status: 0 } }));

  if (partner.state === "failed") return new Response("order failed", { status: 502 });
  if (made.length && !alerts.telegram.ok && !alerts.email.ok) return new Response("alerts failed", { status: 502 });

  // 3. Customer thank-you; a failure here is logged only.
  const thanks = await sendCustomerEmail(order, origin).catch(() => ({ ok: false, status: 0 }));

  return Response.json({
    received: true,
    order: partner.id,
    status: partner.status,
    duplicate: partner.state === "duplicate" || undefined,
    manual: made.length,
    alerts: { telegram: alerts.telegram.ok, email: alerts.email.ok },
    customerEmail: thanks.ok,
  });
}
