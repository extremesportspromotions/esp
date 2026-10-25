/* Mocked end-to-end checks for the smart casual split. No real network: global fetch is stubbed. */
import { writeFileSync, mkdirSync } from "node:fs";
import { merch } from "@/components/shop/merch";
import { smartCasual } from "@/components/shop/smartCasual";
import { POST as checkout } from "@/app/api/shop/checkout/route";
import { POST as rates } from "@/app/api/shop/rates/route";
import { handleEvent } from "@/lib/shopWebhook";
import { buildOrder, customerEmail, recordEmail, telegramText } from "@/lib/orderMail";
import { unpackLines } from "@/lib/shop";

Object.assign(process.env, {
  STRIPE_SECRET_KEY: "sk_test_dummy", PRINTFUL_API_TOKEN: "pf_dummy", RESEND_API_KEY: "re_dummy",
  TELEGRAM_BOT_TOKEN: "tg_dummy", TELEGRAM_CHAT_ID: "1", PRINTFUL_CONFIRM_ORDERS: "false",
});
type Call = { url: string; body: string };
let calls: Call[] = [];
let fail: Partial<Record<"telegram" | "resend" | "printful", boolean>> = {};
const RATE = "4.99";
globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = String(input);
  const body = init?.body instanceof URLSearchParams ? init.body.toString() : String(init?.body ?? "");
  calls.push({ url, body });
  const j = (o: unknown, status = 200) => new Response(JSON.stringify(o), { status, headers: { "content-type": "application/json" } });
  if (url.includes("api.printful.com/shipping/rates")) return j({ result: [{ id: "STANDARD", name: "Flat Rate", rate: RATE, currency: "GBP" }] });
  if (url.includes("api.printful.com/orders")) return fail.printful ? j({ error: { message: "boom" } }, 500) : j({ result: { id: 999, status: "draft" } });
  if (url.includes("api.stripe.com")) return j({ url: "https://checkout.stripe.com/c/pay/test" });
  if (url.includes("api.telegram.org")) return fail.telegram ? j({ ok: false }, 500) : j({ ok: true });
  if (url.includes("api.resend.com")) return fail.resend ? j({ message: "no" }, 500) : j({ id: "e1" });
  throw new Error("unexpected fetch " + url);
}) as typeof fetch;

const kit = merch.find((p) => p.cat === "apparel")!;
const kitV = kit.variants.find((v) => !v.oos)!;
const shirt = smartCasual[0], gilet = smartCasual[3];
const shirtV = shirt.variants.find((v) => v.color === "Blue" && v.label === "L")!;
const giletV = gilet.variants.find((v) => v.color === "Azure" && v.label === "M")!;
const cases = {
  "smart-casual-only": [{ id: shirtV.id, qty: 1 }, { id: giletV.id, qty: 2 }],
  "printful-only": [{ id: kitV.id, qty: 1 }],
  mixed: [{ id: kitV.id, qty: 1 }, { id: shirtV.id, qty: 1 }],
};
const results: string[] = [];
let failures = 0;
const check = (name: string, ok: boolean, extra = "") => { results.push(`${ok ? "PASS" : "FAIL"} ${name}${extra ? " – " + extra : ""}`); if (!ok) failures++; };
const out = "/workspace/shop-preview/sc-mock";
mkdirSync(out, { recursive: true });

for (const [name, items] of Object.entries(cases)) {
  calls = []; fail = {};
  const r = await (await rates(new Request("http://x/api/shop/rates", { method: "POST", body: JSON.stringify({ items }) }))).json();
  const prf = calls.filter((c) => c.url.includes("printful")).length;
  const hasKit = items.some((l) => l.id === kitV.id), hasSc = items.some((l) => l.id !== kitV.id);
  const want = (hasKit ? 499 : 0) + (hasSc ? 695 : 0);
  check(`${name}: rate`, r.ok && r.pence === want && r.parcels === (hasKit && hasSc ? 2 : 1) && (hasKit ? prf === 1 : prf === 0), JSON.stringify(r));

  calls = [];
  const c = await checkout(new Request("http://x/api/shop/checkout", { method: "POST", headers: { origin: "https://esp-lemon.vercel.app", "x-forwarded-for": name }, body: JSON.stringify({ items }) }));
  const st = calls.find((x) => x.url.includes("stripe"))!;
  const f = new URLSearchParams(st.body);
  let sub = 0;
  for (let i = 0; f.get(`line_items[${i}][quantity]`); i++) sub += Number(f.get(`line_items[${i}][quantity]`)) * Number(f.get(`line_items[${i}][price_data][unit_amount]`));
  const ship = Number(f.get("shipping_options[0][shipping_rate_data][fixed_amount][amount]"));
  const meta = [...f.entries()].filter(([k]) => k.includes("metadata"));
  const longest = Math.max(...meta.map(([, v]) => v.length));
  check(`${name}: checkout`, c.status === 200 && ship === want && f.get("shipping_address_collection[allowed_countries][0]") === "GB" && longest <= 500,
    `subtotal £${(sub / 100).toFixed(2)} + delivery £${(ship / 100).toFixed(2)} ("${f.get("shipping_options[0][shipping_rate_data][display_name]")}") = £${((sub + ship) / 100).toFixed(2)}; longest metadata ${longest} chars`);

  // Webhook, as Stripe would send it after payment.
  const session = {
    id: `cs_test_${name}`, payment_status: "paid", amount_total: sub + ship,
    total_details: { amount_shipping: ship },
    metadata: Object.fromEntries(meta.filter(([k]) => k.startsWith("metadata[")).map(([k, v]) => [k.slice(9, -1), v])),
    customer_details: { email: "jo@example.com", name: "Jo Bloggs", phone: "+447700900123" },
    collected_information: { shipping_details: { name: "Jo Bloggs", address: { line1: "1 High Street", line2: "Flat 2", city: "Keswick", postal_code: "CA12 5AB", country: "GB" } } },
  };
  for (const scenario of ["all ok", "telegram down", "resend down", "printful down"] as const) {
    calls = [];
    fail = { telegram: scenario === "telegram down", resend: scenario === "resend down", printful: scenario === "printful down" };
    const res = await handleEvent({ type: "checkout.session.completed", data: { object: session } }, "https://www.extremesportspromotions.com");
    const orders = calls.filter((x) => x.url.includes("printful.com/orders"));
    const tg = calls.filter((x) => x.url.includes("telegram")).length;
    const mails = calls.filter((x) => x.url.includes("resend")).map((x) => JSON.parse(x.body));
    const pfItems = orders[0] ? JSON.parse(orders[0].body).items.length : 0;
    const okOrder = hasKit ? orders.length === 1 && pfItems === 1 : orders.length === 0;
    const expectStatus = scenario === "printful down" && hasKit ? 502 : 200;
    const toRecord = mails.filter((m) => m.to === "enquiries@extremesportspromotions.com" || (Array.isArray(m.to) && m.to.includes("enquiries@extremesportspromotions.com")));
    const toCustomer = mails.filter((m) => JSON.stringify(m.to).includes("jo@example.com"));
    if (toCustomer[0] && !String(toCustomer[0].from).startsWith("SXPeaks <")) check(`${name}: customer from-name`, false, toCustomer[0].from);
    const wantCustomer = expectStatus === 200 ? 1 : 0;
    check(`${name}: webhook (${scenario})`, res.status === expectStatus && okOrder && tg === 1 && toRecord.length === 1 && toCustomer.length === wantCustomer,
      `status ${res.status}, printful orders ${orders.length} (items ${pfItems}), telegram ${tg}, record email ${toRecord.length}, customer email ${toCustomer.length}`);
    if (scenario === "all ok") {
      const order = buildOrder(session, unpackLines(session.metadata.items), { state: hasKit ? "created" : "none", id: hasKit ? 999 : undefined, status: "draft" });
      writeFileSync(`${out}/${name}-telegram.txt`, telegramText(order));
      const rec = recordEmail(order);
      writeFileSync(`${out}/${name}-record.txt`, `Subject: ${rec.subject}\n\n${rec.text}`);
      writeFileSync(`${out}/${name}-record.html`, rec.html);
      const cu = customerEmail(order, "https://www.extremesportspromotions.com");
      writeFileSync(`${out}/${name}-customer.txt`, `Subject: ${cu.subject}\n\n${cu.text}`);
      writeFileSync(`${out}/${name}-customer.html`, cu.html);
      const all = JSON.stringify([telegramText(order), rec, cu]);
      check(`${name}: no secrets in output`, !/dummy/.test(all));
      check(`${name}: brand spelt SXPeaks`, !/XSPeaks|XSPEAKS|Xspeaks/.test(all) && telegramText(order).startsWith("🛍 SXPeaks order #") && rec.subject.startsWith("SXPeaks order #") && cu.subject.startsWith("Thanks for your SXPeaks order #"));
      check(`${name}: customer copy clean`, !/printful|clothes2order|free\b|dropship/i.test(cu.text + cu.html), "");
    }
  }
}
// Not-yet-orderable smart casual colours (no saved supplier design) must be refused by the server.
{
  const { smartCasual } = await import("@/components/shop/smartCasual");
  const { madeInfo, notYetOrderable } = await import("@/lib/madeDesigns");
  const all = smartCasual.flatMap((p) => p.variants);
  const blocked = all.filter((v) => !madeInfo(v.id));
  const ny = notYetOrderable();
  check("not-yet: list matches variants without a design", blocked.length > 0 && ny.length === new Set(blocked.map((v) => `${Math.floor(v.id / 1000)}:${v.color}`)).size, `${ny.length} colours, ${blocked.length} variants`);
  check("not-yet: no design ids leak into the browser list", !/\d{7}/.test(JSON.stringify(ny.map((x) => [x.name, x.colour]))));
  for (const [label, items] of [["new style alone", [{ id: blocked[blocked.length - 1].id, qty: 1 }]], ["new colour of an existing style", [{ id: blocked.find((v) => Math.floor(v.id / 1000) === 9100003)!.id, qty: 1 }]], ["mixed with an orderable item", [{ id: shirtV.id, qty: 1 }, { id: blocked[0].id, qty: 1 }]]] as const) {
    calls = [];
    const c = await checkout(new Request("http://x/api/shop/checkout", { method: "POST", headers: { origin: "https://esp-lemon.vercel.app", "x-forwarded-for": "ny-" + label }, body: JSON.stringify({ items }) }));
    const r = await rates(new Request("http://x/api/shop/rates", { method: "POST", body: JSON.stringify({ items }) }));
    check(`not-yet: checkout refuses ${label}`, c.status === 400 && !calls.some((x) => x.url.includes("stripe")), `checkout ${c.status}, rates ${r.status}`);
    check(`not-yet: rates refuse ${label}`, r.status >= 400, `rates ${r.status}`);
  }
  const ok = all.filter((v) => madeInfo(v.id));
  check("not-yet: existing designs still orderable", ok.length > 0 && ok.every((v) => Math.floor(v.id / 1000) <= 9100005), `${ok.length} variants`);
}
console.log(results.join("\n"));
writeFileSync(`${out}/results.txt`, results.join("\n") + "\n");
process.exit(failures ? 1 : 0);
