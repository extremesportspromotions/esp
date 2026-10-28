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

/**
 * Every club once. A club teaching both hang gliding and paragliding has one
 * entry per sport in clubs.json (one pin per sport); here it counts once.
 * Use this, and CLUB_COUNT, wherever the site says how many clubs there are.
 */
export const uniqueClubs: Club[] = (() => {
  const seen = new Set<string>();
  return clubs.filter((c) => {
    if (!isDualFlyingClub(c)) return true;
    const key = flyingKey(c);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
})();

/** The real number of clubs on the map, counted from clubs.json. */
export const CLUB_COUNT = uniqueClubs.length;
