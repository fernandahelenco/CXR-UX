/**
 * TokenMapping Component
 * 
 * Displays the relationship between WEX CSS variables and their 
 * Tailwind utility classes and component usage.
 */

import { WexBadge } from "@/components/wex";
import { cn } from "@/lib/utils";

export interface TokenMappingData {
  /** WEX CSS variable name */
  token: string;
  /** Tailwind utility classes that use this token */
  tailwindUtilities: string[];
  /** Components that use this token */
  components: string[];
}

interface TokenMappingProps {
  /** Token data to display */
  data: TokenMappingData;
  /** Optional className */
  className?: string;
}

/**
 * Single token mapping display
 */
export function TokenMapping({ data, className }: TokenMappingProps) {
  return (
    <div className={cn("text-xs space-y-1.5 p-2 rounded bg-muted/30 border border-border/50", className)}>
      <code className="font-mono text-primary text-[11px]">{data.token}</code>
      
      {data.tailwindUtilities.length > 0 && (
        <div className="flex flex-wrap gap-1">
          <span className="text-muted-foreground mr-1">Tailwind:</span>
          {data.tailwindUtilities.map((utility) => (
            <code
              key={utility}
              className="bg-muted px-1 py-0.5 rounded text-[10px] font-mono"
            >
              {utility}
            </code>
          ))}
        </div>
      )}
      
      {data.components.length > 0 && (
        <div className="flex flex-wrap gap-1">
          <span className="text-muted-foreground mr-1">Used by:</span>
          {data.components.map((component) => (
            <WexBadge key={component} intent="secondary" className="text-[10px] px-1.5 py-0">
              {component}
            </WexBadge>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Compact inline token mapping for use in editors
 */
interface TokenMappingInlineProps {
  token: string;
  className?: string;
}

export function TokenMappingInline({ token, className }: TokenMappingInlineProps) {
  const mapping = TOKEN_MAPPINGS[token];
  
  if (!mapping) return null;
  
  return (
    <div className={cn("flex flex-wrap items-center gap-1 text-[10px]", className)}>
      <span className="text-muted-foreground">→</span>
      {mapping.tailwindUtilities.slice(0, 2).map((utility) => (
        <code key={utility} className="bg-muted px-1 py-0.5 rounded font-mono">
          {utility}
        </code>
      ))}
      {mapping.tailwindUtilities.length > 2 && (
        <span className="text-muted-foreground">+{mapping.tailwindUtilities.length - 2}</span>
      )}
    </div>
  );
}

/**
 * Token to Tailwind/Component mapping registry
 */
export const TOKEN_MAPPINGS: Record<string, TokenMappingData> = {
  "--wex-primary": {
    token: "--wex-primary",
    tailwindUtilities: ["bg-primary", "text-primary", "border-primary", "ring-primary", "bg-primary/10", "bg-primary/20", "bg-primary/5"],
    components: [
      "WexButton (default)",
      "WexButton (link)",
      "WexBadge (default)",
      "WexProgress",
      "WexSwitch (checked)",
      "WexCheckbox (checked)",
      "WexRadio",
      "WexSlider",
      "WexSkeleton",
      "WexCalendar (selected)",
      "WexField (checked)",
      "Sonner (action)",
    ],
  },
  "--wex-primary-contrast": {
    token: "--wex-primary-contrast",
    tailwindUtilities: ["text-primary-foreground"],
    components: ["WexButton (default)", "WexBadge (default)"],
  },
  "--wex-primary-hover": {
    token: "--wex-primary-hover",
    tailwindUtilities: ["hover:bg-primary/90"],
    components: ["WexButton (default)"],
  },
  "--wex-destructive": {
    token: "--wex-destructive",
    tailwindUtilities: ["bg-destructive", "text-destructive", "border-destructive", "bg-destructive/10"],
    components: [
      "WexButton (destructive)",
      "WexBadge (destructive)",
      "WexAlert (destructive)",
      "WexField (error)",
      "WexInputGroup (error)",
      "WexForm (error)",
      "Sonner (error)",
    ],
  },
  "--wex-destructive-foreground": {
    token: "--wex-destructive-foreground",
    tailwindUtilities: ["text-destructive-foreground", "text-destructive"],
    components: ["WexButton (destructive)", "WexAlert (destructive)"],
  },
  "--wex-success": {
    token: "--wex-success",
    tailwindUtilities: ["bg-success", "border-success"],
    components: ["WexBadge (success)", "WexAlert (success)"],
  },
  "--wex-success-foreground": {
    token: "--wex-success-foreground",
    tailwindUtilities: ["text-success", "text-success-foreground"],
    components: ["WexBadge (success)", "WexAlert (success)"],
  },
  "--wex-warning": {
    token: "--wex-warning",
    tailwindUtilities: ["bg-warning", "border-warning"],
    components: ["WexBadge (warning)", "WexAlert (warning)"],
  },
  "--wex-warning-foreground": {
    token: "--wex-warning-foreground",
    tailwindUtilities: ["text-warning", "text-warning-foreground"],
    components: ["WexBadge (warning)", "WexAlert (warning)"],
  },
  "--wex-info": {
    token: "--wex-info",
    tailwindUtilities: ["bg-info", "border-info"],
    components: ["WexBadge (info)", "WexAlert (info)"],
  },
  "--wex-info-foreground": {
    token: "--wex-info-foreground",
    tailwindUtilities: ["text-info", "text-info-foreground"],
    components: ["WexBadge (info)", "WexAlert (info)"],
  },
  "--wex-content-bg": {
    token: "--wex-content-bg",
    tailwindUtilities: ["bg-background", "bg-card", "bg-popover"],
    components: ["WexCard", "WexDialog", "WexSheet", "WexDropdown"],
  },
  "--wex-content-border": {
    token: "--wex-content-border",
    tailwindUtilities: ["border-border", "divide-border"],
    components: ["WexCard", "WexSeparator", "WexInput", "WexTable"],
  },
  "--wex-surface-subtle": {
    token: "--wex-surface-subtle",
    tailwindUtilities: ["bg-muted", "bg-accent"],
    components: ["WexTabs (selected)", "WexSelect (hover)", "WexCommand"],
  },
  "--wex-text": {
    token: "--wex-text",
    tailwindUtilities: ["text-foreground"],
    components: ["All text content"],
  },
  "--wex-text-muted": {
    token: "--wex-text-muted",
    tailwindUtilities: ["text-muted-foreground"],
    components: ["Labels", "Descriptions", "Placeholders"],
  },
  "--wex-input-border": {
    token: "--wex-input-border",
    tailwindUtilities: ["border-input"],
    components: ["WexInput", "WexSelect", "WexTextarea"],
  },
  "--wex-focus-ring-color": {
    token: "--wex-focus-ring-color",
    tailwindUtilities: ["ring-ring"],
    components: ["All focusable elements"],
  },
  "--wex-destructive-hover": {
    token: "--wex-destructive-hover",
    tailwindUtilities: ["hover:bg-destructive-hover"],
    components: ["WexButton (destructive)"],
  },
  "--wex-success-hover": {
    token: "--wex-success-hover",
    tailwindUtilities: ["hover:bg-success-hover"],
    components: ["WexButton (success)"],
  },
  "--wex-warning-hover": {
    token: "--wex-warning-hover",
    tailwindUtilities: ["hover:bg-warning-hover"],
    components: ["WexButton (warning)"],
  },
  "--wex-info-hover": {
    token: "--wex-info-hover",
    tailwindUtilities: ["hover:bg-info-hover"],
    components: ["WexButton (info)"],
  },
};

/**
 * Get mapping for a specific token
 */
export function getTokenMapping(token: string): TokenMappingData | undefined {
  return TOKEN_MAPPINGS[token];
}

/**
 * Reverse lookup: Get all tokens used by a specific component
 */
export function getTokensForComponent(componentName: string): TokenMappingData[] {
  const tokens: TokenMappingData[] = [];
  
  for (const mapping of Object.values(TOKEN_MAPPINGS)) {
    // Check if any component in the list contains the search term
    const matches = mapping.components.some(comp => 
      comp.toLowerCase().includes(componentName.toLowerCase())
    );
    if (matches) {
      tokens.push(mapping);
    }
  }
  
  return tokens;
}

/**
 * Get all unique components from the token mappings
 */
export function getAllComponents(): string[] {
  const components = new Set<string>();
  
  for (const mapping of Object.values(TOKEN_MAPPINGS)) {
    for (const component of mapping.components) {
      // Extract base component name (e.g., "WexButton" from "WexButton (default)")
      const baseName = component.split(" ")[0];
      if (baseName.startsWith("Wex")) {
        components.add(baseName);
      }
    }
  }
  
  return Array.from(components).sort();
}

/**
 * Cascade chain showing palette -> semantic -> bridge -> tailwind -> components
 */
export interface CascadeChain {
  palette: string | null;
  semantic: string;
  bridge: string;
  tailwind: string[];
  components: string[];
}

/**
 * Token to shadcn bridge variable mapping
 */
const BRIDGE_MAP: Record<string, string> = {
  "--wex-primary": "--primary",
  "--wex-primary-contrast": "--primary-foreground",
  "--wex-primary-hover": "--primary",
  "--wex-destructive": "--destructive",
  "--wex-destructive-foreground": "--destructive-foreground",
  "--wex-destructive-hover": "--destructive",
  "--wex-success": "--success",
  "--wex-success-foreground": "--success-foreground",
  "--wex-success-hover": "--success",
  "--wex-warning": "--warning",
  "--wex-warning-foreground": "--warning-foreground",
  "--wex-warning-hover": "--warning",
  "--wex-info": "--info",
  "--wex-info-foreground": "--info-foreground",
  "--wex-info-hover": "--info",
  "--wex-content-bg": "--background",
  "--wex-content-border": "--border",
  "--wex-surface-subtle": "--muted",
  "--wex-text": "--foreground",
  "--wex-text-muted": "--muted-foreground",
  "--wex-input-border": "--input",
  "--wex-focus-ring-color": "--ring",
};

/**
 * Token to palette reference mapping (light mode)
 */
const PALETTE_MAP_LIGHT: Record<string, string> = {
  "--wex-primary": "--wex-palette-blue-700",
  "--wex-primary-hover": "--wex-palette-blue-800",
  "--wex-destructive": "--wex-palette-red-500",
  "--wex-destructive-hover": "--wex-palette-red-600",
  "--wex-success": "--wex-palette-green-600",
  "--wex-success-hover": "--wex-palette-green-700",
  "--wex-warning": "--wex-palette-amber-500",
  "--wex-warning-hover": "--wex-palette-amber-600",
  "--wex-info": "--wex-palette-cyan-500",
  "--wex-info-hover": "--wex-palette-cyan-600",
  "--wex-focus-ring-color": "--wex-palette-blue-700",
};

/**
 * Token to palette reference mapping (dark mode)
 */
const PALETTE_MAP_DARK: Record<string, string> = {
  "--wex-primary": "--wex-palette-blue-500",
  "--wex-primary-hover": "--wex-palette-blue-600",
  "--wex-destructive": "--wex-palette-red-500",
  "--wex-destructive-hover": "--wex-palette-red-600",
  "--wex-success": "--wex-palette-green-500",
  "--wex-success-hover": "--wex-palette-green-600",
  "--wex-warning": "--wex-palette-amber-400",
  "--wex-warning-hover": "--wex-palette-amber-500",
  "--wex-info": "--wex-palette-cyan-400",
  "--wex-info-hover": "--wex-palette-cyan-500",
  "--wex-focus-ring-color": "--wex-palette-blue-500",
};

// Combined for backwards compatibility
const PALETTE_MAP = PALETTE_MAP_LIGHT;

/**
 * Get the full cascade chain for a semantic token
 */
export function getCascadeChain(tokenName: string): CascadeChain | null {
  const mapping = TOKEN_MAPPINGS[tokenName];
  if (!mapping) return null;
  
  return {
    palette: PALETTE_MAP[tokenName] || null,
    semantic: tokenName,
    bridge: BRIDGE_MAP[tokenName] || tokenName.replace("--wex-", "--"),
    tailwind: mapping.tailwindUtilities,
    components: mapping.components,
  };
}

/**
 * Find which semantic tokens reference a given palette token (light mode only)
 */
export function getSemanticTokensForPalette(paletteToken: string): string[] {
  const semanticTokens: string[] = [];
  
  for (const [semantic, palette] of Object.entries(PALETTE_MAP)) {
    if (palette === paletteToken) {
      semanticTokens.push(semantic);
    }
  }
  
  return semanticTokens;
}

/**
 * Find which semantic tokens reference a given palette token with mode info
 */
export interface PaletteReference {
  token: string;
  mode: "light" | "dark" | "both";
}

export function getSemanticTokensForPaletteWithMode(paletteToken: string): PaletteReference[] {
  const references: PaletteReference[] = [];
  const seen = new Set<string>();
  
  // Check light mode
  for (const [semantic, palette] of Object.entries(PALETTE_MAP_LIGHT)) {
    if (palette === paletteToken) {
      seen.add(semantic);
      // Check if also used in dark mode
      const darkPalette = PALETTE_MAP_DARK[semantic];
      if (darkPalette === paletteToken) {
        references.push({ token: semantic, mode: "both" });
      } else {
        references.push({ token: semantic, mode: "light" });
      }
    }
  }
  
  // Check dark mode for any not already found
  for (const [semantic, palette] of Object.entries(PALETTE_MAP_DARK)) {
    if (palette === paletteToken && !seen.has(semantic)) {
      references.push({ token: semantic, mode: "dark" });
    }
  }
  
  return references;
}

/**
 * Get all components affected by a palette token change
 */
export function getComponentsAffectedByPalette(paletteToken: string): string[] {
  const components = new Set<string>();
  const semanticTokens = getSemanticTokensForPalette(paletteToken);
  
  for (const semanticToken of semanticTokens) {
    const mapping = TOKEN_MAPPINGS[semanticToken];
    if (mapping) {
      for (const component of mapping.components) {
        components.add(component);
      }
    }
  }
  
  return Array.from(components);
}

