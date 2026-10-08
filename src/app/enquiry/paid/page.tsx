import type { Metadata } from "next";
import EnquiryNotice from "@/components/EnquiryNotice";
import { REFUND_LINE } from "@/lib/payment";

export const metadata: Metadata = {
  title: "Payment received | Extreme Sports Promotions",
  robots: { index: false, follow: false },
};

export default function PaidPage() {
  return (
    <EnquiryNotice
      title="Thanks, your match fee is paid"
      lines={[
        "We've got your enquiry and your payment. We're now finding the right coach for you, and we'll be in touch by email.",
        REFUND_LINE,
        "The coach or club bills you separately for the training.",
      ]}
    />
  );
}
