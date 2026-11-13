export type TabId = "mens" | "womens" | "equipment";

export type Product = {
  name: string;
  note: string;
  sub?: string;
  price?: string;
  img?: string;
  alt?: string;
  pos?: string;
};

export const tabs: { id: TabId; label: string; short: string; subs: string[] }[] = [
  { id: "mens", label: "Men's", short: "Men's", subs: ["Tops", "Hoodies", "Smart casual", "Kids"] },
  { id: "womens", label: "Women's", short: "Women's", subs: ["Tops", "Hoodies", "Kids"] },
  { id: "equipment", label: "Equipment", short: "Equipment", subs: ["Headwear", "Bags", "Climbing", "Snow", "Cameras", "Outdoor", "Water and air", "Training", "Safety"] },
];

/** Old hashes and ?tab= values that should land on a current tab. */
export const tabAliases: Record<string, TabId> = {
  mens: "mens",
  men: "mens",
  womens: "womens",
  women: "womens",
  equipment: "equipment",
  gear: "equipment",
  bags: "equipment",
  accessories: "equipment",
  outerwear: "equipment",
  headwear: "equipment",
  apparel: "mens",
  smartcasual: "mens",
  all: "mens",
  denim: "mens",
};

export function isBrandedAccessory(p: { cat: string; sub?: string; name: string }): boolean {
  if (p.cat === "bags") return true;
  if (p.sub === "Headwear") return true;
  if (p.cat === "outerwear" && p.name !== "Windbreaker") return true;
  return false;
}

export function isWomensItem(p: { name: string }): boolean {
  return /women'?s/i.test(p.name);
}

/** Men's clothing, unisex clothing, kids, and men's smart casual. Not branded accessories or women's-only pieces. */
export function showOnMens(p: { cat: string; sub?: string; name: string }): boolean {
  if (isBrandedAccessory(p)) return false;
  if (isWomensItem(p)) return false;
  return true;
}

/** Women's pieces, unisex clothing and kids. Men's-cut smart casual stays on the Men's tab. */
export function showOnWomens(p: { cat: string; sub?: string; name: string }): boolean {
  if (isBrandedAccessory(p)) return false;
  if (isWomensItem(p)) return true;
  if (p.cat === "smartcasual") return false;
  if (p.sub === "Kids") return true;
  return p.cat === "apparel" || p.name === "Windbreaker";
}

/** Chip label for a sold item, or undefined if it only appears under All. */
export function merchChip(p: { cat: string; sub?: string; name: string }): string | undefined {
  if (p.sub === "Denim") return "Denim";
  if (p.cat === "smartcasual") return "Smart casual";
  if (p.cat === "bags") return "Bags";
  if (p.cat === "outerwear" && p.name !== "Windbreaker") return "Other";
  if (p.name === "Windbreaker") return undefined;
  return p.sub;
}

const rec = (sub: string, name: string, note: string): Product => ({ name, note, sub });

/** Recommended equipment (affiliate). Devonshire kit lives in merch.ts. */
export const products: Product[] = [
  rec("Climbing", "Climbing harness", "An all-round harness with adjustable legs and gear loops, such as the Black Diamond Momentum."),
  rec("Climbing", "Climbing helmet", "UIAA/CE certified, with vents and headtorch clips. It should not rock when you nod."),
  rec("Climbing", "Dynamic rope", "A single rope of about 9.5 to 10.2 mm, 60 to 70 m long, UIAA certified."),
  rec("Climbing", "Belay device and locking karabiners", "A tube or assisted-braking device with HMS locking karabiners. Practise lowering with a coach first."),
  rec("Climbing", "Quickdraws", "For leading sport routes. Your coach will show you how to clip them safely."),
  rec("Climbing", "Climbing shoes", "A comfortable, flat-lasted pair is best to start with. Try them on before you buy."),
  rec("Climbing", "Chalk bag", "Keeps your hands dry for a better grip. One with a belt is easiest."),
  rec("Snow", "Waterproof ski or snowboard jacket", "10K+ waterproof rating, a hood that fits over a helmet and a lift pass pocket."),
  rec("Snow", "Goggles", "Dual lens, anti-fog and UV400. Check they fit with your helmet."),
  rec("Snow", "Ski or snowboard helmet", "MIPS if you can. It should fit with your goggles without a gap."),
  rec("Snow", "Thermal base layers", "Merino or synthetic top and leggings to wear under your jacket and trousers."),
  rec("Snow", "Ski or snowboard boots", "Hire to begin with. When you buy, get them fitted in a shop."),
  rec("Cameras", "GoPro HERO series", "Strong stabilisation, tough build and plenty of mounts."),
  rec("Cameras", "DJI Osmo Action series", "Good in low light, with two screens, magnetic mounts and long battery life."),
  rec("Cameras", "Insta360 X series", "Films all the way round, so you can choose the framing afterwards."),
  rec("Outdoor", "Hiking boots", "Waterproof with good ankle support. Wear them in before a long day."),
  rec("Outdoor", "Waterproof jacket", "A breathable shell with a proper hood for UK weather."),
  rec("Outdoor", "Dry bags", "Roll-top bags to keep spare clothes, food and electronics dry."),
  rec("Outdoor", "Gloves", "A warm, grippy pair for cold mornings and long belays."),
  rec("Outdoor", "Headtorch", "200 to 400 lumens, red light mode, IPX4 or better. For early starts and emergencies."),
  rec("Water and air", "Buoyancy aid", "Choose one made for your sport and check the fit with your coach."),
  rec("Water and air", "Waterproofs", "Jacket and trousers for wet launches, boat trips and waiting around."),
  rec("Training", "Wicking tops", "Move sweat away from your skin. Skip cotton, it stays wet."),
  rec("Training", "Fleeces", "A light, warm mid layer for breaks and cooler days."),
  rec("Training", "Spare layers", "Pack an extra warm layer for when you stop moving."),
  rec("Safety", "First aid kit", "Blister care, dressings, tape, pain relief and any personal medication."),
  rec("Safety", "Other essentials", "Whistle, map and compass (or offline maps and a power bank) and an emergency shelter."),
];
