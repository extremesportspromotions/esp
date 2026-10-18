import Link from "next/link";

type HubTile = { sport: string; title: string; href: string; stepCount: number };

/** Guides page: one tile per sport hub, in the normal guide card style. */
export default function HubTiles({ hubs }: { hubs: HubTile[] }) {
  if (hubs.length === 0) return null;
  return (
    <section aria-labelledby="hubs-heading" className="mb-12">
      <h2 id="hubs-heading" className="font-display mb-4 text-2xl font-bold text-[#1C1917] sm:text-3xl">
        Step-by-step hubs
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hubs.map((h) => (
          <li key={h.sport}>
            <Link
              href={h.href}
              className="flex h-full flex-col justify-between rounded-2xl border border-[#1C1917]/10 bg-surface p-5 shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:border-[#1C1917]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span className="font-display block text-lg font-bold leading-snug text-[#1C1917]">{h.title}</span>
              <span className="mt-3 block text-sm text-[#1C1917]/60">
                {h.stepCount} guides in order · <span className="font-semibold text-accent-soft">Open the hub →</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
