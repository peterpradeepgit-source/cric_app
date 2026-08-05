export default function ErrorState({ message, onRetry }) {
  return (
    <div className="text-center py-16">
      <p className="text-sm text-gray-400 mb-3">Failed to load matches</p>
      {message && <p className="text-xs text-gray-600 mb-4">{message}</p>}
      <button
        onClick={onRetry}
        className="text-sm text-cbalert border border-cbalert/30 rounded-lg px-4 py-2 hover:bg-cbalert/10 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
