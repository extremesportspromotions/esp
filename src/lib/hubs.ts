import "server-only";
import fs from "node:fs";
import path from "node:path";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";
import { GUIDE_PRICES, GUIDE_PRICES_NOTE, GUIDE_PRICES_TITLE, type GuidePriceRow } from "@/data/guidePrices";
import { SPORT_IDS, sportName } from "@/data/guides-meta";
import type { GuideSummary } from "@/data/guides-meta";

/**
 * Sport hubs: one JSON file per sport in content/hubs/<sport>.json.
 * See content/hubs/README.md for the fields. The page lives at /guides/hub/<sport>.
 */
const HUBS_DIR = path.join(process.cwd(), "content", "hubs");

export const COURSE_PRICES_SLUG = "uk-course-prices";
export const GOVERNING_BODIES_SLUG = "uk-governing-bodies-by-sport";
export const QUALIFICATIONS_SLUG = "uk-qualifications-by-sport";
export const COMPETITIONS_SLUG = "british-competitions-2027";

export type HubLink = { label: string; href: string; external?: boolean };

type HubFile = {
  sport: string;
  title: string;
  intro: string;
  quickLinks?: {
    prices?: { coursePricesAnchor?: string; coursePricesLabel?: string; guides?: string[] };
    governingBody?: { links?: { label: string; href: string }[]; governingBodiesAnchor?: string; qualificationsAnchor?: string };
    /** Optional: omit for sports with no competitions and the block is hidden. */
    competitions?: { guides?: string[]; competitions2027Anchor?: string; competitions2027Label?: string };
  };
  sections: { title?: string; intro?: string; items: { slug: string; summary: string }[] }[];
};

export type HubStep = { number: number; guide: GuideSummary; summary: string };
export type HubSection = { title?: string; intro?: string; steps: HubStep[] };
export type QuickLinkGroup = { id: string; heading: string; links: HubLink[]; priceRows?: GuidePriceRow[] };

export type Hub = {
  sport: string;
  sportName: string;
  title: string;
  intro: string;
  href: string;
  sections: HubSection[];
  stepCount: number;
  firstGuide: GuideSummary;
  quickLinks: QuickLinkGroup[];
  priceTitle: string;
  priceNote: string;
};

function fail(file: string, message: string): never {
  throw new Error(`[hubs] ${file}: ${message}\nSee content/hubs/README.md.`);
}

export function hubHref(sport: string): string {
  return `/guides/hub/${sport}`;
}

function readHubFiles(): { file: string; data: HubFile }[] {
  if (!fs.existsSync(HUBS_DIR)) return [];
  return fs
    .readdirSync(HUBS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((file) => ({ file, data: JSON.parse(fs.readFileSync(path.join(HUBS_DIR, file), "utf8")) as HubFile }));
}

/** Sports that have a hub, in file order. */
export function getHubSports(): string[] {
  return readHubFiles().map((h) => h.data.sport);
}

/** Basic hub info (no anchor checks) for links from the Guides page and articles. */
export function getHubSummaries(): { sport: string; title: string; href: string; stepCount: number; slugs: string[] }[] {
  return readHubFiles().map(({ data }) => {
    const slugs = data.sections.flatMap((s) => s.items.map((i) => i.slug));
    return { sport: data.sport, title: data.title, href: hubHref(data.sport), stepCount: slugs.length, slugs };
  });
}

/** The hub (if any) that lists this guide. */
export function getHubForGuide(slug: string) {
  return getHubSummaries().find((h) => h.slugs.includes(slug));
}

/** Throws (so the build stops) if an anchor isn't a real heading id on that guide. */
async function checkAnchor(file: string, slug: string, anchor: string) {
  const guide = await getGuideBySlug(slug);
  if (!guide) fail(file, `links to guide "${slug}", which doesn't exist or is a draft.`);
  if (!guide.toc.some((t) => t.id === anchor)) {
    fail(file, `"#${anchor}" is not a heading id on /guides/${slug}. Ids there: ${guide.toc.map((t) => t.id).join(", ")}`);
  }
}

export async function getHub(sport: string): Promise<Hub | undefined> {
  const entry = readHubFiles().find((h) => h.data.sport === sport);
  if (!entry) return undefined;
  const { file, data } = entry;
  if (!SPORT_IDS.includes(data.sport)) fail(file, `"sport" must be a sport id (got "${data.sport}").`);
  if (`${data.sport}.json` !== file) fail(file, `the file name must be "${data.sport}.json".`);

  const guides = getAllGuides();
  const find = (slug: string) => guides.find((g) => g.slug === slug) ?? fail(file, `guide "${slug}" doesn't exist or is a draft.`);

  let n = 0;
  const seen = new Set<string>();
  const sections: HubSection[] = data.sections.map((s) => ({
    title: s.title,
    intro: s.intro,
    steps: s.items.map((item) => {
      if (seen.has(item.slug)) fail(file, `"${item.slug}" is listed twice.`);
      seen.add(item.slug);
      if (!item.summary?.trim()) fail(file, `"${item.slug}" needs a one-line summary.`);
      return { number: ++n, guide: find(item.slug), summary: item.summary.trim() };
    }),
  }));
  if (n === 0) fail(file, "a hub needs at least one guide.");

  const q = data.quickLinks ?? {};
  const guideLink = (slug: string): HubLink => ({ label: find(slug).title, href: `/guides/${slug}` });
  const anchored = async (slug: string, anchor: string | undefined, label: string): Promise<HubLink> => {
    find(slug);
    if (anchor) await checkAnchor(file, slug, anchor);
    return { label, href: `/guides/${slug}${anchor ? `#${anchor}` : ""}` };
  };
  const name = sportName(data.sport);

  const quickLinks: QuickLinkGroup[] = [];
  const priceRows = GUIDE_PRICES[data.sport];
  const priceLinks: HubLink[] = [
    ...(q.prices?.guides ?? []).map(guideLink),
    await anchored(COURSE_PRICES_SLUG, q.prices?.coursePricesAnchor, q.prices?.coursePricesLabel ?? `UK course prices: ${name.toLowerCase()}`),
  ];
  quickLinks.push({ id: "prices", heading: "Prices", links: priceLinks, priceRows });

  quickLinks.push({
    id: "governing-body",
    heading: "Governing body",
    links: [
      ...(q.governingBody?.links ?? []).map((l) => ({ ...l, external: /^https?:\/\//.test(l.href) })),
      await anchored(GOVERNING_BODIES_SLUG, q.governingBody?.governingBodiesAnchor, "UK governing bodies by sport"),
      await anchored(QUALIFICATIONS_SLUG, q.governingBody?.qualificationsAnchor, "UK qualifications by sport"),
    ],
  });

  // Optional: leave "competitions" out of the hub JSON (e.g. scuba) and the block is hidden.
  if (q.competitions) {
    quickLinks.push({
      id: "competitions",
      heading: "Competitions",
      links: [
        ...(q.competitions.guides ?? []).map(guideLink),
        await anchored(COMPETITIONS_SLUG, q.competitions.competitions2027Anchor, q.competitions.competitions2027Label ?? `British competitions 2027: ${name.toLowerCase()}`),
      ],
    });
  }

  return {
    sport: data.sport,
    sportName: name,
    title: data.title,
    intro: data.intro,
    href: hubHref(data.sport),
    sections,
    stepCount: n,
    firstGuide: sections[0].steps[0].guide,
    quickLinks,
    priceTitle: GUIDE_PRICES_TITLE,
    priceNote: GUIDE_PRICES_NOTE,
  };
}
