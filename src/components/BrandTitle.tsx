/**
 * Brand header with approved Option A emblem (bigger EXTREME SPORTS PROMOTIONS wordmark).
 * Assets: /public/logo.png (full), /public/icon.png (profile crop / favicon).
 */
import Link from "next/link";
const showLogo = true;

export default function BrandTitle() {
  return (
    <section
      id="top"
      aria-label="Extreme Sports Promotions"
      className="relative overflow-hidden border-b border-white/10 bg-ink"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,16,46,0.18),_transparent_60%),radial-gradient(ellipse_at_top_right,_rgba(26,58,107,0.35),_transparent_50%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[90rem] px-3 py-8 text-center sm:px-4 sm:py-12 lg:px-6 lg:py-14">
        {showLogo ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Extreme Sports Promotions"
              className="mx-auto mb-6 block h-auto w-full max-w-none object-contain"
            />
            <h1 className="sr-only">Extreme Sports Promotions</h1>
          </>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent sm:text-sm">
              United Kingdom
            </p>
            <h1 className="font-display mt-3 text-4xl font-black uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Extreme
              <span className="block text-accent">Sports</span>
              Promotions
            </h1>
          </>
        )}
        <p className="mx-auto mt-5 max-w-xl text-base text-white/70 sm:text-lg">
          Pick a sport → enquire → get matched with a coach for{" "}
          <span className="font-semibold text-accent">£30</span>.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/#enquire"
            className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-accent/30 transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Get matched — £30
          </Link>
          <Link
            href="/#sports"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Browse sports
          </Link>
        </div>
        <p className="mx-auto mt-4 max-w-lg text-xs text-white/45 sm:text-sm">
          Looking for somewhere to train near you?{" "}
          <Link href="/#find-a-club" className="text-white/70 underline-offset-2 hover:text-accent hover:underline">
            Find a club
          </Link>{" "}
          is free to browse. Coach matching is separate.
        </p>
      </div>
    </section>
  );
}
