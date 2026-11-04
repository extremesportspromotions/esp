import Link from "next/link";

/** Homepage intro: headline, one-line outcome and the two main buttons (above the carousel on every screen). */
export default function HomeHero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="bg-[#F6EFE3]">
      <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-10 lg:px-10">
        <p data-qualified className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Qualified coaches only</p>
        <h2 id="hero-heading" className="font-serif mt-2 text-3xl font-medium leading-tight text-[#0E2141] sm:text-5xl">
          Learn an extreme sport with a qualified UK coach
        </h2>
        <p className="mt-2 max-w-2xl text-base text-[#1C1917]/75 sm:text-lg">
          Tell us your sport and level, and we&apos;ll match you with a checked, qualified coach near you.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#enquire"
            data-hero-primary
            className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/25 transition hover:bg-[#0E2141] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Get matched with a coach
          </Link>
          <Link
            href="/#find-a-club"
            data-hero-secondary
            className="inline-flex items-center justify-center rounded-full border border-[#0E2141]/40 px-7 py-3.5 text-sm font-bold text-[#0E2141] transition hover:bg-[#0E2141] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Find a club near me
          </Link>
        </div>
      </div>
    </section>
  );
}
