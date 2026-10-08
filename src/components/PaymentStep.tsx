import { PAYMENT_NOTE } from "@/lib/payment";

/**
 * Final-step payment summary on the enquiry form. While PAYMENT_MODE is
 * "email-link" it only shows the chosen fee and what happens next; a Stripe
 * Checkout button can be added here once Stripe is live.
 */
export default function PaymentStep({ feeLabel }: { feeLabel: string }) {
  return (
    <div id="payment-step" className="rounded-xl border border-[#1C1917]/10 bg-[#EEF4FA] p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-[#1C1917]/55">Your match fee</p>
      <p className="mt-1 font-semibold text-[#1C1917]">{feeLabel || "Not chosen yet"}</p>
      <p className="mt-2 text-sm leading-relaxed text-[#1C1917]/75">{PAYMENT_NOTE}</p>
    </div>
  );
}
