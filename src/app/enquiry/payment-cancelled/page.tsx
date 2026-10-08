import type { Metadata } from "next";
import EnquiryNotice from "@/components/EnquiryNotice";

export const metadata: Metadata = {
  title: "Payment not finished | Extreme Sports Promotions",
  robots: { index: false, follow: false },
};

export default function PaymentCancelledPage() {
  return (
    <EnquiryNotice
      title="Your payment wasn't finished"
      lines={[
        "Your enquiry has been sent, but your match fee hasn't been paid. We'll email you a secure payment link so you can pay when you're ready.",
        "We start finding your coach as soon as it's paid.",
      ]}
    />
  );
}
