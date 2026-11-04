import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { PRIVACY } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy notice | Extreme Sports Promotions",
  description: PRIVACY.intro.split(". Last updated")[0],
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return <LegalPage doc={PRIVACY} />;
}
