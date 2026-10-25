/**
 * Copy for the SXPeaks health page (/health).
 * Approved copy from SXPeaks Health, 25 Oct 2026. Edit the words here; the page layout
 * lives in src/app/health/page.tsx. Brand is always written "SXPeaks".
 *
 * Inline text is a list of parts: a plain string, or { text, href } for a link,
 * or { text, bold: true } for bold text.
 */

export type InlinePart = string | { text: string; href?: string; bold?: boolean };

export type LeadItem = { lead: string; text: string };

export type SupportEntry = {
  name: string;
  /** Optional link for the name itself (Shout website, NHS 111 phone). */
  url?: string;
  /** The line after the name, with links. */
  parts: InlinePart[];
  /** Show the whole line in bold (the 999 line). */
  bold?: boolean;
};

export type HealthContent = {
  title: string;
  description: string;
  intro: string;
  disclaimer: string;
  mental: {
    heading: string;
    talk: LeadItem;
    tipsHeading: string;
    tips: LeadItem[];
    storiesHeading: string;
    /** Marked as an example placeholder on the page until a real, consented story arrives. */
    storyPlaceholder: string;
  };
  fitness: {
    heading: string;
    intro: string;
    disclaimer: string;
    tipsHeading: string;
    tips: LeadItem[];
  };
  support: {
    heading: string;
    intro: string;
    entries: SupportEntry[];
  };
};

export const health: HealthContent = {
  title: "SXPeaks health",
  description:
    "SXPeaks is about speaking up: mental health awareness, simple ways to get moving, and where to get support.",
  intro:
    "SXPeaks is about speaking up. Speaking openly about how we feel, and making it normal to ask \u201chow are you, really?\u201d We believe in the simple things: getting outdoors, moving your body, and spending time with people who\u2019ve got your back.",
  disclaimer:
    "This page shares general information only. It isn\u2019t medical advice and doesn\u2019t replace advice from your GP or another health professional.",
  mental: {
    heading: "Mental health awareness",
    talk: {
      lead: "It\u2019s OK to talk.",
      text: "Everyone has ups and downs, and talking about them is a sign of strength. Saying it out loud to a friend, family member or someone you trust can make a hard day feel a little lighter.",
    },
    tipsHeading: "Simple things worth trying",
    tips: [
      { lead: "Check in.", text: "Send a message to a mate you haven\u2019t heard from in a while." },
      { lead: "Get outside.", text: "A walk, a bit of fresh air or some time by the water gives you space to clear your head." },
      { lead: "Keep moving.", text: "Whatever kind of movement you enjoy, at your own pace." },
      { lead: "Find your people.", text: "Join a club, a group walk or a local meetup. Friendships often start with turning up." },
      { lead: "Listen.", text: "Sometimes the best thing you can do for someone is to let them speak." },
    ],
    storiesHeading: "Real stories",
    storyPlaceholder: "Space for a real story shared with written consent. No story goes live without one.",
  },
  fitness: {
    heading: "Fitness health",
    intro: "You don\u2019t need a gym or fancy kit to get started. Small, regular bits of movement add up.",
    disclaimer:
      "If you have a health condition, an injury, or you\u2019re unsure whether exercise is right for you, check with your GP before starting.",
    tipsHeading: "Easy ways to start",
    tips: [
      { lead: "Walk more.", text: "Start with a short walk most days and build up gradually." },
      { lead: "Warm up and cool down.", text: "A few minutes of gentle movement before and after activity." },
      { lead: "Try simple bodyweight moves.", text: "Squats, wall press-ups and step-ups, at a level that feels comfortable." },
      { lead: "Stretch.", text: "Gentle stretches you hold without bouncing." },
      { lead: "Rest and recover.", text: "Drink water, get good sleep, and take rest days." },
      { lead: "Listen to your body.", text: "Stop if something hurts, and don\u2019t push through pain." },
      { lead: "Make it social.", text: "Moving with friends makes it easier to keep going." },
    ],
  },
  support: {
    heading: "Need support now?",
    intro: "If you\u2019re struggling, you don\u2019t have to face it alone.",
    entries: [
      {
        name: "Samaritans",
        parts: [
          "call ",
          { text: "116 123", href: "tel:116123" },
          ", any time, day or night (",
          { text: "samaritans.org", href: "https://www.samaritans.org" },
          ")",
        ],
      },
      {
        name: "Shout",
        url: "https://giveusashout.org",
        parts: [{ text: "text SHOUT to 85258", href: "sms:85258?&body=SHOUT" }],
      },
      {
        name: "Mind",
        parts: ["information and support at ", { text: "mind.org.uk", href: "https://www.mind.org.uk" }],
      },
      {
        name: "NHS 111",
        url: "tel:111",
        parts: ["for urgent help that isn\u2019t an emergency"],
      },
      {
        name: "",
        bold: true,
        parts: [
          "In an emergency, or if you or someone else is in immediate danger, call ",
          { text: "999", href: "tel:999" },
          ".",
        ],
      },
    ],
  },
};
