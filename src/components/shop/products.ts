export type Category = "apparel" | "smartcasual" | "bags" | "outerwear" | "gear";

export type Product = {
  name: string;
  note: string;
  cat: Category;
  sub?: string;
  price?: string;
  img?: string;
  alt?: string;
  pos?: string;
};

export const categories: { id: Category; label: string; short: string; subs: string[] }[] = [
  { id: "apparel", label: "Apparel", short: "Apparel", subs: ["Tops", "Hoodies", "Headwear", "Kids"] },
  { id: "smartcasual", label: "Smart casual", short: "Smart casual", subs: [] },
  { id: "bags", label: "Bags and day packs", short: "Bags", subs: [] },
  { id: "outerwear", label: "Outerwear and accessories", short: "Outerwear & more", subs: [] },
  { id: "gear", label: "Recommended gear", short: "Gear", subs: ["Climbing", "Snow", "Cameras", "Outdoor", "Water and air", "Training", "Safety"] },
];

const g = (sub: string, name: string, note: string): Product => ({ name, note, cat: "gear", sub });

/** Recommended gear (affiliate). ESP kit lives in merch.ts. */
export const products: Product[] = [
  g("Climbing", "Climbing harness", "An all-round harness with adjustable legs and gear loops, such as the Black Diamond Momentum."),
  g("Climbing", "Climbing helmet", "UIAA/CE certified, with vents and headtorch clips. It should not rock when you nod."),
  g("Climbing", "Dynamic rope", "A single rope of about 9.5 to 10.2 mm, 60 to 70 m long, UIAA certified."),
  g("Climbing", "Belay device and locking karabiners", "A tube or assisted-braking device with HMS locking karabiners. Practise lowering with a coach first."),
  g("Climbing", "Quickdraws", "For leading sport routes. Your coach will show you how to clip them safely."),
  g("Climbing", "Climbing shoes", "A comfortable, flat-lasted pair is best to start with. Try them on before you buy."),
  g("Climbing", "Chalk bag", "Keeps your hands dry for a better grip. One with a belt is easiest."),
  g("Snow", "Waterproof ski or snowboard jacket", "10K+ waterproof rating, a hood that fits over a helmet and a lift pass pocket."),
  g("Snow", "Goggles", "Dual lens, anti-fog and UV400. Check they fit with your helmet."),
  g("Snow", "Ski or snowboard helmet", "MIPS if you can. It should fit with your goggles without a gap."),
  g("Snow", "Thermal base layers", "Merino or synthetic top and leggings to wear under your jacket and trousers."),
  g("Snow", "Ski or snowboard boots", "Hire to begin with. When you buy, get them fitted in a shop."),
  g("Cameras", "GoPro HERO series", "Strong stabilisation, tough build and plenty of mounts."),
  g("Cameras", "DJI Osmo Action series", "Good in low light, with two screens, magnetic mounts and long battery life."),
  g("Cameras", "Insta360 X series", "Films all the way round, so you can choose the framing afterwards."),
  g("Outdoor", "Hiking boots", "Waterproof with good ankle support. Wear them in before a long day."),
  g("Outdoor", "Waterproof jacket", "A breathable shell with a proper hood for UK weather."),
  g("Outdoor", "Dry bags", "Roll-top bags to keep spare clothes, food and electronics dry."),
  g("Outdoor", "Gloves", "A warm, grippy pair for cold mornings and long belays."),
  g("Outdoor", "Headtorch", "200 to 400 lumens, red light mode, IPX4 or better. For early starts and emergencies."),
  g("Water and air", "Buoyancy aid", "Choose one made for your sport and check the fit with your coach."),
  g("Water and air", "Waterproofs", "Jacket and trousers for wet launches, boat trips and waiting around."),
  g("Training", "Wicking tops", "Move sweat away from your skin. Skip cotton, it stays wet."),
  g("Training", "Fleeces", "A light, warm mid layer for breaks and cooler days."),
  g("Training", "Spare layers", "Pack an extra warm layer for when you stop moving."),
  g("Safety", "First aid kit", "Blister care, dressings, tape, pain relief and any personal medication."),
  g("Safety", "Other essentials", "Whistle, map and compass (or offline maps and a power bank) and an emergency shelter."),
];
