/**
 * Small site forms (club interest, launch sign-up, request a club) email
 * enquiries@ through Resend. Server-side validation, honeypot and rate limit.
 * Set ESP_MAIL_DRY_RUN=1 to validate without sending (local tests).
 */
import { ENQUIRY_EMAIL } from "@/lib/site";

export const runtime = "nodejs";

const FROM = "Extreme Sports Promotions <enquiries@extremesportspromotions.com>";
const EMAIL_RE = /^[^\s@<>"]{1,64}@[^\s@<>"]{1,190}\.[a-z]{2,24}$/i;
const ALLOWED_HOSTS = new Set([
  "www.extremesportspromotions.com",
  "extremesportspromotions.com",
  "esp-lemon.vercel.app",
  "localhost:3000",
]);
function allowedHost(host: string) {
  return ALLOWED_HOSTS.has(host) || /^esp-[a-z0-9-]+-personal-44b3\.vercel\.app$/.test(host);
}

const hits = new Map<string, number[]>();
function limited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}
function text(v: unknown, max: number): string {
  return typeof v === "string" ? v.replace(/[\r\n\t]+/g, " ").trim().slice(0, max) : "";
}
function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

type Kind = "club-interest" | "launch" | "club-request";
const SUBJECT: Record<Kind, string> = {
  "club-interest": "Promotions: club interest",
  launch: "Notify me at launch",
  "club-request": "Request a club be added",
};

export async function POST(req: Request): Promise<Response> {
  let host = "";
  try {
    host = new URL(req.headers.get("origin") ?? "").host;
  } catch {}
  if (!allowedHost(host)) return Response.json({ ok: false }, { status: 403 });

  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  if (typeof b._honey === "string" && b._honey.trim()) return Response.json({ ok: true });

  const kind = b.kind as Kind;
  if (!(kind in SUBJECT)) return Response.json({ ok: false, error: "kind" }, { status: 400 });

  const email = text(b.email, 200);
  const fields: [string, string][] = [];
  const errors: string[] = [];
  if (kind === "launch") {
    if (!EMAIL_RE.test(email)) errors.push("email");
    if (b.consent !== true) errors.push("consent");
    fields.push(["Email", email]);
  } else if (kind === "club-interest") {
    const name = text(b.name, 100), club = text(b.club, 120), sport = text(b.sport, 60);
    const location = text(b.location, 120), contact = text(b.contact, 200);
    const method = text(b.method, 20);
    if (!name) errors.push("name");
    if (!club) errors.push("club");
    if (!sport) errors.push("sport");
    if (!location) errors.push("location");
    if (!["Email", "Phone"].includes(method)) errors.push("method");
    if (method === "Email" && !EMAIL_RE.test(contact)) errors.push("contact");
    if (method === "Phone" && !/^[+\d][\d\s()-]{7,20}$/.test(contact)) errors.push("contact");
    fields.push(["Name", name], ["Club", club], ["Sport", sport], ["Location", location], ["Preferred contact", `${method}: ${contact}`]);
  } else {
    const club = text(b.club, 120), location = text(b.location, 120), sport = text(b.sport, 60);
    const website = text(b.website, 200);
    if (!club) errors.push("club");
    if (!location) errors.push("location");
    if (email && !EMAIL_RE.test(email)) errors.push("email");
    fields.push(["Club", club], ["Sport", sport], ["Location", location], ["Website", website], ["Your email", email]);
  }
  if (errors.length) return Response.json({ ok: false, errors }, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(`ip:${ip}`, 5, 10 * 60_000)) return Response.json({ ok: false }, { status: 429 });

  if (process.env.ESP_MAIL_DRY_RUN === "1") return Response.json({ ok: true, dryRun: true });

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ ok: false }, { status: 500 });
  const shown = fields.filter(([, v]) => v);
  const replyTo = kind === "club-interest" ? (EMAIL_RE.test(text(b.contact, 200)) ? text(b.contact, 200) : undefined) : email || undefined;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [ENQUIRY_EMAIL],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject: SUBJECT[kind],
      text: [SUBJECT[kind], "", ...shown.map(([k, v]) => `${k}: ${v}`)].join("\n"),
      html: `<p><strong>${esc(SUBJECT[kind])}</strong></p><p>${shown.map(([k, v]) => `${esc(k)}: ${esc(v)}`).join("<br>")}</p>`,
    }),
  });
  if (!res.ok) {
    console.error("Resend error", res.status);
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
