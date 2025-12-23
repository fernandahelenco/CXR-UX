import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { WexBadge, WexButton, WexCheckbox } from "@/components/wex";

// Token mappings for Table
// Layer 3 component tokens
const tableTokens: TokenRow[] = [
  { element: "Header", property: "Background", token: "--wex-component-table-header-bg" },
  { element: "Header", property: "Text", token: "--wex-component-table-header-fg" },
  { element: "Row", property: "Background", token: "--wex-component-table-row-bg" },
  { element: "Row (Alt)", property: "Background", token: "--wex-component-table-row-alt-bg" },
  { element: "Row (Hover)", property: "Background", token: "--wex-component-table-row-hover-bg" },
  { element: "Row (Selected)", property: "Background", token: "--wex-component-table-selected-bg" },
  { element: "Cell", property: "Text", token: "--wex-component-table-cell-fg" },
  { element: "Border", property: "Color", token: "--wex-component-table-border" },
];

const invoices = [
  { invoice: "INV001", status: "Paid", amount: "$250.00", method: "Credit Card" },
  { invoice: "INV002", status: "Pending", amount: "$150.00", method: "PayPal" },
  { invoice: "INV003", status: "Unpaid", amount: "$350.00", method: "Bank Transfer" },
  { invoice: "INV004", status: "Paid", amount: "$450.00", method: "Credit Card" },
  { invoice: "INV005", status: "Pending", amount: "$200.00", method: "PayPal" },
];

export default function TablePage() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <ComponentPage
      title="Table"
      description="Tabular data display with striped, gridlines, and size variants."
      status="stable"
      registryKey="table"
    >
      <Section title="Overview">
        <ExampleCard>
          <Table>
            <TableCaption>A list of recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.slice(0, 4).map((inv) => (
                <TableRow key={inv.invoice}>
                  <TableCell className="font-medium">{inv.invoice}</TableCell>
                  <TableCell>{inv.status}</TableCell>
                  <TableCell>{inv.method}</TableCell>
                  <TableCell className="text-right">{inv.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$1,200.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </ExampleCard>
        <Guidance>
          Use tables for displaying structured data. Keep columns minimal and 
          consider responsive patterns for mobile.
        </Guidance>
      </Section>

      {/* ============================================================
          STRIPED ROWS
          ============================================================ */}
      <Section title="Striped Rows" description="Alternating row colors for better readability.">
        <ExampleCard title="Striped Table">
          <Table striped>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.invoice}>
                  <TableCell className="font-medium">{inv.invoice}</TableCell>
                  <TableCell>{inv.status}</TableCell>
                  <TableCell>{inv.method}</TableCell>
                  <TableCell className="text-right">{inv.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ExampleCard>
      </Section>

      {/* ============================================================
          GRIDLINES
          ============================================================ */}
      <Section title="Gridlines" description="Full grid borders for cell separation.">
        <ExampleCard title="Table with Gridlines">
          <Table gridlines>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.slice(0, 3).map((inv) => (
                <TableRow key={inv.invoice}>
                  <TableCell className="font-medium">{inv.invoice}</TableCell>
                  <TableCell>{inv.status}</TableCell>
                  <TableCell>{inv.method}</TableCell>
                  <TableCell className="text-right">{inv.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ExampleCard>

        <ExampleCard title="Striped with Gridlines">
          <Table striped gridlines>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.slice(0, 4).map((inv) => (
                <TableRow key={inv.invoice}>
                  <TableCell className="font-medium">{inv.invoice}</TableCell>
                  <TableCell>{inv.status}</TableCell>
                  <TableCell className="text-right">{inv.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ExampleCard>
      </Section>

      {/* ============================================================
          SIZES
          ============================================================ */}
      <Section title="Sizes" description="Compact and spacious table densities.">
        <ExampleCard title="Small">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.slice(0, 3).map((inv) => (
                <TableRow key={inv.invoice}>
                  <TableCell className="font-medium">{inv.invoice}</TableCell>
                  <TableCell>{inv.status}</TableCell>
                  <TableCell className="text-right">{inv.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ExampleCard>

        <ExampleCard title="Large">
          <Table size="lg">
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.slice(0, 3).map((inv) => (
                <TableRow key={inv.invoice}>
                  <TableCell className="font-medium">{inv.invoice}</TableCell>
                  <TableCell>{inv.status}</TableCell>
                  <TableCell className="text-right">{inv.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ExampleCard>
      </Section>

      {/* ============================================================
          WITH BADGES AND SELECTION
          ============================================================ */}
      <Section title="Advanced Examples" description="Tables with badges and selection.">
        <ExampleCard title="With Status Badges">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.invoice}>
                  <TableCell className="font-medium">{inv.invoice}</TableCell>
                  <TableCell>
                    <WexBadge intent={inv.status === "Paid" ? "success" : inv.status === "Pending" ? "warning" : "destructive"}>
                      {inv.status}
                    </WexBadge>
                  </TableCell>
                  <TableCell className="text-right">{inv.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ExampleCard>

        <ExampleCard title="Selectable Rows">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <WexCheckbox
                    aria-label="Select all"
                    checked={selected.size === invoices.length}
                    onCheckedChange={() => {
                      if (selected.size === invoices.length) setSelected(new Set());
                      else setSelected(new Set(invoices.map(i => i.invoice)));
                    }}
                  />
                </TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.invoice} className={selected.has(inv.invoice) ? "bg-muted/50" : ""}>
                  <TableCell>
                    <WexCheckbox
                      aria-label={`Select ${inv.invoice}`}
                      checked={selected.has(inv.invoice)}
                      onCheckedChange={() => toggleRow(inv.invoice)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{inv.invoice}</TableCell>
                  <TableCell>{inv.status}</TableCell>
                  <TableCell className="text-right">
                    <WexButton intent="ghost" size="sm">View</WexButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Semantic Structure</h3>
          <p className="text-sm text-muted-foreground">
            Uses proper HTML table elements (table, thead, tbody, tr, th, td)
            for screen reader compatibility. Use TableCaption for descriptions.
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { 
  Table, TableHeader, TableBody, TableRow, 
  TableHead, TableCell, TableFooter, TableCaption 
} from "@/components/ui/table";

// Basic table
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Value</TableCell>
    </TableRow>
  </TableBody>
</Table>

// Striped rows
<Table striped>...</Table>

// With gridlines
<Table gridlines>...</Table>

// Sizes
<Table size="sm">...</Table>
<Table size="md">...</Table>  {/* default */}
<Table size="lg">...</Table>

// Combined
<Table striped gridlines size="sm">...</Table>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Table Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">striped</code>: boolean - Alternating row colors</li>
            <li><code className="bg-muted px-1 rounded">gridlines</code>: boolean - Full cell borders</li>
            <li><code className="bg-muted px-1 rounded">size</code>: "sm" | "md" | "lg"</li>
          </ul>
        </div>
      </Section>

      <TokenReference tokens={tableTokens} className="mt-12" />
    </ComponentPage>
  );
}
