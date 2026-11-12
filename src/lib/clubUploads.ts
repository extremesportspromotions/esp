/**
 * Club application evidence uploads (certificates, insurance, results).
 *
 * SWITCH: uploads stay hidden and every upload route refuses unless the Vercel
 * env var CLUB_UPLOADS=1 is set AND a PRIVATE Vercel Blob store is connected
 * to the project (which adds BLOB_READ_WRITE_TOKEN / BLOB_STORE_ID). No store
 * exists yet, so uploads are off.
 *
 * Files go straight from the browser to the private store (they never pass
 * through /api/contact, which has a ~4.5 MB body cap). The server then checks
 * each file's first bytes (real PDF / JPEG / PNG, not just the extension) and
 * size before the application email is sent with 7-day signed links.
 */
export const MAX_FILES = 5;
export const MAX_BYTES = 10 * 1024 * 1024;
export const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
/** Random names only: club-applications/<uuid>.<ext> (plus Blob's own random suffix). */
export const PATH_RE = /^club-applications\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(-[A-Za-z0-9]+)?\.(pdf|jpg|png)$/;

export function uploadsEnabled(): boolean {
  return process.env.CLUB_UPLOADS === "1" && !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

/** Checks magic bytes. Returns the detected type, or null if not PDF/JPEG/PNG. */
export function sniff(b: Uint8Array): "application/pdf" | "image/jpeg" | "image/png" | null {
  if (b.length >= 5 && b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46 && b[4] === 0x2d) return "application/pdf"; // %PDF-
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  const png = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (b.length >= 8 && png.every((v, i) => b[i] === v)) return "image/png";
  return null;
}
export const EXT_TYPE: Record<string, string> = { pdf: "application/pdf", jpg: "image/jpeg", png: "image/png" };

/**
 * Server-side check of uploaded evidence. Deletes anything that fails.
 * Returns signed 7-day download links for the email, or an error.
 */
export async function checkEvidence(urls: unknown): Promise<{ ok: true; links: [string, string][] } | { ok: false }> {
  if (urls === undefined || (Array.isArray(urls) && urls.length === 0)) return { ok: true, links: [] };
  if (!uploadsEnabled() || !Array.isArray(urls) || urls.length > MAX_FILES) return { ok: false };
  const { get, del, issueSignedToken, presignUrl } = await import("@vercel/blob");
  const links: [string, string][] = [];
  const seen = new Set<string>();
  for (const [i, raw] of urls.entries()) {
    if (typeof raw !== "string") return { ok: false };
    let u: URL;
    try {
      u = new URL(raw);
    } catch {
      return { ok: false };
    }
    const pathname = u.pathname.replace(/^\//, "");
    if (u.protocol !== "https:" || !/^[a-z0-9]+\.private\.blob\.vercel-storage\.com$/i.test(u.host) || !PATH_RE.test(pathname) || seen.has(pathname)) return { ok: false };
    seen.add(pathname);
    const r = await get(u.toString(), { access: "private", useCache: false }).catch(() => null);
    if (!r || r.statusCode !== 200) return { ok: false };
    const reader = r.stream.getReader();
    const first = await reader.read().catch(() => ({ value: undefined }));
    await reader.cancel().catch(() => {});
    const ext = pathname.split(".").pop()!;
    const type = sniff(first.value ?? new Uint8Array());
    if (r.blob.size > MAX_BYTES || !type || type !== EXT_TYPE[ext]) {
      await del(u.toString()).catch(() => {});
      return { ok: false };
    }
    const validUntil = Date.now() + 7 * 24 * 60 * 60 * 1000 - 60_000;
    const token = await issueSignedToken({ pathname, operations: ["get"], validUntil });
    const { presignedUrl } = await presignUrl(token, { operation: "get", pathname, access: "private", validUntil });
    links.push([`File ${i + 1} (${ext.toUpperCase()}, ${(r.blob.size / 1024 / 1024).toFixed(1)} MB)`, presignedUrl]);
  }
  return { ok: true, links };
}
