import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import GuideTags from "@/components/guides/GuideTags";
import GuideCard from "@/components/guides/GuideCard";
import GuideNextSteps from "@/components/guides/GuideNextSteps";
import ShareLinks from "@/components/guides/ShareLinks";
import TableOfContents from "@/components/guides/TableOfContents";
import { getAllGuides, getGuideBySlug, getRelatedGuides } from "@/lib/guides";
import { GENERAL_SPORT, formatGuideDate } from "@/data/guides-meta";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return {};
  const url = `/guides/${guide.slug}`;
  return {
    title: `${guide.title} | ESP Guides`,
    description: guide.description,
    authors: [{ name: guide.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: guide.title,
      description: guide.description,
      siteName: SITE_NAME,
      locale: "en_GB",
      publishedTime: guide.date,
      modifiedTime: guide.updated ?? guide.date,
      authors: [guide.author],
      section: guide.category,
      tags: [guide.sportName, guide.category],
      images: [{ url: guide.heroImage, alt: guide.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: [guide.heroImage],
    },
    robots: guide.draft ? { index: false, follow: false } : undefined,
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) notFound();

  const related = getRelatedGuides(guide.slug, 3);
  const url = absoluteUrl(`/guides/${guide.slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    image: [absoluteUrl(guide.heroImage)],
    datePublished: guide.date,
    dateModified: guide.updated ?? guide.date,
    wordCount: guide.wordCount,
    articleSection: guide.category,
    keywords: [guide.sportName, guide.category].join(", "),
    inLanguage: "en-GB",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: guide.author, url: absoluteUrl("/guides") },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Guides", item: absoluteUrl("/guides") },
      { "@type": "ListItem", position: 3, name: guide.title, item: url },
    ],
  };

  return (
    <>
      <TopBar active="guides" />
      <main id="main" className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([jsonLd, breadcrumbLd]).replace(/</g, "\\u003c"),
          }}
        />
        <article>
          <header className="relative flex min-h-[62vh] items-end overflow-hidden bg-ink sm:min-h-[68vh] lg:min-h-[74vh]">
            <Image
              src={guide.heroImage}
              alt={guide.heroAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: guide.heroPosition ?? "50% 50%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" aria-hidden />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/60 to-transparent" aria-hidden />
            <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-24 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
              <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/75">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/guides" className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                      Guides
                    </Link>
                  </li>
                  {guide.sport !== GENERAL_SPORT ? (
                    <>
                      <li aria-hidden>/</li>
                      <li>
                        <Link
                          href={`/guides/sport/${guide.sport}`}
                          className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                          {guide.sportName}
                        </Link>
                      </li>
                    </>
                  ) : null}
                </ol>
              </nav>
              <GuideTags sport={guide.sport} sportName={guide.sportName} category={guide.category} linked />
              <h1 className="font-display mt-4 max-w-4xl text-4xl font-black leading-[1.05] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl">
                {guide.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/85 sm:text-xl">{guide.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/75">
                <span>
                  By <span className="font-semibold text-white">{guide.author}</span>
                </span>
                <span aria-hidden>·</span>
                <time dateTime={guide.date}>{formatGuideDate(guide.date)}</time>
                {guide.updated && guide.updated !== guide.date ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>
                      Updated <time dateTime={guide.updated}>{formatGuideDate(guide.updated)}</time>
                    </span>
                  </>
                ) : null}
                <span aria-hidden>·</span>
                <span>{guide.readingMinutes} min read</span>
                {guide.draft ? (
                  <span className="rounded bg-yellow-400 px-1.5 py-0.5 text-xs font-bold uppercase text-ink">Draft</span>
                ) : null}
              </div>
            </div>
          </header>

          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_17rem] lg:px-8">
            <div className="min-w-0">
              <TableOfContents items={guide.toc} variant="inline" />
              <div
                className="guide-prose prose prose-invert sm:prose-lg"
                dangerouslySetInnerHTML={{ __html: guide.html }}
              />
              <div className="mt-12 max-w-[70ch] border-t border-white/10 pt-8">
                <ShareLinks url={url} title={guide.title} />
              </div>
            </div>
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <TableOfContents items={guide.toc} variant="sidebar" />
                <a
                  href={guide.sport !== GENERAL_SPORT ? `/?sport=${guide.sport}#enquire` : "/#enquire"}
                  className="flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-accent/30 transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Get matched — £30
                </a>
              </div>
            </aside>
          </div>
        </article>

        <div className="mx-auto max-w-7xl space-y-16 px-4 pb-20 sm:px-6 lg:px-8">
          <GuideNextSteps sport={guide.sport} sportName={guide.sportName} />

          {related.length > 0 ? (
            <section aria-labelledby="related-heading">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <h2 id="related-heading" className="font-display text-2xl font-bold text-white sm:text-3xl">
                  Related guides
                </h2>
                <Link
                  href="/guides"
                  className="text-sm font-semibold text-accent-soft underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  All guides →
                </Link>
              </div>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((g) => (
                  <li key={g.slug}>
                    <GuideCard guide={g} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
