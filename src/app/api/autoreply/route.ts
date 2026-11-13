import { sports } from "@/data/sports";
import { autoreplyEmail } from "@/lib/autoreplyMail";

/**
 * Sends the student an instant confirmation email via Resend after the
 * enquiry form has been delivered (FormSubmit can't autorespond to AJAX forms).
 * Content is fixed; only a first name and a known sport name are filled in.
 */
export const runtime = "nodejs";

const FROM = "Extreme Sports Promotions <enquiries@extremesportspromotions.com>";
const REPLY_TO = "enquiries@extremesportspromotions.com";
const ALLOWED_HOSTS = new Set([
  "www.extremesportspromotions.com",
  "extremesportspromotions.com",
  "esp-lemon.vercel.app",
  "localhost:3000",
]);
const EMAIL_RE = /^[^\s@<>"]{1,64}@[^\s@<>"]{1,190}\.[a-z]{2,24}$/i;

// Best-effort abuse limits (per server instance).
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

export async function POST(req: Request): Promise<Response> {
  const origin = req.headers.get("origin") ?? "";
  let host = "";
  try {
    host = new URL(origin).host;
  } catch {}
  if (!ALLOWED_HOSTS.has(host)) return Response.json({ ok: false }, { status: 403 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ ok: false }, { status: 500 });

  let body: { name?: unknown; email?: unknown; sport?: unknown; _honey?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  if (typeof body._honey === "string" && body._honey.trim()) return Response.json({ ok: true });

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email)) return Response.json({ ok: false }, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(`ip:${ip}`, 5, 10 * 60_000) || limited(`em:${email.toLowerCase()}`, 2, 60 * 60_000)) {
    return Response.json({ ok: false }, { status: 429 });
  }

  const rawName = typeof body.name === "string" ? body.name.trim() : "";
  const firstName = rawName.split(/\s+/)[0]?.replace(/[^\p{L}\p{M}'-]/gu, "").slice(0, 40) ?? "";
  const match = sports.find((s) => s.name === body.sport || s.mapLabel === body.sport);
  const sportName = match ? (match.mapLabel ?? match.name) : "";
  const { subject, text, html } = autoreplyEmail(firstName, sportName);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [email],
      reply_to: REPLY_TO,
      subject,
      text,
      html,
    }),
  });
  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
