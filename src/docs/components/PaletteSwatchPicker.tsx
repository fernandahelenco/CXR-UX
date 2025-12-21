/**
 * PaletteSwatchPicker Component
 * 
 * A popover component for visually selecting palette shades.
 * Shows all palette ramps (Blue, Green, Amber, Red, Cyan, Slate) with
 * clickable swatches for each shade (50-900).
 */

import * as React from "react";
import { WexPopover } from "@/components/wex";
import { PALETTE_RAMPS } from "@/docs/data/tokenRegistry";
import { cn } from "@/lib/utils";

interface PaletteSwatchPickerProps {
  /** Currently selected value, e.g., "blue-700" */
  value: string;
  /** Callback when a shade is selected */
  onSelect: (value: string) => void;
  /** Trigger element */
  children: React.ReactNode;
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
        <div className="space-y-3">
          <div className="text-sm font-medium text-foreground">
            Select Palette Shade
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

  const token = `--wex-palette-${value}`;

  return (
    <div
      className={cn(
        sizeClasses[size],
        "rounded-sm border border-border/50 flex-shrink-0",
        className
      )}
      style={{ backgroundColor: `hsl(var(${token}))` }}
      title={value}
    />
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

export function TokenRowWithPicker({
  label,
  value,
  onChange,
  className,
}: TokenRowWithPickerProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <PaletteSwatchPicker value={value} onSelect={onChange}>
        <button 
          type="button"
          className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted/50 transition-colors cursor-pointer group"
        >
          <SwatchDisplay value={value} size="md" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">{label}</span>
            <span className="text-xs text-muted-foreground font-mono">
              {value}
            </span>
          </div>
          <span className="text-xs text-muted-foreground/50 group-hover:text-muted-foreground ml-auto">
            Click to change
          </span>
        </button>
      </PaletteSwatchPicker>
    </div>
  );
}

