/**
 * Brand header with approved Option A emblem (bigger EXTREME SPORTS PROMOTIONS wordmark).
 * Assets: /public/logo.png (full), /public/icon.png (profile crop / favicon).
 * Logo and title render above the carousel; the pick-a-sport line renders below it.
 */
import Link from "next/link";
const showLogo = true;

const sectionClass =
  "relative overflow-hidden border-b border-[#1C1917]/10 bg-[#F6F1EA]";

function Backdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(47,123,255,0.18),_transparent_60%),radial-gradient(ellipse_at_top_right,_rgba(26,58,107,0.35),_transparent_50%)]"
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
            {/* logo.png is 1280×720. The wordmark and title sit in rows 124–558;
                the rest of the canvas is empty black. This window keeps the
                image at full width (same artwork size) and only hides that
                empty canvas. It does not crop the wordmark or the title line. */}
            <div
              className="relative mx-auto w-full overflow-hidden"
              style={{ aspectRatio: "1280 / 458" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Extreme Sports Promotions"
                className="absolute left-0 block h-auto w-full max-w-none"
                style={{ top: `${(-112 / 458) * 100}%` }}
              />
            </div>
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

export function BrandPickLine() {
  return (
    <section aria-label="Get matched with a coach" className={sectionClass}>
      <Backdrop />
      <div className="relative mx-auto max-w-[90rem] px-3 py-8 text-center sm:px-4 sm:py-12 lg:px-6 lg:py-14">
        <p className="mx-auto mt-5 max-w-xl text-base text-[#1C1917]/70 sm:text-lg">
          Pick a sport → enquire → get matched with a coach.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/#enquire"
            className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-accent/30 transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Get matched
          </Link>
        </div>
        <p className="mx-auto mt-4 max-w-lg text-xs text-[#1C1917]/45 sm:text-sm">
          Looking for somewhere to train near you?{" "}
          <Link href="/#find-a-club" className="text-[#1C1917]/70 underline-offset-2 hover:text-accent hover:underline">
            Find a club
          </Link>{" "}
          is free to browse. Coach matching is separate.
        </p>
      </div>
    </section>
  );
}
