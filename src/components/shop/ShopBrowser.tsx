"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import StagMark from "./StagMark";
import {
  isBrandedAccessory,
  merchChip,
  products,
  showOnMens,
  showOnWomens,
  tabAliases,
  tabs,
  type Product,
  type TabId,
} from "./products";
import { catalogue as merch } from "./catalogue";
import { DENIM_PIDS, MADE_DELIVERY_PENCE, MADE_LEAD } from "./smartCasual";
import { BagProvider, BagButton } from "./Bag";
import { MerchCard, NotYetContext } from "./MerchCard";
import type { Merch } from "./merch";

const kitIcons: Record<string, string> = {
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
  if (p.sub && kitIcons[p.sub]) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#EDE4D3]">
        <svg viewBox="0 0 24 24" className="h-12 w-12 text-[#1C1917]/55" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d={kitIcons[p.sub]} />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#0E2141]">
      <StagMark sizes="(max-width: 1024px) 110px, 180px" />
    </div>
  );
}

function Card({ p }: { p: Product }) {
  return (
    <li className="group flex flex-col overflow-hidden rounded-xl border border-[#1C1917]/10 bg-white">
      <div className="relative aspect-square overflow-hidden">
        <Tile p={p} />
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

function SafetyBanner() {
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

/**
 * Hides anything that can't be ordered right now (no saved supplier design, held, or out of stock).
 * Data stays in the catalogue: switch a colour on in madeDesigns.ts and it reappears here.
 */
function orderable(list: typeof merch, hidden: Set<string>) {
  const out: typeof merch = [];
  for (const p of list) {
    const ok = (c?: string) => !(p.made && hidden.has(`${p.pid}:${c ?? ""}`));
    const variants = p.variants.filter((v) => !v.oos && ok(v.color));
    if (variants.length === 0) continue;
    // Denim: keep out-of-stock sizes in the list, shown as "(out of stock)" and not selectable.
    if (p.sub === "Denim") variants.splice(0, variants.length, ...p.variants.filter((v) => ok(v.color)));
    const live = new Set(variants.map((v) => v.color));
    const colors = p.colors?.filter((c) => live.has(c.name));
    const img = colors && colors.length && p.colors && colors[0] !== p.colors[0] ? colors[0].gallery[0]?.src ?? p.img : p.img;
    out.push({ ...p, variants, colors, img });
  }
  return out;
}

function inTab(p: Merch, tab: TabId): boolean {
  if (tab === "mens") return showOnMens(p);
  if (tab === "womens") return showOnWomens(p);
  return isBrandedAccessory(p);
}

const HASH_INTENT: Record<string, { tab: TabId; sub: string | null; anchor?: string }> = {
  bags: { tab: "equipment", sub: "Bags" },
  headwear: { tab: "equipment", sub: "Headwear" },
  climbing: { tab: "equipment", sub: "Climbing" },
  snow: { tab: "equipment", sub: "Snow" },
  cameras: { tab: "equipment", sub: "Cameras" },
  outdoor: { tab: "equipment", sub: "Outdoor" },
  "water-and-air": { tab: "equipment", sub: "Water and air" },
  "water and air": { tab: "equipment", sub: "Water and air" },
  training: { tab: "equipment", sub: "Training" },
  safety: { tab: "equipment", sub: "Safety" },
  smartcasual: { tab: "mens", sub: "Smart casual" },
  denim: { tab: "mens", sub: null, anchor: "denim" },
  accessories: { tab: "equipment", sub: null, anchor: "accessories" },
  gear: { tab: "equipment", sub: null, anchor: "recommended" },
  outerwear: { tab: "equipment", sub: null, anchor: "accessories" },
};

function readIntent(): { tab: TabId; sub: string | null; anchor?: string } | null {
  const hash = window.location.hash.slice(1);
  if (/^p-/i.test(hash)) return null;
  const query = new URLSearchParams(window.location.search).get("tab") ?? "";
  const raw = (hash || query).toLowerCase();
  if (!raw) return null;
  if (HASH_INTENT[raw]) return HASH_INTENT[raw];
  const tab = tabAliases[raw];
  if (tab) return { tab, sub: null };
  return null;
}

export default function ShopBrowser({ notYet = [], preview = false }: { notYet?: NotYet; preview?: boolean }) {
  const [tab, setTab] = useState<TabId>("mens");
  const [sub, setSub] = useState<string | null>(null);
  // Without JS, all three sections stay visible so old #hashes still jump. After hydration we show one tab.
  const [ready, setReady] = useState(false);
  // Preview only: denim shows (not orderable) so reviewers can see it; the live site hides it until its designs exist.
  const kitAll = orderable(merch, new Set(notYet.filter((x) => !(preview && DENIM_PIDS.has(Number(x.key.split(":")[0])))).map((x) => x.key)));

  useEffect(() => {
    const apply = () => {
      const intent = readIntent();
      if (!intent) return;
      setTab(intent.tab);
      setSub(intent.sub);
    };
    apply();
    setReady(true);
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const bar = document.querySelector<HTMLElement>('[aria-label="Shop sections"]');
    const on = bar?.querySelector<HTMLElement>('[aria-current="true"]');
    if (bar && on) bar.scrollLeft = on.offsetLeft - (bar.clientWidth - on.clientWidth) / 2;
    // Only jump when a hash or ?tab= asked for a section, not on the default Men's view.
    const intent = readIntent();
    if (!intent) return;
    document.getElementById(intent.anchor ?? intent.tab)?.scrollIntoView({ block: "start" });
  }, [tab, sub, ready]);

  const active = tabs.find((t) => t.id === tab);
  const tabClass = (on: boolean) =>
    `shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${on ? "bg-[#0E2141] text-white" : "text-[#1C1917] hover:bg-[#0E2141]/10"}`;
  const chip = (on: boolean) =>
    `shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[13px] font-medium transition ${on ? "border-[#0E2141] bg-[#0E2141] text-white" : "border-[#1C1917]/25 bg-white text-[#1C1917] hover:border-[#1C1917]"}`;

  return (
    <NotYetContext.Provider value={new Set(notYet.map((x) => x.key))}>
    <BagProvider>
    <div id="products">
      <div className="sticky top-[101px] z-40 border-b border-[#1C1917]/10 bg-[#F6EFE3]/95 backdrop-blur-md lg:top-[61px]">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <nav aria-label="Shop sections" className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((t) => (
              <a key={t.id} href={`#${t.id}`} className={tabClass(tab === t.id)} aria-current={tab === t.id ? "true" : undefined}>
                {t.short}
              </a>
            ))}
          </nav>
          {active && active.subs.length > 0 && (
            <div className="flex gap-1.5 overflow-x-auto pb-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button type="button" className={chip(sub === null)} onClick={() => setSub(null)}>All</button>
              {active.subs.map((s) => (
                <button key={s} type="button" className={chip(sub === s)} aria-pressed={sub === s} onClick={() => setSub(s)}>{s}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6 sm:px-6 lg:pb-20">
        {tabs.map((t) => {
          if (ready && t.id !== tab) return null;
          const kit = kitAll.filter((p) => inTab(p, t.id) && (!sub || merchChip(p) === sub || (sub === "Smart casual" && merchChip(p) === "Denim")));
          const recs = t.id === "equipment" ? products.filter((p) => !sub || p.sub === sub) : [];
          const clothing = kit.filter((p) => p.sub !== "Denim");
          const denim = kit.filter((p) => p.sub === "Denim");
          const branded = t.id === "equipment" ? kit : [];
          const showRecs = recs.length > 0;
          const count = t.id === "equipment" ? branded.length + recs.length : clothing.length + denim.length;
          const showMade = t.id !== "equipment" && kit.some((p) => p.cat === "smartcasual" && p.sub !== "Denim");
          const tabNotYet = notYet.filter((x) => {
            const p = kitAll.find((m) => String(m.pid) === x.key.split(":")[0]);
            return p && inTab(p, t.id);
          });
          return (
            <section key={t.id} id={t.id} aria-labelledby={`h-${t.id}`} className="mb-4 scroll-mt-[220px] pb-[calc(5rem+env(safe-area-inset-bottom))] lg:mb-10 lg:scroll-mt-[170px] lg:pb-0 lg:last:mb-0">
              <div className="mb-3 flex items-baseline justify-between">
                <h2 id={`h-${t.id}`} className="font-display text-xl font-bold text-[#1C1917] sm:text-2xl">{t.label}</h2>
                <span className="text-sm text-[#1C1917]">{count} items</span>
              </div>
              {showMade && (
                <p data-made-note className="-mt-1 mb-4 rounded-lg border-l-[3px] border-[#1C1917] bg-white px-4 py-2.5 text-sm text-[#1C1917]">
                  {MADE_LEAD} UK delivery £{(MADE_DELIVERY_PENCE / 100).toFixed(2)} per order. With other kit, these come as a separate parcel.
                </p>
              )}
              {t.id !== "equipment" && preview && tabNotYet.length > 0 && <NotYetBanner list={tabNotYet} />}
              {t.id !== "equipment" && (
                <>
                  <ul className={grid}>
                    {clothing.map((p) => <MerchCard key={p.pid} p={p} />)}
                  </ul>
                  {denim.length > 0 && (
                    <div id={t.id === "mens" ? "denim" : "denim-womens"} data-denim={t.id === "mens" ? true : undefined} className="mt-8 scroll-mt-[170px] lg:scroll-mt-[130px]">
                      <h3 id={t.id === "mens" ? "h-denim" : "h-denim-womens"} className="scroll-mt-[170px] lg:scroll-mt-[130px] font-display mb-1 text-lg font-bold text-[#1C1917] sm:text-xl">Denim</h3>
                      <ul className={grid}>
                        {denim.map((p) => <MerchCard key={p.pid} p={p} />)}
                      </ul>
                    </div>
                  )}
                </>
              )}
              {t.id === "equipment" && (
                <>
                  {branded.length > 0 && (
                    <div id="accessories" className="scroll-mt-[220px] lg:scroll-mt-[170px]">
                      <h3 className="font-display mb-3 text-lg font-bold text-[#1C1917] sm:text-xl">From Devonshire</h3>
                      <ul className={grid}>
                        {branded.map((p) => <MerchCard key={p.pid} p={p} />)}
                      </ul>
                    </div>
                  )}
                  {showRecs && (
                    <div id="recommended" className={`${branded.length > 0 ? "mt-8" : ""} scroll-mt-[220px] lg:scroll-mt-[170px]`}>
                      <span id="gear" className="sr-only" />
                      <h3 className="font-display mb-3 text-lg font-bold text-[#1C1917] sm:text-xl">Recommended equipment</h3>
                      <SafetyBanner />
                      <p data-affiliate-note className="-mt-1 mb-4 text-[13px] leading-snug text-[#1C1917]/70">These are recommendations only and are not purchase links yet. When we add purchase links, we will say clearly if any of them are affiliate links.</p>
                      <ul className={grid}>
                        {recs.map((p) => <Card key={`${p.sub}-${p.name}`} p={p} />)}
                      </ul>
                    </div>
                  )}
                </>
              )}
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
