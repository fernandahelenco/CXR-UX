/**
 * PaletteSwatchPicker Component
 * 
 * A popover component for visually selecting palette shades.
 * Shows all palette ramps (Blue, Green, Amber, Red, Cyan, Slate) with
 * clickable swatches for each shade (50-900).
 */

import * as React from "react";
import { WexPopover, WexTooltip } from "@/components/wex";
import { PALETTE_RAMPS, NEUTRAL_TOKENS } from "@/docs/data/tokenRegistry";
import { cn } from "@/lib/utils";

interface PaletteSwatchPickerProps {
  /** Currently selected value, e.g., "blue-700" */
  value: string;
  /** Callback when a shade is selected */
  onSelect: (value: string) => void;
  /** Trigger element - if not provided, renders just the content (for use inside other popovers) */
  children?: React.ReactNode;
  /** Optional className for the trigger wrapper */
  className?: string;
}

/**
 * Parse a palette value like "blue-700" into { name: "blue", shade: 700 }
 */
function parseValue(value: string): { name: string; shade: number } | null {
  const match = value.match(/^(\w+)-(\d+)$/);
  if (!match) return null;
  return { name: match[1], shade: parseInt(match[2], 10) };
}

export function PaletteSwatchPicker({
  value,
  onSelect,
  children,
  className,
}: PaletteSwatchPickerProps) {
  const [open, setOpen] = React.useState(false);
  const parsed = parseValue(value);

  const handleSelect = React.useCallback((paletteName: string, shade: number) => {
    onSelect(`${paletteName}-${shade}`);
    setOpen(false);
  }, [onSelect]);

  const handleNeutralSelect = React.useCallback((neutralName: string) => {
    onSelect(neutralName);
    setOpen(false);
  }, [onSelect]);

  // The swatch content (used in both popover and standalone modes)
  const swatchContent = (
    <div className="space-y-3">
      <div className="text-sm font-medium text-foreground">
        Select Palette Shade
      </div>
      
      {/* Neutral colors (white/black) */}
      <div className="space-y-1">
        <div className="text-xs text-muted-foreground font-medium">Neutrals</div>
        <div className="flex gap-1">
          {NEUTRAL_TOKENS.map((neutral) => {
            const isSelected = value === neutral.name;
            return (
              <button
                key={neutral.name}
                type="button"
                onClick={() => handleNeutralSelect(neutral.name)}
                title={neutral.label}
                className={cn(
                  "w-6 h-6 rounded-sm transition-all border",
                  "hover:scale-110 hover:z-10 hover:ring-2 hover:ring-foreground/20",
                  "focus:outline-none focus:ring-2 focus:ring-primary",
                  isSelected && "ring-2 ring-primary ring-offset-1",
                  neutral.name === "white" && "border-border"
                )}
                style={{ 
                  backgroundColor: `hsl(${neutral.value})` 
                }}
              >
                <span className="sr-only">{neutral.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {PALETTE_RAMPS.map((ramp) => (
        <div key={ramp.name} className="space-y-1">
          {/* Ramp label */}
          <div className="text-xs text-muted-foreground font-medium">
            {ramp.label}
          </div>
          
          {/* Shade swatches */}
          <div className="flex gap-1">
            {ramp.shades.map((shade) => {
              const isSelected = parsed?.name === ramp.name && parsed?.shade === shade.shade;
              
              return (
                <button
                  key={shade.shade}
                  type="button"
                  onClick={() => handleSelect(ramp.name, shade.shade)}
                  title={`${ramp.label} ${shade.shade}`}
                  className={cn(
                    "w-6 h-6 rounded-sm transition-all",
                    "hover:scale-110 hover:z-10 hover:ring-2 hover:ring-foreground/20",
                    "focus:outline-none focus:ring-2 focus:ring-primary",
                    isSelected && "ring-2 ring-primary ring-offset-1"
                  )}
                  style={{ 
                    backgroundColor: `hsl(var(${shade.token}))` 
                  }}
                >
                  <span className="sr-only">
                    {ramp.label} {shade.shade}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Shade labels */}
          <div className="flex gap-1">
            {ramp.shades.map((shade) => (
              <div 
                key={shade.shade} 
                className="w-6 text-center text-[8px] text-muted-foreground"
              >
                {shade.shade}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  // If no children provided, render just the content (for use inside other popovers)
  if (!children) {
    return <div className="p-3">{swatchContent}</div>;
  }

  // Otherwise, render with popover wrapper
  return (
    <WexPopover open={open} onOpenChange={setOpen}>
      <WexPopover.Trigger asChild>
        <div className={className}>{children}</div>
      </WexPopover.Trigger>
      <WexPopover.Content 
        className="w-80 p-3" 
        align="start"
        sideOffset={8}
      >
        {swatchContent}
      </WexPopover.Content>
    </WexPopover>
  );
}

/**
 * Inline swatch display showing current selection
 */
interface SwatchDisplayProps {
  /** Palette value, e.g., "blue-700" */
  value: string;
  /** Optional size */
  size?: "sm" | "md" | "lg";
  /** Optional className */
  className?: string;
}

export function SwatchDisplay({ value, size = "md", className }: SwatchDisplayProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  // Read actual CSS variable value from DOM
  const [actualColor, setActualColor] = React.useState<string | null>(null);
  const token = `--wex-palette-${value}`;

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const readColor = () => {
      const cssValue = getComputedStyle(document.documentElement)
        .getPropertyValue(token)
        .trim();
      if (cssValue) {
        setActualColor(cssValue);
      } else {
        setActualColor(null);
      }
    };

    // Read immediately
    readColor();

    // Watch for style changes on documentElement
    const observer = new MutationObserver(() => {
      readColor();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    // Also poll periodically (fallback)
    const interval = setInterval(readColor, 200);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [token, value]);

  // Use actual color if available, otherwise fall back to CSS variable reference
  const bgColor = actualColor 
    ? `hsl(${actualColor})` 
    : `hsl(var(${token}))`;

  return (
    <WexTooltip.Provider>
      <WexTooltip>
        <WexTooltip.Trigger asChild>
          <div
            className={cn(
              sizeClasses[size],
              "rounded-full border-2 border-border flex-shrink-0 cursor-help",
              className
            )}
            style={{ 
              backgroundColor: bgColor,
              minWidth: size === 'sm' ? '16px' : size === 'md' ? '24px' : '32px',
              minHeight: size === 'sm' ? '16px' : size === 'md' ? '24px' : '32px',
            }}
          />
        </WexTooltip.Trigger>
        <WexTooltip.Content>
          <p className="text-xs font-mono">{value}</p>
        </WexTooltip.Content>
      </WexTooltip>
    </WexTooltip.Provider>
  );
}

/**
 * Token row with swatch picker integration
 */
interface TokenRowWithPickerProps {
  /** Token label */
  label: string;
  /** Current value, e.g., "blue-700" */
  value: string;
  /** Callback when value changes */
  onChange: (value: string) => void;
  /** Optional className */
  className?: string;
}

/**
 * Format a palette value like "blue-700" to "Blue 700", "white" to "White"
 */
export function formatPaletteValue(value: string): string {
  // Handle neutral tokens (white/black)
  if (value === "white" || value === "black") {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  
  const match = value.match(/^(\w+)-(\d+)$/);
  if (!match) return value;
  const [, name, shade] = match;
  return `${name.charAt(0).toUpperCase() + name.slice(1)} ${shade}`;
}

export function TokenRowWithPicker({
  label,
  value,
  className,
}: Omit<TokenRowWithPickerProps, 'onChange'>) {
  const displayValue = formatPaletteValue(value);
  
  return (
    <div className={cn("flex items-center gap-3 py-2 px-1", className)}>
      <SwatchDisplay value={value} size="md" className="ring-1 ring-border/50" />
      <div className="flex flex-col">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-muted-foreground font-mono">
          {displayValue}
        </span>
      </div>
    </div>
  );
}

