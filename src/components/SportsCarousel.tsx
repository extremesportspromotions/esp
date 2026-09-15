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
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Featured sports
            </p>
            <h2 className="font-display mt-1 text-3xl font-bold text-white sm:text-4xl">
              Find your next adrenaline hit
            </h2>
          </div>
          <p className="text-sm text-white/60" aria-live="polite">
            {index + 1} / {sports.length}
          </p>
        </div>

        <div
          className="relative touch-pan-y select-none overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl shadow-black/40"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          role="group"
          aria-roledescription="slide"
          aria-label={`${sport.name}: ${sport.description}`}
        >
          <div
            className="relative aspect-[16/10] w-full sm:aspect-[21/9]"
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
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <h3 className="font-display text-2xl font-bold text-white sm:text-4xl">
                {sport.name}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                {sport.description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={prev}
            aria-label="Previous sport"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-accent hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:left-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
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
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-accent hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:right-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
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
          className="mt-5 flex flex-wrap justify-center gap-2"
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
                  ? "w-8 bg-accent"
                  : "w-2.5 bg-white/30 hover:bg-white/55"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
