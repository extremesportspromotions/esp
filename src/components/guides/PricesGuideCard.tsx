import Image from "next/image";
import Link from "next/link";
import type { GuideSummary } from "@/data/guides-meta";
import HeroCredit from "./HeroCredit";

/**
 * Guides page: the UK course prices guide (with our match fee table), shown near
 * the top so it's easy to find now that "Price" isn't in the top bar.
 * It also stays in the normal guides list below.
 */
export default function PricesGuideCard({ guide }: { guide: GuideSummary }) {
  return (
    <section aria-labelledby="prices-heading" className="mb-12">
      <h2 id="prices-heading" className="font-display mb-4 text-2xl font-bold text-[#1C1917] sm:text-3xl">
        Prices
      </h2>
      <article className="group relative grid overflow-hidden rounded-2xl border border-[#1C1917]/10 bg-surface shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:border-[#1C1917]/25 focus-within:ring-2 focus-within:ring-accent grid-cols-[7.5rem_1fr] sm:grid-cols-[14rem_1fr] lg:grid-cols-[18rem_1fr]">
        <div className="relative min-h-[8.5rem] overflow-hidden bg-ink">
          <Image
            src={guide.heroImage}
            alt={guide.heroAlt}
            fill
            priority
            sizes="(max-width: 640px) 120px, 288px"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            style={{ objectPosition: guide.heroPosition ?? "50% 50%" }}
          />
        </div>
        <div className="flex flex-col justify-center p-4 sm:p-6">
          <h3 className="font-display text-lg font-bold leading-snug text-[#1C1917] sm:text-xl">
            <Link
              href={`/guides/${guide.slug}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {guide.title}
            </Link>
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[#1C1917]/70">
            What courses cost at UK clubs and schools for every sport, plus our match fee.
          </p>
          <span className="mt-2 block text-xs font-semibold text-accent-soft sm:text-sm">See the prices →</span>
        </div>
      </article>
      {guide.heroCredit ? <HeroCredit credit={guide.heroCredit} className="mt-1.5 px-1 text-[11px]" /> : null}
    </section>
  );
}
