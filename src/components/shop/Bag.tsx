"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { merch, type Merch, type MerchVariant } from "./merch";

export type Line = { id: number; qty: number };
type BagCtx = { lines: Line[]; add: (id: number, qty: number) => void; set: (id: number, qty: number) => void };

const Ctx = createContext<BagCtx | null>(null);
const KEY = "esp-bag-v1";
export const MAX_QTY = 10;

const byId = new Map<number, { p: Merch; v: MerchVariant }>();
for (const p of merch) for (const v of p.variants) byId.set(v.id, { p, v });

export const gbp = (pence: number) => `£${(pence / 100).toFixed(2)}`;

export function BagProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]") as Line[];
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read saved bag after hydration
      setLines(saved.filter((l) => byId.has(l.id) && l.qty > 0));
    } catch {}
  }, []);
  const save = (next: Line[]) => {
    setLines(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };
  const value = useMemo<BagCtx>(() => ({
    lines,
    add: (id, qty) => {
      const cur = lines.find((l) => l.id === id);
      save(cur ? lines.map((l) => (l.id === id ? { id, qty: Math.min(MAX_QTY, l.qty + qty) } : l)) : [...lines, { id, qty }].slice(-30));
    },
    set: (id, qty) => save(qty <= 0 ? lines.filter((l) => l.id !== id) : lines.map((l) => (l.id === id ? { id, qty: Math.min(MAX_QTY, qty) } : l))),
  }), [lines]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

function useBag(): BagCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("BagProvider missing");
  return c;
}

export function MerchCard({ p }: { p: Merch }) {
  const { add } = useBag();
  const soldOut = p.variants.every((v) => v.oos);
  const [vid, setVid] = useState(p.variants.length === 1 && !p.variants[0].oos ? p.variants[0].id : 0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [needSize, setNeedSize] = useState(false);
  const prices = p.variants.map((v) => v.pence);
  const min = Math.min(...prices);
  const chosen = p.variants.find((v) => v.id === vid);
  const price = chosen ? gbp(chosen.pence) : min === Math.max(...prices) ? gbp(min) : `From ${gbp(min)}`;
  const single = p.variants.length === 1;
  const field = "rounded-md border border-[#1C1917]/25 bg-white px-2 py-1.5 text-[13px] text-[#1C1917]";

  return (
    <li className="flex flex-col overflow-hidden rounded-xl border border-[#1C1917]/10 bg-white">
      <div className="relative aspect-square overflow-hidden bg-[#F4F6F8]">
        <Image src={p.img} alt={`ESP ${p.name}, black, with the mountain logo`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px" loading="lazy" className="object-contain p-2" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex flex-col gap-0.5">
          <h3 className="line-clamp-2 min-h-[2.5em] text-sm font-semibold leading-tight text-[#1C1917] sm:text-[15px]">{p.name}</h3>
          <span className="text-sm font-bold text-[#1C1917] sm:text-[15px]">{price}</span>
        </div>
        <form
          className="mt-auto flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!vid) {
              setNeedSize(true);
              (e.currentTarget.querySelector("select") as HTMLSelectElement | null)?.focus();
              return;
            }
            add(vid, qty);
            setAdded(true);
            setTimeout(() => setAdded(false), 1800);
          }}
        >
          <div className="flex min-w-0 gap-2">
            {single ? (
              <span className="flex-1 self-center text-[13px] text-[#1C1917]">{p.variants[0].label}</span>
            ) : (
              <select aria-label={`${p.name} option`} className={`${field} min-w-0 flex-1`} value={vid} onChange={(e) => { setVid(Number(e.target.value)); setNeedSize(false); }} aria-invalid={needSize || undefined}>
                <option value={0} disabled>{/[0-9]XL|^[SML]$|^XS$/.test(p.variants[0].label) ? "Size" : "Option"}</option>
                {p.variants.map((v) => (
                  <option key={v.id} value={v.id} disabled={v.oos}>{v.oos ? `${v.label} (out of stock)` : v.label}</option>
                ))}
              </select>
            )}
            <select aria-label={`${p.name} quantity`} className={`${field} w-16 shrink-0`} value={qty} onChange={(e) => setQty(Number(e.target.value))}>
              {Array.from({ length: MAX_QTY }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          {needSize && <p role="alert" className="-mt-1 text-[12px] font-medium text-red-700">Choose an option first.</p>}
          <button type="submit" disabled={soldOut} className="rounded-md bg-[#1C1917] px-3 py-2 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-40">
            {soldOut ? "Out of stock" : added ? "Added to bag" : "Add to bag"}
          </button>
        </form>
      </div>
    </li>
  );
}

export function BagButton() {
  const { lines, set } = useBag();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errState, setErrState] = useState({ key: "", msg: "" });
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const items = lines.flatMap((l) => {
    const m = byId.get(l.id);
    return m ? [{ ...l, ...m }] : [];
  });
  const subtotal = items.reduce((n, i) => n + i.v.pence * i.qty, 0);
  const [rate, setRate] = useState<{ key: string; pence?: number; failed?: boolean } | null>(null);
  const key = JSON.stringify(lines);
  useEffect(() => {
    if (!open || lines.length === 0) return;
    let live = true;
    fetch("/api/shop/rates", { method: "POST", headers: { "Content-Type": "application/json" }, body: `{"items":${key}}` })
      .then((r) => r.json())
      .then((d: { ok?: boolean; pence?: number }) => live && setRate(d.ok && typeof d.pence === "number" ? { key, pence: d.pence } : { key, failed: true }))
      .catch(() => live && setRate({ key, failed: true }));
    return () => {
      live = false;
    };
  }, [open, key, lines.length]);
  const quote = rate?.key === key ? rate : null;
  const err = errState.key === key ? errState.msg : "";
  const setErr = (msg: string) => setErrState({ key, msg });

  async function checkout() {
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/shop/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lines }),
      });
      const data = (await res.json().catch(() => null)) as { url?: string; reason?: string } | null;
      if (res.ok && data?.url?.startsWith("https://checkout.stripe.com/")) {
        window.location.assign(data.url);
        return;
      }
      setErr(
        data?.reason === "not-configured"
          ? "Online payment isn't switched on yet. Please email enquiries@extremesportspromotions.com to order."
          : data?.reason === "delivery"
            ? "We couldn't work out UK delivery just now. Please try again in a minute."
            : data?.reason === "items"
              ? "One of the items in your bag is no longer available. Please remove it and try again."
              : res.status === 429
                ? "Too many attempts. Please wait a few minutes and try again."
                : "Checkout isn't available right now. Please try again shortly, or email enquiries@extremesportspromotions.com.",
      );
    } catch {
      setErr("Checkout isn't available right now. Please try again shortly.");
    }
    setBusy(false);
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-[#1C1917] px-4 py-3 text-sm font-semibold text-white shadow-lg">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M5 8h14l-1 13H6z M9 8V6a3 3 0 0 1 6 0v2" /></svg>
        Bag ({count})
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-black/40" onClick={() => setOpen(false)}>
          <aside role="dialog" aria-label="Your bag" className="flex h-full w-full max-w-sm flex-col bg-white text-[#1C1917]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[#1C1917]/10 p-4">
              <h2 className="font-display text-lg font-bold">Your bag</h2>
              <button type="button" onClick={() => setOpen(false)} className="text-sm font-semibold underline">Close</button>
            </div>
            <ul className="flex-1 divide-y divide-[#1C1917]/10 overflow-y-auto px-4">
              {items.length === 0 && (
                <li className="flex flex-col items-center gap-3 py-12 text-center">
                  <svg viewBox="0 0 24 24" className="h-10 w-10 text-[#1C1917]/40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M5 8h14l-1 13H6z M9 8V6a3 3 0 0 1 6 0v2" /></svg>
                  <p className="text-base font-semibold">Your bag is empty</p>
                  <p className="text-sm">Pick a size and tap Add to bag.</p>
                  <button type="button" onClick={() => setOpen(false)} className="mt-1 rounded-md border border-[#1C1917] px-4 py-2 text-sm font-semibold">Keep shopping</button>
                </li>
              )}
              {items.map((i) => (
                <li key={i.id} className="flex gap-3 py-3">
                  <div className="relative h-16 w-16 shrink-0 rounded bg-[#F4F6F8]"><Image src={i.p.img} alt="" fill sizes="64px" className="object-contain p-1" /></div>
                  <div className="flex flex-1 flex-col text-sm">
                    <span className="font-semibold">{i.p.name}</span>
                    {i.p.variants.length > 1 && <span className="text-[13px]">{i.v.label}</span>}
                    <div className="mt-1 flex items-center gap-2">
                      <button type="button" aria-label="One fewer" className="h-7 w-7 rounded border border-[#1C1917]/25" onClick={() => set(i.id, i.qty - 1)}>−</button>
                      <span className="w-5 text-center">{i.qty}</span>
                      <button type="button" aria-label="One more" disabled={i.qty >= MAX_QTY} className="h-7 w-7 rounded border border-[#1C1917]/25 disabled:opacity-30" onClick={() => set(i.id, i.qty + 1)}>+</button>
                      <button type="button" className="ml-auto text-[13px] underline" onClick={() => set(i.id, 0)}>Remove</button>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">{gbp(i.v.pence * i.qty)}</span>
                </li>
              ))}
            </ul>
            {items.length > 0 && <div className="border-t border-[#1C1917]/10 p-4">
              <div className="flex justify-between text-sm font-semibold"><span>Subtotal</span><span>{gbp(subtotal)}</span></div>
              {items.length > 0 && (
                <div className="mt-1 flex justify-between text-sm">
                  <span>UK delivery</span>
                  <span>{quote?.pence != null ? gbp(quote.pence) : quote?.failed ? "Shown at checkout" : "Working out…"}</span>
                </div>
              )}
              {quote?.pence != null && <div className="mt-1 flex justify-between text-sm font-bold"><span>Total</span><span>{gbp(subtotal + quote.pence)}</span></div>}
              {quote?.failed && <p className="mt-2 text-[13px] text-red-700">We couldn&apos;t get a delivery price just now. It will be shown at checkout.</p>}
              <p className="mt-2 text-[13px]">UK delivery only. Each item is made to order for you.</p>
              {err && <p className="mt-2 text-[13px] text-red-700">{err}</p>}
              <button type="button" disabled={busy || items.length === 0} onClick={checkout} className="mt-3 w-full rounded-md bg-[#1C1917] px-4 py-3 text-sm font-semibold text-white disabled:opacity-40">
                {busy ? "Opening checkout…" : "Checkout"}
              </button>
            </div>}
          </aside>
        </div>
      )}
    </>
  );
}
