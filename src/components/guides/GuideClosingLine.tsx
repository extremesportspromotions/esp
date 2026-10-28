import Link from "next/link";

/** The one closing line at the end of every guide. */
export default function GuideClosingLine() {
  return (
    <p className="mt-10 max-w-[70ch] text-base leading-relaxed text-[#1C1917]/80 sm:text-lg">
      Ready to start?{" "}
      <Link
        href="/#how-it-works"
        className="font-semibold text-accent underline underline-offset-2 hover:text-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        See how we match you with a qualified UK coach
      </Link>
      .
    </p>
  );
}
