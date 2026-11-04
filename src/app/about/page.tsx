import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About ESP and our approach | Extreme Sports Promotions",
  description: "Who runs Extreme Sports Promotions, why we only work with qualified coaches, and how we check every coach before we introduce you.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <TopBar />
      <main id="main" className="flex-1 bg-[#F6EFE3]">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">About ESP</p>
          <h1 className="font-display mt-2 text-3xl font-bold text-[#1C1917] sm:text-4xl">Our approach</h1>
          <p data-qualified className="mt-4 text-lg font-semibold text-[#1C1917]">Qualified coaches only.</p>
          <div className="guide-prose prose mt-8">
            <h2>Who runs ESP</h2>
            <p style={{ fontSize: "1em", lineHeight: "inherit", color: "inherit" }}>
              Extreme Sports Promotions is run by Matthew Thornton. ESP matches people across the UK with qualified coaches in 15 extreme sports, from skydiving and paragliding to surfing and scuba diving.{" "}
              <mark className="rounded bg-amber-100 px-1">[A sentence or two from Matthew about his background and why he started ESP]</mark>
            </p>
            <h2>Qualified coaches only</h2>
            <p>We only introduce you to coaches who hold the right qualifications for their sport. If a coach doesn&apos;t meet that standard, we don&apos;t put them forward.</p>
            <h2>How we check every coach</h2>
            <p>Before we introduce you, we do the checks for you:</p>
            <ul>
              <li>their coaching qualifications for the sport;</li>
              <li>their insurance;</li>
              <li>their references.</li>
            </ul>
            <p>That checking, along with researching coaches near you, matching you and making the introduction, is what the match fee pays for. Full refund if we can&apos;t match you within 14 days.</p>
            <h2>Safety first</h2>
            <p>Extreme sports carry real risks, so we put safety first. We match you to a coach who fits your sport, level and goals, and we pass on any health details you choose to share so they can train you safely. Under-18s need a parent or guardian&apos;s consent.</p>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/#enquire" className="inline-flex justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-white hover:bg-[#0E2141]">Get matched with a coach</Link>
            <Link href="/#find-a-club" className="inline-flex justify-center rounded-full border border-[#0E2141]/40 px-7 py-3.5 text-sm font-bold text-[#0E2141] hover:bg-[#0E2141] hover:text-white">Find a club near me</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
