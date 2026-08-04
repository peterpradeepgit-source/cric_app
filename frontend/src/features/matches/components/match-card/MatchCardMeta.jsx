import { formatDate } from "../../../../utils";

export default function MatchCardMeta({ match }) {
  const dateLabel = formatDate(match.date);

  if (match.status_text) {
    return (
      <div className="mt-3 pt-3 border-t border-gray-700/50">
        <p className="text-xs text-gray-400">{match.status_text}</p>
      </div>
    );
  }

  if (match.status === "completed" && match.result) {
    return (
      <div className="mt-3 pt-3 border-t border-gray-700/50">
        <p className="text-xs text-cbgreen font-medium">{match.result}</p>
      </div>
    );
  }

  if (match.status === "upcoming" && dateLabel) {
    return (
      <div className="mt-3 pt-3 border-t border-gray-700/50">
        <p className="text-xs text-gray-300">{dateLabel}</p>
      </div>
    );
  }

  return null;
}
