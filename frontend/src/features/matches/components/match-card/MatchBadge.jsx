import { formatMatchType } from "../../../../utils";

export default function MatchBadge({ type }) {
  return (
    <span className="text-xs font-bold text-cbaccent bg-cbaccent/10 px-2 py-0.5 rounded">
      {formatMatchType(type)}
    </span>
  );
}
