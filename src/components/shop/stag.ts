import type { Merch, MerchPhoto } from "./merch";

/**
 * Devonshire stag mockups (31 Oct 2026) for partner-made products, shown first for the matching colour
 * until model photos exist. Files: public/shop/pf-stag/<file>.webp. Caps show the logo on the front; the visor shows the stag only.
 */
const STAG: Record<number, [colour: string, file: string][]> = {
 "484536929": [
  [
   "Black",
   "crossbody-bag-black"
  ],
  [
   "Fresh Pink",
   "crossbody-bag-fresh-pink"
  ]
 ],
 "484535849": [
  [
   "Dark Navy",
   "structured-cap-dark-navy"
  ],
  [
   "White",
   "structured-cap-white"
  ]
 ],
 "484535845": [
  [
   "Black",
   "dad-hat-black"
  ],
  [
   "White",
   "dad-hat-white"
  ]
 ],
 "484535816": [
  [
   "Dark Navy",
   "snapback-dark-navy"
  ],
  [
   "Heather Grey",
   "snapback-heather-grey"
  ]
 ],
 "484535801": [
  [
   "Black",
   "low-profile-cap-black"
  ]
 ],
 "484535781": [
  [
   "Black",
   "pom-pom-beanie-black"
  ],
  [
   "White",
   "pom-pom-beanie-white"
  ]
 ],
 "484535771": [
  [
   "Black",
   "bucket-hat-black"
  ],
  [
   "White",
   "bucket-hat-white"
  ]
 ],
 "484535747": [
  [
   "Black",
   "visor-black"
  ]
 ],
 "484535744": [
  [
   "Black",
   "fisherman-beanie-black"
  ],
  [
   "Ecru",
   "fisherman-beanie-ecru"
  ]
 ],
 "484535676": [
  [
   "Black",
   "cuffed-beanie-black"
  ],
  [
   "White",
   "cuffed-beanie-white"
  ]
 ],
 "484535459": [
  [
   "Black",
   "polo-black"
  ],
  [
   "White",
   "polo-white"
  ]
 ],
 "484535439": [
  [
   "Black Heather",
   "tee-black-heather"
  ],
  [
   "White",
   "tee-white"
  ]
 ],
 "484535407": [
  [
   "Black",
   "long-sleeve-tee-black"
  ],
  [
   "Ecru",
   "long-sleeve-tee-ecru"
  ]
 ],
 "484535394": [
  [
   "Black",
   "hoodie-black"
  ],
  [
   "White",
   "hoodie-white"
  ]
 ],
 "484535367": [
  [
   "Black",
   "zip-hoodie-black"
  ],
  [
   "White",
   "zip-hoodie-white"
  ]
 ],
 "484535360": [
  [
   "Black",
   "sweatshirt-black"
  ],
  [
   "White",
   "sweatshirt-white"
  ]
 ],
 "484535343": [
  [
   "Black",
   "windbreaker-black"
  ]
 ],
 "484534990": [
  [
   "White",
   "sticker-white"
  ]
 ],
 "484534986": [
  [
   "Black",
   "utility-backpack-black"
  ]
 ],
 "484534981": [
  [
   "Black",
   "trucker-cap-black"
  ]
 ],
 "484534703": [
  [
   "Faded Black",
   "oversized-faded-tee-faded-black"
  ],
  [
   "Faded White",
   "oversized-faded-tee-faded-white"
  ]
 ],
 "484534699": [
  [
   "Black",
   "premium-hoodie-black"
  ],
  [
   "White",
   "premium-hoodie-white"
  ]
 ],
 "484534678": [
  [
   "Navy",
   "women-s-relaxed-tee-navy"
  ],
  [
   "White",
   "women-s-relaxed-tee-white"
  ]
 ],
 "484534647": [
  [
   "Black",
   "women-s-hoodie-black"
  ],
  [
   "Athletic Heather",
   "women-s-hoodie-athletic-heather"
  ]
 ],
 "484534615": [
  [
   "Black",
   "women-s-polo-black"
  ],
  [
   "White",
   "women-s-polo-white"
  ]
 ],
 "484534578": [
  [
   "Black",
   "kids-tee-black"
  ],
  [
   "White",
   "kids-tee-white"
  ]
 ],
 "484534566": [
  [
   "Black",
   "kids-hoodie-black"
  ],
  [
   "White",
   "kids-hoodie-white"
  ]
 ],
 "484534422": [
  [
   "Black",
   "embroidered-patch-black"
  ],
  [
   "White",
   "embroidered-patch-white"
  ]
 ],
 "484534418": [
  [
   "Black",
   "water-bottle-black"
  ],
  [
   "White",
   "water-bottle-white"
  ]
 ],
 "484534414": [
  [
   "Black",
   "tumbler-black"
  ],
  [
   "White",
   "tumbler-white"
  ]
 ],
 "484534381": [
  [
   "Black",
   "mug-black"
  ]
 ],
 "484534364": [
  [
   "Glossy",
   "samsung-tough-case-glossy"
  ]
 ],
 "484534359": [
  [
   "Glossy",
   "iphone-tough-case-glossy"
  ]
 ],
 "484534340": [
  [
   "White",
   "beach-towel-white"
  ]
 ],
 "484534335": [
  [
   "White",
   "bum-bag-white"
  ]
 ],
 "484534334": [
  [
   "White",
   "gym-bag-white"
  ]
 ],
 "484534315": [
  [
   "Black",
   "tote-bag-black"
  ],
  [
   "Oyster",
   "tote-bag-oyster"
  ]
 ]
};

const fix = (s: string) => s.replace(/(silver )?mountain logo/gi, (_m, sil) => `${sil ? "silver " : ""}Devonshire stag logo`);
const fixPhotos = (g?: MerchPhoto[]) => g?.map((x) => ({ ...x, alt: fix(x.alt) }));

/** Adds stag mockups, Devonshire stag wording, and varies the colour each card opens on (alternate cards open on the second mocked colour). */
export function withStag(list: Merch[]): Merch[] {
  let n = 0;
  return list.map((p) => {
    const mocks = STAG[p.pid];
    const name = p.name;
    let gallery = fixPhotos(p.gallery);
    let colors = p.colors?.map((c, i) => ({ ...c, gallery: fixPhotos(i === 0 && !c.gallery.length ? p.gallery : c.gallery) ?? [] }));
    const details = p.details?.map(fix);
    if (!mocks) return { ...p, gallery, colors, details };
    const mk = (colour: string, file: string): MerchPhoto => ({ src: `/shop/pf-stag/${file}.webp`, alt: `ESP ${name} in ${colour.toLowerCase()} with the embroidered Devonshire stag logo`, view: "front", note: "Mockup, colour may vary slightly" });
    if (colors?.length) {
      colors = colors.map((c) => {
        const m = mocks.find(([col]) => col.toLowerCase() === c.name.toLowerCase());
        return m ? { ...c, gallery: [mk(m[0], m[1]), ...c.gallery] } : c;
      });
      const mocked = colors.filter((c) => mocks.some(([col]) => col.toLowerCase() === c.name.toLowerCase()));
      const pick = mocked.length > 1 && n++ % 2 === 1 ? mocked[1] : mocked[0];
      if (pick) colors = [pick, ...colors.filter((c) => c !== pick)];
      gallery = colors[0].gallery;
    } else {
      gallery = [mk(mocks[0][0], mocks[0][1]), ...(gallery ?? [])];
    }
    return { ...p, img: gallery?.[0]?.src ?? p.img, gallery, colors, details };
  });
}
