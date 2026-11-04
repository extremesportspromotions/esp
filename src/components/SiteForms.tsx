"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { sports } from "@/data/sports";

type Status = "idle" | "sending" | "sent" | "error" | "invalid";

async function send(payload: Record<string, unknown>): Promise<{ ok: boolean; errors?: string[] }> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok && data.ok === true, errors: data.errors };
  } catch {
    return { ok: false };
  }
}

function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this empty
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

const EMAIL_RE = /^[^\s@<>"]{1,64}@[^\s@<>"]{1,190}\.[a-z]{2,24}$/i;

function fd(e: FormEvent<HTMLFormElement>) {
  return Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
}

function Message({ status, sent, dark }: { status: Status; sent: string; dark?: boolean }) {
  if (status === "sent") return <p role="status" data-form-status="sent" className={`text-sm font-semibold ${dark ? "text-white" : "text-[#1C1917]"}`}>{sent}</p>;
  if (status === "invalid") return <p role="alert" data-form-status="invalid" className={`text-sm ${dark ? "text-red-300" : "text-red-700"}`}>Please check the highlighted boxes and try again.</p>;
  if (status === "error") return <p role="alert" data-form-status="error" className={`text-sm ${dark ? "text-red-300" : "text-red-700"}`}>Sorry, that didn&apos;t send. Please try again, or email enquiries@extremesportspromotions.com.</p>;
  return null;
}

const lightInput = "w-full rounded-lg border border-[#1C1917]/20 bg-white px-3 py-2.5 text-base text-[#1C1917] placeholder:text-[#1C1917]/40 focus:border-accent focus:outline-none aria-[invalid=true]:border-red-600";

/** "Notify me at launch" email sign-up. */
export function LaunchSignup({ compact }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [bad, setBad] = useState<string[]>([]);
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = fd(e);
    const errs: string[] = [];
    if (!EMAIL_RE.test((v.email ?? "").trim())) errs.push("email");
    if (v.consent !== "on") errs.push("consent");
    setBad(errs);
    if (errs.length) return setStatus("invalid");
    setStatus("sending");
    const r = await send({ kind: "launch", email: v.email.trim(), consent: true, _honey: v._honey ?? "" });
    setStatus(r.ok ? "sent" : r.errors ? "invalid" : "error");
  }
  if (status === "sent") return <Message status="sent" sent="Thanks, you're on the list. We'll email you when we launch." />;
  return (
    <form noValidate onSubmit={onSubmit} data-form="launch" className="relative flex flex-col gap-2">
      <Honeypot />
      <div className={`flex gap-2 ${compact ? "flex-col sm:flex-row" : "flex-col sm:flex-row"}`}>
        <label className="sr-only" htmlFor={compact ? "launch-email-f" : "launch-email"}>Email address</label>
        <input id={compact ? "launch-email-f" : "launch-email"} name="email" type="email" autoComplete="email" placeholder="Your email address" aria-invalid={bad.includes("email")} className={lightInput} />
        <button type="submit" disabled={status === "sending"} className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0E2141] disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Notify me at launch"}
        </button>
      </div>
      <label className={`flex items-start gap-2 text-xs leading-relaxed text-[#1C1917]/70 ${bad.includes("consent") ? "text-red-700" : ""}`}>
        <input type="checkbox" name="consent" className="mt-0.5" aria-invalid={bad.includes("consent")} />
        <span>
          Email me when ESP launches. I can unsubscribe at any time. See our{" "}
          <Link href="/privacy" className="underline underline-offset-2">privacy notice</Link>.
        </span>
      </label>
      <Message status={status} sent="" />
    </form>
  );
}

/** Homepage block around the launch sign-up. */
export function LaunchSignupSection() {
  return (
    <section id="launch" className="border-t border-[#1C1917]/10 bg-[#F6EFE3]">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-[#1C1917] sm:text-3xl">Be first to hear when we launch</h2>
        <p className="mt-2 text-base text-[#1C1917]/75">Leave your email and we&apos;ll tell you when coach matching opens. One email, no spam.</p>
        <div className="mt-5"><LaunchSignup /></div>
      </div>
    </section>
  );
}

const darkInput = "w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2.5 text-base text-white placeholder:text-white/45 focus:border-white focus:outline-none aria-[invalid=true]:border-red-400";

function Field({ label, children, dark }: { label: string; children: ReactNode; dark?: boolean }) {
  return (
    <label className={`flex flex-col gap-1 text-left text-sm font-semibold ${dark ? "text-white/85" : "text-[#1C1917]/80"}`}>
      {label}
      {children}
    </label>
  );
}

/** Promotions page: club interest form (dark page). */
export function ClubInterestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [bad, setBad] = useState<string[]>([]);
  const [method, setMethod] = useState("Email");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = fd(e);
    const errs: string[] = [];
    for (const k of ["name", "club", "sport", "location"]) if (!(v[k] ?? "").trim()) errs.push(k);
    const c = (v.contact ?? "").trim();
    if (method === "Email" ? !EMAIL_RE.test(c) : !/^[+\d][\d\s()-]{7,20}$/.test(c)) errs.push("contact");
    setBad(errs);
    if (errs.length) return setStatus("invalid");
    setStatus("sending");
    const r = await send({ kind: "club-interest", name: v.name, club: v.club, sport: v.sport, location: v.location, method, contact: c, _honey: v._honey ?? "" });
    if (r.errors) setBad(r.errors);
    setStatus(r.ok ? "sent" : r.errors ? "invalid" : "error");
  }
  if (status === "sent") return <Message dark status="sent" sent="Thanks, we've got your details. We'll be in touch soon." />;
  return (
    <form noValidate onSubmit={onSubmit} data-form="club-interest" className="relative mx-auto mt-6 grid max-w-xl gap-4 sm:grid-cols-2">
      <Honeypot />
      <Field dark label="Your name"><input name="name" autoComplete="name" aria-invalid={bad.includes("name")} className={darkInput} /></Field>
      <Field dark label="Club or venue"><input name="club" autoComplete="organization" aria-invalid={bad.includes("club")} className={darkInput} /></Field>
      <Field dark label="Sport">
        <select name="sport" defaultValue="" aria-invalid={bad.includes("sport")} className={darkInput}>
          <option value="" disabled className="text-black">Choose a sport</option>
          {sports.map((s) => <option key={s.id} value={s.mapLabel ?? s.name} className="text-black">{s.mapLabel ?? s.name}</option>)}
          <option value="Other" className="text-black">Other</option>
        </select>
      </Field>
      <Field dark label="Town or city"><input name="location" autoComplete="address-level2" aria-invalid={bad.includes("location")} className={darkInput} /></Field>
      <fieldset className="sm:col-span-2 text-left">
        <legend className="text-sm font-semibold text-white/85">How should we contact you?</legend>
        <div className="mt-1 flex gap-4 text-sm text-white/85">
          {["Email", "Phone"].map((m) => (
            <label key={m} className="flex items-center gap-1.5">
              <input type="radio" name="method" value={m} checked={method === m} onChange={() => setMethod(m)} /> {m}
            </label>
          ))}
        </div>
        <input name="contact" type={method === "Email" ? "email" : "tel"} placeholder={method === "Email" ? "Your email address" : "Your phone number"} aria-label={method === "Email" ? "Email address" : "Phone number"} aria-invalid={bad.includes("contact")} className={`${darkInput} mt-2`} />
      </fieldset>
      <p className="sm:col-span-2 text-left text-xs text-white/60">We only use these details to reply about promotions. See our <Link href="/privacy" className="underline">privacy notice</Link>.</p>
      <div className="sm:col-span-2 flex flex-col items-center gap-2">
        <button type="submit" disabled={status === "sending"} className="rounded-full bg-[#c0c0c0] px-8 py-3.5 font-bold text-black hover:bg-white disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Register your club's interest"}
        </button>
        <Message dark status={status} sent="" />
      </div>
    </form>
  );
}

/** Club finder: "Request a club be added". */
export function ClubRequest() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [bad, setBad] = useState<string[]>([]);
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = fd(e);
    const errs: string[] = [];
    if (!(v.club ?? "").trim()) errs.push("club");
    if (!(v.location ?? "").trim()) errs.push("location");
    if ((v.email ?? "").trim() && !EMAIL_RE.test(v.email.trim())) errs.push("email");
    setBad(errs);
    if (errs.length) return setStatus("invalid");
    setStatus("sending");
    const r = await send({ kind: "club-request", club: v.club, sport: v.sport, location: v.location, website: v.website, email: (v.email ?? "").trim(), _honey: v._honey ?? "" });
    setStatus(r.ok ? "sent" : r.errors ? "invalid" : "error");
  }
  return (
    <div className="mt-4 text-sm">
      <button type="button" data-club-request onClick={() => setOpen((o) => !o)} aria-expanded={open} className="font-semibold text-accent underline-offset-2 hover:underline">
        Request a club be added
      </button>
      {open && (status === "sent" ? (
        <div className="mt-3"><Message status="sent" sent="Thanks. We'll look into that club and add it if it fits." /></div>
      ) : (
        <form noValidate onSubmit={onSubmit} data-form="club-request" className="relative mt-3 grid gap-3 rounded-xl border border-[#1C1917]/10 bg-white p-4 sm:grid-cols-2">
          <Honeypot />
          <Field label="Club name"><input name="club" aria-invalid={bad.includes("club")} className={lightInput} /></Field>
          <Field label="Sport">
            <select name="sport" defaultValue="" className={lightInput}>
              <option value="">Choose a sport</option>
              {sports.map((s) => <option key={s.id} value={s.mapLabel ?? s.name}>{s.mapLabel ?? s.name}</option>)}
            </select>
          </Field>
          <Field label="Town or city"><input name="location" aria-invalid={bad.includes("location")} className={lightInput} /></Field>
          <Field label="Club website (optional)"><input name="website" type="url" className={lightInput} /></Field>
          <Field label="Your email (optional)"><input name="email" type="email" aria-invalid={bad.includes("email")} className={lightInput} /></Field>
          <div className="flex flex-col justify-end gap-2">
            <button type="submit" disabled={status === "sending"} className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0E2141] disabled:opacity-60">
              {status === "sending" ? "Sending…" : "Send request"}
            </button>
          </div>
          <div className="sm:col-span-2"><Message status={status} sent="" /></div>
        </form>
      ))}
    </div>
  );
}
