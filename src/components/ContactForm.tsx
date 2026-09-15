"use client";

import { FormEvent, useId, useMemo, useState } from "react";
import { sports } from "@/data/sports";

const TOTAL_STEPS = 6;

const LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
] as const;

const AGE_BANDS = [
  { value: "under-18", label: "Under 18" },
  { value: "18-24", label: "18–24" },
  { value: "25-34", label: "25–34" },
  { value: "35-44", label: "35–44" },
  { value: "45-54", label: "45–54" },
  { value: "55-plus", label: "55+" },
] as const;

const TRAVEL_OPTIONS = [
  { value: "local", label: "Local only" },
  { value: "25-miles", label: "Up to 25 miles" },
  { value: "50-miles", label: "Up to 50 miles" },
  { value: "further", label: "Happy to travel further" },
  { value: "overseas", label: "Overseas OK" },
] as const;

const BOOKING_TYPES = [
  { value: "solo", label: "Solo" },
  { value: "group", label: "Group" },
  { value: "party", label: "Party" },
  { value: "office", label: "Office booking" },
  { value: "education", label: "Education trip" },
] as const;

type QuizState = {
  sport: string;
  level: string;
  goal: string;
  ageBand: string;
  healthNote: string;
  location: string;
  travel: string;
  bookingType: string;
  riskAck: boolean;
  name: string;
  email: string;
};

const initial: QuizState = {
  sport: "",
  level: "",
  goal: "",
  ageBand: "",
  healthNote: "",
  location: "",
  travel: "",
  bookingType: "",
  riskAck: false,
  name: "",
  email: "",
};

const STEP_TITLES = [
  "Sport",
  "Level & goal",
  "About you",
  "Location",
  "Booking type",
  "Safety + contact",
] as const;

const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";

const chipBase =
  "rounded-full border px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const chipIdle = "border-white/20 bg-white/5 text-white hover:border-accent/60 hover:text-accent";
const chipActive = "border-accent bg-accent text-ink shadow-md shadow-accent/20";

function isStepValid(step: number, values: QuizState): boolean {
  switch (step) {
    case 1:
      return Boolean(values.sport);
    case 2:
      return Boolean(values.level);
    case 3:
      return Boolean(values.ageBand);
    case 4:
      return Boolean(values.location.trim() && values.travel);
    case 5:
      return Boolean(values.bookingType);
    case 6:
      return (
        values.riskAck &&
        Boolean(values.name.trim()) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
      );
    default:
      return false;
  }
}

function ChipGroup({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-white">{legend}</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={legend}>
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt.value)}
              className={`${chipBase} ${selected ? chipActive : chipIdle}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      <input type="hidden" name={name} value={value} />
    </fieldset>
  );
}

export default function ContactForm() {
  const progressId = useId();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<QuizState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const progressPct = useMemo(
    () => Math.round((step / TOTAL_STEPS) * 100),
    [step],
  );

  const canContinue = isStepValid(step, values);
  const emailInvalid =
    emailTouched &&
    values.email.trim().length > 0 &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim());

  const setField = <K extends keyof QuizState>(key: K, value: QuizState[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const goBack = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  const goNext = () => {
    if (!canContinue) return;
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isStepValid(6, values)) {
      setEmailTouched(true);
      return;
    }
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setSubmitted(false);
    setValues(initial);
    setStep(1);
    setEmailTouched(false);
  };

  return (
    <section id="enquire" className="bg-gradient-to-b from-ink to-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Enquire
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">
            Ready to train with a pro?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            Answer a few quick questions so we can match you with the right
            coach. Takes about a minute. The limited early matching fee is £30;
            coach session fees are separate.
          </p>
          <p className="mt-4 text-sm text-white/50">
            Prefer email?{" "}
            <a
              href="mailto:hello@extremesportspromotions.com?subject=ESP%20Enquiry"
              className="text-accent underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              hello@extremesportspromotions.com
            </a>
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-ink/60 p-6 shadow-xl shadow-black/30 backdrop-blur sm:p-8">
          {submitted ? (
            <div
              role="status"
              className="flex min-h-[320px] flex-col items-start justify-center gap-3"
            >
              <p className="font-display text-2xl font-bold text-accent">
                Thanks — we&apos;ll be in touch!
              </p>
              <p className="text-white/75">
                We received your enquiry
                {values.name.trim() ? `, ${values.name.trim()}` : ""}. A member
                of the ESP team will reach out shortly.
              </p>
              <button
                type="button"
                onClick={resetQuiz}
                className="mt-2 text-sm font-semibold text-accent underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Start another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <p
                    id={progressId}
                    className="text-sm font-semibold text-white/80"
                    aria-live="polite"
                  >
                    Step {step} of {TOTAL_STEPS}
                    <span className="ml-2 font-normal text-white/50">
                      · {STEP_TITLES[step - 1]}
                    </span>
                  </p>
                  <p className="text-xs font-medium text-white/40" aria-hidden>
                    {progressPct}%
                  </p>
                </div>
                <div
                  className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"
                  role="progressbar"
                  aria-valuemin={1}
                  aria-valuemax={TOTAL_STEPS}
                  aria-valuenow={step}
                  aria-labelledby={progressId}
                >
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-300 ease-out"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              <div className="min-h-[220px]">
                {step === 1 && (
                  <fieldset>
                    <legend className="mb-1 font-display text-xl font-bold text-white">
                      Which sport?
                    </legend>
                    <p className="mb-4 text-sm text-white/60">
                      Pick the sport you want to train in.
                    </p>
                    <div
                      className="grid grid-cols-2 gap-2 sm:grid-cols-3"
                      role="radiogroup"
                      aria-label="Sport"
                    >
                      {sports.map((s) => {
                        const selected = values.sport === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => setField("sport", s.id)}
                            className={`rounded-xl border px-3 py-3 text-left text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                              selected
                                ? "border-accent bg-accent/15 text-accent"
                                : "border-white/15 bg-white/5 text-white hover:border-accent/50"
                            }`}
                          >
                            {s.name}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        Level &amp; goal
                      </h3>
                      <p className="mt-1 text-sm text-white/60">
                        Where are you starting, and what do you want to achieve?
                      </p>
                    </div>
                    <ChipGroup
                      legend="Your level"
                      name="level"
                      options={LEVELS}
                      value={values.level}
                      onChange={(v) => setField("level", v)}
                    />
                    <div>
                      <label
                        htmlFor="goal"
                        className="mb-1.5 block text-sm font-medium text-white"
                      >
                        Short goal{" "}
                        <span className="font-normal text-white/45">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="goal"
                        name="goal"
                        type="text"
                        maxLength={120}
                        value={values.goal}
                        onChange={(e) => setField("goal", e.target.value)}
                        className={fieldClass}
                        placeholder="e.g. first reef dive, park jumps, alpine intro…"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        About you
                      </h3>
                      <p className="mt-1 text-sm text-white/60">
                        Helps us match an appropriate coach — not a medical form.
                      </p>
                    </div>
                    <ChipGroup
                      legend="Age band"
                      name="ageBand"
                      options={AGE_BANDS}
                      value={values.ageBand}
                      onChange={(v) => setField("ageBand", v)}
                    />
                    <div>
                      <label
                        htmlFor="healthNote"
                        className="mb-1.5 block text-sm font-medium text-white"
                      >
                        Any injuries or conditions a coach should know?{" "}
                        <span className="font-normal text-white/45">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="healthNote"
                        name="healthNote"
                        rows={3}
                        maxLength={400}
                        value={values.healthNote}
                        onChange={(e) => setField("healthNote", e.target.value)}
                        className={`${fieldClass} resize-y`}
                        placeholder="e.g. previous knee injury, asthma — leave blank if none"
                      />
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        Location
                      </h3>
                      <p className="mt-1 text-sm text-white/60">
                        Where should we look for coaches?
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="location"
                        className="mb-1.5 block text-sm font-medium text-white"
                      >
                        Town / city
                      </label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        autoComplete="address-level2"
                        value={values.location}
                        onChange={(e) => setField("location", e.target.value)}
                        className={fieldClass}
                        placeholder="e.g. Brighton, Manchester, Snowdonia…"
                      />
                    </div>
                    <ChipGroup
                      legend="How far will you travel?"
                      name="travel"
                      options={TRAVEL_OPTIONS}
                      value={values.travel}
                      onChange={(v) => setField("travel", v)}
                    />
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        Booking type
                      </h3>
                      <p className="mt-1 text-sm text-white/60">
                        Who is this session for?
                      </p>
                    </div>
                    <ChipGroup
                      legend="Booking type"
                      name="bookingType"
                      options={BOOKING_TYPES}
                      value={values.bookingType}
                      onChange={(v) => setField("bookingType", v)}
                    />
                  </div>
                )}

                {step === 6 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        Safety + contact
                      </h3>
                      <p className="mt-1 text-sm text-white/60">
                        Almost done — confirm you understand the risks, then leave
                        your details.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/75">
                      <p>
                        Extreme sports carry inherent risk of injury. Training with
                        a professional coach does not remove that risk, but it
                        helps you learn safer technique, use proper gear, and
                        progress at a pace that fits your level.
                      </p>
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/15 bg-white/[0.03] p-4 transition hover:border-accent/40 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent">
                      <input
                        type="checkbox"
                        name="riskAck"
                        checked={values.riskAck}
                        onChange={(e) => setField("riskAck", e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-white/5 text-accent accent-accent focus:ring-2 focus:ring-accent/40"
                      />
                      <span className="text-sm font-medium text-white">
                        I understand the risks and want a professional coach
                      </span>
                    </label>

                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-medium text-white"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={(e) => setField("name", e.target.value)}
                        className={fieldClass}
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium text-white"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) => setField("email", e.target.value)}
                        onBlur={() => setEmailTouched(true)}
                        aria-invalid={emailInvalid}
                        aria-describedby={
                          emailInvalid ? "email-error" : "fee-note"
                        }
                        className={fieldClass}
                        placeholder="you@example.com"
                      />
                      {emailInvalid && (
                        <p id="email-error" className="mt-1.5 text-sm text-flame">
                          Enter a valid email address.
                        </p>
                      )}
                    </div>

                    <p id="fee-note" className="text-sm text-white/55">
                      Limited early matching fee:{" "}
                      <span className="font-semibold text-accent">£30</span>.
                      Coach session fees are separate.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Back
                  </button>
                ) : (
                  <span className="hidden sm:block sm:w-[88px]" aria-hidden />
                )}

                <div className="ml-auto">
                  {step < TOTAL_STEPS ? (
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={!canContinue}
                      className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-accent"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!canContinue}
                      className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-accent"
                    >
                      Submit — £30 matching fee
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
