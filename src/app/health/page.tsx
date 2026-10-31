import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { health, type InlinePart, type LeadItem } from "@/content/health";
import { healthThemeVars } from "@/content/health-theme";

// Indexed by search engines and listed in the sitemap (Matthew, 25 Oct). Not in the footer.
// Colours come from src/content/health-theme.ts and are
// scoped to this page's wrapper only (CSS variables --h-*).
export const metadata: Metadata = {
  title: { absolute: health.title },
  description: health.description,
  alternates: { canonical: "https://www.extremesportspromotions.com/health" },
  openGraph: {
    title: health.title,
    description: health.description,
    type: "website",
    url: "https://www.extremesportspromotions.com/health",
    images: [{ url: "/health/xspeaks-health-banner.webp", alt: "Xspeaks mental health and fitness" }],
  },
};

// Inline links: py adds a ~44px tall tap area without changing line spacing.
const linkClass =
  "rounded py-3 font-semibold text-[var(--h-forest)] underline decoration-2 underline-offset-4 hover:decoration-[var(--h-fern)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--h-forest)]";

function isExternal(href: string) {
  return href.startsWith("http");
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className={linkClass}
      {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function Inline({ parts }: { parts: InlinePart[] }) {
  return (
    <>
      {parts.map((p, i) => {
        if (typeof p === "string") return <span key={i}>{p}</span>;
        const inner = p.bold ? <strong>{p.text}</strong> : p.text;
        if (!p.href) return <span key={i}>{inner}</span>;
        return (
          <A key={i} href={p.href}>
            {inner}
          </A>
        );
      })}
    </>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display mt-10 text-xl font-bold text-[var(--h-forest)] sm:text-2xl">{children}</h3>
  );
}

function TipList({ items }: { items: LeadItem[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((t) => (
        <li key={t.lead} className="flex gap-3 text-base leading-relaxed sm:text-lg">
          <span className="mt-[0.6em] h-2 w-2 flex-none rounded-full bg-[var(--h-fern)]" aria-hidden />
          <span>
            <strong>{t.lead}</strong> {t.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 max-w-2xl text-sm italic leading-relaxed">{children}</p>;
}

function Band({ tone, children, label }: { tone: "mist" | "cream"; children: React.ReactNode; label?: string }) {
  return (
    <section
      aria-labelledby={label}
      className={`border-t border-[var(--h-fern)]/40 ${tone === "mist" ? "bg-[var(--h-mist)]" : "bg-[var(--h-cream)]"}`}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-3xl">{children}</div>
      </div>
    </section>
  );
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-display text-3xl font-bold text-[var(--h-forest)] sm:text-4xl">
      {children}
    </h2>
  );
}

export default function HealthPage() {
  const { mental, fitness, support } = health;
  return (
    <>
      <TopBar />
      <main id="main" className="flex-1 bg-[var(--h-mist)] text-[var(--h-text)]" style={healthThemeVars}>
        {/* Hero: muted looping video (no audio track), poster shown if it can't play. */}
        <div className="bg-[var(--h-mist)] sm:px-6 sm:pt-6">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/health/xspeaks-health-poster.webp"
            aria-label="Red deer grazing in a misty valley at sunrise"
            className="mx-auto aspect-[3/2] w-full max-w-[1024px] object-cover motion-reduce:hidden sm:rounded-2xl"
          >
            <source src="/health/xspeaks-health.mp4" type="video/mp4" />
          </video>
          {/* Reduced motion: poster only */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/health/xspeaks-health-poster.webp"
            alt="Red deer grazing in a misty valley at sunrise"
            width={672}
            height={448}
            className="mx-auto hidden aspect-[3/2] w-full max-w-[1024px] object-cover motion-reduce:block sm:rounded-2xl"
          />
        </div>

        <Band tone="cream" label="health-title">
          <h1 id="health-title" className="font-display text-3xl font-black text-[var(--h-forest)] sm:text-4xl">
            {health.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed sm:text-lg">{health.intro}</p>
          <Note>{health.disclaimer}</Note>
        </Band>

        <Band tone="mist" label="mental-health">
          <SectionHeading id="mental-health">{mental.heading}</SectionHeading>
          <p className="mt-5 text-base leading-relaxed sm:text-lg">
            <strong>{mental.talk.lead}</strong> {mental.talk.text}
          </p>

          <SubHeading>{mental.tipsHeading}</SubHeading>
          <TipList items={mental.tips} />
        </Band>

        <Band tone="cream" label="fitness-health">
          <SectionHeading id="fitness-health">{fitness.heading}</SectionHeading>
          <p className="mt-5 text-base leading-relaxed sm:text-lg">{fitness.intro}</p>
          <Note>{fitness.disclaimer}</Note>

          <SubHeading>{fitness.tipsHeading}</SubHeading>
          <TipList items={fitness.tips} />
        </Band>

        <Band tone="mist" label="support-now">
          <div className="rounded-3xl border-2 border-[var(--h-forest)] bg-[var(--h-cream)] p-5 sm:p-8">
            <h2 id="support-now" className="font-display text-2xl font-bold text-[var(--h-forest)] sm:text-3xl">
              {support.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed sm:text-lg">{support.intro}</p>
            <ul className="mt-6 space-y-3">
              {support.entries.map((e, i) => (
                <li
                  key={e.name || i}
                  className={`flex min-h-14 items-center rounded-2xl border border-[var(--h-fern)]/50 bg-[var(--h-mist)] px-5 py-3 text-base leading-relaxed sm:text-lg ${
                    e.bold ? "font-bold" : ""
                  }`}
                >
                  <span>
                    {e.name ? (
                      <>
                        <strong>{e.url ? <A href={e.url}>{e.name}</A> : e.name}:</strong>{" "}
                      </>
                    ) : null}
                    <Inline parts={e.parts} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Band>
      </main>
      <Footer />
    </>
  );
}
