import { sortBattersByState } from "../../utils/scorecard";

export default function BattingTable({ rows }) {
  const sortedRows = sortBattersByState(rows);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs sm:text-sm">
        <thead>
          <tr className="text-gray-500 border-b border-gray-700/50">
            <th className="text-left font-medium py-2 pr-2">Batter</th>
            <th className="text-left font-medium py-2 px-2">Dismissal</th>
            <th className="text-right font-medium py-2 px-2">R</th>
            <th className="text-right font-medium py-2 px-2">B</th>
            <th className="text-right font-medium py-2 px-2 hidden sm:table-cell">
              4s
            </th>
            <th className="text-right font-medium py-2 px-2 hidden sm:table-cell">
              6s
            </th>
            <th className="text-right font-medium py-2 pl-2">SR</th>
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((b, i) => (
            <tr
              key={`${b.batter}-${i}`}
              className="border-b border-gray-800/40 hover:bg-white/5"
            >
              <td className="py-2 pr-2 text-white font-medium">
                {b.batter}
                {b.is_batting && <span className="text-cblive"> *</span>}
              </td>
              <td className="py-2 px-2 text-gray-400">
                {b.dismissal || (b.is_batting ? "not out" : "")}
              </td>
              <td className="py-2 px-2 text-right text-white font-bold">
                {b.runs}
              </td>
              <td className="py-2 px-2 text-right text-gray-300">{b.balls}</td>
              <td className="py-2 px-2 text-right text-gray-300 hidden sm:table-cell">
                {b.fours}
              </td>
              <td className="py-2 px-2 text-right text-gray-300 hidden sm:table-cell">
                {b.sixes}
              </td>
              <td className="py-2 pl-2 text-right text-gray-300">
                {b.strike_rate.toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
