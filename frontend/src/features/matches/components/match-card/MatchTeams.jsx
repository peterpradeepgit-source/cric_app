import TeamScoreRow from "./TeamScoreRow";

export default function MatchTeams({ scores, teams }) {
  return (
    <div className="space-y-2">
      {teams.map((team, index) => (
        <TeamScoreRow key={`${team}-${index}`} team={team} score={scores[index]} />
      ))}
    </div>
  );
}
