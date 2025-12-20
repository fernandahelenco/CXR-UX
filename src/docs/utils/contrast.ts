/**
 * WCAG Contrast Ratio Utilities
 *
 * Provides functions to compute contrast ratios and determine
 * accessibility ratings for color pairings.
 *
 * WCAG 2.1 Contrast Thresholds (for text):
 * - AAA Normal text: 7.0:1
 * - AA Normal text: 4.5:1
 * - AA Large text: 3.0:1
 *
 * These are SIGNALS, not certifications.
 */

export type ContrastRating = "AAA" | "AA" | "AA-large" | "Fail";

/**
 * WCAG contrast thresholds
 */
export const CONTRAST_THRESHOLDS = {
  AAA_NORMAL: 7.0,
  AA_NORMAL: 4.5,
  AA_LARGE: 3.0,
} as const;

/**
 * Parse an HSL string (from CSS variable) to RGB values
 * Expects format: "210 100% 50%" (hue saturation% lightness%)
 */
export function hslToRgb(hslString: string): { r: number; g: number; b: number } | null {
  // Handle format: "210 100% 50%" or "210, 100%, 50%"
  const parts = hslString
    .replace(/%/g, "")
    .split(/[\s,]+/)
    .map((s) => parseFloat(s.trim()));

  if (parts.length < 3 || parts.some(isNaN)) {
    return null;
  }

  const [h, s, l] = parts;
  const sNorm = s / 100;
  const lNorm = l / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let r1 = 0,
    g1 = 0,
    b1 = 0;

  if (h >= 0 && h < 60) {
    r1 = c;
    g1 = x;
    b1 = 0;
  } else if (h >= 60 && h < 120) {
    r1 = x;
    g1 = c;
    b1 = 0;
  } else if (h >= 120 && h < 180) {
    r1 = 0;
    g1 = c;
    b1 = x;
  } else if (h >= 180 && h < 240) {
    r1 = 0;
    g1 = x;
    b1 = c;
  } else if (h >= 240 && h < 300) {
    r1 = x;
    g1 = 0;
    b1 = c;
  } else if (h >= 300 && h < 360) {
    r1 = c;
    g1 = 0;
    b1 = x;
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

/**
 * Parse a color string (hex, rgb, hsl) to RGB values
 */
export function parseColor(color: string): { r: number; g: number; b: number } | null {
  const trimmed = color.trim();

  // Hex format: #RGB, #RRGGBB
  if (trimmed.startsWith("#")) {
    const hex = trimmed.slice(1);
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
      };
    }
    if (hex.length === 6) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
      };
    }
    return null;
  }

  // RGB format: rgb(r, g, b)
  const rgbMatch = trimmed.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }

  // HSL format without function: "210 100% 50%"
  if (/^\d+\s+\d+%\s+\d+%$/.test(trimmed)) {
    return hslToRgb(trimmed);
  }

  // HSL format: hsl(h, s%, l%)
  const hslMatch = trimmed.match(/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/);
  if (hslMatch) {
    return hslToRgb(`${hslMatch[1]} ${hslMatch[2]}% ${hslMatch[3]}%`);
  }

  return null;
}

/**
 * Calculate relative luminance of a color
 * Per WCAG 2.1: https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
export function getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const sRGB = [rgb.r / 255, rgb.g / 255, rgb.b / 255];

  const [r, g, b] = sRGB.map((val) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate WCAG contrast ratio between two colors
 * Returns a value between 1 and 21
 */
export function getContrastRatio(
  fg: { r: number; g: number; b: number },
  bg: { r: number; g: number; b: number }
): number {
  const l1 = getRelativeLuminance(fg);
  const l2 = getRelativeLuminance(bg);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Get contrast rating based on ratio
 * This is a SIGNAL, not a certification
 */
export function getContrastRating(ratio: number): ContrastRating {
  if (ratio >= CONTRAST_THRESHOLDS.AAA_NORMAL) {
    return "AAA";
  }
  if (ratio >= CONTRAST_THRESHOLDS.AA_NORMAL) {
    return "AA";
  }
  if (ratio >= CONTRAST_THRESHOLDS.AA_LARGE) {
    return "AA-large";
  }
  return "Fail";
}

/**
 * Resolve a CSS variable to its computed value
 * Must be called from a React component or effect (client-side only)
 */
export function resolveColorVariable(varName: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  // Get computed style from root element
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(varName).trim();

  return value || null;
}

/**
 * Get contrast data for a foreground/background CSS variable pairing
 */
export interface ContrastData {
  ratio: number;
  rating: ContrastRating;
  fg: string;
  bg: string;
}

export function getContrastData(fgVar: string, bgVar: string): ContrastData | null {
  const fgValue = resolveColorVariable(fgVar);
  const bgValue = resolveColorVariable(bgVar);

  if (!fgValue || !bgValue) {
    return null;
  }

  const fgRgb = hslToRgb(fgValue);
  const bgRgb = hslToRgb(bgValue);

  if (!fgRgb || !bgRgb) {
    return null;
  }

  const ratio = getContrastRatio(fgRgb, bgRgb);
  const rating = getContrastRating(ratio);

  return {
    ratio,
    rating,
    fg: fgValue,
    bg: bgValue,
  };
}

/**
 * Format contrast ratio for display
 */
export function formatContrastRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}

/**
 * Determine if dark text should be used on a given background
 * Based on relative luminance calculation (WCAG standard)
 * 
 * @param bgVar - CSS variable name for the background color
 * @returns true if dark text should be used, false for light/white text
 */
export function shouldUseDarkText(bgVar: string): boolean {
  const bgValue = resolveColorVariable(bgVar);
  if (!bgValue) return false;
  
  const bgRgb = hslToRgb(bgValue);
  if (!bgRgb) return false;
  
  const luminance = getRelativeLuminance(bgRgb);
  return luminance > 0.5; // Light backgrounds need dark text
}

