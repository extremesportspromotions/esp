import { stripeSignatureOk } from "@/lib/shop";
import { handleEvent } from "@/lib/shopWebhook";

/**
 * Stripe webhook (checkout.session.completed) for paid shop sessions.
 *  1. Kit lines go to the fulfilment partner (drafts unless PRINTFUL_CONFIRM_ORDERS=true).
 *     Smart casual (made-to-order, hand-fulfilled) lines are NEVER sent there.
 *  2. Every order sends Matthew a Telegram alert and a record email to enquiries@,
 *     independently of each other and of step 1.
 *  3. The customer gets a thank-you email, once the order is safely recorded.
 * Retries: Stripe re-sends the event on a non-2xx. We ask for a retry only if the
 * partner order failed, or if a manual order reached neither alert channel. The
 * customer email is only sent on the attempt that returns 200, so it goes once.
 * Needs STRIPE_WEBHOOK_SECRET, PRINTFUL_API_TOKEN, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, RESEND_API_KEY.
 */
export const runtime = "nodejs";

/** Images in emails load from the live site. */
const SITE = "https://www.extremesportspromotions.com";

export async function POST(req: Request): Promise<Response> {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response("not configured", { status: 503 });
  const payload = await req.text();
  if (!stripeSignatureOk(payload, req.headers.get("stripe-signature") ?? "", secret)) return new Response("bad signature", { status: 400 });
  return handleEvent(JSON.parse(payload), SITE);
}
