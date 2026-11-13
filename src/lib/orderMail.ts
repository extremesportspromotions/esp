import { createHash } from "node:crypto";
import { madeInfo } from "@/lib/madeDesigns";
import { isMade, lookup, type Line } from "@/lib/shop";
import { emailHeading, emailLayout, emailPanel, emailPara, emailRows, EMAIL_COLOURS } from "@/lib/emailLayout";

/**
 * Shop order messages, used by the Stripe webhook for EVERY paid shop order:
 *  1. a direct Telegram alert to Matthew (same bot and chat as the enquiry alert),
 *  2. a record email to enquiries@ (Resend),
 *  3. a thank-you email to the customer (Resend).
 * Each send is independent: one failing never stops the others or the fulfilment order.
 * Nothing here names the suppliers to the customer; the internal alerts do, on purpose.
 */

export const BRAND = "Devonshire";
const ENQUIRIES = "enquiries@extremesportspromotions.com";
/** Record copies go to enquiries@, so they come from notifications@ (a self-sent message looks like spam to Gmail). */
const RECORD_FROM = "ESP Shop <notifications@extremesportspromotions.com>";
/** Customer email sender. Any address on the Resend-verified domain works; falls back to enquiries@ if refused. */
const CUSTOMER_FROM = process.env.SHOP_EMAIL_FROM || `${BRAND} <orders@extremesportspromotions.com>`;
const CUSTOMER_FROM_FALLBACK = `${BRAND} <${ENQUIRIES}>`;
const TIMEOUT_MS = 8000;

export type PartnerStatus = { state: "none" | "created" | "duplicate" | "failed"; id?: string | number; status?: string };

export type OrderItem = {
  name: string; colour: string; size: string; qty: number; unitPence: number;
  manual: boolean; design?: number; garment?: string; logo?: string;
};
export type OrderInfo = {
  sessionId: string; shortNo: string;
  name: string; email?: string; phone?: string; address: string[];
  items: OrderItem[];
  subtotalPence: number; deliveryPence: number; totalPence: number;
  partner: PartnerStatus;
};

type Addr = { line1?: string; line2?: string | null; city?: string; state?: string | null; postal_code?: string; country?: string };
export type ShopSession = {
  id: string;
  amount_total?: number;
  amount_subtotal?: number;
  total_details?: { amount_shipping?: number };
  shipping_cost?: { amount_total?: number };
  customer_details?: { name?: string; email?: string; phone?: string | null; address?: Addr };
  shipping_details?: { name?: string; address?: Addr };
  collected_information?: { shipping_details?: { name?: string; address?: Addr } };
  metadata?: Record<string, string>;
};

/** Short order number: first 8 of the same hash used as the fulfilment external_id. */
export const shortNo = (sessionId: string) => createHash("sha256").update(sessionId).digest("hex").slice(0, 8).toUpperCase();
export const money = (p: number) => `£${(p / 100).toFixed(2)}`;
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function buildOrder(s: ShopSession, lines: Line[], partner: PartnerStatus): OrderInfo {
  const ship = s.collected_information?.shipping_details ?? s.shipping_details;
  const a = ship?.address ?? s.customer_details?.address ?? {};
  const items: OrderItem[] = lines.map((l) => {
    const { p, v } = lookup(l.id)!;
    const m = isMade(l.id) ? madeInfo(l.id) : undefined;
    return {
      name: p.name, colour: v.color ?? "", size: v.label, qty: l.qty, unitPence: v.pence,
      manual: !!m, design: m?.design, garment: m?.garment, logo: m?.logo,
    };
  });
  const subtotal = items.reduce((n, i) => n + i.unitPence * i.qty, 0);
  const delivery = s.total_details?.amount_shipping ?? s.shipping_cost?.amount_total ?? 0;
  return {
    sessionId: s.id, shortNo: shortNo(s.id),
    name: ship?.name || s.customer_details?.name || "Customer",
    email: s.customer_details?.email, phone: s.customer_details?.phone || undefined,
    address: [a.line1, a.line2, a.city, a.state, a.postal_code, a.country === "GB" ? "United Kingdom" : a.country].filter((x): x is string => !!x),
    items, subtotalPence: s.amount_subtotal ?? subtotal, deliveryPence: delivery, totalPence: s.amount_total ?? subtotal + delivery, partner,
  };
}

const opt = (i: OrderItem) => [i.colour, i.size].filter(Boolean).join(" / ");
const hasManual = (o: OrderInfo) => o.items.some((i) => i.manual);
const hasAuto = (o: OrderInfo) => o.items.some((i) => !i.manual);
const ACTION = "Action needed: reorder on Clothes2order and ship with prices hidden";
function partnerLine(o: OrderInfo): string {
  if (!hasAuto(o)) return "Printful: nothing to send (manual items only)";
  const p = o.partner;
  if (p.state === "created") return `Printful: order ${p.id ?? ""} created (${p.status ?? "draft"})`;
  if (p.state === "duplicate") return "Printful: order already exists (repeat delivery)";
  return "Printful: ORDER FAILED. Stripe will retry; check Printful";
}

/* ---------- 1. Telegram alert ---------- */

export function telegramText(o: OrderInfo): string {
  return [
    `🛍 ${BRAND} order #${o.shortNo}`,
    `Total ${money(o.totalPence)} (delivery ${money(o.deliveryPence)})`,
    "",
    `Deliver to: ${o.name}`,
    ...o.address,
    [o.email, o.phone].filter(Boolean).join(" · "),
    "",
    ...o.items.flatMap((i) => [
      `• ${i.qty} × ${i.name}${opt(i) ? ` – ${opt(i)}` : ""}`,
      i.manual ? `   Clothes2order (MANUAL, action needed) – design ${i.design}` : "   Printful (auto)",
    ]),
    ...(hasManual(o) ? ["", `⚠️ ${ACTION}.`] : []),
    partnerLine(o),
    `Stripe: ${o.sessionId}`,
  ].join("\n");
}

/* ---------- 2. record email to enquiries@ ---------- */

export function recordEmail(o: OrderInfo) {
  const subject = `${BRAND} order #${o.shortNo} – ${money(o.totalPence)} – ${o.name}`;
  const rows = o.items.map((i) => [
    `${i.qty} × ${i.name}`, opt(i) || "–", money(i.unitPence * i.qty),
    i.manual ? `Clothes2order (manual) · design ${i.design} · ${i.garment} · ${i.logo} logo` : "Printful (automatic)",
  ]);
  const text = [
    `${BRAND} order #${o.shortNo}`,
    `Stripe session: ${o.sessionId}`,
    "",
    "Deliver to:", o.name, ...o.address, `Email: ${o.email ?? "–"}`, `Phone: ${o.phone ?? "–"}`,
    "",
    "Items:", ...rows.map((r) => `- ${r[0]} | ${r[1]} | ${r[2]} | ${r[3]}`),
    "",
    `Items ${money(o.subtotalPence)} · Delivery charged ${money(o.deliveryPence)} · Total paid ${money(o.totalPence)}`,
    ...(hasManual(o) ? ["", `${ACTION}.`] : []),
    partnerLine(o),
  ].join("\n");
  const td = 'style="padding:6px 8px;border-bottom:1px solid #e5e7eb;vertical-align:top"';
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#1C1917">
<h2 style="margin:0 0 4px;font-size:18px">${BRAND} order #${o.shortNo}</h2>
<p style="margin:0 0 12px;color:#57534e">Stripe session: ${esc(o.sessionId)}</p>
${hasManual(o) ? `<p style="margin:0 0 12px;padding:10px 12px;background:#fef3c7;border-left:4px solid #b45309;font-weight:bold">${ACTION}.</p>` : ""}
<p style="margin:0 0 12px"><b>Deliver to</b><br>${[o.name, ...o.address].map(esc).join("<br>")}<br>Email: ${esc(o.email ?? "–")}<br>Phone: ${esc(o.phone ?? "–")}</p>
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:640px">
<tr><th align="left" ${td}>Item</th><th align="left" ${td}>Colour / size</th><th align="right" ${td}>Price</th><th align="left" ${td}>Fulfilment</th></tr>
${rows.map((r, n) => `<tr><td ${td}>${esc(r[0])}</td><td ${td}>${esc(r[1])}</td><td align="right" ${td}>${r[2]}</td><td ${td}${o.items[n].manual ? ' bgcolor="#fef3c7"' : ""}>${esc(r[3])}</td></tr>`).join("\n")}
</table>
<p style="margin:12px 0 0">Items ${money(o.subtotalPence)}<br>Delivery charged ${money(o.deliveryPence)}<br><b>Total paid ${money(o.totalPence)}</b></p>
<p style="margin:12px 0 0;color:#57534e">${esc(partnerLine(o))}</p>
</div>`;
  return { subject, text, html };
}

/* ---------- 3. customer thank-you email ---------- */

const KIT_DELIVERY = "Your kit is made to order by our production partner. It's usually made within 2 to 5 working days, then UK delivery typically takes 2 to 7 working days. We'll send tracking where it's available.";
const SC_DELIVERY = "Smart casual pieces are made to order and are usually ready in about 5 working days, plus delivery.";

export function customerEmail(o: OrderInfo, origin: string) {
  const subject = `Thanks for your ${BRAND} order #${o.shortNo}`;
  const first = o.name.split(/\s+/)[0] || "";
  const manual = hasManual(o), auto = hasAuto(o);
  const delivery = [
    ...(auto ? [KIT_DELIVERY] : []),
    ...(manual ? [SC_DELIVERY] : []),
    ...(manual && auto ? ["Your order will arrive in two parcels: your smart casual pieces come separately from the rest of your kit."] : []),
  ];
  const rights = "You can cancel within 14 days of receiving your order, under the UK Consumer Contracts Regulations. If you'd like to return something, please email us first and we'll tell you where to send it.";
  const text = [
    `${BRAND}`, "from Extreme Sports Promotions", "",
    `Hi${first ? ` ${first}` : ""},`, "",
    `Thank you for your order. Your order number is #${o.shortNo}.`, "",
    ...o.items.map((i) => `${i.qty} × ${i.name}${opt(i) ? ` (${opt(i)})` : ""}  ${money(i.unitPence * i.qty)}`),
    `Delivery  ${money(o.deliveryPence)}`, `Total paid  ${money(o.totalPence)}`, "",
    "Delivering to:", o.name, ...o.address, "",
    "How delivery works", ...delivery, "",
    "Your rights", rights, "",
    `Questions? Email ${ENQUIRIES} and quote #${o.shortNo}.`,
  ].join("\n");
  void origin; // images now load from the live site via ESP_LOGO_URL
  const muted = `color:${EMAIL_COLOURS.muted}`;
  const itemRows = o.items.map((i) => ({
    label: `<b>${esc(i.name)}</b>${opt(i) ? `<br><span style="${muted}">${esc(opt(i))}</span>` : ""}<br><span style="${muted}">Qty ${i.qty}</span>`,
    value: money(i.unitPence * i.qty),
  }));
  const body = [
    emailPara(`Hi${first ? ` ${esc(first)}` : ""},`),
    emailPara(`Thank you for your order. Your order number is <b>#${o.shortNo}</b>.`),
    emailRows([
      ...itemRows,
      { label: "Delivery", value: money(o.deliveryPence) },
      { label: "Total paid", value: money(o.totalPence), strong: true },
    ]),
    emailHeading("Delivering to"),
    emailPara([o.name, ...o.address].map(esc).join("<br>")),
    emailHeading("How delivery works"),
    delivery.map((d) => emailPara(esc(d))).join(""),
    emailHeading("Your rights"),
    emailPara(esc(rights)),
    emailPanel(emailPara(`Questions? Email <a href="mailto:${ENQUIRIES}" style="color:${EMAIL_COLOURS.navy}">${ENQUIRIES}</a> and quote #${o.shortNo}.`, "margin:0")),
  ].join("");
  const html = emailLayout({
    kicker: "",
    title: BRAND,
    subtitle: "from Extreme Sports Promotions",
    body,
    footer: `${BRAND} · Extreme Sports Promotions`,
  });
  return { subject, text, html };
}

/* ---------- senders (each one catches its own errors) ---------- */

type Sent = { ok: boolean; status: number };

export async function sendTelegram(text: string): Promise<Sent> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { ok: false, status: 503 };
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: text.slice(0, 4000), disable_web_page_preview: true }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) console.error("Order alert: Telegram error", res.status);
    return { ok: res.ok, status: res.status };
  } catch {
    console.error("Order alert: Telegram unreachable");
    return { ok: false, status: 0 };
  }
}

export async function sendEmail(mail: { from: string; to: string; reply_to?: string; subject: string; text: string; html: string }): Promise<Sent> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, status: 503 };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ ...mail, to: [mail.to] }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) console.error("Order email: Resend error", res.status);
    return { ok: res.ok, status: res.status };
  } catch {
    console.error("Order email: Resend unreachable");
    return { ok: false, status: 0 };
  }
}

/** Telegram + record email, in parallel and independent. */
export async function sendOrderAlerts(o: OrderInfo): Promise<{ telegram: Sent; email: Sent }> {
  const rec = recordEmail(o);
  const [telegram, email] = await Promise.all([
    sendTelegram(telegramText(o)),
    sendEmail({ from: RECORD_FROM, to: ENQUIRIES, reply_to: o.email, subject: rec.subject, text: rec.text, html: rec.html }),
  ]);
  return { telegram, email };
}

/** Customer thank-you. Tries the orders@ sender, then enquiries@ if Resend refuses it. */
export async function sendCustomerEmail(o: OrderInfo, origin: string): Promise<Sent> {
  if (!o.email) return { ok: false, status: 400 };
  const m = customerEmail(o, origin);
  const base = { to: o.email, reply_to: ENQUIRIES, subject: m.subject, text: m.text, html: m.html };
  const first = await sendEmail({ from: CUSTOMER_FROM, ...base });
  if (first.ok || ![403, 422].includes(first.status)) return first;
  return sendEmail({ from: CUSTOMER_FROM_FALLBACK, ...base });
}
