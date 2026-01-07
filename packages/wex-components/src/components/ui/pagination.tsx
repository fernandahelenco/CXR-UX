import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react"
import { cn } from "../../lib/utils"
import { type ButtonProps, buttonVariants } from "./button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Input } from "./input"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      isActive && "bg-wex-pagination-active-bg text-wex-pagination-active-fg pointer-events-none",
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationFirst = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to first page"
    size="icon"
    className={cn("", className)}
    {...props}
  >
    <ChevronsLeft className="h-4 w-4" />
  </PaginationLink>
)
PaginationFirst.displayName = "PaginationFirst"

const PaginationLast = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to last page"
    size="icon"
    className={cn("", className)}
    {...props}
  >
    <ChevronsRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationLast.displayName = "PaginationLast"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

// ============================================================
// Enhanced Pagination Components
// ============================================================

interface RowsPerPageProps {
  value: number
  onChange: (value: number) => void
  options?: number[]
  className?: string
}

const RowsPerPage = ({
  value,
  onChange,
  options = [10, 20, 30, 50, 100],
  className,
}: RowsPerPageProps) => (
  <div className={cn("flex items-center gap-2", className)}>
    <span className="text-sm text-wex-pagination-item-fg">Rows per page</span>
    <Select value={String(value)} onValueChange={(v) => onChange(Number(v))}>
      <SelectTrigger className="h-8 w-[70px]" aria-label="Rows per page">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={String(option)}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)
RowsPerPage.displayName = "RowsPerPage"

interface PageReportProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  className?: string
  /** Format: "{first}" for first item, "{last}" for last item, "{total}" for total items, "{page}" for current page, "{pages}" for total pages */
  template?: string
}

const PageReport = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  className,
  template = "{first} - {last} of {total}",
}: PageReportProps) => {
  const first = (currentPage - 1) * pageSize + 1
  const last = Math.min(currentPage * pageSize, totalItems)
  
  const text = template
    .replace("{first}", String(first))
    .replace("{last}", String(last))
    .replace("{total}", String(totalItems))
    .replace("{page}", String(currentPage))
    .replace("{pages}", String(totalPages))

  return (
    <span className={cn("text-sm text-wex-pagination-item-fg", className)}>
      {text}
    </span>
  )
}
PageReport.displayName = "PageReport"

interface JumpToPageProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

const JumpToPage = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: JumpToPageProps) => {
  const [inputValue, setInputValue] = React.useState(String(currentPage))

  React.useEffect(() => {
    setInputValue(String(currentPage))
  }, [currentPage])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const page = parseInt(inputValue, 10)
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    } else {
      setInputValue(String(currentPage))
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex items-center gap-2", className)}>
      <span className="text-sm text-wex-pagination-item-fg">Go to page</span>
      <Input
        type="number"
        min={1}
        max={totalPages}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="h-8 w-16 text-center"
        inputSize="sm"
        aria-label="Page number"
      />
      <span className="text-sm text-wex-pagination-item-fg">of {totalPages}</span>
    </form>
  )
}
JumpToPage.displayName = "JumpToPage"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
  RowsPerPage,
  PageReport,
  JumpToPage,
}
