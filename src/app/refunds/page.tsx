import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { REFUNDS } from "@/data/legal";

export const metadata: Metadata = {
  title: "Refund policy | Extreme Sports Promotions",
  description: REFUNDS.intro.split(". Last updated")[0],
  alternates: { canonical: "/refunds" },
};

export default function Page() {
  return <LegalPage doc={REFUNDS} />;
}
