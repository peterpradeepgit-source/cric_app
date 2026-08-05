import ThemeSelector from "../../../theme/ThemeSelector";

export default function AppHeader({ lastUpdated, loading, onRefresh }) {
  return (
    <header className="border-b border-cbborder bg-cbsurface/90 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <h1 className="flex items-center gap-3 text-xl font-bold text-cbtext">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-cbgreen/40 text-cbgreen">
            ◌
          </span>
          Cric App
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <p className="hidden text-sm text-cbmuted sm:block">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-cbgreen" />
                Updated{" "}
                {lastUpdated.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            )}
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex min-h-10 items-center gap-2 rounded-lg border border-cbborder bg-cbsurface px-3 text-sm text-cbmuted transition-colors hover:border-cbaccent/40 hover:text-cbtext disabled:opacity-40"
            >
              <span className={loading ? "animate-spin" : ""}>⟳</span>
              <span className="hidden sm:inline">Auto-refresh</span>
              <span className="sm:hidden">Refresh</span>
            </button>
          </div>
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}
