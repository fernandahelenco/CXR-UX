import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-md border border-wex-textarea-border bg-wex-textarea-bg px-3 py-2 text-sm text-wex-textarea-fg shadow-sm placeholder:text-wex-textarea-placeholder focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-wex-textarea-focus-ring disabled:cursor-not-allowed disabled:opacity-[var(--wex-component-textarea-disabled-opacity)]",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
