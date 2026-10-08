import clubsData from "./clubs.json";

export type Club = {
  id: string;
  name: string;
  sportId: string;
  town: string;
  region: string;
  lat: number;
  lng: number;
  url?: string;
  phone?: string;
  email?: string;
  /** Scout's activity tag within the widened sport, e.g. coasteering, bmx, wind-tunnel */
  subActivity?: string;
};

export const clubs = clubsData as Club[];

export function clubsBySport(sportId: string | null): Club[] {
  if (!sportId || sportId === "all") return clubs;
  return clubs.filter((c) => c.sportId === sportId);
}

export function clubCountsBySport(): Record<string, number> {
  return clubs.reduce<Record<string, number>>((acc, c) => {
    acc[c.sportId] = (acc[c.sportId] ?? 0) + 1;
    return acc;
  }, {});
}

const FLYING = new Set(["hang-gliding", "paragliding"]);
const flyingKey = (c: Club) => c.name.trim().toLowerCase();

/** Clubs listed under both hang gliding and paragliding (same club, one pin per sport). */
const dualFlyingNames = (() => {
  const seen = new Map<string, Set<string>>();
  for (const c of clubs) {
    if (!FLYING.has(c.sportId)) continue;
    const key = flyingKey(c);
    if (!seen.has(key)) seen.set(key, new Set());
    seen.get(key)!.add(c.sportId);
  }
  return new Set([...seen].filter(([, s]) => s.size === 2).map(([k]) => k));
})();

export const DUAL_FLYING_NOTE = "Hang gliding & paragliding";

/** True when this club teaches both hang gliding and paragliding. */
export function isDualFlyingClub(c: Club): boolean {
  return FLYING.has(c.sportId) && dualFlyingNames.has(flyingKey(c));
}
