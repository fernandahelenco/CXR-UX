/**
 * FontSelector Component
 * 
 * A font family selector for typography tokens.
 * Used in Theme Builder for editing font tokens.
 */

import * as React from "react";
import { WexLabel } from "@/components/wex";
import { cn } from "@/lib/utils";

interface FontSelectorProps {
  /** Display label */
  label: string;
  /** Current font stack value */
  value: string;
  /** Called when value changes */
  onChange: (value: string) => void;
  /** Optional className */
  className?: string;
  /** Token name for display */
  token?: string;
  /** Preset font stacks */
  presets?: Array<{ label: string; value: string }>;
}

const DEFAULT_PRESETS = [
  { label: "Inter (Default)", value: "Inter, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif" },
  { label: "Poppins", value: "Poppins, Inter, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif" },
  { label: "System Sans", value: "ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif" },
  { label: "System Serif", value: "ui-serif, Georgia, \"Times New Roman\", Times, serif" },
  { label: "System Mono", value: "ui-monospace, \"Cascadia Code\", \"Source Code Pro\", Menlo, Consolas, \"DejaVu Sans Mono\", monospace" },
];

export function FontSelector({
  label,
  value,
  onChange,
  className,
  token,
  presets = DEFAULT_PRESETS,
}: FontSelectorProps) {
  const [isCustom, setIsCustom] = React.useState(() => {
    // Check if value matches any preset
    return !presets.some((p) => p.value === value);
  });
  const [customValue, setCustomValue] = React.useState(value);

  // Sync when external value changes
  React.useEffect(() => {
    const matchesPreset = presets.some((p) => p.value === value);
    setIsCustom(!matchesPreset);
    if (!matchesPreset) {
      setCustomValue(value);
    }
  }, [value, presets]);

  const handlePresetChange = (presetValue: string) => {
    onChange(presetValue);
    setIsCustom(false);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setCustomValue(newValue);
    onChange(newValue);
    setIsCustom(true);
  };

  // Extract primary font name for display
  const primaryFont = value.split(",")[0]?.trim() || value;

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center gap-1.5">
        <WexLabel className="text-xs font-medium">{label}</WexLabel>
        {token && (
          <code className="text-[9px] text-muted-foreground bg-muted px-1 py-0.5 rounded">
            {token}
          </code>
        )}
      </div>

      {/* Preset selector */}
      <select
        value={isCustom ? "custom" : value}
        onChange={(e) => {
          if (e.target.value === "custom") {
            setIsCustom(true);
          } else {
            handlePresetChange(e.target.value);
          }
        }}
        className="w-full h-8 px-2 text-xs rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        {presets.map((preset) => (
          <option key={preset.value} value={preset.value}>
            {preset.label}
          </option>
        ))}
        <option value="custom">Custom...</option>
      </select>

      {/* Custom input (shown when custom is selected) */}
      {isCustom && (
        <div className="space-y-1">
          <textarea
            value={customValue}
            onChange={handleCustomChange}
            placeholder="Enter font stack (e.g., 'Inter, sans-serif')"
            rows={2}
            className="w-full px-2 py-1 text-xs rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-mono resize-none"
          />
          <div className="text-[10px] text-muted-foreground">
            Preview: <span style={{ fontFamily: customValue }}>{primaryFont}</span>
          </div>
        </div>
      )}

      {/* Preview when preset is selected */}
      {!isCustom && (
        <div className="text-[10px] text-muted-foreground">
          Preview: <span style={{ fontFamily: value }}>{primaryFont}</span>
        </div>
      )}
    </div>
  );
}

