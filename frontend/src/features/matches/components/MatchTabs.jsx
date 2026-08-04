import { MATCH_TABS } from "../constants";

export default function MatchTabs({ activeTab, onTabChange }) {
  return (
    <nav className="sticky top-[52px] z-30 bg-cbdark/95 backdrop-blur border-b border-gray-800/60">
      <div className="max-w-5xl mx-auto px-4 flex gap-1">
        {MATCH_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`relative px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "text-cbaccent"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cbaccent rounded-t" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
