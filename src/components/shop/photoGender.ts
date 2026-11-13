import type { Merch } from "./merch";

/**
 * Model gender in each shop photo, from viewing the actual image files (13 Nov 2026),
 * not from product names. Kids are classed by the child in the photo.
 * Paths are the first gallery image (v10 front, or denim back).
 */
export type PhotoGender = "male" | "female";

const PHOTO_GENDER: Record<string, PhotoGender> = {
  "/shop/v10/pp-tee-navy-front.webp": "male",
  "/shop/v10/pp-tee-black-front.webp": "male",
  "/shop/v10/pp-tee-black-heather-front.webp": "female",
  "/shop/v10/pp-tee-brown-front.webp": "female",
  "/shop/v10/pp-tee-heather-midnight-navy-front.webp": "male",
  "/shop/v10/pp-tee-forest-front.webp": "female",
  "/shop/v10/pp-tee-dark-grey-heather-front.webp": "male",
  "/shop/v10/pp-tee-maroon-front.webp": "male",
  "/shop/v10/pp-women-s-relaxed-tee-navy-front.webp": "female",
  "/shop/v10/pp-women-s-relaxed-tee-black-front.webp": "female",
  "/shop/v10/pp-women-s-relaxed-tee-dark-grey-heather-front.webp": "female",
  "/shop/v10/pp-women-s-polo-black-front.webp": "female",
  "/shop/v10/pp-polo-navy-front.webp": "male",
  "/shop/v10/pp-polo-black-front.webp": "male",
  "/shop/v10/pp-oversized-faded-tee-faded-black-front.webp": "female",
  "/shop/v10/pp-long-sleeve-tee-midnight-blue-front.webp": "female",
  "/shop/v10/pp-long-sleeve-tee-black-front.webp": "male",
  "/shop/v10/pp-sweatshirt-navy-front.webp": "male",
  "/shop/v10/pp-sweatshirt-black-front.webp": "female",
  "/shop/v10/pp-sweatshirt-forest-green-front.webp": "female",
  "/shop/v10/pp-sweatshirt-maroon-front.webp": "male",
  "/shop/v10/pp-hoodie-navy-front.webp": "female",
  "/shop/v10/pp-hoodie-black-front.webp": "male",
  "/shop/v10/pp-hoodie-maroon-front.webp": "male",
  "/shop/v10/pp-hoodie-dark-chocolate-front.webp": "female",
  "/shop/v10/pp-premium-hoodie-navy-blazer-front.webp": "male",
  "/shop/v10/pp-premium-hoodie-black-front.webp": "male",
  "/shop/v10/pp-premium-hoodie-charcoal-heather-front.webp": "female",
  "/shop/v10/pp-women-s-hoodie-black-front.webp": "female",
  "/shop/v10/pp-zip-hoodie-navy-front.webp": "male",
  "/shop/v10/pp-zip-hoodie-black-front.webp": "female",
  "/shop/v10/pp-kids-tee-navy-front.webp": "female",
  "/shop/v10/pp-kids-tee-black-front.webp": "male",
  "/shop/v10/pp-kids-hoodie-black-front.webp": "female",
  "/shop/v10/pp-windbreaker-navy-front.webp": "female",
  "/shop/v10/pp-windbreaker-black-front.webp": "male",
  "/shop/v10/pp-windbreaker-forest-green-front.webp": "male",
  "/shop/v10/sc-oxford-ls-black-front.webp": "male",
  "/shop/v10/sc-oxford-ls-white-front.webp": "male",
  "/shop/v10/sc-oxford-ls-blue-front.webp": "female",
  "/shop/v10/sc-quarterzip-charcoal-front.webp": "male",
  "/shop/v10/sc-quarterzip-black-front.webp": "female",
  "/shop/v10/sc-quarterzip-navy-front.webp": "female",
  "/shop/v10/sc-vcardigan-black-front.webp": "male",
  "/shop/v10/sc-vcardigan-navy-front.webp": "male",
  "/shop/v10/sc-vcardigan-grey-marl-front.webp": "female",
  "/shop/v10/sc-gilet-titanium-front.webp": "male",
  "/shop/v10/sc-gilet-black-front.webp": "female",
  "/shop/v10/sc-gilet-french-navy-front.webp": "male",
  "/shop/v10/sc-gilet-azure-front.webp": "female",
  "/shop/v10/sc-gilet-classic-red-front.webp": "male",
  "/shop/v10/sc-chinos-royal-front.webp": "female",
  "/shop/v10/sc-chinos-black-front.webp": "female",
  "/shop/v10/sc-chinos-slate-front.webp": "male",
  "/shop/v10/sc-chinos-navy-front.webp": "male",
  "/shop/v10/sc-chinos-natural-front.webp": "female",
  "/shop/v10/sc-oxford-ss-blue-front.webp": "male",
  "/shop/v10/sc-oxford-ss-white-front.webp": "male",
  "/shop/v10/sc-oxford-ss-black-front.webp": "female",
  "/shop/v10/sc-polo-ss-heather-grey-front.webp": "female",
  "/shop/v10/sc-polo-ss-white-front.webp": "male",
  "/shop/v10/sc-polo-ss-navy-front.webp": "male",
  "/shop/v10/sc-polo-ss-black-front.webp": "female",
  "/shop/v10/sc-polo-ls-white-front.webp": "female",
  "/shop/v10/sc-polo-ls-charcoal-front.webp": "male",
  "/shop/v10/sc-polo-ls-navy-front.webp": "female",
  "/shop/v10/sc-polo-ls-black-front.webp": "male",
  "/shop/v10/sc-zipcardigan-grey-marl-front.webp": "female",
  "/shop/v10/sc-zipcardigan-black-front.webp": "male",
  "/shop/v10/sc-zipcardigan-navy-front.webp": "female",
  "/shop/v10/sc-crewknit-navy-front.webp": "male",
  "/shop/v10/sc-crewknit-black-front.webp": "female",
  "/shop/v10/sc-crewknit-grey-marl-front.webp": "male",
  "/shop/v10/sc-softshell-azure-front.webp": "female",
  "/shop/v10/sc-softshell-black-front.webp": "male",
  "/shop/v10/sc-softshell-french-navy-front.webp": "female",
  "/shop/v10/sc-chinoshorts-natural-front.webp": "female",
  "/shop/v10/sc-chinoshorts-white-front.webp": "male",
  "/shop/v10/sc-chinoshorts-slate-front.webp": "male",
  "/shop/v10/sc-chinoshorts-navy-front.webp": "female",
  "/shop/v10/sc-chinoshorts-black-front.webp": "female",
  "/shop/v10/denim-leo-straight-black-back.webp": "male",
  "/shop/v10/denim-leo-straight-dark-blue-wash-back.webp": "male",
  "/shop/v10/denim-max-slim-black-back.webp": "male",
  "/shop/v10/denim-max-slim-dark-blue-wash-back.webp": "male",
  "/shop/v10/denim-womens-katy-straight-dark-blue-wash-back.webp": "female",
  "/shop/v10/denim-womens-lara-skinny-black-back.webp": "female",
};

export function photoGender(src?: string): PhotoGender | undefined {
  if (!src) return undefined;
  if (PHOTO_GENDER[src]) return PHOTO_GENDER[src];
  // Same model as the front, if a side or back of a model set is passed.
  if (!src.includes("/denim-")) {
    return PHOTO_GENDER[src.replace(/-(side|back)\.webp$/, "-front.webp")];
  }
  return undefined;
}

export function hasGenderPhoto(p: Merch, gender: PhotoGender): boolean {
  if (p.colors && p.colors.length > 0) {
    return p.colors.some((c) => photoGender(c.gallery[0]?.src) === gender);
  }
  return photoGender(p.img) === gender;
}

/**
 * A copy of the product for one clothing tab: only colours whose photo matches that tab,
 * with the card and default detail image set to the first matching colour.
 */
export function forTab(p: Merch, tab: "mens" | "womens" | "equipment"): Merch | null {
  if (tab === "equipment") return p;
  const want: PhotoGender = tab === "mens" ? "male" : "female";
  if (p.colors && p.colors.length > 0) {
    const colors = p.colors.filter((c) => photoGender(c.gallery[0]?.src) === want);
    if (colors.length === 0) return null;
    const first = colors[0];
    const variants = p.variants.filter((v) => !v.color || colors.some((c) => c.name === v.color));
    return { ...p, colors, variants, img: first.gallery[0]?.src ?? p.img, gallery: first.gallery };
  }
  if (photoGender(p.img) !== want) return null;
  return p;
}
