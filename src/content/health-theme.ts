import type { CSSProperties } from "react";

/**
 * Colour theme for the Xspeaks health page (/health) ONLY.
 * Applied as CSS variables on the page wrapper, so the rest of the site's
 * global colours are untouched. To try another palette from
 * agent-data/shared/esp/health-2026-10/xspeaks-health-colour-theme.md,
 * change the hex values here.
 *
 * Default: "Soft Nature Embrace" (#A8D5BA, #6B9A82, #F1F8E4, #3E4E50, #F6F5F2)
 * plus forest #2C6B4D for headings and links (Matthew, 25 Oct).
 *
 * Contrast (WCAG AA needs 4.5:1 for normal text):
 *   text   #3E4E50 on mist #F1F8E4 8.0 : 1, on cream #F6F5F2 8.0 : 1
 *   forest #2C6B4D on mist / cream 5.8 : 1; white on forest 6.3 : 1
 *   text   #3E4E50 on sage #A8D5BA 5.4 : 1
 *   fern   #6B9A82 is only ~2.9 : 1 on the light backgrounds, so it is used
 *   for dividers, bullets and dashed borders only, never for text.
 */
export const healthTheme = {
  /** Soft sage: small tag backgrounds, always with dark text. Never with white text. */
  sage: "#A8D5BA",
  /** Fern: dividers and decorative accents only. */
  fern: "#6B9A82",
  /** Pale sage / mist: section background. */
  mist: "#F1F8E4",
  /** Body text. */
  text: "#3E4E50",
  /** Cream: section background and the support card. */
  cream: "#F6F5F2",
  /** Forest: headings, links, buttons (white text on buttons). */
  forest: "#2C6B4D",
} as const;

export const healthThemeVars = {
  "--h-sage": healthTheme.sage,
  "--h-fern": healthTheme.fern,
  "--h-mist": healthTheme.mist,
  "--h-text": healthTheme.text,
  "--h-cream": healthTheme.cream,
  "--h-forest": healthTheme.forest,
} as CSSProperties;
