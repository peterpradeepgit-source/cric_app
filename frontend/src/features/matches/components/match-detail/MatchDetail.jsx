import BackButton from "./BackButton";
import MatchSummaryCard from "./MatchSummaryCard";
import ScorecardSection from "./ScorecardSection";

export default function MatchDetail({ loading = false, match, onBack }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <BackButton onBack={onBack} />
      <MatchSummaryCard match={match} />
      <ScorecardSection loading={loading} match={match} />
    </div>
  );
}
