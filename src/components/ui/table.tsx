import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ============================================================
// Table Context for variant propagation
// ============================================================
interface TableContextValue {
  striped?: boolean
  gridlines?: boolean
  size?: "sm" | "md" | "lg"
}

const TableContext = React.createContext<TableContextValue>({})

const useTableContext = () => React.useContext(TableContext)

// ============================================================
// Table variants
// ============================================================
const tableVariants = cva("w-full caption-bottom text-sm", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  /** Alternating row colors */
  striped?: boolean
  /** Show cell borders */
  gridlines?: boolean
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, striped, gridlines, size, ...props }, ref) => (
    <TableContext.Provider value={{ striped, gridlines, size: size ?? "md" }}>
      <div className="relative w-full overflow-auto" style={{ overflowY: 'scroll' }}>
        <table
          ref={ref}
          className={cn(
            tableVariants({ size }),
            gridlines && "border border-wex-table-border",
            className
          )}
          {...props}
        />
      </div>
    </TableContext.Provider>
  )
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const { striped } = useTableContext()
  return (
    <tbody
      ref={ref}
      className={cn(
        "[&_tr:last-child]:border-0",
        striped && "[&_tr:nth-child(odd)]:bg-wex-table-row-alt-bg",
        className
      )}
      {...props}
    />
  )
})
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-wex-table-border bg-wex-table-header-bg font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-wex-table-border transition-colors",
      "bg-wex-table-row-bg",
      "hover:bg-wex-table-row-hover-bg",
      "data-[state=selected]:bg-wex-table-selected-bg data-[state=selected]:text-wex-table-selected-fg",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const cellSizes = {
  sm: "h-8 px-1.5",
  md: "h-10 px-2",
  lg: "h-12 px-3",
}

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const { gridlines, size } = useTableContext()
  return (
    <th
      ref={ref}
      className={cn(
        "text-left align-middle font-medium",
        cellSizes[size || "md"],
        "bg-wex-table-header-bg text-wex-table-header-fg",
        gridlines && "border border-wex-table-border",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
})
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const { gridlines, size } = useTableContext()
  return (
    <td
      ref={ref}
      className={cn(
        "align-middle text-wex-table-cell-fg",
        size === "sm" ? "p-1.5" : size === "lg" ? "p-3" : "p-2",
        gridlines && "border border-wex-table-border",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
})
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
