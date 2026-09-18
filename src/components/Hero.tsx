export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-ink"
      aria-labelledby="hero-heading"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,214,10,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(255,69,0,0.22),_transparent_50%)]"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 sm:py-24 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            Limited early rate · £30 matching fee
          </p>
          <h2
            id="hero-heading"
            className="font-display mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Train with the pros who live for the edge
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            Extreme Sports Promotions finds and introduces you to a
            professional extreme-sports coach for a limited early matching fee of
            £30. Coach session fees are separate.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#enquire"
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-accent/25 transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Find your coach — £30
            </a>
            <a
              href="#sports"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Browse sports
            </a>
          </div>
        </div>
        <aside className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            At a glance
          </p>
          <dl className="mt-4 space-y-4">
            <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
              <dt className="text-white/60">Sports featured</dt>
              <dd className="font-display text-2xl font-bold text-white">15</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
              <dt className="text-white/60">Early rate</dt>
              <dd className="text-right font-semibold text-white">
                £30 matching fee
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-white/60">For</dt>
              <dd className="text-right font-semibold text-white">
                Students &amp; athletes
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
