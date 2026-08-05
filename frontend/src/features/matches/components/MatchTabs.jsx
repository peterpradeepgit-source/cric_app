import { MATCH_TABS } from "../constants";

export default function MatchTabs({ activeTab, activeCount, onTabChange }) {
  return (
    <nav className="md:hidden">
      <div className="grid grid-cols-3 gap-1 rounded-xl border border-cbborder bg-cbcard p-1">
        {MATCH_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex min-h-11 items-center justify-center gap-2 rounded-lg px-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-cbaccent text-cbonaccent"
                : "text-cbmuted hover:bg-cbsurface hover:text-cbtext"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="rounded-full bg-white/15 px-1.5 text-xs">
                {activeCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
