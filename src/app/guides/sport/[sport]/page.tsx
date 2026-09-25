import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import GuidesHeader from "@/components/guides/GuidesHeader";
import GuideCard from "@/components/guides/GuideCard";
import GuidesComingSoon from "@/components/guides/GuidesComingSoon";
import GuideNextSteps from "@/components/guides/GuideNextSteps";
import { getGuidesBySport } from "@/lib/guides";
import { sports } from "@/data/sports";
import { getSport } from "@/data/guides-meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return sports.map((s) => ({ sport: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/guides/sport/[sport]">): Promise<Metadata> {
  const { sport: id } = await params;
  const sport = getSport(id);
  if (!sport) return {};
  const title = `${sport.name} guides`;
  const description = `How-tos, safety advice and getting-started guides for ${sport.name.toLowerCase()} in the UK. ${sport.description}`;
  return {
    title: `${title} | ESP Guides`,
    description,
    alternates: { canonical: `/guides/sport/${sport.id}` },
    openGraph: {
      title,
      description,
      url: `/guides/sport/${sport.id}`,
      type: "website",
      images: [{ url: sport.image, alt: sport.alt }],
    },
  };
}

export default async function SportGuidesPage({ params }: PageProps<"/guides/sport/[sport]">) {
  const { sport: id } = await params;
  const sport = getSport(id);
  if (!sport) notFound();
  const guides = getGuidesBySport(sport.id);

  return (
    <>
      <TopBar active="guides" />
      <main id="main" className="flex-1">
        <GuidesHeader
          eyebrow="ESP Guides"
          title={sport.name}
          tagline={`Everything you need to start ${sport.name.toLowerCase()} the right way.`}
          intro={sport.description}
          image={{ src: sport.image, alt: sport.alt, position: sport.imagePosition }}
        >
          <nav aria-label="Breadcrumb" className="mt-6 text-sm text-white/70">
            <Link href="/guides" className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              ← All guides
            </Link>
          </nav>
        </GuidesHeader>
        <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {guides.length > 0 ? (
            <section aria-labelledby="sport-guides-heading">
              <div className="mb-6 flex items-baseline justify-between gap-3">
                <h2 id="sport-guides-heading" className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {sport.name} guides
                </h2>
                <p className="text-sm text-white/60">
                  {guides.length} {guides.length === 1 ? "guide" : "guides"}
                </p>
              </div>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <GuideCard guide={g} />
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <GuidesComingSoon sport={sport.id} sportName={sport.name} />
          )}
          {guides.length > 0 ? <GuideNextSteps sport={sport.id} sportName={sport.name} /> : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
