import Image from "next/image";
import Link from "next/link";
import type { HeroCredit as HeroCreditData } from "@/data/guides-meta";
import HeroCredit from "./HeroCredit";

type HubTile = {
  sport: string;
  title: string;
  href: string;
  stepCount: number;
  image?: { src: string; alt: string; position?: string };
  imageCredit?: HeroCreditData;
};

/** Guides page: one tile per sport hub, in the normal guide card style, with the beginner guide's photo. */
export default function HubTiles({ hubs }: { hubs: HubTile[] }) {
  if (hubs.length === 0) return null;
  return (
    <section aria-labelledby="hubs-heading" className="mb-12">
      <h2 id="hubs-heading" className="font-display mb-4 text-2xl font-bold text-[#1C1917] sm:text-3xl">
        Step-by-step hubs
      </h2>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {hubs.map((h, i) => (
          <li key={h.sport} className="flex flex-col">
            <Link
              href={h.href}
              className="group flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#1C1917]/10 bg-surface shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:border-[#1C1917]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {h.image ? (
                <span className="relative block aspect-[4/3] overflow-hidden bg-ink sm:aspect-[16/10]">
                  <Image
                    src={h.image.src}
                    alt={h.image.alt}
                    fill
                    priority={i < 4}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: h.image.position ?? "50% 50%" }}
                  />
                </span>
              ) : null}
              <span className="flex flex-1 flex-col justify-between p-3 sm:p-5">
                <span className="font-display block text-base font-bold leading-snug text-[#1C1917] sm:text-lg">{h.title}</span>
                <span className="mt-2 block text-xs text-[#1C1917]/60 sm:mt-3 sm:text-sm">
                  {h.stepCount} guides in order<span className="hidden sm:inline"> · </span>
                  <span className="block font-semibold text-accent-soft sm:inline">Open the hub →</span>
                </span>
              </span>
            </Link>
            {h.image && h.imageCredit ? <HeroCredit credit={h.imageCredit} className="mt-1.5 px-1 text-[11px]" /> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
