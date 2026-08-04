export default function BackButton({ onBack }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-4 transition-colors"
    >
      <span>←</span> Back
    </button>
  );
}
