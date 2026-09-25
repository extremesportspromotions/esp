/** Canonical public URL of the site. Change here (or via env) when a custom domain is bought. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://esp-lemon.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Extreme Sports Promotions";

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** Where enquiry-form submissions are delivered (ESP's Google account). */
export const ENQUIRY_EMAIL = "extremesportspromotionsuk@gmail.com";

/**
 * FormSubmit AJAX endpoint that emails each enquiry to ENQUIRY_EMAIL.
 * No key needed: the first submission sends a one-time "Activate Form" email to
 * that inbox. After activation FormSubmit also offers a random-string alias,
 * which can be set via NEXT_PUBLIC_ENQUIRY_ENDPOINT to hide the address.
 */
export const ENQUIRY_ENDPOINT =
  process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ??
  `https://formsubmit.co/ajax/${ENQUIRY_EMAIL}`;
