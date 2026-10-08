/** Canonical public URL of the site (also set as NEXT_PUBLIC_SITE_URL in Vercel production). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.extremesportspromotions.com"
).replace(/\/$/, "");

export const SITE_NAME = "Extreme Sports Promotions";

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** Public contact address shown on the site and used in mailto links (forwards via ImprovMX). */
export const ENQUIRY_EMAIL = "enquiries@extremesportspromotions.com";

/** Where enquiry-form submissions are delivered by FormSubmit (ESP's Google account; activated). */
export const FORM_RECIPIENT_EMAIL = "extremesportspromotionsuk@gmail.com";

/**
 * FormSubmit AJAX endpoint that emails each enquiry to FORM_RECIPIENT_EMAIL.
 * No key needed: the first submission sends a one-time "Activate Form" email to
 * that inbox. After activation FormSubmit also offers a random-string alias,
 * which can be set via NEXT_PUBLIC_ENQUIRY_ENDPOINT to hide the address.
 */
export const ENQUIRY_ENDPOINT =
  process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ??
  `https://formsubmit.co/ajax/${FORM_RECIPIENT_EMAIL}`;
