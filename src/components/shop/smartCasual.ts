import type { Merch, MerchPhoto, MerchVariant, PhotoView } from "./merch";

/**
 * Smart casual range: made to order and fulfilled BY HAND (never sent to the
 * automatic fulfilment partner). Each sale sends Matthew an order alert with the
 * saved design id, and he reorders that design and ships it to the customer.
 *
 * PLACEHOLDER PRICES: Matthew sets the final prices after buying samples. Change them here only (pence, GBP).
 * One price per product for every size: no 2XL+ upcharge.
 */
export const SMART_CASUAL_PRICES = {
  oxford: 7500,
  quarterZip: 8500,
  cardigan: 8500,
  gilet: 12000,
  chinos: 7500,
} as const;

/** Flat delivery for any order that contains smart casual items (pence). */
export const MADE_DELIVERY_PENCE = 695;
export const MADE_LEAD = "Made to order, usually ready in about 5 working days plus delivery.";

/** Sizes as listed on the supplier's product pages (25 Oct 2026). 2XL+ surcharges not yet checked. */
const TOPS_XS_4XL = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];
const CHINO_SIZES = [30, 32, 34, 36, 38, 40].flatMap((w) => [`W${w} Regular`, `W${w} Long`]);

/**
 * EXTRA PHOTOS for the smart casual gallery, in display order after the main (front) photo.
 * Key = the design's photo name (as in `d(...)` below). Drop the file into public/shop/sc/<file>.webp
 * and add one line here, e.g.
 *   "oxford-shirt-white": [{ view: "back", file: "oxford-shirt-white-back" }, { view: "model", file: "oxford-shirt-white-model" }],
 * `view` is one of front | back | side | model. New colours/products go in `defs` below as usual.
 */
export const SC_EXTRA_PHOTOS: Record<string, { view: PhotoView; file: string }[]> = {};

type Design = { colour: string; hex: string; light?: boolean; logo: "silver" | "black"; photo: string };
type Def = {
  pid: number;
  key: keyof typeof SMART_CASUAL_PRICES;
  name: string;
  sizes: string[];
  details: string[];
  designs: Design[];
};

const d = (colour: string, hex: string, logo: Design["logo"], photo: string, light = false): Design => ({ colour, hex, logo, photo, light });

const defs: Def[] = [
  {
    pid: 9100001, key: "oxford", name: "Oxford Shirt",
    sizes: TOPS_XS_4XL.slice(1), // S to 4XL
    details: ["Long-sleeve Oxford shirt, 70% cotton and 30% polyester", "Button-down collar, regular fit", "Embroidered mountain logo on the left chest"],
    designs: [
      d("Black", "#141414", "silver", "oxford-shirt-black"),
      d("White", "#ffffff", "black", "oxford-shirt-white", true),
      d("Blue", "#a9bcd6", "black", "oxford-shirt-blue", true),
    ],
  },
  {
    pid: 9100002, key: "quarterZip", name: "Quarter-Zip Knit",
    sizes: TOPS_XS_4XL,
    details: ["Knitted quarter-zip jumper, 55% cotton and 45% acrylic", "Fine knit with ribbed collar, cuffs and hem", "Embroidered silver mountain logo on the left chest"],
    designs: [
      d("Black", "#141414", "silver", "quarter-zip-knit-black"),
      d("Charcoal", "#4a4c50", "silver", "quarter-zip-knit-charcoal"),
      d("Navy", "#1c2552", "silver", "quarter-zip-knit-navy"),
    ],
  },
  {
    pid: 9100003, key: "cardigan", name: "V-Neck Cardigan",
    sizes: TOPS_XS_4XL,
    details: ["V-neck button cardigan, 50% cotton and 50% acrylic", "Fine knit with ribbed cuffs and hem", "Embroidered mountain logo on the left chest"],
    designs: [
      d("Black", "#141414", "silver", "cardigan-black"),
      d("Navy", "#1a2440", "black", "cardigan-navy"),
    ],
  },
  {
    pid: 9100004, key: "gilet", name: "Softshell Gilet",
    sizes: TOPS_XS_4XL.slice(0, 6), // XS to 2XL
    details: ["Softshell gilet, 92% polyester and 8% elastane, with a soft fleece back", "Full zip, two zip side pockets and a chest pocket", "Embroidered mountain logo on the left chest"],
    designs: [
      d("Black", "#141414", "silver", "softshell-gilet-black"),
      d("Titanium", "#4b5257", "silver", "softshell-gilet-titanium"),
      d("French Navy", "#1f2740", "silver", "softshell-gilet-french-navy"),
      d("Azure", "#1679b8", "black", "softshell-gilet-azure"),
      d("Classic Red", "#a3192e", "black", "softshell-gilet-classic-red"),
    ],
  },
  {
    pid: 9100005, key: "chinos", name: "Chinos",
    sizes: CHINO_SIZES,
    details: ["Classic fit chinos, 100% cotton twill", "Waist 30 to 40 inches. Regular leg 32 inches, long leg 34 inches", "Embroidered mountain logo by the left front pocket"],
    designs: [
      d("Black", "#141414", "silver", "chinos-black"),
      d("Slate", "#3c4a48", "silver", "chinos-slate"),
      d("Royal", "#1d4e9e", "silver", "chinos-royal"),
      d("Navy", "#1a2440", "silver", "chinos-navy"),
      d("Natural", "#d8cbb0", "black", "chinos-natural", true),
    ],
  },
];

/**
 * Variant id = pid × 1000 + colour × 20 + size (stable, and far from the partner's sync ids).
 * Supplier design ids live server-side in src/lib/madeDesigns.ts, never in the browser bundle.
 */
export const smartCasual: Merch[] = defs.map((p) => {
  const variants: MerchVariant[] = p.designs.flatMap((c, ci) =>
    p.sizes.map((label, i) => ({ id: p.pid * 1000 + ci * 20 + i + 1, vid: 0, label, pence: SMART_CASUAL_PRICES[p.key], color: c.colour })),
  );
  const photo = (c: Design): MerchPhoto => ({ src: `/shop/sc/${c.photo}.webp`, alt: `ESP ${p.name} in ${c.colour.toLowerCase()} with the embroidered mountain logo`, view: "front" });
  const viewAlt = { front: "front", back: "back", side: "side view", model: "worn by a model" } as const;
  const photos = (c: Design): MerchPhoto[] => [
    photo(c),
    ...(SC_EXTRA_PHOTOS[c.photo] ?? []).map((x) => ({ src: `/shop/sc/${x.file}.webp`, alt: `ESP ${p.name} in ${c.colour.toLowerCase()}, ${viewAlt[x.view]}`, view: x.view })),
  ];
  return {
    pid: p.pid,
    name: p.name,
    cat: "smartcasual",
    img: photo(p.designs[0]).src,
    gallery: photos(p.designs[0]),
    details: p.details,
    colors: p.designs.map((c) => ({ name: c.colour, hex: c.hex, light: c.light || undefined, gallery: photos(c) })),
    variants,
    made: true,
  };
});
