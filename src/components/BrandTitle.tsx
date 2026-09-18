/**
 * Wordmark / brand title.
 * Optional logo: drop a file at /public/logo.svg and set showLogo = true below
 * (or leave the conditional — if the file is missing, Next/img will 404, so keep
 * showLogo false until the asset exists).
 */
const showLogo = false; // set true when /public/logo.svg is added

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
      <div className="relative mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 sm:py-14 lg:py-16">
        {/* Logo slot — add public/logo.svg then flip showLogo */}
        {showLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/logo.svg"
            alt="Extreme Sports Promotions"
            className="mx-auto mb-4 h-12 w-auto sm:h-14"
          />
        ) : null}
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent sm:text-sm">
          United Kingdom
        </p>
        <h1 className="font-display mt-3 text-4xl font-black uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Extreme
          <span className="block text-accent">Sports</span>
          Promotions
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-white/70 sm:text-lg">
          Pick a sport → enquire → get matched with a coach for{" "}
          <span className="font-semibold text-accent">£30</span>.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#enquire"
            className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-accent/30 transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Get matched — £30
          </a>
          <a
            href="#sports"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Browse sports
          </a>
        </div>
        <p className="mx-auto mt-4 max-w-lg text-xs text-white/45 sm:text-sm">
          Looking for somewhere to train near you?{" "}
          <a href="#find-a-club" className="text-white/70 underline-offset-2 hover:text-accent hover:underline">
            Find a club
          </a>{" "}
          is free to browse. Coach matching is separate.
        </p>
      </div>
    </section>
  );
}
