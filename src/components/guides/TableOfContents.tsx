import type { TocItem } from "@/lib/guides";

function List({ items }: { items: TocItem[] }) {
  return (
    <ol className="space-y-1 text-sm">
      {items.map((item) => (
        <li key={item.id} className={item.depth === 3 ? "pl-4" : ""}>
          <a
            href={`#${item.id}`}
            className={`block rounded-md border-l-2 border-transparent py-1 pl-3 leading-snug transition hover:border-accent hover:text-[#1C1917] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              item.depth === 3 ? "text-[#1C1917]/55" : "text-[#1C1917]/75"
            }`}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Desktop: sticky sidebar. Mobile: collapsible box above the article. */
export default function TableOfContents({ items, variant }: { items: TocItem[]; variant: "sidebar" | "inline" }) {
  if (items.length < 2) return null;
  if (variant === "inline") {
    return (
      <details className="group mb-8 rounded-2xl border border-[#1C1917]/10 bg-surface/70 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold text-[#1C1917] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
          In this guide
          <svg className="transition group-open:rotate-180" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>
        <nav aria-label="Table of contents" className="px-3 pb-4">
          <List items={items} />
        </nav>
      </details>
    );
  }
  return (
    <nav aria-labelledby="toc-heading" className="rounded-2xl border border-[#1C1917]/10 bg-surface/60 p-5">
      <p id="toc-heading" className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#1C1917]/55">
        In this guide
      </p>
      <List items={items} />
    </nav>
  );
}
