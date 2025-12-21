/**
 * Token Registry
 * 
 * Comprehensive registry of all WEX design tokens with cascade information.
 * Used by Theme Builder for token-first editing experience.
 */

export type TokenCategory = 
  | "palette" 
  | "semantic" 
  | "surface" 
  | "text" 
  | "focus" 
  | "chart"
  | "typography"
  | "accessibility";

export type TokenType = "color" | "size" | "font" | "number";

export interface TokenDefinition {
  /** CSS variable name, e.g., "--wex-primary" */
  name: string;
  /** Human-readable label */
  label: string;
  /** Token category for grouping in UI */
  category: TokenCategory;
  /** Value type for determining input UI */
  type: TokenType;
  /** Light mode value (HSL for colors, px for sizes) */
  lightValue: string;
  /** Dark mode value if different */
  darkValue?: string;
  /** Reference to another token (e.g., "--wex-palette-blue-700") */
  references?: string;
  /** Dark mode reference if different */
  darkReferences?: string;
  /** Components that use this token */
  usedBy: string[];
  /** Tailwind utilities that map to this token */
  tailwindUtilities?: string[];
  /** Description for documentation */
  description?: string;
}

export interface PaletteRamp {
  name: string;
  label: string;
  hue: number;
  saturation: number;
  shades: {
    shade: number;
    token: string;
    lightness: number;
  }[];
}

/**
 * All palette ramps with their shade definitions
 */
export const PALETTE_RAMPS: PaletteRamp[] = [
  {
    name: "blue",
    label: "Blue",
    hue: 208,
    saturation: 100,
    shades: [
      { shade: 50, token: "--wex-palette-blue-50", lightness: 97 },
      { shade: 100, token: "--wex-palette-blue-100", lightness: 93 },
      { shade: 200, token: "--wex-palette-blue-200", lightness: 85 },
      { shade: 300, token: "--wex-palette-blue-300", lightness: 72 },
      { shade: 400, token: "--wex-palette-blue-400", lightness: 56 },
      { shade: 500, token: "--wex-palette-blue-500", lightness: 45 },
      { shade: 600, token: "--wex-palette-blue-600", lightness: 38 },
      { shade: 700, token: "--wex-palette-blue-700", lightness: 32 },
      { shade: 800, token: "--wex-palette-blue-800", lightness: 26 },
      { shade: 900, token: "--wex-palette-blue-900", lightness: 20 },
    ],
  },
  {
    name: "green",
    label: "Green",
    hue: 142,
    saturation: 76,
    shades: [
      { shade: 50, token: "--wex-palette-green-50", lightness: 97 },
      { shade: 100, token: "--wex-palette-green-100", lightness: 90 },
      { shade: 200, token: "--wex-palette-green-200", lightness: 80 },
      { shade: 300, token: "--wex-palette-green-300", lightness: 65 },
      { shade: 400, token: "--wex-palette-green-400", lightness: 50 },
      { shade: 500, token: "--wex-palette-green-500", lightness: 42 },
      { shade: 600, token: "--wex-palette-green-600", lightness: 36 },
      { shade: 700, token: "--wex-palette-green-700", lightness: 30 },
      { shade: 800, token: "--wex-palette-green-800", lightness: 24 },
      { shade: 900, token: "--wex-palette-green-900", lightness: 18 },
    ],
  },
  {
    name: "amber",
    label: "Amber",
    hue: 38,
    saturation: 92,
    shades: [
      { shade: 50, token: "--wex-palette-amber-50", lightness: 97 },
      { shade: 100, token: "--wex-palette-amber-100", lightness: 90 },
      { shade: 200, token: "--wex-palette-amber-200", lightness: 80 },
      { shade: 300, token: "--wex-palette-amber-300", lightness: 68 },
      { shade: 400, token: "--wex-palette-amber-400", lightness: 58 },
      { shade: 500, token: "--wex-palette-amber-500", lightness: 50 },
      { shade: 600, token: "--wex-palette-amber-600", lightness: 44 },
      { shade: 700, token: "--wex-palette-amber-700", lightness: 38 },
      { shade: 800, token: "--wex-palette-amber-800", lightness: 30 },
      { shade: 900, token: "--wex-palette-amber-900", lightness: 22 },
    ],
  },
  {
    name: "red",
    label: "Red",
    hue: 350,
    saturation: 62,
    shades: [
      { shade: 50, token: "--wex-palette-red-50", lightness: 97 },
      { shade: 100, token: "--wex-palette-red-100", lightness: 92 },
      { shade: 200, token: "--wex-palette-red-200", lightness: 82 },
      { shade: 300, token: "--wex-palette-red-300", lightness: 70 },
      { shade: 400, token: "--wex-palette-red-400", lightness: 60 },
      { shade: 500, token: "--wex-palette-red-500", lightness: 54 },
      { shade: 600, token: "--wex-palette-red-600", lightness: 48 },
      { shade: 700, token: "--wex-palette-red-700", lightness: 40 },
      { shade: 800, token: "--wex-palette-red-800", lightness: 32 },
      { shade: 900, token: "--wex-palette-red-900", lightness: 24 },
    ],
  },
  {
    name: "cyan",
    label: "Cyan",
    hue: 198,
    saturation: 87,
    shades: [
      { shade: 50, token: "--wex-palette-cyan-50", lightness: 97 },
      { shade: 100, token: "--wex-palette-cyan-100", lightness: 90 },
      { shade: 200, token: "--wex-palette-cyan-200", lightness: 80 },
      { shade: 300, token: "--wex-palette-cyan-300", lightness: 68 },
      { shade: 400, token: "--wex-palette-cyan-400", lightness: 58 },
      { shade: 500, token: "--wex-palette-cyan-500", lightness: 47 },
      { shade: 600, token: "--wex-palette-cyan-600", lightness: 40 },
      { shade: 700, token: "--wex-palette-cyan-700", lightness: 34 },
      { shade: 800, token: "--wex-palette-cyan-800", lightness: 28 },
      { shade: 900, token: "--wex-palette-cyan-900", lightness: 22 },
    ],
  },
  {
    name: "slate",
    label: "Slate",
    hue: 210,
    saturation: 15, // varies by shade
    shades: [
      { shade: 50, token: "--wex-palette-slate-50", lightness: 98 },
      { shade: 100, token: "--wex-palette-slate-100", lightness: 96 },
      { shade: 200, token: "--wex-palette-slate-200", lightness: 90 },
      { shade: 300, token: "--wex-palette-slate-300", lightness: 80 },
      { shade: 400, token: "--wex-palette-slate-400", lightness: 65 },
      { shade: 500, token: "--wex-palette-slate-500", lightness: 50 },
      { shade: 600, token: "--wex-palette-slate-600", lightness: 37 },
      { shade: 700, token: "--wex-palette-slate-700", lightness: 28 },
      { shade: 800, token: "--wex-palette-slate-800", lightness: 20 },
      { shade: 900, token: "--wex-palette-slate-900", lightness: 13 },
    ],
  },
];

/**
 * Semantic tokens that reference palette tokens
 */
export const SEMANTIC_TOKENS: TokenDefinition[] = [
  // PRIMARY
  {
    name: "--wex-primary",
    label: "Primary",
    category: "semantic",
    type: "color",
    lightValue: "208 100% 32%",
    darkValue: "208 100% 45%",
    references: "--wex-palette-blue-700",
    darkReferences: "--wex-palette-blue-500",
    usedBy: [
      "WexButton (default)",
      "WexButton (link)",
      "WexBadge (default)",
      "WexProgress",
      "WexProgress (bg-primary/20)",
      "WexSwitch (checked)",
      "WexCheckbox (checked)",
      "WexCheckbox (border)",
      "WexRadio (border)",
      "WexSlider (track bg-primary/20)",
      "WexSlider (range)",
      "WexSlider (thumb border)",
      "WexSkeleton (bg-primary/10)",
      "WexCalendar (selected)",
      "WexField (checked bg-primary/5)",
      "WexField (checked border)",
      "Item (link hover)",
      "Empty (link hover)",
      "Sonner (action button)",
    ],
    tailwindUtilities: ["bg-primary", "text-primary", "border-primary", "bg-primary/10", "bg-primary/20", "bg-primary/5"],
    description: "Primary action color for buttons and interactive elements",
  },
  {
    name: "--wex-primary-contrast",
    label: "Primary Contrast",
    category: "semantic",
    type: "color",
    lightValue: "0 0% 100%",
    darkValue: "216 10% 90%",
    usedBy: ["WexButton (default)", "WexBadge (default)"],
    tailwindUtilities: ["text-primary-foreground"],
    description: "Text color on primary backgrounds",
  },
  {
    name: "--wex-primary-hover",
    label: "Primary Hover",
    category: "semantic",
    type: "color",
    lightValue: "208 100% 26%",
    darkValue: "208 100% 38%",
    references: "--wex-palette-blue-800",
    darkReferences: "--wex-palette-blue-600",
    usedBy: ["WexButton (default)"],
    tailwindUtilities: ["hover:bg-primary/90"],
    description: "Hover state for primary elements",
  },
  
  // DESTRUCTIVE
  {
    name: "--wex-destructive",
    label: "Destructive",
    category: "semantic",
    type: "color",
    lightValue: "350 62% 54%",
    references: "--wex-palette-red-500",
    usedBy: ["WexButton (destructive)", "WexBadge (destructive)", "WexAlert (destructive)"],
    tailwindUtilities: ["bg-destructive", "text-destructive", "border-destructive"],
    description: "Destructive/danger actions",
  },
  {
    name: "--wex-destructive-foreground",
    label: "Destructive Foreground",
    category: "semantic",
    type: "color",
    lightValue: "0 0% 100%",
    usedBy: ["WexButton (destructive)", "WexAlert (destructive)"],
    tailwindUtilities: ["text-destructive-foreground"],
    description: "Text color on destructive backgrounds",
  },
  {
    name: "--wex-destructive-hover",
    label: "Destructive Hover",
    category: "semantic",
    type: "color",
    lightValue: "350 62% 48%",
    references: "--wex-palette-red-600",
    usedBy: ["WexButton (destructive)"],
    tailwindUtilities: ["hover:bg-destructive/90"],
    description: "Hover state for destructive elements",
  },
  
  // SUCCESS
  {
    name: "--wex-success",
    label: "Success",
    category: "semantic",
    type: "color",
    lightValue: "142 76% 36%",
    darkValue: "142 76% 42%",
    references: "--wex-palette-green-600",
    darkReferences: "--wex-palette-green-500",
    usedBy: ["WexBadge (success)", "WexAlert (success)"],
    tailwindUtilities: ["bg-success", "text-success", "border-success"],
    description: "Success/positive states",
  },
  {
    name: "--wex-success-foreground",
    label: "Success Foreground",
    category: "semantic",
    type: "color",
    lightValue: "0 0% 100%",
    usedBy: ["WexBadge (success)", "WexAlert (success)"],
    tailwindUtilities: ["text-success-foreground"],
    description: "Text color on success backgrounds",
  },
  {
    name: "--wex-success-hover",
    label: "Success Hover",
    category: "semantic",
    type: "color",
    lightValue: "142 76% 30%",
    darkValue: "142 76% 36%",
    references: "--wex-palette-green-700",
    darkReferences: "--wex-palette-green-600",
    usedBy: ["WexButton (success)"],
    tailwindUtilities: ["hover:bg-success/90"],
    description: "Hover state for success elements",
  },
  
  // WARNING
  {
    name: "--wex-warning",
    label: "Warning",
    category: "semantic",
    type: "color",
    lightValue: "38 92% 50%",
    darkValue: "38 92% 58%",
    references: "--wex-palette-amber-500",
    darkReferences: "--wex-palette-amber-400",
    usedBy: ["WexBadge (warning)", "WexAlert (warning)"],
    tailwindUtilities: ["bg-warning", "text-warning", "border-warning"],
    description: "Warning/caution states",
  },
  {
    name: "--wex-warning-foreground",
    label: "Warning Foreground",
    category: "semantic",
    type: "color",
    lightValue: "0 0% 0%",
    usedBy: ["WexBadge (warning)", "WexAlert (warning)"],
    tailwindUtilities: ["text-warning-foreground"],
    description: "Text color on warning backgrounds (black for contrast)",
  },
  {
    name: "--wex-warning-hover",
    label: "Warning Hover",
    category: "semantic",
    type: "color",
    lightValue: "38 92% 44%",
    darkValue: "38 92% 50%",
    references: "--wex-palette-amber-600",
    darkReferences: "--wex-palette-amber-500",
    usedBy: ["WexButton (warning)"],
    tailwindUtilities: ["hover:bg-warning/90"],
    description: "Hover state for warning elements",
  },
  
  // INFO
  {
    name: "--wex-info",
    label: "Info",
    category: "semantic",
    type: "color",
    lightValue: "198 87% 47%",
    darkValue: "198 87% 58%",
    references: "--wex-palette-cyan-500",
    darkReferences: "--wex-palette-cyan-400",
    usedBy: ["WexBadge (info)", "WexAlert (info)"],
    tailwindUtilities: ["bg-info", "text-info", "border-info"],
    description: "Informational states",
  },
  {
    name: "--wex-info-foreground",
    label: "Info Foreground",
    category: "semantic",
    type: "color",
    lightValue: "0 0% 100%",
    usedBy: ["WexBadge (info)", "WexAlert (info)"],
    tailwindUtilities: ["text-info-foreground"],
    description: "Text color on info backgrounds",
  },
  {
    name: "--wex-info-hover",
    label: "Info Hover",
    category: "semantic",
    type: "color",
    lightValue: "198 87% 40%",
    darkValue: "198 87% 47%",
    references: "--wex-palette-cyan-600",
    darkReferences: "--wex-palette-cyan-500",
    usedBy: ["WexButton (info)"],
    tailwindUtilities: ["hover:bg-info/90"],
    description: "Hover state for info elements",
  },
];

/**
 * Surface tokens for backgrounds and containers
 */
export const SURFACE_TOKENS: TokenDefinition[] = [
  {
    name: "--wex-content-bg",
    label: "Content Background",
    category: "surface",
    type: "color",
    lightValue: "0 0% 100%",
    darkValue: "210 31% 13%",
    usedBy: ["WexCard", "WexDialog", "WexSheet", "WexPopover"],
    tailwindUtilities: ["bg-background", "bg-card", "bg-popover"],
    description: "Background color for content containers",
  },
  {
    name: "--wex-content-border",
    label: "Content Border",
    category: "surface",
    type: "color",
    lightValue: "216 10% 90%",
    darkValue: "206 32% 21%",
    usedBy: ["WexCard", "WexSeparator", "WexInput", "WexTable"],
    tailwindUtilities: ["border-border", "divide-border"],
    description: "Border color for content containers",
  },
  {
    name: "--wex-surface-subtle",
    label: "Surface Subtle",
    category: "surface",
    type: "color",
    lightValue: "216 10% 96%",
    darkValue: "206 28% 18%",
    usedBy: ["WexTabs (selected)", "WexSelect (hover)", "WexCommand"],
    tailwindUtilities: ["bg-muted", "bg-accent"],
    description: "Subtle background for interactive states",
  },
  {
    name: "--wex-input-border",
    label: "Input Border",
    category: "surface",
    type: "color",
    lightValue: "204 9% 68%",
    darkValue: "206 32% 21%",
    usedBy: ["WexInput", "WexSelect", "WexTextarea"],
    tailwindUtilities: ["border-input"],
    description: "Border color for form inputs",
  },
];

/**
 * Text tokens
 */
export const TEXT_TOKENS: TokenDefinition[] = [
  {
    name: "--wex-text",
    label: "Text",
    category: "text",
    type: "color",
    lightValue: "206 32% 21%",
    darkValue: "0 0% 100%",
    usedBy: ["All text content"],
    tailwindUtilities: ["text-foreground"],
    description: "Primary text color",
  },
  {
    name: "--wex-text-muted",
    label: "Text Muted",
    category: "text",
    type: "color",
    lightValue: "208 14% 37%",
    darkValue: "216 10% 90%",
    usedBy: ["Labels", "Descriptions", "Placeholders"],
    tailwindUtilities: ["text-muted-foreground"],
    description: "Secondary/muted text color",
  },
];

/**
 * Focus tokens
 */
export const FOCUS_TOKENS: TokenDefinition[] = [
  {
    name: "--wex-focus-ring-color",
    label: "Focus Ring Color",
    category: "focus",
    type: "color",
    lightValue: "208 100% 32%",
    darkValue: "208 100% 45%",
    references: "--wex-palette-blue-700",
    darkReferences: "--wex-palette-blue-500",
    usedBy: ["All focusable elements"],
    tailwindUtilities: ["ring-ring"],
    description: "Color of focus rings for accessibility",
  },
  {
    name: "--wex-focus-ring-width",
    label: "Focus Ring Width",
    category: "focus",
    type: "size",
    lightValue: "2px",
    usedBy: ["All focusable elements"],
    description: "Width of focus rings",
  },
  {
    name: "--wex-focus-ring-offset",
    label: "Focus Ring Offset",
    category: "focus",
    type: "size",
    lightValue: "2px",
    usedBy: ["All focusable elements"],
    description: "Offset between element and focus ring",
  },
];

/**
 * Chart tokens
 */
export const CHART_TOKENS: TokenDefinition[] = [
  {
    name: "--wex-chart-1",
    label: "Chart 1",
    category: "chart",
    type: "color",
    lightValue: "208 100% 32%",
    darkValue: "203 68% 47%",
    usedBy: ["WexChart"],
    tailwindUtilities: ["fill-chart-1", "stroke-chart-1"],
    description: "Primary chart color",
  },
  {
    name: "--wex-chart-2",
    label: "Chart 2",
    category: "chart",
    type: "color",
    lightValue: "203 68% 47%",
    darkValue: "198 87% 55%",
    usedBy: ["WexChart"],
    tailwindUtilities: ["fill-chart-2", "stroke-chart-2"],
    description: "Secondary chart color",
  },
  {
    name: "--wex-chart-3",
    label: "Chart 3",
    category: "chart",
    type: "color",
    lightValue: "198 87% 40%",
    darkValue: "193 70% 60%",
    usedBy: ["WexChart"],
    tailwindUtilities: ["fill-chart-3", "stroke-chart-3"],
    description: "Tertiary chart color",
  },
  {
    name: "--wex-chart-4",
    label: "Chart 4",
    category: "chart",
    type: "color",
    lightValue: "350 62% 54%",
    darkValue: "350 62% 60%",
    usedBy: ["WexChart"],
    tailwindUtilities: ["fill-chart-4", "stroke-chart-4"],
    description: "Fourth chart color (contrasting)",
  },
  {
    name: "--wex-chart-5",
    label: "Chart 5",
    category: "chart",
    type: "color",
    lightValue: "216 10% 50%",
    darkValue: "216 10% 70%",
    usedBy: ["WexChart"],
    tailwindUtilities: ["fill-chart-5", "stroke-chart-5"],
    description: "Fifth chart color (neutral)",
  },
];

/**
 * All tokens combined for easy iteration
 */
export const ALL_TOKENS: TokenDefinition[] = [
  ...SEMANTIC_TOKENS,
  ...SURFACE_TOKENS,
  ...TEXT_TOKENS,
  ...FOCUS_TOKENS,
  ...CHART_TOKENS,
];

/**
 * Get all palette tokens as TokenDefinition objects
 */
export function getPaletteTokens(): TokenDefinition[] {
  const tokens: TokenDefinition[] = [];
  
  for (const ramp of PALETTE_RAMPS) {
    for (const shade of ramp.shades) {
      tokens.push({
        name: shade.token,
        label: `${ramp.label} ${shade.shade}`,
        category: "palette",
        type: "color",
        lightValue: `${ramp.hue} ${ramp.saturation}% ${shade.lightness}%`,
        usedBy: getTokensReferencingPalette(shade.token),
        description: `${ramp.label} palette shade ${shade.shade}`,
      });
    }
  }
  
  return tokens;
}

/**
 * Find which semantic tokens reference a given palette token
 */
export function getTokensReferencingPalette(paletteToken: string): string[] {
  const referencing: string[] = [];
  
  for (const token of ALL_TOKENS) {
    if (token.references === paletteToken || token.darkReferences === paletteToken) {
      referencing.push(token.name);
    }
  }
  
  return referencing;
}

/**
 * Get tokens referencing a palette token for a SPECIFIC mode
 */
export function getTokensReferencingPaletteForMode(
  paletteToken: string, 
  mode: "light" | "dark"
): string[] {
  const referencing: string[] = [];
  
  for (const token of ALL_TOKENS) {
    if (mode === "light" && token.references === paletteToken) {
      referencing.push(token.name);
    } else if (mode === "dark" && token.darkReferences === paletteToken) {
      referencing.push(token.name);
    }
  }
  
  return referencing;
}

/**
 * Get components that would be affected by changing a palette token (any mode)
 */
export function getAffectedComponents(paletteToken: string): string[] {
  const components = new Set<string>();
  const referencingTokens = getTokensReferencingPalette(paletteToken);
  
  for (const tokenName of referencingTokens) {
    const token = ALL_TOKENS.find(t => t.name === tokenName);
    if (token) {
      for (const component of token.usedBy) {
        components.add(component);
      }
    }
  }
  
  return Array.from(components);
}

/**
 * Get components that would be affected by changing a palette token for a SPECIFIC mode
 */
export function getAffectedComponentsForMode(
  paletteToken: string,
  mode: "light" | "dark"
): string[] {
  const components = new Set<string>();
  const referencingTokens = getTokensReferencingPaletteForMode(paletteToken, mode);
  
  for (const tokenName of referencingTokens) {
    const token = ALL_TOKENS.find(t => t.name === tokenName);
    if (token) {
      for (const component of token.usedBy) {
        components.add(component);
      }
    }
  }
  
  return Array.from(components);
}

/**
 * Get the full cascade chain for a token
 */
export interface CascadeChain {
  palette?: string;
  semantic: string;
  bridge: string;
  tailwind: string[];
  components: string[];
}

export function getCascadeChain(tokenName: string): CascadeChain | null {
  const token = ALL_TOKENS.find(t => t.name === tokenName);
  if (!token) return null;
  
  // Map semantic token to shadcn bridge name
  const bridgeMap: Record<string, string> = {
    "--wex-primary": "--primary",
    "--wex-primary-contrast": "--primary-foreground",
    "--wex-destructive": "--destructive",
    "--wex-destructive-foreground": "--destructive-foreground",
    "--wex-success": "--success",
    "--wex-success-foreground": "--success-foreground",
    "--wex-warning": "--warning",
    "--wex-warning-foreground": "--warning-foreground",
    "--wex-info": "--info",
    "--wex-info-foreground": "--info-foreground",
    "--wex-content-bg": "--background",
    "--wex-content-border": "--border",
    "--wex-text": "--foreground",
    "--wex-text-muted": "--muted-foreground",
  };
  
  return {
    palette: token.references,
    semantic: token.name,
    bridge: bridgeMap[token.name] || token.name.replace("--wex-", "--"),
    tailwind: token.tailwindUtilities || [],
    components: token.usedBy,
  };
}

/**
 * Categories for organizing tokens in the UI
 */
export const TOKEN_CATEGORIES = [
  { id: "palette", label: "Palette", description: "Base color ramps (50-900 scales)" },
  { id: "semantic", label: "Semantic", description: "Purpose-driven colors (primary, destructive, etc.)" },
  { id: "surface", label: "Surfaces", description: "Backgrounds and containers" },
  { id: "text", label: "Text", description: "Text and label colors" },
  { id: "focus", label: "Focus", description: "Focus ring styling" },
  { id: "chart", label: "Charts", description: "Data visualization colors" },
] as const;

// ============================================================================
// Note: Token conflict detection has been removed.
// Real-time WCAG contrast checking is now used instead (see contrast.ts)
// ============================================================================

