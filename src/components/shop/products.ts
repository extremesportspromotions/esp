export type Category = "apparel" | "bags" | "outerwear" | "gear";

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
  { id: "apparel", label: "Apparel", short: "Apparel", subs: ["Tops", "Hoodies", "Headwear", "Bottoms"] },
  { id: "bags", label: "Bags and day packs", short: "Bags", subs: [] },
  { id: "outerwear", label: "Outerwear and accessories", short: "Outerwear & more", subs: [] },
  { id: "gear", label: "Recommended gear", short: "Gear", subs: ["Climbing", "Snow", "Cameras", "Outdoor", "Water and air", "Training", "Safety"] },
];

const a = (name: string, sub: string, note: string, extra: Partial<Product> = {}): Product => ({ name, note, cat: "apparel", sub, ...extra });
const g = (sub: string, name: string, note: string): Product => ({ name, note, cat: "gear", sub });

export const products: Product[] = [
  a("Tee", "Tops", "Black crewneck tee. Small matte mountain logo on the sleeve.", { price: "£28", img: "/shop/tee.jpg", alt: "Black tee, silver mountain mark", pos: "50% 55%" }),
  a("Polo", "Tops", "Black polo. Small matte logo on the left chest.", { img: "/shop/polo.jpg", alt: "Black polo, small matte mountain mark", pos: "50% 40%" }),
  a("Cap", "Headwear", "Black cap. Clean front mountain logo.", { price: "£22", img: "/shop/cap.jpg", alt: "Black cap, silver mountain mark", pos: "50% 45%" }),
  a("Shirt", "Tops", "Black button-down shirt. Small matte logo on the left chest.", { img: "/shop/shirt.jpg", alt: "Black button-down shirt, small matte mountain mark", pos: "50% 40%" }),
  a("Hoodie", "Hoodies", "Black pullover hoodie. Small matte mountain logo on the left chest."),
  a("Zip hoodie", "Hoodies", "Black zip-up hoodie. Small matte mountain logo on the left chest."),
  a("Beanie", "Headwear", "Black knitted beanie. Small mountain logo on the front."),
  a("Long-sleeve performance top", "Tops", "Black, light and quick-drying. Small mountain logo on the left chest."),
  a("Leggings", "Bottoms", "Black stretch leggings. Small mountain logo on the hip."),
  a("Shorts", "Bottoms", "Black training shorts. Small mountain logo on the leg."),
  a("Joggers", "Bottoms", "Black joggers. Small mountain logo on the hip."),
  a("Tank top", "Tops", "Black training vest. Small mountain logo on the chest."),

  { cat: "bags", name: "Backpack", note: "About 15 L and water-resistant. Small mountain logo." },
  { cat: "bags", name: "Utility backpack", note: "Simple everyday pack for sessions and travel. Small mountain logo." },
  { cat: "bags", name: "Duffle / gym bag", note: "Room for a change of kit and a towel. Small mountain logo." },
  { cat: "bags", name: "Belt bag", note: "Keeps keys, phone and cards close. Small mountain logo." },

  { cat: "outerwear", name: "Packable anorak", note: "Light over-the-head shell that folds into its own pocket. Small mountain logo." },
  { cat: "outerwear", name: "Windbreaker", note: "Light layer for breezy days. Small mountain logo on the left chest." },
  { cat: "outerwear", name: "Quarter-zip", note: "Black quarter-zip top. Small mountain logo on the left chest." },
  { cat: "outerwear", name: "Socks", note: "Black socks with a small mountain logo." },
  { cat: "outerwear", name: "Stickers", note: "Mountain logo stickers." },
  { cat: "outerwear", name: "Water bottle", note: "Reusable bottle with the mountain logo." },
  { cat: "outerwear", name: "Phone case", note: "Black case with the mountain logo." },

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
