export const MATCH_FEE_ROWS = [
  { want: "Experience day — one person, one day", fee: "£19" },
  { want: "Become qualified — one person, one club, full course", fee: "£49" },
  { want: "Group experience day — a party, one taster day", fee: "£49" },
  { want: "Group qualification — team building, become qualified", fee: "£99" },
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
    </div>
  );
}
