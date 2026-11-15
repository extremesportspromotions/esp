import type { Metadata } from "next";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ShopBrowser from "@/components/shop/ShopBrowser";

export const metadata: Metadata = {
  title: "Devonshire | Extreme Sports Promotions",
  description: "Devonshire outdoor clothing, and the equipment we'd start with.",
};

export default function ShopPage() {
  return (
    <>
      <TopBar active="shop" />
      <main id="main" className="flex-1 bg-[#F6EFE3] text-[#1C1917]">
        <header className="relative isolate flex min-h-[70svh] items-end justify-center overflow-hidden text-center sm:min-h-[76vh] lg:min-h-[82vh]">
          <Image
            src="/shop/r1/hero.webp"
            alt="A man and a woman wearing Devonshire clothing in the British countryside"
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover"
            style={{ objectPosition: "center center" }}
          />
          {/* Soft gradient only behind the wordmark, so the photograph stays clear. */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[38%] bg-gradient-to-t from-[#F6EFE3]/90 via-[#F6EFE3]/45 to-transparent sm:h-[34%]"
            aria-hidden
          />
          <div className="px-5 pb-10 pt-16 sm:pb-14 lg:pb-16">
            <Image
              src="/brand/stag.png"
              alt=""
              width={98}
              height={128}
              priority
              sizes="98px"
              className="mx-auto h-20 w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)] sm:h-28"
            />
            <h1 className="font-serif mt-3 text-[3.8rem] font-medium leading-none text-[#0E2141] sm:text-8xl lg:text-9xl">Devonshire</h1>
            <p className="mt-4 flex items-center justify-center gap-3 text-[11px] tracking-[0.35em] text-[#C9A96A] sm:text-sm">
              <span className="h-px w-8 bg-[#C9A96A]/80 sm:w-16" aria-hidden />
              OUTDOOR CLOTHING
              <span className="h-px w-8 bg-[#C9A96A]/80 sm:w-16" aria-hidden />
            </p>
          </div>
        </header>

        <ShopBrowser />
      </main>
      <Footer />
    </>
  );
}
