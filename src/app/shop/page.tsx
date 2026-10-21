import type { Metadata } from "next";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shop | Extreme Sports Promotions",
  description: "ESP kit and the gear we'd start with.",
};

const wrap = "mx-auto max-w-[1000px] px-[18px] sm:px-6";
const section = "border-b border-[#2a2a3a] py-[34px] sm:py-11";
const h2 = "mb-1.5 text-[25px] font-bold tracking-[-0.02em] text-white sm:text-[28px]";
const card = "flex flex-col overflow-hidden rounded-[14px] border border-[#2a2a3a] bg-[#14141c]";
const btn = "mt-auto block rounded-full px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.04em]";

const kit = [
  { name: "Tee", price: "£28", note: "Black crew neck. Mark on the sleeve.", img: "/shop/tee.jpg", alt: "Black tee, silver mountain mark", pos: "50% 55%" },
  { name: "Hoodie", price: "£48", note: "Black pullover. Mark on the left chest.", img: "/shop/hoodie.svg", alt: "Black hoodie, silver mountain mark", pos: "50% 50%" },
  { name: "Cap", price: "£22", note: "Black six-panel. Mark on the front.", img: "/shop/cap.jpg", alt: "Black cap, silver mountain mark", pos: "50% 45%" },
];

const gear = [
  { name: "Helmet", icon: "helmet", note: "Buy one made for your sport. A ski helmet is not a climbing helmet." },
  { name: "Wetsuit", icon: "wetsuit", note: "3/2 mm for summer. 5/4 mm for UK water in winter." },
  { name: "Gloves", icon: "gloves", note: "Full-finger pair for grip and cold UK mornings." },
  { name: "Base layer", icon: "base-layer", note: "Merino or synthetic. Skip cotton, it stays wet." },
  { name: "Rucksack", icon: "rucksack", note: "20 to 30 litres covers most day sessions." },
  { name: "Headtorch", icon: "headtorch", note: "For early starts and late finishes. Pack spare batteries." },
];

export default function ShopPage() {
  return (
    <>
      <TopBar active="shop" />
      <main id="main" className="flex-1 bg-[#0a0a0f] text-white">
        <header className="border-b border-[#2a2a3a] pt-8 pb-7 text-center sm:pt-11 sm:pb-9">
          <div className={wrap}>
            <Image src="/promotions/esp-logo-silver.png" alt="ESP Extreme Sports Promotions logo" width={682} height={542} priority sizes="240px" className="mx-auto mb-[22px] block h-auto w-[70%] max-w-[240px]" />
            <h1 className="text-[38px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white sm:text-[44px]">Shop</h1>
            <p className="mt-2.5 text-[17px] text-white sm:text-lg">ESP kit and the gear we&apos;d start with.</p>
          </div>
        </header>

        <section className={section}>
          <div className={wrap}>
            <h2 className={h2}>ESP kit</h2>
            <p className="mb-[22px] text-white">Black, with a small matte silver mountain mark.</p>
            <div className="grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
              {kit.map((k) => (
                <div key={k.name} className={card}>
                  <div className="relative aspect-square overflow-hidden bg-[#111117] sm:aspect-[4/5]">
                    <Image src={k.img} alt={k.alt} fill sizes="(max-width: 640px) 100vw, 320px" className="object-cover" style={{ objectPosition: k.pos }} unoptimized={k.img.endsWith(".svg")} />
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5 px-5 pt-[18px] pb-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-lg font-semibold text-white">{k.name}</h3>
                      <span className="text-lg font-bold text-white">{k.price}</span>
                    </div>
                    <p className="mb-2.5 text-[15px] leading-normal text-white">{k.note}</p>
                    {/* No checkout or Printful yet: disabled until Matthew approves */}
                    <button type="button" disabled aria-disabled="true" className={`${btn} cursor-not-allowed border border-[#c0c0c0] text-white`}>
                      Coming soon
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={section}>
          <div className={wrap}>
            <h2 className={h2}>Starter gear</h2>
            <p className="mb-[22px] text-white">Kit we&apos;d start with across the sports.</p>
            <div className="grid grid-cols-2 gap-3 sm:gap-[18px] sm:[grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
              {gear.map((g) => (
                <div key={g.name} className={card}>
                  <div className="flex flex-1 flex-col gap-1.5 p-3.5 sm:px-5 sm:pt-[18px] sm:pb-5">
                    <div className="mb-1.5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#1f1f2a]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/shop/${g.icon}.svg`} alt="" width={26} height={26} />
                    </div>
                    <h3 className="text-base font-semibold text-white sm:text-lg">{g.name}</h3>
                    <p className="mb-3 text-sm leading-normal text-white sm:text-[15px]">{g.note}</p>
                    {/* Affiliate links not set up yet: disabled until Matthew approves */}
                    <button type="button" disabled aria-disabled="true" className={`${btn} cursor-not-allowed border border-[#c0c0c0] text-white`}>
                      Coming soon
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-r-[10px] border-l-[3px] border-[#c0c0c0] bg-[#14141c] px-[18px] py-3.5 font-semibold text-white">
              Ropes, harnesses and belay kit: ask your coach before you buy.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
