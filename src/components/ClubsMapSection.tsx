"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { clubs, clubCountsBySport, type Club } from "@/data/clubs";
import { sports } from "@/data/sports";

const ClubsMapInner = dynamic(() => import("./ClubsMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center rounded-xl border border-white/10 bg-surface text-sm text-white/60">
      Loading map…
    </div>
  ),
});

const ALL = "all";

export default function ClubsMapSection() {
  const [sportFilter, setSportFilter] = useState<string>(ALL);
  const [selectedId, setSelectedId] = useState<string | null>(null);
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

  const filtered: Club[] = useMemo(() => {
    if (sportFilter === ALL) return clubs;
    return clubs.filter((c) => c.sportId === sportFilter);
  }, [sportFilter]);

  const listClubs = useMemo(() => {
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 80);
  }, [filtered]);

  const sportLabel = (id: string) =>
    sports.find((s) => s.id === id)?.name ?? id;

  return (
    <section id="find-a-club" className="relative bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            UK club finder
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Find a club
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/70 sm:text-lg">
            Explore {clubs.length.toLocaleString()} UK clubs, centres, and schools
            that offer coaching, lessons, or courses. Every venue listed has a
            working website and contact details. Filter by sport to focus the
            map, then open a pin for the website, phone, or email.
          </p>
          <p className="mt-3 rounded-lg border border-white/10 bg-ink/50 px-4 py-3 text-sm text-white/65">
            <span className="font-semibold text-white">Find a club</span> = browse
            venues near you (free). Want a coach instead?{" "}
            <a
              href="#enquire"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              Get matched for £30
            </a>
            .
          </p>
        </div>

        <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Filter clubs by sport">
          <button
            type="button"
            role="tab"
            aria-selected={sportFilter === ALL}
            onClick={() => {
              setSportFilter(ALL);
              setSelectedId(null);
            }}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              sportFilter === ALL
                ? "bg-accent text-white"
                : "bg-white/10 text-white/80 hover:bg-white/15"
            }`}
          >
            All ({clubs.length})
          </button>
          {sports.map((s) => {
            const n = counts[s.id] ?? 0;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={sportFilter === s.id}
                onClick={() => {
                  setSportFilter(s.id);
                  setSelectedId(null);
                }}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  sportFilter === s.id
                    ? "bg-accent text-white"
                    : n === 0
                      ? "bg-white/5 text-white/35"
                      : "bg-white/10 text-white/80 hover:bg-white/15"
                }`}
              >
                {s.name}
                <span className="ml-1.5 opacity-70">{n}</span>
              </button>
            );
          })}
        </div>

        {sportFilter !== ALL && filtered.length === 0 ? (
          <div
            role="status"
            className="mb-4 rounded-lg border border-white/10 bg-ink/60 px-4 py-3 text-sm text-white/70"
          >
            <p className="font-semibold text-white">
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
          <div className="h-[52vh] min-h-[420px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/30 lg:h-[640px]">
            <ClubsMapInner clubs={filtered} />
          </div>

          <div className="flex max-h-[52vh] flex-col rounded-2xl border border-white/10 bg-ink/50 lg:max-h-[640px]">
            <div className="border-b border-white/10 px-4 py-3">
              <p className="text-sm font-semibold text-white">
                {sportFilter === ALL ? "All sports" : sportLabel(sportFilter)}
              </p>
              <p className="text-xs text-white/50">
                Showing {Math.min(listClubs.length, filtered.length)} of{" "}
                {filtered.length} locations
                {filtered.length > listClubs.length ? " (list capped)" : ""}
              </p>
            </div>
            <ul className="flex-1 space-y-1 overflow-y-auto p-2" role="list">
              {listClubs.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-white/50">
                  No listed coaching venues yet.
                </li>
              ) : (
                listClubs.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(c.id)}
                      className={`w-full rounded-lg px-3 py-2.5 text-left transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                        selectedId === c.id ? "bg-white/10" : ""
                      }`}
                    >
                      <p className="text-sm font-medium text-white">{c.name}</p>
                      <p className="text-xs text-accent/90">{sportLabel(c.sportId)}</p>
                      <p className="text-xs text-white/55">
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
                            className="text-xs text-white/80 underline hover:text-accent"
                          >
                            Visit website
                          </a>
                        ) : null}
                        {c.phone ? (
                          <a
                            href={`tel:${c.phone.replace(/[^+\d]/g, "")}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-white/80 underline hover:text-accent"
                          >
                            {c.phone}
                          </a>
                        ) : null}
                        {c.email ? (
                          <a
                            href={`mailto:${c.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-white/80 underline hover:text-accent"
                          >
                            Email
                          </a>
                        ) : null}
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-white/40">
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
