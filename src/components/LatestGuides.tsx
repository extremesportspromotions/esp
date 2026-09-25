import Link from "next/link";
import GuideCard from "@/components/guides/GuideCard";
import { getAllGuides } from "@/lib/guides";

/** Small homepage strip showing the three newest guides. Renders nothing if there are none. */
export default function LatestGuides() {
  const guides = getAllGuides().slice(0, 3);
  if (guides.length === 0) return null;
  return (
    <section aria-labelledby="latest-guides-heading" className="bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">ESP Guides</p>
            <h2 id="latest-guides-heading" className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">
              Learn before you leap
            </h2>
          </div>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:border-accent hover:text-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:self-auto"
          >
            All guides →
          </Link>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <li key={g.slug}>
              <GuideCard guide={g} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
