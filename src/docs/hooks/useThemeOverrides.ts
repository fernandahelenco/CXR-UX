/**
 * useThemeOverrides Hook
 * 
 * Manages theme token overrides with localStorage persistence.
 * Provides methods to get, set, and reset individual tokens,
 * and applies changes live to CSS variables.
 * 
 * Includes smart cascade logic:
 * - Primary tokens auto-derive hover and contrast
 * - Semantic tokens auto-derive foreground based on luminance
 * - Palette ramps can cascade from hue/saturation changes
 */

import * as React from "react";
import { parseHSL, formatHSL } from "@/docs/utils/color-convert";

const STORAGE_KEY = "wex-theme-overrides";

/**
 * Cascade rules: which derived tokens should auto-update when base tokens change
 */
interface CascadeRule {
  baseToken: string;
  derivedTokens: Array<{
    token: string;
    derive: (baseHsl: { h: number; s: number; l: number }) => { h: number; s: number; l: number };
  }>;
}

const CASCADE_RULES: CascadeRule[] = [
  {
    baseToken: "--wex-primary",
    derivedTokens: [
      {
        token: "--wex-primary-hover",
        derive: (hsl) => ({ ...hsl, l: Math.max(0, hsl.l - 10) }), // 10% darker
      },
      {
        token: "--wex-primary-contrast",
        derive: (hsl) => {
          // Auto-select white or black based on luminance
          // Luminance approximation: if L > 50%, use dark text
          return hsl.l > 50 ? { h: 0, s: 0, l: 10 } : { h: 0, s: 0, l: 100 };
        },
      },
    ],
  },
  {
    baseToken: "--wex-destructive",
    derivedTokens: [
      {
        token: "--wex-destructive-hover",
        derive: (hsl) => ({ ...hsl, l: Math.max(0, hsl.l - 10) }),
      },
      {
        token: "--wex-destructive-foreground",
        derive: (hsl) => (hsl.l > 50 ? { h: 0, s: 0, l: 10 } : { h: 0, s: 0, l: 100 }),
      },
    ],
  },
  {
    baseToken: "--wex-success",
    derivedTokens: [
      {
        token: "--wex-success-hover",
        derive: (hsl) => ({ ...hsl, l: Math.max(0, hsl.l - 10) }),
      },
      {
        token: "--wex-success-foreground",
        derive: (hsl) => (hsl.l > 50 ? { h: 0, s: 0, l: 10 } : { h: 0, s: 0, l: 100 }),
      },
    ],
  },
  {
    baseToken: "--wex-warning",
    derivedTokens: [
      {
        token: "--wex-warning-hover",
        derive: (hsl) => ({ ...hsl, l: Math.max(0, hsl.l - 10) }),
      },
      {
        token: "--wex-warning-foreground",
        derive: (hsl) => (hsl.l > 50 ? { h: 0, s: 0, l: 10 } : { h: 0, s: 0, l: 100 }),
      },
    ],
  },
  {
    baseToken: "--wex-info",
    derivedTokens: [
      {
        token: "--wex-info-hover",
        derive: (hsl) => ({ ...hsl, l: Math.max(0, hsl.l - 10) }),
      },
      {
        token: "--wex-info-foreground",
        derive: (hsl) => (hsl.l > 50 ? { h: 0, s: 0, l: 10 } : { h: 0, s: 0, l: 100 }),
      },
    ],
  },
];

/**
 * Standard lightness values for palette ramps (50-900)
 */
const PALETTE_LIGHTNESS_STEPS: Record<number, number> = {
  50: 97,
  100: 93,
  200: 85,
  300: 72,
  400: 56,
  500: 45,
  600: 38,
  700: 32,
  800: 26,
  900: 20,
};

/**
 * Derive all palette steps from a given hue and saturation
 */
function derivePaletteRamp(
  paletteBaseName: string,
  h: number,
  s: number
): Record<string, string> {
  const derived: Record<string, string> = {};
  Object.entries(PALETTE_LIGHTNESS_STEPS).forEach(([step, l]) => {
    derived[`--wex-palette-${paletteBaseName}-${step}`] = formatHSL({ h, s, l });
  });
  return derived;
}

export interface ThemeOverrides {
  light: Record<string, string>;
  dark: Record<string, string>;
}

const defaultOverrides: ThemeOverrides = {
  light: {},
  dark: {},
};

/**
 * Load overrides from localStorage
 */
function loadFromStorage(): ThemeOverrides {
  if (typeof window === "undefined") return defaultOverrides;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn("Failed to load theme overrides from localStorage:", e);
  }
  
  return defaultOverrides;
}

/**
 * Save overrides to localStorage
 */
function saveToStorage(overrides: ThemeOverrides): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch (e) {
    console.warn("Failed to save theme overrides to localStorage:", e);
  }
}

/**
 * Apply overrides to CSS variables on the document root
 * IMPORTANT: Clears the inactive mode's overrides first to prevent stale values
 */
function applyToDOM(overrides: ThemeOverrides): void {
  if (typeof window === "undefined") return;
  
  const root = document.documentElement;
  const isDark = root.classList.contains("dark");
  const activeOverrides = isDark ? overrides.dark : overrides.light;
  const inactiveOverrides = isDark ? overrides.light : overrides.dark;
  
  // First, REMOVE all inactive mode overrides from the DOM
  // This prevents stale values from the other mode persisting
  Object.keys(inactiveOverrides).forEach((token) => {
    root.style.removeProperty(token);
  });
  
  // Then apply each active override as a CSS variable
  Object.entries(activeOverrides).forEach(([token, value]) => {
    root.style.setProperty(token, value);
  });
}

/**
 * Remove all custom CSS variable overrides from DOM
 */
function clearFromDOM(overrides: ThemeOverrides): void {
  if (typeof window === "undefined") return;
  
  const root = document.documentElement;
  
  // Remove all overridden tokens
  [...Object.keys(overrides.light), ...Object.keys(overrides.dark)].forEach((token) => {
    root.style.removeProperty(token);
  });
}

export function useThemeOverrides() {
  const [overrides, setOverrides] = React.useState<ThemeOverrides>(defaultOverrides);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Load from localStorage on mount
  React.useEffect(() => {
    const stored = loadFromStorage();
    setOverrides(stored);
    applyToDOM(stored);
    setIsLoaded(true);
  }, []);

  // Listen for theme changes to re-apply overrides
  React.useEffect(() => {
    if (!isLoaded) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          applyToDOM(overrides);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, [overrides, isLoaded]);

  /**
   * Set a single token value, with optional cascade to derived tokens
   * Supports color, size, and font tokens
   */
  const setToken = React.useCallback((
    token: string, 
    value: string, 
    mode: "light" | "dark",
    cascade: boolean = true
  ) => {
    setOverrides((prev) => {
      const next = {
        ...prev,
        [mode]: {
          ...prev[mode],
          [token]: value,
        },
      };
      
      // Apply cascade rules if enabled (only for color tokens)
      if (cascade) {
        const rule = CASCADE_RULES.find((r) => r.baseToken === token);
        if (rule) {
          const baseHsl = parseHSL(value);
          if (baseHsl) {
            rule.derivedTokens.forEach((derived) => {
              const derivedHsl = derived.derive(baseHsl);
              next[mode][derived.token] = formatHSL(derivedHsl);
            });
          }
        }
        
        // Check for palette ramp cascade
        const paletteMatch = token.match(/^--wex-palette-(\w+)-500$/);
        if (paletteMatch) {
          const paletteName = paletteMatch[1];
          const baseHsl = parseHSL(value);
          if (baseHsl) {
            const derived = derivePaletteRamp(paletteName, baseHsl.h, baseHsl.s);
            Object.entries(derived).forEach(([derivedToken, derivedValue]) => {
              next[mode][derivedToken] = derivedValue;
            });
          }
        }
      }
      
      saveToStorage(next);
      applyToDOM(next);
      return next;
    });
  }, []);

  /**
   * Get a token value (returns override if exists, otherwise undefined)
   */
  const getToken = React.useCallback((token: string, mode: "light" | "dark"): string | undefined => {
    return overrides[mode][token];
  }, [overrides]);

  /**
   * Remove a single token override
   */
  const removeToken = React.useCallback((token: string, mode: "light" | "dark") => {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[mode][token];
      saveToStorage(next);
      
      // Remove from DOM
      if (typeof window !== "undefined") {
        document.documentElement.style.removeProperty(token);
      }
      
      return next;
    });
  }, []);

  /**
   * Reset all overrides to defaults
   */
  const resetAll = React.useCallback(() => {
    clearFromDOM(overrides);
    setOverrides(defaultOverrides);
    saveToStorage(defaultOverrides);
  }, [overrides]);

  /**
   * Get all overrides for export
   */
  const getAllOverrides = React.useCallback(() => {
    return overrides;
  }, [overrides]);

  /**
   * Check if there are any overrides
   */
  const hasOverrides = React.useMemo(() => {
    return Object.keys(overrides.light).length > 0 || Object.keys(overrides.dark).length > 0;
  }, [overrides]);

  /**
   * Export overrides as CSS variables (human-readable)
   */
  const exportAsCSS = React.useCallback((): string => {
    let css = ":root {\n";
    
    // Light mode overrides
    const lightTokens = Object.entries(overrides.light).sort(([a], [b]) => a.localeCompare(b));
    lightTokens.forEach(([token, value]) => {
      css += `  ${token}: ${value};\n`;
    });
    
    css += "}\n";
    
    // Dark mode overrides
    if (Object.keys(overrides.dark).length > 0) {
      css += "\n.dark {\n";
      const darkTokens = Object.entries(overrides.dark).sort(([a], [b]) => a.localeCompare(b));
      darkTokens.forEach(([token, value]) => {
        css += `  ${token}: ${value};\n`;
      });
      css += "}\n";
    }
    
    return css;
  }, [overrides]);

  /**
   * Export overrides as Style Dictionary compatible JSON (human-readable)
   */
  const exportAsJSON = React.useCallback((): string => {
    const styleDictionary: Record<string, unknown> = { wex: {} };
    
    // Process light mode tokens
    Object.entries(overrides.light).forEach(([token, value]) => {
      const cleanToken = token.replace("--wex-", "").replace(/-/g, ".");
      setNestedProperty(styleDictionary.wex as Record<string, unknown>, cleanToken, {
        value,
        type: "color",
      });
    });
    
    // Process dark mode tokens (with .dark suffix)
    Object.entries(overrides.dark).forEach(([token, value]) => {
      const cleanToken = token.replace("--wex-", "").replace(/-/g, ".") + ".dark";
      setNestedProperty(styleDictionary.wex as Record<string, unknown>, cleanToken, {
        value,
        type: "color",
      });
    });
    
    // Return formatted JSON (human-readable)
    return JSON.stringify(styleDictionary, null, 2);
  }, [overrides]);

  /**
   * Cascade an entire palette from a given hue and saturation
   */
  const cascadePalette = React.useCallback((
    paletteName: string,
    h: number,
    s: number,
    mode: "light" | "dark"
  ) => {
    setOverrides((prev) => {
      const next = { ...prev, [mode]: { ...prev[mode] } };
      const derived = derivePaletteRamp(paletteName, h, s);
      Object.entries(derived).forEach(([token, value]) => {
        next[mode][token] = value;
      });
      saveToStorage(next);
      applyToDOM(next);
      return next;
    });
  }, []);

  return {
    overrides,
    isLoaded,
    setToken,
    getToken,
    removeToken,
    resetAll,
    getAllOverrides,
    hasOverrides,
    exportAsCSS,
    exportAsJSON,
    cascadePalette,
  };
}

/**
 * Helper to set nested property by dot-notation path
 */
function setNestedProperty(obj: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split(".");
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }
  
  current[keys[keys.length - 1]] = value;
}

