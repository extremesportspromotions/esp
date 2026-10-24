"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import Image from "next/image";
import { type Merch, type MerchPhoto } from "./merch";
import { gbp, MAX_QTY, OPEN_BAG, useBag } from "./Bag";

const field = "rounded-md border border-[#1C1917]/25 bg-white px-2 py-1.5 text-[13px] text-[#1C1917]";
const ink = "text-[#1C1917]";

/* ---------- URL hash, so the phone back button closes the product view ---------- */

const HASH_EVENT = "esp-hash";
const subscribe = (cb: () => void) => {
  window.addEventListener("popstate", cb);
  window.addEventListener("hashchange", cb);
  window.addEventListener(HASH_EVENT, cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener("hashchange", cb);
    window.removeEventListener(HASH_EVENT, cb);
  };
};
const useHash = () => useSyncExternalStore(subscribe, () => window.location.hash, () => "");
const hashFor = (p: Merch) => `#p-${p.pid}`;

function openView(p: Merch) {
  window.history.pushState({ espView: p.pid }, "", hashFor(p));
  window.dispatchEvent(new Event(HASH_EVENT));
}
function closeView() {
  if ((window.history.state as { espView?: number } | null)?.espView) {
    window.history.back();
  } else {
    // Opened from a shared link: drop the hash without leaving the page.
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    window.dispatchEvent(new Event(HASH_EVENT));
  }
}

/* ---------- shared picker state for the card and the product view ---------- */

type Pick = ReturnType<typeof usePick>;
function usePick(p: Merch) {
  const { add } = useBag();
  const colors = p.colors ?? [];
  const [color, setColorRaw] = useState(colors[0]?.name);
  const variants = colors.length > 1 ? p.variants.filter((v) => v.color === color) : p.variants;
  const soldOut = variants.every((v) => v.oos);
  const only = (vs: typeof variants) => (vs.length === 1 && !vs[0].oos ? vs[0].id : 0);
  const [vid, setVid] = useState(only(variants));
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [needSize, setNeedSize] = useState(false);
  const prices = variants.map((v) => v.pence);
  const min = Math.min(...prices);
  const chosen = variants.find((v) => v.id === vid);
  const setColor = (name: string) => {
    if (name === color) return;
    const next = p.variants.filter((v) => v.color === name);
    // Keep the chosen size when the new colour has it.
    const same = next.find((v) => !v.oos && v.label === chosen?.label);
    setColorRaw(name);
    setVid(same ? same.id : only(next));
    setNeedSize(false);
    setAdded(false);
  };
  const colorObj = colors.find((c) => c.name === color);
  const photos: MerchPhoto[] = colorObj && colorObj !== colors[0] && colorObj.gallery.length ? colorObj.gallery : p.gallery?.length ? p.gallery : [{ src: p.img, alt: `ESP ${p.name}` }];
  const price = chosen ? gbp(chosen.pence) : min === Math.max(...prices) ? gbp(min) : `From ${gbp(min)}`;
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const addNow = () => {
    add(vid, qty);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 2500);
  };
  return { p, variants, colors, color, setColor, photos, soldOut, vid, setVid, qty, setQty, added, needSize, setNeedSize, price, addNow };
}

const isSize = (label: string) => /^(XS|S|M|L|XL|[2-5]XL)$/.test(label);

function BuyForm({ k, big, onAdded }: { k: Pick; big?: boolean; onAdded?: () => void }) {
  const { p, variants, soldOut, vid, setVid, qty, setQty, added, needSize, setNeedSize, addNow } = k;
  const single = variants.length === 1;
  const sizeWord = isSize(variants[0].label) ? "Size" : "Option";
  const f = big ? "rounded-md border border-[#1C1917]/25 bg-white px-3 py-2.5 text-[15px] text-[#1C1917]" : field;
  return (
    <form
      className={big ? "flex flex-col gap-3" : "mt-auto flex scroll-mb-24 scroll-mt-48 flex-col gap-2 lg:scroll-mb-20 lg:scroll-mt-40"}
      onSubmit={(e) => {
        e.preventDefault();
        if (!vid) {
          setNeedSize(true);
          const form = e.currentTarget;
          (form.querySelector("select") as HTMLSelectElement | null)?.focus({ preventScroll: true });
          // Keep the picker and message clear of the floating Bag button.
          requestAnimationFrame(() => form.scrollIntoView({ block: "nearest", behavior: "smooth" }));
          return;
        }
        addNow();
        onAdded?.();
      }}
    >
      {big && !single && <label htmlFor={`pv-opt-${p.pid}`} className={`-mb-1 text-sm font-semibold ${ink}`}>{sizeWord}</label>}
      <div className="flex min-w-0 gap-2">
        {single ? (
          <span className={`flex-1 self-center ${big ? "text-[15px]" : "text-[13px]"} ${ink}`}>{variants[0].label}</span>
        ) : (
          <select
            id={big ? `pv-opt-${p.pid}` : undefined}
            aria-label={big ? undefined : `${p.name} option`}
            className={`${f} min-w-0 flex-1`}
            value={vid}
            onChange={(e) => {
              setVid(Number(e.target.value));
              setNeedSize(false);
            }}
            aria-invalid={needSize || undefined}
          >
            <option value={0} disabled>{big ? `Choose ${sizeWord.toLowerCase()}` : sizeWord}</option>
            {variants.map((v) => (
              <option key={v.id} value={v.id} disabled={v.oos}>{v.oos ? `${v.label} (out of stock)` : v.label}</option>
            ))}
          </select>
        )}
        <select aria-label={`${p.name} quantity`} className={`${f} ${big ? "w-20" : "w-16"} shrink-0`} value={qty} onChange={(e) => setQty(Number(e.target.value))}>
          {Array.from({ length: MAX_QTY }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      {needSize && <p role="alert" className={`-mt-1 ${big ? "text-sm" : "text-[12px]"} font-medium text-red-700`}>Choose an option first.</p>}
      <button type="submit" disabled={soldOut} className={`rounded-md bg-[#1C1917] font-semibold text-white transition hover:bg-black disabled:opacity-40 ${big ? "px-4 py-3 text-[15px]" : "px-3 py-2 text-sm"}`}>
        {soldOut ? "Out of stock" : added ? "Added to bag" : "Add to bag"}
      </button>
    </form>
  );
}

/* ---------- card ---------- */

export function MerchCard({ p }: { p: Merch }) {
  const k = usePick(p);
  const open = useHash() === hashFor(p);
  return (
    <li className="flex flex-col overflow-hidden rounded-xl border border-[#1C1917]/10 bg-white">
      <button type="button" onClick={() => openView(p)} aria-label={`View ${p.name}: photos and details`} className="group relative block aspect-square overflow-hidden bg-[#F4F6F8] text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1C1917]">
        <Image src={k.colors.length > 1 && k.color !== k.colors[0].name ? k.photos[0].src : p.img} alt={`ESP ${p.name}, ${(k.color ?? "black").toLowerCase()}, with the mountain logo`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px" loading="lazy" className="object-contain p-2 transition duration-300 group-hover:scale-[1.03]" />
        {k.colors.length > 1 && (
          <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-[#1C1917] shadow-sm">{k.colors.length} colours</span>
        )}
        {(p.gallery?.length ?? 0) > 1 && k.colors.length <= 1 && (
          <span className="absolute bottom-2 right-2 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-[#1C1917] shadow-sm">{p.gallery!.length} photos</span>
        )}
      </button>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex flex-col gap-0.5">
          <h3 className={`line-clamp-2 min-h-[2.5em] text-sm font-semibold leading-tight sm:text-[15px] ${ink}`}>
            <button type="button" onClick={() => openView(p)} className="text-left hover:underline">{p.name}</button>
          </h3>
          <span className={`text-sm font-bold sm:text-[15px] ${ink}`}>{k.price}</span>
        </div>
        <BuyForm k={k} />
      </div>
      {open && <ProductView k={k} />}
    </li>
  );
}

/* ---------- product view: full-screen sheet on phones, modal on desktop ---------- */

function ProductView({ k }: { k: Pick }) {
  const { p } = k;
  const closeRef = useRef<HTMLButtonElement>(null);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeView();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      opener?.focus?.({ preventScroll: true });
    };
  }, []);


  return (
    <div className="fixed inset-0 z-[70] flex items-stretch justify-center bg-black/50 lg:items-center lg:p-6" onClick={closeView}>
      <div
        role="dialog"
        aria-modal="true"
        data-product-view
        aria-labelledby={`pv-h-${p.pid}`}
        className="relative flex h-full w-full flex-col overflow-y-auto overscroll-contain bg-white lg:grid lg:h-auto lg:max-h-[90vh] lg:max-w-5xl lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:overflow-hidden lg:rounded-2xl lg:shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={closeView}
          aria-label="Close"
          className="fixed right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#1C1917] shadow-md ring-1 ring-[#1C1917]/10 lg:absolute"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        <Gallery key={k.color ?? ""} photos={k.photos} name={k.color && k.colors.length > 1 ? `${p.name}, ${k.color}` : p.name} />

        <div className="flex flex-col gap-4 p-5 pb-8 lg:overflow-y-auto lg:p-8">
          <div>
            <h2 id={`pv-h-${p.pid}`} className={`font-display text-2xl font-bold leading-tight ${ink}`}>{p.name}</h2>
            <p className={`mt-1 text-xl font-bold ${ink}`}>{k.price}</p>
          </div>
          {p.details?.length ? (
            <ul className={`flex flex-col gap-1.5 text-[15px] leading-snug ${ink}`}>
              {p.details.map((d) => (
                <li key={d} className="flex gap-2"><span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1C1917]/60" />{d}</li>
              ))}
            </ul>
          ) : null}
          {k.colors.length > 1 && <Swatches k={k} />}
          <BuyForm k={k} big onAdded={() => setJustAdded(true)} />
          {justAdded && (
            <div className="flex items-center justify-between gap-3 rounded-lg bg-[#EEF4FA] px-3 py-2.5 text-sm text-[#1C1917]" role="status">
              <span>Added to your bag.</span>
              <button
                type="button"
                className="font-semibold underline"
                onClick={() => {
                  closeView();
                  setTimeout(() => window.dispatchEvent(new Event(OPEN_BAG)), 50);
                }}
              >
                View bag
              </button>
            </div>
          )}
          <p className={`text-[13px] ${ink}`}>UK delivery only. Each item is made to order for you, and delivery is worked out in your bag.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- colour picker ---------- */

function Swatches({ k }: { k: Pick }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className={`mb-2 text-sm font-semibold ${ink}`}>
        Colour: <span className="font-normal">{k.color}</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {k.colors.map((c) => {
          const on = c.name === k.color;
          return (
            <button
              key={c.name}
              type="button"
              aria-pressed={on}
              onClick={() => k.setColor(c.name)}
              className={`flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 text-[13px] ${ink} ${on ? "border-[#1C1917] ring-1 ring-[#1C1917]" : "border-[#1C1917]/20 hover:border-[#1C1917]/50"}`}
            >
              <span aria-hidden className="h-6 w-6 rounded-full ring-1 ring-inset ring-black/15" style={{ backgroundColor: c.hex }} />
              {c.name}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ---------- gallery: swipe on phones, thumbnails and arrows on desktop, tap to zoom ---------- */

function Gallery({ photos, name }: { photos: { src: string; alt: string }[]; name: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const go = useCallback((n: number) => {
    const el = track.current;
    if (!el) return;
    const t = Math.max(0, Math.min(photos.length - 1, n));
    setZoom(null);
    el.scrollTo({ left: t * el.clientWidth, behavior: "smooth" });
  }, [photos.length]);
  const many = photos.length > 1;

  return (
    <div className="flex flex-col border-b border-[#1C1917]/10 bg-white lg:h-full lg:min-h-0 lg:border-b-0 lg:border-r">
      <div className="relative">
        <div
          ref={track}
          className={`flex aspect-square w-full snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${zoom ? "overflow-hidden" : "overflow-x-auto"}`}
          onScroll={(e) => {
            const el = e.currentTarget;
            const n = Math.round(el.scrollLeft / el.clientWidth);
            if (n !== i) {
              setI(n);
              setZoom(null);
            }
          }}
          aria-roledescription="carousel"
          aria-label={`${name} photos`}
        >
          {photos.map((ph, n) => (
            <Slide key={ph.src} n={n} total={photos.length} ph={ph} eager={n === 0} zoom={n === i ? zoom : null} setZoom={setZoom} />
          ))}
        </div>
        {many && (
          <>
            <Arrow dir={-1} hidden={i === 0} onClick={() => go(i - 1)} />
            <Arrow dir={1} hidden={i === photos.length - 1} onClick={() => go(i + 1)} />
            <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 lg:hidden" aria-hidden>
              {photos.map((ph, n) => (
                <span key={ph.src} className={`h-2 rounded-full transition-all ${n === i ? "w-5 bg-[#1C1917]" : "w-2 bg-[#1C1917]/30"}`} />
              ))}
            </div>
          </>
        )}
      </div>
      {many && (
        <div className="hidden gap-2 overflow-x-auto bg-white p-3 lg:flex">
          {photos.map((ph, n) => (
            <button key={ph.src} type="button" onClick={() => go(n)} aria-label={`Photo ${n + 1} of ${photos.length}`} aria-current={n === i || undefined}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-white ring-1 ring-inset ${n === i ? "ring-2 ring-[#1C1917]" : "ring-[#1C1917]/15 hover:ring-[#1C1917]/40"}`}>
              <Image src={ph.src} alt="" fill sizes="64px" className="object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Slide({ n, total, ph, eager, zoom, setZoom }: { n: number; total: number; ph: { src: string; alt: string }; eager: boolean; zoom: { x: number; y: number } | null; setZoom: (z: { x: number; y: number } | null) => void }) {
  return (
    <div className="relative h-full w-full shrink-0 snap-center overflow-hidden" role="group" aria-roledescription="slide" aria-label={`${n + 1} of ${total}`}>
      <button
        type="button"
        aria-label={zoom ? "Zoom out" : "Zoom in"}
        className={`absolute inset-0 ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`}
        onClick={(e) => {
          if (zoom) return setZoom(null);
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
        onMouseMove={(e) => {
          if (!zoom) return;
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
      >
        <Image
          src={ph.src}
          alt={ph.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 560px"
          priority={eager}
          loading={eager ? undefined : "lazy"}
          className="object-contain transition-transform duration-200"
          style={zoom ? { transform: "scale(2.2)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
        />
      </button>
    </div>
  );
}

function Arrow({ dir, hidden, onClick }: { dir: 1 | -1; hidden: boolean; onClick: () => void }): ReactNode {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir < 0 ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#1C1917] shadow ring-1 ring-[#1C1917]/10 lg:flex ${dir < 0 ? "left-3" : "right-3"} ${hidden ? "invisible" : ""}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d={dir < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} /></svg>
    </button>
  );
}
