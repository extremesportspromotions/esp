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
  if (status === "sent") return <Message status="sent" sent="Thanks, you're on the list. We'll email you when we launch in March 2027." />;
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
          Email me when ESP launches in March 2027. I can unsubscribe at any time. See our{" "}
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
        <h2 className="font-display text-2xl font-bold text-[#1C1917] sm:text-3xl">Be first to hear when we launch in March 2027</h2>
        <p className="mt-2 text-base text-[#1C1917]/75">Leave your email and we&apos;ll tell you when coach matching opens. One email, no spam.</p>
        <div className="mt-5"><LaunchSignup /></div>
      </div>
    </section>
  );
}

const darkInput = "w-full rounded-lg border border-white/25 bg-white/10 px-3 py-2.5 text-base text-white placeholder:text-white/45 focus:border-white focus:outline-none aria-[invalid=true]:border-red-400";

function Field({ label, children, dark }: { label: ReactNode; children: ReactNode; dark?: boolean }) {
  return (
    <label className={`flex flex-col gap-1 text-left text-sm font-semibold ${dark ? "text-white/85" : "text-[#1C1917]/80"}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}

const URL_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,24}(:\d{1,5})?(\/[^\s]*)?$/i;
const PHONE_RE = /^[+\d][\d\s()-]{7,20}$/;
const FACILITIES = ["Centre", "Club venue", "Outdoor site", "Mobile / instructor only"];

function Req() {
  return <span className="font-normal text-white/55"> (required)</span>;
}
function Opt() {
  return <span className="font-normal text-white/55"> (optional)</span>;
}
function FieldError({ show, children }: { show: boolean; children: ReactNode }) {
  return show ? <span className="text-xs font-normal text-red-300">{children}</span> : null;
}

type QualRow = { name: string; body: string; level: string; expiry: string };
type ResultRow = { event: string; year: string; result: string };
const MAX_FILES = 5;
const MAX_BYTES = 10 * 1024 * 1024;
const EXT: Record<string, string> = { "application/pdf": "pdf", "image/jpeg": "jpg", "image/png": "png" };

/** Reads a file's first bytes: only real PDF, JPEG or PNG files pass (the server checks again). */
async function sniffFile(f: File): Promise<string | null> {
  const b = new Uint8Array(await f.slice(0, 8).arrayBuffer());
  if (b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46 && b[4] === 0x2d) return "application/pdf";
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if ([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((v, i) => b[i] === v)) return "image/png";
  return null;
}

const smallBtn = "rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold text-white/85 hover:border-white hover:text-white";

/** Promotions page: club and coach application form (dark page). Matthew reviews each one by hand. */
export function ClubApplicationForm({ uploads = false }: { uploads?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [bad, setBad] = useState<string[]>([]);
  const [quals, setQuals] = useState<QualRow[]>([{ name: "", body: "", level: "", expiry: "" }]);
  const [results, setResults] = useState<ResultRow[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const setQ = (i: number, k: keyof QualRow, val: string) => setQuals((q) => q.map((r, j) => (j === i ? { ...r, [k]: val } : r)));
  const setR = (i: number, k: keyof ResultRow, val: string) => setResults((q) => q.map((r, j) => (j === i ? { ...r, [k]: val } : r)));
  async function pickFiles(list: FileList | null) {
    const next = [...files, ...Array.from(list ?? [])];
    if (next.length > MAX_FILES) return setFileError(`You can upload up to ${MAX_FILES} files.`);
    for (const f of next) {
      if (f.size > MAX_BYTES) return setFileError(`"${f.name}" is over 10 MB.`);
      if (!(await sniffFile(f))) return setFileError(`"${f.name}" isn't a PDF, JPG or PNG file.`);
    }
    setFileError("");
    setFiles(next);
  }
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = fd(e);
    const t = (k: string) => (v[k] ?? "").trim();
    const errs: string[] = [];
    for (const k of ["club", "name", "sport", "location"]) if (!t(k)) errs.push(k);
    if (!EMAIL_RE.test(t("email"))) errs.push("email");
    if (!URL_RE.test(t("website"))) errs.push("website");
    if (t("phone") && !PHONE_RE.test(t("phone"))) errs.push("phone");
    if (!["Yes", "No"].includes(t("insurance"))) errs.push("insurance");
    if (t("years") && !/^\d{1,2}$/.test(t("years"))) errs.push("years");
    if (v.authorised !== "on") errs.push("authorised");
    if (v.consent !== "on") errs.push("consent");
    setBad(errs);
    if (errs.length) return setStatus("invalid");
    setStatus("sending");
    let fileUrls: string[] = [];
    if (uploads && files.length) {
      try {
        const { uploadPresigned } = await import("@vercel/blob/client");
        fileUrls = await Promise.all(
          files.map(async (f) => {
            const type = (await sniffFile(f))!;
            const res = await uploadPresigned(`club-applications/${crypto.randomUUID()}.${EXT[type]}`, f, {
              access: "private",
              handleUploadUrl: "/api/club-upload",
              contentType: type,
            });
            return res.url;
          }),
        );
      } catch {
        setFileError("Sorry, the files didn't upload. Please try again, or send the form without them.");
        return setStatus("error");
      }
    }
    const r = await send({
      kind: "club-application",
      club: t("club"),
      name: t("name"),
      email: t("email"),
      sport: t("sport"),
      location: t("location"),
      website: t("website"),
      phone: t("phone"),
      facility: t("facility"),
      years: t("years"),
      qualifications: quals,
      achievements: t("achievements"),
      results,
      insurance: t("insurance"),
      insurer: t("insurer"),
      files: fileUrls,
      message: t("message"),
      authorised: true,
      consent: true,
      _honey: v._honey ?? "",
    });
    if (r.errors) setBad(r.errors);
    setStatus(r.ok ? "sent" : r.errors ? "invalid" : "error");
  }
  if (status === "sent")
    return (
      <div className="mx-auto mt-6 max-w-xl rounded-[14px] border border-[#2a2a3a] bg-[#14141c] p-6">
        <Message dark status="sent" sent="Thanks, we've got your application. We'll read it and be in touch." />
      </div>
    );
  const has = (k: string) => bad.includes(k);
  return (
    <form noValidate onSubmit={onSubmit} data-form="club-application" className="relative mx-auto mt-6 grid max-w-xl gap-4 text-left sm:grid-cols-2">
      <Honeypot />
      <Field dark label={<>Club or coach name<Req /></>}>
        <input name="club" autoComplete="organization" required aria-invalid={has("club")} className={darkInput} />
        <FieldError show={has("club")}>Please add the club or coach name.</FieldError>
      </Field>
      <Field dark label={<>Contact name<Req /></>}>
        <input name="name" autoComplete="name" required aria-invalid={has("name")} className={darkInput} />
        <FieldError show={has("name")}>Please add a contact name.</FieldError>
      </Field>
      <Field dark label={<>Email<Req /></>}>
        <input name="email" type="email" autoComplete="email" required aria-invalid={has("email")} className={darkInput} />
        <FieldError show={has("email")}>Please add a valid email address.</FieldError>
      </Field>
      <Field dark label={<>Sport<Req /></>}>
        <select name="sport" defaultValue="" required aria-invalid={has("sport")} className={darkInput}>
          <option value="" disabled className="text-black">Choose a sport</option>
          {sports.map((s) => <option key={s.id} value={s.mapLabel ?? s.name} className="text-black">{s.mapLabel ?? s.name}</option>)}
          <option value="Other" className="text-black">Other</option>
        </select>
        <FieldError show={has("sport")}>Please choose a sport.</FieldError>
      </Field>
      <Field dark label={<>Town or region<Req /></>}>
        <input name="location" autoComplete="address-level2" required aria-invalid={has("location")} className={darkInput} />
        <FieldError show={has("location")}>Please add your town or region.</FieldError>
      </Field>
      <Field dark label={<>Website<Req /></>}>
        <input name="website" type="url" inputMode="url" autoComplete="url" placeholder="www.yourclub.co.uk" required aria-invalid={has("website")} className={darkInput} />
        <FieldError show={has("website")}>Please add a website address, like www.yourclub.co.uk.</FieldError>
      </Field>
      <Field dark label={<>Phone<Opt /></>}>
        <input name="phone" type="tel" autoComplete="tel" aria-invalid={has("phone")} className={darkInput} />
        <FieldError show={has("phone")}>Please check the phone number.</FieldError>
      </Field>
      <Field dark label={<>Facility type<Opt /></>}>
        <select name="facility" defaultValue="" className={darkInput}>
          <option value="" className="text-black">Choose one</option>
          {FACILITIES.map((f) => <option key={f} value={f} className="text-black">{f}</option>)}
        </select>
      </Field>
      <fieldset className="sm:col-span-2 mt-2 grid gap-4 rounded-[14px] border border-[#2a2a3a] bg-[#14141c] p-4 sm:grid-cols-2 sm:p-5">
        <legend className="px-1 text-base font-bold text-white">Qualifications and experience</legend>
        <div className="sm:col-span-2 flex flex-col gap-3">
          <p className="text-sm font-semibold text-white/85">Coaching qualifications<Opt /></p>
          {quals.map((q, i) => (
            <div key={i} className="grid gap-3 rounded-lg border border-white/10 p-3 sm:grid-cols-2" data-row="qualification">
              <Field dark label="Qualification name"><input value={q.name} onChange={(e) => setQ(i, "name", e.target.value)} maxLength={120} className={darkInput} /></Field>
              <Field dark label="Awarding body"><input value={q.body} onChange={(e) => setQ(i, "body", e.target.value)} maxLength={120} placeholder="e.g. BHPA, BSAC, BASI" className={darkInput} /></Field>
              <Field dark label="Level"><input value={q.level} onChange={(e) => setQ(i, "level", e.target.value)} maxLength={60} className={darkInput} /></Field>
              <Field dark label={<>Expiry date<Opt /></>}><input type="date" value={q.expiry} onChange={(e) => setQ(i, "expiry", e.target.value)} className={`${darkInput} [color-scheme:dark]`} /></Field>
              {quals.length > 1 && (
                <button type="button" onClick={() => setQuals((x) => x.filter((_, j) => j !== i))} className={`${smallBtn} justify-self-start`}>Remove this qualification</button>
              )}
            </div>
          ))}
          {quals.length < 10 && (
            <button type="button" onClick={() => setQuals((x) => [...x, { name: "", body: "", level: "", expiry: "" }])} className={`${smallBtn} self-start`}>+ Add another qualification</button>
          )}
        </div>
        <div className="sm:col-span-2">
          <Field dark label={<>Competitions and achievements<Opt /></>}>
            <textarea name="achievements" rows={3} maxLength={1500} className={darkInput} />
          </Field>
        </div>
        <div className="sm:col-span-2 flex flex-col gap-3">
          {results.map((r, i) => (
            <div key={i} className="grid gap-3 rounded-lg border border-white/10 p-3 sm:grid-cols-[2fr_1fr_1.5fr]" data-row="result">
              <Field dark label="Event"><input value={r.event} onChange={(e) => setR(i, "event", e.target.value)} maxLength={120} className={darkInput} /></Field>
              <Field dark label="Year"><input value={r.year} onChange={(e) => setR(i, "year", e.target.value)} inputMode="numeric" maxLength={4} className={darkInput} /></Field>
              <Field dark label="Result"><input value={r.result} onChange={(e) => setR(i, "result", e.target.value)} maxLength={120} className={darkInput} /></Field>
              <button type="button" onClick={() => setResults((x) => x.filter((_, j) => j !== i))} className={`${smallBtn} justify-self-start`}>Remove this result</button>
            </div>
          ))}
          {results.length < 10 && (
            <button type="button" onClick={() => setResults((x) => [...x, { event: "", year: "", result: "" }])} className={`${smallBtn} self-start`}>+ Add a competition result</button>
          )}
        </div>
        <fieldset className="text-sm text-white/85">
          <legend className={`font-semibold ${has("insurance") ? "text-red-300" : ""}`}>Do you hold public liability insurance?<Req /></legend>
          <div className="mt-2 flex gap-5">
            {["Yes", "No"].map((o) => (
              <label key={o} className="flex items-center gap-1.5"><input type="radio" name="insurance" value={o} aria-invalid={has("insurance")} /> {o}</label>
            ))}
          </div>
          <FieldError show={has("insurance")}>Please choose yes or no.</FieldError>
        </fieldset>
        <Field dark label={<>Insurance provider<Opt /></>}><input name="insurer" maxLength={120} className={darkInput} /></Field>
        <Field dark label={<>Years coaching<Opt /></>}>
          <input name="years" type="number" min={0} max={80} inputMode="numeric" aria-invalid={has("years")} className={darkInput} />
          <FieldError show={has("years")}>Please enter a number of years.</FieldError>
        </Field>
        {uploads && (
          <div className="sm:col-span-2 flex flex-col gap-2 text-sm text-white/85" data-uploads>
            <p className="font-semibold">Evidence<Opt /></p>
            <p className="text-white/70">
              Uploading is optional, but evidence such as qualification certificates, insurance or competition results helps us review your application sooner. PDF,
              JPG or PNG, up to 5 files, 10 MB each. Only ESP can see them.
            </p>
            <p className="text-white/70">ESP checks all evidence by hand. Uploading it doesn&apos;t mean your club is approved or endorsed.</p>
            <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" onChange={(e) => { pickFiles(e.target.files); e.target.value = ""; }} className="text-sm file:mr-3 file:rounded-full file:border-0 file:bg-[#c0c0c0] file:px-4 file:py-2 file:font-semibold file:text-black" />
            {files.length > 0 && (
              <ul className="flex flex-col gap-1">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center justify-between gap-2 rounded border border-white/10 px-2 py-1">
                    <span className="truncate">{f.name} ({(f.size / 1024 / 1024).toFixed(1)} MB)</span>
                    <button type="button" onClick={() => setFiles((x) => x.filter((_, j) => j !== i))} className="text-xs underline">Remove</button>
                  </li>
                ))}
              </ul>
            )}
            <FieldError show={!!fileError || has("files")}>{fileError || "One of the files couldn't be accepted. Please check it's a PDF, JPG or PNG under 10 MB."}</FieldError>
          </div>
        )}
      </fieldset>
      <div className="sm:col-span-2">
        <Field dark label={<>Short message<Opt /></>}>
          <textarea name="message" rows={4} maxLength={1500} placeholder="Tell us a little about your club or coaching, and whether you'd like to be listed, appear in a video, or both." className={darkInput} />
        </Field>
      </div>
      <div className="sm:col-span-2 flex flex-col gap-3 text-sm text-white/85">
        <label className={`flex items-start gap-2 ${has("authorised") ? "text-red-300" : ""}`}>
          <input type="checkbox" name="authorised" required className="mt-1" aria-invalid={has("authorised")} />
          <span>I&apos;m authorised to apply for this club. <Req /></span>
        </label>
        <label className={`flex items-start gap-2 ${has("consent") ? "text-red-300" : ""}`}>
          <input type="checkbox" name="consent" required className="mt-1" aria-invalid={has("consent")} />
          <span>
            I agree to ESP using these details as set out in the{" "}
            <Link href="/privacy" className="underline underline-offset-2">privacy notice</Link>. <Req />
          </span>
        </label>
      </div>
      <div className="sm:col-span-2 flex flex-col items-center gap-2">
        <button type="submit" disabled={status === "sending"} className="rounded-full bg-[#c0c0c0] px-8 py-3.5 font-bold text-black hover:bg-white disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send application"}
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
