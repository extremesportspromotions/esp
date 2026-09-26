/**
 * Testimonials / Trust section
 * ----------------------------
 * PLACEHOLDER quotes only — replace with real customer/coach quotes when Matthew
 * provides them. Keep attribution short and editable.
 */
export default function Testimonials() {
  // SAMPLE / EDITABLE — swap these for real quotes + names when available
  const quotes = [
    {
      text: "ESP matched me with a local climbing coach in under a week. Clear process, fair fee.",
      attribution: "Alex R. — beginner climber (sample quote)",
    },
    {
      text: "I knew the sport I wanted; I just needed someone qualified to teach it safely. The £29.99 match was straightforward.",
      attribution: "Jordan M. — scuba intro (sample quote)",
    },
    {
      text: "As a coach, the introductions have been serious enquiries — not tire-kickers.",
      attribution: "Sam T. — skate coach (sample quote)",
    },
  ] as const;

  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="border-y border-white/10 bg-ink"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Trust
          </p>
          <h2
            id="trust-heading"
            className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl"
          >
            What people say
          </h2>
          <p className="mt-3 text-sm text-white/50">
            Sample quotes for layout — replace with real testimonials when ready.
          </p>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {quotes.map((q) => (
            <li
              key={q.attribution}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <p className="flex-1 text-base leading-relaxed text-white/85">
                &ldquo;{q.text}&rdquo;
              </p>
              <p className="mt-4 text-sm font-medium text-accent/90">
                {q.attribution}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
