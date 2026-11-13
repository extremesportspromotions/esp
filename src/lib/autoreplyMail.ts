import { PAYMENT_MODE } from "@/lib/payment";
import { emailEsc, emailLayout, emailPanel, emailPara, EMAIL_COLOURS } from "@/lib/emailLayout";

const SITE = "https://www.extremesportspromotions.com";
export const AUTOREPLY_SUBJECT = "We've got your ESP enquiry";

/** Student confirmation after an enquiry. Content is fixed; only a first name and a known sport name are filled in. */
export function autoreplyEmail(firstName: string, sportName: string) {
  const sportLower = sportName.toLowerCase();
  const greeting = firstName ? `Hi ${firstName},` : "Hi,";
  const about = sportName ? ` about ${sportLower}` : "";
  const lines = [
    greeting,
    `Thanks for your enquiry${about} with Extreme Sports Promotions. We have your details.`,
    PAYMENT_MODE === "stripe-checkout"
      ? "We start finding your UK coach as soon as your match fee is paid. If you didn't finish paying, we'll email you a secure payment link. You get a full refund if we can't find you a coach within 14 days. The coach or club bills you separately for the training."
      : "Next, we'll email you a secure payment link for your match fee. We start finding your UK coach as soon as it's paid, and you get a full refund if we can't find you a coach within 14 days. The coach or club bills you separately for the training.",
    "Any questions, just reply to this email or write to enquiries@extremesportspromotions.com.",
    "Matthew\nExtreme Sports Promotions\nhttps://www.extremesportspromotions.com",
  ];
  const text = lines.join("\n\n");
  const link = `<a href="${SITE}" style="color:${EMAIL_COLOURS.navy}">www.extremesportspromotions.com</a>`;
  const toHtml = (l: string) => emailEsc(l).replace(/\n/g, "<br>").replace(SITE, link);
  const body = [
    emailPara(toHtml(lines[0])),
    emailPara(toHtml(lines[1])),
    emailPanel(emailPara(toHtml(lines[2]), "margin:0")),
    emailPara(toHtml(lines[3])),
    emailPara(toHtml(lines[4]), "margin:18px 0 14px"),
  ].join("");
  const html = emailLayout({
    title: AUTOREPLY_SUBJECT,
    body,
    footer: `Extreme Sports Promotions · <a href="${SITE}" style="color:#ffffff;text-decoration:underline">www.extremesportspromotions.com</a>`,
  });
  return { subject: AUTOREPLY_SUBJECT, text, html };
}
