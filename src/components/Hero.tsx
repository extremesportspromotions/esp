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
            UK-based coaches
          </p>
          <h2
            id="hero-heading"
            className="font-display mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Train with the pros who live for the edge
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            Extreme Sports Promotions matches you with a professional
            extreme-sports coach.
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
            <span className="font-semibold text-white/75">Find a coach</span>{" "}
            = send a free enquiry below, then get matched.{" "}
            <span className="font-semibold text-white/75">Find a club</span>{" "}
            = browse centres and parks near you — free, no booking.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#enquire"
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-accent/25 transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Get matched
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
