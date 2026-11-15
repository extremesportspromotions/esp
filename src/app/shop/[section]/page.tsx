import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ShopBrowser from "@/components/shop/ShopBrowser";
import { PAGE_TITLE, parseSectionParam, SECTION_STATIC_PARAMS } from "@/components/shop/shopRoutes";

export const dynamicParams = false;

export function generateStaticParams() {
  return SECTION_STATIC_PARAMS;
}

export async function generateMetadata({ params }: PageProps<"/shop/[section]">): Promise<Metadata> {
  const { section } = await params;
  const parsed = parseSectionParam(section);
  if (!parsed) return {};
  const title = PAGE_TITLE[parsed.tab];
  return {
    title: `${title} | Devonshire | Extreme Sports Promotions`,
    description: "Devonshire outdoor clothing, and the equipment we'd start with.",
  };
}

export default async function ShopSectionPage({ params }: PageProps<"/shop/[section]">) {
  const { section } = await params;
  const parsed = parseSectionParam(section);
  if (!parsed) notFound();
  return (
    <>
      <TopBar active="shop" />
      <main id="main" className="flex-1 bg-[#F6EFE3] text-[#1C1917]">
        <ShopBrowser section={parsed.tab} initialSub={parsed.sub} initialAnchor={parsed.anchor} />
      </main>
      <Footer />
    </>
  );
}
