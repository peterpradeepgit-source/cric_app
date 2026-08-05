import { THEMES } from "./themeOptions";
import useTheme from "./useTheme";

const THEME_ICONS = {
  dark: "☾",
  light: "☀",
  contrast: "◐",
};

export default function ThemeSelector() {
  const { setTheme, theme } = useTheme();
  const currentIndex = THEMES.findIndex((option) => option.key === theme);
  const currentTheme = THEMES[currentIndex] || THEMES[0];
  const nextTheme = THEMES[(currentIndex + 1) % THEMES.length] || THEMES[0];

  const cycleTheme = () => {
    setTheme(nextTheme.key);
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      title={`Theme: ${currentTheme.label}`}
      aria-label={`Theme: ${currentTheme.label}. Switch to ${nextTheme.label}`}
      className="grid min-h-10 min-w-10 place-items-center rounded-full border border-cbborder bg-cbcard text-lg text-cbtext transition-colors hover:border-cbaccent/50 hover:text-cbaccent focus:border-cbaccent focus:outline-none"
    >
      <span aria-hidden="true">{THEME_ICONS[theme] || THEME_ICONS.dark}</span>
    </button>
  );
}
