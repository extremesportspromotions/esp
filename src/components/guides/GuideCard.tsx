import Image from "next/image";
import Link from "next/link";
import { formatGuideDate, type GuideSummary } from "@/data/guides-meta";
import GuideTags from "./GuideTags";

export function GuideMeta({ guide, className = "" }: { guide: GuideSummary; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 text-sm text-white/60 ${className}`}>
      <time dateTime={guide.date}>{formatGuideDate(guide.date)}</time>
      <span aria-hidden>·</span>
      <span>{guide.readingMinutes} min read</span>
      {guide.draft ? (
        <span className="rounded bg-yellow-400/90 px-1.5 py-0.5 text-xs font-bold uppercase text-ink">
          Draft
        </span>
      ) : null}
    </p>
  );
}

export default function GuideCard({ guide, headingLevel = 3 }: { guide: GuideSummary; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-xl shadow-black/30 transition hover:-translate-y-0.5 hover:border-white/25 focus-within:ring-2 focus-within:ring-accent">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
        <Image
          src={guide.heroImage}
          alt={guide.heroAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          style={{ objectPosition: guide.heroPosition ?? "50% 50%" }}
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <GuideTags sport={guide.sport} sportName={guide.sportName} category={guide.category} />
        <Heading className="font-display mt-3 text-xl font-bold leading-snug text-white">
          <Link
            href={`/guides/${guide.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:text-white/90"
          >
            {guide.title}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/70">{guide.description}</p>
        <GuideMeta guide={guide} className="mt-auto pt-4" />
      </div>
    </article>
  );
}

export function FeaturedGuideCard({ guide }: { guide: GuideSummary }) {
  return (
    <article className="group relative grid overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl shadow-black/40 transition hover:border-white/25 focus-within:ring-2 focus-within:ring-accent lg:grid-cols-5">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink lg:col-span-3 lg:aspect-auto lg:min-h-[420px]">
        <Image
          src={guide.heroImage}
          alt={guide.heroAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
          style={{ objectPosition: guide.heroPosition ?? "50% 50%" }}
        />
        <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
          Featured guide
        </span>
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-2 lg:p-10">
        <GuideTags sport={guide.sport} sportName={guide.sportName} category={guide.category} />
        <h2 className="font-display mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          <Link
            href={`/guides/${guide.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {guide.title}
          </Link>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">{guide.description}</p>
        <GuideMeta guide={guide} className="mt-5" />
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-white transition group-hover:text-accent-soft">
          Read the guide
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </article>
  );
}
