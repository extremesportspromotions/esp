/**
 * Draft legal pages (Terms, Privacy, Refunds). Plain text so the same words
 * can be saved for checking. Square-bracket [placeholders] must be filled in by Matthew.
 * Items: a string is a paragraph; a string[] is a bullet list.
 */
export type LegalSection = { h: string; id?: string; body: (string | string[])[] };
export type LegalDoc = { slug: string; title: string; eyebrow: string; intro: string; sections: LegalSection[] };

const EMAIL = "enquiries@extremesportspromotions.com";
const WHO =
  "Extreme Sports Promotions (\"ESP\", \"we\", \"us\") is run by Matthew Thornton, trading as Extreme Sports Promotions (sole trader). Our address is [business address – a business address service will be used; no home address]. You can contact us at " +
  EMAIL +
  ".";

export const TERMS: LegalDoc = {
  slug: "terms",
  title: "Terms",
  eyebrow: "Draft terms",
  intro:
    "These terms explain how Extreme Sports Promotions works: our coach matching service, the match fee, and buying Devonshire clothing from our shop. Please read them before you pay. Last updated: 5 November 2026.",
  sections: [
    { h: "Who we are", body: [WHO] },
    {
      h: "What we do",
      body: [
        "ESP matches people in the UK with qualified extreme sports coaches and clubs. We research coaches near you, check their qualifications, insurance and references, match you with the right one and introduce you.",
        "We do not run training ourselves. Your training is a separate agreement between you and the coach or club, on their terms, and they bill you for it directly.",
      ],
    },
    {
      h: "The match fee",
      body: [
        "You pay a one-off match fee when you send your enquiry. The fee depends on what you are looking for:",
        [
          "Experience day (one person, one day): £19",
          "Become qualified (one person, one club, full course): £49",
          "Group experience day (a party, one taster day): £49",
          "Group qualification (team building, become qualified): £99",
        ],
        "ESP is not VAT registered, so prices do not include VAT.",
        "Card payments are taken by Stripe, our payment provider. We never see or store your full card details.",
        "Full refund if we can't match you within 14 days of your payment. See our Refund policy for the details.",
      ],
    },
    {
      h: "When our contract with you starts",
      body: [
        "Our contract for the matching service starts when your payment goes through and we confirm your enquiry by email.",
      ],
    },
    {
      h: "Your right to cancel the matching service",
      body: [
        "Under the Consumer Contracts Regulations 2013, you can cancel within 14 days of the contract starting, for any reason.",
        "Because you ask us to start looking for a coach straight away, if you cancel after we have started work but before we introduce you, we may keep a fair amount for the work already done. If we have already introduced you to a coach, the service is complete and the cancellation right no longer applies. Our 14-day match promise in the Refund policy still applies either way.",
        "To cancel, email " + EMAIL + " with your name and the email address you used.",
      ],
    },
    {
      h: "Safety and coaches",
      body: [
        "We only work with qualified coaches. Before we introduce you, we check the coach's qualifications, insurance and references. That checking is part of what the match fee pays for.",
        "Extreme sports carry real risks. You must follow the coach's and club's safety rules and fill in any medical or consent forms honestly.",
        "If you are under 18, you need a parent or guardian's consent, and they must be contactable.",
      ],
    },
    {
      h: "Buying from the Devonshire shop",
      body: [
        "Devonshire is the clothing brand of Extreme Sports Promotions. Each item is made to order for you once you pay, so please allow time for making and UK delivery. Delivery costs and estimated times are shown in your bag before you pay.",
        "We deliver to UK addresses only. Payment is taken by Stripe at checkout. Our contract for goods starts when we email you to confirm your order.",
        "Product photos show how items look, but colours can vary slightly between screens.",
        "You can cancel a shop order within 14 days of receiving it. Change-of-mind returns must be unworn with the tags attached, and you pay the return postage. Faulty, damaged or wrong items are replaced or refunded at ESP's cost, including return postage. See our Refund policy for the full details.",
      ],
    },
    {
      h: "Our responsibility to you",
      body: [
        "We will provide our service with reasonable care and skill, as the Consumer Rights Act 2015 requires, and shop goods will be as described, of satisfactory quality and fit for purpose.",
        "We are not responsible for the training itself, which the coach or club provides under their own terms and insurance. Nothing in these terms limits our liability for death or personal injury caused by our negligence, for fraud, or for anything else the law does not allow us to limit.",
        "If something goes wrong, our liability is limited to the amount you paid us, except where the law says otherwise.",
      ],
    },
    {
      h: "Problems and complaints",
      body: [
        "If you are unhappy with anything, email " + EMAIL + " and we will try to put it right. We aim to reply within [number] working days.",
      ],
    },
    {
      h: "General",
      body: [
        "These terms are governed by the law of England and Wales. If you live in Scotland or Northern Ireland, you can also bring proceedings in your local courts.",
        "We may update these terms. The version on this page when you pay is the one that applies to your order.",
      ],
    },
  ],
};

export const REFUNDS: LegalDoc = {
  slug: "refunds",
  title: "Refund policy",
  eyebrow: "Draft refund policy",
  intro: "How refunds work for the match fee and for Devonshire shop orders. Last updated: 5 November 2026.",
  sections: [
    {
      h: "Match fee: our 14-day promise",
      body: [
        "Full refund if we can't match you within 14 days of your payment. You don't need to ask: if the 14 days pass without an introduction, we refund the full match fee to the card you paid with.",
        "We also refund the match fee in full if your health means you can't train.",
      ],
    },
    {
      h: "Match fee: cancelling within 14 days",
      body: [
        "You can cancel within 14 days of paying. If we haven't started work, you get a full refund. If we have started but not yet introduced you, we may keep a fair amount for the work done. Once we have introduced you to a coach, the matching service is complete.",
        "The training itself is paid to the coach or club. Ask them about their own cancellation and refund rules.",
      ],
    },
    {
      h: "Shop orders: changing your mind",
      body: [
        "Under the Consumer Contracts Regulations 2013, you can cancel a shop order within 14 days of the day you receive it. Email " + EMAIL + " with your order details to tell us. Please contact us before sending anything back.",
        "Once you've told us, you have a further 14 days to return the item. Change-of-mind returns must be unworn, with the tags still attached, and in the condition you received them. You pay the return postage on a change-of-mind return.",
        "We refund the item price and the standard delivery cost to your original payment method within 14 days of receiving the return. If an item has been worn, washed, or handled more than needed to check it, or the tags have been removed, we may reduce the refund.",
      ],
    },
    {
      h: "Shop orders: faulty, damaged or wrong items",
      body: [
        "Under the Consumer Rights Act 2015, goods must be as described, of satisfactory quality and fit for purpose. If a Devonshire item arrives faulty, damaged or wrong, email " + EMAIL + " with a photo of the problem and we will replace it or refund you at ESP's cost, including the return postage.",
        "Tell us within 30 days of delivery for a full refund or a replacement. After 30 days, you're entitled to a repair or replacement, and a refund if that doesn't fix the problem. ESP still covers the return postage when the item is faulty, damaged or wrong.",
      ],
    },
    {
      h: "How refunds are paid",
      body: [
        "Refunds go back to your original payment method, through Stripe, within 14 days of us receiving the return. Your bank may take a few working days after that to show the money.",
      ],
    },
    { h: "Contact", body: [WHO] },
  ],
};

export const PRIVACY: LegalDoc = {
  slug: "privacy",
  title: "Privacy notice",
  eyebrow: "Your privacy",
  intro:
    "This notice explains what personal details ESP collects, why, who we share them with, how long we keep them and your rights under UK data protection law (the UK GDPR and the Data Protection Act 2018). Last updated: 5 November 2026.",
  sections: [
    {
      h: "Who we are",
      body: [WHO + " We are the controller of the personal details described here. [ICO registration number, if registered.]"],
    },
    {
      h: "What we collect",
      body: [
        [
          "Coach enquiries: your name, email, phone number, best time to call, sport, level and goal, age band, town or city and how far you'll travel, the type of booking, and that you understand the risks of the sport.",
          "If you're under 18: your parent or guardian's name and phone number and confirmation of their consent.",
          "Health: any injury or health condition you choose to tell us about. This is optional.",
          "Match fee payments: Stripe tells us whether you paid, the amount and your email. We never see your full card details.",
          "Shop orders: your name, delivery address, email, phone number (if given) and what you ordered.",
          "Launch sign-up: your email address and that you agreed to hear from us.",
          "Club forms: the details you send through the club interest or \"request a club\" forms.",
          "The emails you send us and our replies.",
        ],
      ],
    },
    {
      h: "Why we use it, and our lawful basis",
      body: [
        [
          "To reply to your enquiry, find and introduce a coach, and take the match fee: because it's needed for our contract with you, or to take steps you've asked for before one.",
          "To make, post and support your shop order, and handle returns: our contract with you.",
          "Health details: only with your explicit consent, and only to pass relevant information to the coach you're introduced to so they can train you safely. You can withdraw consent at any time.",
          "Launch emails: your consent. Each email has a way to unsubscribe, or just email us.",
          "Club forms: our legitimate interest in replying to clubs and keeping the club finder accurate.",
          "Keeping records for tax and accounting: our legal obligations.",
        ],
        "We never sell your details, and we don't use them for advertising.",
      ],
    },
    {
      h: "Who we share it with",
      body: [
        "We share your details only as needed to run the site and our service:",
        [
          "The coach or club we're introducing you to, and only after checking with you.",
          "Stripe, which handles card payments.",
          "FormSubmit, which delivers enquiry forms to our inbox. It says it keeps a copy for up to 30 days.",
          "Google (Gmail), which provides our email, and Resend, which sends our confirmation and order emails.",
          "Telegram, which sends Matthew an alert when a new enquiry arrives.",
          "Vercel, which hosts this website.",
          "For shop orders: the partners who make and embroider your items, and the couriers who deliver them. They get only your name, delivery address and order details.",
          "Awin, our affiliate network, if you click an affiliate link on the shop page.",
        ],
        "Some of these services store data outside the UK. Where they do, they use legal safeguards approved under UK law, such as the UK International Data Transfer Agreement or standard contractual clauses.",
        "We'll share details with the police or other authorities only where the law requires it.",
      ],
    },
    {
      h: "Cookies",
      body: [
        "We don't use advertising or tracking cookies. Stripe sets cookies on its checkout pages to keep payments secure. Awin may set a cookie when you click an affiliate link, so the purchase can be tracked.",
      ],
    },
    {
      h: "How long we keep it",
      body: [
        [
          "Enquiries: up to 12 months after your last contact with us.",
          "Payment and shop order records: 6 years, as tax law requires.",
          "Launch sign-ups: until we've told you about the launch, or until you unsubscribe.",
          "Club forms: up to 12 months after our last contact.",
        ],
        "You can ask us to delete your details sooner, unless we have to keep them by law.",
      ],
    },
    {
      h: "Your rights",
      body: [
        "You can ask for a copy of your details, ask us to correct or delete them, object to or restrict how we use them, ask for them in a portable format, and withdraw consent at any time. Email " + EMAIL + ". We'll reply within one month.",
      ],
    },
    {
      h: "Complaints",
      body: [
        "If you're unhappy with how we've handled your details, please tell us first so we can put it right. You can also complain to the Information Commissioner's Office (ICO) at ico.org.uk or on 0303 123 1113.",
      ],
    },
  ],
};
