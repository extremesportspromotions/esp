"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { sports } from "@/data/sports";

const SWIPE_THRESHOLD = 50;

export default function SportsCarousel() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const goTo = useCallback((i: number) => {
    setIndex(((i % sports.length) + sports.length) % sports.length);
  }, []);

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const onPointerDown = (e: React.PointerEvent) => {
    touchStartX.current = e.clientX;
    touchDeltaX.current = 0;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.clientX - touchStartX.current;
    setDragOffset(touchDeltaX.current);
  };

  const endDrag = () => {
    if (touchStartX.current === null) return;
    const dx = touchDeltaX.current;
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setIsDragging(false);
    setDragOffset(0);
    if (dx > SWIPE_THRESHOLD) prev();
    else if (dx < -SWIPE_THRESHOLD) next();
  };

  const sport = sports[index];

  return (
    <section
      id="sports"
      aria-roledescription="carousel"
      aria-label="Extreme sports"
      className="relative overflow-hidden bg-ink"
    >
      <div className="mx-auto max-w-7xl px-3 py-12 sm:px-6 sm:py-16 lg:px-8 lg:max-w-[90rem]">
        <div className="mb-7 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Featured sports
            </p>
            <h2 className="font-display mt-1 text-3xl font-bold text-white sm:text-5xl">
              Find your next adrenaline hit
            </h2>
          </div>
          <p className="text-sm text-white/60 sm:text-base" aria-live="polite">
            {index + 1} / {sports.length}
          </p>
        </div>

        <div
          className="relative touch-pan-y select-none overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl shadow-black/40 sm:rounded-3xl"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          role="group"
          aria-roledescription="slide"
          aria-label={`${sport.name}: ${sport.description}`}
        >
          <div
            className="relative aspect-[4/3] min-h-[52vh] w-full sm:aspect-[16/9] sm:min-h-[60vh] lg:min-h-[68vh]"
            style={{
              transform: `translateX(${dragOffset * 0.35}px)`,
              transition: isDragging ? "none" : "transform 280ms ease-out",
            }}
          >
            <Image
              src={sport.image}
              alt={sport.alt}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1440px"
              className="object-cover brightness-[1.1] contrast-[1.02] saturate-[1.04]"
              style={{ objectPosition: sport.imagePosition ?? "50% 50%" }}
              draggable={false}
            />
            {/* Minimal bottom scrim — photos stay close to originals */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-black/40 via-black/12 to-transparent"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12">
              <h3 className="font-display text-3xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-6xl">
                {sport.name}
              </h3>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)] sm:mt-4 sm:text-lg lg:text-xl">
                {sport.description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={prev}
            aria-label="Previous sport"
            className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:left-5 sm:h-14 sm:w-14"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next sport"
            className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:right-5 sm:h-14 sm:w-14"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div
          className="mt-6 flex flex-wrap justify-center gap-2.5"
          role="tablist"
          aria-label="Choose a sport"
        >
          {sports.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${s.name}`}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                i === index
                  ? "w-9 bg-accent"
                  : "w-2.5 bg-white/30 hover:bg-white/55"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
