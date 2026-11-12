/**
 * Hands the browser a short-lived presigned upload URL for ONE evidence file,
 * straight into the private Blob store. Off unless uploadsEnabled() (see
 * src/lib/clubUploads.ts). Type, size and random name are enforced here and
 * again by the Blob CDN; the real file contents are checked in /api/contact.
 */
import { ALLOWED_TYPES, MAX_BYTES, PATH_RE, uploadsEnabled } from "@/lib/clubUploads";

export const runtime = "nodejs";

const hits = new Map<string, number[]>();
function limited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > 15;
}

export async function POST(req: Request): Promise<Response> {
  if (!uploadsEnabled()) return Response.json({ error: "Uploads are not available" }, { status: 404 });
  let host = "";
  try {
    host = new URL(req.headers.get("origin") ?? "").host;
  } catch {}
  const okHost = ["www.extremesportspromotions.com", "extremesportspromotions.com", "localhost:3000"].includes(host) || /^esp-[a-z0-9-]+-personal-44b3\.vercel\.app$/.test(host);
  if (!okHost) return Response.json({ error: "Not allowed" }, { status: 403 });
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return Response.json({ error: "Too many uploads" }, { status: 429 });

  const { issueSignedToken } = await import("@vercel/blob");
  const { handleUploadPresigned } = await import("@vercel/blob/client");
  try {
    const body = await req.json();
    // We only hand out upload URLs; there is no upload-completed callback (the
    // files are checked in /api/contact instead), so no webhook key is needed.
    if (body?.type !== "blob.generate-presigned-url") throw new Error("Not allowed");
    const json = await handleUploadPresigned({
      body,
      request: req,
      webhookPublicKey: process.env.BLOB_WEBHOOK_PUBLIC_KEY || "not-used-no-callbacks",
      getSignedToken: async (pathname, _payload, multipart) => {
        if (multipart || !PATH_RE.test(pathname)) throw new Error("Not allowed");
        const validUntil = Date.now() + 10 * 60_000;
        const token = await issueSignedToken({ pathname, operations: ["put"], allowedContentTypes: ALLOWED_TYPES, maximumSizeInBytes: MAX_BYTES, validUntil });
        return {
          token,
          urlOptions: { allowedContentTypes: ALLOWED_TYPES, maximumSizeInBytes: MAX_BYTES, addRandomSuffix: true, allowOverwrite: false, validUntil },
        };
      },
    });
    return Response.json(json);
  } catch (e) {
    console.error("club-upload refused:", e instanceof Error ? e.message.slice(0, 120) : "unknown");
    return Response.json({ error: "Upload refused" }, { status: 400 });
  }
}
