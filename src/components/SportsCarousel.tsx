"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { carouselSports as sports } from "@/data/sports";

/**
 * Full-screen home hero: crossfades sport to sport every 5.5 s.
 * Existing clips and photos only. object-cover gives a portrait crop on phones.
 * Pauses for prefers-reduced-motion, on hover/focus and when the tab is hidden.
 */
const INTERVAL = 5500;
const SWIPE = 50;

function poster(s: (typeof sports)[number]) {
  if (s.image) return s.image;
  if (s.video) return s.video.replace("/carousel-clips/", "/carousel-clips/posters/").replace(/\.mp4$/, ".jpg");
  return undefined;
}

export default function SportsCarousel() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);

  const goTo = useCallback((i: number) => setIndex(((i % sports.length) + sports.length) % sports.length), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const t = setTimeout(() => goTo(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, reduced, paused, goTo]);

  // Only the visible clip plays; the rest stay paused (saves data on phones).
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === index && !reduced) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [index, reduced]);

  const sport = sports[index];

  return (
    <section
      id="sports"
      aria-roledescription="carousel"
      aria-label="Extreme sports"
      className="relative h-[calc(100svh-6.5rem)] min-h-[30rem] w-full touch-pan-y select-none overflow-hidden bg-[#0E2141] lg:h-[calc(100svh-4.5rem)]"
      onPointerDown={(e) => { startX.current = e.clientX; }}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (dx > SWIPE) goTo(index - 1);
        else if (dx < -SWIPE) goTo(index + 1);
      }}
      onPointerCancel={() => { startX.current = null; }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {sports.map((s, i) => {
        const active = i === index;
        const near = active || i === (index + 1) % sports.length;
        return (
          <div
            key={s.id}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none ${active ? "opacity-100" : "opacity-0"}`}
          >
            {s.video ? (
              <video
                ref={(el) => { videos.current[i] = el; }}
                src={near ? s.video : undefined}
                poster={poster(s)}
                muted
                loop
                playsInline
                autoPlay={i === 0}
                preload={active ? "auto" : "none"}
                aria-label={s.alt}
                style={s.videoPosition ? { objectPosition: s.videoPosition } : undefined}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={s.image}
                alt={s.alt}
                loading={i === 0 ? "eager" : "lazy"}
                style={s.imagePosition ? { objectPosition: s.imagePosition } : undefined}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
            )}
          </div>
        );
      })}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E2141]/85 via-[#0E2141]/25 to-[#0E2141]/30" aria-hidden />

      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10">
        <p className="text-xs tracking-[0.3em] text-[#E3CD98] sm:text-sm">EXTREME SPORTS COACHING, UK-WIDE</p>
        <span className="mt-3 block h-px w-16 bg-[#C9A96A]" aria-hidden />
        <h1 className="sr-only">Extreme Sports Promotions</h1>
        <h2 key={sport.id} className="font-serif mt-4 text-5xl font-medium leading-[1.02] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)] sm:text-7xl lg:text-8xl" aria-live="polite">
          {sport.name}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">{sport.description}</p>
        {sport.notice ? (
          <p className="mt-3 max-w-2xl rounded-md border border-white/25 bg-black/25 px-3 py-2 text-sm text-white">{sport.notice}</p>
        ) : null}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/#how-it-works"
            className="inline-flex items-center gap-3 border border-white/80 px-6 py-3 text-sm tracking-[0.2em] text-white transition hover:bg-white hover:text-[#0E2141] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96A]"
          >
            Find a coach <span aria-hidden>→</span>
          </Link>
          <Link href={sport.guide} className="text-sm text-white/90 underline decoration-white/50 underline-offset-4 hover:text-[#E3CD98]">
            Read the {sport.name} guide
          </Link>
        </div>
        {sport.credit ? <p className="mt-3 text-xs text-white/60">Credit: {sport.credit}</p> : null}
      </div>

      <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2 px-4" role="tablist" aria-label="Choose a sport">
        {sports.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${s.name}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96A] ${i === index ? "w-7 bg-[#C9A96A]" : "w-2 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </section>
  );
}
