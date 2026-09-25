/** Canonical public URL of the site. Change here (or via env) when a custom domain is bought. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://esp-lemon.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Extreme Sports Promotions";

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}
