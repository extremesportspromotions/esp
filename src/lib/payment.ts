/**
 * How the ESP match fee is collected. The fee is paid up front, when the
 * student enquires.
 *
 * "email-link": the form only records the chosen fee; ESP then emails the
 * student a secure payment link by hand. This is the mode until Stripe is live.
 *
 * "stripe-checkout": once Stripe is set up, add an API route that creates a
 * Checkout Session for the chosen fee and switch PAYMENT_MODE here. The form
 * calls startPayment() after the enquiry is sent, so that is the only hook
 * that needs filling in.
 */
export type PaymentMode = "email-link" | "stripe-checkout";

export const PAYMENT_MODE: PaymentMode = "email-link";

export const REFUND_LINE = "Full refund if we can't find you a coach within 14 days.";

export const PAYMENT_NOTE = `Next, we'll email you a secure payment link. We start finding your coach as soon as it's paid. ${REFUND_LINE}`;

/** Label for the enquiry email so ESP knows what to do next. */
export function paymentStatusLabel(): string {
  return PAYMENT_MODE === "email-link"
    ? "Not paid yet — email the student a secure payment link"
    : "Sent to Stripe Checkout";
}

/**
 * Called after the enquiry has been sent. In "email-link" mode there is
 * nothing to do. In "stripe-checkout" mode this will redirect to Checkout.
 */
export async function startPayment(_feeBand: string): Promise<void> {
  if (PAYMENT_MODE === "email-link") return;
  // Stripe Checkout goes here once ESP's Stripe account is live.
}
