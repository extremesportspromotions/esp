import Link from "next/link";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { ENQUIRY_EMAIL } from "@/lib/site";

/** Simple page shown when a student comes back from Stripe Checkout. */
export default function EnquiryNotice({ title, lines }: { title: string; lines: string[] }) {
  return (
    <>
      <TopBar />
      <main id="main" className="flex-1 bg-[#EEF4FA]">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Your enquiry</p>
          <h1 className="font-display mt-2 text-3xl font-bold text-[#1C1917] sm:text-4xl">{title}</h1>
          {lines.map((line) => (
            <p key={line} className="mt-4 text-base leading-relaxed text-[#1C1917]/75">
              {line}
            </p>
          ))}
          <p className="mt-4 text-base leading-relaxed text-[#1C1917]/75">
            Any questions, email{" "}
            <a href={`mailto:${ENQUIRY_EMAIL}`} className="font-semibold text-accent underline-offset-2 hover:underline">
              {ENQUIRY_EMAIL}
            </a>
            .
          </p>
          <p className="mt-12 border-t border-[#1C1917]/10 pt-6 text-sm text-[#1C1917]/55">
            <Link href="/" className="font-semibold text-accent underline-offset-2 hover:underline">
              Back to the homepage
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
