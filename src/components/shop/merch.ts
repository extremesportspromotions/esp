// Generated from the shop's product catalogue (scripts/pf-sync.py). Prices in pence, GBP.
// id = sync variant id (used for orders); vid = catalogue variant id (used for delivery rates).
export type MerchVariant = { id: number; vid: number; label: string; pence: number; oos?: boolean; color?: string };
/** `view`: which view the photo shows (shown as a label in the gallery and enlarged viewer). */
export type PhotoView = "front" | "back" | "side" | "model";
export type MerchPhoto = { src: string; alt: string; view?: PhotoView };
/** `light`: a light colour, made with the dark logo (black thread, dark-grey print). */
export type MerchColor = { name: string; hex: string; gallery: MerchPhoto[]; light?: boolean };
/** `made`: smart casual, made to order and fulfilled by hand (never by the automatic partner). */
export type Merch = { pid: number; name: string; cat: "apparel" | "bags" | "outerwear" | "smartcasual"; made?: boolean; sub?: string; img: string; gallery?: MerchPhoto[]; details?: string[]; colors?: MerchColor[]; variants: MerchVariant[] };

/** "Navy / M", "Navy", "M" or "" for the bag, checkout and order names. */
export function variantName(p: Merch, v: MerchVariant): string {
  const colour = (p.colors?.length ?? 0) > 1 ? v.color : undefined;
  const siblings = p.variants.filter((x) => !colour || x.color === v.color);
  return [colour, siblings.length > 1 ? v.label : undefined].filter(Boolean).join(" / ");
}

/** The photo for a variant's colour (the product's main photo for Black or no colour). */
export function variantImg(p: Merch, v: MerchVariant): string {
  const c = p.colors?.find((x) => x.name === v.color);
  return c && c !== p.colors![0] && c.gallery[0] ? c.gallery[0].src : p.img;
}

export const merch: Merch[] = [
 {
  "pid": 484535439,
  "name": "Tee",
  "cat": "apparel",
  "sub": "Tops",
  "img": "/shop/pf/484466962.webp",
  "variants": [
   {
    "id": 5591397555,
    "label": "XS",
    "pence": 2099,
    "vid": 9527,
    "color": "Black"
   },
   {
    "id": 5591397553,
    "label": "S",
    "pence": 2099,
    "vid": 4016,
    "color": "Black"
   },
   {
    "id": 5591397552,
    "label": "M",
    "pence": 2099,
    "vid": 4017,
    "color": "Black"
   },
   {
    "id": 5591397547,
    "label": "L",
    "pence": 2099,
    "vid": 4018,
    "color": "Black"
   },
   {
    "id": 5591397554,
    "label": "XL",
    "pence": 2099,
    "vid": 4019,
    "color": "Black"
   },
   {
    "id": 5591397543,
    "label": "2XL",
    "pence": 2499,
    "vid": 4020,
    "color": "Black"
   },
   {
    "id": 5591397544,
    "label": "3XL",
    "pence": 2799,
    "vid": 5295,
    "color": "Black"
   },
   {
    "id": 5591397546,
    "label": "4XL",
    "pence": 3099,
    "vid": 5310,
    "color": "Black"
   },
   {
    "id": 5592876566,
    "vid": 9575,
    "label": "XS",
    "pence": 2099,
    "color": "Black Heather"
   },
   {
    "id": 5592874265,
    "vid": 8923,
    "label": "S",
    "pence": 2099,
    "color": "Black Heather"
   },
   {
    "id": 5592874255,
    "vid": 8924,
    "label": "M",
    "pence": 2099,
    "color": "Black Heather"
   },
   {
    "id": 5592874248,
    "vid": 8925,
    "label": "L",
    "pence": 2099,
    "color": "Black Heather"
   },
   {
    "id": 5592874277,
    "vid": 8926,
    "label": "XL",
    "pence": 2099,
    "color": "Black Heather"
   },
   {
    "id": 5592874244,
    "vid": 8927,
    "label": "2XL",
    "pence": 2499,
    "color": "Black Heather"
   },
   {
    "id": 5592876731,
    "vid": 9546,
    "label": "XS",
    "pence": 2099,
    "color": "Navy"
   },
   {
    "id": 5592876649,
    "vid": 4111,
    "label": "S",
    "pence": 2099,
    "color": "Navy"
   },
   {
    "id": 5592876633,
    "vid": 4112,
    "label": "M",
    "pence": 2099,
    "color": "Navy"
   },
   {
    "id": 5592876611,
    "vid": 4113,
    "label": "L",
    "pence": 2099,
    "color": "Navy"
   },
   {
    "id": 5592876682,
    "vid": 4114,
    "label": "XL",
    "pence": 2099,
    "color": "Navy"
   },
   {
    "id": 5592876592,
    "vid": 4115,
    "label": "2XL",
    "pence": 2499,
    "color": "Navy"
   },
   {
    "id": 5592878769,
    "vid": 4046,
    "label": "S",
    "pence": 2099,
    "color": "Brown"
   },
   {
    "id": 5592876874,
    "vid": 4047,
    "label": "M",
    "pence": 2099,
    "color": "Brown"
   },
   {
    "id": 5592876865,
    "vid": 4048,
    "label": "L",
    "pence": 2099,
    "color": "Brown"
   },
   {
    "id": 5592878790,
    "vid": 4049,
    "label": "XL",
    "pence": 2099,
    "color": "Brown"
   },
   {
    "id": 5592876816,
    "vid": 4050,
    "label": "2XL",
    "pence": 2499,
    "color": "Brown"
   },
   {
    "id": 5592878936,
    "vid": 8495,
    "label": "S",
    "pence": 2099,
    "color": "Heather Midnight Navy"
   },
   {
    "id": 5592878849,
    "vid": 8496,
    "label": "M",
    "pence": 2099,
    "color": "Heather Midnight Navy"
   },
   {
    "id": 5592878836,
    "vid": 8497,
    "label": "L",
    "pence": 2099,
    "color": "Heather Midnight Navy"
   },
   {
    "id": 5592878968,
    "vid": 8498,
    "label": "XL",
    "pence": 2099,
    "color": "Heather Midnight Navy"
   },
   {
    "id": 5592878824,
    "vid": 8499,
    "label": "2XL",
    "pence": 2499,
    "color": "Heather Midnight Navy"
   },
   {
    "id": 5592880108,
    "vid": 8451,
    "label": "S",
    "pence": 2099,
    "color": "Forest"
   },
   {
    "id": 5592879042,
    "vid": 8452,
    "label": "M",
    "pence": 2099,
    "color": "Forest"
   },
   {
    "id": 5592879033,
    "vid": 8453,
    "label": "L",
    "pence": 2099,
    "color": "Forest"
   },
   {
    "id": 5592880121,
    "vid": 8454,
    "label": "XL",
    "pence": 2099,
    "color": "Forest"
   },
   {
    "id": 5592878995,
    "vid": 8455,
    "label": "2XL",
    "pence": 2499,
    "color": "Forest"
   },
   {
    "id": 5592880209,
    "vid": 9564,
    "label": "XS",
    "pence": 2099,
    "color": "Dark Grey Heather"
   },
   {
    "id": 5592880168,
    "vid": 8460,
    "label": "S",
    "pence": 2099,
    "color": "Dark Grey Heather"
   },
   {
    "id": 5592880150,
    "vid": 8461,
    "label": "M",
    "pence": 2099,
    "color": "Dark Grey Heather"
   },
   {
    "id": 5592880144,
    "vid": 8462,
    "label": "L",
    "pence": 2099,
    "color": "Dark Grey Heather"
   },
   {
    "id": 5592880198,
    "vid": 8463,
    "label": "XL",
    "pence": 2099,
    "color": "Dark Grey Heather"
   },
   {
    "id": 5592880139,
    "vid": 8464,
    "label": "2XL",
    "pence": 2499,
    "color": "Dark Grey Heather"
   },
   {
    "id": 5592881210,
    "vid": 4106,
    "label": "S",
    "pence": 2099,
    "color": "Maroon"
   },
   {
    "id": 5592881209,
    "vid": 4107,
    "label": "M",
    "pence": 2099,
    "color": "Maroon"
   },
   {
    "id": 5592880221,
    "vid": 4108,
    "label": "L",
    "pence": 2099,
    "color": "Maroon"
   },
   {
    "id": 5592881211,
    "vid": 4109,
    "label": "XL",
    "pence": 2099,
    "color": "Maroon"
   },
   {
    "id": 5592880217,
    "vid": 4110,
    "label": "2XL",
    "pence": 2499,
    "color": "Maroon"
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484535439-1.webp",
    "alt": "ESP Tee in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484535439-2.webp",
    "alt": "ESP Tee in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484535439-3.webp",
    "alt": "ESP Tee in black with the mountain logo, worn, three-quarter view"
   },
   {
    "src": "/shop/pf/484535439-4.webp",
    "alt": "ESP Tee in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484535439-5.webp",
    "alt": "ESP Tee in black with the mountain logo, left side"
   }
  ],
  "details": [
   "Crew-neck T-shirt, unisex fit",
   "100% combed ring-spun cotton, 142 g/m²",
   "Embroidered mountain logo on the left chest"
  ],
  "colors": [
   {
    "name": "Black",
    "hex": "#0c0c0c",
    "gallery": []
   },
   {
    "name": "Black Heather",
    "hex": "#0b0b0b",
    "gallery": [
     {
      "src": "/shop/pf/484535439-black-heather-1.webp",
      "alt": "ESP Tee in black heather with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535439-black-heather-2.webp",
      "alt": "ESP Tee in black heather with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535439-black-heather-3.webp",
      "alt": "ESP Tee in black heather with the mountain logo, worn, three-quarter view"
     }
    ]
   },
   {
    "name": "Navy",
    "hex": "#212642",
    "gallery": [
     {
      "src": "/shop/pf/484535439-navy-1.webp",
      "alt": "ESP Tee in navy with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535439-navy-2.webp",
      "alt": "ESP Tee in navy with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535439-navy-3.webp",
      "alt": "ESP Tee in navy with the mountain logo, worn, three-quarter view"
     }
    ]
   },
   {
    "name": "Brown",
    "hex": "#322622",
    "gallery": [
     {
      "src": "/shop/pf/484535439-brown-1.webp",
      "alt": "ESP Tee in brown with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535439-brown-2.webp",
      "alt": "ESP Tee in brown with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535439-brown-3.webp",
      "alt": "ESP Tee in brown with the mountain logo, worn, three-quarter view"
     }
    ]
   },
   {
    "name": "Heather Midnight Navy",
    "hex": "#302d4b",
    "gallery": [
     {
      "src": "/shop/pf/484535439-heather-midnight-navy-1.webp",
      "alt": "ESP Tee in heather midnight navy with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535439-heather-midnight-navy-2.webp",
      "alt": "ESP Tee in heather midnight navy with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535439-heather-midnight-navy-3.webp",
      "alt": "ESP Tee in heather midnight navy with the mountain logo, worn, three-quarter view"
     }
    ]
   },
   {
    "name": "Forest",
    "hex": "#223e25",
    "gallery": [
     {
      "src": "/shop/pf/484535439-forest-1.webp",
      "alt": "ESP Tee in forest with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535439-forest-2.webp",
      "alt": "ESP Tee in forest with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535439-forest-3.webp",
      "alt": "ESP Tee in forest with the mountain logo, worn, three-quarter view"
     }
    ]
   },
   {
    "name": "Dark Grey Heather",
    "hex": "#3E3C3D",
    "gallery": [
     {
      "src": "/shop/pf/484535439-dark-grey-heather-1.webp",
      "alt": "ESP Tee in dark grey heather with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535439-dark-grey-heather-2.webp",
      "alt": "ESP Tee in dark grey heather with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535439-dark-grey-heather-3.webp",
      "alt": "ESP Tee in dark grey heather with the mountain logo, worn, three-quarter view"
     }
    ]
   },
   {
    "name": "Maroon",
    "hex": "#721d37",
    "gallery": [
     {
      "src": "/shop/pf/484535439-maroon-1.webp",
      "alt": "ESP Tee in maroon with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535439-maroon-2.webp",
      "alt": "ESP Tee in maroon with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535439-maroon-3.webp",
      "alt": "ESP Tee in maroon with the mountain logo, worn, three-quarter view"
     }
    ]
   }
  ]
 },
 {
  "pid": 484534678,
  "name": "Women's Relaxed Tee",
  "cat": "apparel",
  "sub": "Tops",
  "img": "/shop/pf/484469905.webp",
  "variants": [
   {
    "id": 5591394236,
    "label": "S",
    "pence": 2799,
    "vid": 10187,
    "color": "Black"
   },
   {
    "id": 5591394235,
    "label": "M",
    "pence": 2799,
    "vid": 10188,
    "color": "Black"
   },
   {
    "id": 5591394233,
    "label": "L",
    "pence": 2799,
    "vid": 10189,
    "color": "Black"
   },
   {
    "id": 5591394237,
    "label": "XL",
    "pence": 2799,
    "vid": 10190,
    "color": "Black"
   },
   {
    "id": 5591394232,
    "label": "2XL",
    "pence": 3199,
    "vid": 10191,
    "color": "Black"
   },
   {
    "id": 5592889938,
    "vid": 10235,
    "label": "S",
    "pence": 2799,
    "color": "Navy"
   },
   {
    "id": 5592889916,
    "vid": 10236,
    "label": "M",
    "pence": 2799,
    "color": "Navy"
   },
   {
    "id": 5592889903,
    "vid": 10237,
    "label": "L",
    "pence": 2799,
    "color": "Navy"
   },
   {
    "id": 5592889951,
    "vid": 10238,
    "label": "XL",
    "pence": 2799,
    "color": "Navy"
   },
   {
    "id": 5592889899,
    "vid": 10239,
    "label": "2XL",
    "pence": 3199,
    "color": "Navy"
   },
   {
    "id": 5592890985,
    "vid": 10193,
    "label": "S",
    "pence": 2799,
    "color": "Dark Grey Heather"
   },
   {
    "id": 5592890055,
    "vid": 10194,
    "label": "M",
    "pence": 2799,
    "color": "Dark Grey Heather"
   },
   {
    "id": 5592889987,
    "vid": 10195,
    "label": "L",
    "pence": 2799,
    "color": "Dark Grey Heather"
   },
   {
    "id": 5592890987,
    "vid": 10196,
    "label": "XL",
    "pence": 2799,
    "color": "Dark Grey Heather"
   },
   {
    "id": 5592889968,
    "vid": 10197,
    "label": "2XL",
    "pence": 3199,
    "color": "Dark Grey Heather"
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534678-1.webp",
    "alt": "ESP Women's Relaxed Tee in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534678-2.webp",
    "alt": "ESP Women's Relaxed Tee in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484534678-3.webp",
    "alt": "ESP Women's Relaxed Tee in black with the mountain logo, worn, three-quarter view"
   },
   {
    "src": "/shop/pf/484534678-4.webp",
    "alt": "ESP Women's Relaxed Tee in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484534678-5.webp",
    "alt": "ESP Women's Relaxed Tee in black with the mountain logo, left side"
   }
  ],
  "details": [
   "Women's T-shirt, relaxed fit",
   "100% combed ring-spun cotton",
   "Embroidered mountain logo on the left chest"
  ],
  "colors": [
   {
    "name": "Black",
    "hex": "#171717",
    "gallery": []
   },
   {
    "name": "Navy",
    "hex": "#161324",
    "gallery": [
     {
      "src": "/shop/pf/484534678-navy-1.webp",
      "alt": "ESP Women's Relaxed Tee in navy with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484534678-navy-2.webp",
      "alt": "ESP Women's Relaxed Tee in navy with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484534678-navy-3.webp",
      "alt": "ESP Women's Relaxed Tee in navy with the mountain logo, worn, three-quarter view"
     }
    ]
   },
   {
    "name": "Dark Grey Heather",
    "hex": "#323232",
    "gallery": [
     {
      "src": "/shop/pf/484534678-dark-grey-heather-1.webp",
      "alt": "ESP Women's Relaxed Tee in dark grey heather with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484534678-dark-grey-heather-2.webp",
      "alt": "ESP Women's Relaxed Tee in dark grey heather with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484534678-dark-grey-heather-3.webp",
      "alt": "ESP Women's Relaxed Tee in dark grey heather with the mountain logo, worn, three-quarter view"
     }
    ]
   }
  ]
 },
 {
  "pid": 484534615,
  "name": "Women's Polo",
  "cat": "apparel",
  "sub": "Tops",
  "img": "/shop/pf/484470024.webp",
  "variants": [
   {
    "id": 5591393994,
    "label": "S",
    "pence": 3099,
    "vid": 16587
   },
   {
    "id": 5591393993,
    "label": "M",
    "pence": 3099,
    "vid": 16589
   },
   {
    "id": 5591393992,
    "label": "L",
    "pence": 3099,
    "vid": 16590
   },
   {
    "id": 5591393997,
    "label": "XL",
    "pence": 3099,
    "vid": 16591
   },
   {
    "id": 5591393990,
    "label": "2XL",
    "pence": 3499,
    "vid": 16592
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534615-1.webp",
    "alt": "ESP Women's Polo in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534615-2.webp",
    "alt": "ESP Women's Polo in black with the mountain logo, worn, back"
   },
   {
    "src": "/shop/pf/484534615-3.webp",
    "alt": "ESP Women's Polo in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484534615-4.webp",
    "alt": "ESP Women's Polo in black with the mountain logo, back"
   }
  ],
  "details": [
   "Women's polo shirt, semi-fitted",
   "100% ring-spun cotton, 176 g/m²",
   "Embroidered mountain logo on the left chest"
  ]
 },
 {
  "pid": 484535459,
  "name": "Polo",
  "cat": "apparel",
  "sub": "Tops",
  "img": "/shop/pf/484466887.webp",
  "variants": [
   {
    "id": 5591397594,
    "label": "S",
    "pence": 3399,
    "vid": 16752,
    "color": "Black"
   },
   {
    "id": 5591397592,
    "label": "M",
    "pence": 3399,
    "vid": 16753,
    "color": "Black"
   },
   {
    "id": 5591397591,
    "label": "L",
    "pence": 3399,
    "vid": 16754,
    "color": "Black"
   },
   {
    "id": 5591397595,
    "label": "XL",
    "pence": 3399,
    "vid": 16755,
    "color": "Black"
   },
   {
    "id": 5591397586,
    "label": "2XL",
    "pence": 3799,
    "vid": 16756,
    "color": "Black"
   },
   {
    "id": 5591397588,
    "label": "3XL",
    "pence": 4099,
    "vid": 16757,
    "color": "Black"
   },
   {
    "id": 5591397589,
    "label": "4XL",
    "pence": 4399,
    "vid": 16758,
    "color": "Black"
   },
   {
    "id": 5592874224,
    "vid": 16759,
    "label": "S",
    "pence": 3399,
    "color": "Navy"
   },
   {
    "id": 5592874188,
    "vid": 16760,
    "label": "M",
    "pence": 3399,
    "color": "Navy"
   },
   {
    "id": 5592874181,
    "vid": 16761,
    "label": "L",
    "pence": 3399,
    "color": "Navy"
   },
   {
    "id": 5592874234,
    "vid": 16762,
    "label": "XL",
    "pence": 3399,
    "color": "Navy"
   },
   {
    "id": 5592872481,
    "vid": 16763,
    "label": "2XL",
    "pence": 3799,
    "color": "Navy"
   },
   {
    "id": 5592872482,
    "vid": 16764,
    "label": "3XL",
    "pence": 4099,
    "color": "Navy"
   },
   {
    "id": 5592874178,
    "vid": 16765,
    "label": "4XL",
    "pence": 4399,
    "color": "Navy"
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484535459-1.webp",
    "alt": "ESP Polo in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484535459-2.webp",
    "alt": "ESP Polo in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484535459-3.webp",
    "alt": "ESP Polo in black with the mountain logo, worn, three-quarter view"
   },
   {
    "src": "/shop/pf/484535459-4.webp",
    "alt": "ESP Polo in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484535459-5.webp",
    "alt": "ESP Polo in black with the mountain logo, three-quarter view"
   }
  ],
  "details": [
   "Polo shirt, semi-fitted",
   "100% ring-spun cotton, 176 g/m²",
   "Embroidered mountain logo on the left chest"
  ],
  "colors": [
   {
    "name": "Black",
    "hex": "#111111",
    "gallery": []
   },
   {
    "name": "Navy",
    "hex": "#131b2d",
    "gallery": [
     {
      "src": "/shop/pf/484535459-navy-1.webp",
      "alt": "ESP Polo in navy with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535459-navy-2.webp",
      "alt": "ESP Polo in navy with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535459-navy-3.webp",
      "alt": "ESP Polo in navy with the mountain logo, worn, three-quarter view"
     }
    ]
   }
  ]
 },
 {
  "pid": 484534703,
  "name": "Oversized Faded Tee",
  "cat": "apparel",
  "sub": "Tops",
  "img": "/shop/pf/484468554.webp",
  "variants": [
   {
    "id": 5591394278,
    "label": "XS",
    "pence": 3699,
    "vid": 53498
   },
   {
    "id": 5591394283,
    "label": "S",
    "pence": 3699,
    "vid": 17569
   },
   {
    "id": 5591394282,
    "label": "M",
    "pence": 3699,
    "vid": 17574
   },
   {
    "id": 5591394281,
    "label": "L",
    "pence": 3699,
    "vid": 17579
   },
   {
    "id": 5591394284,
    "label": "XL",
    "pence": 3699,
    "vid": 17584
   },
   {
    "id": 5591394279,
    "label": "2XL",
    "pence": 4099,
    "vid": 17589
   },
   {
    "id": 5591394280,
    "label": "3XL",
    "pence": 4399,
    "vid": 17594
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534703-1.webp",
    "alt": "ESP Oversized Faded Tee in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534703-2.webp",
    "alt": "ESP Oversized Faded Tee in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484534703-3.webp",
    "alt": "ESP Oversized Faded Tee in black with the mountain logo, worn, three-quarter view"
   },
   {
    "src": "/shop/pf/484534703-4.webp",
    "alt": "ESP Oversized Faded Tee in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484534703-5.webp",
    "alt": "ESP Oversized Faded Tee in black with the mountain logo, left side"
   }
  ],
  "details": [
   "Heavyweight oversized T-shirt, boxy fit, garment-dyed faded look",
   "100% cotton, 240 g/m²",
   "Embroidered mountain logo on the left chest"
  ]
 },
 {
  "pid": 484535407,
  "name": "Long Sleeve Tee",
  "cat": "apparel",
  "sub": "Tops",
  "img": "/shop/pf/484466968.webp",
  "variants": [
   {
    "id": 5591397486,
    "label": "S",
    "pence": 3799,
    "vid": 19213,
    "color": "Black"
   },
   {
    "id": 5591397485,
    "label": "M",
    "pence": 3799,
    "vid": 19214,
    "color": "Black"
   },
   {
    "id": 5591397484,
    "label": "L",
    "pence": 3799,
    "vid": 19215,
    "color": "Black"
   },
   {
    "id": 5591397488,
    "label": "XL",
    "pence": 3799,
    "vid": 19216,
    "color": "Black"
   },
   {
    "id": 5591397482,
    "label": "2XL",
    "pence": 4199,
    "vid": 19217,
    "color": "Black"
   },
   {
    "id": 5591397483,
    "label": "3XL",
    "pence": 4499,
    "vid": 19218,
    "color": "Black"
   },
   {
    "id": 5592881219,
    "vid": 19243,
    "label": "S",
    "pence": 3799,
    "color": "Midnight Blue"
   },
   {
    "id": 5592881217,
    "vid": 19244,
    "label": "M",
    "pence": 3799,
    "color": "Midnight Blue"
   },
   {
    "id": 5592881216,
    "vid": 19245,
    "label": "L",
    "pence": 3799,
    "color": "Midnight Blue"
   },
   {
    "id": 5592881221,
    "vid": 19246,
    "label": "XL",
    "pence": 3799,
    "color": "Midnight Blue"
   },
   {
    "id": 5592881213,
    "vid": 19247,
    "label": "2XL",
    "pence": 4199,
    "color": "Midnight Blue"
   },
   {
    "id": 5592881215,
    "vid": 19248,
    "label": "3XL",
    "pence": 4499,
    "color": "Midnight Blue"
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484535407-1.webp",
    "alt": "ESP Long Sleeve Tee in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484535407-2.webp",
    "alt": "ESP Long Sleeve Tee in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484535407-3.webp",
    "alt": "ESP Long Sleeve Tee in black with the mountain logo, worn, three-quarter view"
   },
   {
    "src": "/shop/pf/484535407-4.webp",
    "alt": "ESP Long Sleeve Tee in black with the mountain logo, left side"
   }
  ],
  "details": [
   "Heavyweight long-sleeve T-shirt, relaxed fit",
   "100% cotton, 278 g/m²",
   "Embroidered mountain logo on the left chest"
  ],
  "colors": [
   {
    "name": "Black",
    "hex": "#111111",
    "gallery": []
   },
   {
    "name": "Midnight Blue",
    "hex": "#36394f",
    "gallery": [
     {
      "src": "/shop/pf/484535407-midnight-blue-1.webp",
      "alt": "ESP Long Sleeve Tee in midnight blue with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535407-midnight-blue-2.webp",
      "alt": "ESP Long Sleeve Tee in midnight blue with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535407-midnight-blue-3.webp",
      "alt": "ESP Long Sleeve Tee in midnight blue with the mountain logo, worn, three-quarter view"
     }
    ]
   }
  ]
 },
 {
  "pid": 484535360,
  "name": "Sweatshirt",
  "cat": "apparel",
  "sub": "Hoodies",
  "img": "/shop/pf/484466994.webp",
  "variants": [
   {
    "id": 5591397313,
    "label": "S",
    "pence": 3399,
    "vid": 5434,
    "color": "Black"
   },
   {
    "id": 5591397312,
    "label": "M",
    "pence": 3399,
    "vid": 5435,
    "color": "Black"
   },
   {
    "id": 5591397310,
    "label": "L",
    "pence": 3399,
    "vid": 5436,
    "color": "Black"
   },
   {
    "id": 5591397314,
    "label": "XL",
    "pence": 3399,
    "vid": 5437,
    "color": "Black"
   },
   {
    "id": 5591397305,
    "label": "2XL",
    "pence": 3799,
    "vid": 5438,
    "color": "Black"
   },
   {
    "id": 5591397306,
    "label": "3XL",
    "pence": 4099,
    "vid": 5439,
    "color": "Black"
   },
   {
    "id": 5591397308,
    "label": "4XL",
    "pence": 4399,
    "vid": 5440,
    "color": "Black"
   },
   {
    "id": 5591397309,
    "label": "5XL",
    "pence": 4699,
    "vid": 5441,
    "color": "Black"
   },
   {
    "id": 5592884883,
    "vid": 5498,
    "label": "S",
    "pence": 3399,
    "color": "Navy"
   },
   {
    "id": 5592884882,
    "vid": 5499,
    "label": "M",
    "pence": 3399,
    "color": "Navy"
   },
   {
    "id": 5592884881,
    "vid": 5500,
    "label": "L",
    "pence": 3399,
    "color": "Navy"
   },
   {
    "id": 5592885936,
    "vid": 5501,
    "label": "XL",
    "pence": 3399,
    "color": "Navy"
   },
   {
    "id": 5592884879,
    "vid": 5502,
    "label": "2XL",
    "pence": 3799,
    "color": "Navy"
   },
   {
    "id": 5592884880,
    "vid": 5503,
    "label": "3XL",
    "pence": 4099,
    "color": "Navy"
   },
   {
    "id": 5592885947,
    "vid": 18763,
    "label": "S",
    "pence": 3399,
    "color": "Forest Green"
   },
   {
    "id": 5592885946,
    "vid": 18764,
    "label": "M",
    "pence": 3399,
    "color": "Forest Green"
   },
   {
    "id": 5592885940,
    "vid": 18765,
    "label": "L",
    "pence": 3399,
    "color": "Forest Green"
   },
   {
    "id": 5592885949,
    "vid": 18766,
    "label": "XL",
    "pence": 3399,
    "color": "Forest Green"
   },
   {
    "id": 5592885937,
    "vid": 18767,
    "label": "2XL",
    "pence": 3799,
    "color": "Forest Green"
   },
   {
    "id": 5592885938,
    "vid": 18768,
    "label": "3XL",
    "pence": 4099,
    "color": "Forest Green"
   },
   {
    "id": 5592887962,
    "vid": 5490,
    "label": "S",
    "pence": 3399,
    "color": "Maroon"
   },
   {
    "id": 5592885999,
    "vid": 5491,
    "label": "M",
    "pence": 3399,
    "color": "Maroon"
   },
   {
    "id": 5592885987,
    "vid": 5492,
    "label": "L",
    "pence": 3399,
    "color": "Maroon"
   },
   {
    "id": 5592887969,
    "vid": 5493,
    "label": "XL",
    "pence": 3399,
    "color": "Maroon"
   },
   {
    "id": 5592885950,
    "vid": 5494,
    "label": "2XL",
    "pence": 3799,
    "color": "Maroon"
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484535360-1.webp",
    "alt": "ESP Sweatshirt in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484535360-2.webp",
    "alt": "ESP Sweatshirt in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484535360-3.webp",
    "alt": "ESP Sweatshirt in black with the mountain logo, worn, three-quarter view"
   },
   {
    "src": "/shop/pf/484535360-4.webp",
    "alt": "ESP Sweatshirt in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484535360-5.webp",
    "alt": "ESP Sweatshirt in black with the mountain logo, left side"
   }
  ],
  "details": [
   "Crew-neck sweatshirt, classic fit",
   "50% cotton, 50% polyester",
   "Embroidered mountain logo on the left chest"
  ],
  "colors": [
   {
    "name": "Black",
    "hex": "#0b0b0b",
    "gallery": []
   },
   {
    "name": "Navy",
    "hex": "#050c1d",
    "gallery": [
     {
      "src": "/shop/pf/484535360-navy-1.webp",
      "alt": "ESP Sweatshirt in navy with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535360-navy-2.webp",
      "alt": "ESP Sweatshirt in navy with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535360-navy-3.webp",
      "alt": "ESP Sweatshirt in navy with the mountain logo, worn, three-quarter view"
     }
    ]
   },
   {
    "name": "Forest Green",
    "hex": "#1A3626",
    "gallery": [
     {
      "src": "/shop/pf/484535360-forest-green-1.webp",
      "alt": "ESP Sweatshirt in forest green with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535360-forest-green-2.webp",
      "alt": "ESP Sweatshirt in forest green with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535360-forest-green-3.webp",
      "alt": "ESP Sweatshirt in forest green with the mountain logo, worn, three-quarter view"
     }
    ]
   },
   {
    "name": "Maroon",
    "hex": "#651d32",
    "gallery": [
     {
      "src": "/shop/pf/484535360-maroon-1.webp",
      "alt": "ESP Sweatshirt in maroon with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535360-maroon-2.webp",
      "alt": "ESP Sweatshirt in maroon with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535360-maroon-3.webp",
      "alt": "ESP Sweatshirt in maroon with the mountain logo, worn, three-quarter view"
     }
    ]
   }
  ]
 },
 {
  "pid": 484535394,
  "name": "Hoodie",
  "cat": "apparel",
  "sub": "Hoodies",
  "img": "/shop/pf/484466984.webp",
  "variants": [
   {
    "id": 5591397468,
    "label": "S",
    "pence": 4099,
    "vid": 5530,
    "color": "Black"
   },
   {
    "id": 5591397467,
    "label": "M",
    "pence": 4099,
    "vid": 5531,
    "color": "Black"
   },
   {
    "id": 5591397466,
    "label": "L",
    "pence": 4099,
    "vid": 5532,
    "color": "Black"
   },
   {
    "id": 5591397469,
    "label": "XL",
    "pence": 4099,
    "vid": 5533,
    "color": "Black"
   },
   {
    "id": 5591397462,
    "label": "2XL",
    "pence": 4499,
    "vid": 5534,
    "color": "Black"
   },
   {
    "id": 5591397463,
    "label": "3XL",
    "pence": 4799,
    "vid": 5535,
    "color": "Black"
   },
   {
    "id": 5591397464,
    "label": "4XL",
    "pence": 5099,
    "vid": 5536,
    "color": "Black"
   },
   {
    "id": 5591397465,
    "label": "5XL",
    "pence": 5399,
    "vid": 5537,
    "color": "Black"
   },
   {
    "id": 5592882378,
    "vid": 5594,
    "label": "S",
    "pence": 4099,
    "color": "Navy"
   },
   {
    "id": 5592882367,
    "vid": 5595,
    "label": "M",
    "pence": 4099,
    "color": "Navy"
   },
   {
    "id": 5592882359,
    "vid": 5596,
    "label": "L",
    "pence": 4099,
    "color": "Navy"
   },
   {
    "id": 5592882392,
    "vid": 5597,
    "label": "XL",
    "pence": 4099,
    "color": "Navy"
   },
   {
    "id": 5592881223,
    "vid": 5598,
    "label": "2XL",
    "pence": 4499,
    "color": "Navy"
   },
   {
    "id": 5592882315,
    "vid": 5599,
    "label": "3XL",
    "pence": 4799,
    "color": "Navy"
   },
   {
    "id": 5592882320,
    "vid": 5600,
    "label": "4XL",
    "pence": 5099,
    "color": "Navy"
   },
   {
    "id": 5592882338,
    "vid": 5601,
    "label": "5XL",
    "pence": 5399,
    "color": "Navy"
   },
   {
    "id": 5592883610,
    "vid": 5586,
    "label": "S",
    "pence": 4099,
    "color": "Maroon"
   },
   {
    "id": 5592882402,
    "vid": 5587,
    "label": "M",
    "pence": 4099,
    "color": "Maroon"
   },
   {
    "id": 5592882400,
    "vid": 5588,
    "label": "L",
    "pence": 4099,
    "color": "Maroon"
   },
   {
    "id": 5592883623,
    "vid": 5589,
    "label": "XL",
    "pence": 4099,
    "color": "Maroon"
   },
   {
    "id": 5592882396,
    "vid": 5590,
    "label": "2XL",
    "pence": 4499,
    "color": "Maroon"
   },
   {
    "id": 5592883668,
    "vid": 5554,
    "label": "S",
    "pence": 4099,
    "color": "Dark Chocolate"
   },
   {
    "id": 5592883659,
    "vid": 5555,
    "label": "M",
    "pence": 4099,
    "color": "Dark Chocolate"
   },
   {
    "id": 5592883654,
    "vid": 5556,
    "label": "L",
    "pence": 4099,
    "color": "Dark Chocolate"
   },
   {
    "id": 5592883676,
    "vid": 5557,
    "label": "XL",
    "pence": 4099,
    "color": "Dark Chocolate"
   },
   {
    "id": 5592883638,
    "vid": 5558,
    "label": "2XL",
    "pence": 4499,
    "color": "Dark Chocolate"
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484535394-1.webp",
    "alt": "ESP Hoodie in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484535394-2.webp",
    "alt": "ESP Hoodie in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484535394-3.webp",
    "alt": "ESP Hoodie in black with the mountain logo, worn, three-quarter view"
   },
   {
    "src": "/shop/pf/484535394-4.webp",
    "alt": "ESP Hoodie in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484535394-5.webp",
    "alt": "ESP Hoodie in black with the mountain logo, left side"
   }
  ],
  "details": [
   "Pullover hoodie with a lined hood and drawcord",
   "50% cotton, 50% polyester, 271 g/m²",
   "Embroidered mountain logo on the left chest"
  ],
  "colors": [
   {
    "name": "Black",
    "hex": "#0b0b0b",
    "gallery": []
   },
   {
    "name": "Navy",
    "hex": "#131928",
    "gallery": [
     {
      "src": "/shop/pf/484535394-navy-1.webp",
      "alt": "ESP Hoodie in navy with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535394-navy-2.webp",
      "alt": "ESP Hoodie in navy with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535394-navy-3.webp",
      "alt": "ESP Hoodie in navy with the mountain logo, worn, three-quarter view"
     }
    ]
   },
   {
    "name": "Maroon",
    "hex": "#47171c",
    "gallery": [
     {
      "src": "/shop/pf/484535394-maroon-1.webp",
      "alt": "ESP Hoodie in maroon with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535394-maroon-2.webp",
      "alt": "ESP Hoodie in maroon with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535394-maroon-3.webp",
      "alt": "ESP Hoodie in maroon with the mountain logo, worn, three-quarter view"
     }
    ]
   },
   {
    "name": "Dark Chocolate",
    "hex": "#35241b",
    "gallery": [
     {
      "src": "/shop/pf/484535394-dark-chocolate-1.webp",
      "alt": "ESP Hoodie in dark chocolate with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535394-dark-chocolate-2.webp",
      "alt": "ESP Hoodie in dark chocolate with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535394-dark-chocolate-3.webp",
      "alt": "ESP Hoodie in dark chocolate with the mountain logo, worn, three-quarter view"
     }
    ]
   }
  ]
 },
 {
  "pid": 484534699,
  "name": "Premium Hoodie",
  "cat": "apparel",
  "sub": "Hoodies",
  "img": "/shop/pf/484469839.webp",
  "variants": [
   {
    "id": 5591394263,
    "label": "S",
    "pence": 4799,
    "vid": 10779,
    "color": "Black"
   },
   {
    "id": 5591394262,
    "label": "M",
    "pence": 4799,
    "vid": 10780,
    "color": "Black"
   },
   {
    "id": 5591394261,
    "label": "L",
    "pence": 4799,
    "vid": 10781,
    "color": "Black"
   },
   {
    "id": 5591394264,
    "label": "XL",
    "pence": 4799,
    "vid": 10782,
    "color": "Black"
   },
   {
    "id": 5591394259,
    "label": "2XL",
    "pence": 5199,
    "vid": 10783,
    "color": "Black"
   },
   {
    "id": 5591394260,
    "label": "3XL",
    "pence": 5499,
    "vid": 13416,
    "color": "Black"
   },
   {
    "id": 5592888977,
    "vid": 11491,
    "label": "S",
    "pence": 4799,
    "color": "Navy Blazer"
   },
   {
    "id": 5592888975,
    "vid": 11492,
    "label": "M",
    "pence": 4799,
    "color": "Navy Blazer"
   },
   {
    "id": 5592888973,
    "vid": 11493,
    "label": "L",
    "pence": 4799,
    "color": "Navy Blazer"
   },
   {
    "id": 5592888979,
    "vid": 11494,
    "label": "XL",
    "pence": 4799,
    "color": "Navy Blazer"
   },
   {
    "id": 5592888970,
    "vid": 11495,
    "label": "2XL",
    "pence": 5199,
    "color": "Navy Blazer"
   },
   {
    "id": 5592889855,
    "vid": 11481,
    "label": "S",
    "pence": 4799,
    "color": "Charcoal Heather"
   },
   {
    "id": 5592889027,
    "vid": 11482,
    "label": "M",
    "pence": 4799,
    "color": "Charcoal Heather"
   },
   {
    "id": 5592888986,
    "vid": 11483,
    "label": "L",
    "pence": 4799,
    "color": "Charcoal Heather"
   },
   {
    "id": 5592889863,
    "vid": 11484,
    "label": "XL",
    "pence": 4799,
    "color": "Charcoal Heather"
   },
   {
    "id": 5592888982,
    "vid": 11485,
    "label": "2XL",
    "pence": 5199,
    "color": "Charcoal Heather"
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534699-1.webp",
    "alt": "ESP Premium Hoodie in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534699-2.webp",
    "alt": "ESP Premium Hoodie in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484534699-3.webp",
    "alt": "ESP Premium Hoodie in black with the mountain logo, worn, back"
   },
   {
    "src": "/shop/pf/484534699-4.webp",
    "alt": "ESP Premium Hoodie in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484534699-5.webp",
    "alt": "ESP Premium Hoodie in black with the mountain logo, left side"
   }
  ],
  "details": [
   "Premium pullover hoodie with a front pouch pocket",
   "Cotton face, ring-spun cotton and polyester blend",
   "Embroidered mountain logo on the left chest"
  ],
  "colors": [
   {
    "name": "Black",
    "hex": "#080808",
    "gallery": []
   },
   {
    "name": "Navy Blazer",
    "hex": "#171f2c",
    "gallery": [
     {
      "src": "/shop/pf/484534699-navy-blazer-1.webp",
      "alt": "ESP Premium Hoodie in navy blazer with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484534699-navy-blazer-2.webp",
      "alt": "ESP Premium Hoodie in navy blazer with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484534699-navy-blazer-3.webp",
      "alt": "ESP Premium Hoodie in navy blazer with the mountain logo, worn, back"
     }
    ]
   },
   {
    "name": "Charcoal Heather",
    "hex": "#463e3d",
    "gallery": [
     {
      "src": "/shop/pf/484534699-charcoal-heather-1.webp",
      "alt": "ESP Premium Hoodie in charcoal heather with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484534699-charcoal-heather-2.webp",
      "alt": "ESP Premium Hoodie in charcoal heather with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484534699-charcoal-heather-3.webp",
      "alt": "ESP Premium Hoodie in charcoal heather with the mountain logo, worn, back"
     }
    ]
   }
  ]
 },
 {
  "pid": 484534647,
  "name": "Women's Hoodie",
  "cat": "apparel",
  "sub": "Hoodies",
  "img": "/shop/pf/484469953.webp",
  "variants": [
   {
    "id": 5591394120,
    "label": "XS",
    "pence": 4999,
    "vid": 32008
   },
   {
    "id": 5591394115,
    "label": "S",
    "pence": 4999,
    "vid": 32018
   },
   {
    "id": 5591394112,
    "label": "M",
    "pence": 4999,
    "vid": 32028
   },
   {
    "id": 5591394110,
    "label": "L",
    "pence": 4999,
    "vid": 32038
   },
   {
    "id": 5591394116,
    "label": "XL",
    "pence": 4999,
    "vid": 32048
   },
   {
    "id": 5591394108,
    "label": "2XL",
    "pence": 5399,
    "vid": 32058
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534647-1.webp",
    "alt": "ESP Women's Hoodie in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534647-2.webp",
    "alt": "ESP Women's Hoodie in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484534647-3.webp",
    "alt": "ESP Women's Hoodie in black with the mountain logo, worn, back"
   },
   {
    "src": "/shop/pf/484534647-4.webp",
    "alt": "ESP Women's Hoodie in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484534647-5.webp",
    "alt": "ESP Women's Hoodie in black with the mountain logo, left side"
   }
  ],
  "details": [
   "Women's hoodie, relaxed fit",
   "80% cotton, 20% recycled polyester, 319 g/m²",
   "Embroidered mountain logo on the left chest"
  ]
 },
 {
  "pid": 484535367,
  "name": "Zip Hoodie",
  "cat": "apparel",
  "sub": "Hoodies",
  "img": "/shop/pf/484466985.webp",
  "variants": [
   {
    "id": 5591397373,
    "label": "S",
    "pence": 5499,
    "vid": 17295,
    "color": "Black"
   },
   {
    "id": 5591397371,
    "label": "M",
    "pence": 5499,
    "vid": 17296,
    "color": "Black"
   },
   {
    "id": 5591397370,
    "label": "L",
    "pence": 5499,
    "vid": 17297,
    "color": "Black"
   },
   {
    "id": 5591397374,
    "label": "XL",
    "pence": 5499,
    "vid": 17298,
    "color": "Black"
   },
   {
    "id": 5591397365,
    "label": "2XL",
    "pence": 5899,
    "vid": 17299,
    "color": "Black"
   },
   {
    "id": 5591397366,
    "label": "3XL",
    "pence": 6199,
    "vid": 17300,
    "color": "Black"
   },
   {
    "id": 5591397367,
    "label": "4XL",
    "pence": 6499,
    "vid": 17301,
    "color": "Black"
   },
   {
    "id": 5591397369,
    "label": "5XL",
    "pence": 6799,
    "vid": 17302,
    "color": "Black"
   },
   {
    "id": 5592884859,
    "vid": 17311,
    "label": "S",
    "pence": 5499,
    "color": "Navy"
   },
   {
    "id": 5592884858,
    "vid": 17312,
    "label": "M",
    "pence": 5499,
    "color": "Navy"
   },
   {
    "id": 5592884856,
    "vid": 17313,
    "label": "L",
    "pence": 5499,
    "color": "Navy"
   },
   {
    "id": 5592884876,
    "vid": 17314,
    "label": "XL",
    "pence": 5499,
    "color": "Navy"
   },
   {
    "id": 5592883690,
    "vid": 17315,
    "label": "2XL",
    "pence": 5899,
    "color": "Navy"
   },
   {
    "id": 5592883691,
    "vid": 17316,
    "label": "3XL",
    "pence": 6199,
    "color": "Navy"
   },
   {
    "id": 5592883692,
    "vid": 17317,
    "label": "4XL",
    "pence": 6499,
    "color": "Navy"
   },
   {
    "id": 5592884855,
    "vid": 17318,
    "label": "5XL",
    "pence": 6799,
    "color": "Navy"
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484535367-1.webp",
    "alt": "ESP Zip Hoodie in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484535367-2.webp",
    "alt": "ESP Zip Hoodie in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484535367-3.webp",
    "alt": "ESP Zip Hoodie in black with the mountain logo, worn, three-quarter view"
   },
   {
    "src": "/shop/pf/484535367-4.webp",
    "alt": "ESP Zip Hoodie in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484535367-5.webp",
    "alt": "ESP Zip Hoodie in black with the mountain logo, left side"
   }
  ],
  "details": [
   "Full-zip hoodie, fleece inside",
   "50% cotton, 50% polyester, 271 g/m²",
   "Embroidered mountain logo on the left chest"
  ],
  "colors": [
   {
    "name": "Black",
    "hex": "#0b0b0b",
    "gallery": []
   },
   {
    "name": "Navy",
    "hex": "#15263c",
    "gallery": [
     {
      "src": "/shop/pf/484535367-navy-1.webp",
      "alt": "ESP Zip Hoodie in navy with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535367-navy-2.webp",
      "alt": "ESP Zip Hoodie in navy with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535367-navy-3.webp",
      "alt": "ESP Zip Hoodie in navy with the mountain logo, worn, three-quarter view"
     }
    ]
   }
  ]
 },
 {
  "pid": 484535676,
  "name": "Cuffed Beanie",
  "cat": "apparel",
  "sub": "Headwear",
  "img": "/shop/pf/484467006.webp",
  "variants": [
   {
    "id": 5591398953,
    "label": "One size",
    "pence": 2599,
    "vid": 8936,
    "color": "Black"
   },
   {
    "id": 5592870394,
    "vid": 12880,
    "label": "One size",
    "pence": 2599,
    "color": "Brown"
   },
   {
    "id": 5592872463,
    "vid": 8940,
    "label": "One size",
    "pence": 2599,
    "color": "Navy"
   },
   {
    "id": 5592872479,
    "vid": 12881,
    "label": "One size",
    "pence": 2599,
    "color": "Dark Grey"
   },
   {
    "id": 5592872480,
    "vid": 17495,
    "label": "One size",
    "pence": 2599,
    "color": "Olive"
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484535676-1.webp",
    "alt": "ESP Cuffed Beanie in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484535676-2.webp",
    "alt": "ESP Cuffed Beanie in black with the mountain logo, in use, front"
   }
  ],
  "details": [
   "Cuffed knit beanie, 30 cm long",
   "100% acrylic",
   "Embroidered mountain logo"
  ],
  "colors": [
   {
    "name": "Black",
    "hex": "#0c0c0c",
    "gallery": []
   },
   {
    "name": "Brown",
    "hex": "#1f0a03",
    "gallery": [
     {
      "src": "/shop/pf/484535676-brown-1.webp",
      "alt": "ESP Cuffed Beanie in brown with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535676-brown-2.webp",
      "alt": "ESP Cuffed Beanie in brown with the mountain logo, in use, front"
     }
    ]
   },
   {
    "name": "Navy",
    "hex": "#141323",
    "gallery": [
     {
      "src": "/shop/pf/484535676-navy-1.webp",
      "alt": "ESP Cuffed Beanie in navy with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535676-navy-2.webp",
      "alt": "ESP Cuffed Beanie in navy with the mountain logo, in use, front"
     }
    ]
   },
   {
    "name": "Dark Grey",
    "hex": "#2d2a2a",
    "gallery": [
     {
      "src": "/shop/pf/484535676-dark-grey-1.webp",
      "alt": "ESP Cuffed Beanie in dark grey with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535676-dark-grey-2.webp",
      "alt": "ESP Cuffed Beanie in dark grey with the mountain logo, in use, front"
     }
    ]
   },
   {
    "name": "Olive",
    "hex": "#41401d",
    "gallery": [
     {
      "src": "/shop/pf/484535676-olive-1.webp",
      "alt": "ESP Cuffed Beanie in olive with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535676-olive-2.webp",
      "alt": "ESP Cuffed Beanie in olive with the mountain logo, in use, front"
     }
    ]
   }
  ]
 },
 {
  "pid": 484535781,
  "name": "Pom-Pom Beanie",
  "cat": "apparel",
  "sub": "Headwear",
  "img": "/shop/pf/484468509.webp",
  "variants": [
   {
    "id": 5591399321,
    "label": "One size",
    "pence": 2699,
    "vid": 11733,
    "color": "Black"
   },
   {
    "id": 5592868952,
    "vid": 11736,
    "label": "One size",
    "pence": 2699,
    "color": "French Navy"
   },
   {
    "id": 5592870374,
    "vid": 11737,
    "label": "One size",
    "pence": 2699,
    "color": "Burgundy"
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484535781-1.webp",
    "alt": "ESP Pom-Pom Beanie in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484535781-2.webp",
    "alt": "ESP Pom-Pom Beanie in black with the mountain logo, worn, front"
   }
  ],
  "details": [
   "Cuffed beanie with a pom-pom, double-layer knit",
   "100% soft-touch acrylic",
   "Embroidered mountain logo"
  ],
  "colors": [
   {
    "name": "Black",
    "hex": "#101010",
    "gallery": []
   },
   {
    "name": "French Navy",
    "hex": "#152027",
    "gallery": [
     {
      "src": "/shop/pf/484535781-french-navy-1.webp",
      "alt": "ESP Pom-Pom Beanie in french navy with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535781-french-navy-2.webp",
      "alt": "ESP Pom-Pom Beanie in french navy with the mountain logo, worn, front"
     }
    ]
   },
   {
    "name": "Burgundy",
    "hex": "#590716",
    "gallery": [
     {
      "src": "/shop/pf/484535781-burgundy-1.webp",
      "alt": "ESP Pom-Pom Beanie in burgundy with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535781-burgundy-2.webp",
      "alt": "ESP Pom-Pom Beanie in burgundy with the mountain logo, worn, front"
     }
    ]
   }
  ]
 },
 {
  "pid": 484535744,
  "name": "Fisherman Beanie",
  "cat": "apparel",
  "sub": "Headwear",
  "img": "/shop/pf/484468552.webp",
  "variants": [
   {
    "id": 5591399057,
    "label": "One size",
    "pence": 2799,
    "vid": 20487
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484535744-1.webp",
    "alt": "ESP Fisherman Beanie in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484535744-2.webp",
    "alt": "ESP Fisherman Beanie in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484535744-3.webp",
    "alt": "ESP Fisherman Beanie in black with the mountain logo, worn, three-quarter view"
   }
  ],
  "details": [
   "Fisherman beanie, wide ribbed knit, snug fit",
   "100% acrylic",
   "Embroidered mountain logo"
  ]
 },
 {
  "pid": 484535747,
  "name": "Visor",
  "cat": "apparel",
  "sub": "Headwear",
  "img": "/shop/pf/484468551.webp",
  "variants": [
   {
    "id": 5591399268,
    "label": "One size",
    "pence": 2899,
    "vid": 8913
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484535747-1.webp",
    "alt": "ESP Visor in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484535747-2.webp",
    "alt": "ESP Visor in black with the mountain logo, in use, front"
   },
   {
    "src": "/shop/pf/484535747-3.webp",
    "alt": "ESP Visor in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484535747-4.webp",
    "alt": "ESP Visor in black with the mountain logo, three-quarter view"
   }
  ],
  "details": [
   "Sports visor, low profile",
   "97% polyester, 3% elastane",
   "Embroidered mountain logo"
  ]
 },
 {
  "pid": 484534981,
  "name": "Trucker Cap",
  "cat": "apparel",
  "sub": "Headwear",
  "img": "/shop/pf/484468543.webp",
  "variants": [
   {
    "id": 5591395827,
    "label": "One size",
    "pence": 3099,
    "vid": 15403
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534981-1.webp",
    "alt": "ESP Trucker Cap in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534981-2.webp",
    "alt": "ESP Trucker Cap in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484534981-3.webp",
    "alt": "ESP Trucker Cap in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484534981-4.webp",
    "alt": "ESP Trucker Cap in black with the mountain logo, three-quarter view"
   }
  ],
  "details": [
   "Trucker cap with a mesh back, mid profile",
   "Polyester and cotton",
   "Embroidered mountain logo"
  ]
 },
 {
  "pid": 484535816,
  "name": "Snapback",
  "cat": "apparel",
  "sub": "Headwear",
  "img": "/shop/pf/484468536.webp",
  "variants": [
   {
    "id": 5591399381,
    "label": "One size",
    "pence": 3199,
    "vid": 4792,
    "color": "Black"
   },
   {
    "id": 5592868433,
    "vid": 4798,
    "label": "One size",
    "pence": 3199,
    "color": "Dark Navy"
   },
   {
    "id": 5592868451,
    "vid": 4802,
    "label": "One size",
    "pence": 3199,
    "color": "Navy"
   },
   {
    "id": 5592868464,
    "vid": 4809,
    "label": "One size",
    "pence": 3199,
    "color": "Spruce"
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484535816-1.webp",
    "alt": "ESP Snapback in black with the mountain logo, left side"
   },
   {
    "src": "/shop/pf/484535816-2.webp",
    "alt": "ESP Snapback in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484535816-3.webp",
    "alt": "ESP Snapback in black with the mountain logo, worn, back"
   },
   {
    "src": "/shop/pf/484535816-4.webp",
    "alt": "ESP Snapback in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484535816-5.webp",
    "alt": "ESP Snapback in black with the mountain logo, three-quarter view"
   }
  ],
  "details": [
   "Structured six-panel snapback, high profile",
   "Acrylic and wool blend",
   "Embroidered mountain logo"
  ],
  "colors": [
   {
    "name": "Black",
    "hex": "#2a2a2a",
    "gallery": []
   },
   {
    "name": "Dark Navy",
    "hex": "#15293a",
    "gallery": [
     {
      "src": "/shop/pf/484535816-dark-navy-1.webp",
      "alt": "ESP Snapback in dark navy with the mountain logo, left side"
     },
     {
      "src": "/shop/pf/484535816-dark-navy-2.webp",
      "alt": "ESP Snapback in dark navy with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535816-dark-navy-3.webp",
      "alt": "ESP Snapback in dark navy with the mountain logo, worn, back"
     }
    ]
   },
   {
    "name": "Navy",
    "hex": "#303044",
    "gallery": [
     {
      "src": "/shop/pf/484535816-navy-1.webp",
      "alt": "ESP Snapback in navy with the mountain logo, left side"
     },
     {
      "src": "/shop/pf/484535816-navy-2.webp",
      "alt": "ESP Snapback in navy with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535816-navy-3.webp",
      "alt": "ESP Snapback in navy with the mountain logo, worn, back"
     }
    ]
   },
   {
    "name": "Spruce",
    "hex": "#183e41",
    "gallery": [
     {
      "src": "/shop/pf/484535816-spruce-1.webp",
      "alt": "ESP Snapback in spruce with the mountain logo, left side"
     },
     {
      "src": "/shop/pf/484535816-spruce-2.webp",
      "alt": "ESP Snapback in spruce with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535816-spruce-3.webp",
      "alt": "ESP Snapback in spruce with the mountain logo, worn, back"
     }
    ]
   }
  ]
 },
 {
  "pid": 484535849,
  "name": "Structured Cap",
  "cat": "apparel",
  "sub": "Headwear",
  "img": "/shop/pf/484467002.webp",
  "variants": [
   {
    "id": 5591399427,
    "label": "L/XL",
    "pence": 3199,
    "vid": 5277,
    "color": "Black"
   },
   {
    "id": 5591399429,
    "label": "S/M",
    "pence": 3199,
    "vid": 5276,
    "color": "Black"
   },
   {
    "id": 5592866870,
    "vid": 5279,
    "label": "L/XL",
    "pence": 3199,
    "color": "Dark Navy"
   },
   {
    "id": 5592866762,
    "vid": 5278,
    "label": "S/M",
    "pence": 3199,
    "color": "Dark Navy"
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484535849-1.webp",
    "alt": "ESP Structured Cap in black with the mountain logo, left side"
   },
   {
    "src": "/shop/pf/484535849-2.webp",
    "alt": "ESP Structured Cap in black with the mountain logo, worn, left side"
   },
   {
    "src": "/shop/pf/484535849-3.webp",
    "alt": "ESP Structured Cap in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484535849-4.webp",
    "alt": "ESP Structured Cap in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484535849-5.webp",
    "alt": "ESP Structured Cap in black with the mountain logo, three-quarter view"
   }
  ],
  "details": [
   "Structured six-panel cap, mid profile",
   "Polyester and cotton twill with a little stretch",
   "Embroidered mountain logo"
  ],
  "colors": [
   {
    "name": "Black",
    "hex": "#1b1b1b",
    "gallery": []
   },
   {
    "name": "Dark Navy",
    "hex": "#171822",
    "gallery": [
     {
      "src": "/shop/pf/484535849-dark-navy-1.webp",
      "alt": "ESP Structured Cap in dark navy with the mountain logo, left side"
     },
     {
      "src": "/shop/pf/484535849-dark-navy-2.webp",
      "alt": "ESP Structured Cap in dark navy with the mountain logo, worn, left side"
     },
     {
      "src": "/shop/pf/484535849-dark-navy-3.webp",
      "alt": "ESP Structured Cap in dark navy with the mountain logo, worn, front"
     }
    ]
   }
  ]
 },
 {
  "pid": 484535801,
  "name": "Low Profile Cap",
  "cat": "apparel",
  "sub": "Headwear",
  "img": "/shop/pf/484468546.webp",
  "variants": [
   {
    "id": 5591399360,
    "label": "One size",
    "pence": 3299,
    "vid": 22663
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484535801-1.webp",
    "alt": "ESP Low Profile Cap in black with the mountain logo, left side"
   },
   {
    "src": "/shop/pf/484535801-2.webp",
    "alt": "ESP Low Profile Cap in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484535801-3.webp",
    "alt": "ESP Low Profile Cap in black with the mountain logo, three-quarter view"
   },
   {
    "src": "/shop/pf/484535801-4.webp",
    "alt": "ESP Low Profile Cap in black with the mountain logo, front"
   }
  ],
  "details": [
   "Unstructured six-panel cap, low profile, hook-and-loop strap",
   "100% cotton twill",
   "Embroidered mountain logo"
  ]
 },
 {
  "pid": 484535845,
  "name": "Dad Hat",
  "cat": "apparel",
  "sub": "Headwear",
  "img": "/shop/pf/484467005.webp",
  "variants": [
   {
    "id": 5591399409,
    "label": "One size",
    "pence": 3299,
    "vid": 7854,
    "color": "Black"
   },
   {
    "id": 5592866876,
    "vid": 7857,
    "label": "One size",
    "pence": 3299,
    "color": "Navy"
   },
   {
    "id": 5592866879,
    "vid": 12736,
    "label": "One size",
    "pence": 3299,
    "color": "Dark Grey"
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484535845-1.webp",
    "alt": "ESP Dad Hat in black with the mountain logo, left side"
   },
   {
    "src": "/shop/pf/484535845-2.webp",
    "alt": "ESP Dad Hat in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484535845-3.webp",
    "alt": "ESP Dad Hat in black with the mountain logo, worn, back"
   },
   {
    "src": "/shop/pf/484535845-4.webp",
    "alt": "ESP Dad Hat in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484535845-5.webp",
    "alt": "ESP Dad Hat in black with the mountain logo, three-quarter view"
   }
  ],
  "details": [
   "Unstructured six-panel cap, low profile, adjustable strap",
   "100% cotton chino twill",
   "Embroidered mountain logo"
  ],
  "colors": [
   {
    "name": "Black",
    "hex": "#181717",
    "gallery": []
   },
   {
    "name": "Navy",
    "hex": "#182031",
    "gallery": [
     {
      "src": "/shop/pf/484535845-navy-1.webp",
      "alt": "ESP Dad Hat in navy with the mountain logo, left side"
     },
     {
      "src": "/shop/pf/484535845-navy-2.webp",
      "alt": "ESP Dad Hat in navy with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535845-navy-3.webp",
      "alt": "ESP Dad Hat in navy with the mountain logo, worn, back"
     }
    ]
   },
   {
    "name": "Dark Grey",
    "hex": "#39353a",
    "gallery": [
     {
      "src": "/shop/pf/484535845-dark-grey-1.webp",
      "alt": "ESP Dad Hat in dark grey with the mountain logo, left side"
     },
     {
      "src": "/shop/pf/484535845-dark-grey-2.webp",
      "alt": "ESP Dad Hat in dark grey with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535845-dark-grey-3.webp",
      "alt": "ESP Dad Hat in dark grey with the mountain logo, worn, back"
     }
    ]
   }
  ]
 },
 {
  "pid": 484535771,
  "name": "Bucket Hat",
  "cat": "apparel",
  "sub": "Headwear",
  "img": "/shop/pf/484468548.webp",
  "variants": [
   {
    "id": 5591399297,
    "label": "One size",
    "pence": 3799,
    "vid": 8760,
    "color": "Black"
   },
   {
    "id": 5592870381,
    "vid": 8761,
    "label": "One size",
    "pence": 3799,
    "color": "Navy"
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484535771-1.webp",
    "alt": "ESP Bucket Hat in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484535771-2.webp",
    "alt": "ESP Bucket Hat in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484535771-3.webp",
    "alt": "ESP Bucket Hat in black with the mountain logo, worn, three-quarter view"
   }
  ],
  "details": [
   "Bucket hat, mid profile",
   "98% cotton, 2% elastane",
   "Embroidered mountain logo"
  ],
  "colors": [
   {
    "name": "Black",
    "hex": "#000000",
    "gallery": []
   },
   {
    "name": "Navy",
    "hex": "#2C3848",
    "gallery": [
     {
      "src": "/shop/pf/484535771-navy-1.webp",
      "alt": "ESP Bucket Hat in navy with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535771-navy-2.webp",
      "alt": "ESP Bucket Hat in navy with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535771-navy-3.webp",
      "alt": "ESP Bucket Hat in navy with the mountain logo, worn, three-quarter view"
     }
    ]
   }
  ]
 },
 {
  "pid": 484534578,
  "name": "Kids Tee",
  "cat": "apparel",
  "sub": "Kids",
  "img": "/shop/pf/484470146.webp",
  "variants": [
   {
    "id": 5591393955,
    "label": "XS",
    "pence": 1799,
    "vid": 18685,
    "color": "Black"
   },
   {
    "id": 5591393949,
    "label": "S",
    "pence": 1799,
    "vid": 18686,
    "color": "Black"
   },
   {
    "id": 5591393947,
    "label": "M",
    "pence": 1799,
    "vid": 18687,
    "color": "Black"
   },
   {
    "id": 5591393945,
    "label": "L",
    "pence": 1799,
    "vid": 18688,
    "color": "Black"
   },
   {
    "id": 5591393951,
    "label": "XL",
    "pence": 1799,
    "vid": 18689,
    "color": "Black"
   },
   {
    "id": 5592891115,
    "vid": 18705,
    "label": "XS",
    "pence": 1799,
    "color": "Navy"
   },
   {
    "id": 5592891111,
    "vid": 18706,
    "label": "S",
    "pence": 1799,
    "color": "Navy"
   },
   {
    "id": 5592891048,
    "vid": 18707,
    "label": "M",
    "pence": 1799,
    "color": "Navy"
   },
   {
    "id": 5592891041,
    "vid": 18708,
    "label": "L",
    "pence": 1799,
    "color": "Navy"
   },
   {
    "id": 5592891113,
    "vid": 18709,
    "label": "XL",
    "pence": 1799,
    "color": "Navy"
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534578-1.webp",
    "alt": "ESP Kids Tee in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534578-2.webp",
    "alt": "ESP Kids Tee in black with the mountain logo, worn, three-quarter view"
   },
   {
    "src": "/shop/pf/484534578-3.webp",
    "alt": "ESP Kids Tee in black with the mountain logo, worn, back"
   },
   {
    "src": "/shop/pf/484534578-4.webp",
    "alt": "ESP Kids Tee in black with the mountain logo, back"
   }
  ],
  "details": [
   "Children's T-shirt",
   "100% cotton, 180 g/m²",
   "Embroidered mountain logo on the left chest"
  ],
  "colors": [
   {
    "name": "Black",
    "hex": "#090909",
    "gallery": []
   },
   {
    "name": "Navy",
    "hex": "#16263f",
    "gallery": [
     {
      "src": "/shop/pf/484534578-navy-1.webp",
      "alt": "ESP Kids Tee in navy with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484534578-navy-2.webp",
      "alt": "ESP Kids Tee in navy with the mountain logo, worn, three-quarter view"
     },
     {
      "src": "/shop/pf/484534578-navy-3.webp",
      "alt": "ESP Kids Tee in navy with the mountain logo, worn, back"
     }
    ]
   }
  ]
 },
 {
  "pid": 484534566,
  "name": "Kids Hoodie",
  "cat": "apparel",
  "sub": "Kids",
  "img": "/shop/pf/484470162.webp",
  "variants": [
   {
    "id": 5591393841,
    "label": "XS",
    "pence": 3399,
    "vid": 17261
   },
   {
    "id": 5591393838,
    "label": "S",
    "pence": 3399,
    "vid": 17260
   },
   {
    "id": 5591393837,
    "label": "M",
    "pence": 3399,
    "vid": 17262
   },
   {
    "id": 5591393836,
    "label": "L",
    "pence": 3399,
    "vid": 17263
   },
   {
    "id": 5591393839,
    "label": "XL",
    "pence": 3399,
    "vid": 17264
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534566-1.webp",
    "alt": "ESP Kids Hoodie in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534566-2.webp",
    "alt": "ESP Kids Hoodie in black with the mountain logo, worn, three-quarter view"
   },
   {
    "src": "/shop/pf/484534566-3.webp",
    "alt": "ESP Kids Hoodie in black with the mountain logo, worn, back"
   },
   {
    "src": "/shop/pf/484534566-4.webp",
    "alt": "ESP Kids Hoodie in black with the mountain logo, back"
   }
  ],
  "details": [
   "Children's hoodie",
   "50% cotton, 50% polyester, 271 g/m²",
   "Embroidered mountain logo on the left chest"
  ]
 },
 {
  "pid": 484534315,
  "name": "Tote Bag",
  "cat": "bags",
  "img": "/shop/pf/484508608.webp",
  "variants": [
   {
    "id": 5591391927,
    "label": "One size",
    "pence": 2799,
    "vid": 10457
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534315-1.webp",
    "alt": "ESP Tote Bag in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534315-2.webp",
    "alt": "ESP Tote Bag in black with the mountain logo, worn, front"
   }
  ],
  "details": [
   "Everyday tote bag, about 41 × 36 × 13 cm",
   "100% organic cotton twill",
   "Embroidered mountain logo"
  ]
 },
 {
  "pid": 484536929,
  "name": "Crossbody Bag",
  "cat": "bags",
  "img": "/shop/pf/484470193.webp",
  "variants": [
   {
    "id": 5591404268,
    "label": "One size",
    "pence": 3999,
    "vid": 49308
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484536929-1.webp",
    "alt": "ESP Crossbody Bag in black with the mountain logo, front"
   }
  ],
  "details": [
   "Crossbody bag, about 45 × 22 × 12 cm, 12 litres",
   "100% recycled polyester, water-repellent",
   "Embroidered mountain logo"
  ]
 },
 {
  "pid": 484534335,
  "name": "Bum Bag",
  "cat": "bags",
  "img": "/shop/pf/484471535.webp",
  "variants": [
   {
    "id": 5591391975,
    "label": "M/L",
    "pence": 4299,
    "vid": 9987
   },
   {
    "id": 5591391976,
    "label": "S/M",
    "pence": 4299,
    "vid": 9986
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534335-1.webp",
    "alt": "ESP Bum Bag in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534335-2.webp",
    "alt": "ESP Bum Bag in black with the mountain logo, worn, front"
   }
  ],
  "details": [
   "Bum bag, about 33 × 16 cm, 1.4 litres, adjustable strap",
   "100% polyester",
   "Printed mountain logo"
  ]
 },
 {
  "pid": 484534986,
  "name": "Utility Backpack",
  "cat": "bags",
  "img": "/shop/pf/484468514.webp",
  "variants": [
   {
    "id": 5591395862,
    "label": "One size",
    "pence": 6499,
    "vid": 24563
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534986-1.webp",
    "alt": "ESP Utility Backpack in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534986-2.webp",
    "alt": "ESP Utility Backpack in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484534986-3.webp",
    "alt": "ESP Utility Backpack in black with the mountain logo, worn, back"
   },
   {
    "src": "/shop/pf/484534986-4.webp",
    "alt": "ESP Utility Backpack in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484534986-5.webp",
    "alt": "ESP Utility Backpack in black with the mountain logo, three-quarter view"
   }
  ],
  "details": [
   "Utility backpack, 16 litres, holds up to 5 kg",
   "100% polyester, 330 g/m²",
   "Printed mountain logo"
  ]
 },
 {
  "pid": 484534334,
  "name": "Gym Bag",
  "cat": "bags",
  "img": "/shop/pf/484471613.webp",
  "variants": [
   {
    "id": 5591391974,
    "label": "One size",
    "pence": 6999,
    "vid": 15155
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534334-1.webp",
    "alt": "ESP Gym Bag in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534334-2.webp",
    "alt": "ESP Gym Bag in black with the mountain logo, in use, three-quarter view"
   }
  ],
  "details": [
   "Gym bag, 30 litres, water-resistant",
   "100% polyester",
   "Printed mountain logo"
  ]
 },
 {
  "pid": 484534990,
  "name": "Sticker",
  "cat": "outerwear",
  "img": "/shop/pf/484468511.webp",
  "variants": [
   {
    "id": 5591395882,
    "label": "15″×3.75″",
    "pence": 999,
    "vid": 16362
   },
   {
    "id": 5591395879,
    "label": "3″×3″",
    "pence": 499,
    "vid": 10163
   },
   {
    "id": 5591395880,
    "label": "4″×4″",
    "pence": 499,
    "vid": 10164
   },
   {
    "id": 5591395881,
    "label": "5.5″×5.5″",
    "pence": 599,
    "vid": 10165
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534990-1.webp",
    "alt": "ESP Sticker in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534990-2.webp",
    "alt": "ESP Sticker in black with the mountain logo, in use"
   },
   {
    "src": "/shop/pf/484534990-3.webp",
    "alt": "ESP Sticker in black with the mountain logo, in use"
   }
  ],
  "details": [
   "Kiss-cut vinyl sticker",
   "Durable, opaque vinyl that goes on without bubbles",
   "Mountain logo"
  ]
 },
 {
  "pid": 484534422,
  "name": "Embroidered Patch",
  "cat": "outerwear",
  "img": "/shop/pf/484470341.webp",
  "variants": [
   {
    "id": 5591392398,
    "label": "Circular ⌀3 in",
    "pence": 1399,
    "vid": 12981
   },
   {
    "id": 5591392399,
    "label": "Heart - 3.1″×2.8″",
    "pence": 1399,
    "vid": 15569
   },
   {
    "id": 5591392400,
    "label": "Oval 4″×2.6″",
    "pence": 1399,
    "vid": 15736
   },
   {
    "id": 5591392401,
    "label": "Rectangle 3.5″×2.25″",
    "pence": 1399,
    "vid": 15563
   },
   {
    "id": 5591392402,
    "label": "Square 3″×3″",
    "pence": 1399,
    "vid": 15560
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534422-1.webp",
    "alt": "ESP Embroidered Patch in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534422-2.webp",
    "alt": "ESP Embroidered Patch in black with the mountain logo, in use, front"
   }
  ],
  "details": [
   "Embroidered patch, iron-on or sew-on",
   "Cotton and polyester",
   "Mountain logo"
  ]
 },
 {
  "pid": 484534381,
  "name": "Mug",
  "cat": "outerwear",
  "img": "/shop/pf/484470742.webp",
  "variants": [
   {
    "id": 5591392236,
    "label": "11 oz",
    "pence": 1599,
    "vid": 9323
   },
   {
    "id": 5591392238,
    "label": "15 oz",
    "pence": 1799,
    "vid": 9324
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534381-1.webp",
    "alt": "ESP Mug in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534381-2.webp",
    "alt": "ESP Mug in black with the mountain logo, in use, handle on the right"
   },
   {
    "src": "/shop/pf/484534381-3.webp",
    "alt": "ESP Mug in black with the mountain logo, handle on the right"
   }
  ],
  "details": [
   "Glossy mug",
   "Black ceramic",
   "Printed mountain logo"
  ]
 },
 {
  "pid": 484534359,
  "name": "iPhone Tough Case",
  "cat": "outerwear",
  "img": "/shop/pf/484471256.webp",
  "variants": [
   {
    "id": 5591392107,
    "label": "Glossy / iPhone 11",
    "pence": 2899,
    "vid": 15381
   },
   {
    "id": 5591392106,
    "label": "Glossy / iPhone 11 Pro",
    "pence": 2899,
    "vid": 15382
   },
   {
    "id": 5591392105,
    "label": "Glossy / iPhone 11 Pro Max",
    "pence": 2899,
    "vid": 15383
   },
   {
    "id": 5591392111,
    "label": "Glossy / iPhone 12",
    "pence": 2899,
    "vid": 15384
   },
   {
    "id": 5591392110,
    "label": "Glossy / iPhone 12 Pro",
    "pence": 2899,
    "vid": 15386
   },
   {
    "id": 5591392109,
    "label": "Glossy / iPhone 12 Pro Max",
    "pence": 2899,
    "vid": 15387
   },
   {
    "id": 5591392108,
    "label": "Glossy / iPhone 12 mini",
    "pence": 2899,
    "vid": 15385
   },
   {
    "id": 5591392115,
    "label": "Glossy / iPhone 13",
    "pence": 2899,
    "vid": 15388
   },
   {
    "id": 5591392114,
    "label": "Glossy / iPhone 13 Pro",
    "pence": 2899,
    "vid": 15390
   },
   {
    "id": 5591392113,
    "label": "Glossy / iPhone 13 Pro Max",
    "pence": 2899,
    "vid": 15391
   },
   {
    "id": 5591392112,
    "label": "Glossy / iPhone 13 mini",
    "pence": 2899,
    "vid": 15389
   },
   {
    "id": 5591392119,
    "label": "Glossy / iPhone 14",
    "pence": 2899,
    "vid": 16124
   },
   {
    "id": 5591392116,
    "label": "Glossy / iPhone 14 Plus",
    "pence": 2899,
    "vid": 16128
   },
   {
    "id": 5591392118,
    "label": "Glossy / iPhone 14 Pro",
    "pence": 2899,
    "vid": 16126
   },
   {
    "id": 5591392117,
    "label": "Glossy / iPhone 14 Pro Max",
    "pence": 2899,
    "vid": 16130
   },
   {
    "id": 5591392123,
    "label": "Glossy / iPhone 15",
    "pence": 2899,
    "vid": 17714
   },
   {
    "id": 5591392120,
    "label": "Glossy / iPhone 15 Plus",
    "pence": 2899,
    "vid": 17716
   },
   {
    "id": 5591392122,
    "label": "Glossy / iPhone 15 Pro",
    "pence": 2899,
    "vid": 17718
   },
   {
    "id": 5591392121,
    "label": "Glossy / iPhone 15 Pro Max",
    "pence": 2899,
    "vid": 17720
   },
   {
    "id": 5591392127,
    "label": "Glossy / iPhone 16",
    "pence": 2899,
    "vid": 20302
   },
   {
    "id": 5591392124,
    "label": "Glossy / iPhone 16 Plus",
    "pence": 2899,
    "vid": 20303
   },
   {
    "id": 5591392126,
    "label": "Glossy / iPhone 16 Pro",
    "pence": 2899,
    "vid": 20304
   },
   {
    "id": 5591392125,
    "label": "Glossy / iPhone 16 Pro Max",
    "pence": 2899,
    "vid": 20305
   },
   {
    "id": 5591392131,
    "label": "Glossy / iPhone 17",
    "pence": 2899,
    "vid": 33985
   },
   {
    "id": 5591392128,
    "label": "Glossy / iPhone 17 Air",
    "pence": 2899,
    "vid": 33986
   },
   {
    "id": 5591392130,
    "label": "Glossy / iPhone 17 Pro",
    "pence": 2899,
    "vid": 33987
   },
   {
    "id": 5591392129,
    "label": "Glossy / iPhone 17 Pro Max",
    "pence": 2899,
    "vid": 33988
   },
   {
    "id": 5591392133,
    "label": "Glossy / iPhone 18 Pro",
    "pence": 2899,
    "vid": 52384
   },
   {
    "id": 5591392132,
    "label": "Glossy / iPhone 18 Pro Max",
    "pence": 2899,
    "vid": 52386
   },
   {
    "id": 5591392136,
    "label": "Matte / iPhone 11",
    "pence": 2899,
    "vid": 15392
   },
   {
    "id": 5591392135,
    "label": "Matte / iPhone 11 Pro",
    "pence": 2899,
    "vid": 15393
   },
   {
    "id": 5591392134,
    "label": "Matte / iPhone 11 Pro Max",
    "pence": 2899,
    "vid": 15394
   },
   {
    "id": 5591392140,
    "label": "Matte / iPhone 12",
    "pence": 2899,
    "vid": 15395
   },
   {
    "id": 5591392139,
    "label": "Matte / iPhone 12 Pro",
    "pence": 2899,
    "vid": 15397
   },
   {
    "id": 5591392138,
    "label": "Matte / iPhone 12 Pro Max",
    "pence": 2899,
    "vid": 15398
   },
   {
    "id": 5591392137,
    "label": "Matte / iPhone 12 mini",
    "pence": 2899,
    "vid": 15396
   },
   {
    "id": 5591392144,
    "label": "Matte / iPhone 13",
    "pence": 2899,
    "vid": 15399
   },
   {
    "id": 5591392143,
    "label": "Matte / iPhone 13 Pro",
    "pence": 2899,
    "vid": 15401
   },
   {
    "id": 5591392142,
    "label": "Matte / iPhone 13 Pro Max",
    "pence": 2899,
    "vid": 15402
   },
   {
    "id": 5591392141,
    "label": "Matte / iPhone 13 mini",
    "pence": 2899,
    "vid": 15400
   },
   {
    "id": 5591392148,
    "label": "Matte / iPhone 14",
    "pence": 2899,
    "vid": 16125
   },
   {
    "id": 5591392145,
    "label": "Matte / iPhone 14 Plus",
    "pence": 2899,
    "vid": 16129
   },
   {
    "id": 5591392147,
    "label": "Matte / iPhone 14 Pro",
    "pence": 2899,
    "vid": 16127
   },
   {
    "id": 5591392146,
    "label": "Matte / iPhone 14 Pro Max",
    "pence": 2899,
    "vid": 16131
   },
   {
    "id": 5591392152,
    "label": "Matte / iPhone 15",
    "pence": 2899,
    "vid": 17715
   },
   {
    "id": 5591392149,
    "label": "Matte / iPhone 15 Plus",
    "pence": 2899,
    "vid": 17717
   },
   {
    "id": 5591392151,
    "label": "Matte / iPhone 15 Pro",
    "pence": 2899,
    "vid": 17719
   },
   {
    "id": 5591392150,
    "label": "Matte / iPhone 15 Pro Max",
    "pence": 2899,
    "vid": 17721
   },
   {
    "id": 5591392156,
    "label": "Matte / iPhone 16",
    "pence": 2899,
    "vid": 20306
   },
   {
    "id": 5591392153,
    "label": "Matte / iPhone 16 Plus",
    "pence": 2899,
    "vid": 20307
   },
   {
    "id": 5591392155,
    "label": "Matte / iPhone 16 Pro",
    "pence": 2899,
    "vid": 20308
   },
   {
    "id": 5591392154,
    "label": "Matte / iPhone 16 Pro Max",
    "pence": 2899,
    "vid": 20309
   },
   {
    "id": 5591392160,
    "label": "Matte / iPhone 17",
    "pence": 2899,
    "vid": 33989
   },
   {
    "id": 5591392157,
    "label": "Matte / iPhone 17 Air",
    "pence": 2899,
    "vid": 33990
   },
   {
    "id": 5591392159,
    "label": "Matte / iPhone 17 Pro",
    "pence": 2899,
    "vid": 33991
   },
   {
    "id": 5591392158,
    "label": "Matte / iPhone 17 Pro Max",
    "pence": 2899,
    "vid": 33992
   },
   {
    "id": 5591392162,
    "label": "Matte / iPhone 18 Pro",
    "pence": 2899,
    "vid": 52385
   },
   {
    "id": 5591392161,
    "label": "Matte / iPhone 18 Pro Max",
    "pence": 2899,
    "vid": 52387
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534359-1.webp",
    "alt": "ESP iPhone Tough Case in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534359-2.webp",
    "alt": "ESP iPhone Tough Case in black with the mountain logo, showing the case's layers"
   }
  ],
  "details": [
   "Dual-layer tough phone case for iPhone",
   "Polycarbonate shell with a flexible inner liner",
   "Printed mountain logo"
  ]
 },
 {
  "pid": 484534364,
  "name": "Samsung Tough Case",
  "cat": "outerwear",
  "img": "/shop/pf/484471062.webp",
  "variants": [
   {
    "id": 5591392173,
    "label": "Glossy / Samsung Galaxy S20",
    "pence": 2899,
    "vid": 16981
   },
   {
    "id": 5591392169,
    "label": "Glossy / Samsung Galaxy S20 FE",
    "pence": 2899,
    "vid": 16975
   },
   {
    "id": 5591392170,
    "label": "Glossy / Samsung Galaxy S20 Plus",
    "pence": 2899,
    "vid": 16977
   },
   {
    "id": 5591392172,
    "label": "Glossy / Samsung Galaxy S20 Ultra",
    "pence": 2899,
    "vid": 16979
   },
   {
    "id": 5591392179,
    "label": "Glossy / Samsung Galaxy S21",
    "pence": 2899,
    "vid": 16989
   },
   {
    "id": 5591392175,
    "label": "Glossy / Samsung Galaxy S21 FE",
    "pence": 2899,
    "vid": 16983
   },
   {
    "id": 5591392176,
    "label": "Glossy / Samsung Galaxy S21 Plus",
    "pence": 2899,
    "vid": 16985
   },
   {
    "id": 5591392178,
    "label": "Glossy / Samsung Galaxy S21 Ultra",
    "pence": 2899,
    "vid": 16987
   },
   {
    "id": 5591392183,
    "label": "Glossy / Samsung Galaxy S22",
    "pence": 2899,
    "vid": 16995
   },
   {
    "id": 5591392180,
    "label": "Glossy / Samsung Galaxy S22 Plus",
    "pence": 2899,
    "vid": 16991
   },
   {
    "id": 5591392182,
    "label": "Glossy / Samsung Galaxy S22 Ultra",
    "pence": 2899,
    "vid": 16993
   },
   {
    "id": 5591392186,
    "label": "Glossy / Samsung Galaxy S23",
    "pence": 2899,
    "vid": 17001
   },
   {
    "id": 5591392184,
    "label": "Glossy / Samsung Galaxy S23 Plus",
    "pence": 2899,
    "vid": 16997
   },
   {
    "id": 5591392185,
    "label": "Glossy / Samsung Galaxy S23 Ultra",
    "pence": 2899,
    "vid": 16999
   },
   {
    "id": 5591392191,
    "label": "Glossy / Samsung Galaxy S24",
    "pence": 2899,
    "vid": 18743
   },
   {
    "id": 5591392189,
    "label": "Glossy / Samsung Galaxy S24 Plus",
    "pence": 2899,
    "vid": 18744
   },
   {
    "id": 5591392190,
    "label": "Glossy / Samsung Galaxy S24 Ultra",
    "pence": 2899,
    "vid": 18745
   },
   {
    "id": 5591392194,
    "label": "Glossy / Samsung Galaxy S25",
    "pence": 2899,
    "vid": 21469
   },
   {
    "id": 5591392192,
    "label": "Glossy / Samsung Galaxy S25 Plus",
    "pence": 2899,
    "vid": 21471
   },
   {
    "id": 5591392193,
    "label": "Glossy / Samsung Galaxy S25 Ultra",
    "pence": 2899,
    "vid": 21473
   },
   {
    "id": 5591392198,
    "label": "Glossy / Samsung Galaxy S26",
    "pence": 2999,
    "vid": 49327
   },
   {
    "id": 5591392195,
    "label": "Glossy / Samsung Galaxy S26 Plus",
    "pence": 2999,
    "vid": 49328
   },
   {
    "id": 5591392197,
    "label": "Glossy / Samsung Galaxy S26 Ultra",
    "pence": 2999,
    "vid": 49329
   },
   {
    "id": 5591392202,
    "label": "Matte / Samsung Galaxy S20",
    "pence": 2899,
    "vid": 16982
   },
   {
    "id": 5591392199,
    "label": "Matte / Samsung Galaxy S20 FE",
    "pence": 2899,
    "vid": 16976
   },
   {
    "id": 5591392200,
    "label": "Matte / Samsung Galaxy S20 Plus",
    "pence": 2899,
    "vid": 16978
   },
   {
    "id": 5591392201,
    "label": "Matte / Samsung Galaxy S20 Ultra",
    "pence": 2899,
    "vid": 16980
   },
   {
    "id": 5591392207,
    "label": "Matte / Samsung Galaxy S21",
    "pence": 2899,
    "vid": 16990
   },
   {
    "id": 5591392203,
    "label": "Matte / Samsung Galaxy S21 FE",
    "pence": 2899,
    "vid": 16984
   },
   {
    "id": 5591392205,
    "label": "Matte / Samsung Galaxy S21 Plus",
    "pence": 2899,
    "vid": 16986
   },
   {
    "id": 5591392206,
    "label": "Matte / Samsung Galaxy S21 Ultra",
    "pence": 2899,
    "vid": 16988
   },
   {
    "id": 5591392211,
    "label": "Matte / Samsung Galaxy S22",
    "pence": 2899,
    "vid": 16996
   },
   {
    "id": 5591392209,
    "label": "Matte / Samsung Galaxy S22 Plus",
    "pence": 2899,
    "vid": 16992
   },
   {
    "id": 5591392210,
    "label": "Matte / Samsung Galaxy S22 Ultra",
    "pence": 2899,
    "vid": 16994
   },
   {
    "id": 5591392215,
    "label": "Matte / Samsung Galaxy S23",
    "pence": 2899,
    "vid": 17002
   },
   {
    "id": 5591392212,
    "label": "Matte / Samsung Galaxy S23 Plus",
    "pence": 2899,
    "vid": 16998
   },
   {
    "id": 5591392214,
    "label": "Matte / Samsung Galaxy S23 Ultra",
    "pence": 2899,
    "vid": 17000
   },
   {
    "id": 5591392218,
    "label": "Matte / Samsung Galaxy S24",
    "pence": 2899,
    "vid": 18746
   },
   {
    "id": 5591392216,
    "label": "Matte / Samsung Galaxy S24 Plus",
    "pence": 2899,
    "vid": 18747
   },
   {
    "id": 5591392217,
    "label": "Matte / Samsung Galaxy S24 Ultra",
    "pence": 2899,
    "vid": 18748
   },
   {
    "id": 5591392221,
    "label": "Matte / Samsung Galaxy S25",
    "pence": 2899,
    "vid": 21470
   },
   {
    "id": 5591392219,
    "label": "Matte / Samsung Galaxy S25 Plus",
    "pence": 2899,
    "vid": 21472
   },
   {
    "id": 5591392220,
    "label": "Matte / Samsung Galaxy S25 Ultra",
    "pence": 2899,
    "vid": 21474
   },
   {
    "id": 5591392225,
    "label": "Matte / Samsung Galaxy S26",
    "pence": 2999,
    "vid": 49332
   },
   {
    "id": 5591392223,
    "label": "Matte / Samsung Galaxy S26 Plus",
    "pence": 2999,
    "vid": 49330
   },
   {
    "id": 5591392224,
    "label": "Matte / Samsung Galaxy S26 Ultra",
    "pence": 2999,
    "vid": 49331
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534364-1.webp",
    "alt": "ESP Samsung Tough Case in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534364-2.webp",
    "alt": "ESP Samsung Tough Case in black with the mountain logo, showing the case's layers"
   }
  ],
  "details": [
   "Dual-layer tough phone case for Samsung Galaxy",
   "Polycarbonate shell with a flexible inner liner, works with wireless charging",
   "Printed mountain logo"
  ]
 },
 {
  "pid": 484535343,
  "name": "Windbreaker",
  "cat": "outerwear",
  "img": "/shop/pf/484466999.webp",
  "variants": [
   {
    "id": 5591397252,
    "label": "S",
    "pence": 3199,
    "vid": 16424,
    "color": "Black"
   },
   {
    "id": 5591397251,
    "label": "M",
    "pence": 3199,
    "vid": 16425,
    "color": "Black"
   },
   {
    "id": 5591397250,
    "label": "L",
    "pence": 3199,
    "vid": 16426,
    "color": "Black"
   },
   {
    "id": 5591397255,
    "label": "XL",
    "pence": 3199,
    "vid": 16427,
    "color": "Black"
   },
   {
    "id": 5591397249,
    "label": "2XL",
    "pence": 3599,
    "vid": 16428,
    "color": "Black"
   },
   {
    "id": 5592887992,
    "vid": 16434,
    "label": "S",
    "pence": 3199,
    "color": "Navy"
   },
   {
    "id": 5592887988,
    "vid": 16435,
    "label": "M",
    "pence": 3199,
    "color": "Navy"
   },
   {
    "id": 5592887984,
    "vid": 16436,
    "label": "L",
    "pence": 3199,
    "color": "Navy"
   },
   {
    "id": 5592887996,
    "vid": 16437,
    "label": "XL",
    "pence": 3199,
    "color": "Navy"
   },
   {
    "id": 5592887982,
    "vid": 16438,
    "label": "2XL",
    "pence": 3599,
    "color": "Navy"
   },
   {
    "id": 5592888937,
    "vid": 16429,
    "label": "S",
    "pence": 3199,
    "color": "Forest Green"
   },
   {
    "id": 5592888022,
    "vid": 16430,
    "label": "M",
    "pence": 3199,
    "color": "Forest Green"
   },
   {
    "id": 5592888002,
    "vid": 16431,
    "label": "L",
    "pence": 3199,
    "color": "Forest Green"
   },
   {
    "id": 5592888939,
    "vid": 16432,
    "label": "XL",
    "pence": 3199,
    "color": "Forest Green"
   },
   {
    "id": 5592887999,
    "vid": 16433,
    "label": "2XL",
    "pence": 3599,
    "color": "Forest Green"
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484535343-1.webp",
    "alt": "ESP Windbreaker in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484535343-2.webp",
    "alt": "ESP Windbreaker in black with the mountain logo, worn, front"
   },
   {
    "src": "/shop/pf/484535343-3.webp",
    "alt": "ESP Windbreaker in black with the mountain logo, worn, back"
   },
   {
    "src": "/shop/pf/484535343-4.webp",
    "alt": "ESP Windbreaker in black with the mountain logo, back"
   }
  ],
  "details": [
   "Water-repellent windbreaker with a hood, regular fit",
   "100% polyamide, 202 g/m²",
   "Embroidered mountain logo on the left chest"
  ],
  "colors": [
   {
    "name": "Black",
    "hex": "#1c1b1b",
    "gallery": []
   },
   {
    "name": "Navy",
    "hex": "#2b2e39",
    "gallery": [
     {
      "src": "/shop/pf/484535343-navy-1.webp",
      "alt": "ESP Windbreaker in navy with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535343-navy-2.webp",
      "alt": "ESP Windbreaker in navy with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535343-navy-3.webp",
      "alt": "ESP Windbreaker in navy with the mountain logo, worn, back"
     }
    ]
   },
   {
    "name": "Forest Green",
    "hex": "#283d2c",
    "gallery": [
     {
      "src": "/shop/pf/484535343-forest-green-1.webp",
      "alt": "ESP Windbreaker in forest green with the mountain logo, front"
     },
     {
      "src": "/shop/pf/484535343-forest-green-2.webp",
      "alt": "ESP Windbreaker in forest green with the mountain logo, worn, front"
     },
     {
      "src": "/shop/pf/484535343-forest-green-3.webp",
      "alt": "ESP Windbreaker in forest green with the mountain logo, worn, back"
     }
    ]
   }
  ]
 },
 {
  "pid": 484534418,
  "name": "Water Bottle",
  "cat": "outerwear",
  "img": "/shop/pf/484470461.webp",
  "variants": [
   {
    "id": 5591392377,
    "label": "One size",
    "pence": 3199,
    "vid": 16030
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534418-1.webp",
    "alt": "ESP Water Bottle in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534418-2.webp",
    "alt": "ESP Water Bottle in black with the mountain logo, in use, front"
   },
   {
    "src": "/shop/pf/484534418-3.webp",
    "alt": "ESP Water Bottle in black with the mountain logo, in use, back"
   },
   {
    "src": "/shop/pf/484534418-4.webp",
    "alt": "ESP Water Bottle in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484534418-5.webp",
    "alt": "ESP Water Bottle in black with the mountain logo, left side"
   }
  ],
  "details": [
   "Insulated water bottle, 500 ml",
   "Stainless steel, vacuum-insulated",
   "Printed mountain logo"
  ]
 },
 {
  "pid": 484534414,
  "name": "Tumbler",
  "cat": "outerwear",
  "img": "/shop/pf/484470617.webp",
  "variants": [
   {
    "id": 5591392339,
    "label": "One size",
    "pence": 3699,
    "vid": 15004
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534414-1.webp",
    "alt": "ESP Tumbler in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534414-2.webp",
    "alt": "ESP Tumbler in black with the mountain logo, in use, front"
   },
   {
    "src": "/shop/pf/484534414-3.webp",
    "alt": "ESP Tumbler in black with the mountain logo, in use, back"
   },
   {
    "src": "/shop/pf/484534414-4.webp",
    "alt": "ESP Tumbler in black with the mountain logo, back"
   },
   {
    "src": "/shop/pf/484534414-5.webp",
    "alt": "ESP Tumbler in black with the mountain logo, left side"
   }
  ],
  "details": [
   "Insulated tumbler, 600 ml, with lid and straw",
   "Stainless steel",
   "Printed mountain logo"
  ]
 },
 {
  "pid": 484534340,
  "name": "Beach Towel",
  "cat": "outerwear",
  "img": "/shop/pf/484471386.webp",
  "variants": [
   {
    "id": 5591392038,
    "label": "30″×60″",
    "pence": 4199,
    "vid": 8874
   },
   {
    "id": 5591392040,
    "label": "36″×72″",
    "pence": 4699,
    "vid": 22610
   }
  ],
  "gallery": [
   {
    "src": "/shop/pf/484534340-1.webp",
    "alt": "ESP Beach Towel in black with the mountain logo, front"
   },
   {
    "src": "/shop/pf/484534340-2.webp",
    "alt": "ESP Beach Towel in black with the mountain logo, in use"
   }
  ],
  "details": [
   "Beach towel",
   "Cotton and polyester blend, soft on one side",
   "Printed mountain logo"
  ]
 }
];
