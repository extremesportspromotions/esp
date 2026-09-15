const steps = [
  {
    step: "01",
    title: "Tell us your sport",
    body: "Share your interest, experience level, and what you want to achieve.",
  },
  {
    step: "02",
    title: "Get matched",
    body: "We connect you with a professional coach who fits your goals and schedule.",
  },
  {
    step: "03",
    title: "Book & pay the £30 matching fee",
    body: "At this limited early rate, pay £30 for the coach introduction; coach session fees are separate.",
  },
  {
    step: "04",
    title: "Train with a pro",
    body: "Show up ready to progress—with coaching built for safety and real skill gains.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-ink">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            How it works
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">
            From enquiry to first session in four clear steps
          </h2>
        </div>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.step}
              className="relative rounded-2xl border border-white/10 bg-surface p-6"
            >
              <span className="font-display text-3xl font-extrabold text-accent/90">
                {s.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
