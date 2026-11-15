import type { TabId } from "./products";

/** Canonical path for a shop catalogue. Accessories is the public name for the equipment section. */
export function sectionPath(tab: TabId): string {
  return tab === "equipment" ? "/shop/accessories" : `/shop/${tab}`;
}

export const PAGE_TITLE: Record<TabId, string> = {
  mens: "Men's",
  womens: "Women's",
  equipment: "Accessories",
};

/** Path segments that should open a catalogue, including older names and aliases. */
export const SECTION_PARAMS: Record<string, { tab: TabId; sub: string | null; anchor?: string }> = {
  mens: { tab: "mens", sub: null },
  men: { tab: "mens", sub: null },
  womens: { tab: "womens", sub: null },
  women: { tab: "womens", sub: null },
  accessories: { tab: "equipment", sub: null },
  equipment: { tab: "equipment", sub: null },
  gear: { tab: "equipment", sub: null, anchor: "recommended" },
  bags: { tab: "equipment", sub: "Bags" },
  headwear: { tab: "equipment", sub: "Headwear" },
  outerwear: { tab: "equipment", sub: null, anchor: "accessories" },
  apparel: { tab: "mens", sub: null },
  smartcasual: { tab: "mens", sub: "Smart casual" },
  denim: { tab: "mens", sub: null, anchor: "denim" },
  all: { tab: "mens", sub: null },
};

export function parseSectionParam(section: string) {
  return SECTION_PARAMS[section.toLowerCase()] ?? null;
}

export const SECTION_STATIC_PARAMS = Object.keys(SECTION_PARAMS).map((section) => ({ section }));
