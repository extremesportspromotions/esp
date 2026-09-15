"use client";

import { FormEvent, useMemo, useState } from "react";
import { sports } from "@/data/sports";

type FormState = {
  name: string;
  email: string;
  sport: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  email: "",
  sport: "",
  message: "",
};

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.sport) errors.sport = "Select a sport interest.";
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const sportOptions = useMemo(
    () => sports.map((s) => ({ value: s.id, label: s.name })),
    [],
  );

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
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
            Tell us a bit about yourself and the sport you want to pursue. Our
            team will follow up to match you with a professional coach.
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
              className="flex min-h-[280px] flex-col items-start justify-center gap-3"
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
                onClick={() => {
                  setSubmitted(false);
                  setValues(initial);
                  setErrors({});
                }}
                className="mt-2 text-sm font-semibold text-accent underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
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
                  onChange={onChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-sm text-flame">
                    {errors.name}
                  </p>
                )}
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
                  onChange={onChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-sm text-flame">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="sport"
                  className="mb-1.5 block text-sm font-medium text-white"
                >
                  Sport interest
                </label>
                <select
                  id="sport"
                  name="sport"
                  value={values.sport}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.sport)}
                  aria-describedby={errors.sport ? "sport-error" : undefined}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                >
                  <option value="" className="bg-ink text-white">
                    Select a sport
                  </option>
                  {sportOptions.map((o) => (
                    <option
                      key={o.value}
                      value={o.value}
                      className="bg-ink text-white"
                    >
                      {o.label}
                    </option>
                  ))}
                </select>
                {errors.sport && (
                  <p id="sport-error" className="mt-1.5 text-sm text-flame">
                    {errors.sport}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-white"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="w-full resize-y rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                  placeholder="Tell us your level, goals, and preferred location or dates…"
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-sm text-flame">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto"
              >
                Submit enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
