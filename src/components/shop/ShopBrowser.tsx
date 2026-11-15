"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { BagProvider, BagButton } from "./Bag";
import { MerchCard, NotYetContext } from "./MerchCard";
import type { Merch } from "./merch";
import { hiddenColours } from "./hiddenFromShop";
import { forTab } from "./photoGender";
import { PAGE_TITLE, sectionPath } from "./shopRoutes";

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

const grid = "grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4";

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

function tabForProductHash(): TabId | null {
  const m = /^p-(\d+)$/i.exec(window.location.hash.slice(1));
  if (!m) return null;
  const p = merch.find((item) => item.pid === Number(m[1]));
  if (!p) return "mens";
  if (isBrandedAccessory(p)) return "equipment";
  if (showOnMens(p)) return "mens";
  if (showOnWomens(p)) return "womens";
  return "mens";
}

const SECTION_CARDS: { id: TabId; href: string; label: string; img: string; pos: string }[] = [
  { id: "mens", href: "/shop/mens", label: "Men's", img: "/shop/r1/mens/M1-front.webp", pos: "50% 18%" },
  { id: "womens", href: "/shop/womens", label: "Women's", img: "/shop/r1/womens/W1-front.webp", pos: "50% 18%" },
  { id: "equipment", href: "/shop/accessories", label: "Accessories", img: "/shop/r1/E2-front.webp", pos: "50% 20%" },
];

function LandingCards() {
  const router = useRouter();

  useEffect(() => {
    const productTab = tabForProductHash();
    const intent = readIntent();
    const tab = productTab ?? intent?.tab;
    if (!tab) return;
    const url = new URL(window.location.href);
    url.searchParams.delete("tab");
    const dest = sectionPath(tab);
    const search = url.searchParams.toString();
    const hash = window.location.hash;
    router.replace(`${dest}${search ? `?${search}` : ""}${hash}`);
  }, [router]);

  return (
    <nav aria-label="Shop sections">
      <ul className="flex flex-col gap-3 sm:gap-4">
        {SECTION_CARDS.map((c) => (
          <li key={c.id}>
            <Link
              href={c.href}
              className="relative block aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[2/1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E2141]"
            >
              <Image src={c.img} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: c.pos }} priority={c.id === "mens"} />
              <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#0E2141]/80 to-transparent" aria-hidden />
              <span className="font-serif absolute inset-x-0 bottom-6 text-center text-4xl font-medium leading-none tracking-wide text-[#F6EFE3] sm:bottom-8 sm:text-5xl lg:text-6xl">{c.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function ShopBrowser({
  section,
  initialSub = null,
  initialAnchor,
}: {
  section?: TabId;
  initialSub?: string | null;
  initialAnchor?: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<TabId>(section ?? "mens");
  const [sub, setSub] = useState<string | null>(initialSub);
  const [ready, setReady] = useState(false);
  const kitAll = orderable(merch, new Set(hiddenColours.map((x) => x.key)));

  useEffect(() => {
    if (!section) return;
    const apply = () => {
      const intent = readIntent();
      if (!intent) return;
      if (intent.tab !== section) {
        const url = new URL(window.location.href);
        url.searchParams.delete("tab");
        const search = url.searchParams.toString();
        router.replace(`${sectionPath(intent.tab)}${search ? `?${search}` : ""}${window.location.hash}`);
        return;
      }
      setTab(intent.tab);
      setSub(intent.sub);
    };
    apply();
    setReady(true);
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [section, router]);

  useEffect(() => {
    if (!section) {
      setReady(true);
      return;
    }
    if (!ready) return;
    const intent = readIntent();
    const anchor = intent?.anchor ?? initialAnchor;
    if (!anchor) return;
    document.getElementById(anchor)?.scrollIntoView({ block: "start" });
  }, [section, tab, sub, ready, initialAnchor]);

  const active = tabs.find((t) => t.id === tab);
  const chip = (on: boolean) =>
    `shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] font-medium tracking-wide transition ${on ? "border-[#0E2141] bg-[#0E2141] text-white" : "border-[#1C1917]/20 bg-transparent text-[#1C1917] hover:border-[#1C1917]"}`;

  if (!section) {
    return (
      <NotYetContext.Provider value={new Set(hiddenColours.map((x) => x.key))}>
        <BagProvider>
          <div id="products">
            <LandingCards />
            <BagButton />
          </div>
        </BagProvider>
      </NotYetContext.Provider>
    );
  }

  const title = PAGE_TITLE[tab];
  const kit = kitAll
    .filter((p) => inTab(p, tab))
    .map((p) => (tab === "equipment" ? p : forTab(p, tab)))
    .filter((p): p is Merch => p != null)
    .filter((p) => !sub || merchChip(p) === sub || (sub === "Smart casual" && merchChip(p) === "Denim"));
  const recs = tab === "equipment" ? products.filter((p) => !sub || p.sub === sub) : [];
  const clothing = kit.filter((p) => p.sub !== "Denim");
  const denim = kit.filter((p) => p.sub === "Denim");
  const branded = tab === "equipment" ? kit : [];
  const showRecs = recs.length > 0;
  const count = tab === "equipment" ? branded.length + recs.length : clothing.length + denim.length;

  return (
    <NotYetContext.Provider value={new Set(hiddenColours.map((x) => x.key))}>
    <BagProvider>
    <div id="products">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8">
        <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm text-[#0E2141] hover:underline">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
            <path d="M15 6 9 12l6 6" />
          </svg>
          Back to the shop
        </Link>
        <div className="mt-5 mb-2 flex items-baseline justify-between sm:mt-6">
          <h1 id={`h-${tab}`} className="font-display text-3xl font-medium tracking-tight text-[#0E2141] sm:text-4xl">{title}</h1>
          <span className="text-sm text-[#1C1917]">{count} items</span>
        </div>
      </div>

      {active && active.subs.length > 0 && (
        <div className="sticky top-[101px] z-40 border-b border-[#1C1917]/10 bg-[#F6EFE3]/95 backdrop-blur-md lg:top-[61px]">
          <div className="mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6">
            <button type="button" className={chip(sub === null)} onClick={() => setSub(null)}>All</button>
            {active.subs.map((s) => (
              <button key={s} type="button" className={chip(sub === s)} aria-pressed={sub === s} onClick={() => setSub(s)}>{s}</button>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6 sm:px-6 sm:pt-8 lg:pb-24">
        <section id={tab} aria-labelledby={`h-${tab}`} className="scroll-mt-[180px] pb-[calc(5rem+env(safe-area-inset-bottom))] lg:scroll-mt-[140px] lg:pb-0">
          {tab !== "equipment" && (
            <>
              <ul className={grid}>
                {clothing.map((p) => <MerchCard key={`${p.pid}-${tab}`} p={p} />)}
              </ul>
              {denim.length > 0 && (
                <div id={tab === "mens" ? "denim" : "denim-womens"} data-denim={tab === "mens" ? true : undefined} className="mt-8 scroll-mt-[170px] lg:scroll-mt-[130px]">
                  <h2 id={tab === "mens" ? "h-denim" : "h-denim-womens"} className="scroll-mt-[170px] lg:scroll-mt-[130px] font-display mb-1 text-lg font-medium text-[#0E2141] sm:text-xl">Denim</h2>
                  <ul className={grid}>
                    {denim.map((p) => <MerchCard key={`${p.pid}-${tab}`} p={p} />)}
                  </ul>
                </div>
              )}
            </>
          )}
          {tab === "equipment" && (
            <>
              {branded.length > 0 && (
                <div id="accessories" className="scroll-mt-[220px] lg:scroll-mt-[170px]">
                  <h2 className="font-display mb-3 text-lg font-medium text-[#0E2141] sm:text-xl">From Devonshire</h2>
                  <ul className={grid}>
                    {branded.map((p) => <MerchCard key={`${p.pid}-${tab}`} p={p} />)}
                  </ul>
                </div>
              )}
              {showRecs && (
                <div id="recommended" className={`${branded.length > 0 ? "mt-8" : ""} scroll-mt-[220px] lg:scroll-mt-[170px]`}>
                  <span id="gear" className="sr-only" />
                  <h2 className="font-display mb-3 text-lg font-medium text-[#0E2141] sm:text-xl">Recommended equipment</h2>
                  <p data-affiliate-note className="-mt-1 mb-4 text-[13px] leading-snug text-[#1C1917]/70">These are recommendations only and are not purchase links yet. We will say clearly if any we add are affiliate links.</p>
                  <ul className={grid}>
                    {recs.map((p) => <Card key={`${p.sub}-${p.name}`} p={p} />)}
                  </ul>
                </div>
              )}
            </>
          )}
        </section>
      </div>
      <BagButton />
    </div>
    </BagProvider>
    </NotYetContext.Provider>
  );
}
