/**
 * How the ESP match fee is collected. The fee is paid up front, when the
 * student enquires.
 *
 * "stripe-checkout": after the enquiry is sent, the form asks /api/checkout
 * for a Stripe Checkout Session and sends the student there to pay by card.
 * If Stripe isn't available (for example STRIPE_SECRET_KEY isn't set), the
 * form falls back to "we'll email you a secure payment link".
 *
 * "email-link": the form only records the chosen fee; ESP emails the student
 * a secure payment link by hand.
 */
export type PaymentMode = "email-link" | "stripe-checkout";

// Stripe switches on when the publishable key is set in Vercel (it's read at
// build time, so redeploy after setting it). Without it, the email-link flow stays.
export const PAYMENT_MODE: PaymentMode = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? "stripe-checkout"
  : "email-link";

export const REFUND_LINE = "Full refund if we can't find you a coach within 14 days.";

export const PAYMENT_NOTE =
  PAYMENT_MODE === "stripe-checkout"
    ? `Next, you pay securely by card with Stripe. We start finding your coach as soon as it's paid. ${REFUND_LINE}`
    : `Next, we'll email you a secure payment link. We start finding your coach as soon as it's paid. ${REFUND_LINE}`;

/** Label for the enquiry email so ESP knows what to do next. */
export function paymentStatusLabel(): string {
  return PAYMENT_MODE === "email-link"
    ? "Not paid yet — email the student a secure payment link"
    : "Sent to Stripe Checkout — check Stripe for the payment";
}

export type PaymentDetails = { name: string; email: string; phone: string; sport: string };

/**
 * Called after the enquiry has been sent. Returns true when the browser is
 * being sent to Stripe Checkout, false when ESP should email a payment link.
 */
export async function startPayment(feeBand: string, details: PaymentDetails): Promise<boolean> {
  if (PAYMENT_MODE === "email-link") return false;
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fee: feeBand, ...details }),
    });
    const data: unknown = await res.json().catch(() => null);
    const url =
      typeof data === "object" && data !== null && "url" in data ? String((data as { url: unknown }).url) : "";
    if (!res.ok || !url.startsWith("https://checkout.stripe.com/")) return false;
    window.location.assign(url);
    return true;
  } catch {
    return false;
  }
}
