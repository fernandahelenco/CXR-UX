import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check, SquareMinus } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  [
    "relative grid place-content-center peer shrink-0 rounded-sm border shadow box-border",
    "border-wex-checkbox-border bg-wex-checkbox-bg",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-wex-checkbox-focus-ring focus-visible:ring-offset-0 focus-visible:ring-inset",
    "disabled:cursor-not-allowed disabled:opacity-[var(--wex-component-checkbox-disabled-opacity)]",
    "data-[state=checked]:bg-wex-checkbox-checked-bg data-[state=checked]:text-wex-checkbox-checked-fg data-[state=checked]:border-wex-checkbox-checked-bg",
    "data-[state=unchecked]:border-wex-checkbox-border",
    "flex-shrink-0",
    "hover:border-wex-checkbox-border",
  ],
  {
    variants: {
      checkboxSize: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      checkboxSize: "md",
    },
  }
)

const checkIconSizes = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
}

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "size">,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, checkboxSize, checked, ...props }, ref) => {
  const isIndeterminate = checked === "indeterminate";
  
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        checkboxVariants({ checkboxSize }),
        isIndeterminate && "data-[state=indeterminate]:bg-wex-checkbox-checked-bg data-[state=indeterminate]:border-wex-checkbox-checked-bg",
        checked === true && "!bg-[#0058a3] !border-[#0058a3]",
        "flex-shrink-0",
        className
      )}
      checked={isIndeterminate ? false : checked}
      data-state={isIndeterminate ? "indeterminate" : undefined}
      style={{ minWidth: checkboxSize === "sm" ? "16px" : checkboxSize === "lg" ? "24px" : "20px", minHeight: checkboxSize === "sm" ? "16px" : checkboxSize === "lg" ? "24px" : "20px" }}
      {...props}
    >
      {isIndeterminate && (
        <div className="grid place-content-center absolute inset-0 pointer-events-none">
          <SquareMinus 
            className={cn(checkIconSizes[checkboxSize || "md"])} 
            strokeWidth={2}
            stroke="#0058a3"
            fill="white"
          />
        </div>
      )}
      {!isIndeterminate && (
        <CheckboxPrimitive.Indicator
          className={cn("grid place-content-center")}
        >
          <Check className={cn(checkIconSizes[checkboxSize || "md"], "text-white")} />
        </CheckboxPrimitive.Indicator>
      )}
    </CheckboxPrimitive.Root>
  );
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox, checkboxVariants }
