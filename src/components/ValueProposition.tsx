export default function ValueProposition() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-ink via-surface to-ink"
    >
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-navy/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Why ESP
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">
            Match with pro coaches. Pay a clear fee. Own the drop.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
            Extreme Sports Promotions connects students with professional
            extreme-sports coaches. Our limited early matching fee is £30 to find
            and introduce you to the right coach; coach session fees are separate.
          </p>
          <ul className="mt-6 space-y-3 text-white/80">
            {[
              "Curated coaches across land, air, and water sports",
              "£30 limited early matching fee — no endless browsing",
              "Coach session fees are separate from the £30 matching fee",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white"
                  aria-hidden
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="#enquire"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-accent/30 transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Find your coach — £30
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Pro-verified coaches",
              body: "We screen instructors for credentials, experience, and teaching clarity.",
            },
            {
              title: "£30 early matching fee",
              body: "A limited early rate to find and introduce you to a coach; session fees are separate.",
            },
            {
              title: "Student-first",
              body: "Built around learners who want structured progress—not guesswork.",
            },
            {
              title: "15+ disciplines",
              body: "From mountaineering to hang gliding, find the right coach for you.",
            },
          ].map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-accent/40"
            >
              <h3 className="font-display text-lg font-semibold text-white">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
