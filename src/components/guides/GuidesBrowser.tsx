"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { sports } from "@/data/sports";
import {
  GENERAL_SPORT,
  GUIDE_CATEGORIES,
  categoryFromSlug,
  categorySlug,
  sportName,
  type GuideSummary,
} from "@/data/guides-meta";
import GuideCard, { FeaturedGuideCard } from "./GuideCard";
import GuidesComingSoon from "./GuidesComingSoon";

const ALL = "all";

type ViewProps = {
  guides: GuideSummary[];
  featuredSlug?: string;
  sport: string;
  category: string; // category slug or "all"
};

function buildHref(sport: string, category: string) {
  const params = new URLSearchParams();
  if (sport !== ALL) params.set("sport", sport);
  if (category !== ALL) params.set("category", category);
  const qs = params.toString();
  return qs ? `/guides?${qs}#browse` : "/guides#browse";
}

function Chip({
  href,
  active,
  muted,
  children,
}: {
  href: string;
  active: boolean;
  muted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "page" : undefined}
      className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        active
          ? "bg-accent text-white"
          : muted
            ? "bg-[#1C1917]/5 text-[#1C1917]/55 hover:bg-[#1C1917]/10 hover:text-[#1C1917]"
            : "bg-[#1C1917]/10 text-[#1C1917]/85 hover:bg-[#1C1917]/15"
      }`}
    >
      {children}
    </Link>
  );
}

/** Pure view: renders filters + results for the given filter values. */
export function GuidesBrowserView({ guides, featuredSlug, sport, category }: ViewProps) {
  const categoryName = category === ALL ? undefined : categoryFromSlug(category);
  const activeCategory = categoryName ? category : ALL;
  const activeSport = sport === ALL || sports.some((s) => s.id === sport) || sport === GENERAL_SPORT ? sport : ALL;

  const countsBySport = guides.reduce<Record<string, number>>((acc, g) => {
    acc[g.sport] = (acc[g.sport] ?? 0) + 1;
    return acc;
  }, {});

  const filtered = guides.filter(
    (g) =>
      (activeSport === ALL || g.sport === activeSport) &&
      (!categoryName || g.category === categoryName),
  );

  const unfiltered = activeSport === ALL && activeCategory === ALL;
  const featured = unfiltered ? guides.find((g) => g.slug === featuredSlug) : undefined;
  const rest = featured ? filtered.filter((g) => g.slug !== featured.slug) : filtered;

  return (
    <div>
      {featured ? (
        <div className="mb-12">
          <FeaturedGuideCard guide={featured} />
        </div>
      ) : null}

      <div id="browse" className="scroll-mt-24 space-y-4 rounded-2xl border border-[#1C1917]/10 bg-surface/60 p-4 sm:p-5">
        <div>
          <p id="filter-sport-label" className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1C1917]/55">
            Sport
          </p>
          <nav aria-labelledby="filter-sport-label" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
            <Chip href={buildHref(ALL, activeCategory)} active={activeSport === ALL}>
              All sports
            </Chip>
            {sports.map((s) => (
              <Chip
                key={s.id}
                href={buildHref(s.id, activeCategory)}
                active={activeSport === s.id}
                muted={!countsBySport[s.id]}
              >
                {s.mapLabel ?? s.name}
                {countsBySport[s.id] ? <span className="ml-1.5 opacity-70">{countsBySport[s.id]}</span> : null}
              </Chip>
            ))}
          </nav>
        </div>
        <div>
          <p id="filter-category-label" className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1C1917]/55">
            Category
          </p>
          <nav aria-labelledby="filter-category-label" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
            <Chip href={buildHref(activeSport, ALL)} active={activeCategory === ALL}>
              All categories
            </Chip>
            {GUIDE_CATEGORIES.map((c) => (
              <Chip key={c} href={buildHref(activeSport, categorySlug(c))} active={activeCategory === categorySlug(c)}>
                {c}
              </Chip>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-2xl font-bold text-[#1C1917] sm:text-3xl">
          {unfiltered
            ? "Latest guides"
            : [activeSport !== ALL ? sportName(activeSport) : null, categoryName].filter(Boolean).join(" · ")}
        </h2>
        <p className="text-sm text-[#1C1917]/60" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "guide" : "guides"}
        </p>
      </div>

      <div className="mt-6">
        {rest.length > 0 ? (
          <ul
            aria-label="Guides"
            className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pt-1 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pt-0 sm:pb-0 lg:grid-cols-3"
          >
            {rest.map((g) => (
              <li key={g.slug} className="w-[85%] shrink-0 snap-start sm:w-auto">
                <GuideCard guide={g} />
              </li>
            ))}
          </ul>
        ) : filtered.length === 0 ? (
          <GuidesComingSoon
            sport={activeSport !== ALL && !countsBySport[activeSport] ? activeSport : undefined}
            sportName={activeSport === ALL ? undefined : sportName(activeSport)}
          />
        ) : (
          <p className="text-[#1C1917]/60">That&apos;s everything for now — more guides are on the way.</p>
        )}
      </div>
    </div>
  );
}

/** Reads ?sport= and ?category= from the URL (works on a fully static page). */
export default function GuidesBrowser(props: Omit<ViewProps, "sport" | "category">) {
  const params = useSearchParams();
  return (
    <GuidesBrowserView
      {...props}
      sport={params.get("sport") ?? ALL}
      category={params.get("category") ?? ALL}
    />
  );
}
