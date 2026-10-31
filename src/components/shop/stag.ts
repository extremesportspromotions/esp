import type { Merch, MerchPhoto } from "./merch";

/**
 * Devonshire stag mockups (31 Oct 2026) for partner-made products, shown first for the matching colour
 * until model photos exist. Files: public/shop/pf-stag/<file>.webp. Caps show the logo on the front; the visor shows the stag only.
 */
/** Stag mockup files available (public/shop/pf-stag/<slug(product)>-<slug(colour)>.webp). */
const FILES = new Set<string>(["beach-towel-white", "bucket-hat-black", "bucket-hat-khaki", "bucket-hat-navy", "bucket-hat-white", "bum-bag-white", "crossbody-bag-black", "crossbody-bag-fresh-green", "crossbody-bag-fresh-pink", "crossbody-bag-natural-stone", "cuffed-beanie-baby-pink", "cuffed-beanie-black", "cuffed-beanie-brown", "cuffed-beanie-dark-grey", "cuffed-beanie-gold", "cuffed-beanie-heather-grey", "cuffed-beanie-navy", "cuffed-beanie-olive", "cuffed-beanie-white", "dad-hat-black", "dad-hat-dark-grey", "dad-hat-khaki", "dad-hat-light-blue", "dad-hat-navy", "dad-hat-pink", "dad-hat-stone", "dad-hat-white", "embroidered-patch-black", "embroidered-patch-white", "fisherman-beanie-athletic-heather", "fisherman-beanie-black", "fisherman-beanie-ecru", "fisherman-beanie-gold", "fisherman-beanie-petrol-blue", "gym-bag-white", "hoodie-black", "hoodie-dark-chocolate", "hoodie-light-blue", "hoodie-light-pink", "hoodie-maroon", "hoodie-navy", "hoodie-sport-grey", "hoodie-white", "iphone-tough-case-glossy", "iphone-tough-case-matte", "kids-hoodie-black", "kids-hoodie-navy", "kids-hoodie-white", "kids-tee-azalea", "kids-tee-black", "kids-tee-gold", "kids-tee-natural", "kids-tee-navy", "kids-tee-sport-grey", "kids-tee-white", "long-sleeve-tee-black", "long-sleeve-tee-butter", "long-sleeve-tee-ecru", "long-sleeve-tee-midnight-blue", "low-profile-cap-black", "low-profile-cap-dark-green", "low-profile-cap-dark-navy", "low-profile-cap-khaki", "mug-black", "oversized-faded-tee-faded-black", "oversized-faded-tee-faded-bone", "oversized-faded-tee-faded-eucalyptus", "oversized-faded-tee-faded-khaki", "oversized-faded-tee-faded-white", "polo-black", "polo-navy", "polo-sport-grey", "polo-white", "pom-pom-beanie-black", "pom-pom-beanie-burgundy", "pom-pom-beanie-french-navy", "pom-pom-beanie-white", "premium-hoodie-black", "premium-hoodie-carbon-grey", "premium-hoodie-charcoal-heather", "premium-hoodie-navy-blazer", "premium-hoodie-white", "samsung-tough-case-glossy", "samsung-tough-case-matte", "snapback-black", "snapback-dark-navy", "snapback-heather-grey", "snapback-navy", "snapback-silver", "snapback-spruce", "sticker-white", "structured-cap-black", "structured-cap-dark-navy", "structured-cap-white", "sweatshirt-black", "sweatshirt-forest-green", "sweatshirt-light-blue", "sweatshirt-light-pink", "sweatshirt-maroon", "sweatshirt-navy", "sweatshirt-sand", "sweatshirt-sport-grey", "sweatshirt-white", "tee-ash", "tee-black", "tee-black-heather", "tee-brown", "tee-dark-grey-heather", "tee-forest", "tee-heather-dust", "tee-heather-midnight-navy", "tee-heather-mint", "tee-heather-prism-ice-blue", "tee-maroon", "tee-navy", "tee-ocean-blue", "tee-silver", "tee-soft-cream", "tee-white", "tee-yellow", "tote-bag-black", "tote-bag-oyster", "trucker-cap-black", "tumbler-black", "tumbler-white", "utility-backpack-black", "visor-black", "visor-navy", "water-bottle-black", "water-bottle-white", "windbreaker-black", "windbreaker-forest-green", "windbreaker-navy", "women-s-hoodie-athletic-heather", "women-s-hoodie-black", "women-s-hoodie-charity-pink", "women-s-hoodie-hazy-pink", "women-s-polo-black", "women-s-polo-navy", "women-s-polo-sport-grey", "women-s-polo-white", "women-s-relaxed-tee-black", "women-s-relaxed-tee-dark-grey-heather", "women-s-relaxed-tee-navy", "women-s-relaxed-tee-pink", "women-s-relaxed-tee-white", "zip-hoodie-black", "zip-hoodie-carolina-blue", "zip-hoodie-navy", "zip-hoodie-sport-grey", "zip-hoodie-white"]);
/** Devonshire v7 model photos (public/shop/pf-model/), used in place of mockups where present. */
const MODELS = new Set<string>(["beach-towel-black", "bucket-hat-black", "bucket-hat-navy", "bum-bag-black", "crossbody-bag-black", "cuffed-beanie-black", "cuffed-beanie-brown", "cuffed-beanie-dark-grey", "cuffed-beanie-navy", "cuffed-beanie-olive", "dad-hat-black", "dad-hat-dark-grey", "dad-hat-navy", "embroidered-patch-black", "fisherman-beanie-black", "gym-bag-black", "hoodie-black", "hoodie-dark-chocolate", "hoodie-maroon", "hoodie-navy", "iphone-tough-case-black", "kids-hoodie-black", "kids-tee-black", "kids-tee-navy", "long-sleeve-tee-black", "long-sleeve-tee-midnight-blue", "low-profile-cap-black", "mug-black", "oversized-faded-tee-faded-black", "polo-black", "polo-navy", "pom-pom-beanie-black", "pom-pom-beanie-burgundy", "pom-pom-beanie-french-navy", "premium-hoodie-black", "premium-hoodie-charcoal-heather", "premium-hoodie-navy-blazer", "samsung-tough-case-black", "snapback-black", "snapback-dark-navy", "snapback-navy", "snapback-spruce", "sticker-black", "structured-cap-black", "structured-cap-dark-navy", "sweatshirt-black", "sweatshirt-forest-green", "sweatshirt-maroon", "sweatshirt-navy", "tee-black", "tee-black-heather", "tee-brown", "tee-dark-grey-heather", "tee-forest", "tee-heather-midnight-navy", "tee-maroon", "tee-navy", "tote-bag-black", "trucker-cap-black", "tumbler-black", "utility-backpack-black", "visor-black", "water-bottle-black", "windbreaker-black", "windbreaker-forest-green", "windbreaker-navy", "women-s-hoodie-black", "women-s-polo-black", "women-s-relaxed-tee-black", "women-s-relaxed-tee-dark-grey-heather", "women-s-relaxed-tee-navy", "zip-hoodie-black", "zip-hoodie-navy"]);
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");


/** Colours hidden because no stag mockup could be made yet ("pid:Colour"). */
export const HIDDEN: string[] = [];

/**
 * Only the stag mockup is shown for each colour (old photos removed); colours without one are hidden.
 * Alternate cards open on their second colour so the grid doesn't all start on the same one.
 */
/** Opens on a black (or single black-only) colour. */
export const opensBlack = (p: Merch) => /-black(\.|-)/.test(p.img) || /^black$/i.test(p.colors?.[0]?.name ?? "");

/** Reorders cards (within each category) so two cards opening on black are not side by side where avoidable. */
export function spreadBlack(list: Merch[]): Merch[] {
  const out = [...list];
  for (let i = 1; i < out.length; i++) {
    if (opensBlack(out[i]) && opensBlack(out[i - 1]) && out[i].cat === out[i - 1].cat) {
      const j = out.findIndex((x, k) => k > i && x.cat === out[i].cat && !opensBlack(x));
      if (j > 0) out.splice(i, 0, out.splice(j, 1)[0]);
    }
  }
  return out;
}

export function withStag(list: Merch[]): Merch[] {
  let n = 0;
  return list.map((p) => {
    const mk = (colour: string): MerchPhoto[] => {
      const f = `${slug(p.name)}-${slug(colour)}`;
      if (MODELS.has(f)) return [{ src: `/shop/pf-model/${f}.webp`, alt: `Model wearing the ESP ${p.name} in ${colour.toLowerCase()} with the embroidered Devonshire stag logo`, view: "model" }];
      return FILES.has(f) ? [{ src: `/shop/pf-stag/${f}.webp`, alt: `ESP ${p.name} in ${colour.toLowerCase()} with the embroidered Devonshire stag logo`, view: "front", note: "Mockup, colour may vary slightly" }] : [];
    };
    const details = p.details;
    if (!p.colors?.length) {
      const one: Record<string, string> = { "oversized-faded-tee": "faded-black", "bum-bag": "white", "gym-bag": "white", sticker: "white", "beach-towel": "white", "iphone-tough-case": "glossy", "samsung-tough-case": "glossy" };
      const f = `${slug(p.name)}-${one[slug(p.name)] ?? "black"}`;
      const own = FILES.has(f) ? f : undefined;
      const mod = MODELS.has(f) ? f : [...MODELS].find((m) => m.startsWith(slug(p.name) + "-"));
      const gallery: MerchPhoto[] = mod ? [{ src: `/shop/pf-model/${mod}.webp`, alt: `ESP ${p.name} with the embroidered Devonshire stag logo`, view: "model" }] : own ? [{ src: `/shop/pf-stag/${own}.webp`, alt: `ESP ${p.name} with the Devonshire stag logo`, view: "front", note: "Mockup, colour may vary slightly" }] : [];
      if (!own) HIDDEN.push(`${p.pid}:`);
      return { ...p, img: gallery[0]?.src ?? p.img, gallery, details };
    }
    let colors = p.colors.map((c) => ({ ...c, gallery: mk(c.name) }));
    for (const c of colors) if (!c.gallery.length) HIDDEN.push(`${p.pid}:${c.name}`);
    colors = colors.filter((c) => c.gallery.length);
    const variants = p.variants.filter((v) => !v.color || colors.some((c) => c.name === v.color));
    // Vary the opening colour: multi-colour cards open on their first non-black colour.
    const nb = colors.find((c) => !/black/i.test(c.name));
    if (nb) colors = [nb, ...colors.filter((c) => c !== nb)];
    return { ...p, img: colors[0]?.gallery[0].src ?? p.img, gallery: colors[0]?.gallery ?? [], colors, variants, details };
  });
}
