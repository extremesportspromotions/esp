/** Match fee prices in pence. The server charges from this list, never from the browser. */
export const MATCH_FEE_PRICES: Record<string, { name: string; pence: number }> = {
  "experience-day": { name: "Experience day (one person, one day)", pence: 1900 },
  "become-qualified": { name: "Become qualified (one person, one club, full course)", pence: 4900 },
  "group-experience-day": { name: "Group experience day (a party, one taster day)", pence: 4900 },
  "group-qualification": { name: "Group qualification (team building, become qualified)", pence: 9900 },
};
