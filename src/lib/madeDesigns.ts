import "server-only";
import { smartCasual } from "@/components/shop/smartCasual";

/**
 * Supplier (Clothes2order) saved design ids for the smart casual range. Server only:
 * used in the order alerts and Stripe line metadata, never shown to customers.
 */
const DESIGNS: Record<number, { garment: string; colours: Record<string, [design: number, logo: "silver" | "black"]> }> = {
  9100001: { garment: "Henbury HB512 Oxford (regular fit)", colours: { Black: [6571277, "silver"], White: [6571279, "black"], Blue: [6571296, "black"] } },
  9100002: { garment: "Premier PR695 quarter-zip knit", colours: { Black: [6571283, "silver"], Charcoal: [6571285, "silver"], Navy: [6571290, "silver"] } },
  9100003: { garment: "Henbury H722 V-neck cardigan", colours: { Black: [6571301, "silver"], Navy: [6571303, "black"] } },
  9100004: {
    garment: "Russell 141M softshell gilet",
    colours: { Black: [6571304, "silver"], Titanium: [6571308, "silver"], "French Navy": [6571310, "silver"], Azure: [6571312, "black"], "Classic Red": [6571315, "black"] },
  },
  9100005: {
    garment: "Asquith & Fox AQ050 chinos (logo by left front pocket)",
    colours: { Black: [6571317, "silver"], Slate: [6571322, "silver"], Royal: [6571332, "silver"], Navy: [6571335, "silver"], Natural: [6571327, "black"] },
  },
};

export type MadeInfo = { design: number; garment: string; logo: string };
const byVariant = new Map<number, MadeInfo>();
for (const p of smartCasual) {
  const d = DESIGNS[p.pid];
  for (const v of p.variants) {
    const c = d?.colours[v.color ?? ""];
    if (!d || !c) throw new Error(`No supplier design for ${p.name} ${v.color}`);
    byVariant.set(v.id, { design: c[0], garment: d.garment, logo: c[1] });
  }
}

export const madeInfo = (variantId: number) => byVariant.get(variantId);
