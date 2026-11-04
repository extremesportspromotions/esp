import { v10Gallery } from "./v10";
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
  // v2 styles (25 Oct): placeholders copied from the nearest existing item.
  ssOxford: 7500, // = Oxford shirt
  mercPolo: 7500, // = Oxford shirt
  lsPolo: 7500, // = Oxford shirt
  zipCardigan: 8500, // = V-neck cardigan
  crewJumper: 8500, // = V-neck cardigan / quarter-zip
  softshellJacket: 12000, // = softshell gilet
  chinoShorts: 7500, // = chinos
  denim: 7900, // Devonshire jeans, approved by Matthew at £79 (31 Oct 2026)
} as const;

/** Flat delivery for any order that contains smart casual items (pence). */
export const MADE_DELIVERY_PENCE = 695;
export const MADE_LEAD = "Made to order, usually ready in about 5 working days plus delivery.";

/** Sizes as listed on the supplier's product pages (25 Oct 2026). 2XL+ surcharges not yet checked. */
const TOPS_XS_4XL = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];
const CHINO_SIZES = [30, 32, 34, 36, 38, 40].flatMap((w) => [`W${w} Regular`, `W${w} Long`]);

/**
 * PHOTOS (v2, 25 Oct 2026, AI illustrations from the Devonshire brand agent (was SXPeaks Fashion), to be replaced by real sample photos).
 * These are the final thread renders: dark grey thread on light colours, silver-grey on the rest, no black.
 * Files live in public/shop/sc/v2/<photo>-<file>.webp, where <photo> is the colour's photo name in `defs`
 * and <file> is front | back | side | detail (close-up) | model. Every colour has front, back, side and
 * close-up; the one colour per style that has a model shot is marked with `model` in `d(...)`.
 * Shown in this order: front, back, side, close-up, model. To swap a photo, overwrite the .webp
 * with the same name. To add extra photos, list them in SC_EXTRA_PHOTOS (they go after the standard ones).
 */
const STANDARD_VIEWS: { view: PhotoView; file: string }[] = [
  { view: "front", file: "front" },
  { view: "back", file: "back" },
  { view: "side", file: "side" },
  { view: "close-up", file: "detail" },
];
/** Devonshire v7 (31 Oct 2026): colours with a front-on-model photo (<photo>-model.webp). */
const V7_MODEL = new Set("chinos-black chinos-slate chinos-royal chinos-navy chinos-natural shorts-white shorts-natural shorts-slate shorts-navy shorts-black crewknit-black crewknit-grey-marl crewknit-navy gilet-azure gilet-black gilet-classic-red gilet-french-navy gilet-titanium oxford-ls-black oxford-ls-blue oxford-ls-white oxford-ss-black oxford-ss-blue oxford-ss-white polo-ls-black polo-ls-charcoal polo-ls-navy polo-ls-white polo-ss-black polo-ss-heather-grey polo-ss-navy polo-ss-white quarterzip-black quarterzip-charcoal quarterzip-navy softshell-azure softshell-black softshell-french-navy vcardigan-black vcardigan-grey-marl vcardigan-navy zipcardigan-black zipcardigan-grey-marl zipcardigan-navy".split(" "));
/** Colour each card opens on (display order only; variant ids still follow `designs`). */
const OPEN: Partial<Record<keyof typeof SMART_CASUAL_PRICES, string>> = {
  oxford: "Black", quarterZip: "Charcoal", cardigan: "Black", gilet: "Titanium", chinos: "Royal", ssOxford: "Blue",
  mercPolo: "Heather Grey", lsPolo: "White", zipCardigan: "Grey Marl", crewJumper: "Navy", softshellJacket: "Azure", chinoShorts: "Natural",
};
export const SC_EXTRA_PHOTOS: Record<string, { view: PhotoView; file: string }[]> = {
  // Devonshire v6 (31 Oct 2026): second model shot
  "oxford-ls-white": [{ view: "model", file: "model2" }],
  "softshell-french-navy": [{ view: "model", file: "model2" }],
};

/** `thread`: embroidery thread on the photos/design record (dark grey on light colours, silver-grey otherwise). */
type Design = { colour: string; hex: string; light?: boolean; thread: "silver-grey" | "dark grey"; photo: string; model?: boolean; img?: string; alt?: string; oos?: string[] };
type Def = {
  pid: number;
  key: keyof typeof SMART_CASUAL_PRICES;
  name: string;
  code: string; // supplier product code (reference only)
  sizes: string[];
  details: string[];
  designs: Design[];
  sub?: string;
};

const SG = "silver-grey" as const;
const DG = "dark grey" as const;
const d = (colour: string, hex: string, thread: Design["thread"], photo: string, o: { light?: boolean; model?: boolean; img?: string; alt?: string; oos?: string[] } = {}): Design => ({ colour, hex, thread, photo, ...o });
const CHEST = "Embroidered Devonshire stag logo on the left chest";

/**
 * NEVER reorder or remove existing colours (the variant ids depend on the position): add new colours at the end.
 * A colour can only be ordered once its supplier design number is in src/lib/madeDesigns.ts.
 */
const defs: Def[] = [
  {
    pid: 9100001, key: "oxford", name: "Long Sleeve Oxford Shirt", code: "HB512",
    sizes: TOPS_XS_4XL.slice(1), // S to 4XL
    details: ["Long-sleeve Oxford shirt, 70% cotton and 30% polyester", "Button-down collar, regular fit", CHEST],
    designs: [
      d("Black", "#1C1C1E", SG, "oxford-ls-black"),
      d("White", "#F2F2F0", DG, "oxford-ls-white", { light: true, model: true }),
      d("Blue", "#AAB9DA", DG, "oxford-ls-blue", { light: true }),
    ],
  },
  {
    pid: 9100002, key: "quarterZip", name: "Quarter-Zip Knit", code: "PR695",
    sizes: TOPS_XS_4XL,
    details: ["Knitted quarter-zip jumper, 55% cotton and 45% acrylic", "Fine knit with ribbed collar, cuffs and hem", "Embroidered silver Devonshire stag logo on the left chest"],
    designs: [
      d("Black", "#161616", SG, "quarterzip-black"),
      d("Charcoal", "#38383D", SG, "quarterzip-charcoal", { model: true }),
      d("Navy", "#1C2338", SG, "quarterzip-navy", { model: true }),
    ],
  },
  {
    pid: 9100003, key: "cardigan", name: "V-Neck Cardigan", code: "H722",
    sizes: TOPS_XS_4XL,
    details: ["V-neck button cardigan, 50% cotton and 50% acrylic", "Fine knit with ribbed cuffs and hem", CHEST],
    designs: [
      d("Black", "#161616", SG, "vcardigan-black"),
      d("Navy", "#1C2338", SG, "vcardigan-navy", { model: true }),
      d("Grey Marl", "#3D3C39", SG, "vcardigan-grey-marl", { model: true }),
    ],
  },
  {
    pid: 9100004, key: "gilet", name: "Softshell Gilet", code: "J141M",
    sizes: TOPS_XS_4XL.slice(0, 6), // XS to 2XL
    details: ["Softshell gilet, 92% polyester and 8% elastane, with a soft fleece back", "Full zip, two zip side pockets and a chest pocket", CHEST],
    designs: [
      d("Black", "#18191B", SG, "gilet-black"),
      d("Titanium", "#3B4245", SG, "gilet-titanium"),
      d("French Navy", "#16223C", SG, "gilet-french-navy", { model: true }),
      d("Azure", "#0A62A8", SG, "gilet-azure"),
      d("Classic Red", "#B81E36", SG, "gilet-classic-red"),
    ],
  },
  {
    pid: 9100005, key: "chinos", name: "Chinos", code: "AQ050",
    sizes: CHINO_SIZES,
    details: ["Classic fit chinos, 100% cotton twill", "Waist 30 to 40 inches. Regular leg 32 inches, long leg 34 inches", "Embroidered logo by the left front pocket"],
    designs: [
      d("Black", "#1C1C1C", SG, "chinos-black"),
      d("Slate", "#5A5D66", SG, "chinos-slate"),
      d("Royal", "#24337A", SG, "chinos-royal"),
      d("Navy", "#222839", SG, "chinos-navy"),
      d("Natural", "#CDBBA0", DG, "chinos-natural", { light: true, model: true }),
    ],
  },
  // ---- new v2 styles (25 Oct 2026): not orderable until their supplier designs are saved ----
  {
    pid: 9100006, key: "ssOxford", name: "Short Sleeve Oxford Shirt", code: "HB517",
    sizes: TOPS_XS_4XL,
    details: ["Short-sleeve Oxford shirt", CHEST],
    designs: [
      d("White", "#F2F2F0", DG, "oxford-ss-white", { light: true }),
      d("Blue", "#A6B5D6", DG, "oxford-ss-blue", { light: true, model: true }),
      d("Black", "#1C1C1E", SG, "oxford-ss-black"),
    ],
  },
  {
    pid: 9100007, key: "mercPolo", name: "Mercerised Polo", code: "AQ101",
    sizes: TOPS_XS_4XL.slice(1, 7), // S to 3XL
    details: ["Premium mercerised polo shirt", CHEST],
    designs: [
      d("White", "#F2F2F0", DG, "polo-ss-white", { light: true }),
      d("Heather Grey", "#ADACAA", DG, "polo-ss-heather-grey", { light: true, model: true }),
      d("Navy", "#1C2338", SG, "polo-ss-navy", { model: true }),
      d("Black", "#1B1B1B", SG, "polo-ss-black"),
    ],
  },
  {
    pid: 9100008, key: "lsPolo", name: "Long Sleeve Polo", code: "AQ030",
    sizes: [...TOPS_XS_4XL.slice(1), "5XL"], // S to 5XL
    details: ["Long-sleeve polo shirt, classic fit", CHEST],
    designs: [
      d("White", "#F0F0EE", DG, "polo-ls-white", { light: true, model: true }),
      d("Charcoal", "#4A4A4C", SG, "polo-ls-charcoal"),
      d("Navy", "#1C2338", SG, "polo-ls-navy"),
      d("Black", "#1E1E1E", SG, "polo-ls-black"),
    ],
  },
  {
    pid: 9100009, key: "zipCardigan", name: "Zip-Through Cardigan", code: "H718",
    sizes: ["2XS", ...TOPS_XS_4XL.slice(0, 7)], // 2XS to 3XL
    details: ["Zip-through cardigan, unisex", CHEST],
    designs: [
      d("Black", "#161616", SG, "zipcardigan-black"),
      d("Navy", "#1C2338", SG, "zipcardigan-navy", { model: true }),
      d("Grey Marl", "#3D3C39", SG, "zipcardigan-grey-marl", { model: true }),
    ],
  },
  {
    pid: 9100010, key: "crewJumper", name: "Crew Neck Jumper", code: "HB725",
    sizes: TOPS_XS_4XL.slice(1), // S to 4XL
    details: ["Crew neck jumper", CHEST],
    designs: [
      d("Black", "#161616", SG, "crewknit-black", { model: true }),
      d("Navy", "#1C2338", SG, "crewknit-navy", { model: true }),
      d("Grey Marl", "#3D3C39", SG, "crewknit-grey-marl"),
    ],
  },
  {
    pid: 9100011, key: "softshellJacket", name: "Softshell Jacket", code: "140M",
    sizes: TOPS_XS_4XL,
    details: ["Men's softshell jacket", CHEST],
    designs: [
      d("Black", "#1B1B1B", SG, "softshell-black", { model: true }),
      d("French Navy", "#16223C", SG, "softshell-french-navy", { model: true }),
      d("Azure", "#0A62A8", SG, "softshell-azure"),
    ],
  },
  {
    pid: 9100012, key: "chinoShorts", name: "Chino Shorts", code: "AQ051",
    sizes: TOPS_XS_4XL,
    details: ["Classic fit chino shorts", "Embroidered logo by the left front pocket"],
    designs: [
      d("White", "#EDEDEB", DG, "shorts-white", { light: true }),
      d("Natural", "#CEBFA6", DG, "shorts-natural", { light: true, model: true }),
      d("Slate", "#4E4E4C", SG, "shorts-slate"),
      d("Navy", "#222839", SG, "shorts-navy"),
      d("Black", "#1E1E1E", SG, "shorts-black"),
    ],
  },
  // ---- Devonshire denim (31 Oct 2026): 6 jeans, one colour each (fabric differs by wash).
  // Back-view illustrations; stag on the right back pocket. Sizes from the pack; `oos` = OUT on 31 Oct (recheck before launch).
  // Not orderable until their supplier designs are saved: add them to DESIGNS in src/lib/madeDesigns.ts (pids 9100013-9100018).
  {
    pid: 9100013, key: "denim", name: "Devonshire Leo Straight Jeans, Black", code: "", sub: "Denim",
    sizes: ["W28 R (leg 31in)", "W28 L (leg 33in)", "W30 R (leg 31in)", "W30 L (leg 33in)", "W32 R (leg 31in)", "W32 L (leg 33in)", "W34 R (leg 31in)", "W34 L (leg 33in)", "W36 R (leg 31in)", "W36 L (leg 33in)", "W38 R (leg 31in)", "W38 L (leg 33in)", "W40 R (leg 31in)", "W40 L (leg 33in)"],
    details: ["A straight-leg jean in deep black stretch denim, finished with the Devonshire stag stitched tone-on-tone on the right back pocket. Stretch denim with 5-pocket styling, self-fabric belt loops, a shank button and zip fly, metal rivets at the pocket corners and twin-needle stitching. Fabric: 73% cotton, 25% polyester, 2% elastane; 11oz. Fit: straight fit. Made to order."],
    designs: [d("Black", "#1A1A1C", DG, "denim/leo-straight-black", { img: "/shop/v10/denim-leo-straight-black-back.webp", alt: "Back view of a model wearing Devonshire Leo Straight Jeans in Black, with a small dark grey stag embroidered on the right back pocket.", oos: [] })],
  },
  {
    pid: 9100014, key: "denim", name: "Devonshire Leo Straight Jeans, Dark Blue Wash", code: "", sub: "Denim",
    sizes: ["W28 R (leg 31in)", "W28 L (leg 33in)", "W30 R (leg 31in)", "W30 L (leg 33in)", "W32 R (leg 31in)", "W32 L (leg 33in)", "W34 R (leg 31in)", "W34 L (leg 33in)", "W36 R (leg 31in)", "W36 L (leg 33in)", "W38 R (leg 31in)", "W38 L (leg 33in)", "W40 R (leg 31in)", "W40 L (leg 33in)"],
    details: ["A straight-leg jean in dark blue wash stretch denim, finished with the Devonshire stag stitched tone-on-tone on the right back pocket. Stretch denim with 5-pocket styling, self-fabric belt loops, a shank button and zip fly, metal rivets at the pocket corners and twin-needle stitching. Fabric: 99% cotton, 1% elastane; 10.5oz. Fit: straight fit; light blasting and whiskering. Made to order."],
    designs: [d("Dark Blue Wash", "#1F2A44", DG, "denim/leo-straight-dark-blue-wash", { img: "/shop/v10/denim-leo-straight-dark-blue-wash-back.webp", alt: "Back view of a model wearing Devonshire Leo Straight Jeans in Dark Blue Wash, with a small dark grey stag embroidered on the right back pocket.", oos: ["W36 L (leg 33in)"] })],
  },
  {
    pid: 9100015, key: "denim", name: "Devonshire Max Slim Jeans, Black", code: "", sub: "Denim",
    sizes: ["W28 R (leg 31in)", "W28 L (leg 33in)", "W30 R (leg 31in)", "W30 L (leg 33in)", "W32 R (leg 31in)", "W32 L (leg 33in)", "W34 R (leg 31in)", "W34 L (leg 33in)", "W36 R (leg 31in)", "W36 L (leg 33in)", "W38 R (leg 31in)", "W38 L (leg 33in)", "W40 R (leg 31in)", "W40 L (leg 33in)"],
    details: ["A slim-fit jean in deep black stretch denim, finished with the Devonshire stag stitched tone-on-tone on the right back pocket. Stretch denim with 5-pocket styling, self-fabric belt loops, a shank button and zip fly, metal rivets at the pocket corners and twin-needle stitching. Fabric: 73% cotton, 25% polyester, 2% elastane; 10.5oz. Fit: slim fit. Made to order."],
    designs: [d("Black", "#1A1A1C", DG, "denim/max-slim-black", { img: "/shop/v10/denim-max-slim-black-back.webp", alt: "Back view of a model wearing Devonshire Max Slim Jeans in Black, with a small dark grey stag embroidered on the right back pocket.", oos: [] })],
  },
  {
    pid: 9100016, key: "denim", name: "Devonshire Max Slim Jeans, Dark Blue Wash", code: "", sub: "Denim",
    sizes: ["W28 R (leg 31in)", "W28 L (leg 33in)", "W30 R (leg 31in)", "W30 L (leg 33in)", "W32 R (leg 31in)", "W32 L (leg 33in)", "W34 R (leg 31in)", "W34 L (leg 33in)", "W36 R (leg 31in)", "W36 L (leg 33in)", "W38 R (leg 31in)", "W38 L (leg 33in)", "W40 R (leg 31in)", "W40 L (leg 33in)"],
    details: ["A slim-fit jean in dark blue wash stretch denim, finished with the Devonshire stag stitched tone-on-tone on the right back pocket. Stretch denim with 5-pocket styling, self-fabric belt loops, a shank button and zip fly, metal rivets at the pocket corners and twin-needle stitching. Fabric: 99% cotton, 1% elastane; 10.5oz. Fit: slim fit; light blasting and whiskering. Made to order."],
    designs: [d("Dark Blue Wash", "#1F2A44", DG, "denim/max-slim-dark-blue-wash", { img: "/shop/v10/denim-max-slim-dark-blue-wash-back.webp", alt: "Back view of a model wearing Devonshire Max Slim Jeans in Dark Blue Wash, with a small dark grey stag embroidered on the right back pocket.", oos: ["W36 R (leg 31in)"] })],
  },
  {
    pid: 9100017, key: "denim", name: "Devonshire Women's Katy Straight Jeans, Dark Blue Wash", code: "", sub: "Denim",
    sizes: ["UK 6 R (leg 30in)", "UK 6 L (leg 32in)", "UK 8 R (leg 30in)", "UK 8 L (leg 32in)", "UK 10 R (leg 30in)", "UK 10 L (leg 32in)", "UK 12 R (leg 30in)", "UK 12 L (leg 32in)", "UK 14 R (leg 30in)", "UK 14 L (leg 32in)", "UK 16 R (leg 30in)", "UK 16 L (leg 32in)", "UK 18 R (leg 30in)", "UK 18 L (leg 32in)"],
    details: ["A straight-leg jean in dark blue wash stretch denim, finished with the Devonshire stag stitched tone-on-tone on the right back pocket. Stretch denim with 5-pocket styling, self-fabric belt loops, a shank button and zip fly, metal rivets at the pocket corners and twin-needle stitching. Fabric: 99% cotton, 1% elastane; 9oz. Fit: straight fit; light blasting and whiskering. Made to order."],
    designs: [d("Dark Blue Wash", "#1F2A44", DG, "denim/womens-katy-straight-dark-blue-wash", { img: "/shop/v10/denim-womens-katy-straight-dark-blue-wash-back.webp", alt: "Back view of a model wearing Devonshire Women's Katy Straight Jeans in Dark Blue Wash, with a small dark grey stag embroidered on the right back pocket.", oos: [] })],
  },
  {
    pid: 9100018, key: "denim", name: "Devonshire Women's Lara Skinny Jeans, Black", code: "", sub: "Denim",
    sizes: ["UK 6 S (leg 28in)", "UK 6 R (leg 30in)", "UK 6 L (leg 32in)", "UK 8 S (leg 28in)", "UK 8 R (leg 30in)", "UK 8 L (leg 32in)", "UK 10 S (leg 28in)", "UK 10 R (leg 30in)", "UK 10 L (leg 32in)", "UK 12 S (leg 28in)", "UK 12 R (leg 30in)", "UK 12 L (leg 32in)", "UK 14 S (leg 28in)", "UK 14 R (leg 30in)", "UK 14 L (leg 32in)", "UK 16 S (leg 28in)", "UK 16 R (leg 30in)", "UK 16 L (leg 32in)", "UK 18 S (leg 28in)", "UK 18 R (leg 30in)", "UK 18 L (leg 32in)"],
    details: ["A mid-rise skinny jean in deep black stretch denim, finished with the Devonshire stag stitched tone-on-tone on the right back pocket. Stretch denim with 5-pocket styling, self-fabric belt loops, a shank button and zip fly, metal rivets at the pocket corners and twin-needle stitching. Fabric: 77% cotton, 21% polyester, 2% elastane; 9oz. Fit: skinny fit, mid rise. Made to order."],
    designs: [d("Black", "#1A1A1C", DG, "denim/womens-lara-skinny-black", { img: "/shop/v10/denim-womens-lara-skinny-black-back.webp", alt: "Back view of a model wearing Devonshire Women's Lara Skinny Jeans in Black, with a small dark grey stag embroidered on the right back pocket.", oos: [] })],
  },
];

/**
 * Variant id = pid × 1000 + colour × 20 + size (stable, and far from the partner's sync ids).
 * Supplier design ids live server-side in src/lib/madeDesigns.ts, never in the browser bundle.
 */
export const smartCasual: Merch[] = defs.map((p) => {
  const variants: MerchVariant[] = p.designs.flatMap((c, ci) =>
    p.sizes.map((label, i) => ({ id: p.pid * 1000 + ci * 20 + i + 1, vid: 0, label, pence: SMART_CASUAL_PRICES[p.key], color: c.colour, ...(c.oos?.includes(label) ? { oos: true } : {}) })),
  );
  const logo = "embroidered Devonshire stag logo";
  const alt = (c: Design, view: PhotoView) => {
    const it = `${p.name} in ${c.colour.toLowerCase()}`;
    if (view === "model") return `Model wearing the ESP ${it}`;
    if (view === "close-up") return `Close-up of the ${logo} on the ESP ${it}`;
    return `ESP ${it}, ${view === "front" ? `front, with the ${logo}` : view === "side" ? "side view" : "back"}`;
  };
  const ph = (c: Design, view: PhotoView, file: string): MerchPhoto => ({
    src: `/shop/sc/v2/${c.photo}-${file}.webp`,
    alt: alt(c, view),
    view,
  });
  // Devonshire v6 (31 Oct 2026): the model photo (if any) is shown first.
  // v8e (31 Oct 2026): chinos and chino shorts now have stag-only photos too. They stay hidden from the shop
  // until their stag Clothes2order designs are saved (see HELD / DESIGNS in src/lib/madeDesigns.ts).
  const oldLogo = false;
  // Everything else shows only the Devonshire stag model photos (old logo photos removed).
  const photos = (c: Design): MerchPhoto[] => c.img
    ? [{ src: c.img, alt: c.alt ?? alt(c, "back"), view: "back" }] // caption shown once, under the Denim heading
    : oldLogo
    ? [...(c.model ? [ph(c, "model", "model")] : []), ...STANDARD_VIEWS.map((x) => ph(c, x.view, x.file))]
    : [
        ...(V7_MODEL.has(c.photo)
          ? v10Gallery(`sc-${c.photo.replace(/^shorts-/, "chinoshorts-")}`, `Model wearing the ESP ${p.name} in ${c.colour.toLowerCase()}`, /^(chinos|shorts)-/.test(c.photo) ? ", with the embroidered Devonshire stag on the right back pocket" : "")
          : c.model ? [ph(c, "model", "model")] : []),
        ...(SC_EXTRA_PHOTOS[c.photo] ?? []).map((x) => ph(c, x.view, x.file)),
      ];
  const shownDesigns = p.designs.filter((c) => photos(c).length);
  const first = shownDesigns.find((c) => c.colour === OPEN[p.key]) ?? shownDesigns[0];
  const shown = [first, ...shownDesigns.filter((c) => c !== first)];
  return {
    pid: p.pid,
    name: p.name,
    cat: "smartcasual",
    ...(p.sub ? { sub: p.sub } : {}),
    img: photos(first)[0].src,
    gallery: photos(first),
    details: p.details,
    colors: shown.map((c) => ({ name: c.colour, hex: c.hex, light: c.light || undefined, gallery: photos(c) })),
    variants: variants.filter((v) => shown.some((c) => c.colour === v.color)),
    made: true,
  };
});

/** "pid:Colour" key for a smart casual colourway (used for the not-yet-orderable list; no supplier data). */
export const scKey = (pid: number, colour?: string) => `${pid}:${colour ?? ""}`;

/** Devonshire denim product ids (shown in the Denim group; preview shows them even before their designs exist). */
export const DENIM_PIDS = new Set(defs.filter((p) => p.sub === "Denim").map((p) => p.pid));
