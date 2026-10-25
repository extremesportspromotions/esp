"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { MerchPhoto } from "./merch";

const VIEW_WORD = { front: "Front", back: "Back", side: "Side", model: "On model" } as const;
export const viewWord = (ph: MerchPhoto) => (ph.view ? VIEW_WORD[ph.view] : undefined);

/**
 * Full-screen photo viewer. Swipe on phones, arrows / keyboard on desktop, Esc / close / backdrop to close.
 * Scroll is locked and focus is trapped while open; pinch zoom is left to the browser.
 */
export function Lightbox({ photos, start, name, onClose }: { photos: MerchPhoto[]; start: number; name: string; onClose: (last: number) => void }) {
  const [i, setI] = useState(start);
  const box = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number; multi: boolean } | null>(null);
  const n = photos.length;
  const iRef = useRef(i);
  iRef.current = i;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  useEffect(() => {
    const el = box.current!;
    const prevOverflow = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    const bar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (bar > 0) document.body.style.paddingRight = `${bar}px`; // no layout shift on desktop
    const opener = document.activeElement as HTMLElement | null;
    el.querySelector<HTMLElement>("[data-lb-close]")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        e.preventDefault();
        onClose(iRef.current);
      } else if (e.key === "ArrowRight" && n > 1) {
        e.stopImmediatePropagation();
        setI((v) => (v + 1) % n);
      } else if (e.key === "ArrowLeft" && n > 1) {
        e.stopImmediatePropagation();
        setI((v) => (v - 1 + n) % n);
      } else if (e.key === "Tab") {
        const f = Array.from(el.querySelectorAll<HTMLElement>("button:not([disabled])"));
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && (document.activeElement === first || !el.contains(document.activeElement))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (document.activeElement === last || !el.contains(document.activeElement))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPad;
      opener?.focus?.({ preventScroll: true });
    };
  }, [n, onClose]);

  const ph = photos[i];
  const label = viewWord(ph);
  const btn = "flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white";

  return createPortal(
    <div
      ref={box}
      role="dialog"
      aria-modal="true"
      aria-label={`${name} photos, enlarged`}
      data-lightbox
      className="fixed inset-0 z-[90] flex flex-col bg-[#0B0B0B] text-white [touch-action:pan-y_pinch-zoom]"
      onClick={(e) => {
        // Anywhere on the dark backdrop closes; the photo itself and the buttons don't.
        if (!(e.target as HTMLElement).closest("button, img")) onClose(i);
      }}
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, multi: e.touches.length > 1 };
      }}
      onTouchMove={(e) => {
        if (touch.current && e.touches.length > 1) touch.current.multi = true;
      }}
      onTouchEnd={(e) => {
        const t = touch.current;
        touch.current = null;
        // Ignore pinches, and swipes while the page is pinch-zoomed in.
        if (!t || t.multi || n < 2 || (window.visualViewport && window.visualViewport.scale > 1.05)) return;
        const dx = e.changedTouches[0].clientX - t.x, dy = e.changedTouches[0].clientY - t.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="flex shrink-0 items-center justify-between gap-3 p-3">
        <p className="min-w-0 truncate pl-2 text-[15px] font-semibold" aria-live="polite">
          <span data-lb-counter>{i + 1} / {n}</span>
          {label && <span className="ml-2 font-normal text-white/75">{label}</span>}
        </p>
        <button type="button" data-lb-close onClick={() => onClose(i)} aria-label="Close enlarged photo" className={btn}>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
      <div className="relative min-h-0 flex-1">
        <div className="pointer-events-none absolute inset-2 sm:inset-x-20 sm:inset-y-4">
          <Image key={ph.src} src={ph.src} alt={ph.alt} fill sizes="(max-width: 1024px) 100vw, 1024px" quality={85} priority className="pointer-events-auto object-contain" />
        </div>
        {n > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${btn} absolute left-3 top-1/2 hidden -translate-y-1/2 sm:flex`}>
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${btn} absolute right-3 top-1/2 hidden -translate-y-1/2 sm:flex`}>
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </>
        )}
      </div>
      {n > 1 && (
        <div className="flex shrink-0 items-center justify-center gap-2 p-3 sm:hidden">
          <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={btn}>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <span className="px-3 text-[13px] text-white/70">Swipe for more</span>
          <button type="button" onClick={() => go(1)} aria-label="Next photo" className={btn}>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      )}
    </div>,
    document.body,
  );
}
