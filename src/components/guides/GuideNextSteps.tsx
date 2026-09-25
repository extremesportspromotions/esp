import { GENERAL_SPORT } from "@/data/guides-meta";

export default function GuideNextSteps({ sport, sportName }: { sport: string; sportName: string }) {
  const isSport = sport !== GENERAL_SPORT;
  const mapHref = isSport ? `/?sport=${sport}#find-a-club` : "/#find-a-club";
  const enquireHref = isSport ? `/?sport=${sport}#enquire` : "/#enquire";
  return (
    <section aria-labelledby="next-steps-heading" className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface p-6 sm:p-10">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(200,16,46,0.2),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(26,58,107,0.45),_transparent_55%)]"
        aria-hidden
      />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-soft">Ready for the real thing?</p>
        <h2 id="next-steps-heading" className="font-display mt-2 text-2xl font-bold text-white sm:text-3xl">
          {isSport ? `Find ${sportName.toLowerCase()} clubs near you` : "Find a club near you"}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/75">
          Browse checked UK clubs, centres and schools on our free map — or tell us what you want to
          achieve and we&apos;ll match you with a professional coach.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={mapHref}
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:border-accent hover:text-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {isSport ? `Find ${sportName} clubs` : "Find a club"}
          </a>
          <a
            href={enquireHref}
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3.5 text-[13px] font-bold sm:px-7 sm:text-sm uppercase tracking-wide text-white shadow-lg shadow-accent/30 transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Get matched — £30
          </a>
        </div>
      </div>
    </section>
  );
}
