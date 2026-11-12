/** Match fee prices in pence. The server charges from this list, never from the browser. */

const PRIVATE_MATCH_FEE_PRICES: Record<string, { name: string; pence: number }> = {
  "experience-day": { name: "Experience day (one person, one day)", pence: 1900 },
  "become-qualified": { name: "Become qualified (one person, one club, full course)", pence: 4900 },
  "group-experience-day": { name: "Group experience day (a private group of up to 5, one taster day)", pence: 4900 },
  "group-qualification": { name: "Group qualification (a private group of up to 5, become qualified)", pence: 9900 },
};

/** Corporate rates: £99 / £199 per group of up to 5, stored for 1 to 10 groups. */
export const CORPORATE_TEAMS_PENCE = 9900;
export const CORPORATE_COMPANY_PENCE = 19900;
export const MAX_CORPORATE_GROUPS = 10;

export type CorporateBand = "corporate-teams" | "corporate-company";

export function groupsForPeople(people: number): number {
  if (!Number.isFinite(people) || people < 1) return 0;
  return Math.ceil(people / 5);
}

export function corporateFeeKey(band: CorporateBand, groups: number): string {
  return `${band}-${groups}`;
}

function corporatePrices(): Record<string, { name: string; pence: number }> {
  const out: Record<string, { name: string; pence: number }> = {};
  for (let groups = 1; groups <= MAX_CORPORATE_GROUPS; groups++) {
    const teamPence = CORPORATE_TEAMS_PENCE * groups;
    const companyPence = CORPORATE_COMPANY_PENCE * groups;
    const teamLabel =
      groups === 1
        ? "Teams, clubs and groups (£99 per group of up to 5)"
        : `Teams, clubs and groups (£${teamPence / 100} for ${groups} groups of up to 5)`;
    const companyLabel =
      groups === 1
        ? "Companies (£199 per group of up to 5, with one named contact and an invoice for your accounts)"
        : `Companies (£${companyPence / 100} for ${groups} groups of up to 5, with one named contact and an invoice for your accounts)`;
    out[corporateFeeKey("corporate-teams", groups)] = { name: teamLabel, pence: teamPence };
    out[corporateFeeKey("corporate-company", groups)] = { name: companyLabel, pence: companyPence };
  }
  return out;
}

export const MATCH_FEE_PRICES: Record<string, { name: string; pence: number }> = {
  ...PRIVATE_MATCH_FEE_PRICES,
  ...corporatePrices(),
};
