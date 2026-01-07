/**
 * ComponentEditor Component
 * 
 * Shows all editable properties for a selected component with inline widgets.
 * Supports variant selection for components with variants (e.g., Button).
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  getComponentTokens,
  type ComponentGroup,
  type TokenDefinition,
} from "@/docs/data/tokenRegistry";
import { PresetReferenceWidget } from "./PresetReferenceWidget";
import { PaletteSwatchPicker, SwatchDisplay, formatPaletteValue } from "./PaletteSwatchPicker";
import { WexSeparator, WexTooltip } from "@/components/wex";
import { useThemeBuilder } from "@/docs/context/ThemeBuilderContext";
import type { MVPComponent } from "./ComponentSelector";
import { Palette } from "lucide-react";

/**
 * Swatch for semantic token references (reads CSS variable value from DOM)
 */
function SemanticTokenSwatch({ tokenName, size = "md" }: { tokenName: string; size?: "sm" | "md" | "lg" }) {
  const [actualColor, setActualColor] = React.useState<string | null>(null);
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const readColor = () => {
      const cssValue = getComputedStyle(document.documentElement)
        .getPropertyValue(tokenName)
        .trim();
      if (cssValue) {
        setActualColor(cssValue);
      } else {
        setActualColor(null);
      }
    };

    readColor();
    const observer = new MutationObserver(() => {
      readColor();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });
    const interval = setInterval(readColor, 200);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [tokenName]);

  const bgColor = actualColor 
    ? `hsl(${actualColor})` 
    : `hsl(var(${tokenName}))`;

  return (
    <WexTooltip.Provider>
      <WexTooltip>
        <WexTooltip.Trigger asChild>
          <div
            className={cn(
              sizeClasses[size],
              "rounded-full border-2 border-border flex-shrink-0 cursor-help"
            )}
            style={{ 
              backgroundColor: bgColor,
              minWidth: size === 'sm' ? '16px' : size === 'md' ? '24px' : '32px',
              minHeight: size === 'sm' ? '16px' : size === 'md' ? '24px' : '32px',
            }}
          />
        </WexTooltip.Trigger>
        <WexTooltip.Content>
          <p className="text-xs font-mono">{tokenName}</p>
        </WexTooltip.Content>
      </WexTooltip>
    </WexTooltip.Provider>
  );
}

export interface ComponentEditorProps {
  /** Selected component */
  component: MVPComponent;
  /** Current token overrides (token name -> value) */
  overrides: Record<string, string>;
  /** Callback when a token value changes */
  onTokenChange: (tokenName: string, value: string) => void;
  /** Callback when selected variant changes */
  onVariantChange?: (variant: string | null) => void;
  /** Optional className */
  className?: string;
}

/**
 * Map MVP component IDs to ComponentGroup
 */
function getComponentGroup(component: MVPComponent): ComponentGroup {
  const map: Record<MVPComponent, ComponentGroup> = {
    button: "button",
    card: "card",
    input: "input",
    badge: "badge",
    alert: "alert",
  };
  return map[component];
}

/**
 * Extract variant from token name (e.g., "primary", "secondary", "destructive")
 * Handles patterns like:
 * - --wex-component-button-primary-bg -> "primary"
 * - --wex-component-alert-success-bg -> "success"
 */
function extractVariant(tokenName: string): string | null {
  // Match variant after component name: --wex-component-{component}-{variant}-{property}
  // Must match the pattern exactly: --wex-component-{component}-{variant}-{property}
  // Note: "neutral" is mapped to "default" variant for UI consistency
  // The regex ensures we match the variant immediately after the component name, followed by a hyphen
  // Examples:
  //   --wex-component-alert-default-bg -> "default"
  //   --wex-component-alert-info-title-fg -> "info"
  //   --wex-component-alert-radius -> null (no variant)
  const match = tokenName.match(/^--wex-component-\w+-(primary|secondary|destructive|success|info|warning|default|neutral|outline|ghost|link)-/);
  if (match && match[1]) {
    // Map "neutral" to "default" for UI consistency
    return match[1] === "neutral" ? "default" : match[1];
  }
  return null;
}

/**
 * Group tokens by variant
 */
function groupTokensByVariant(tokens: TokenDefinition[]): Map<string | null, TokenDefinition[]> {
  const groups = new Map<string | null, TokenDefinition[]>();
  
  tokens.forEach((token) => {
    const variant = extractVariant(token.name);
    if (!groups.has(variant)) {
      groups.set(variant, []);
    }
    groups.get(variant)!.push(token);
  });
  
  return groups;
}

/**
 * Get current value for a token (override or default)
 */
function getTokenValue(
  token: TokenDefinition,
  overrides: Record<string, string>,
  editMode: "light" | "dark"
): string {
  // For radius tokens, extract the preset reference FIRST (before checking overrides)
  if (token.type === "size" && token.name.includes("radius")) {
    // Check override first
    if (overrides[token.name]) {
      const overrideValue = overrides[token.name].trim();
      const overrideMatch = overrideValue.match(/var\((--wex-radius-\w+)\)/);
      if (overrideMatch && overrideMatch[1]) {
        return overrideMatch[1];
      }
      // If override is just the token name without var(), return it
      if (overrideValue.startsWith("--wex-radius-")) {
        return overrideValue;
      }
      return overrideValue;
    }
    // Check references field (most reliable)
    if (token.references) {
      const ref = editMode === "light" ? token.references : (token.darkReferences || token.references);
      if (ref && ref.startsWith("--wex-radius-")) {
        return ref;
      }
    }
    // Check default value
    const defaultValue = editMode === "light" ? token.lightValue : (token.darkValue || token.lightValue);
    if (defaultValue && defaultValue.trim().startsWith("var(")) {
      const match = defaultValue.trim().match(/var\((--wex-radius-\w+)\)/);
      if (match && match[1]) {
        return match[1];
      }
    }
    // Fallback: return the default value as-is
    return defaultValue;
  }
  
  // For color tokens, check override first
  if (overrides[token.name]) {
    const overrideValue = overrides[token.name].trim();
    // If override is a palette reference (e.g., "var(--wex-palette-blue-700)"), extract it
    const paletteMatch = overrideValue.match(/var\(--wex-palette-(\w+)-(\d+)\)/);
    if (paletteMatch) {
      return `${paletteMatch[1]}-${paletteMatch[2]}`;
    }
    // If override is a neutral palette reference
    const neutralMatch = overrideValue.match(/var\(--wex-palette-(white|black)\)/);
    if (neutralMatch) {
      return neutralMatch[1];
    }
    // If override is already a palette value (e.g., "blue-700"), return it
    if (/^\w+-\d+$/.test(overrideValue) || overrideValue === "white" || overrideValue === "black") {
      return overrideValue;
    }
    // Otherwise return the override as-is (might be a semantic token reference)
    return overrideValue;
  }
  
  // For tokens with references, extract the palette reference
  if (token.references) {
    const ref = editMode === "light" ? token.references : (token.darkReferences || token.references);
    if (ref) {
      // Extract palette reference (e.g., "--wex-palette-blue-700" -> "blue-700")
      const paletteMatch = ref.match(/--wex-palette-(\w+)-(\d+)/);
      if (paletteMatch) {
        return `${paletteMatch[1]}-${paletteMatch[2]}`;
      }
      // Handle neutral tokens
      const neutralMatch = ref.match(/--wex-palette-(white|black)/);
      if (neutralMatch) {
        return neutralMatch[1];
      }
    }
  }
  
  return token.lightValue;
}

export function ComponentEditor({
  component,
  overrides,
  onTokenChange,
  onVariantChange,
  className,
}: ComponentEditorProps) {
  const [selectedVariant, setSelectedVariant] = React.useState<string | null>(null);
  const { editMode } = useThemeBuilder();
  
  // Notify parent when variant changes
  React.useEffect(() => {
    onVariantChange?.(selectedVariant);
  }, [selectedVariant, onVariantChange]);
  
  const componentGroup = getComponentGroup(component);
  const allTokens = getComponentTokens(componentGroup);
  
  // Filter to only editable tokens (color and size/radius)
  const editableTokens = allTokens.filter(
    (t) => {
      // Include color and radius tokens
      const isColorOrRadius = t.type === "color" || (t.type === "size" && t.name.includes("radius"));
      // Exclude focus-ring tokens (should be set from foundations)
      const isFocusRing = t.name.includes("focus-ring");
      return isColorOrRadius && !isFocusRing;
    }
  );
  
  // Group tokens by variant
  const tokensByVariant = groupTokensByVariant(editableTokens);
  const variants = Array.from(tokensByVariant.keys()).filter((v) => v !== null) as string[];
  
  // If no variant selected and variants exist, select first variant
  React.useEffect(() => {
    if (variants.length > 0 && selectedVariant === null) {
      setSelectedVariant(variants[0]);
    }
  }, [variants.length, selectedVariant]);
  
  // Get tokens to display (filtered by selected variant if applicable)
  const displayTokens = React.useMemo(() => {
    if (variants.length === 0) {
      return editableTokens;
    }
    if (selectedVariant === null) {
      return [];
    }
    // Get tokens for the selected variant - ensure strict matching
    const variantTokens = (tokensByVariant.get(selectedVariant) || []).filter((token) => {
      const tokenVariant = extractVariant(token.name);
      // Double-check that the token actually belongs to the selected variant
      return tokenVariant === selectedVariant;
    });
    // Also include non-variant tokens (like radius) for all variants
    const nonVariantTokens = editableTokens.filter((t) => {
      const tokenVariant = extractVariant(t.name);
      return tokenVariant === null;
    });
    return [...variantTokens, ...nonVariantTokens];
  }, [editableTokens, selectedVariant, variants.length, tokensByVariant]);
  
  // Separate tokens by type
  const colorTokens = displayTokens.filter((t) => t.type === "color");
  const radiusTokens = displayTokens.filter((t) => t.type === "size" && t.name.includes("radius"));
  
  // Sort color tokens by hierarchy: Title > Text > Background > Border
  const sortedColorTokens = React.useMemo(() => {
    const getTokenOrder = (tokenName: string): number => {
      const name = tokenName.toLowerCase();
      // 1. Title/Header Text (highest priority) - check for "title" first, then "header"
      if (name.includes("title") && (name.includes("fg") || name.includes("text"))) {
        return 1;
      }
      if (name.includes("header") && (name.includes("fg") || name.includes("text"))) {
        return 1;
      }
      // 2. Text/Foreground (but not title/header)
      if ((name.includes("fg") || name.includes("text")) && !name.includes("title") && !name.includes("header")) {
        return 2;
      }
      // 3. Background
      if (name.includes("bg")) {
        return 3;
      }
      // 4. Border
      if (name.includes("border")) {
        return 4;
      }
      // 5. Other color tokens (icon, etc.)
      return 5;
    };
    
    return [...colorTokens].sort((a, b) => {
      const orderA = getTokenOrder(a.name);
      const orderB = getTokenOrder(b.name);
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      // If same order, sort alphabetically by label
      return a.label.localeCompare(b.label);
    });
  }, [colorTokens]);
  
  // Get component label
  const componentLabels: Record<MVPComponent, string> = {
    button: "Button",
    card: "Card",
    input: "Input",
    badge: "Badge",
    alert: "Alert",
  };
  
  const handleRadiusChange = React.useCallback((tokenName: string, presetToken: string) => {
    onTokenChange(tokenName, `var(${presetToken})`);
  }, [onTokenChange]);
  
  const handleColorChange = React.useCallback((tokenName: string, paletteValue: string) => {
    // Convert palette value (e.g., "blue-700") to CSS variable reference
    const paletteToken = `--wex-palette-${paletteValue}`;
    onTokenChange(tokenName, `var(${paletteToken})`);
  }, [onTokenChange]);
  
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">{componentLabels[component]}</h2>
        <p className="text-sm text-muted-foreground">
          Edit component-specific tokens. Changes apply to all instances of this component.
        </p>
      </div>
      
      {/* Variant Selector (for components with variants) */}
      {variants.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-foreground">Variant</div>
          <div className="flex gap-2 flex-wrap">
            {variants.map((variant) => {
              // Format variant name for display (capitalize first letter)
              const displayName = variant.charAt(0).toUpperCase() + variant.slice(1);
              return (
                <button
                  key={variant}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                    "border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    selectedVariant === variant
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {displayName}
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      <WexSeparator />
      
      {/* Colors Section */}
      {sortedColorTokens.length > 0 && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-foreground">Colors</div>
          <div className="space-y-3">
            {sortedColorTokens.map((token) => {
              const currentValue = getTokenValue(token, overrides, editMode);
              // Check if it's a palette value (format: "blue-700" or "white"/"black")
              // NOT a semantic token reference like "var(--wex-text)"
              const isPaletteRef = /^\w+-\d+$/.test(currentValue) || currentValue === "white" || currentValue === "black";
              
              return (
                <div key={token.name} className="flex items-center justify-between gap-4 p-3 rounded-md border border-border bg-card">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{token.label}</div>
                    {token.description && (
                      <div className="text-xs text-muted-foreground mt-0.5">{token.description}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {isPaletteRef ? (
                      <>
                        <SwatchDisplay value={currentValue} size="sm" />
                        <PaletteSwatchPicker
                          value={currentValue}
                          onSelect={(value) => handleColorChange(token.name, value)}
                        >
                          <button
                            type="button"
                            className="p-1.5 rounded-md border border-border bg-background hover:bg-muted/50 transition-colors"
                            title="Change color"
                          >
                            <Palette className="h-4 w-4" />
                          </button>
                        </PaletteSwatchPicker>
                      </>
                    ) : (
                      // For semantic token references, show a swatch and allow changing to palette value
                      <>
                        <SemanticTokenSwatch tokenName={token.name} size="sm" />
                        <PaletteSwatchPicker
                          value="blue-500" // Default value for picker (will be converted on select)
                          onSelect={(value) => handleColorChange(token.name, value)}
                        >
                          <button
                            type="button"
                            className="p-1.5 rounded-md border border-border bg-background hover:bg-muted/50 transition-colors"
                            title="Change to palette color"
                          >
                            <Palette className="h-4 w-4" />
                          </button>
                        </PaletteSwatchPicker>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Border Radius Section */}
      {radiusTokens.length > 0 && (
        <div className="space-y-4">
          {radiusTokens.map((token) => {
            const currentValue = getTokenValue(token, overrides, editMode);
            return (
              <div key={token.name} className="space-y-2">
                <div className="text-sm font-medium text-foreground">{token.label}</div>
                {token.description && (
                  <div className="text-xs text-muted-foreground">{token.description}</div>
                )}
                <PresetReferenceWidget
                  value={currentValue}
                  onChange={(presetToken) => handleRadiusChange(token.name, presetToken)}
                />
              </div>
            );
          })}
        </div>
      )}
      
      {/* Empty State */}
      {displayTokens.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">No editable tokens found for this component.</p>
        </div>
      )}
    </div>
  );
}

