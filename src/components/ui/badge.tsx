import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-wex-badge-neutral-border bg-wex-badge-neutral-bg text-wex-badge-neutral-fg shadow",
        secondary:
          "border-wex-badge-neutral-border bg-wex-badge-neutral-bg text-wex-badge-neutral-fg",
        destructive:
          "border-wex-badge-destructive-border bg-wex-badge-destructive-bg text-wex-badge-destructive-fg shadow",
        outline: "text-wex-badge-neutral-fg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
