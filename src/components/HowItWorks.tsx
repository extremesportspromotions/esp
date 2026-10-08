type Step = {
  step: string;
  title: string;
  body: string;
  prices?: { label: string; price: string }[];
};

const steps: Step[] = [
  {
    step: "01",
    title: "Free enquiry",
    body: "Send the form with your sport, level, and goals. Nothing to pay yet — the enquiry is free.",
  },
  {
    step: "02",
    title: "We find a named coach",
    body: "We match you with a UK-based professional coach who fits your goals and schedule.",
  },
  {
    step: "03",
    title: "Pay the match fee",
    body: "The enquiry is free. You pay only after we name a coach.",
    prices: [
      { label: "Experience day", price: "£19" },
      { label: "Become qualified", price: "£49" },
      { label: "Group experience day", price: "£49" },
      { label: "Group qualification", price: "£99" },
    ],
  },
  {
    step: "04",
    title: "We release the contact",
    body: "After payment we share the coach's contact details. The coach or club bills training separately. ESP does not book the lesson.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#EEF4FA]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            How it works
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold text-[#1C1917] sm:text-4xl">
            From enquiry to first session in four clear steps
          </h2>
        </div>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.step}
              className="relative rounded-2xl border border-[#1C1917]/10 bg-surface p-6"
            >
              <span className="font-display text-3xl font-extrabold text-accent/90">
                {s.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-[#1C1917]">{s.title}</h3>
              {s.prices && (
                <dl className="mt-3 divide-y divide-[#1C1917]/10 rounded-xl border border-[#1C1917]/10 bg-[#EEF4FA]/60 text-sm">
                  {s.prices.map((p) => (
                    <div key={p.label} className="flex items-baseline justify-between gap-3 px-3 py-2">
                      <dt className="text-[#1C1917]/75">{p.label}</dt>
                      <dd className="shrink-0 font-semibold tabular-nums text-[#1C1917]">{p.price}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <p className="mt-2 text-sm leading-relaxed text-[#1C1917]/65">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
