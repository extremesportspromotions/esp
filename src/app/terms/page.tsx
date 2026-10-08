import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { ENQUIRY_EMAIL } from "@/lib/site";

const title = "Terms";
const description =
  "How Extreme Sports Promotions (ESP) works: the match fee you pay when you enquire, refunds, and what you and the coach are each responsible for.";

export const metadata: Metadata = {
  title: `${title} | Extreme Sports Promotions`,
  description,
  alternates: { canonical: "/terms" },
  openGraph: { title: `${title} | Extreme Sports Promotions`, description, type: "website", url: "/terms" },
};

function Mail() {
  return <a href={`mailto:${ENQUIRY_EMAIL}`}>{ENQUIRY_EMAIL}</a>;
}

export default function TermsPage() {
  return (
    <>
      <TopBar />
      <main id="main" className="flex-1 bg-[#EEF4FA]">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">How it works</p>
          <h1 className="font-display mt-2 text-3xl font-bold text-[#1C1917] sm:text-4xl">Terms</h1>
          <p className="mt-4 text-base leading-relaxed text-[#1C1917]/75">
            These terms explain how Extreme Sports Promotions (&ldquo;ESP&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;) works and what you pay for. This is a plain-English summary, not legal
            advice.
          </p>

          <div className="guide-prose prose mt-10">
            <h2>Our match fee</h2>
            {/* Normal body size: .guide-prose enlarges the first paragraph as an article lead. */}
            <p style={{ fontSize: "1em", lineHeight: "inherit", color: "inherit" }}>
              You pay our match fee up front, when you enquire. We start finding your coach as soon
              as it&apos;s paid. The fee depends on what you&apos;re looking for:
            </p>
            <ul>
              <li>Experience day (one person, one day): £19</li>
              <li>Become qualified (one person, one club, full course): £49</li>
              <li>Group experience day (a party, one taster day): £49</li>
              <li>Group qualification (team building, become qualified): £99</li>
            </ul>

            <h2>Paying for your training</h2>
            <p>
              The coach or club bills you separately for the training. ESP does not book lessons, run
              training, or take the club&apos;s training fee.
            </p>

            <h2>Safety and checks</h2>
            <p>
              Before we introduce you, we check the coach&apos;s qualifications and insurance. You
              must follow the coach&apos;s and club&apos;s safety rules and fill in any medical form
              honestly.
            </p>

            <h2>Under-18s</h2>
            <p>If you&apos;re under 18, you need a parent or guardian&apos;s consent.</p>

            <h2>Refunds</h2>
            <p>
              If we can&apos;t find you a coach within 14 days of your payment, we refund the match
              fee in full. We also refund it if your health means you can&apos;t train.
            </p>

            <h2>Contact us</h2>
            <p>
              If you have a question about these terms, email <Mail />.
            </p>
          </div>

          <p className="mt-12 border-t border-[#1C1917]/10 pt-6 text-sm text-[#1C1917]/55">
            <Link href="/#enquire" className="font-semibold text-accent underline-offset-2 hover:underline">
              Back to the enquiry form
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
