function SkeletonBlock({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded bg-gray-700/50 ${className}`}
      aria-hidden="true"
    />
  );
}

export function MatchCardSkeleton() {
  return (
    <div className="bg-cbcard rounded-xl p-4 border border-transparent">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SkeletonBlock className="h-2 w-2 rounded-full" />
          <SkeletonBlock className="h-3 w-28" />
        </div>
        <SkeletonBlock className="h-5 w-10 rounded" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-4 w-20" />
        </div>
        <div className="flex items-center justify-between">
          <SkeletonBlock className="h-4 w-28" />
          <SkeletonBlock className="h-4 w-16" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-700/50">
        <SkeletonBlock className="h-3 w-3/4" />
      </div>
      <SkeletonBlock className="h-3 w-1/2 mt-3" />
    </div>
  );
}

export function MatchCardGridSkeleton({ count = 6 }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      role="status"
      aria-label="Loading matches"
    >
      {Array.from({ length: count }, (_, index) => (
        <MatchCardSkeleton key={index} />
      ))}
    </div>
  );
}

function ScoreTableSkeleton({ rows = 6 }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <div className="grid grid-cols-[1.6fr_1.2fr_repeat(5,0.5fr)] gap-3 border-b border-gray-700/50 pb-2">
          {Array.from({ length: 7 }, (_, index) => (
            <SkeletonBlock key={index} className="h-3" />
          ))}
        </div>
        <div className="divide-y divide-gray-800/40">
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-[1.6fr_1.2fr_repeat(5,0.5fr)] gap-3 py-3"
            >
              {Array.from({ length: 7 }, (_, cellIndex) => (
                <SkeletonBlock
                  key={cellIndex}
                  className={cellIndex < 2 ? "h-3" : "h-3 justify-self-end w-8"}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ScorecardSkeleton() {
  return (
    <div
      className="space-y-4"
      role="status"
      aria-label="Loading scorecard"
    >
      <div className="bg-cbcard rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-4 w-24" />
        </div>

        <SkeletonBlock className="h-3 w-20 mt-4 mb-3" />
        <ScoreTableSkeleton rows={6} />

        <SkeletonBlock className="h-3 w-20 mt-5 mb-3" />
        <ScoreTableSkeleton rows={4} />
      </div>
    </div>
  );
}

export function MatchDetailSkeleton() {
  return (
    <div
      className="space-y-4"
      role="status"
      aria-label="Loading match details"
    >
      <div className="bg-cbcard rounded-xl p-5 mb-4">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <SkeletonBlock className="h-2 w-2 rounded-full" />
            <SkeletonBlock className="h-3 w-36" />
          </div>
          <SkeletonBlock className="h-5 w-12 rounded" />
        </div>
        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between">
            <SkeletonBlock className="h-5 w-32" />
            <SkeletonBlock className="h-5 w-24" />
          </div>
          <div className="flex items-center justify-between">
            <SkeletonBlock className="h-5 w-36" />
            <SkeletonBlock className="h-5 w-24" />
          </div>
        </div>
        <SkeletonBlock className="h-3 w-2/3" />
        <SkeletonBlock className="h-3 w-1/2 mt-3" />
      </div>
      <ScorecardSkeleton />
    </div>
  );
}
