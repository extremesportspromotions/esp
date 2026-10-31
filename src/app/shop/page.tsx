import type { Metadata } from "next";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ShopBrowser from "@/components/shop/ShopBrowser";
import MountainMark from "@/components/shop/MountainMark";
import { notYetOrderable } from "@/lib/madeDesigns";

export const metadata: Metadata = {
  title: "Devonshire | Extreme Sports Promotions",
  description: "Devonshire outdoor clothing, and the gear we'd start with.",
};

const tiles = [
  { href: "#apparel", label: "Apparel" },
  { href: "#smartcasual", label: "Smart casual" },
  { href: "#bags", label: "Bags" },
  { href: "#outerwear", label: "Outerwear & more" },
  { href: "#gear", label: "Gear" },
];

export default function ShopPage() {
  return (
    <>
      <TopBar active="shop" />
      <main id="main" className="flex-1 bg-[#F6EFE3] text-[#1C1917]">
        <header className="relative isolate flex min-h-[64svh] items-center justify-center overflow-hidden text-center sm:min-h-[70vh]">
          <Image src="/sports/mountaineering.jpg" alt="" fill priority sizes="100vw" className="-z-10 object-cover" style={{ objectPosition: "55% 60%" }} />
          <div className="absolute inset-0 -z-10 bg-[#F6EFE3]/55" aria-hidden />
          <div className="px-5 py-16">
            <Image src="/brand/stag-cream.jpg" alt="" width={300} height={393} priority className="mx-auto h-24 w-auto mix-blend-multiply sm:h-32" />
            <h1 className="font-serif mt-3 text-[4.2rem] font-medium leading-none text-[#0E2141] sm:text-8xl lg:text-9xl">Devonshire</h1>
            <p className="mt-4 flex items-center justify-center gap-3 text-xs tracking-[0.3em] text-[#0E2141] sm:text-sm">
              <span className="h-px w-8 bg-[#0E2141]/60 sm:w-16" aria-hidden />
              OUTDOOR CLOTHING
              <span className="h-px w-8 bg-[#0E2141]/60 sm:w-16" aria-hidden />
            </p>
            <p className="font-serif mx-auto mt-4 max-w-md text-lg text-[#1C1917]/85 sm:text-xl">Subtle kit for coaches, students and athletes.</p>
          </div>
        </header>

        <section aria-label="Shop by category" className="mx-auto max-w-7xl px-3 pt-10 pb-6 sm:px-6">
          <h2 className="font-serif mb-4 text-center text-3xl text-[#0E2141] sm:text-4xl">Shop by category</h2>
          <div className="grid grid-cols-5 gap-2 sm:gap-4">
            {tiles.map((t) => (
              <a key={t.href} href={t.href} className="group relative block aspect-square overflow-hidden rounded-xl bg-[#0E2141] sm:aspect-[4/3]">
                <span className="absolute inset-0 flex items-center justify-center pb-[18%]"><MountainMark sizes="(max-width: 640px) 60px, 180px" /></span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 pt-6 pb-2 font-serif text-[13px] leading-tight sm:text-lg text-white sm:text-sm">
                  {t.label}
                </span>
              </a>
            ))}
          </div>
        </section>

        <p className="mx-auto mb-1 max-w-7xl px-3 sm:px-6">
          <span className="block rounded-lg border border-[#1C1917]/15 bg-white px-4 py-2.5 text-sm text-[#1C1917]">
            <b>Coming soon:</b> sport-specific designs for climbing, skydiving, snowboarding and hang gliding, and limited community drops tied to our YouTube series.
          </span>
        </p>

        <ShopBrowser notYet={notYetOrderable()} preview={process.env.VERCEL_ENV !== "production"} />
      </main>
      <Footer />
    </>
  );
}
