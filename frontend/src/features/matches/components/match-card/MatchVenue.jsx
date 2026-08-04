export default function MatchVenue({ venue }) {
  if (!venue) return null;

  return (
    <div className="mt-1">
      <p className="text-xs text-gray-600">{venue}</p>
    </div>
  );
}
