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

const CALL_TIMES = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "any", label: "Any time" },
] as const;

const PHONE_ERROR = "Please enter a UK phone number, e.g. 07700 900123";

/**
 * UK phone numbers: 07 mobiles (11 digits), 01/02 landlines (10 or 11 digits)
 * and 03 numbers (11 digits), written with 0 or +44 (also +44 (0)…).
 * Spaces, dashes and brackets are ignored.
 */
function normaliseUkPhone(raw: string): string | null {
  let n = raw.replace(/[\s\-()]/g, "");
  if (n.startsWith("+440")) n = `0${n.slice(4)}`;
  else if (n.startsWith("+44")) n = `0${n.slice(3)}`;
  return /^(?:07\d{9}|0[12]\d{8,9}|03\d{9})$/.test(n) ? n : null;
}

const isUkPhone = (raw: string) => normaliseUkPhone(raw) !== null;

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
  guardianName: string;
  guardianPhone: string;
  name: string;
  email: string;
  phone: string;
  callTime: string;
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
  guardianName: "",
  guardianPhone: "",
  name: "",
  email: "",
  phone: "",
  callTime: "",
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

function enquiryMailto(values: QuizState): string {
  const lines = [
    values.name.trim() && `Name: ${values.name.trim()}`,
    values.phone.trim() && `Phone: ${values.phone.trim()}`,
  ].filter(Boolean);
  const body = lines.length ? `&body=${encodeURIComponent(`${lines.join("\n")}\n\n`)}` : "";
  return `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(enquirySubject(values.sport))}${body}`;
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
const NOT_APPLICABLE = "Not applicable (18 or over)";

function buildPayload(values: QuizState, honey: string) {
  const sportName = sports.find((s) => s.id === values.sport)?.name ?? values.sport;
  const pageUrl = typeof window === "undefined" ? "" : window.location.href;
  const under18 = values.ageBand === UNDER_18;
  return {
    _subject: enquirySubject(values.sport),
    _replyto: values.email.trim(),
    _template: "table",
    _captcha: "false",
    _url: pageUrl,
    _honey: honey,
    "Full name": values.name.trim(),
    Email: values.email.trim(),
    Phone: values.phone.trim(),
    "Best time to call": values.callTime
      ? labelFor(CALL_TIMES, values.callTime)
      : "No preference",
    "Age group": labelFor(AGE_BANDS, values.ageBand),
    "Parent/guardian name": under18 ? values.guardianName.trim() : NOT_APPLICABLE,
    "Parent/guardian phone": under18 ? values.guardianPhone.trim() : NOT_APPLICABLE,
    "Parent/guardian consent": under18
      ? values.guardianConsent
        ? "Yes — confirmed a parent or guardian consents and will travel with them"
        : "No"
      : NOT_APPLICABLE,
    Sport: sportName,
    Level: labelFor(LEVELS, values.level),
    Goal: values.goal.trim() || "—",
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
        (values.ageBand !== UNDER_18 ||
          (values.guardianConsent &&
            Boolean(values.guardianName.trim()) &&
            isUkPhone(values.guardianPhone)))
      );
    case 4:
      return Boolean(values.location.trim() && values.travel);
    case 5:
      return Boolean(values.bookingType);
    case 6:
      return (
        values.riskAck &&
        Boolean(values.name.trim()) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) &&
        isUkPhone(values.phone)
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

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="mt-1.5 text-sm text-flame">
      {children}
    </p>
  );
}

function PhoneField({
  id,
  label,
  value,
  onChange,
  showError,
  onBlur,
  autoComplete,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  showError: boolean;
  onBlur: () => void;
  autoComplete: string;
  hint?: string;
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="tel"
        inputMode="tel"
        autoComplete={autoComplete}
        required
        aria-required="true"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={showError}
        aria-describedby={showError ? errorId : hint ? hintId : undefined}
        className={fieldClass}
        placeholder="e.g. 07700 900123"
      />
      {showError ? (
        <FieldError id={errorId}>{PHONE_ERROR}</FieldError>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-xs text-white/50">
          {hint}
        </p>
      ) : null}
    </div>
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
  // Fields the visitor has left (blurred); errors show only after that.
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const touch = (key: string) => setTouched((t) => ({ ...t, [key]: true }));
  const submitted = status === "success";
  const sending = status === "sending";

  const progressPct = useMemo(
    () => Math.round((step / TOTAL_STEPS) * 100),
    [step],
  );

  const canContinue = isStepValid(step, values);
  const emailInvalid =
    emailTouched &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim());

  const phoneInvalid = Boolean(touched.phone) && !isUkPhone(values.phone);
  const nameMissing = Boolean(touched.name) && !values.name.trim();
  const guardianNameMissing =
    Boolean(touched.guardianName) && !values.guardianName.trim();
  const guardianPhoneInvalid =
    Boolean(touched.guardianPhone) && !isUkPhone(values.guardianPhone);

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
      setTouched((t) => ({ ...t, name: true, phone: true }));
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
    setTouched({});
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
              href={enquiryMailto(values)}
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
                {values.name.trim() ? `, ${values.name.trim()}` : ""}. We&apos;ll
                call you shortly to talk through your enquiry and match. You
                haven&apos;t been charged anything.
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
                        <div>
                          <label
                            htmlFor="guardianName"
                            className="mb-1.5 block text-sm font-medium text-white"
                          >
                            Parent/guardian full name
                          </label>
                          <input
                            id="guardianName"
                            name="guardianName"
                            type="text"
                            autoComplete="off"
                            required
                            aria-required="true"
                            value={values.guardianName}
                            onChange={(e) => setField("guardianName", e.target.value)}
                            onBlur={() => touch("guardianName")}
                            aria-invalid={guardianNameMissing}
                            aria-describedby={
                              guardianNameMissing ? "guardianName-error" : undefined
                            }
                            className={fieldClass}
                            placeholder="Their full name"
                          />
                          {guardianNameMissing && (
                            <FieldError id="guardianName-error">
                              Please enter your parent or guardian&apos;s full name.
                            </FieldError>
                          )}
                        </div>
                        <PhoneField
                          id="guardianPhone"
                          label="Parent/guardian phone"
                          value={values.guardianPhone}
                          onChange={(v) => setField("guardianPhone", v)}
                          onBlur={() => touch("guardianPhone")}
                          showError={guardianPhoneInvalid}
                          autoComplete="off"
                          hint="We'll call them to confirm their consent."
                        />
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
                        your details so we can call you about your match.
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
                        Full name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        aria-required="true"
                        value={values.name}
                        onChange={(e) => setField("name", e.target.value)}
                        onBlur={() => touch("name")}
                        aria-invalid={nameMissing}
                        aria-describedby={nameMissing ? "name-error" : undefined}
                        className={fieldClass}
                        placeholder="Your full name"
                      />
                      {nameMissing && (
                        <FieldError id="name-error">Please enter your full name.</FieldError>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium text-white"
                      >
                        Email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        aria-required="true"
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

                    <PhoneField
                      id="phone"
                      label="Contact phone number"
                      value={values.phone}
                      onChange={(v) => setField("phone", v)}
                      onBlur={() => touch("phone")}
                      showError={phoneInvalid}
                      autoComplete="tel"
                      hint="We'll call you to talk through your enquiry and match."
                    />

                    <div>
                      <label
                        htmlFor="callTime"
                        className="mb-1.5 block text-sm font-medium text-white"
                      >
                        Best time to call{" "}
                        <span className="font-normal text-white/45">(optional)</span>
                      </label>
                      <select
                        id="callTime"
                        name="callTime"
                        value={values.callTime}
                        onChange={(e) => setField("callTime", e.target.value)}
                        className={`${fieldClass} appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23ffffff99'%3E%3Cpath d='M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z'/%3E%3C/svg%3E\")",
                        }}
                      >
                        <option value="" className="bg-ink text-white">
                          No preference
                        </option>
                        {CALL_TIMES.map((t) => (
                          <option key={t.value} value={t.value} className="bg-ink text-white">
                            {t.label}
                          </option>
                        ))}
                      </select>
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
                          href={enquiryMailto(values)}
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
