"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * FloatLabel - Floating label input component
 * 
 * Provides a Material Design / PrimeNG-style floating label that animates
 * from inside the input to above it when focused or containing a value.
 * 
 * Uses CSS peer selectors for pure-CSS state detection:
 * - placeholder=" " enables :placeholder-shown detection
 * - peer-focus: detects focus state
 * - peer-[:not(:placeholder-shown)]: detects filled state
 */

const floatLabelVariants = cva(
  "relative w-full",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const floatLabelInputVariants = cva(
  [
    // Base input styles
    "peer w-full rounded-md px-3 text-sm shadow-sm transition-colors",
    // Layer 3 tokens
    "text-wex-input-fg",
    "bg-wex-input-bg",
    "border border-wex-input-border",
    // Hover
    "hover:border-wex-input-border-hover",
    // Focus
    "focus:outline-none focus:border-wex-input-border-focus focus:ring-1 focus:ring-wex-input-focus-ring",
    // Disabled
    "disabled:cursor-not-allowed disabled:opacity-50",
    "disabled:bg-wex-input-disabled-bg disabled:text-wex-input-disabled-fg",
    // Placeholder - hidden but needed for :placeholder-shown
    "placeholder:text-transparent",
  ],
  {
    variants: {
      size: {
        sm: "h-10 pt-4 pb-1 text-xs",
        md: "h-14 pt-5 pb-2",
        lg: "h-16 pt-6 pb-2 text-base",
      },
      invalid: {
        true: [
          "border-[hsl(var(--wex-component-input-invalid-border))]",
          "focus:border-[hsl(var(--wex-component-input-invalid-border))]",
          "focus:ring-[hsl(var(--wex-component-input-invalid-focus-ring))]",
        ].join(" "),
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      invalid: false,
    },
  }
)

const floatLabelLabelVariants = cva(
  [
    // Positioning
    "absolute left-3 pointer-events-none",
    "origin-top-left transition-all duration-200 ease-out",
    // Default state (inside input)
    "text-wex-floatlabel-label-fg",
    // Floated state - applied on focus OR when input has value
    "peer-focus:text-wex-floatlabel-label-focus-fg",
    "peer-focus:scale-75 peer-focus:-translate-y-2.5",
    "peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-2.5",
    // When both focused AND has value, use focus color
    "peer-focus:peer-[:not(:placeholder-shown)]:text-wex-floatlabel-label-focus-fg",
  ],
  {
    variants: {
      size: {
        sm: "top-2.5 text-xs peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:text-[10px]",
        md: "top-4 text-sm peer-focus:text-xs peer-[:not(:placeholder-shown)]:text-xs",
        lg: "top-5 text-base peer-focus:text-sm peer-[:not(:placeholder-shown)]:text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface FloatLabelProps
  extends Omit<React.ComponentProps<"input">, "size" | "placeholder">,
    VariantProps<typeof floatLabelVariants> {
  /** The floating label text */
  label: string
  /** Size variant */
  size?: "sm" | "md" | "lg"
  /** Invalid state for form validation */
  invalid?: boolean
  /** Container className */
  containerClassName?: string
}

const FloatLabel = React.forwardRef<HTMLInputElement, FloatLabelProps>(
  ({ className, containerClassName, label, size, invalid, id, ...props }, ref) => {
    // Generate a unique id if not provided
    const generatedId = React.useId()
    const inputId = id || generatedId

    return (
      <div className={cn(floatLabelVariants({ size }), containerClassName)}>
        <input
          id={inputId}
          ref={ref}
          placeholder=" " // Required for :placeholder-shown detection
          aria-invalid={invalid || undefined}
          className={cn(floatLabelInputVariants({ size, invalid }), className)}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(floatLabelLabelVariants({ size }))}
        >
          {label}
        </label>
      </div>
    )
  }
)
FloatLabel.displayName = "FloatLabel"

export { FloatLabel, floatLabelVariants, floatLabelInputVariants, floatLabelLabelVariants }

