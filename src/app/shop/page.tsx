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
        <header className="relative isolate flex min-h-[70svh] items-start justify-center overflow-hidden text-center sm:min-h-[76vh] lg:min-h-[82vh]">
          <Image
            src="/shop/r1/hero-phone.webp"
            alt="A man and a woman wearing Devonshire clothing in the British countryside"
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover object-top 2xl:hidden"
          />
          <Image
            src="/shop/r1/hero.webp"
            alt="A man and a woman wearing Devonshire clothing in the British countryside"
            fill
            priority
            sizes="100vw"
            className="-z-10 hidden object-cover object-top 2xl:block"
          />
          {/* Soft gradient only behind the wordmark at the top, so faces and clothing stay clear. */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[10.5rem] bg-gradient-to-b from-[#F6EFE3]/80 via-[#F6EFE3]/40 to-transparent sm:h-[12rem] 2xl:h-[10rem]"
            aria-hidden
          />
          <div className="px-5 pb-8 pt-5 sm:pt-6 2xl:pt-4">
            <Image
              src="/brand/stag.png"
              alt=""
              width={98}
              height={128}
              priority
              sizes="73px"
              className="mx-auto h-[62px] w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)] sm:h-[73px] 2xl:h-[62px]"
            />
            <h1 className="font-serif mt-1.5 text-5xl font-medium leading-none text-[#0E2141] sm:text-6xl 2xl:text-5xl">
              Devonshire
            </h1>
            <p className="mt-1 flex items-center justify-center gap-3 text-base leading-none tracking-[0.22em] text-[#0E2141] sm:text-lg sm:tracking-[0.25em] 2xl:text-base 2xl:tracking-[0.22em]">
              <span className="h-px w-8 bg-[#0E2141] sm:w-16" aria-hidden />
              OUTDOOR CLOTHING
              <span className="h-px w-8 bg-[#0E2141] sm:w-16" aria-hidden />
            </p>
          </div>
        </header>

        <ShopBrowser />
      </main>
      <Footer />
    </>
  );
}
