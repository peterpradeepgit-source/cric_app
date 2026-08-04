import MatchCard from "./match-card/MatchCard";

export default function MatchGrid({ matches, onMatchClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} onClick={onMatchClick} />
      ))}
    </div>
  );
}
