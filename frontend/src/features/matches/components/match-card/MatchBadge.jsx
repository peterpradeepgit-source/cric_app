import { formatMatchType } from "../../../../utils";

export default function MatchBadge({ type }) {
  return (
    <span className="text-xs font-bold text-cbupcoming bg-cbupcoming/10 px-2 py-0.5 rounded">
      {formatMatchType(type)}
    </span>
  );
}
