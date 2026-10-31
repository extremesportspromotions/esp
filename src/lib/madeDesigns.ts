import "server-only";
import { scKey, smartCasual } from "@/components/shop/smartCasual";

/**
 * TO SWITCH A COLOUR ON: add its saved Clothes2order design number below (product pid -> colours).
 * A smart casual colour WITHOUT an entry here is "not available to order yet": the shop shows it
 * but can't add it to the bag, and checkout refuses it.
 *
 * Supplier (Clothes2order) saved design ids for the smart casual range. Server only:
 * used in the order alerts and Stripe line metadata, never shown to customers.
 */
const DESIGNS: Record<number, { garment: string; colours: Record<string, [design: number, logo: "silver" | "black" | "dark grey"]> }> = {
  9100001: { garment: "Henbury HB512 Oxford (regular fit)", colours: { Black: [6577525, "silver"], White: [6577544, "dark grey"], Blue: [6577545, "dark grey"] } },
  9100002: { garment: "Premier PR695 quarter-zip knit", colours: { Black: [6577546, "silver"], Charcoal: [6577547, "silver"], Navy: [6577548, "silver"] } },
  9100003: { garment: "Henbury H722 V-neck cardigan", colours: { Black: [6577549, "silver"], Navy: [6577551, "silver"] /* Grey Marl: needs design number */ } },
  9100004: {
    garment: "Russell 141M softshell gilet (Clothes2order code J141M)",
    colours: { Black: [6577552, "silver"], Titanium: [6577553, "silver"], "French Navy": [6577555, "silver"], Azure: [6577556, "silver"], "Classic Red": [6577557, "silver"] },
  },
  9100005: {
    garment: "Asquith & Fox AQ050 chinos (logo by left front pocket)",
    colours: { Black: [6571317, "silver"], Slate: [6571322, "silver"], Royal: [6571332, "silver"], Navy: [6571335, "silver"], Natural: [6571327, "black"] },
  },
};

// v2 styles, all "needs design number" (25 Oct 2026). Add e.g.
//   9100006: { garment: "Henbury HB517 short sleeve Oxford", colours: { White: [1234567, "dark grey"] } },
// 9100006 Short Sleeve Oxford (HB517) · 9100007 Mercerised Polo (AQ101) · 9100008 Long Sleeve Polo (AQ030)
// 9100009 Zip-Through Cardigan (H718) · 9100010 Crew Neck Jumper (HB725) · 9100011 Softshell Jacket (140M)
// 9100012 Chino Shorts (AQ051)

/**
 * HELD: saved designs that must NOT be sold. These 6 were saved with BLACK thread, but the
 * approved light-colour logo is DARK GREY thread (25 Oct 2026). They stay listed above for the
 * record; a held design is treated exactly like a missing one ("Not available to order yet",
 * checkout refuses it). To release one, re-save it in dark grey, update its number, and remove it here.
 */
export const HELD = new Set<number>([
  6571327, // Chinos Natural
]);

export type MadeInfo = { design: number; garment: string; logo: string };
const byVariant = new Map<number, MadeInfo>();
const notYet: { key: string; name: string; colour: string }[] = [];
for (const p of smartCasual) {
  const d = DESIGNS[p.pid];
  const seen = new Set<string>();
  for (const v of p.variants) {
    const c = d?.colours[v.color ?? ""];
    if (d && c && !HELD.has(c[0])) byVariant.set(v.id, { design: c[0], garment: d.garment, logo: c[1] });
    else if (!seen.has(v.color ?? "")) {
      seen.add(v.color ?? "");
      notYet.push({ key: scKey(p.pid, v.color), name: p.name, colour: v.color ?? "" });
    }
  }
}

/** Supplier design for a smart casual variant, or undefined if that colour can't be ordered yet. */
export const madeInfo = (variantId: number) => byVariant.get(variantId);
/** Smart casual colourways with no saved supplier design (safe to send to the browser: no design ids). */
export const notYetOrderable = () => notYet;
