import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { toString as hastToString } from "hast-util-to-string";
import type { Root as MdastRoot, Paragraph, Text } from "mdast";
import type { Root as HastRoot, Element } from "hast";
import { sports } from "@/data/sports";
import {
  GENERAL_SPORT,
  GUIDE_CATEGORIES,
  SPORT_IDS,
  sportName,
  type GuideCategory,
  type GuideSummary,
} from "@/data/guides-meta";

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");
const WORDS_PER_MINUTE = 225;

/** Drafts are shown in `npm run dev` but never in a production build. */
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

export type TocItem = { id: string; text: string; depth: 2 | 3 };

export type Guide = GuideSummary & {
  html: string;
  toc: TocItem[];
  wordCount: number;
};

type RawGuide = GuideSummary & { body: string; wordCount: number; file: string };

function fail(file: string, message: string): never {
  throw new Error(
    `[guides] ${file}: ${message}\nSee content/guides/README.md for the allowed values.`,
  );
}

function toIsoDate(value: unknown, file: string, field: string): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.trim())) {
    return value.trim();
  }
  fail(file, `"${field}" must be a date written as YYYY-MM-DD (got ${JSON.stringify(value)}).`);
}

function requiredString(data: Record<string, unknown>, key: string, file: string): string {
  const v = data[key];
  if (typeof v !== "string" || !v.trim()) fail(file, `"${key}" is required.`);
  return v.trim();
}

function countWords(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~\-|]/g, " ");
  return text.split(/\s+/).filter(Boolean).length;
}

function isGuideFile(name: string): boolean {
  return /\.mdx?$/.test(name) && !name.startsWith("_") && name.toLowerCase() !== "readme.md";
}

function parseFile(file: string): RawGuide {
  const raw = fs.readFileSync(path.join(GUIDES_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const title = requiredString(data, "title", file);
  const slug =
    typeof data.slug === "string" && data.slug.trim()
      ? data.slug.trim()
      : file.replace(/\.mdx?$/, "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fail(file, `"slug" must be lower-case words joined by hyphens (got "${slug}").`);
  }
  const description = requiredString(data, "description", file);

  const sport = requiredString(data, "sport", file);
  if (sport !== GENERAL_SPORT && !SPORT_IDS.includes(sport)) {
    fail(file, `"sport" must be one of: ${[...SPORT_IDS, GENERAL_SPORT].join(", ")}.`);
  }
  const category = requiredString(data, "category", file) as GuideCategory;
  if (!GUIDE_CATEGORIES.includes(category)) {
    fail(file, `"category" must be one of: ${GUIDE_CATEGORIES.join(", ")}.`);
  }

  const sportData = sports.find((s) => s.id === sport);
  const fallbackImage = sportData?.image ?? "/sports/mountaineering.jpg";
  const fallbackAlt = sportData?.alt ?? "Mountain ridge above a cloud inversion";
  const customImage = typeof data.heroImage === "string" && data.heroImage.trim();
  const heroImage = customImage ? data.heroImage.trim() : fallbackImage;
  const heroAlt =
    typeof data.heroAlt === "string" && data.heroAlt.trim()
      ? data.heroAlt.trim()
      : customImage
        ? fail(file, `"heroAlt" (image description) is required when you set "heroImage".`)
        : fallbackAlt;

  const wordCount = countWords(content);

  return {
    file,
    slug,
    title,
    description,
    sport,
    sportName: sportName(sport),
    category,
    author: typeof data.author === "string" && data.author.trim() ? data.author.trim() : "ESP Editorial",
    date: toIsoDate(data.date, file, "date"),
    updated: data.updated ? toIsoDate(data.updated, file, "updated") : undefined,
    heroImage,
    heroAlt,
    heroPosition: customImage ? undefined : sportData?.imagePosition,
    featured: data.featured === true,
    draft: data.draft === true,
    readingMinutes: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
    wordCount,
    body: content,
  };
}

let cache: RawGuide[] | null = null;

function loadAll(): RawGuide[] {
  if (cache && !SHOW_DRAFTS) return cache;
  const files = fs.existsSync(GUIDES_DIR) ? fs.readdirSync(GUIDES_DIR).filter(isGuideFile) : [];
  const guides = files.map(parseFile).filter((g) => SHOW_DRAFTS || !g.draft);

  const seen = new Map<string, string>();
  for (const g of guides) {
    const other = seen.get(g.slug);
    if (other) fail(g.file, `slug "${g.slug}" is already used by ${other}.`);
    seen.set(g.slug, g.file);
  }

  // Newest first; on the same date, featured first, then alphabetical.
  guides.sort(
    (a, b) =>
      b.date.localeCompare(a.date) ||
      Number(b.featured) - Number(a.featured) ||
      a.title.localeCompare(b.title),
  );
  cache = guides;
  return guides;
}

function toSummary(g: RawGuide): GuideSummary {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { body, file, wordCount, ...summary } = g;
  return summary;
}

/** All published guides, newest first. */
export function getAllGuides(): GuideSummary[] {
  return loadAll().map(toSummary);
}

export function getGuidesBySport(sport: string): GuideSummary[] {
  return getAllGuides().filter((g) => g.sport === sport);
}

/** The featured guide (newest featured, else newest overall). */
export function getFeaturedGuide(): GuideSummary | undefined {
  const all = getAllGuides();
  return all.find((g) => g.featured) ?? all[0];
}

/** Up to `limit` related guides: same sport first, then same category, then newest. */
export function getRelatedGuides(slug: string, limit = 3): GuideSummary[] {
  const all = getAllGuides();
  const current = all.find((g) => g.slug === slug);
  if (!current) return [];
  const others = all.filter((g) => g.slug !== slug);
  const picked: GuideSummary[] = [];
  const add = (list: GuideSummary[]) => {
    for (const g of list) {
      if (picked.length >= limit) return;
      if (!picked.includes(g)) picked.push(g);
    }
  };
  add(others.filter((g) => g.sport === current.sport));
  add(others.filter((g) => g.category === current.category));
  add(others);
  return picked;
}

/* ---------- Markdown rendering ---------- */

const CALLOUTS: Record<string, string> = {
  safety: "Safety first",
  tip: "Top tip",
  note: "Good to know",
  warning: "Warning",
};

/** `> [!SAFETY] Optional title` blockquotes become styled callout boxes. */
function remarkCallouts() {
  return (tree: MdastRoot) => {
    visit(tree, "blockquote", (node) => {
      const first = node.children[0];
      if (!first || first.type !== "paragraph") return;
      const textNode = first.children[0];
      if (!textNode || textNode.type !== "text") return;
      const match = /^\[!(\w+)\][ \t]*([^\n]*)\n?/.exec(textNode.value);
      if (!match) return;
      const type = match[1].toLowerCase();
      if (!(type in CALLOUTS)) return;
      const title = match[2].trim() || CALLOUTS[type];
      textNode.value = textNode.value.slice(match[0].length);
      if (!textNode.value && first.children.length === 1) node.children.shift();
      else if (!textNode.value) first.children.shift();

      const titleNode: Paragraph = {
        type: "paragraph",
        children: [{ type: "text", value: title } as Text],
        data: { hProperties: { className: ["callout-title"] } },
      };
      node.children.unshift(titleNode);
      node.data = {
        hName: "aside",
        hProperties: { className: ["callout", `callout-${type}`], role: "note" },
      };
    });
  };
}

/** Demote stray h1s (the page title is the only h1) and collect the table of contents. */
function rehypeHeadingsAndLinks(toc: TocItem[]) {
  return () => (tree: HastRoot) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "h1") node.tagName = "h2";
      if ((node.tagName === "h2" || node.tagName === "h3") && node.properties?.id) {
        toc.push({
          id: String(node.properties.id),
          text: hastToString(node),
          depth: node.tagName === "h2" ? 2 : 3,
        });
      }
      if (node.tagName === "a") {
        const href = String(node.properties?.href ?? "");
        if (/^https?:\/\//.test(href)) {
          node.properties = { ...node.properties, target: "_blank", rel: ["noopener", "noreferrer"] };
        }
      }
      if (node.tagName === "img") {
        node.properties = { ...node.properties, loading: "lazy", decoding: "async" };
      }
    });
  };
}

async function renderMarkdown(markdown: string) {
  const toc: TocItem[] = [];
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkCallouts)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHeadingsAndLinks(toc))
    .use(rehypeStringify)
    .process(markdown);
  return { html: String(file), toc };
}

export async function getGuideBySlug(slug: string): Promise<Guide | undefined> {
  const raw = loadAll().find((g) => g.slug === slug);
  if (!raw) return undefined;
  const { html, toc } = await renderMarkdown(raw.body);
  return { ...toSummary(raw), html, toc, wordCount: raw.wordCount };
}
