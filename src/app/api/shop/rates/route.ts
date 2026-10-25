import { cleanLines, ukDelivery } from "@/lib/shop";

/** UK delivery quote for the bag. Prices come from merch.ts, never the browser. */
export const runtime = "nodejs";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json().catch(() => null)) as { items?: unknown } | null;
  const lines = cleanLines(body?.items);
  if (!lines) return Response.json({ ok: false, reason: "items" }, { status: 400 });
  const d = await ukDelivery(lines);
  if (!d) return Response.json({ ok: false, reason: "delivery" }, { status: 502 });
  return Response.json({ ok: true, pence: d.pence, name: d.name, auto: d.autoPence, made: d.madePence, parcels: d.parcels });
}
