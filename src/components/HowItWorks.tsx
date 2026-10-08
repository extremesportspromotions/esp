import MatchFeeTable from "./MatchFeeTable";

type Step = {
  step: string;
  title: string;
  body?: string;
  feeTable?: boolean;
};

const steps: Step[] = [
  {
    step: "01",
    title: "Send an enquiry",
    body: "Send the form with your sport, level and goals.",
  },
  {
    step: "02",
    title: "We find a named coach",
    body: "We match you with a UK-based professional coach who fits your goals.",
  },
  {
    step: "03",
    title: "Pay the match fee",
    feeTable: true,
  },
  {
    step: "04",
    title: "We organise the training programmes",
    body: "The coach or club bills training separately. ESP does not book the lesson.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-28 bg-[#EEF4FA]">
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
              {s.feeTable && (
                <div className="guide-prose prose prose-sm mt-3 max-w-none">
                  <MatchFeeTable />
                </div>
              )}
              {s.body && (
                <p className="mt-2 text-sm leading-relaxed text-[#1C1917]/65">{s.body}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
