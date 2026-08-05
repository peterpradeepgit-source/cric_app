import { ballsToOvers, getBowlersWithOvers } from "../../utils/scorecard";

export default function BowlingTable({ rows }) {
  const bowlersWithOvers = getBowlersWithOvers(rows);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs sm:text-sm">
        <thead>
          <tr className="text-gray-500 border-b border-gray-700/50">
            <th className="text-left font-medium py-2 pr-2">Bowler</th>
            <th className="text-right font-medium py-2 px-2">O</th>
            <th className="text-right font-medium py-2 px-2 hidden sm:table-cell">
              M
            </th>
            <th className="text-right font-medium py-2 px-2">R</th>
            <th className="text-right font-medium py-2 px-2">W</th>
            <th className="text-right font-medium py-2 pl-2">Econ</th>
          </tr>
        </thead>
        <tbody>
          {bowlersWithOvers.map((b, i) => (
            <tr
              key={`${b.bowler}-${i}`}
              className="border-b border-gray-800/40 hover:bg-white/5"
            >
              <td className="py-2 pr-2 text-white font-medium">
                {b.bowler}
                {b.is_bowling && <span className="text-cblive"> *</span>}
              </td>
              <td className="py-2 px-2 text-right text-gray-300">
                {ballsToOvers(b.balls)}
              </td>
              <td className="py-2 px-2 text-right text-gray-300 hidden sm:table-cell">
                {b.maidens}
              </td>
              <td className="py-2 px-2 text-right text-gray-300">{b.runs}</td>
              <td className="py-2 px-2 text-right text-white font-bold">
                {b.wickets}
              </td>
              <td className="py-2 pl-2 text-right text-gray-300">
                {b.economy.toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
