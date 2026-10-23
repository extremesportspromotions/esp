"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MountainMark from "./MountainMark";
import { categories, products, type Category, type Product } from "./products";
import { merch } from "./merch";
import { BagProvider, BagButton, MerchCard } from "./Bag";

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
      <div className="flex h-full w-full items-center justify-center bg-[#E4EBF3]">
        <svg viewBox="0 0 24 24" className="h-12 w-12 text-[#1C1917]/55" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d={gearIcons[p.sub]} />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#1C1917]">
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

export default function ShopBrowser() {
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
    `shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${on ? "bg-[#1C1917] text-white" : "text-[#1C1917] hover:bg-[#1C1917]/10"}`;
  const chip = (on: boolean) =>
    `shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[13px] font-medium transition ${on ? "border-[#1C1917] bg-[#1C1917] text-white" : "border-[#1C1917]/25 bg-white text-[#1C1917] hover:border-[#1C1917]"}`;

  return (
    <BagProvider>
    <div id="products">
      <div className="sticky top-[101px] z-40 border-b border-[#1C1917]/10 bg-[#EEF4FA]/95 backdrop-blur-md lg:top-[61px]">
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

      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6">
        {shown.map((c) => {
          const items = products.filter((p) => p.cat === c.id && (!sub || cat === "all" || p.sub === sub));
          const kit = merch.filter((p) => p.cat === c.id && (!sub || cat === "all" || p.sub === sub));
          return (
            <section key={c.id} id={c.id} aria-labelledby={`h-${c.id}`} className="mb-10 scroll-mt-[220px] lg:scroll-mt-[170px] last:mb-0">
              <div className="mb-3 flex items-baseline justify-between">
                <h2 id={`h-${c.id}`} className="font-display text-xl font-bold text-[#1C1917] sm:text-2xl">{c.label}</h2>
                <span className="text-sm text-[#1C1917]">{items.length + kit.length} items</span>
              </div>
              {c.id === "gear" && <GearBanner />}
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
  );
}
