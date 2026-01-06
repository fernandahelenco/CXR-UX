import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "../../lib/utils"

const Tabs = TabsPrimitive.Root

// ============================================================
// TabsList - Basic tab list with underline style
// ============================================================
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center gap-1",
      "border-b border-wex-tabs-divider",
      "text-wex-tabs-trigger-fg",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

// ============================================================
// ScrollableTabsList - Tab list with scroll arrows
// ============================================================
type ScrollableTabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>

const ScrollableTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  ScrollableTabsListProps
>(({ className, children, ...props }, ref) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)

  const checkScroll = React.useCallback(() => {
    const el = scrollContainerRef.current
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0)
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
    }
  }, [])

  React.useEffect(() => {
    checkScroll()
    const el = scrollContainerRef.current
    if (el) {
      el.addEventListener("scroll", checkScroll)
      const resizeObserver = new ResizeObserver(checkScroll)
      resizeObserver.observe(el)
      return () => {
        el.removeEventListener("scroll", checkScroll)
        resizeObserver.disconnect()
      }
    }
  }, [checkScroll])

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current
    if (el) {
      const scrollAmount = el.clientWidth * 0.5
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative flex items-center">
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 flex h-full items-center justify-center w-8 bg-gradient-to-r from-muted to-transparent hover:from-muted"
          aria-label="Scroll tabs left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide"
      >
        <TabsPrimitive.List
          ref={ref}
          className={cn(
            "inline-flex h-10 items-center gap-1",
            "border-b border-wex-tabs-divider",
            "text-wex-tabs-trigger-fg",
            className
          )}
          {...props}
        >
          {children}
        </TabsPrimitive.List>
      </div>
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 flex h-full items-center justify-center w-8 bg-gradient-to-l from-muted to-transparent hover:from-muted"
          aria-label="Scroll tabs right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  )
})
ScrollableTabsList.displayName = "ScrollableTabsList"

// ============================================================
// TabsTrigger - Basic tab trigger with underline indicator
// ============================================================
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap px-4 py-2.5 text-sm font-medium transition-all",
      "text-wex-tabs-trigger-fg",
      "border-b-2 border-transparent -mb-px",
      "hover:text-wex-tabs-trigger-active-fg hover:border-wex-tabs-trigger-hover-bg",
      "data-[state=active]:text-wex-tabs-trigger-active-fg",
      "data-[state=active]:border-wex-tabs-indicator",
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wex-tabs-focus-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

// ============================================================
// ClosableTabsTrigger - Tab trigger with close button inside trigger for a11y compliance
// The close button is inside the trigger to avoid tablist role violations
// ============================================================
interface ClosableTabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  onClose?: (value: string) => void
}

const ClosableTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  ClosableTabsTriggerProps
>(({ className, children, value, onClose, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    value={value}
    className={cn(
      "group relative inline-flex items-center justify-center whitespace-nowrap pl-4 pr-8 py-2.5 text-sm font-medium transition-all",
      "text-wex-tabs-trigger-fg",
      "border-b-2 border-transparent -mb-px",
      "hover:text-wex-tabs-trigger-active-fg hover:border-wex-tabs-trigger-hover-bg",
      "data-[state=active]:text-wex-tabs-trigger-active-fg",
      "data-[state=active]:border-wex-tabs-indicator",
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wex-tabs-focus-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    {/* Close button - aria-hidden to avoid nested-interactive, still clickable via pointer */}
    <span
      aria-hidden="true"
      onPointerDown={(e) => {
        e.stopPropagation()
        e.preventDefault()
        onClose?.(value)
      }}
      className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-sm opacity-70 hover:opacity-100 hover:bg-muted p-0.5 cursor-pointer"
    >
      <X className="h-3.5 w-3.5" />
    </span>
  </TabsPrimitive.Trigger>
))
ClosableTabsTrigger.displayName = "ClosableTabsTrigger"

// ============================================================
// TabsContent
// ============================================================
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wex-tabs-focus-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, ScrollableTabsList, TabsTrigger, ClosableTabsTrigger, TabsContent }

