import type { Merch, MerchColor, MerchPhoto, PhotoView } from "./merch";

/**
 * Devonshire range round 1 (15 Nov 2026 lookbook). Shown in the shop, but not
 * purchasable until the supplier designs are saved (browseOnly). M5 (chore
 * jacket) is held back until its photos are fixed.
 */
const VIEWS: PhotoView[] = ["front", "side", "back"];
const VIEW_TEXT: Record<string, string> = {
  front: "front view",
  side: "side view",
  back: "back view",
};

type Tab = "mens" | "womens" | "equipment";

type Def = {
  code: "M1" | "M2" | "M3" | "M4" | "M6" | "M7" | "W1" | "W2" | "W3" | "W4" | "W5" | "W6" | "W7" | "E1" | "E2";
  pid: number;
  name: string;
  tab: Tab;
  colour: string;
  hex: string;
  light?: boolean;
  pence: number;
  sizes: string[];
  details: string[];
};

const LETTER = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"] as const;
const fromTo = (start: string, end: string, extra: string[] = []): string[] => {
  const all = [...extra, ...LETTER];
  return all.slice(all.indexOf(start), all.indexOf(end) + 1);
};
const chinoWaist = [30, 32, 34, 36, 38, 40, 42, 44].flatMap((w) => [`W${w} Regular`, `W${w} Long`]);

const DELIVERY =
  "Delivery: each piece is embroidered to order. Please allow up to 10 working days for dispatch; UK delivery options and charges are shown at checkout.";

const defs: Def[] = [
  {
    code: "M1",
    pid: 9100101,
    name: "The Piqué Polo",
    tab: "mens",
    colour: "Navy",
    hex: "#1C2338",
    pence: 5900,
    sizes: fromTo("S", "5XL"),
    details: [
      "A quietly smart polo in a close piqué knit of 200gsm combed cotton, finished with a two-button placket, knitted collar and cuffs, and side vents for ease. A small tonal stag is embroidered on the left chest. Classic, regular fit.",
      "Fabric and fit: 100% ringspun combed cotton (Navy, White, Khaki); Charcoal is 60% cotton, 40% polyester, 200gsm. Classic (regular) fit.",
      "Sizes: S, M, L, XL, 2XL, 3XL, 4XL, 5XL",
      "Care: Wash at 30°C inside out with similar colours. Do not bleach, tumble dry or dry clean. Iron on the reverse at a low setting, never over the embroidery.",
      DELIVERY,
    ],
  },
  {
    code: "M2",
    pid: 9100102,
    name: "The Oxford Shirt",
    tab: "mens",
    colour: "White",
    hex: "#F2F2F0",
    light: true,
    pence: 7900,
    sizes: fromTo("S", "4XL"),
    details: [
      "A crisp, lightweight Oxford shirt in a cotton-rich weave with a wrinkle-resistant finish and pearlised buttons. Regular fit with a clean front and no chest pocket; a small stag is embroidered in pale grey on the left chest.",
      "Fabric and fit: 70% cotton, 30% polyester lightweight Oxford weave, 150gsm. Regular fit.",
      "Sizes: S, M, L, XL, 2XL, 3XL, 4XL",
      "Care: Wash at 30°C inside out with similar colours. Do not bleach, tumble dry or dry clean. Iron on the reverse at a low setting, never over the embroidery.",
      DELIVERY,
    ],
  },
  {
    code: "M3",
    pid: 9100103,
    name: "The Fine Knit Crew",
    tab: "mens",
    colour: "Navy",
    hex: "#1C2338",
    pence: 8500,
    sizes: fromTo("S", "4XL"),
    details: [
      "A fine 12-gauge crew-neck jumper in a cotton and acrylic blend, with set-in sleeves and ribbed cuffs and hem. Slim fit and light enough to layer over a shirt, with a small tonal stag on the left chest.",
      "Fabric and fit: 50% cotton, 50% acrylic, 12 gauge fine knit. Slim fit.",
      "Sizes: S, M, L, XL, 2XL, 3XL, 4XL",
      "Care: Wash at 30°C inside out with similar colours. Do not bleach, tumble dry or dry clean. Iron on the reverse at a low setting, never over the embroidery.",
      DELIVERY,
    ],
  },
  {
    code: "M4",
    pid: 9100104,
    name: "The Padded Gilet",
    tab: "mens",
    colour: "French Navy",
    hex: "#16223C",
    pence: 11500,
    sizes: fromTo("S", "4XL"),
    details: [
      "A lightweight padded gilet with a water-repellent outer, a stand collar with chin guard and an inner storm flap. Two side pockets, a zipped inside pocket and an adjustable hem; a small tonal stag on the left chest.",
      "Fabric and fit: 100% polyester outer with water-repellent (DWR) finish, polyester padding, 66gsm outer. Regular fit.",
      "Sizes: S, M, L, XL, 2XL, 3XL, 4XL",
      "Care: Wash at 30°C inside out with similar colours. Do not bleach, tumble dry or dry clean. Iron on the reverse at a low setting, never over the embroidery.",
      DELIVERY,
    ],
  },
  {
    code: "M6",
    pid: 9100106,
    name: "The Chino",
    tab: "mens",
    colour: "Natural",
    hex: "#CDBBA0",
    light: true,
    pence: 7900,
    sizes: chinoWaist,
    details: [
      "Classic regular-fit chinos in 275gsm cotton twill, with a zip fly, button waist and two buttoned back pockets. Available in regular (32in) and long (34in) leg.",
      "Fabric and fit: 100% cotton twill, 275gsm. Regular fit.",
      "Sizes: Waist 30–44 in; Regular 32 in or Long 34 in leg (42 and 44 have an unfinished hem)",
      "Care: Wash at 30°C inside out with similar colours. Do not bleach, tumble dry or dry clean. Iron on the reverse at a low setting, never over the embroidery.",
      DELIVERY,
    ],
  },
  {
    code: "M7",
    pid: 9100107,
    name: "The Town Jacket",
    tab: "mens",
    colour: "Black",
    hex: "#161616",
    pence: 24500,
    sizes: fromTo("S", "4XL"),
    details: [
      "A clean zip-through town jacket with a smooth polyester outer and a quilted lining. Inside pocket and phone pocket; a small charcoal stag is embroidered on the left chest. Regular fit.",
      "Fabric and fit: 100% polyester pongee outer; 100% polyester quilted twill lining, 220gsm outer, 40gsm lining. Regular fit.",
      "Sizes: S, M, L, XL, 2XL, 3XL, 4XL",
      "Care: Wash at 30°C inside out with similar colours. Do not bleach, tumble dry or dry clean. Iron on the reverse at a low setting, never over the embroidery.",
      DELIVERY,
    ],
  },
  {
    code: "W1",
    pid: 9100111,
    name: "The Women's Piqué Polo",
    tab: "womens",
    colour: "Navy",
    hex: "#1C2338",
    pence: 5900,
    sizes: fromTo("XS", "2XL"),
    details: [
      "A tailored women's polo in 200gsm combed cotton piqué, with a slightly longer back hem and side splits. A small tonal stag is embroidered on the left chest.",
      "Fabric and fit: 100% ringspun combed cotton (Charcoal is 60% cotton, 40% polyester), 200gsm. Tailored women's fit.",
      "Sizes: XS, S, M, L, XL, 2XL",
      "Care: Wash at 30°C inside out with similar colours. Do not bleach, tumble dry or dry clean. Iron on the reverse at a low setting, never over the embroidery.",
      DELIVERY,
    ],
  },
  {
    code: "W2",
    pid: 9100112,
    name: "The Women's Oxford Shirt",
    tab: "womens",
    colour: "Blue",
    hex: "#A6B5D6",
    light: true,
    pence: 7900,
    sizes: fromTo("XS", "4XL"),
    details: [
      "A fitted women's Oxford shirt in a cotton-rich, wrinkle-resistant weave, shaped with front and back darts and finished with adjustable cuffs and pearlised buttons. A small stag is embroidered in a deeper blue on the left chest.",
      "Fabric and fit: 70% cotton, 30% polyester lightweight Oxford weave, 150gsm. Modern fitted.",
      "Sizes: XS, S, M, L, XL, 2XL, 3XL, 4XL",
      "Care: Wash at 30°C inside out with similar colours. Do not bleach, tumble dry or dry clean. Iron on the reverse at a low setting, never over the embroidery.",
      DELIVERY,
    ],
  },
  {
    code: "W3",
    pid: 9100113,
    name: "The Women's Fine Knit V-Neck",
    tab: "womens",
    colour: "Grey Marl",
    hex: "#8A8A88",
    light: true,
    pence: 8900,
    sizes: fromTo("XXS", "4XL", ["XXS"]),
    details: [
      "A fine 12-gauge V-neck in a cotton and acrylic blend, shaped at the waist and finished with a tubular cuff and hem. A small charcoal stag is embroidered on the left chest.",
      "Fabric and fit: 50% cotton, 50% acrylic, 12 gauge fine knit. Slim, shaped at the waist.",
      "Sizes: XXS–4XL (UK 6–22)",
      "Care: Wash at 30°C inside out with similar colours. Do not bleach, tumble dry or dry clean. Iron on the reverse at a low setting, never over the embroidery.",
      DELIVERY,
    ],
  },
  {
    code: "W4",
    pid: 9100114,
    name: "The Women's Padded Gilet",
    tab: "womens",
    colour: "Navy",
    hex: "#1C2338",
    pence: 11500,
    sizes: fromTo("XS", "2XL"),
    details: [
      "A slim padded gilet with narrow stitched baffles, a tonal zip with chin guard and concealed zipped pockets. It packs into its own bag. A small tonal stag is embroidered on the left chest.",
      "Fabric and fit: Nylon outer and lining, polyester fill, 250gsm fill. Slim fit.",
      "Sizes: XS, S, M, L, XL, 2XL",
      "Care: Wash at 30°C inside out with similar colours. Do not bleach, tumble dry or dry clean. Iron on the reverse at a low setting, never over the embroidery.",
      DELIVERY,
    ],
  },
  {
    code: "W5",
    pid: 9100115,
    name: "The Women's Softshell Jacket",
    tab: "womens",
    colour: "French Navy",
    hex: "#16223C",
    pence: 13900,
    sizes: fromTo("XS", "4XL"),
    details: [
      "A three-layer softshell with a bonded microfleece lining, water resistant to 5000mm and windproof. Full zip with inner storm flap, adjustable cuffs, a bungee hem and a dropped back; a small tonal stag on the left chest.",
      "Fabric and fit: 92% polyester, 8% elastane three-layer softshell with bonded microfleece lining, 340gsm. Feminine fit.",
      "Sizes: XS–4XL (UK 8 upward; see size guide)",
      "Care: Wash at 30°C inside out with similar colours. Do not bleach, tumble dry or dry clean. Iron on the reverse at a low setting, never over the embroidery.",
      DELIVERY,
    ],
  },
  {
    code: "W6",
    pid: 9100116,
    name: "The Women's Chino",
    tab: "womens",
    colour: "Natural",
    hex: "#CDBBA0",
    light: true,
    pence: 7900,
    sizes: fromTo("XS", "2XL"),
    details: [
      "Women's chinos in a 275gsm cotton twill with a touch of stretch, cut slim and slightly tailored to lengthen the leg. Zip fly with button waist, belt loops and two swing pockets.",
      "Fabric and fit: 98% cotton, 2% elastane twill, 275gsm. Slim, slightly tailored fit.",
      "Sizes: XS, S, M, L, XL, 2XL",
      "Care: Wash at 30°C inside out with similar colours. Do not bleach, tumble dry or dry clean. Iron on the reverse at a low setting, never over the embroidery.",
      DELIVERY,
    ],
  },
  {
    code: "W7",
    pid: 9100117,
    name: "The Women's Town Jacket",
    tab: "womens",
    colour: "Black",
    hex: "#161616",
    pence: 24500,
    sizes: fromTo("XS", "2XL"),
    details: [
      "A neat women's town jacket with a placket-covered zip, smooth polyester outer and quilted lining. Inside pocket and phone pocket; a small charcoal stag is embroidered on the left chest.",
      "Fabric and fit: 100% polyester pongee outer; 100% polyester quilted twill lining, 220gsm outer, 40gsm lining. Regular fit.",
      "Sizes: XS–2XL (UK 8–18)",
      "Care: Wash at 30°C inside out with similar colours. Do not bleach, tumble dry or dry clean. Iron on the reverse at a low setting, never over the embroidery.",
      DELIVERY,
    ],
  },
  {
    code: "E1",
    pid: 9100121,
    name: "The Cuffed Beanie",
    tab: "equipment",
    colour: "Navy",
    hex: "#1C2338",
    pence: 2800,
    sizes: ["One size"],
    details: [
      "A snug cuffed beanie in soft acrylic rib, 30cm long so it can be worn turned up. A tonal stag is embroidered on the front of the cuff. One size.",
      "Fabric and fit: 100% acrylic, 12in (30cm) length, one size, hand wash",
      "Sizes: One size",
      "Care: Hand wash.",
      DELIVERY,
    ],
  },
  {
    code: "E2",
    pid: 9100122,
    name: "The Cotton Cap",
    tab: "equipment",
    colour: "Stone",
    hex: "#C4B8A5",
    light: true,
    pence: 3400,
    sizes: ["One size"],
    details: [
      "An unstructured six-panel cap in cotton chino twill with a low profile, curved peak and an adjustable strap with buckle. A tonal stag is embroidered on the front. One size.",
      "Fabric and fit: 100% cotton chino twill, unstructured six-panel low profile, adjustable strap with buckle, one size",
      "Sizes: One size",
      "Care: See the care label.",
      DELIVERY,
    ],
  },
];

function gallery(d: Def): MerchPhoto[] {
  const folder = d.tab === "mens" ? "mens/" : d.tab === "womens" ? "womens/" : "";
  const hasStag = d.code !== "M6" && d.code !== "W6";
  return VIEWS.map((view) => {
    const stag = hasStag && view === "front" ? ` in ${d.colour.toLowerCase()} with the Devonshire stag logo,` : ` in ${d.colour.toLowerCase()},`;
    return {
      src: `/shop/r1/${folder}${d.code}-${view}.webp`,
      alt: `ESP ${d.name}${stag} ${VIEW_TEXT[view]}`,
      view,
    };
  });
}

function toMerch(d: Def): Merch {
  const photos = gallery(d);
  const color: MerchColor = {
    name: d.colour,
    hex: d.hex,
    gallery: photos,
    ...(d.light ? { light: true } : {}),
    ...(d.tab === "mens" ? { galleries: { male: photos } } : d.tab === "womens" ? { galleries: { female: photos } } : {}),
  };
  return {
    pid: d.pid,
    name: d.name,
    cat: d.tab === "equipment" ? "apparel" : "smartcasual",
    ...(d.tab === "equipment" ? { sub: "Headwear" } : {}),
    img: photos[0].src,
    gallery: photos,
    details: d.details,
    colors: [color],
    variants: d.sizes.map((label, i) => ({
      id: d.pid * 1000 + i + 1,
      vid: 0,
      label,
      pence: d.pence,
      color: d.colour,
    })),
    made: true,
    browseOnly: true,
  };
}

export const rangeRound1: Merch[] = defs.map(toMerch);

export const RANGE_ROUND1_PIDS = new Set(rangeRound1.map((p) => p.pid));
