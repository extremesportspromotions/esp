import Link from "next/link";
import { REFUND_LINE, FEE_COVERS } from "@/lib/payment";

export const MATCH_FEE_ROWS = [
  { want: "Experience day - one person, one day", fee: "£19" },
  { want: "Become qualified - one person, one club, full course", fee: "£49" },
  { want: "Group experience day - a private group of up to 5, one taster day", fee: "£49" },
  { want: "Group qualification - a private group of up to 5, become qualified", fee: "£99" },
] as const;

/** The match fees as clean, easy-to-read lines: what you want on the left, the fee on the right. */
export default function MatchFeeTable() {
  return (
    <div className="not-prose">
      <p className="flex justify-between gap-4 border-b border-[#1C1917]/15 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#1C1917]/55">
        <span>What you want</span>
        <span>ESP match fee</span>
      </p>
      <ul className="divide-y divide-[#1C1917]/10">
        {MATCH_FEE_ROWS.map((r) => (
          <li key={r.want} className="flex items-baseline justify-between gap-4 py-2 text-sm leading-snug text-[#1C1917]/80">
            <span>{r.want}</span>
            <span className="shrink-0 font-semibold text-[#1C1917]">{r.fee}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm leading-relaxed text-[#1C1917]/80">
        The group fees above are for private groups of up to 5 people, including a private stag or hen party of that size. Groups of 6 or more, and all company, team-building and corporate bookings, use our{" "}
        <Link href="/corporate-teams" className="font-semibold text-accent underline-offset-2 hover:underline">Corporate and Teams</Link>{" "}
        fees: £99 per group of up to 5 for teams, clubs and groups, or £199 per group of up to 5 for companies. ESP arranges weekdays, away days and weekends.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[#1C1917]/80">
        For example, a private group of 4 on a taster day pays a £49 match fee to ESP. A private stag or hen party of 8 pays the teams, clubs and groups rate: £198. A company booking for 5 people pays £199. You book and pay the club or coach separately for the training.
      </p>
      <p data-refund-line className="mt-2 rounded-md bg-accent/10 px-3 py-2 text-sm font-semibold text-[#1C1917]">{REFUND_LINE}</p>
      <p className="mt-2 text-xs leading-relaxed text-[#1C1917]/65">{FEE_COVERS}</p>
    </div>
  );
}
