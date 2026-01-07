/**
 * GlobalRadiusEditor Component
 * 
 * Editor for global radius preset values (sm/md/lg).
 * Allows editing the actual pixel values of radius presets.
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { RADIUS_TOKENS } from "@/docs/data/tokenRegistry";
import { WexSeparator } from "@/components/wex";

export interface GlobalRadiusEditorProps {
  /** Current radius values (token name -> value) */
  values: Record<string, string>;
  /** Callback when a radius value changes */
  onChange: (tokenName: string, value: string) => void;
  /** Optional className */
  className?: string;
}

/**
 * Extract numeric value from CSS value (e.g., "6px" -> 6)
 */
function extractNumericValue(value: string): number {
  const match = value.match(/^(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

export function GlobalRadiusEditor({
  values,
  onChange,
  className,
}: GlobalRadiusEditorProps) {
  const handleValueChange = React.useCallback((tokenName: string, numericValue: number) => {
    // Ensure value is positive
    const clampedValue = Math.max(0, numericValue);
    // Format as pixel value
    onChange(tokenName, `${clampedValue}px`);
  }, [onChange]);
  
  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <h3 className="text-sm font-semibold text-foreground">Radius Presets</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Edit the base radius values. These cascade to all components that reference them.
        </p>
      </div>
      
      <WexSeparator />
      
      <div className="space-y-4">
        {RADIUS_TOKENS.map((token) => {
          const currentValue = values[token.name] || token.lightValue;
          const numericValue = extractNumericValue(currentValue);
          
          return (
            <div key={token.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{token.label}</div>
                  {token.description && (
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {token.description}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={numericValue}
                    onChange={(e) => {
                      const newValue = parseFloat(e.target.value) || 0;
                      handleValueChange(token.name, newValue);
                    }}
                    className={cn(
                      "w-20 px-2 py-1.5 rounded-md border border-border bg-background",
                      "text-sm font-mono text-right",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    )}
                  />
                  <span className="text-sm text-muted-foreground">px</span>
                </div>
              </div>
              
              {/* Visual preview */}
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded border-2 border-border bg-muted/50 flex items-center justify-center"
                  style={{ borderRadius: currentValue }}
                >
                  <div className="text-xs text-muted-foreground">Preview</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <code className="font-mono">{currentValue}</code>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

