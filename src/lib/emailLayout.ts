/**
 * Shared "form style" layout for emails ESP sends to clients: navy header with the
 * ESP logo, gold rule lines, labelled rows on a cream panel and a navy footer.
 * Matches the navy and gold of ESP's launch-readiness task form.
 * Email-safe: table layout, inline styles only, fluid up to 600px, light scheme.
 */

export const EMAIL_COLOURS = {
  navy: "#0E2141",
  gold: "#8F713E",
  goldLight: "#C9A96E",
  cream: "#F6F2EA",
  line: "#D9DCE2",
  ink: "#1C2430",
  muted: "#5A6573",
  page: "#EEF0F3",
} as const;

/** ESP logo (stag over "ESP" on navy). Absolute PNG URL so it loads in mail clients. */
export const ESP_LOGO_URL = "https://www.extremesportspromotions.com/icon-512.png";

/** Light/silver Devonshire stag for shop customer emails. Shows clearly on the navy header. */
export const DEVONSHIRE_MARK_URL = "https://www.extremesportspromotions.com/shop/email-mark-light.png";

const C = EMAIL_COLOURS;
const SANS = "Arial,Helvetica,sans-serif";
const SERIF = "Georgia,'Times New Roman',Times,serif";

export const emailEsc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Body paragraph. `html` must already be escaped. */
export function emailPara(html: string, extra = ""): string {
  return `<p style="margin:0 0 14px;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.ink};word-break:break-word;overflow-wrap:anywhere;${extra}">${html}</p>`;
}

/** Section heading in serif navy with a gold rule underneath. `text` is plain text. */
export function emailHeading(text: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:22px 0 12px"><tr><td style="padding:0 0 6px;border-bottom:1px solid ${C.gold};font-family:${SERIF};font-size:19px;line-height:1.3;font-weight:bold;color:${C.navy}">${emailEsc(text)}</td></tr></table>`;
}

/** Cream panel with gold border, like a completed box on the task form. `inner` is HTML. */
export function emailPanel(inner: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.cream}" style="margin:4px 0 16px;background:${C.cream};border:1px solid ${C.gold};border-left:4px solid ${C.gold}"><tr><td style="padding:14px 16px">${inner}</td></tr></table>`;
}

/**
 * Labelled rows on a cream panel. Each row is [label HTML, value HTML, options].
 * Use `strong` for a total line.
 */
export function emailRows(rows: { label: string; value: string; strong?: boolean }[]): string {
  const body = rows
    .map((r, i) => {
      const last = i === rows.length - 1;
      const border = last ? "" : `border-bottom:1px solid ${C.line};`;
      const weight = r.strong ? "font-weight:bold;font-size:16px;" : "font-size:15px;";
      return `<tr><td style="padding:11px 14px;${border}font-family:${SANS};${weight}line-height:1.45;color:${C.ink};vertical-align:top">${r.label}</td><td align="right" style="padding:11px 14px;${border}font-family:${SANS};${weight}line-height:1.45;color:${C.ink};vertical-align:top;white-space:nowrap">${r.value}</td></tr>`;
    })
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.cream}" style="margin:4px 0 16px;border-collapse:collapse;background:${C.cream};border-top:2px solid ${C.gold};border-bottom:2px solid ${C.gold}">${body}</table>`;
}

/** Full email document. All strings are plain text except `body`, which is HTML. */
export function emailLayout(o: {
  title: string;
  kicker?: string;
  subtitle?: string;
  body: string;
  footer: string;
  logoAlt?: string;
  logoUrl?: string;
  logoWidth?: number;
  logoHeight?: number;
}): string {
  const kicker = o.kicker ?? "EXTREME SPORTS PROMOTIONS";
  const logoUrl = o.logoUrl ?? ESP_LOGO_URL;
  const logoW = o.logoWidth ?? 64;
  const logoH = o.logoHeight ?? 64;
  return `<!DOCTYPE html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>${emailEsc(o.title)}</title></head>
<body style="margin:0;padding:0;background:${C.page};-webkit-text-size-adjust:100%">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}" style="background:${C.page}"><tr><td align="center" style="padding:20px 10px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="width:100%;max-width:600px;background:#ffffff;border-collapse:collapse">
<tr><td bgcolor="${C.navy}" style="background:${C.navy};padding:18px 20px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td width="${logoW}" valign="middle" style="width:${logoW}px;padding:0 14px 0 0"><img src="${logoUrl}" width="${logoW}" height="${logoH}" alt="${emailEsc(o.logoAlt ?? "ESP – Extreme Sports Promotions")}" style="display:block;border:0;outline:none;width:${logoW}px;height:${logoH}px;color:#ffffff;font-family:${SANS};font-size:11px"></td>
<td valign="middle" style="font-family:${SANS}">
${kicker ? `<div style="font-size:11px;line-height:1.4;font-weight:bold;letter-spacing:1.2px;color:${C.goldLight}">${emailEsc(kicker)}</div>` : ""}
<div style="margin-top:${kicker ? 3 : 0}px;font-family:${SERIF};font-size:21px;line-height:1.25;color:#ffffff">${emailEsc(o.title)}</div>
${o.subtitle ? `<div style="margin-top:4px;font-size:12px;line-height:1.4;color:#C9CDD4">${emailEsc(o.subtitle)}</div>` : ""}
</td></tr></table>
</td></tr>
<tr><td height="4" bgcolor="${C.gold}" style="height:4px;line-height:4px;font-size:0;background:${C.gold}">&nbsp;</td></tr>
<tr><td style="padding:24px 24px 10px">${o.body}</td></tr>
<tr><td height="1" bgcolor="${C.gold}" style="height:1px;line-height:1px;font-size:0;background:${C.gold}">&nbsp;</td></tr>
<tr><td bgcolor="${C.navy}" align="center" style="background:${C.navy};padding:16px 20px;font-family:${SANS};font-size:12px;line-height:1.5;color:#C9CDD4">${o.footer}</td></tr>
</table>
</td></tr></table>
</body></html>`;
}
