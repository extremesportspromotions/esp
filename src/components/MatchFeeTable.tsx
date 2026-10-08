export const MATCH_FEE_ROWS = [
  { want: "Experience day — one person, one day", fee: "£19" },
  { want: "Become qualified — one person, one club, full course", fee: "£49" },
  { want: "Group experience day — a party, one taster day", fee: "£49" },
  { want: "Group qualification — team building, become qualified", fee: "£99" },
] as const;

/** Same table as the "What you pay ESP" block at the end of every guide. */
export default function MatchFeeTable() {
  return (
    <table className="my-0">
      <thead>
        <tr>
          <th></th>
          <th>What you want</th>
          <th>ESP match fee</th>
        </tr>
      </thead>
      <tbody>
        {MATCH_FEE_ROWS.map((r, i) => (
          <tr key={r.want}>
            <td>{i + 1}</td>
            <td>{r.want}</td>
            <td className="whitespace-nowrap">{r.fee}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
