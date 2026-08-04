import { ScorecardSkeleton } from "../../../../shared/ui/Skeleton";
import InningsCard from "./InningsCard";

export default function ScorecardSection({ loading = false, match }) {
  const innings = match.scorecard?.innings;

  if (loading) {
    return <ScorecardSkeleton />;
  }

  if (!innings?.length) {
    return (
      <div className="bg-cbcard rounded-xl p-6 text-center">
        <p className="text-sm text-gray-500">
          {match.status === "upcoming"
            ? "Scorecard will be available once the match begins."
            : "Scorecard not available for this match."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {innings.map((inn, i) => (
        <InningsCard key={`${inn.batting_team}-${i}`} innings={inn} />
      ))}
    </div>
  );
}
