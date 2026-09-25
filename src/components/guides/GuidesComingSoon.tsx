import { GENERAL_SPORT } from "@/data/guides-meta";

export default function GuidesComingSoon({ sport, sportName }: { sport?: string; sportName?: string }) {
  const hasSport = sport && sport !== "all" && sport !== GENERAL_SPORT;
  const mapHref = hasSport ? `/?sport=${sport}#find-a-club` : "/#find-a-club";
  const enquireHref = hasSport ? `/?sport=${sport}#enquire` : "/#enquire";
  return (
    <div
      role="status"
      className="rounded-3xl border border-dashed border-white/20 bg-surface/60 px-6 py-12 text-center sm:px-10"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-soft">
        {hasSport ? sportName : "Nothing here yet"}
      </p>
      <h2 className="font-display mt-3 text-2xl font-bold text-white sm:text-3xl">Guides coming soon</h2>
      <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/70">
        {hasSport
          ? `We’re working on ${sportName} guides. In the meantime, find a UK club or centre near you, or let us match you with a coach.`
          : "We haven't published a guide for this combination yet. Try another filter, find a club near you, or let us match you with a coach."}
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <a
          href={mapHref}
          className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-accent hover:text-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {hasSport ? `Find ${sportName} clubs` : "Find a club"}
        </a>
        <a
          href={enquireHref}
          className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-accent/30 transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Get matched — £30
        </a>
      </div>
    </div>
  );
}
