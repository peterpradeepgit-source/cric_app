import MatchCardHeader from "./MatchCardHeader";
import MatchCardMeta from "./MatchCardMeta";
import MatchTeams from "./MatchTeams";
import MatchVenue from "./MatchVenue";

export default function MatchCard({ match, onClick }) {
  return (
    <div
      onClick={() => onClick(match)}
      className="bg-cbcard rounded-xl p-4 hover:bg-[#243042] transition-all cursor-pointer border border-transparent hover:border-cbaccent/30 hover:shadow-lg hover:shadow-cbaccent/5"
    >
      <MatchCardHeader match={match} />
      <MatchTeams teams={match.teams} scores={match.scores} />
      <MatchCardMeta match={match} />
      <MatchVenue venue={match.venue} />
    </div>
  );
}
