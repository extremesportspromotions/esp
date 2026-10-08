/**
 * One display format for UK phone numbers, plus a +44 tel: link.
 * Only the spacing changes; the digits stay exactly as listed.
 */

// Geographic area codes with five digits after the leading 0 (e.g. 013397 41320).
const SIX_DIGIT_AREA_CODES = [
  "013397", "013398", "013873", "015242", "015394", "015395", "015396",
  "016973", "016974", "016977", "017683", "017684", "017687", "019467",
  "019755", "019756",
];

type ParsedPhone = { national: string; note: string };

function parse(raw: string): ParsedPhone | null {
  // Keep any trailing note such as "(WhatsApp only)".
  const noteMatch = /\s*\(([^)0-9][^)]*)\)\s*$/.exec(raw);
  const note = noteMatch ? noteMatch[1].trim() : "";
  const numberPart = (noteMatch ? raw.slice(0, noteMatch.index) : raw).replace(/\(0\)/g, "");
  let digits = numberPart.replace(/[^\d+]/g, "");
  if (digits.startsWith("+44")) digits = `0${digits.slice(3)}`;
  else if (digits.startsWith("0044")) digits = `0${digits.slice(4)}`;
  if (!/^0\d{9,10}$/.test(digits)) return null;
  return { national: digits, note };
}

function spaced(n: string): string {
  if (n.length !== 11) return n;
  if (/^02/.test(n)) return `${n.slice(0, 3)} ${n.slice(3, 7)} ${n.slice(7)}`; // 020 1234 5678
  if (/^01\d1/.test(n) || /^011/.test(n)) return `${n.slice(0, 4)} ${n.slice(4, 7)} ${n.slice(7)}`; // 0151 123 4567
  if (SIX_DIGIT_AREA_CODES.some((c) => n.startsWith(c))) return `${n.slice(0, 6)} ${n.slice(6)}`; // 013397 41320
  if (/^01/.test(n) || /^07/.test(n) || /^05/.test(n)) return `${n.slice(0, 5)} ${n.slice(5)}`; // 01234 567890, 07700 900123
  return `${n.slice(0, 4)} ${n.slice(4, 7)} ${n.slice(7)}`; // 0345 200 4220, 0800 188 4860
}

/** e.g. "+441417240066" → "0141 724 0066". Unrecognised numbers are shown as listed. */
export function formatUkPhone(raw: string): string {
  const p = parse(raw);
  if (!p) return raw.trim();
  return p.note ? `${spaced(p.national)} (${p.note})` : spaced(p.national);
}

/** e.g. "01243 513077" → "tel:+441243513077". */
export function ukPhoneHref(raw: string): string {
  const p = parse(raw);
  if (!p) return `tel:${raw.replace(/[^+\d]/g, "")}`;
  return `tel:+44${p.national.slice(1)}`;
}
