import Link from "next/link";
import { GENERAL_SPORT, categorySlug } from "@/data/guides-meta";

type Props = {
  sport: string;
  sportName: string;
  category: string;
  /** Render tags as links to filtered views */
  linked?: boolean;
  className?: string;
};

const sportTagClass =
  "inline-flex items-center rounded-full border border-white/15 bg-navy/70 px-3 py-1 text-xs font-semibold text-white";
const categoryTagClass =
  "inline-flex items-center text-xs font-semibold uppercase tracking-[0.18em] text-accent-soft";
const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function GuideTags({ sport, sportName, category, linked, className = "" }: Props) {
  const sportHref = sport === GENERAL_SPORT ? "/guides" : `/guides/sport/${sport}`;
  const categoryHref = `/guides?category=${categorySlug(category)}`;
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {linked ? (
        <Link href={sportHref} className={`${sportTagClass} transition hover:border-accent ${focus}`}>
          {sportName}
        </Link>
      ) : (
        <span className={sportTagClass}>{sportName}</span>
      )}
      {linked ? (
        <Link href={categoryHref} className={`${categoryTagClass} hover:text-white ${focus}`}>
          {category}
        </Link>
      ) : (
        <span className={categoryTagClass}>{category}</span>
      )}
    </div>
  );
}
