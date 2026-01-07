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
  | "accessibility"
  | "component";

/**
 * Component groups for Layer 3 tokens
 */
export type ComponentGroup = 
  | "form-controls"  // Shared form control tokens
  | "button"
  | "input"
  | "select"
  | "table"
  | "card"
  | "dialog"
  | "badge"
  | "alert"
  | "toast"
  | "tabs"
  | "checkbox"
  | "radio"
  | "switch"
  | "slider"
  | "textarea"
  | "inputotp"
  | "progress"
  | "menu"
  | "menubar"
  | "navmenu"
  | "command"
  | "sheet"
  | "drawer"
  | "alertdialog"
  | "toggle"
  | "accordion"
  | "pagination"
  | "breadcrumb"
  | "popover"
  | "hovercard"
  | "tooltip"
  | "skeleton"
  | "separator"
  | "kbd";

/**
 * Editable group configuration for Theme Builder
 */
export interface EditableComponentGroup {
  id: ComponentGroup;
  label: string;
  description: string;
  /** Whether this group is editable in Theme Builder */
  editable: boolean;
  /** Which component groups inherit from this group (for form-controls) */
  childGroups?: ComponentGroup[];
}

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
  /** Component group for Layer 3 tokens */
  componentGroup?: ComponentGroup;
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
 * Special neutral tokens (white/black) for surface backgrounds
 * These are separate from the ramp system as they are extremes.
 */
export const NEUTRAL_TOKENS = [
  { name: "white", label: "White", token: "--wex-palette-white", value: "0 0% 100%" },
  { name: "black", label: "Black", token: "--wex-palette-black", value: "0 0% 0%" },
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
 * Now reference palette tokens for Theme Builder editability
 */
export const SURFACE_TOKENS: TokenDefinition[] = [
  {
    name: "--wex-content-bg",
    label: "Content Background",
    category: "surface",
    type: "color",
    lightValue: "0 0% 100%",
    darkValue: "210 31% 13%",
    references: "--wex-palette-white",
    darkReferences: "--wex-palette-slate-900",
    usedBy: ["WexCard", "WexDialog", "WexSheet", "WexPopover"],
    tailwindUtilities: ["bg-background", "bg-card", "bg-popover"],
    description: "Background color for content containers",
  },
  {
    name: "--wex-content-border",
    label: "Content Border",
    category: "surface",
    type: "color",
    lightValue: "210 16% 90%",
    darkValue: "210 20% 28%",
    references: "--wex-palette-slate-200",
    darkReferences: "--wex-palette-slate-700",
    usedBy: ["WexCard", "WexSeparator", "WexInput", "WexTable"],
    tailwindUtilities: ["border-border", "divide-border"],
    description: "Border color for content containers",
  },
  {
    name: "--wex-surface-subtle",
    label: "Surface Subtle",
    category: "surface",
    type: "color",
    lightValue: "210 18% 96%",
    darkValue: "210 28% 20%",
    references: "--wex-palette-slate-100",
    darkReferences: "--wex-palette-slate-800",
    usedBy: ["WexTabs (selected)", "WexSelect (hover)", "WexCommand", "WexCalendar (range middle)"],
    tailwindUtilities: ["bg-muted", "bg-accent"],
    description: "Subtle background for interactive states",
  },
  {
    name: "--wex-input-border",
    label: "Input Border",
    category: "surface",
    type: "color",
    lightValue: "210 12% 65%",
    darkValue: "210 20% 28%",
    references: "--wex-palette-slate-400",
    darkReferences: "--wex-palette-slate-700",
    usedBy: ["WexInput", "WexSelect", "WexTextarea", "WexButton (outline)", "Toggle (outline)", "InputOTP", "Calendar dropdown"],
    tailwindUtilities: ["border-input"],
    description: "Border color for form inputs and outline buttons",
  },
];

/**
 * Text tokens
 * Now reference palette tokens for Theme Builder editability
 */
export const TEXT_TOKENS: TokenDefinition[] = [
  {
    name: "--wex-text",
    label: "Text",
    category: "text",
    type: "color",
    lightValue: "210 28% 20%",
    darkValue: "0 0% 100%",
    references: "--wex-palette-slate-800",
    darkReferences: "--wex-palette-white",
    usedBy: ["All text content"],
    tailwindUtilities: ["text-foreground"],
    description: "Primary text color",
  },
  {
    name: "--wex-text-muted",
    label: "Text Muted",
    category: "text",
    type: "color",
    lightValue: "210 14% 37%",
    darkValue: "210 16% 90%",
    references: "--wex-palette-slate-600",
    darkReferences: "--wex-palette-slate-200",
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
 * Typography tokens
 */
export const TYPOGRAPHY_TOKENS: TokenDefinition[] = [
  {
    name: "--wex-font-sans",
    label: "Font Sans",
    category: "typography",
    type: "font",
    lightValue: "Inter, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif",
    usedBy: ["All text content"],
    tailwindUtilities: ["font-sans"],
    description: "Primary sans-serif font family",
  },
  {
    name: "--wex-font-display",
    label: "Font Display",
    category: "typography",
    type: "font",
    lightValue: "Poppins, Inter, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
    usedBy: ["Headings", "Display text"],
    tailwindUtilities: ["font-display"],
    description: "Display font family for headings",
  },
];

/**
 * Accessibility tokens
 */
export const ACCESSIBILITY_TOKENS: TokenDefinition[] = [
  {
    name: "--wex-min-target",
    label: "Minimum Target Size",
    category: "accessibility",
    type: "size",
    lightValue: "44px",
    usedBy: ["All interactive elements"],
    description: "Minimum touch target size for accessibility (WCAG 2.5.5)",
  },
];

/**
 * Radius tokens
 */
export const RADIUS_TOKENS: TokenDefinition[] = [
  {
    name: "--wex-radius-sm",
    label: "Radius Small",
    category: "component",
    type: "size",
    lightValue: "4px",
    usedBy: ["Small components", "Badges", "Tags"],
    description: "Small border radius for compact components",
  },
  {
    name: "--wex-radius-md",
    label: "Radius Medium",
    category: "component",
    type: "size",
    lightValue: "6px",
    usedBy: ["Buttons", "Inputs", "Cards", "Most components"],
    description: "Default border radius for most components",
  },
  {
    name: "--wex-radius-lg",
    label: "Radius Large",
    category: "component",
    type: "size",
    lightValue: "8px",
    usedBy: ["Large components", "Modals", "Panels"],
    description: "Large border radius for prominent components",
  },
];

/**
 * Layer 3 Component Tokens
 * These provide granular control over individual component styling.
 * All values reference Layer 1/2 semantic tokens.
 */
export const COMPONENT_TOKENS: TokenDefinition[] = [
  // ============================================================
  // SHARED FORM CONTROLS
  // ============================================================
  // These tokens are shared across Input, Textarea, Select, Checkbox,
  // Radio, Switch, and InputOTP. Editing these affects all form controls.
  {
    name: "--wex-component-form-bg",
    label: "Background",
    category: "component",
    componentGroup: "form-controls",
    type: "color",
    lightValue: "var(--wex-content-bg)",
    references: "--wex-content-bg",
    usedBy: ["WexInput", "WexTextarea", "WexSelect", "WexCheckbox", "WexRadio", "WexSwitch", "WexInputOTP"],
    tailwindUtilities: ["bg-wex-form-bg"],
    description: "Shared form control background color",
  },
  {
    name: "--wex-component-form-fg",
    label: "Text",
    category: "component",
    componentGroup: "form-controls",
    type: "color",
    lightValue: "var(--wex-text)",
    references: "--wex-text",
    usedBy: ["WexInput", "WexTextarea", "WexSelect"],
    tailwindUtilities: ["text-wex-form-fg"],
    description: "Shared form control text color",
  },
  {
    name: "--wex-component-form-border",
    label: "Border",
    category: "component",
    componentGroup: "form-controls",
    type: "color",
    lightValue: "var(--wex-input-border)",
    references: "--wex-input-border",
    usedBy: ["WexInput", "WexTextarea", "WexSelect", "WexInputOTP"],
    tailwindUtilities: ["border-wex-form-border"],
    description: "Shared form control border color",
  },
  {
    name: "--wex-component-form-border-hover",
    label: "Border (Hover)",
    category: "component",
    componentGroup: "form-controls",
    type: "color",
    lightValue: "210 12% 50%",
    darkValue: "210 14% 37%",
    references: "--wex-palette-slate-500",
    darkReferences: "--wex-palette-slate-600",
    usedBy: ["WexInput", "WexTextarea", "WexSelect"],
    description: "Shared form control border hover color",
  },
  {
    name: "--wex-component-form-focus-ring",
    label: "Focus Ring",
    category: "component",
    componentGroup: "form-controls",
    type: "color",
    lightValue: "var(--wex-focus-ring-color)",
    references: "--wex-focus-ring-color",
    usedBy: ["WexInput", "WexTextarea", "WexSelect", "WexCheckbox", "WexRadio", "WexSwitch", "WexInputOTP"],
    tailwindUtilities: ["ring-wex-form-focus-ring"],
    description: "Shared form control focus ring color",
  },
  {
    name: "--wex-component-form-placeholder",
    label: "Placeholder",
    category: "component",
    componentGroup: "form-controls",
    type: "color",
    lightValue: "var(--wex-text-muted)",
    references: "--wex-text-muted",
    usedBy: ["WexInput", "WexTextarea"],
    description: "Shared form control placeholder text color",
  },
  {
    name: "--wex-component-form-disabled-opacity",
    label: "Disabled Opacity",
    category: "component",
    componentGroup: "form-controls",
    type: "number",
    lightValue: "0.6",
    usedBy: ["WexInput", "WexTextarea", "WexSelect", "WexCheckbox", "WexRadio", "WexSwitch", "WexInputOTP"],
    description: "Shared form control disabled opacity",
  },
  {
    name: "--wex-component-form-checked-bg",
    label: "Checked Background",
    category: "component",
    componentGroup: "form-controls",
    type: "color",
    lightValue: "var(--wex-primary)",
    references: "--wex-primary",
    usedBy: ["WexCheckbox", "WexRadio", "WexSwitch", "WexSelect (item selected)"],
    tailwindUtilities: ["bg-wex-form-checked-bg"],
    description: "Shared checked/selected state background",
  },
  {
    name: "--wex-component-form-checked-fg",
    label: "Checked Foreground",
    category: "component",
    componentGroup: "form-controls",
    type: "color",
    lightValue: "var(--wex-primary-contrast)",
    references: "--wex-primary-contrast",
    usedBy: ["WexCheckbox", "WexRadio", "WexSelect (item selected)"],
    tailwindUtilities: ["text-wex-form-checked-fg"],
    description: "Shared checked/selected state text color",
  },
  {
    name: "--wex-component-form-invalid-border",
    label: "Invalid Border",
    category: "component",
    componentGroup: "form-controls",
    type: "color",
    lightValue: "var(--wex-destructive)",
    references: "--wex-destructive",
    usedBy: ["WexInput (invalid)", "WexTextarea (invalid)", "WexSelect (invalid)"],
    description: "Shared form control invalid state border",
  },

  // ============================================================
  // BUTTON
  // ============================================================
  {
    name: "--wex-component-button-primary-bg",
    label: "Primary Background",
    category: "component",
    componentGroup: "button",
    type: "color",
    lightValue: "var(--wex-primary)",
    references: "--wex-primary",
    usedBy: ["WexButton (primary)"],
    tailwindUtilities: ["bg-wex-button-primary-bg"],
    description: "Primary button background color",
  },
  {
    name: "--wex-component-button-primary-fg",
    label: "Primary Foreground",
    category: "component",
    componentGroup: "button",
    type: "color",
    lightValue: "var(--wex-primary-contrast)",
    references: "--wex-primary-contrast",
    usedBy: ["WexButton (primary)"],
    tailwindUtilities: ["text-wex-button-primary-fg"],
    description: "Primary button text color",
  },
  {
    name: "--wex-component-button-primary-hover-bg",
    label: "Primary Hover",
    category: "component",
    componentGroup: "button",
    type: "color",
    lightValue: "var(--wex-primary-hover)",
    references: "--wex-primary-hover",
    usedBy: ["WexButton (primary)"],
    tailwindUtilities: ["hover:bg-wex-button-primary-hover-bg"],
    description: "Primary button hover background",
  },
  {
    name: "--wex-component-button-secondary-bg",
    label: "Secondary Background",
    category: "component",
    componentGroup: "button",
    type: "color",
    lightValue: "var(--wex-surface-subtle)",
    references: "--wex-surface-subtle",
    usedBy: ["WexButton (secondary)"],
    tailwindUtilities: ["bg-wex-button-secondary-bg"],
    description: "Secondary button background color",
  },
  {
    name: "--wex-component-button-secondary-fg",
    label: "Secondary Foreground",
    category: "component",
    componentGroup: "button",
    type: "color",
    lightValue: "var(--wex-text)",
    references: "--wex-text",
    usedBy: ["WexButton (secondary)"],
    tailwindUtilities: ["text-wex-button-secondary-fg"],
    description: "Secondary button text color",
  },
  {
    name: "--wex-component-button-destructive-bg",
    label: "Destructive Background",
    category: "component",
    componentGroup: "button",
    type: "color",
    lightValue: "var(--wex-destructive)",
    references: "--wex-destructive",
    usedBy: ["WexButton (destructive)"],
    tailwindUtilities: ["bg-wex-button-destructive-bg"],
    description: "Destructive button background color",
  },
  {
    name: "--wex-component-button-success-bg",
    label: "Success Background",
    category: "component",
    componentGroup: "button",
    type: "color",
    lightValue: "var(--wex-success)",
    references: "--wex-success",
    usedBy: ["WexButton (success)"],
    tailwindUtilities: ["bg-wex-button-success-bg"],
    description: "Success button background color",
  },
  {
    name: "--wex-component-button-info-bg",
    label: "Info Background",
    category: "component",
    componentGroup: "button",
    type: "color",
    lightValue: "var(--wex-info)",
    references: "--wex-info",
    usedBy: ["WexButton (info)"],
    tailwindUtilities: ["bg-wex-button-info-bg"],
    description: "Info button background color",
  },
  {
    name: "--wex-component-button-warning-bg",
    label: "Warning Background",
    category: "component",
    componentGroup: "button",
    type: "color",
    lightValue: "var(--wex-warning)",
    references: "--wex-warning",
    usedBy: ["WexButton (warning)"],
    tailwindUtilities: ["bg-wex-button-warning-bg"],
    description: "Warning button background color",
  },
  {
    name: "--wex-component-button-disabled-opacity",
    label: "Disabled Opacity",
    category: "component",
    componentGroup: "button",
    type: "number",
    lightValue: "0.5",
    usedBy: ["WexButton (all variants)"],
    description: "Opacity applied to disabled buttons",
  },
  {
    name: "--wex-component-button-radius",
    label: "Border Radius",
    category: "component",
    componentGroup: "button",
    type: "size",
    lightValue: "var(--wex-radius-md)",
    references: "--wex-radius-md",
    usedBy: ["WexButton"],
    description: "Border radius for all buttons",
  },

  // ============================================================
  // INPUT
  // ============================================================
  {
    name: "--wex-component-input-bg",
    label: "Background",
    category: "component",
    componentGroup: "input",
    type: "color",
    lightValue: "var(--wex-content-bg)",
    references: "--wex-content-bg",
    usedBy: ["WexInput", "WexTextarea"],
    tailwindUtilities: ["bg-wex-input-bg"],
    description: "Input background color",
  },
  {
    name: "--wex-component-input-fg",
    label: "Text",
    category: "component",
    componentGroup: "input",
    type: "color",
    lightValue: "var(--wex-text)",
    references: "--wex-text",
    usedBy: ["WexInput", "WexTextarea"],
    tailwindUtilities: ["text-wex-input-fg"],
    description: "Input text color",
  },
  {
    name: "--wex-component-input-border",
    label: "Border",
    category: "component",
    componentGroup: "input",
    type: "color",
    lightValue: "var(--wex-input-border)",
    references: "--wex-input-border",
    usedBy: ["WexInput", "WexTextarea"],
    tailwindUtilities: ["border-wex-input-border"],
    description: "Input border color",
  },
  {
    name: "--wex-component-input-focus-ring",
    label: "Focus Ring",
    category: "component",
    componentGroup: "input",
    type: "color",
    lightValue: "var(--wex-focus-ring-color)",
    references: "--wex-focus-ring-color",
    usedBy: ["WexInput", "WexTextarea"],
    tailwindUtilities: ["ring-wex-input-focus-ring"],
    description: "Input focus ring color",
  },
  {
    name: "--wex-component-input-filled-bg",
    label: "Filled Background",
    category: "component",
    componentGroup: "input",
    type: "color",
    lightValue: "var(--wex-surface-subtle)",
    references: "--wex-surface-subtle",
    usedBy: ["WexInput (filled)"],
    tailwindUtilities: ["bg-wex-input-filled-bg"],
    description: "Filled variant input background",
  },
  {
    name: "--wex-component-input-invalid-border",
    label: "Invalid Border",
    category: "component",
    componentGroup: "input",
    type: "color",
    lightValue: "var(--wex-destructive)",
    references: "--wex-destructive",
    usedBy: ["WexInput (invalid)"],
    tailwindUtilities: ["border-wex-input-invalid-border"],
    description: "Input border color when invalid",
  },
  {
    name: "--wex-component-input-radius",
    label: "Border Radius",
    category: "component",
    componentGroup: "input",
    type: "size",
    lightValue: "var(--wex-radius-md)",
    references: "--wex-radius-md",
    usedBy: ["WexInput", "WexTextarea"],
    description: "Border radius for input fields",
  },

  // ============================================================
  // CARD
  // ============================================================
  {
    name: "--wex-component-card-bg",
    label: "Background",
    category: "component",
    componentGroup: "card",
    type: "color",
    lightValue: "var(--wex-content-bg)",
    references: "--wex-content-bg",
    usedBy: ["WexCard"],
    tailwindUtilities: ["bg-wex-card-bg"],
    description: "Card background color",
  },
  {
    name: "--wex-component-card-fg",
    label: "Text",
    category: "component",
    componentGroup: "card",
    type: "color",
    lightValue: "var(--wex-text)",
    references: "--wex-text",
    usedBy: ["WexCard"],
    tailwindUtilities: ["text-wex-card-fg"],
    description: "Card text color",
  },
  {
    name: "--wex-component-card-border",
    label: "Border",
    category: "component",
    componentGroup: "card",
    type: "color",
    lightValue: "var(--wex-content-border)",
    references: "--wex-content-border",
    usedBy: ["WexCard"],
    tailwindUtilities: ["border-wex-card-border"],
    description: "Card border color",
  },
  {
    name: "--wex-component-card-header-fg",
    label: "Header Text",
    category: "component",
    componentGroup: "card",
    type: "color",
    lightValue: "var(--wex-text)",
    references: "--wex-text",
    usedBy: ["WexCard (header)"],
    tailwindUtilities: ["text-wex-card-header-fg"],
    description: "Card header/title text color",
  },
  {
    name: "--wex-component-card-radius",
    label: "Border Radius",
    category: "component",
    componentGroup: "card",
    type: "size",
    lightValue: "var(--wex-radius-md)",
    references: "--wex-radius-md",
    usedBy: ["WexCard"],
    description: "Border radius for cards",
  },

  // ============================================================
  // TABS
  // ============================================================
  {
    name: "--wex-component-tabs-trigger-fg",
    label: "Trigger Text",
    category: "component",
    componentGroup: "tabs",
    type: "color",
    lightValue: "var(--wex-text-muted)",
    references: "--wex-text-muted",
    usedBy: ["WexTabs"],
    description: "Tab trigger inactive text color",
  },
  {
    name: "--wex-component-tabs-trigger-active-fg",
    label: "Active Trigger Text",
    category: "component",
    componentGroup: "tabs",
    type: "color",
    lightValue: "var(--wex-primary)",
    references: "--wex-primary",
    usedBy: ["WexTabs"],
    description: "Tab trigger active text color",
  },
  {
    name: "--wex-component-tabs-indicator",
    label: "Active Indicator",
    category: "component",
    componentGroup: "tabs",
    type: "color",
    lightValue: "var(--wex-primary)",
    references: "--wex-primary",
    usedBy: ["WexTabs"],
    description: "Tab active indicator/underline color",
  },

  // ============================================================
  // BADGE
  // ============================================================
  {
    name: "--wex-component-badge-neutral-bg",
    label: "Default Background",
    category: "component",
    componentGroup: "badge",
    type: "color",
    lightValue: "var(--wex-surface-subtle)",
    references: "--wex-surface-subtle",
    usedBy: ["WexBadge (default)"],
    description: "Default badge background color",
  },
  {
    name: "--wex-component-badge-neutral-fg",
    label: "Default Text",
    category: "component",
    componentGroup: "badge",
    type: "color",
    lightValue: "var(--wex-text)",
    references: "--wex-text",
    usedBy: ["WexBadge (default)"],
    description: "Default badge text color",
  },
  {
    name: "--wex-component-badge-neutral-border",
    label: "Default Border",
    category: "component",
    componentGroup: "badge",
    type: "color",
    lightValue: "var(--wex-content-border)",
    references: "--wex-content-border",
    usedBy: ["WexBadge (default)"],
    description: "Default badge border color",
  },
  {
    name: "--wex-component-badge-info-bg",
    label: "Info Background",
    category: "component",
    componentGroup: "badge",
    type: "color",
    lightValue: "var(--wex-info)",
    references: "--wex-info",
    usedBy: ["WexBadge (info)"],
    description: "Info badge background color",
  },
  {
    name: "--wex-component-badge-info-fg",
    label: "Info Text",
    category: "component",
    componentGroup: "badge",
    type: "color",
    lightValue: "var(--wex-info-foreground)",
    references: "--wex-info-foreground",
    usedBy: ["WexBadge (info)"],
    description: "Info badge text color",
  },
  {
    name: "--wex-component-badge-info-border",
    label: "Info Border",
    category: "component",
    componentGroup: "badge",
    type: "color",
    lightValue: "var(--wex-info)",
    references: "--wex-info",
    usedBy: ["WexBadge (info)"],
    description: "Info badge border color",
  },
  {
    name: "--wex-component-badge-success-bg",
    label: "Success Background",
    category: "component",
    componentGroup: "badge",
    type: "color",
    lightValue: "var(--wex-success)",
    references: "--wex-success",
    usedBy: ["WexBadge (success)"],
    description: "Success badge background color",
  },
  {
    name: "--wex-component-badge-success-fg",
    label: "Success Text",
    category: "component",
    componentGroup: "badge",
    type: "color",
    lightValue: "var(--wex-success-foreground)",
    references: "--wex-success-foreground",
    usedBy: ["WexBadge (success)"],
    description: "Success badge text color",
  },
  {
    name: "--wex-component-badge-success-border",
    label: "Success Border",
    category: "component",
    componentGroup: "badge",
    type: "color",
    lightValue: "var(--wex-success)",
    references: "--wex-success",
    usedBy: ["WexBadge (success)"],
    description: "Success badge border color",
  },
  {
    name: "--wex-component-badge-warning-bg",
    label: "Warning Background",
    category: "component",
    componentGroup: "badge",
    type: "color",
    lightValue: "var(--wex-warning)",
    references: "--wex-warning",
    usedBy: ["WexBadge (warning)"],
    description: "Warning badge background color",
  },
  {
    name: "--wex-component-badge-warning-fg",
    label: "Warning Text",
    category: "component",
    componentGroup: "badge",
    type: "color",
    lightValue: "var(--wex-warning-foreground)",
    references: "--wex-warning-foreground",
    usedBy: ["WexBadge (warning)"],
    description: "Warning badge text color",
  },
  {
    name: "--wex-component-badge-warning-border",
    label: "Warning Border",
    category: "component",
    componentGroup: "badge",
    type: "color",
    lightValue: "var(--wex-warning)",
    references: "--wex-warning",
    usedBy: ["WexBadge (warning)"],
    description: "Warning badge border color",
  },
  {
    name: "--wex-component-badge-destructive-bg",
    label: "Destructive Background",
    category: "component",
    componentGroup: "badge",
    type: "color",
    lightValue: "var(--wex-destructive)",
    references: "--wex-destructive",
    usedBy: ["WexBadge (destructive)"],
    description: "Destructive badge background color",
  },
  {
    name: "--wex-component-badge-destructive-fg",
    label: "Destructive Text",
    category: "component",
    componentGroup: "badge",
    type: "color",
    lightValue: "var(--wex-destructive-foreground)",
    references: "--wex-destructive-foreground",
    usedBy: ["WexBadge (destructive)"],
    description: "Destructive badge text color",
  },
  {
    name: "--wex-component-badge-destructive-border",
    label: "Destructive Border",
    category: "component",
    componentGroup: "badge",
    type: "color",
    lightValue: "var(--wex-destructive)",
    references: "--wex-destructive",
    usedBy: ["WexBadge (destructive)"],
    description: "Destructive badge border color",
  },
  {
    name: "--wex-component-badge-radius",
    label: "Border Radius",
    category: "component",
    componentGroup: "badge",
    type: "size",
    lightValue: "var(--wex-radius-sm)",
    references: "--wex-radius-sm",
    usedBy: ["WexBadge"],
    description: "Border radius for badges",
  },

  // ============================================================
  // ALERT
  // ============================================================
  {
    name: "--wex-component-alert-default-bg",
    label: "Default Background",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-content-bg)",
    references: "--wex-content-bg",
    usedBy: ["WexAlert (default)"],
    description: "Default alert background color",
  },
  {
    name: "--wex-component-alert-default-title-fg",
    label: "Default Title",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-text)",
    references: "--wex-text",
    usedBy: ["WexAlert (default)"],
    description: "Default alert title/header text color",
  },
  {
    name: "--wex-component-alert-default-fg",
    label: "Default Text",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-text)",
    references: "--wex-text",
    usedBy: ["WexAlert (default)"],
    description: "Default alert description/body text color",
  },
  {
    name: "--wex-component-alert-success-bg",
    label: "Success Background",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-palette-green-50)",
    references: "--wex-palette-green-50",
    usedBy: ["WexAlert (success)"],
    description: "Success alert background color",
  },
  {
    name: "--wex-component-alert-success-title-fg",
    label: "Success Title",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-palette-green-800)",
    references: "--wex-palette-green-800",
    usedBy: ["WexAlert (success)"],
    description: "Success alert title/header text color",
  },
  {
    name: "--wex-component-alert-success-fg",
    label: "Success Text",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-palette-green-800)",
    references: "--wex-palette-green-800",
    usedBy: ["WexAlert (success)"],
    description: "Success alert description/body text color",
  },
  {
    name: "--wex-component-alert-success-border",
    label: "Success Border",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-palette-green-200)",
    references: "--wex-palette-green-200",
    usedBy: ["WexAlert (success)"],
    description: "Success alert border color",
  },
  {
    name: "--wex-component-alert-warning-bg",
    label: "Warning Background",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-palette-amber-50)",
    references: "--wex-palette-amber-50",
    usedBy: ["WexAlert (warning)"],
    description: "Warning alert background color",
  },
  {
    name: "--wex-component-alert-warning-title-fg",
    label: "Warning Title",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-palette-amber-800)",
    references: "--wex-palette-amber-800",
    usedBy: ["WexAlert (warning)"],
    description: "Warning alert title/header text color",
  },
  {
    name: "--wex-component-alert-warning-fg",
    label: "Warning Text",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-palette-amber-800)",
    references: "--wex-palette-amber-800",
    usedBy: ["WexAlert (warning)"],
    description: "Warning alert description/body text color",
  },
  {
    name: "--wex-component-alert-warning-border",
    label: "Warning Border",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-palette-amber-200)",
    references: "--wex-palette-amber-200",
    usedBy: ["WexAlert (warning)"],
    description: "Warning alert border color",
  },
  {
    name: "--wex-component-alert-destructive-bg",
    label: "Destructive Background",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-palette-red-50)",
    references: "--wex-palette-red-50",
    usedBy: ["WexAlert (destructive)"],
    description: "Destructive alert background color",
  },
  {
    name: "--wex-component-alert-destructive-title-fg",
    label: "Destructive Title",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-palette-red-600)",
    references: "--wex-palette-red-600",
    usedBy: ["WexAlert (destructive)"],
    description: "Destructive alert title/header text color",
  },
  {
    name: "--wex-component-alert-destructive-fg",
    label: "Destructive Text",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-palette-red-600)",
    references: "--wex-palette-red-600",
    usedBy: ["WexAlert (destructive)"],
    description: "Destructive alert description/body text color",
  },
  {
    name: "--wex-component-alert-destructive-border",
    label: "Destructive Border",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-palette-red-200)",
    references: "--wex-palette-red-200",
    usedBy: ["WexAlert (destructive)"],
    description: "Destructive alert border color",
  },
  {
    name: "--wex-component-alert-info-bg",
    label: "Info Background",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-palette-cyan-50)",
    references: "--wex-palette-cyan-50",
    usedBy: ["WexAlert (info)"],
    description: "Info alert background color",
  },
  {
    name: "--wex-component-alert-info-title-fg",
    label: "Info Title",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-palette-cyan-700)",
    references: "--wex-palette-cyan-700",
    usedBy: ["WexAlert (info)"],
    description: "Info alert title/header text color",
  },
  {
    name: "--wex-component-alert-info-fg",
    label: "Info Text",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-palette-cyan-700)",
    references: "--wex-palette-cyan-700",
    usedBy: ["WexAlert (info)"],
    description: "Info alert description/body text color",
  },
  {
    name: "--wex-component-alert-info-border",
    label: "Info Border",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-palette-cyan-200)",
    references: "--wex-palette-cyan-200",
    usedBy: ["WexAlert (info)"],
    description: "Info alert border color",
  },
  {
    name: "--wex-component-alert-default-border",
    label: "Default Border",
    category: "component",
    componentGroup: "alert",
    type: "color",
    lightValue: "var(--wex-content-border)",
    references: "--wex-content-border",
    usedBy: ["WexAlert (default)"],
    description: "Default alert border color",
  },
  {
    name: "--wex-component-alert-radius",
    label: "Border Radius",
    category: "component",
    componentGroup: "alert",
    type: "size",
    lightValue: "var(--wex-radius-md)",
    references: "--wex-radius-md",
    usedBy: ["WexAlert"],
    description: "Border radius for alerts",
  },

  // ============================================================
  // DIALOG
  // ============================================================
  {
    name: "--wex-component-dialog-bg",
    label: "Background",
    category: "component",
    componentGroup: "dialog",
    type: "color",
    lightValue: "var(--wex-content-bg)",
    references: "--wex-content-bg",
    usedBy: ["WexDialog"],
    description: "Dialog content background",
  },
  {
    name: "--wex-component-dialog-border",
    label: "Border",
    category: "component",
    componentGroup: "dialog",
    type: "color",
    lightValue: "var(--wex-content-border)",
    references: "--wex-content-border",
    usedBy: ["WexDialog"],
    description: "Dialog content border",
  },

  // ============================================================
  // PROGRESS
  // ============================================================
  {
    name: "--wex-component-progress-track-bg",
    label: "Track Background",
    category: "component",
    componentGroup: "progress",
    type: "color",
    lightValue: "var(--wex-surface-subtle)",
    references: "--wex-surface-subtle",
    usedBy: ["WexProgress"],
    description: "Progress bar track background",
  },
  {
    name: "--wex-component-progress-indicator-bg",
    label: "Indicator Background",
    category: "component",
    componentGroup: "progress",
    type: "color",
    lightValue: "var(--wex-primary)",
    references: "--wex-primary",
    usedBy: ["WexProgress"],
    description: "Progress bar indicator fill",
  },

  // ============================================================
  // TOOLTIP
  // ============================================================
  {
    name: "--wex-component-tooltip-bg",
    label: "Background",
    category: "component",
    componentGroup: "tooltip",
    type: "color",
    lightValue: "var(--wex-palette-slate-900)",
    darkValue: "var(--wex-palette-slate-50)",
    references: "--wex-palette-slate-900",
    darkReferences: "--wex-palette-slate-50",
    usedBy: ["WexTooltip"],
    description: "Tooltip background (inverts in dark mode)",
  },
  {
    name: "--wex-component-tooltip-fg",
    label: "Text",
    category: "component",
    componentGroup: "tooltip",
    type: "color",
    lightValue: "var(--wex-palette-slate-50)",
    darkValue: "var(--wex-palette-slate-900)",
    references: "--wex-palette-slate-50",
    darkReferences: "--wex-palette-slate-900",
    usedBy: ["WexTooltip"],
    description: "Tooltip text (inverts in dark mode)",
  },

  // ============================================================
  // SKELETON
  // ============================================================
  {
    name: "--wex-component-skeleton-bg",
    label: "Background",
    category: "component",
    componentGroup: "skeleton",
    type: "color",
    lightValue: "var(--wex-surface-subtle)",
    references: "--wex-surface-subtle",
    usedBy: ["WexSkeleton"],
    description: "Skeleton loading placeholder background",
  },

  // ============================================================
  // SEPARATOR
  // ============================================================
  {
    name: "--wex-component-separator-bg",
    label: "Background",
    category: "component",
    componentGroup: "separator",
    type: "color",
    lightValue: "var(--wex-content-border)",
    references: "--wex-content-border",
    usedBy: ["WexSeparator"],
    description: "Separator line color",
  },
];

/**
 * Component groups for organizing Layer 3 tokens in UI
 */
export const COMPONENT_GROUPS: { id: ComponentGroup; label: string; description: string }[] = [
  { id: "form-controls", label: "Form Controls", description: "Shared form control tokens" },
  { id: "button", label: "Button", description: "Button variants and states" },
  { id: "input", label: "Input", description: "Text input fields" },
  { id: "card", label: "Card", description: "Card containers" },
  { id: "tabs", label: "Tabs", description: "Tab navigation" },
  { id: "badge", label: "Badge", description: "Status badges" },
  { id: "dialog", label: "Dialog", description: "Modal dialogs" },
  { id: "progress", label: "Progress", description: "Progress indicators" },
  { id: "tooltip", label: "Tooltip", description: "Tooltip popups" },
  { id: "skeleton", label: "Skeleton", description: "Loading placeholders" },
  { id: "separator", label: "Separator", description: "Divider lines" },
];

/**
 * Editable component groups for Theme Builder Layer 3 editing
 * These groups are editable in the Theme Builder UI
 */
export const EDITABLE_COMPONENT_GROUPS: EditableComponentGroup[] = [
  { 
    id: "form-controls", 
    label: "Form Controls", 
    description: "Shared tokens for Input, Textarea, Select, Checkbox, Radio, Switch",
    editable: true,
    childGroups: ["input", "textarea", "select", "checkbox", "radio", "switch", "inputotp"],
  },
  { 
    id: "button", 
    label: "Buttons", 
    description: "Button severities and states",
    editable: true,
  },
  { 
    id: "tabs", 
    label: "Tabs", 
    description: "Tab trigger and indicator colors",
    editable: true,
  },
  { 
    id: "card", 
    label: "Cards", 
    description: "Card backgrounds and borders",
    editable: true,
  },
  { 
    id: "dialog", 
    label: "Dialogs", 
    description: "Dialog, Sheet, Drawer, AlertDialog overlays and backgrounds",
    editable: true,
    childGroups: ["sheet", "drawer", "alertdialog"],
  },
  { 
    id: "badge", 
    label: "Feedback", 
    description: "Badge, Alert, Toast severity colors",
    editable: true,
    childGroups: ["alert", "toast"],
  },
];

/**
 * Get editable groups only
 */
export function getEditableGroups(): EditableComponentGroup[] {
  return EDITABLE_COMPONENT_GROUPS.filter(g => g.editable);
}

/**
 * Get tokens for an editable group (including child groups)
 */
export function getEditableTokensForGroup(groupId: ComponentGroup): TokenDefinition[] {
  const group = EDITABLE_COMPONENT_GROUPS.find(g => g.id === groupId);
  if (!group) return [];
  
  const groupIds = [groupId, ...(group.childGroups || [])];
  return COMPONENT_TOKENS.filter(t => t.componentGroup && groupIds.includes(t.componentGroup));
}

/**
 * Get Layer 3 tokens for a specific component group
 */
export function getComponentTokens(group: ComponentGroup): TokenDefinition[] {
  return COMPONENT_TOKENS.filter(t => t.componentGroup === group);
}

/**
 * All tokens combined for easy iteration
 */
export const ALL_TOKENS: TokenDefinition[] = [
  ...SEMANTIC_TOKENS,
  ...SURFACE_TOKENS,
  ...TEXT_TOKENS,
  ...FOCUS_TOKENS,
  ...CHART_TOKENS,
  ...TYPOGRAPHY_TOKENS,
  ...ACCESSIBILITY_TOKENS,
  ...RADIUS_TOKENS,
  ...COMPONENT_TOKENS,
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
  { id: "typography", label: "Typography", description: "Font families" },
  { id: "accessibility", label: "Accessibility", description: "Accessibility requirements" },
  { id: "focus", label: "Focus", description: "Focus ring styling" },
  { id: "chart", label: "Charts", description: "Data visualization colors" },
  { id: "component", label: "Components", description: "Layer 3 component-specific tokens" },
] as const;

// ============================================================================
// Note: Token conflict detection has been removed.
// Real-time WCAG contrast checking is now used instead (see contrast.ts)
// ============================================================================

