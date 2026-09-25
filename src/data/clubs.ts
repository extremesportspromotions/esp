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
