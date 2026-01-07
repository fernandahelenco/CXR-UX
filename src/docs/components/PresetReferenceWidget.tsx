/**
 * PresetReferenceWidget Component
 * 
 * Radio button group for selecting preset references (e.g., radius presets).
 * Used for component tokens that must reference global presets, not custom values.
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { RADIUS_TOKENS } from "@/docs/data/tokenRegistry";

export interface PresetReferenceWidgetProps {
  /** Currently selected preset token name, e.g., "--wex-radius-md" */
  value: string;
  /** Callback when preset is selected */
  onChange: (presetToken: string) => void;
  /** Available preset tokens to choose from */
  presets?: Array<{ token: string; label: string; value: string }>;
  /** Optional label */
  label?: string;
  /** Optional className */
  className?: string;
}

/**
 * Default radius presets (will be populated with actual CSS values)
 */
const DEFAULT_RADIUS_PRESETS = RADIUS_TOKENS.map((token) => ({
  token: token.name,
  label: token.label.replace("Radius ", ""),
  value: token.lightValue, // Fallback value
}));

export function PresetReferenceWidget({
  value,
  onChange,
  presets = DEFAULT_RADIUS_PRESETS,
  label,
  className,
}: PresetReferenceWidgetProps) {
  // Read actual CSS variable values from DOM for radius presets
  const [presetValues, setPresetValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const readPresetValues = () => {
      const values: Record<string, string> = {};
      presets.forEach((preset) => {
        const cssValue = getComputedStyle(document.documentElement)
          .getPropertyValue(preset.token)
          .trim();
        if (cssValue) {
          values[preset.token] = cssValue;
        } else {
          // Fallback to the preset's default value
          values[preset.token] = preset.value;
        }
      });
      setPresetValues(values);
    };

    // Read immediately
    readPresetValues();

    // Watch for style changes on documentElement
    const observer = new MutationObserver(() => {
      readPresetValues();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    // Also poll periodically (fallback)
    const interval = setInterval(readPresetValues, 200);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [presets]);

  // Merge preset values with actual CSS values
  const presetsWithValues = presets.map((preset) => ({
    ...preset,
    value: presetValues[preset.token] || preset.value,
  }));

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="text-sm font-medium text-foreground">{label}</div>
      )}
      <div className="flex gap-2">
        {presetsWithValues.map((preset) => {
          const isSelected = value === preset.token;
          return (
            <button
              key={preset.token}
              type="button"
              onClick={() => onChange(preset.token)}
              className={cn(
                "flex-1 flex items-center gap-3 px-3 py-2 rounded-md border transition-all",
                "hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                  : "border-border bg-background"
              )}
            >
              <div
                className="w-16 h-12 rounded border border-border/50 flex items-center justify-center relative"
                style={{
                  borderRadius: preset.value,
                  backgroundColor: "hsl(var(--wex-palette-slate-700))",
                }}
                title={`Preview: ${preset.value}`}
              >
                <span className="text-xs text-white font-mono">
                  {preset.value}
                </span>
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  isSelected ? "text-foreground font-semibold" : "text-muted-foreground"
                )}
              >
                {preset.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

