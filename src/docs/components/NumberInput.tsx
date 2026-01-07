/**
 * NumberInput Component
 * 
 * A number input with unit selector for size tokens (radius, spacing, accessibility).
 * Used in Theme Builder for editing non-color tokens.
 */

import * as React from "react";
import { WexInput, WexLabel } from "@/components/wex";
import { cn } from "@/lib/utils";

interface NumberInputProps {
  /** Display label */
  label: string;
  /** Current value (e.g., "6px", "44px") */
  value: string;
  /** Called when value changes */
  onChange: (value: string) => void;
  /** Available units */
  units?: string[];
  /** Default unit if value has no unit */
  defaultUnit?: string;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step for number input */
  step?: number;
  /** Optional className */
  className?: string;
  /** Token name for display */
  token?: string;
}

export function NumberInput({
  label,
  value,
  onChange,
  units = ["px", "rem"],
  defaultUnit = "px",
  min = 0,
  max = 1000,
  step = 1,
  className,
  token,
}: NumberInputProps) {
  // Parse value into number and unit
  const parseValue = React.useCallback((val: string): { number: number; unit: string } => {
    const match = val.match(/^([\d.]+)(\w*)$/);
    if (match) {
      return {
        number: parseFloat(match[1]) || 0,
        unit: match[2] || defaultUnit,
      };
    }
    return { number: 0, unit: defaultUnit };
  }, [defaultUnit]);

  const { number, unit } = parseValue(value);
  const [numberValue, setNumberValue] = React.useState(number.toString());
  const [selectedUnit, setSelectedUnit] = React.useState(unit);

  // Sync when external value changes
  React.useEffect(() => {
    const parsed = parseValue(value);
    setNumberValue(parsed.number.toString());
    setSelectedUnit(parsed.unit || defaultUnit);
  }, [value, parseValue, defaultUnit]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value;
    setNumberValue(newNumber);
    
    const num = parseFloat(newNumber);
    if (!isNaN(num)) {
      const clamped = Math.max(min, Math.min(max, num));
      onChange(`${clamped}${selectedUnit}`);
    }
  };

  const handleNumberBlur = () => {
    const num = parseFloat(numberValue);
    if (isNaN(num)) {
      // Reset to current value
      setNumberValue(number.toString());
    } else {
      const clamped = Math.max(min, Math.min(max, num));
      setNumberValue(clamped.toString());
      onChange(`${clamped}${selectedUnit}`);
    }
  };

  const handleUnitChange = (newUnit: string) => {
    setSelectedUnit(newUnit);
    const num = parseFloat(numberValue) || 0;
    onChange(`${num}${newUnit}`);
  };

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
      
      <div className="flex items-center gap-2">
        <WexInput
          type="number"
          value={numberValue}
          onChange={handleNumberChange}
          onBlur={handleNumberBlur}
          min={min}
          max={max}
          step={step}
          className="w-20 font-mono text-xs h-8"
        />
        {units.length > 1 && (
          <select
            value={selectedUnit}
            onChange={(e) => handleUnitChange(e.target.value)}
            className="h-8 px-2 text-xs rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {units.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        )}
        {units.length === 1 && (
          <span className="text-xs text-muted-foreground px-2">{units[0]}</span>
        )}
      </div>
    </div>
  );
}

