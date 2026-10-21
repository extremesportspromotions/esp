import type { Metadata } from "next";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ShopBrowser from "@/components/shop/ShopBrowser";
import MountainMark from "@/components/shop/MountainMark";

export const metadata: Metadata = {
  title: "Shop | Extreme Sports Promotions",
  description: "ESP kit and the gear we'd start with.",
};

const tiles = [
  { href: "#apparel", label: "Apparel" },
  { href: "#bags", label: "Bags" },
  { href: "#outerwear", label: "Outerwear & more" },
  { href: "#gear", label: "Gear" },
];

export default function ShopPage() {
  return (
    <>
      <TopBar active="shop" />
      <main id="main" className="flex-1 bg-[#EEF4FA] text-[#1C1917]">
        <header className="mx-auto flex max-w-7xl items-center gap-4 px-3 pt-5 pb-4 sm:px-6">
          <div className="relative aspect-[1328/880] w-20 shrink-0 overflow-hidden sm:w-24">
            {/* logo.png has a 64px pale strip at the top; crop it off */}
            <Image src="/logo.png" alt="Extreme Sports Promotions" fill priority sizes="96px" className="object-cover object-bottom" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold leading-tight text-[#1C1917] sm:text-3xl">Shop</h1>
            <p className="text-sm text-[#1C1917] sm:text-base">Subtle kit for coaches, students and athletes.</p>
          </div>
        </header>

        <section aria-label="Shop by category" className="mx-auto max-w-7xl px-3 pb-5 sm:px-6">
          <h2 className="mb-2.5 text-sm font-bold uppercase tracking-wide text-[#1C1917]">Shop by category</h2>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {tiles.map((t) => (
              <a key={t.href} href={t.href} className="group relative block aspect-square overflow-hidden rounded-xl bg-[#1C1917] sm:aspect-[4/3]">
                <span className="absolute inset-0 flex items-center justify-center pb-[18%]"><MountainMark sizes="(max-width: 640px) 60px, 180px" /></span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 pt-6 pb-2 text-[11px] font-bold leading-tight text-white sm:text-sm">
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

        <ShopBrowser />
      </main>
      <Footer />
    </>
  );
}
