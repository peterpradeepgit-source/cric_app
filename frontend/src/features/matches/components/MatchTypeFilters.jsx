import { MATCH_TYPE_FILTERS } from "../constants";

export default function MatchTypeFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {MATCH_TYPE_FILTERS.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`min-h-9 rounded-lg border px-4 text-sm font-medium transition-colors ${
            activeFilter === filter.key
              ? "border-transparent bg-cbaccent text-cbonaccent shadow-lg shadow-cbaccent/10"
              : "border-cbborder bg-cbcard text-cbmuted hover:border-cbaccent/40 hover:text-cbtext"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
