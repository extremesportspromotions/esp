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
  { name: "Tee", price: "£28", note: "Black crewneck tee. Small matte mountain logo on the left chest.", img: "/shop/tee.jpg", alt: "Black tee, silver mountain mark", pos: "50% 55%" },
  { name: "Polo", price: "", note: "Black polo. Small matte logo on the left chest.", img: "/shop/polo.jpg", alt: "Black polo, small matte mountain mark", pos: "50% 40%" },
  { name: "Cap", price: "£22", note: "Black cap. Clean front mountain logo.", img: "/shop/cap.jpg", alt: "Black cap, silver mountain mark", pos: "50% 45%" },
  { name: "Shirt", price: "", note: "Black button-down shirt. Small matte logo on the left chest.", img: "/shop/shirt.jpg", alt: "Black button-down shirt, small matte mountain mark", pos: "50% 40%" },
];

type Item = { name: string; note: string };
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
    id: "safety",
    title: "Safety",
    intro: "Useful across every sport we cover.",
    items: [
      { name: "Headtorch", note: "Around 200 to 400 lumens, with a red light mode and a waterproof rating of IPX4 or better. For early starts, late finishes and emergencies." },
      { name: "Dry bag and first aid kit", note: "A roll-top dry bag, plus blister care, dressings, tape, pain relief and any personal medication." },
      { name: "Other essentials", note: "A whistle, map and compass (or offline maps and a power bank), spare layers and an emergency shelter for the hills." },
    ],
  },
];

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
            <nav aria-label="On this page" className="mt-5 flex justify-center gap-3">
              <a href="#apparel" className="rounded-full border border-[#1C1917]/25 bg-[#1C1917]/5 px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#1C1917] transition hover:border-accent hover:text-accent-soft">Apparel</a>
              <a href="#gear" className="rounded-full border border-[#1C1917]/25 bg-[#1C1917]/5 px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#1C1917] transition hover:border-accent hover:text-accent-soft">Gear</a>
            </nav>
          </div>
        </header>

        <section id="apparel" className={`${section} scroll-mt-24`}>
          <div className={wrap}>
            <h2 className={h2}>Apparel</h2>
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
                    <button type="button" disabled aria-disabled="true" className={`${btn} cursor-not-allowed border border-[#1C1917]/25 bg-[#1C1917]/5 text-[#1C1917]/60`}>
                      Coming soon
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="gear" className={`${section} scroll-mt-24`}>
          <div className={wrap}>
            <h2 className={h2}>Gear</h2>
            <p className="mb-[22px] text-[#1C1917]">Kit we&apos;d start with across the sports.</p>
            <p className="mb-8 rounded-r-[10px] border-l-[3px] border-accent bg-surface px-[18px] py-3.5 font-semibold text-[#1C1917]">
              Always buy UIAA/CE certified kit, and train with a qualified coach before using it.
            </p>
            {gearSections.map((sec) => (
              <div key={sec.id} id={sec.id} className="mb-10 scroll-mt-24 last:mb-0">
                <h3 className="mb-1.5 text-xl font-bold text-[#1C1917] sm:text-[22px]">{sec.title}</h3>
                <p className="mb-4 text-[#1C1917]">{sec.intro}</p>
                <div className="grid gap-3 sm:gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
                  {sec.items.map((g) => (
                    <div key={g.name} className={card}>
                      <div className="flex flex-1 flex-col gap-1.5 p-4 sm:px-5 sm:pt-[18px] sm:pb-5">
                        <h4 className="text-base font-semibold text-[#1C1917] sm:text-lg">{g.name}</h4>
                        <p className="mb-3 text-sm leading-normal text-[#1C1917]/65 sm:text-[15px]">{g.note}</p>
                        <button type="button" disabled aria-disabled="true" className={`${btn} cursor-not-allowed border border-[#1C1917]/25 bg-[#1C1917]/5 text-[#1C1917]/60`}>
                          Coming soon
                        </button>
                      </div>
                    </div>
                  ))}
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
