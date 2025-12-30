import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import {
  WexDataTable,
  WexDataTableColumnHeader,
  WexDataTableRowActions,
  WexBadge,
} from "@/components/wex";
import type { ColumnDef } from "@tanstack/react-table";

// Props documentation
const dataTableProps: PropDefinition[] = [
  { name: "columns", type: "ColumnDef<TData>[]", required: true, description: "Column definitions" },
  { name: "data", type: "TData[]", required: true, description: "Table data array" },
  { name: "searchKey", type: "string", description: "Key for global search filtering" },
  { name: "searchPlaceholder", type: "string", default: '"Search..."', description: "Search input placeholder" },
  { name: "pagination", type: "boolean", default: "true", description: "Show pagination controls" },
  { name: "pageSize", type: "number", default: "10", description: "Rows per page" },
  { name: "selectable", type: "boolean", default: "false", description: "Enable row selection" },
  { name: "onRowClick", type: "(row: TData) => void", description: "Row click handler" },
];

// Token mappings for WexDataTable
const dataTableTokens: TokenRow[] = [
  { element: "Table", property: "Border", token: "--border" },
  { element: "Header", property: "Background", token: "--muted (50% opacity)" },
  { element: "Header", property: "Text", token: "--muted-foreground" },
  { element: "Row (hover)", property: "Background", token: "--muted (50% opacity)" },
  { element: "Row (selected)", property: "Background", token: "--muted" },
  { element: "Cell", property: "Text", token: "--foreground" },
  { element: "Pagination", property: "Text", token: "--muted-foreground" },
];

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const payments: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
];

const statusMap: Record<Payment["status"], "default" | "secondary" | "destructive"> = {
  pending: "secondary",
  processing: "default",
  success: "default",
  failed: "destructive",
};

export default function DataTablePage() {
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "status",
      header: ({ column }) => (
        <WexDataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as Payment["status"];
        return (
          <WexBadge intent={statusMap[status]}>
            {status}
          </WexBadge>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <WexDataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <WexDataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <WexDataTableRowActions
            row={row}
            actions={[
              {
                label: "Copy payment ID",
                onClick: () => navigator.clipboard.writeText(payment.id),
              },
              {
                label: "View details",
                onClick: () => console.log("View", payment.id),
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <ComponentPage
      title="Data Table"
      description="Advanced table component with sorting, filtering, pagination, and column visibility controls."
      status="stable"
      registryKey="data-table"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexDataTable
            columns={columns}
            data={payments}
            searchKey="email"
            searchPlaceholder="Search emails..."
          />
        </ExampleCard>
        <Guidance>
          Data Table provides advanced table functionality including sorting, filtering,
          pagination, and column visibility. Built on @tanstack/react-table for
          powerful data manipulation.
        </Guidance>
      </Section>

      <Section title="Features" description="Built-in table capabilities.">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Sorting</h3>
            <p className="text-sm text-muted-foreground">
              Click column headers to sort ascending/descending. Use WexDataTableColumnHeader
              for sortable columns.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Filtering</h3>
            <p className="text-sm text-muted-foreground">
              Provide a searchKey prop to enable search filtering. The search input
              filters the specified column.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Pagination</h3>
            <p className="text-sm text-muted-foreground">
              Automatic pagination with configurable page sizes. Navigate between pages
              with Previous/Next buttons.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Column Visibility</h3>
            <p className="text-sm text-muted-foreground">
              Use WexDataTableViewOptions to toggle column visibility. Users can show/hide
              columns as needed.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Keyboard Navigation</h3>
          <p className="text-sm text-muted-foreground">
            Data Table supports full keyboard navigation. Use Tab to navigate between
            interactive elements, Enter/Space to activate, and arrow keys for sorting.
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexDataTable, WexDataTableColumnHeader } from "@/components/wex";
import type { ColumnDef } from "@tanstack/react-table";

type Payment = {
  id: string;
  amount: number;
  status: string;
  email: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <WexDataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <WexDataTableColumnHeader column={column} title="Amount" />
    ),
  },
];

<WexDataTable
  columns={columns}
  data={payments}
  searchKey="email"
  searchPlaceholder="Search emails..."
/>`}
          language="tsx"
        />
      </Section>

      <Section title="API Reference">
        <PropsTable 
          props={dataTableProps}
          subComponents={[
            { name: "WexDataTableColumnHeader", props: [{ name: "column", type: "Column<TData>", required: true, description: "Column instance" }, { name: "title", type: "string", required: true, description: "Header title" }] },
            { name: "WexDataTableRowActions", props: [{ name: "row", type: "Row<TData>", required: true, description: "Row instance" }] },
          ]}
        />
      </Section>

      <TokenReference tokens={dataTableTokens} className="mt-12" />
    </ComponentPage>
  );
}

