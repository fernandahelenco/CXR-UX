/**
 * Theme Export Utility
 * 
 * Exports complete theme JSON with all tokens (light + dark modes)
 * Format: { light: { "--wex-primary": "...", ... }, dark: { ... } }
 */

import {
  PALETTE_RAMPS,
  SEMANTIC_TOKENS,
  SURFACE_TOKENS,
  TEXT_TOKENS,
  NEUTRAL_TOKENS,
  COMPONENT_TOKENS,
} from "@/docs/data/tokenRegistry";
import { parseHSL, formatHSL } from "@/docs/utils/color-convert";

// Standard lightness values for palette ramps
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

export interface ThemeOverrides {
  light: Record<string, string>;
  dark: Record<string, string>;
}

/**
 * Generate complete theme JSON with all tokens
 * @param overrides - Optional theme overrides (if not provided, uses defaults)
 * @returns JSON string with complete theme
 */
export function exportCompleteTheme(overrides?: ThemeOverrides): string {
  const theme: { light: Record<string, string>; dark: Record<string, string> } = {
    light: {},
    dark: {},
  };

  const getTokenValue = (tokenName: string, defaultValue: string, mode: "light" | "dark"): string => {
    return overrides?.[mode]?.[tokenName] || defaultValue;
  };

  const generateRampShades = (
    rampName: string,
    defaultHue: number,
    defaultSaturation: number,
    mode: "light" | "dark"
  ): Record<string, string> => {
    const shades: Record<string, string> = {};
    const token500 = `--wex-palette-${rampName}-500`;
    const override500 = overrides?.[mode]?.[token500];
    let rampHue = defaultHue;
    let rampSaturation = defaultSaturation;
    let baseLightness = PALETTE_LIGHTNESS_STEPS[500];

    if (override500) {
      const hsl = parseHSL(override500);
      if (hsl) {
        rampHue = hsl.h;
        rampSaturation = hsl.s;
        baseLightness = hsl.l;
      }
    }

    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].forEach((shade) => {
      const token = `--wex-palette-${rampName}-${shade}`;

      if (overrides?.[mode]?.[token]) {
        shades[token] = overrides[mode][token];
      } else {
        const lightness = shade === 500 ? baseLightness : PALETTE_LIGHTNESS_STEPS[shade];
        shades[token] = formatHSL({ h: rampHue, s: rampSaturation, l: lightness });
      }
    });

    return shades;
  };

  const processTokens = (mode: "light" | "dark") => {
    // Palette ramps
    PALETTE_RAMPS.forEach((ramp) => {
      const rampShades = generateRampShades(ramp.name, ramp.hue, ramp.saturation, mode);
      Object.assign(theme[mode], rampShades);
    });

    // Neutral tokens
    NEUTRAL_TOKENS.forEach((neutral) => {
      const value = getTokenValue(neutral.token, neutral.value, mode);
      theme[mode][neutral.token] = value;
    });

    // Semantic tokens
    SEMANTIC_TOKENS.forEach((token) => {
      const defaultValue = mode === "dark" ? (token.darkValue || token.lightValue) : token.lightValue;
      const value = getTokenValue(token.name, defaultValue, mode);
      theme[mode][token.name] = value;
    });

    // Surface tokens
    SURFACE_TOKENS.forEach((token) => {
      const defaultValue = mode === "dark" ? (token.darkValue || token.lightValue) : token.lightValue;
      const value = getTokenValue(token.name, defaultValue, mode);
      theme[mode][token.name] = value;
    });

    // Text tokens
    TEXT_TOKENS.forEach((token) => {
      const defaultValue = mode === "dark" ? (token.darkValue || token.lightValue) : token.lightValue;
      const value = getTokenValue(token.name, defaultValue, mode);
      theme[mode][token.name] = value;
    });

    // Component tokens
    COMPONENT_TOKENS.forEach((token) => {
      if (token.type === "color") {
        const defaultValue = mode === "dark" ? (token.darkValue || token.lightValue) : token.lightValue;
        const value = getTokenValue(token.name, defaultValue, mode);
        theme[mode][token.name] = value;
      }
    });
  };

  processTokens("light");
  processTokens("dark");

  // Sort tokens alphabetically for consistent output
  const sortedTheme = {
    light: Object.fromEntries(Object.entries(theme.light).sort(([a], [b]) => a.localeCompare(b))),
    dark: Object.fromEntries(Object.entries(theme.dark).sort(([a], [b]) => a.localeCompare(b))),
  };

  return JSON.stringify(sortedTheme, null, 2);
}

