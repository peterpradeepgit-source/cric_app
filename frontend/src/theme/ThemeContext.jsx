import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./context";
import { THEMES } from "./themeOptions";

const STORAGE_KEY = "cric-app-theme";

function getThemeStorage() {
  if (typeof window === "undefined") return null;
  if (typeof window.localStorage?.getItem !== "function") return null;
  if (typeof window.localStorage?.setItem !== "function") return null;
  return window.localStorage;
}

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";

  const storedTheme = getThemeStorage()?.getItem(STORAGE_KEY);
  if (THEMES.some((theme) => theme.key === storedTheme)) return storedTheme;

  return "dark";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
    getThemeStorage()?.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(() => ({ setTheme, theme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
