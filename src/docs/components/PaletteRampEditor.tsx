/**
 * PaletteRampEditor Component
 * 
 * Editor for palette ramps with direct HSL/Hex editing and visual ramp preview.
 * Allows editing base color (500) to regenerate full ramp, or individual shades.
 */

import * as React from "react";
import { ColorInput } from "./ColorInput";
import { CompactColorInput } from "./ColorInput";
import { PALETTE_RAMPS, type PaletteRamp } from "@/docs/data/tokenRegistry";
import { generateRampFromBase, type GeneratedRamp } from "@/docs/utils/ramp-generator";
import { tokenToHex, parseHSL, formatHSL } from "@/docs/utils/color-convert";
import { cn } from "@/lib/utils";
import { WexButton } from "@/components/wex";
import { RotateCcw } from "lucide-react";

interface PaletteRampEditorProps {
  /** Palette ramp name (e.g., "blue") */
  rampName: string;
  /** Current base color (500 shade) in HSL format */
  baseColor: string;
  /** Called when base color changes (regenerates full ramp) */
  onBaseColorChange: (hsl: string) => void;
  /** Called when individual shade changes */
  onShadeChange?: (shade: number, hsl: string) => void;
  /** Current overrides for individual shades */
  shadeOverrides?: Record<number, string>;
  /** Optional className */
  className?: string;
}

export function PaletteRampEditor({
  rampName,
  baseColor,
  onBaseColorChange,
  onShadeChange,
  shadeOverrides = {},
  className,
}: PaletteRampEditorProps) {
  const ramp = PALETTE_RAMPS.find((r) => r.name === rampName);
  if (!ramp) return null;

  // Generate preview ramp from base color
  const baseHex = tokenToHex(baseColor) || "#000000";
  const generatedRamp = React.useMemo(() => {
    return generateRampFromBase(baseHex, rampName);
  }, [baseHex, rampName]);

  // Get current color for each shade (override or generated)
  const getShadeColor = (shade: number): string => {
    if (shadeOverrides[shade]) {
      return shadeOverrides[shade];
    }
    if (generatedRamp) {
      const shadeData = generatedRamp.shades.find((s) => s.shade === shade);
      if (shadeData) {
        return formatHSL(shadeData.hsl);
      }
    }
    // Fallback to default
    const shadeData = ramp.shades.find((s) => s.shade === shade);
    if (shadeData) {
      return `${ramp.hue} ${ramp.saturation}% ${shadeData.lightness}%`;
    }
    return baseColor;
  };

  const handleShadeEdit = (shade: number, hsl: string) => {
    if (onShadeChange) {
      onShadeChange(shade, hsl);
    }
  };

  const handleResetShade = (shade: number) => {
    if (onShadeChange) {
      // Remove override - will use generated value
      onShadeChange(shade, "");
    }
  };

  const shadeValues = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Base Color Editor (500) */}
      <div className="space-y-2">
        <div className="text-sm font-semibold">{ramp.label} Base Color (500)</div>
        <ColorInput
          token={`--wex-palette-${rampName}-500`}
          label="Base Color"
          value={baseColor}
          onChange={onBaseColorChange}
        />
        <div className="text-xs text-muted-foreground">
          Changing this color will regenerate the full ramp (50-900)
        </div>
      </div>

      {/* Visual Ramp Preview */}
      <div className="space-y-2">
        <div className="text-sm font-semibold">Full Ramp Preview</div>
        <div className="flex gap-1 items-end">
          {shadeValues.map((shade) => {
            const color = getShadeColor(shade);
            const isBase = shade === 500;
            const hasOverride = !!shadeOverrides[shade];
            
            return (
              <div key={shade} className="flex flex-col items-center gap-1">
                <div className="relative group">
                  <div
                    className={cn(
                      "w-10 h-12 rounded-sm border-2 cursor-pointer transition-all",
                      isBase
                        ? "border-primary ring-2 ring-primary/20"
                        : hasOverride
                        ? "border-warning ring-1 ring-warning/20"
                        : "border-border"
                    )}
                    style={{ backgroundColor: `hsl(${color})` }}
                    title={`${ramp.label} ${shade}${hasOverride ? " (customized)" : ""}`}
                  />
                  {hasOverride && (
                    <button
                      onClick={() => handleResetShade(shade)}
                      className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-destructive text-destructive-foreground rounded-full p-0.5 transition-opacity"
                      title="Reset to generated value"
                    >
                      <RotateCcw className="h-2.5 w-2.5" />
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {shade}
                </span>
                {isBase && (
                  <span className="text-[8px] text-primary font-medium">Base</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="text-xs text-muted-foreground">
          Click any shade to edit individually. Yellow border indicates custom values.
        </div>
      </div>

      {/* Individual Shade Editors (Collapsible) */}
      <details className="space-y-2">
        <summary className="text-sm font-medium cursor-pointer text-muted-foreground hover:text-foreground">
          Edit Individual Shades
        </summary>
        <div className="grid grid-cols-5 gap-3 pt-2">
          {shadeValues.map((shade) => {
            const color = getShadeColor(shade);
            const hasOverride = !!shadeOverrides[shade];
            
            return (
              <div key={shade} className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium">
                    {shade}
                    {shade === 500 && " (Base)"}
                  </span>
                  {hasOverride && (
                    <span className="text-[10px] text-warning">●</span>
                  )}
                </div>
                <CompactColorInput
                  step={shade}
                  value={color}
                  onChange={(hsl) => handleShadeEdit(shade, hsl)}
                />
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
}

