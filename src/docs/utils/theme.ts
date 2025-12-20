/**
 * Theme utilities for dark mode toggle
 * Persists preference to localStorage
 */

const THEME_KEY = "wex-theme";

export type Theme = "light" | "dark";

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return null;
}

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getInitialTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

export function setTheme(theme: Theme): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_KEY, theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function toggleTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const current = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

/**
 * Initialize theme on app load
 * Call this once in main.tsx or App.tsx
 */
export function initializeTheme(): void {
  if (typeof window === "undefined") return;
  const theme = getInitialTheme();
  setTheme(theme);
}

