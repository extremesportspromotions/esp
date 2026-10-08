"use client";

import dynamic from "next/dynamic";
import { useDeferredValue, useEffect, useId, useMemo, useState } from "react";
import {
  clubs,
  clubCountsBySport,
  DUAL_FLYING_NOTE,
  isDualFlyingClub,
  type Club,
} from "@/data/clubs";
import { sports } from "@/data/sports";
import { formatUkPhone, ukPhoneHref } from "@/lib/phone";

const ClubsMapInner = dynamic(() => import("./ClubsMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center rounded-xl border border-[#1C1917]/10 bg-surface text-sm text-[#1C1917]/60">
      Loading map…
    </div>
  ),
});

const ALL = "all";
const PAGE_SIZE = 25;

const norm = (v: string) =>
  v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export default function ClubsMapSection() {
  const [sportFilter, setSportFilter] = useState<string>(ALL);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const deferredQuery = useDeferredValue(query);
  const searchId = useId();
  const counts = useMemo(() => clubCountsBySport(), []);

  // Deep links such as /?sport=skydiving#find-a-club (used by the Guides pages)
  // pre-select that sport on the map.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("sport");
    if (requested && sports.some((s) => s.id === requested)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSportFilter(requested);
    }
  }, []);

  const sportLabel = (id: string) => {
    const sport = sports.find((s) => s.id === id);
    return sport?.mapLabel ?? sport?.name ?? id;
  };

  const bySport: Club[] = useMemo(() => {
    if (sportFilter === ALL) return clubs;
    return clubs.filter((c) => c.sportId === sportFilter);
  }, [sportFilter]);

  // Search by club name, town, region or sport. Filters the map and the list.
  const searchTerms = useMemo(() => norm(deferredQuery).split(" ").filter(Boolean), [deferredQuery]);
  const filtered: Club[] = useMemo(() => {
    if (searchTerms.length === 0) return bySport;
    return bySport.filter((c) => {
      const sport = sports.find((s) => s.id === c.sportId);
      const hay = norm(
        [c.name, c.town, c.region, sport?.name, sport?.mapLabel, c.subActivity?.replace(/-/g, " ")]
          .filter(Boolean)
          .join(" "),
      );
      return searchTerms.every((t) => hay.includes(t));
    });
  }, [bySport, searchTerms]);

  const sortedClubs = useMemo(
    () => [...filtered].sort((a, b) => a.name.localeCompare(b.name) || a.sportId.localeCompare(b.sportId)),
    [filtered],
  );

  // Keep the list folded away until someone picks a sport, searches or asks for it,
  // so How it works and the form are not pushed far down the page.
  const listOpen = sportFilter !== ALL || query.trim() !== "" || showAll;
  const listClubs = sortedClubs.slice(0, visible);
  const remaining = sortedClubs.length - listClubs.length;

  const chooseSport = (id: string) => {
    setSportFilter(id);
    setSelectedId(null);
    setVisible(PAGE_SIZE);
    if (id === ALL) setShowAll(true);
  };

  return (
    <section id="find-a-club" className="relative bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            UK club finder
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold text-[#1C1917] sm:text-4xl lg:text-5xl">
            Find a club
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#1C1917]/70 sm:text-lg">
            Explore {clubs.length.toLocaleString()} UK clubs, centres, and schools
            that offer coaching, lessons, or courses. Every venue listed has a
            website. Filter by sport to focus the
            map, then open a pin for the website, phone, or email.
          </p>
          <p className="mt-3 rounded-lg border border-[#1C1917]/10 bg-white px-4 py-3 text-sm text-[#1C1917]/65">
            Browse clubs, centres and schools. Open a pin for the website or
            phone number. ESP does not book the session. Want a coach instead?{" "}
            <a
              href="#enquire"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              Send an enquiry
            </a>
            .
          </p>
        </div>

        <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Filter clubs by sport">
          <button
            type="button"
            role="tab"
            aria-selected={sportFilter === ALL}
            onClick={() => chooseSport(ALL)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              sportFilter === ALL
                ? "bg-accent text-white"
                : "bg-[#1C1917]/10 text-[#1C1917]/80 hover:bg-[#1C1917]/15"
            }`}
          >
            All{" "}<span className="opacity-70">{clubs.length}</span>
          </button>
          {sports.map((s) => {
            const n = counts[s.id] ?? 0;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={sportFilter === s.id}
                onClick={() => chooseSport(s.id)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  sportFilter === s.id
                    ? "bg-accent text-white"
                    : n === 0
                      ? "bg-[#1C1917]/5 text-[#1C1917]/35"
                      : "bg-[#1C1917]/10 text-[#1C1917]/80 hover:bg-[#1C1917]/15"
                }`}
              >
                {s.mapLabel ?? s.name}{" "}
                <span className="ml-0.5 opacity-70">{n}</span>
              </button>
            );
          })}
        </div>

        <div className="mb-5 max-w-md">
          <label htmlFor={searchId} className="mb-1.5 block text-sm font-medium text-[#1C1917]">
            Search clubs
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
              setSelectedId(null);
            }}
            placeholder="Club name, town or region"
            autoComplete="off"
            enterKeyHint="search"
            className="w-full rounded-xl border border-[#1C1917]/20 bg-white px-4 py-2.5 text-base text-[#1C1917] placeholder:text-[#1C1917]/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>

        {sportFilter !== ALL && bySport.length === 0 ? (
          <div
            role="status"
            className="mb-4 rounded-lg border border-[#1C1917]/10 bg-white px-4 py-3 text-sm text-[#1C1917]/70"
          >
            <p className="font-semibold text-[#1C1917]">
              No listed coaching venues yet for {sportLabel(sportFilter)}.
            </p>
            <p className="mt-1">
              {sportFilter === "base-jumping"
                ? "BASE jumping has almost no publicly listed affiliated clubs in the UK (activity is typically informal and site-restricted). We do not invent entries — check British Skydiving drop zones for related canopy skills."
                : "We only list venues we have checked for coaching and contact details, and none made the cut for this sport yet."}{" "}
              <a
                href="#enquire"
                className="font-semibold text-accent underline-offset-2 hover:underline"
              >
                Ask us to find you a coach
              </a>
              .
            </p>
          </div>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="h-[52vh] min-h-[420px] overflow-hidden rounded-2xl border border-[#1C1917]/10 shadow-2xl shadow-black/30 lg:h-[640px]">
            <ClubsMapInner clubs={filtered} />
          </div>

          {!listOpen ? (
            <div className="flex flex-col items-start gap-3 self-start rounded-2xl border border-[#1C1917]/10 bg-white px-4 py-4">
              <p className="text-sm text-[#1C1917]/70">
                Pick a sport or search to see the club list.
              </p>
              <button
                type="button"
                onClick={() => chooseSport(ALL)}
                className="rounded-full border border-[#1C1917]/20 px-4 py-2 text-sm font-semibold text-[#1C1917] transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Show all {clubs.length} in a list
              </button>
            </div>
          ) : (
          <div
            id="club-list"
            className="flex max-h-[52vh] flex-col rounded-2xl border border-[#1C1917]/10 bg-white lg:max-h-[640px]"
          >
            <div className="border-b border-[#1C1917]/10 px-4 py-3">
              <p className="text-sm font-semibold text-[#1C1917]">
                {sportFilter === ALL ? "All sports" : sportLabel(sportFilter)}
                {query.trim() ? ` · “${query.trim()}”` : ""}
              </p>
              <p className="text-xs text-[#1C1917]/50" aria-live="polite">
                Showing {listClubs.length} of {sortedClubs.length}{" "}
                {sortedClubs.length === 1 ? "location" : "locations"}
              </p>
            </div>
            <ul className="flex-1 space-y-1 overflow-y-auto p-2" role="list">
              {listClubs.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-[#1C1917]/50">
                  {query.trim() ? "No clubs match that search." : "No listed coaching venues yet."}
                </li>
              ) : (
                listClubs.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(c.id)}
                      className={`w-full rounded-lg px-3 py-2.5 text-left transition hover:bg-[#1C1917]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                        selectedId === c.id ? "bg-[#1C1917]/10" : ""
                      }`}
                    >
                      <p className="text-sm font-medium text-[#1C1917]">{c.name}</p>
                      <p className="text-xs text-accent/90">{sportLabel(c.sportId)}</p>
                      {isDualFlyingClub(c) ? (
                        <p className="mt-0.5 inline-block rounded bg-[#1C1917]/5 px-1.5 py-0.5 text-[11px] font-semibold text-[#1C1917]/75">
                          {DUAL_FLYING_NOTE}
                        </p>
                      ) : null}
                      <p className="text-xs text-[#1C1917]/55">
                        {c.town}
                        {c.region ? ` · ${c.region}` : ""}
                      </p>
                      <span className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                        {c.url ? (
                          <a
                            href={c.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-[#1C1917]/80 underline hover:text-accent"
                          >
                            Visit website
                          </a>
                        ) : null}
                        {c.phone ? (
                          <a
                            href={ukPhoneHref(c.phone)}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-[#1C1917]/80 underline hover:text-accent"
                          >
                            {formatUkPhone(c.phone)}
                          </a>
                        ) : null}
                        {c.email ? (
                          <a
                            href={`mailto:${c.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-[#1C1917]/80 underline hover:text-accent"
                          >
                            Email
                          </a>
                        ) : null}
                      </span>
                    </button>
                  </li>
                ))
              )}
              {remaining > 0 ? (
                <li className="px-1 pb-1 pt-2">
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="w-full rounded-lg border border-[#1C1917]/15 px-3 py-2 text-sm font-semibold text-[#1C1917] transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Show {Math.min(PAGE_SIZE, remaining)} more ({remaining} left)
                  </button>
                </li>
              ) : null}
            </ul>
          </div>
          )}
        </div>

        <p className="mt-4 text-xs leading-relaxed text-[#1C1917]/40">
          Club locations are compiled from OpenStreetMap (Overpass), BHPA club
          listings, British Skydiving drop-zone directories, public wake-park
          guides, and other publicly listed centres. The map only shows venues
          that offer coaching or lessons and publish contact details. Shops and
          venues without a working website are left out. Last checked September
          2026. Coordinates are approximate. Always confirm details with the
          club before travelling.
        </p>
      </div>
    </section>
  );
}
