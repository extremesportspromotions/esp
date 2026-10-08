/**
 * Pings Matthew on Telegram when an enquiry lands. The enquiry itself still
 * goes through FormSubmit; this is only the alert.
 */
export const runtime = "nodejs";

const ALLOWED_HOSTS = new Set([
  "www.extremesportspromotions.com",
  "extremesportspromotions.com",
  "esp-lemon.vercel.app",
  "localhost:3000",
]);

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

function textOf(value: unknown, max = 200): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request): Promise<Response> {
  const origin = req.headers.get("origin") ?? "";
  let host = "";
  try {
    host = new URL(origin).host;
  } catch {}
  if (!ALLOWED_HOSTS.has(host)) return Response.json({ ok: false }, { status: 403 });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return Response.json({ ok: false }, { status: 500 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  if (typeof body._honey === "string" && body._honey.trim()) return Response.json({ ok: true });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(`ip:${ip}`, 5, 10 * 60_000)) return Response.json({ ok: false }, { status: 429 });

  const lines = [
    ["Name", textOf(body.name, 100)],
    ["Phone", textOf(body.phone, 40)],
    ["Email", textOf(body.email, 200)],
    ["Sport", textOf(body.sport, 60)],
    ["Area", textOf(body.location, 100)],
    ["Travel", textOf(body.travel, 60)],
    ["Match fee", textOf(body.matchFee, 120)],
    ["Age", textOf(body.age, 40)],
    ["Guardian", textOf(body.guardianName, 100)],
    ["Guardian phone", textOf(body.guardianPhone, 40)],
  ].filter(([, v]) => v);

  const text = ["New ESP enquiry", "", ...lines.map(([k, v]) => `${k}: ${v}`)].join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!res.ok) {
    console.error("Telegram error", res.status);
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
