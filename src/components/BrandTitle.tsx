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
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent sm:text-sm">
          United Kingdom
        </p>
        <h1 className="font-display mt-3 text-4xl font-black uppercase leading-[0.95] tracking-[0.06em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Extreme
          <span className="block text-accent">Sports</span>
          Promotions
        </h1>
      </div>
    </section>
  );
}
