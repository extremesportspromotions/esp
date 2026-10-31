/**
 * Brand header with approved Option A emblem (bigger EXTREME SPORTS PROMOTIONS wordmark).
 * Assets: /public/logo.png (full), /public/icon.png (32px app icon); app icons in /public (apple-touch-icon, icon-192/512, favicon-32).
 * Logo and title render above the carousel; the pick-a-sport line renders below it.
 */
import Link from "next/link";
const showLogo = true;

const sectionClass =
  "relative overflow-hidden border-b border-[#1C1917]/10 bg-[#F6EFE3]";

function Backdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(143,163,130,0.22),_transparent_60%),radial-gradient(ellipse_at_top_right,_rgba(201,169,106,0.18),_transparent_50%)]"
      aria-hidden
    />
  );
}

export function BrandLogo() {
  return (
    <section
      id="top"
      aria-label="Extreme Sports Promotions"
      className={sectionClass}
    >
      <Backdrop />
      <div className="relative mx-auto max-w-[90rem] px-3 pt-2 pb-1 text-center sm:px-4 sm:pt-2 sm:pb-1 lg:px-6 lg:pt-3 lg:pb-1">
        {showLogo ? (
          <>
            {/* logo.png is the 1200×630 navy stag ESP logo.
                Show the full artwork at natural aspect — no crop window. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Extreme Sports Promotions"
              className="mx-auto block h-auto w-full"
            />
            <h1 className="sr-only">Extreme Sports Promotions</h1>
          </>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent sm:text-sm">
              United Kingdom
            </p>
            <h1 className="font-display mt-3 text-4xl font-black uppercase leading-[0.95] tracking-[0.06em] text-[#1C1917] sm:text-6xl md:text-7xl lg:text-8xl">
              Extreme
              <span className="block text-accent">Sports</span>
              Promotions
            </h1>
          </>
        )}
      </div>
    </section>
  );
}

const icons = [
  { title: "UK-wide", text: "Coaches and clubs across the country.", d: "M2 20 8 9l4 6 3-4 7 9z M15 6a2 2 0 1 0 0-.01" },
  { title: "Expert coaches", text: "Matched to your sport and level.", d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 3.6-7 8-7s8 3 8 7" },
  { title: "Practical guides", text: "Plain advice for every level.", d: "M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1z M12 6v14" },
];

export function BrandPickLine() {
  return (
    <section aria-label="Get matched with a coach" className="border-b border-[#1C1917]/10 bg-[#F6EFE3]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <ul className="grid gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[#C9A96A]/40">
          {icons.map((i) => (
            <li key={i.title} className="flex items-start gap-4 sm:justify-center sm:px-6">
              <svg viewBox="0 0 24 24" className="h-9 w-9 flex-none text-[#4E6B4F]" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={i.d} />
              </svg>
              <span>
                <span className="block text-xs tracking-[0.22em] text-[#0E2141]">{i.title.toUpperCase()}</span>
                <span className="font-serif mt-1 block text-lg text-[#1C1917]/80">{i.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-14 text-center">
          <p className="font-serif mx-auto max-w-xl text-2xl text-[#0E2141] sm:text-3xl">
            Pick a sport → enquire → get matched with a coach.
          </p>
          <Link
            href="/#how-it-works"
            className="mt-7 inline-flex items-center justify-center bg-[#0E2141] px-8 py-3.5 text-sm tracking-[0.2em] text-[#F6EFE3] transition hover:bg-[#4E6B4F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96A]"
          >
            How it works
          </Link>
          <p className="mx-auto mt-5 max-w-lg text-sm text-[#1C1917]/60">
            Looking for somewhere to train near you?{" "}
            <Link href="/#find-a-club" className="text-[#1C1917]/80 underline underline-offset-2 hover:text-[#4E6B4F]">
              Find a club
            </Link>{" "}
            on the map.
          </p>
        </div>
      </div>
    </section>
  );
}
