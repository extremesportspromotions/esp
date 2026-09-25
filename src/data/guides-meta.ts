import { sports } from "./sports";

/**
 * Shared, client-safe metadata for the Guides section.
 * Keep this list in sync with content/guides/README.md.
 */
export const GUIDE_CATEGORIES = [
  "How-to",
  "Safety",
  "Gear",
  "Getting started",
  "Club reviews",
  "Stories",
  "News",
] as const;

export type GuideCategory = (typeof GUIDE_CATEGORIES)[number];

export const GENERAL_SPORT = "general";

export const SPORT_IDS = sports.map((s) => s.id);

export function categorySlug(category: string): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function categoryFromSlug(slug: string): GuideCategory | undefined {
  return GUIDE_CATEGORIES.find((c) => categorySlug(c) === slug);
}

export function sportName(id: string): string {
  if (id === GENERAL_SPORT) return "General";
  return sports.find((s) => s.id === id)?.name ?? id;
}

export function getSport(id: string) {
  return sports.find((s) => s.id === id);
}

/** Summary of a guide, safe to pass to client components. */
export type GuideSummary = {
  slug: string;
  title: string;
  description: string;
  sport: string;
  sportName: string;
  category: GuideCategory;
  author: string;
  date: string; // ISO yyyy-mm-dd
  updated?: string;
  heroImage: string;
  heroAlt: string;
  heroPosition?: string;
  featured: boolean;
  draft: boolean;
  readingMinutes: number;
};

export function formatGuideDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
