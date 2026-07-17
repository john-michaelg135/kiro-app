"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type Accent = "indigo" | "teal" | "rose" | "amber" | "emerald";

interface ThemeContextValue {
  theme: Theme;
  accent: Accent;
  setTheme: (t: Theme) => void;
  setAccent: (a: Accent) => void;
  toggleTheme: () => void;
}

// Provide a safe default so useTheme never throws
const defaultContext: ThemeContextValue = {
  theme: "light",
  accent: "indigo",
  setTheme: () => {},
  setAccent: () => {},
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextValue>(defaultContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [accent, setAccentState] = useState<Accent>("indigo");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("jt-theme") as Theme | null;
    const savedAccent = localStorage.getItem("jt-accent") as Accent | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    setThemeState(savedTheme || (prefersDark ? "dark" : "light"));
    setAccentState(savedAccent || "indigo");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-accent", accent);
    localStorage.setItem("jt-theme", theme);
    localStorage.setItem("jt-accent", accent);
  }, [theme, accent, mounted]);

  function setTheme(t: Theme) { setThemeState(t); }
  function setAccent(a: Accent) { setAccentState(a); }
  function toggleTheme() { setThemeState((prev) => (prev === "light" ? "dark" : "light")); }

  return (
    <ThemeContext.Provider value={{ theme, accent, setTheme, setAccent, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
