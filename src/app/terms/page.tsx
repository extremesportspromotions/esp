import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { TERMS } from "@/data/legal";

export const metadata: Metadata = {
  title: "Terms | Extreme Sports Promotions",
  description: TERMS.intro.split(". Last updated")[0],
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return <LegalPage doc={TERMS} />;
}
