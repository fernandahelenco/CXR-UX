import * as React from "react";
import { WexSelect } from "@/components/wex/wex-select";
import { cn } from "@/lib/utils";

/**
 * FloatLabelSelect Props
 */
export interface FloatLabelSelectProps {
  label: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

/**
 * FloatLabelSelect Component
 * 
 * A select dropdown with a floating label that animates from inside
 * the select to above it when a value is selected.
 * 
 * Features:
 * - Label floats above when value is selected
 * - Consistent styling with WexFloatLabel
 * - Smooth label transitions
 * - Support for disabled and invalid states
 * 
 * @example
 * <FloatLabelSelect
 *   label="Relationship"
 *   value={value}
 *   onValueChange={setValue}
 * >
 *   <WexSelect.Item value="spouse">Spouse</WexSelect.Item>
 *   <WexSelect.Item value="child">Child</WexSelect.Item>
 *   <WexSelect.Item value="parent">Parent</WexSelect.Item>
 * </FloatLabelSelect>
 */
export function FloatLabelSelect({
  label,
  value,
  onValueChange,
  placeholder,
  disabled = false,
  invalid = false,
  size = "md",
  className,
  children,
}: FloatLabelSelectProps) {
  const hasValue = Boolean(value);

  // Size-specific classes matching WexFloatLabel
  const sizeClasses = {
    sm: {
      trigger: "h-10 pt-4 pb-1 text-xs",
      triggerFilled: "pt-4 pb-1",
      triggerEmpty: "pt-2.5",
      labelFilled: "top-2.5 text-[10px]",
      labelEmpty: "text-xs",
    },
    md: {
      trigger: "h-14 pt-5 pb-2 text-sm",
      triggerFilled: "pt-5 pb-2",
      triggerEmpty: "pt-4",
      labelFilled: "top-4 text-xs",
      labelEmpty: "text-sm",
    },
    lg: {
      trigger: "h-16 pt-6 pb-2 text-base",
      triggerFilled: "pt-6 pb-2",
      triggerEmpty: "pt-5",
      labelFilled: "top-5 text-sm",
      labelEmpty: "text-base",
    },
  };

  return (
    <div className={cn("relative w-full", className)}>
      <WexSelect value={value} onValueChange={onValueChange} disabled={disabled}>
        <WexSelect.Trigger
          className={cn(
            "w-full rounded-md px-3 shadow-sm",
            // Size and text
            sizeClasses[size].trigger,
            // Base styles
            "text-wex-input-fg bg-wex-input-bg",
            "border border-wex-input-border",
            // Hover
            "hover:border-wex-input-border-hover",
            // Focus
            "focus:outline-none focus:border-wex-input-border-focus focus:ring-1 focus:ring-wex-input-focus-ring",
            // Padding adjustment for floating label based on value
            hasValue ? sizeClasses[size].triggerFilled : sizeClasses[size].triggerEmpty,
            // Disabled
            disabled && "cursor-not-allowed opacity-50 bg-wex-input-disabled-bg text-wex-input-disabled-fg",
            // Invalid
            invalid && [
              "border-[hsl(var(--wex-component-input-invalid-border))]",
              "focus:border-[hsl(var(--wex-component-input-invalid-border))]",
              "focus:ring-[hsl(var(--wex-component-input-invalid-focus-ring))]",
            ].join(" ")
          )}
        >
          <WexSelect.Value placeholder="" />
        </WexSelect.Trigger>
        <WexSelect.Content>
          {children}
        </WexSelect.Content>
      </WexSelect>

      {/* Floating Label */}
      <label
        className={cn(
          // Positioning
          "absolute left-3 pointer-events-none",
          "origin-top-left transition-all duration-200 ease-out",
          // Text color
          "text-wex-floatlabel-label-fg",
          // Transform based on value
          hasValue
            ? cn(sizeClasses[size].labelFilled, "scale-75 -translate-y-2.5 text-wex-floatlabel-label-focus-fg")
            : cn("top-1/2 -translate-y-1/2", sizeClasses[size].labelEmpty)
        )}
      >
        {label}
      </label>
    </div>
  );
}

