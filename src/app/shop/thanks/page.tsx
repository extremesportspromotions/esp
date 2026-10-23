import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ClearBag from "@/components/shop/ClearBag";

export const metadata: Metadata = { title: "Thank you | Extreme Sports Promotions", robots: { index: false } };

export default function ShopThanks() {
  return (
    <>
      <TopBar active="shop" />
      <ClearBag />
      <main id="main" className="flex-1 bg-[#EEF4FA] text-[#1C1917]">
        <div className="mx-auto max-w-xl px-4 py-16">
          <h1 className="font-display text-3xl font-extrabold">Thank you for your order</h1>
          <p className="mt-3">Your payment went through. Stripe will email your receipt. Your kit is made to order and we&apos;ll post it to the address you gave.</p>
          <p className="mt-3">Questions? Email <a className="underline" href="mailto:enquiries@extremesportspromotions.com">enquiries@extremesportspromotions.com</a>.</p>
          <p className="mt-6"><Link href="/shop" className="font-semibold underline">Back to the shop</Link></p>
        </div>
      </main>
      <Footer />
    </>
  );
}
