import { catalogue } from "@/components/shop/catalogue";
import { lookup, notYetOrderable } from "@/lib/shop";

/** A colour the shop must hide, identified as "pid:Colour" (no supplier data). */
export type HiddenColour = { key: string; name: string; colour: string };

/**
 * Same acceptance rule checkout uses in cleanLines (src/lib/shop.ts): the variant
 * exists, is not out of stock, and is not a made-to-order colour without a saved design.
 */
export function checkoutAccepts(id: number): boolean {
  const rec = lookup(id);
  return !!rec && !rec.v.oos && !notYetOrderable(id);
}

/** Colours and products checkout would refuse, so the shop must not show them. */
export function hiddenFromCheckout(): { colours: HiddenColour[]; products: { pid: number; name: string }[] } {
  const colours: HiddenColour[] = [];
  const products: { pid: number; name: string }[] = [];
  for (const p of catalogue) {
    // Shown in the shop even though checkout refuses them (range round 1, 15 Nov 2026).
    if (p.browseOnly) continue;
    const byColour = new Map<string, number[]>();
    for (const v of p.variants) {
      const colour = v.color ?? "";
      const ids = byColour.get(colour) ?? [];
      ids.push(v.id);
      byColour.set(colour, ids);
    }
    let anyOk = false;
    for (const [colour, ids] of byColour) {
      if (ids.some((id) => checkoutAccepts(id))) {
        anyOk = true;
        continue;
      }
      colours.push({ key: `${p.pid}:${colour}`, name: p.name, colour: colour || "(none)" });
    }
    if (!anyOk) products.push({ pid: p.pid, name: p.name });
  }
  return { colours, products };
}

/** Plain warning for the build log. No supplier names or design numbers. */
export function formatHiddenWarning(hidden: { colours: HiddenColour[]; products: { pid: number; name: string }[] }): string {
  const lines: string[] = [];
  if (hidden.colours.length) {
    lines.push(`Shop: hiding ${hidden.colours.length} colour${hidden.colours.length === 1 ? "" : "s"} that cannot be ordered (checkout would refuse them):`);
    const byName = new Map<string, string[]>();
    for (const c of hidden.colours) byName.set(c.name, [...(byName.get(c.name) ?? []), c.colour]);
    for (const [name, cs] of byName) lines.push(`  ${name}: ${cs.join(", ")}`);
  }
  if (hidden.products.length) {
    lines.push(`Shop: hiding ${hidden.products.length} product${hidden.products.length === 1 ? "" : "s"} with no colour that can be ordered:`);
    for (const p of hidden.products) lines.push(`  ${p.name}`);
  }
  if (!lines.length) lines.push("Shop: every listed colour can be ordered.");
  return lines.join("\n");
}
