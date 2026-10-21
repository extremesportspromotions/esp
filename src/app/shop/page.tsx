import type { Metadata } from "next";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shop | Extreme Sports Promotions",
  description: "ESP kit and the gear we'd start with.",
};

const wrap = "mx-auto max-w-[1000px] px-[18px] sm:px-6";
const section = "border-b border-[#1C1917]/10 py-[34px] sm:py-11";
const h2 = "mb-1.5 text-[25px] font-display font-bold tracking-[-0.02em] text-[#1C1917] sm:text-[28px]";
const card = "flex flex-col overflow-hidden rounded-2xl border border-[#1C1917]/10 bg-surface";
const btn = "mt-auto block rounded-full px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.04em]";

const kit = [
  { name: "Tee", price: "£28", note: "Black crewneck tee. Small matte mountain logo on the sleeve.", img: "/shop/tee.jpg", alt: "Black tee, silver mountain mark", pos: "50% 55%" },
  { name: "Polo", price: "", note: "Black polo. Small matte logo on the left chest.", img: "/shop/polo.jpg", alt: "Black polo, small matte mountain mark", pos: "50% 40%" },
  { name: "Cap", price: "£22", note: "Black cap. Clean front mountain logo.", img: "/shop/cap.jpg", alt: "Black cap, silver mountain mark", pos: "50% 45%" },
  { name: "Shirt", price: "", note: "Black button-down shirt. Small matte logo on the left chest.", img: "/shop/shirt.jpg", alt: "Black button-down shirt, small matte mountain mark", pos: "50% 40%" },
];

type Item = { name: string; note: string };

// Text-only cards: no photos yet for these.
const moreApparel: Item[] = [
  { name: "Hoodie", note: "Black pullover hoodie. Small matte mountain logo on the left chest." },
  { name: "Zip hoodie", note: "Black zip-up hoodie. Small matte mountain logo on the left chest." },
  { name: "Beanie", note: "Black knitted beanie. Small mountain logo on the front." },
  { name: "Long-sleeve performance top", note: "Black, light and quick-drying. Small mountain logo on the left chest." },
  { name: "Leggings", note: "Black stretch leggings. Small mountain logo on the hip." },
  { name: "Shorts", note: "Black training shorts. Small mountain logo on the leg." },
  { name: "Joggers", note: "Black joggers. Small mountain logo on the hip." },
  { name: "Tank top", note: "Black training vest. Small mountain logo on the chest." },
];

const bags: Item[] = [
  { name: "Backpack", note: "About 15 L and water-resistant. Small mountain logo." },
  { name: "Utility backpack", note: "Simple everyday pack for sessions and travel. Small mountain logo." },
  { name: "Duffle / gym bag", note: "Room for a change of kit and a towel. Small mountain logo." },
  { name: "Belt bag", note: "Keeps keys, phone and cards close. Small mountain logo." },
];

const outerwear: Item[] = [
  { name: "Packable anorak", note: "Light over-the-head shell that folds into its own pocket. Small mountain logo." },
  { name: "Windbreaker", note: "Light layer for breezy days. Small mountain logo on the left chest." },
  { name: "Quarter-zip", note: "Black quarter-zip top. Small mountain logo on the left chest." },
  { name: "Socks", note: "Black socks with a small mountain logo." },
  { name: "Stickers", note: "Mountain logo stickers." },
  { name: "Water bottle", note: "Reusable bottle with the mountain logo." },
  { name: "Phone case", note: "Black case with the mountain logo." },
];

const gearSections: { id: string; title: string; intro: string; items: Item[]; coachNote?: boolean }[] = [
  {
    id: "climbing",
    title: "Climbing and mountaineering",
    intro: "Core kit for rock climbing, mountaineering and coasteering.",
    coachNote: true,
    items: [
      { name: "Climbing harness", note: "An all-round harness with adjustable legs and gear loops, such as the Black Diamond Momentum. Suits indoor walls, sport routes and multi-pitch." },
      { name: "Climbing helmet", note: "UIAA/CE certified, with vents and headtorch clips. It should not rock when you nod." },
      { name: "Dynamic rope", note: "A single rope of about 9.5 to 10.2 mm, 60 to 70 m long, UIAA certified. Check the length you need for your local crags." },
      { name: "Belay device and locking karabiners", note: "A tube or assisted-braking device with HMS locking karabiners. Practise lowering with a coach before you use it." },
      { name: "Quickdraws", note: "For leading sport routes. Your coach will show you how to clip them safely." },
      { name: "Climbing shoes", note: "A comfortable, flat-lasted pair is best to start with. Try them on before you buy." },
      { name: "Chalk bag", note: "Keeps your hands dry for a better grip. One with a belt is easiest." },
    ],
  },
  {
    id: "snow",
    title: "Snow",
    intro: "For skiing and snowboarding progression. Buy the clothing first and hire boards, skis and boots to begin with.",
    items: [
      { name: "Waterproof ski or snowboard jacket", note: "Look for a 10K+ waterproof rating, a hood that fits over a helmet, adjustable cuffs and a lift pass pocket." },
      { name: "Goggles", note: "Dual lens, anti-fog and UV400. Mirrored lenses for sun, rose or gold for flat light. Check they fit with your helmet." },
      { name: "Ski or snowboard helmet", note: "MIPS if you can. It should fit with your goggles without a gap. Essential for beginners." },
      { name: "Thermal base layers", note: "Merino or synthetic top and leggings to wear under your jacket and trousers." },
      { name: "Ski or snowboard boots", note: "Hire to begin with. When you buy, get them fitted in a shop." },
    ],
  },
  {
    id: "cameras",
    title: "Action cameras",
    intro: "For filming club sessions, jumps and mountain days.",
    items: [
      { name: "GoPro HERO series", note: "Strong stabilisation, tough build and plenty of mounts. Good for climbing, snow and skydiving footage." },
      { name: "DJI Osmo Action series", note: "Good in low light, with two screens, magnetic mounts and long battery life." },
      { name: "Insta360 X series", note: "Films all the way round, so you can choose the framing afterwards. Handy when you can't aim the camera mid-run." },
    ],
  },
  {
    id: "outdoor",
    title: "General outdoor",
    intro: "Everyday kit for hill days, approaches and getting to sessions.",
    items: [
      { name: "Hiking boots", note: "Waterproof with good ankle support. Wear them in before a long day." },
      { name: "Waterproof jacket", note: "A breathable shell with a proper hood for UK weather." },
      { name: "Dry bags", note: "Roll-top bags to keep spare clothes, food and electronics dry." },
      { name: "Gloves", note: "A warm, grippy pair for cold mornings and long belays." },
      { name: "Headtorch", note: "Around 200 to 400 lumens, with a red light mode and a waterproof rating of IPX4 or better. For early starts, late finishes and emergencies." },
    ],
  },
  {
    id: "water-air",
    title: "Water and air days",
    intro: "For kayaking, coasteering, paragliding and hang gliding days.",
    items: [
      { name: "Buoyancy aid", note: "Choose one made for your sport and check the fit with your coach." },
      { name: "Waterproofs", note: "Waterproof jacket and trousers for wet launches, boat trips and waiting around." },
    ],
  },
  {
    id: "training",
    title: "Training basics",
    intro: "Layers for coached sessions in changeable weather.",
    items: [
      { name: "Wicking tops", note: "Move sweat away from your skin. Skip cotton, it stays wet." },
      { name: "Fleeces", note: "A light, warm mid layer for breaks and cooler days." },
      { name: "Spare layers", note: "Pack an extra warm layer for when you stop moving." },
    ],
  },
  {
    id: "safety",
    title: "Safety",
    intro: "Useful across every sport we cover.",
    items: [
      { name: "First aid kit", note: "Blister care, dressings, tape, pain relief and any personal medication." },
      { name: "Other essentials", note: "A whistle, map and compass (or offline maps and a power bank) and an emergency shelter for the hills." },
    ],
  },
];

const disabledBtn = `${btn} cursor-not-allowed border border-[#1C1917]/25 bg-[#1C1917]/5 text-[#1C1917]/60`;
const pill = "rounded-full border border-[#1C1917]/25 bg-[#1C1917]/5 px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#1C1917] transition hover:border-accent hover:text-accent-soft";
const textGrid = "grid gap-3 sm:gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]";

const jumpLinks = [
  { href: "#apparel", label: "Apparel" },
  { href: "#bags", label: "Bags" },
  { href: "#outerwear", label: "Outerwear" },
  { href: "#sport-kit", label: "Sport kit" },
  { href: "#drops", label: "Drops" },
  { href: "#gear", label: "Gear" },
];

function TextCard({ item, as: Tag = "h3" }: { item: Item; as?: "h3" | "h4" }) {
  return (
    <div className={card}>
      <div className="flex flex-1 flex-col gap-1.5 p-4 sm:px-5 sm:pt-[18px] sm:pb-5">
        <Tag className="text-base font-semibold text-[#1C1917] sm:text-lg">{item.name}</Tag>
        <p className="mb-3 text-sm leading-normal text-[#1C1917]/65 sm:text-[15px]">{item.note}</p>
        <button type="button" disabled aria-disabled="true" className={disabledBtn}>
          Coming soon
        </button>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      <TopBar active="shop" />
      <main id="main" className="flex-1 bg-[#EEF4FA] text-[#1C1917]">
        <header className="border-b border-[#1C1917]/10 pt-8 pb-7 text-center sm:pt-11 sm:pb-9">
          <div className={wrap}>
            {/* logo.png has a 64px pale strip baked into its top edge; crop it off here (1328x944 -> 1328x880 window). */}
            <div className="relative mx-auto mb-[22px] aspect-[1328/880] w-[80%] max-w-[320px] overflow-hidden">
              <Image src="/logo.png" alt="Extreme Sports Promotions" fill priority sizes="320px" className="object-cover object-bottom" />
            </div>
            <h1 className="text-[38px] font-display font-extrabold leading-[1.1] tracking-[-0.02em] text-[#1C1917] sm:text-[44px]">Shop</h1>
            <p className="mt-2.5 text-[17px] text-[#1C1917] sm:text-lg">Subtle kit for coaches, students and athletes.</p>
            <nav aria-label="On this page" className="mx-auto mt-5 flex max-w-[560px] flex-wrap justify-center gap-2.5">
              {jumpLinks.map((l) => (
                <a key={l.href} href={l.href} className={pill}>{l.label}</a>
              ))}
            </nav>
          </div>
        </header>

        <section id="apparel" className={`${section} scroll-mt-24`}>
          <div className={wrap}>
            <h2 className={h2}>ESP Apparel</h2>
            <p className="mb-[22px] text-[#1C1917]">Black, with a small matte silver mountain mark.</p>
            <div className="grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
              {kit.map((k) => (
                <div key={k.name} className={card}>
                  <div className="relative aspect-square overflow-hidden bg-[#111117] sm:aspect-[4/5]">
                    <Image src={k.img} alt={k.alt} fill sizes="(max-width: 640px) 100vw, 320px" className="object-cover" style={{ objectPosition: k.pos }} unoptimized={k.img.endsWith(".svg")} />
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5 px-5 pt-[18px] pb-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-lg font-semibold text-[#1C1917]">{k.name}</h3>
                      {k.price && <span className="text-lg font-bold text-[#1C1917]">{k.price}</span>}
                    </div>
                    <p className="mb-2.5 text-[15px] leading-normal text-[#1C1917]/65">{k.note}</p>
                    {/* No checkout or Printful yet: disabled until Matthew approves */}
                    <button type="button" disabled aria-disabled="true" className={disabledBtn}>
                      Coming soon
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className={`mt-[18px] ${textGrid}`}>
              {moreApparel.map((i) => <TextCard key={i.name} item={i} />)}
            </div>
          </div>
        </section>

        <section id="bags" className={`${section} scroll-mt-24`}>
          <div className={wrap}>
            <h2 className={h2}>Bags and Day Packs</h2>
            <p className="mb-[22px] text-[#1C1917]">For sessions, travel to your coach and days outdoors.</p>
            <div className={textGrid}>{bags.map((i) => <TextCard key={i.name} item={i} />)}</div>
          </div>
        </section>

        <section id="outerwear" className={`${section} scroll-mt-24`}>
          <div className={wrap}>
            <h2 className={h2}>Outerwear and Accessories</h2>
            <p className="mb-[22px] text-[#1C1917]">Layers and small extras with the mountain logo.</p>
            <div className={textGrid}>{outerwear.map((i) => <TextCard key={i.name} item={i} />)}</div>
          </div>
        </section>

        <section id="sport-kit" className={`${section} scroll-mt-24`}>
          <div className={wrap}>
            <h2 className={h2}>Sport-Specific Kit</h2>
            <p className="text-[#1C1917]">Designs for climbing, skydiving, snowboarding and hang gliding are coming soon.</p>
          </div>
        </section>

        <section id="drops" className={`${section} scroll-mt-24`}>
          <div className={wrap}>
            <h2 className={h2}>Community Drops</h2>
            <p className="text-[#1C1917]">Limited kit tied to our YouTube series is coming soon.</p>
          </div>
        </section>

        <section id="gear" className={`${section} scroll-mt-24`}>
          <div className={wrap}>
            <h2 className={h2}>Recommended Gear</h2>
            <p className="mb-[22px] text-[#1C1917]">Kit we&apos;d start with across the sports.</p>
            <p className="mb-8 rounded-r-[10px] border-l-[3px] border-accent bg-surface px-[18px] py-3.5 font-semibold text-[#1C1917]">
              Always buy UIAA/CE certified kit, and train with a qualified coach before using it.
            </p>
            {gearSections.map((sec) => (
              <div key={sec.id} id={sec.id} className="mb-10 scroll-mt-24 last:mb-0">
                <h3 className="mb-1.5 text-xl font-bold text-[#1C1917] sm:text-[22px]">{sec.title}</h3>
                <p className="mb-4 text-[#1C1917]">{sec.intro}</p>
                <div className={textGrid}>
                  {sec.items.map((g) => <TextCard key={g.name} item={g} as="h4" />)}
                </div>
                {sec.coachNote && (
                  <p className="mt-4 rounded-r-[10px] border-l-[3px] border-accent bg-surface px-[18px] py-3.5 font-semibold text-[#1C1917]">
                    Ropes, harnesses and belay kit: ask your coach before you buy.
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
