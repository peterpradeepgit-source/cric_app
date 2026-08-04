export default function AppHeader({ loading, onRefresh }) {
  return (
    <header className="sticky top-0 z-40 bg-cbdark/95 backdrop-blur border-b border-gray-800/60">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-white">
          <span className="text-cbgreen">●</span> Cric App
        </h1>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="text-xs text-gray-400 hover:text-white disabled:opacity-40 transition-colors flex items-center gap-1"
        >
          <span className={loading ? "animate-spin" : ""}>⟳</span> Refresh
        </button>
      </div>
    </header>
  );
}
