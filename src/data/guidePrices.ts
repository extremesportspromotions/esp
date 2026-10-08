/**
 * "What it costs" box shown near the end of every sport guide, directly above the
 * closing club map / enquiry line. One entry per sport, keyed by sport slug.
 *
 * Source: /home/box/agent-data/shared/esp/uk-sport-prices-2026-10.md (checked October 2026).
 * Rules:
 * - Show the real UK range from each sport's notes. Never the "Guide price to show"
 *   figure, and never a figure with the 20 percent added.
 * - Three rows: experience day, "Become qualified" (always that label), then hourly (or per dive, per coached
 *   jump or per day where the notes say so). Every value starts "Typical UK price:" (BASE: "Typical price abroad:"), with the course name
 *   in short brackets. If the notes have no range, leave the row out.
 * - Related activities (skiing, BMX, rafting, coasteering, rock climbing, indoor
 *   skydiving) share the parent sport's box.
 * - These are what a club, school or coach charges. Never mention the ESP match fee here.
 */

export type GuidePriceRow = { label: string; text: string };

export const GUIDE_PRICES_NOTE =
  "Typical UK prices, checked October 2026. The club or coach sets and bills the price.";

export const GUIDE_PRICES_TITLE = "What it costs";

export const GUIDE_PRICES: Record<string, GuidePriceRow[]> = {
  "mountaineering": [
    { label: "Experience day", text: "Typical UK price: £50 to £150 per person" },
    { label: "Become qualified", text: "Typical UK price: £450 to £1,000 (Rock Climbing Instructor to Mountain Leader; registration extra)" },
    { label: "Hourly", text: "Typical UK price: £25 to £60 an hour (indoor wall to private outdoor)" },
  ],
  "scuba-diving": [
    { label: "Experience day", text: "Typical UK price: £40 to £160 per person" },
    { label: "Become qualified", text: "Typical UK price: £395 to £900 (PADI or SSI Open Water)" },
    { label: "Per dive", text: "Typical UK price: £45 to £120 a dive" },
  ],
  "paragliding": [
    { label: "Experience day", text: "Typical UK price: £120 to £230 per person (BHPA day membership sometimes extra)" },
    { label: "Become qualified", text: "Typical UK price: £1,200 to £1,700 (Elementary Pilot + Club Pilot; BHPA membership extra)" },
    { label: "Per day", text: "Typical UK price: £140 to £200 a day" },
  ],
  "mountain-biking": [
    { label: "Experience day", text: "Typical UK price: £65 to £180 per person" },
    { label: "Become qualified", text: "Typical UK price: £250 to £600 (British Cycling coaching award)" },
    { label: "Hourly", text: "Typical UK price: £35 to £70 an hour" },
  ],
  "wakeboarding": [
    { label: "Experience day", text: "Typical UK price: £45 to £165 per person (30-minute intro to a private hour)" },
    { label: "Become qualified", text: "Typical UK price: £595 to £850 (BWSW Level 1 and 2, with boat-driver ticket, first aid and disclosure check)" },
    { label: "Hourly", text: "Typical UK price: £40 to £165 an hour (shared cable to private with a coach)" },
  ],
  "skydiving": [
    { label: "Experience day", text: "Typical UK price: £149 to £349 per person (video extra)" },
    { label: "Become qualified", text: "Typical UK price: £1,200 to £1,900 (AFF + A licence; British Skydiving membership extra)" },
    { label: "Per coached jump", text: "Typical UK price: £40 to £80 a coached jump" },
  ],
  "motocross": [
    { label: "Experience day", text: "Typical UK price: £179 to £350 per person (bike and kit included)" },
    { label: "Become qualified", text: "Typical UK price: £285 to £560 (coached development day)" },
    { label: "Hourly", text: "Typical UK price: £40 to £140 an hour (track time on a hire bike to one-to-one coaching)" },
  ],
  "kiteboarding": [
    { label: "Experience day", text: "Typical UK price: £130 to £199 per person" },
    { label: "Become qualified", text: "Typical UK price: £255 to £1,000 (beginner to independent rider)" },
    { label: "Hourly", text: "Typical UK price: £65 to £90 an hour (private lesson)" },
  ],
  "wingsuit-flying": [
    { label: "First-flight course (after about 200 skydives)", text: "Typical UK price: £250 to £600 per person (jump tickets extra)" },
    { label: "Become qualified", text: "Typical UK price: £6,000 to £12,000 from no jumps (AFF, about 200 jumps, a first-flight course and a wingsuit)" },
    { label: "Per coached jump", text: "Typical UK price: £40 to £100 a coached jump" },
  ],
  "skateboarding": [
    { label: "Experience day", text: "Typical UK price: £28 to £45 per person (one-hour lesson with board and pads)" },
    { label: "Become qualified", text: "Typical UK price: £150 to £450 (coaching award)" },
    { label: "Hourly", text: "Typical UK price: £15 to £60 an hour (group to private)" },
  ],
  "surfing": [
    { label: "Experience day", text: "Typical UK price: £35 to £50 per person (two-hour group lesson with wetsuit and board)" },
    { label: "Become qualified", text: "Typical UK price: £120 to £250 (beginner course of 3 to 5 lessons)" },
    { label: "Hourly", text: "Typical UK price: £18 to £70 an hour (group to private)" },
  ],
  "base-jumping": [
    { label: "First BASE course, abroad (after about 200 skydives)", text: "Typical price abroad: £1,250 to £2,600 per person (four or five days)" },
    { label: "Become qualified", text: "Typical price abroad: £1,250 to £2,600 (the first BASE course is the entry step; there is no UK qualification)" },
    { label: "Per day", text: "Typical price abroad: £200 to £400 a day for coaching" },
  ],
  "snowboarding": [
    { label: "Experience day", text: "Typical UK price: £90 to £150 per person (full day on an indoor or dry slope)" },
    { label: "Become qualified", text: "Typical UK price: £720 to £1,200 (BASI Level 1, indoor package)" },
    { label: "Hourly", text: "Typical UK price: £20 to £90 an hour (group to private)" },
  ],
  "kayaking": [
    { label: "Experience day", text: "Typical UK price: £35 to £90 per person" },
    { label: "Become qualified", text: "Typical UK price: £220 to £500 (Paddle UK instructor to White Water Leader)" },
    { label: "Hourly", text: "Typical UK price: £35 to £60 an hour with a coach" },
  ],
  "hang-gliding": [
    { label: "Experience day", text: "Typical UK price: £180 to £220 per person (one-day taster)" },
    { label: "Become qualified", text: "Typical UK price: £1,300 to £1,600 (Elementary Pilot + Club Pilot; BHPA membership extra)" },
    { label: "Per day", text: "Typical UK price: £140 to £200 a day" },
  ],
};
