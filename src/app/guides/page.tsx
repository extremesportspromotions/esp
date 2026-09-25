import type { Metadata } from "next";
import { Suspense } from "react";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import GuidesHeader from "@/components/guides/GuidesHeader";
import GuidesBrowser, { GuidesBrowserView } from "@/components/guides/GuidesBrowser";
import { getAllGuides, getFeaturedGuide } from "@/lib/guides";
import { sports } from "@/data/sports";

const title = "ESP Guides — learn extreme sports the right way";
const description =
  "Practical how-tos, safety advice and first-timer guides for 15 extreme sports in the UK, from skydiving and paragliding to scuba diving and surfing.";

export const metadata: Metadata = {
  title: `${title} | Extreme Sports Promotions`,
  description,
  alternates: {
    canonical: "/guides",
    types: { "application/rss+xml": [{ url: "/guides/rss.xml", title: "ESP Guides" }] },
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/guides",
    images: [{ url: "/sports/paragliding.jpg", alt: "Paraglider over a mountain valley" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/sports/paragliding.jpg"] },
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();
  const featured = getFeaturedGuide();
  return (
    <>
      <TopBar active="guides" />
      <main id="main" className="flex-1">
        <GuidesHeader
          eyebrow="Information centre"
          title="ESP Guides"
          tagline="Learn extreme sports the right way — properly taught, safely progressed, right here in the UK."
          intro={`Straight-talking guides to getting started, staying safe and choosing the right instruction across all ${sports.length} of our sports. No hype, no shortcuts — just what you need to know before your first session.`}
        />
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Suspense
            fallback={
              <GuidesBrowserView guides={guides} featuredSlug={featured?.slug} sport="all" category="all" />
            }
          >
            <GuidesBrowser guides={guides} featuredSlug={featured?.slug} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
