"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { variantImg, variantName, type Merch, type MerchVariant } from "./merch";
import { catalogue as merch } from "./catalogue";

/** Other components open the bag drawer with this event. */
export const OPEN_BAG = "esp-open-bag";

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

export function useBag(): BagCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("BagProvider missing");
  return c;
}

export function BagButton() {
  const { lines, set } = useBag();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const show = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !document.querySelector("[data-product-view]") && setOpen(false);
    window.addEventListener(OPEN_BAG, show);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_BAG, show);
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  const [busy, setBusy] = useState(false);
  const [errState, setErrState] = useState({ key: "", msg: "" });
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const items = lines.flatMap((l) => {
    const m = byId.get(l.id);
    return m ? [{ ...l, ...m }] : [];
  });
  const subtotal = items.reduce((n, i) => n + i.v.pence * i.qty, 0);
  const [rate, setRate] = useState<{ key: string; pence?: number; made?: number; parcels?: number; failed?: boolean } | null>(null);
  const key = JSON.stringify(lines);
  useEffect(() => {
    if (!open || lines.length === 0) return;
    let live = true;
    fetch("/api/shop/rates", { method: "POST", headers: { "Content-Type": "application/json" }, body: `{"items":${key}}` })
      .then((r) => r.json())
      .then((d: { ok?: boolean; pence?: number; made?: number; parcels?: number }) => live && setRate(d.ok && typeof d.pence === "number" ? { key, pence: d.pence, made: d.made, parcels: d.parcels } : { key, failed: true }))
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
      <button type="button" onClick={() => setOpen(true)} className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-50 flex items-center gap-2 rounded-full bg-[#0E2141] px-4 py-3 text-sm font-semibold text-white shadow-lg">
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
                  <div className="relative h-16 w-16 shrink-0 rounded bg-[#F4F6F8]"><Image src={variantImg(i.p, i.v)} alt="" fill sizes="64px" className="object-contain p-1" /></div>
                  <div className="flex flex-1 flex-col text-sm">
                    <span className="font-semibold">{i.p.name}</span>
                    {variantName(i.p, i.v) && <span className="text-[13px]">{variantName(i.p, i.v)}</span>}
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
              {quote?.parcels === 2 && quote.made != null && (
                <p data-two-parcels className="mt-2 text-[13px]">Your order comes in two parcels. Smart casual pieces are made separately (£{(quote.made / 100).toFixed(2)} of the delivery) and are usually ready in about 5 working days plus delivery.</p>
              )}
              {quote?.failed && <p className="mt-2 text-[13px] text-red-700">We couldn&apos;t get a delivery price just now. It will be shown at checkout.</p>}
              <p className="mt-2 text-[13px]">UK delivery only. Each item is made to order for you.</p>
              {err && <p className="mt-2 text-[13px] text-red-700">{err}</p>}
              <button type="button" disabled={busy || items.length === 0} onClick={checkout} className="mt-3 w-full rounded-md bg-[#0E2141] px-4 py-3 text-sm font-semibold text-white disabled:opacity-40">
                {busy ? "Opening checkout…" : "Checkout"}
              </button>
            </div>}
          </aside>
        </div>
      )}
    </>
  );
}
