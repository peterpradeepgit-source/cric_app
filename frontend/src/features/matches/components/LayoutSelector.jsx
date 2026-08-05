import { MATCH_LAYOUTS } from "../constants";

export default function LayoutSelector({ activeLayout, onLayoutChange }) {
  return (
    <div
      className="hidden rounded-lg border border-cbborder bg-cbcard p-1 md:inline-flex"
      aria-label="Match layout"
    >
      {MATCH_LAYOUTS.map((layout) => (
        <button
          key={layout.key}
          onClick={() => onLayoutChange(layout.key)}
          className={`min-h-8 rounded-md px-3 text-sm font-medium transition-colors ${
            activeLayout === layout.key
              ? "bg-cbaccent text-cbonaccent"
              : "text-cbmuted hover:bg-cbsurface hover:text-cbtext"
          }`}
        >
          {layout.label}
        </button>
      ))}
    </div>
  );
}
