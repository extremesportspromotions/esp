"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MountainMark from "./MountainMark";
import { categories, products, type Category, type Product } from "./products";
import { catalogue as merch } from "./catalogue";
import { MADE_DELIVERY_PENCE, MADE_LEAD } from "./smartCasual";
import { BagProvider, BagButton } from "./Bag";
import { MerchCard, NotYetContext } from "./MerchCard";

type Filter = Category | "all";

const gearIcons: Record<string, string> = {
  Climbing: "M8 3h8a4 4 0 0 1 0 8H9v6a4 4 0 0 1-8 0 M8 3a4 4 0 0 0 0 8",
  Snow: "M12 2v20 M3.3 7l17.4 10 M3.3 17l17.4-10 M9 3.5 12 6l3-2.5 M9 20.5 12 18l3 2.5",
  Cameras: "M3 7h4l2-3h6l2 3h4v12H3z M12 10a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7",
  Outdoor: "M2 20 9 8l4 6 3-4 6 10z",
  "Water and air": "M2 9c3-3 5 3 8 0s5 3 8 0 4-1 4-1 M2 15c3-3 5 3 8 0s5 3 8 0 4-1 4-1",
  Training: "M8 3 3 6l2 5 2-1v11h10V10l2 1 2-5-5-3a4 4 0 0 1-8 0",
  Safety: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z M12 8v8 M8 12h8",
};

function Tile({ p }: { p: Product }) {
  if (p.img) {
    return (
      <Image src={p.img} alt={p.alt ?? p.name} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" style={{ objectPosition: p.pos }} />
    );
  }
  if (p.cat === "gear" && p.sub && gearIcons[p.sub]) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#EDE4D3]">
        <svg viewBox="0 0 24 24" className="h-12 w-12 text-[#1C1917]/55" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d={gearIcons[p.sub]} />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#0E2141]">
      <MountainMark sizes="(max-width: 1024px) 110px, 180px" />
    </div>
  );
}

function Card({ p }: { p: Product }) {
  return (
    <li className="group flex flex-col overflow-hidden rounded-xl border border-[#1C1917]/10 bg-white">
      <div className="relative aspect-square overflow-hidden">
        <Tile p={p} />
        <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#1C1917] shadow-sm">
          Coming soon
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-sm font-semibold leading-snug text-[#1C1917] sm:text-[15px]">{p.name}</h3>
          {p.price && <span className="shrink-0 text-sm font-bold text-[#1C1917] sm:text-[15px]">{p.price}</span>}
        </div>
        <p className="text-xs leading-snug text-[#1C1917] sm:text-[13px]">{p.note}</p>
      </div>
    </li>
  );
}

const grid = "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4";

function GearBanner() {
  return (
    <p className="mb-4 rounded-lg border-l-[3px] border-accent bg-white px-4 py-2.5 text-sm font-semibold text-[#1C1917]">
      Always buy UIAA/CE certified kit and train with a qualified coach before using it. Ropes, harnesses and belay kit: ask your coach before you buy.
    </p>
  );
}

type NotYet = { key: string; name: string; colour: string }[];

/** Preview-only list of smart casual colours that can't be ordered yet (no saved supplier design). */
function NotYetBanner({ list }: { list: NotYet }) {
  const by = new Map<string, string[]>();
  for (const x of list) by.set(x.name, [...(by.get(x.name) ?? []), x.colour]);
  return (
    <div data-notyet-banner role="note" className="mb-4 rounded-lg border-2 border-dashed border-amber-600 bg-amber-50 px-4 py-3 text-sm text-[#1C1917]">
      <p className="font-bold">Preview only: {list.length} smart casual colours are not available to order yet</p>
      <p className="mt-0.5 text-[13px]">They have no saved supplier design, so they can&apos;t be added to the bag and checkout refuses them. This box never shows on the live site.</p>
      <ul className="mt-2 grid gap-x-6 gap-y-0.5 text-[13px] sm:grid-cols-2">
        {[...by].map(([n, cs]) => <li key={n}><b>{n}:</b> {cs.join(", ")}</li>)}
      </ul>
    </div>
  );
}

export default function ShopBrowser({ notYet = [], preview = false }: { notYet?: NotYet; preview?: boolean }) {
  const [cat, setCat] = useState<Filter>("all");
  const [sub, setSub] = useState<string | null>(null);

  // Tabs and category tiles are plain #hash links, so they jump to the section without JS.
  // With JS, the hash selects the tab and filters the grid.
  useEffect(() => {
    const read = () => {
      const h = window.location.hash.slice(1);
      if (h === "all" || categories.some((c) => c.id === h)) {
        setCat(h as Filter);
        setSub(null);
      }
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  useEffect(() => {
    const bar = document.querySelector<HTMLElement>('[aria-label="Shop categories"]');
    const on = bar?.querySelector<HTMLElement>('[aria-current="true"]');
    if (bar && on) bar.scrollLeft = on.offsetLeft - (bar.clientWidth - on.clientWidth) / 2;
    // Re-align after the grid has been filtered, as the browser's hash jump ran before.
    if (cat !== "all") document.getElementById(cat)?.scrollIntoView({ block: "start" });
  }, [cat]);

  const shown = cat === "all" ? categories : categories.filter((c) => c.id === cat);
  const active = categories.find((c) => c.id === cat);
  const tab = (on: boolean) =>
    `shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${on ? "bg-[#0E2141] text-white" : "text-[#1C1917] hover:bg-[#0E2141]/10"}`;
  const chip = (on: boolean) =>
    `shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[13px] font-medium transition ${on ? "border-[#0E2141] bg-[#0E2141] text-white" : "border-[#1C1917]/25 bg-white text-[#1C1917] hover:border-[#1C1917]"}`;

  return (
    <NotYetContext.Provider value={new Set(notYet.map((x) => x.key))}>
    <BagProvider>
    <div id="products">
      <div className="sticky top-[101px] z-40 border-b border-[#1C1917]/10 bg-[#F6EFE3]/95 backdrop-blur-md lg:top-[61px]">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <nav aria-label="Shop categories" className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <a href="#all" className={tab(cat === "all")} aria-current={cat === "all" ? "true" : undefined}>All</a>
            {categories.map((c) => (
              <a key={c.id} href={`#${c.id}`} className={tab(cat === c.id)} aria-current={cat === c.id ? "true" : undefined}>
                {c.short}
              </a>
            ))}
          </nav>
          {active && active.subs.length > 0 && (
            <div className="flex gap-1.5 overflow-x-auto pb-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button type="button" className={chip(sub === null)} onClick={() => setSub(null)}>All {active.short.toLowerCase()}</button>
              {active.subs.map((s) => (
                <button key={s} type="button" className={chip(sub === s)} aria-pressed={sub === s} onClick={() => setSub(s)}>{s}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6 sm:px-6 lg:pb-20">
        {shown.map((c) => {
          const items = products.filter((p) => p.cat === c.id && (!sub || cat === "all" || p.sub === sub));
          const kit = merch.filter((p) => p.cat === c.id && (!sub || cat === "all" || p.sub === sub));
          return (
            <section key={c.id} id={c.id} aria-labelledby={`h-${c.id}`} className="mb-4 scroll-mt-[220px] pb-[calc(5rem+env(safe-area-inset-bottom))] lg:mb-10 lg:scroll-mt-[170px] lg:pb-0 lg:last:mb-0">
              <div className="mb-3 flex items-baseline justify-between">
                <h2 id={`h-${c.id}`} className="font-display text-xl font-bold text-[#1C1917] sm:text-2xl">{c.label}</h2>
                <span className="text-sm text-[#1C1917]">{items.length + kit.length} items</span>
              </div>
              {c.id === "smartcasual" && (
                <p data-made-note className="-mt-1 mb-4 rounded-lg border-l-[3px] border-[#1C1917] bg-white px-4 py-2.5 text-sm text-[#1C1917]">
                  {MADE_LEAD} UK delivery £{(MADE_DELIVERY_PENCE / 100).toFixed(2)} per order. With other kit, these come as a separate parcel.
                </p>
              )}
              {c.id === "smartcasual" && preview && notYet.length > 0 && <NotYetBanner list={notYet} />}
              {c.id === "gear" && <GearBanner />}
              {c.id === "gear" && <p data-affiliate-note className="-mt-1 mb-4 text-[13px] leading-snug text-[#1C1917]/70">Some links on this page are affiliate links. If you buy through them, ESP may earn a small commission at no extra cost to you. We only link to gear we&apos;d recommend.</p>}
              <ul className={grid}>
                {kit.map((p) => <MerchCard key={p.pid} p={p} />)}
                {items.map((p) => <Card key={`${p.cat}-${p.name}`} p={p} />)}
              </ul>
            </section>
          );
        })}
      </div>
      <BagButton />
    </div>
    </BagProvider>
    </NotYetContext.Provider>
  );
}
