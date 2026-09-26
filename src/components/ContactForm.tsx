"use client";

import Link from "next/link";
import { FormEvent, useEffect, useId, useMemo, useState } from "react";
import { sports } from "@/data/sports";
import { ENQUIRY_EMAIL, ENQUIRY_ENDPOINT } from "@/lib/site";

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

const UNDER_18 = "under-18";

const UNDER_18_NOTE =
  "Under 18? You'll need a parent or guardian's consent, and they must travel with you to the club.";

const TRAVEL_OPTIONS = [
  { value: "local", label: "Local only" },
  { value: "25-miles", label: "Up to 25 miles" },
  { value: "50-miles", label: "Up to 50 miles" },
  { value: "100-miles", label: "Up to 100 miles" },
  { value: "anywhere-uk", label: "Anywhere in the UK" },
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
  guardianConsent: boolean;
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
  guardianConsent: false,
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

type SendStatus = "idle" | "sending" | "success" | "error";

const SEND_TIMEOUT_MS = 20000;

/**
 * Email subject for every enquiry, e.g. "New ESP enquiry — Surfing". Used by the
 * form (FormSubmit's _subject) and by the "email us" mailto links, so emails
 * from either route arrive with the same subject.
 */
function enquirySubject(sportId: string): string {
  const sportName = sports.find((s) => s.id === sportId)?.name;
  return sportName ? `New ESP enquiry — ${sportName}` : "New ESP enquiry";
}

function enquiryMailto(sportId: string): string {
  return `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(enquirySubject(sportId))}`;
}

function labelFor(
  options: readonly { value: string; label: string }[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

/**
 * Every quiz answer, with human-readable labels, as sent to ESP's inbox via
 * FormSubmit (https://formsubmit.co). Keys starting with "_" are FormSubmit
 * settings rather than form answers.
 */
function buildPayload(values: QuizState, honey: string) {
  const sportName = sports.find((s) => s.id === values.sport)?.name ?? values.sport;
  const pageUrl = typeof window === "undefined" ? "" : window.location.href;
  return {
    _subject: enquirySubject(values.sport),
    _replyto: values.email.trim(),
    _template: "table",
    _captcha: "false",
    _url: pageUrl,
    _honey: honey,
    Name: values.name.trim(),
    Email: values.email.trim(),
    Sport: sportName,
    Level: labelFor(LEVELS, values.level),
    Goal: values.goal.trim() || "—",
    "Age band": labelFor(AGE_BANDS, values.ageBand),
    "Parent / guardian consent (under 18s)":
      values.ageBand === UNDER_18
        ? values.guardianConsent
          ? "Yes — confirmed a parent or guardian consents and will travel with them"
          : "No"
        : "Not applicable (18 or over)",
    "Injuries or conditions": values.healthNote.trim() || "—",
    "Town / city": values.location.trim(),
    "How far they will travel": labelFor(TRAVEL_OPTIONS, values.travel),
    "Booking type": labelFor(BOOKING_TYPES, values.bookingType),
    "Understands the risks": values.riskAck ? "Yes" : "No",
    "Sent from": pageUrl,
  };
}

const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";

const chipBase =
  "rounded-full border px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const chipIdle = "border-white/20 bg-white/5 text-white hover:border-accent/60 hover:text-accent";
const chipActive = "border-accent bg-accent text-white shadow-md shadow-accent/20";

function isStepValid(step: number, values: QuizState): boolean {
  switch (step) {
    case 1:
      return Boolean(values.sport);
    case 2:
      return Boolean(values.level);
    case 3:
      return (
        Boolean(values.ageBand) &&
        (values.ageBand !== UNDER_18 || values.guardianConsent)
      );
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

  // Deep links such as /?sport=skydiving#enquire (used by the Guides pages)
  // pre-select that sport in step 1.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("sport");
    if (requested && sports.some((s) => s.id === requested)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValues((v) => (v.sport ? v : { ...v, sport: requested }));
    }
  }, []);
  const [status, setStatus] = useState<SendStatus>("idle");
  const [honey, setHoney] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const submitted = status === "success";
  const sending = status === "sending";

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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (!isStepValid(3, values) || !isStepValid(6, values)) {
      setEmailTouched(true);
      return;
    }
    // Honeypot: real people never see or fill this field, so quietly
    // pretend it worked for bots without sending anything.
    if (honey.trim()) {
      setStatus("success");
      return;
    }

    setStatus("sending");
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
    try {
      const res = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(buildPayload(values, honey)),
        signal: controller.signal,
      });
      const data: unknown = await res.json().catch(() => null);
      const success =
        typeof data === "object" && data !== null && "success" in data
          ? String((data as { success: unknown }).success) === "true"
          : false;
      setStatus(res.ok && success ? "success" : "error");
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timer);
    }
  };

  const resetQuiz = () => {
    setStatus("idle");
    setValues(initial);
    setHoney("");
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
            coach. Takes about a minute. Our matching fee is £29.99 to find and
            introduce you to the right coach; coach session fees are separate.
            You won&apos;t be charged anything by sending this form — payment
            is the final step, once we&apos;ve found your coach.
          </p>
          <p className="mt-3 rounded-lg border border-accent/25 bg-accent/10 px-4 py-3 text-sm text-white/75">
            <span className="font-semibold text-accent">Find a coach</span>{" "}
            = send a free enquiry below, then get matched — £29.99. Not looking
            for a coach?{" "}
            <a
              href="#find-a-club"
              className="font-semibold text-white underline-offset-2 hover:underline"
            >
              Browse clubs near you
            </a>{" "}
            instead — free, no matching fee.
          </p>
          <p className="mt-4 text-sm text-white/50">
            Prefer email?{" "}
            <a
              href={enquiryMailto(values.sport)}
              className="text-accent underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {ENQUIRY_EMAIL}
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
                Your enquiry has been sent
                {values.name.trim() ? `, ${values.name.trim()}` : ""}. A member
                of the ESP team will reply by email shortly. You haven&apos;t been
                charged anything.
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
            <form
              onSubmit={onSubmit}
              noValidate
              aria-busy={sending}
              className="flex flex-col gap-6"
            >
              {/* Honeypot for spam bots: hidden from people and screen readers. */}
              <div
                aria-hidden="true"
                className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
              >
                <label htmlFor="_honey">Leave this field empty</label>
                <input
                  id="_honey"
                  name="_honey"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                />
              </div>
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
                    {values.ageBand === UNDER_18 && (
                      <div className="space-y-3 rounded-xl border border-accent/40 bg-accent/10 p-4">
                        <p
                          id="under-18-note"
                          className="text-sm font-medium leading-relaxed text-white"
                        >
                          {UNDER_18_NOTE}
                        </p>
                        <label className="flex cursor-pointer items-start gap-3 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent">
                          <input
                            type="checkbox"
                            name="guardianConsent"
                            required
                            aria-describedby="under-18-note"
                            checked={values.guardianConsent}
                            onChange={(e) =>
                              setField("guardianConsent", e.target.checked)
                            }
                            className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-white/5 text-accent accent-accent focus:ring-2 focus:ring-accent/40"
                          />
                          <span className="text-sm font-medium text-white">
                            My parent or guardian consents to this enquiry and
                            will travel with me to the club{" "}
                            <span className="font-normal text-white/60">
                              (required for under 18s)
                            </span>
                          </span>
                        </label>
                      </div>
                    )}
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

                    <div id="fee-note" className="space-y-2 text-sm text-white/55">
                      <p>
                        Our matching fee is £29.99 to find and introduce you to
                        the right coach; coach session fees are separate.
                      </p>
                      <p>
                        You won&apos;t be charged anything by sending this form
                        — payment is the final step, once we&apos;ve found your
                        coach.
                      </p>
                      <p>All our coaches are UK-based.</p>
                      <p>{UNDER_18_NOTE}</p>
                    </div>
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
                      className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-accent"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!canContinue || sending}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-accent"
                    >
                      {sending && (
                        <span
                          className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                          aria-hidden
                        />
                      )}
                      {sending ? "Sending…" : "Send enquiry"}
                    </button>
                  )}
                </div>
              </div>

              {step === TOTAL_STEPS && (
                <div className="-mt-2 space-y-3">
                  {sending && (
                    <p role="status" className="text-sm text-white/70">
                      Sending your enquiry…
                    </p>
                  )}
                  {status === "error" && (
                    <div
                      role="alert"
                      className="rounded-xl border border-flame/50 bg-flame/10 px-4 py-3 text-sm leading-relaxed text-white"
                    >
                      <p className="font-semibold text-flame">
                        Sorry, your enquiry didn&apos;t send.
                      </p>
                      <p className="mt-1 text-white/80">
                        Please try again, or email us directly at{" "}
                        <a
                          href={enquiryMailto(values.sport)}
                          className="font-semibold text-accent underline underline-offset-2"
                        >
                          {ENQUIRY_EMAIL}
                        </a>
                        .
                      </p>
                    </div>
                  )}
                  <p className="text-xs leading-relaxed text-white/50">
                    We&apos;ll only use your details to reply to your enquiry.
                    See our{" "}
                    <Link
                      href="/privacy"
                      className="font-semibold text-accent underline-offset-2 hover:underline"
                    >
                      privacy notice
                    </Link>
                    .
                  </p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
