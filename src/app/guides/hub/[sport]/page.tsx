import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import GuidesHeader from "@/components/guides/GuidesHeader";
import { getHub, getHubSports } from "@/lib/hubs";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getHubSports().map((sport) => ({ sport }));
}

export async function generateMetadata({ params }: PageProps<"/guides/hub/[sport]">): Promise<Metadata> {
  const { sport } = await params;
  const hub = await getHub(sport);
  if (!hub) return {};
  return {
    title: `${hub.title} | ESP Guides`,
    description: hub.intro,
    alternates: { canonical: hub.href },
    openGraph: {
      title: hub.title,
      description: hub.intro,
      url: hub.href,
      type: "website",
      images: [{ url: hub.firstGuide.heroImage, alt: hub.firstGuide.heroAlt }],
    },
  };
}

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const linkCls = `font-semibold text-accent-soft underline-offset-4 hover:text-[#1C1917] hover:underline ${focus}`;
const card = "rounded-2xl border border-[#1C1917]/10 bg-surface shadow-xl shadow-black/10";

export default async function SportHubPage({ params }: PageProps<"/guides/hub/[sport]">) {
  const { sport } = await params;
  const hub = await getHub(sport);
  if (!hub) notFound();

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: hub.title,
    itemListElement: hub.sections
      .flatMap((s) => s.steps)
      .map((step) => ({
        "@type": "ListItem",
        position: step.number,
        name: step.guide.title,
        url: absoluteUrl(`/guides/${step.guide.slug}`),
      })),
  };

  return (
    <>
      <TopBar active="guides" />
      <main id="main" className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd).replace(/</g, "\\u003c") }}
        />
        <GuidesHeader
          eyebrow={`Step by step · ${hub.stepCount} guides`}
          title={hub.title}
          tagline=""
          intro={hub.intro}
          image={{ src: hub.firstGuide.heroImage, alt: "", position: hub.firstGuide.heroPosition }}
          compact
        >
          <nav aria-label="Breadcrumb" className="mt-6 text-sm text-[#1C1917]/70">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/guides" className={`hover:text-[#1C1917] ${focus}`}>
                  Guides
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={`/guides/sport/${hub.sport}`} className={`hover:text-[#1C1917] ${focus}`}>
                  {hub.sportName}
                </Link>
              </li>
            </ol>
          </nav>
        </GuidesHeader>

        <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <section aria-labelledby="quick-links-heading">
            <h2 id="quick-links-heading" className="font-display mb-5 text-2xl font-bold text-[#1C1917] sm:text-3xl">
              Quick links
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hub.quickLinks.map((group) => (
                <div key={group.id} className={`${card} p-5 sm:p-6`}>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#1C1917]/60">{group.heading}</h3>
                  {group.priceRows && group.priceRows.length > 0 ? (
                    <div className="mb-4">
                      <p className="mb-2 text-sm font-semibold text-[#1C1917]">{hub.priceTitle}</p>
                      <dl className="space-y-2.5">
                        {group.priceRows.map((row) => (
                          <div key={row.label}>
                            <dt className="text-sm font-semibold text-[#1C1917]">{row.label}</dt>
                            <dd className="text-sm text-[#1C1917]/75">{row.text.replace(/^Typical UK price:\s*/, "")}</dd>
                          </div>
                        ))}
                      </dl>
                      <p className="mt-2.5 text-xs text-[#1C1917]/60">{hub.priceNote}</p>
                    </div>
                  ) : null}
                  <ul className="space-y-2.5 text-sm">
                    {group.links.map((l) => (
                      <li key={l.href}>
                        {l.external ? (
                          <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                            {l.label} ↗
                          </a>
                        ) : (
                          <Link href={l.href} className={linkCls}>
                            {l.label} →
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {hub.sections.map((section, i) => {
            const id = `hub-section-${i + 1}`;
            return (
              <section key={id} aria-labelledby={id}>
                <h2 id={id} className="font-display mb-2 text-2xl font-bold text-[#1C1917] sm:text-3xl">
                  {section.title ?? "Every step, in order"}
                </h2>
                {section.intro ? <p className="mb-2 text-[#1C1917]/75">{section.intro}</p> : null}
                <ol className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {section.steps.map((step) => (
                    <li key={step.guide.slug} className="flex">
                      <Link
                        href={`/guides/${step.guide.slug}`}
                        className={`group flex w-full flex-col ${card} p-5 transition hover:-translate-y-0.5 hover:border-[#1C1917]/25 sm:p-6 ${focus}`}
                      >
                        <span className="flex items-start gap-4">
                          <span
                            className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-black text-white"
                            aria-hidden
                          >
                            {step.number}
                          </span>
                          <span className="min-w-0">
                            <span className="sr-only">Step {step.number}: </span>
                            <span className="font-display block text-lg font-bold leading-snug text-[#1C1917]">{step.guide.title}</span>
                            <span className="mt-1.5 block text-sm leading-relaxed text-[#1C1917]/70">{step.summary}</span>
                          </span>
                        </span>
                        <span className="mt-4 pl-14 text-sm font-semibold text-accent-soft group-hover:underline">
                          Read the guide →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}

          <p className="max-w-[70ch] border-t border-[#1C1917]/10 pt-8 text-[#1C1917]/80">
            Ready to start? The{" "}
            <Link href={`/?sport=${hub.sport}#find-a-club`} className={linkCls}>
              club map
            </Link>{" "}
            lists some of the UK clubs for this sport, or use the{" "}
            <Link href={`/?sport=${hub.sport}#enquire`} className={linkCls}>
              enquiry form
            </Link>{" "}
            to have a coach found for you.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
