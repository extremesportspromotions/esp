const steps = [
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
    body: "Only after a named coach is found: taster £19, course £49, trip £99, party or group for one sport on one date £79, several sports or venues £129. Fee bands are on the form.",
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
              <p className="mt-2 text-sm leading-relaxed text-[#1C1917]/65">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
