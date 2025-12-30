import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexTable, WexBadge, WexButton, WexCheckbox } from "@/components/wex";

// Props documentation
const tableProps: PropDefinition[] = [
  { name: "className", type: "string", description: "Additional CSS classes for the table" },
  { name: "children", type: "ReactNode", required: true, description: "Table content (Header, Body, Footer)" },
];

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
          <WexTable>
            <WexTable.Caption>A list of recent invoices.</WexTable.Caption>
            <WexTable.Header>
              <WexTable.Row>
                <WexTable.Head className="w-[100px]">Invoice</WexTable.Head>
                <WexTable.Head>Status</WexTable.Head>
                <WexTable.Head>Method</WexTable.Head>
                <WexTable.Head className="text-right">Amount</WexTable.Head>
              </WexTable.Row>
            </WexTable.Header>
            <WexTable.Body>
              {invoices.slice(0, 4).map((inv) => (
                <WexTable.Row key={inv.invoice}>
                  <WexTable.Cell className="font-medium">{inv.invoice}</WexTable.Cell>
                  <WexTable.Cell>{inv.status}</WexTable.Cell>
                  <WexTable.Cell>{inv.method}</WexTable.Cell>
                  <WexTable.Cell className="text-right">{inv.amount}</WexTable.Cell>
                </WexTable.Row>
              ))}
            </WexTable.Body>
            <WexTable.Footer>
              <WexTable.Row>
                <WexTable.Cell colSpan={3}>Total</WexTable.Cell>
                <WexTable.Cell className="text-right">$1,200.00</WexTable.Cell>
              </WexTable.Row>
            </WexTable.Footer>
          </WexTable>
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
          <WexTable striped>
            <WexTable.Header>
              <WexTable.Row>
                <WexTable.Head>Invoice</WexTable.Head>
                <WexTable.Head>Status</WexTable.Head>
                <WexTable.Head>Method</WexTable.Head>
                <WexTable.Head className="text-right">Amount</WexTable.Head>
              </WexTable.Row>
            </WexTable.Header>
            <WexTable.Body>
              {invoices.map((inv) => (
                <WexTable.Row key={inv.invoice}>
                  <WexTable.Cell className="font-medium">{inv.invoice}</WexTable.Cell>
                  <WexTable.Cell>{inv.status}</WexTable.Cell>
                  <WexTable.Cell>{inv.method}</WexTable.Cell>
                  <WexTable.Cell className="text-right">{inv.amount}</WexTable.Cell>
                </WexTable.Row>
              ))}
            </WexTable.Body>
          </WexTable>
        </ExampleCard>
      </Section>

      {/* ============================================================
          GRIDLINES
          ============================================================ */}
      <Section title="Gridlines" description="Full grid borders for cell separation.">
        <ExampleCard title="Table with Gridlines">
          <WexTable gridlines>
            <WexTable.Header>
              <WexTable.Row>
                <WexTable.Head>Invoice</WexTable.Head>
                <WexTable.Head>Status</WexTable.Head>
                <WexTable.Head>Method</WexTable.Head>
                <WexTable.Head className="text-right">Amount</WexTable.Head>
              </WexTable.Row>
            </WexTable.Header>
            <WexTable.Body>
              {invoices.slice(0, 3).map((inv) => (
                <WexTable.Row key={inv.invoice}>
                  <WexTable.Cell className="font-medium">{inv.invoice}</WexTable.Cell>
                  <WexTable.Cell>{inv.status}</WexTable.Cell>
                  <WexTable.Cell>{inv.method}</WexTable.Cell>
                  <WexTable.Cell className="text-right">{inv.amount}</WexTable.Cell>
                </WexTable.Row>
              ))}
            </WexTable.Body>
          </WexTable>
        </ExampleCard>

        <ExampleCard title="Striped with Gridlines">
          <WexTable striped gridlines>
            <WexTable.Header>
              <WexTable.Row>
                <WexTable.Head>Invoice</WexTable.Head>
                <WexTable.Head>Status</WexTable.Head>
                <WexTable.Head>Amount</WexTable.Head>
              </WexTable.Row>
            </WexTable.Header>
            <WexTable.Body>
              {invoices.slice(0, 4).map((inv) => (
                <WexTable.Row key={inv.invoice}>
                  <WexTable.Cell className="font-medium">{inv.invoice}</WexTable.Cell>
                  <WexTable.Cell>{inv.status}</WexTable.Cell>
                  <WexTable.Cell className="text-right">{inv.amount}</WexTable.Cell>
                </WexTable.Row>
              ))}
            </WexTable.Body>
          </WexTable>
        </ExampleCard>
      </Section>

      {/* ============================================================
          SIZES
          ============================================================ */}
      <Section title="Sizes" description="Compact and spacious table densities.">
        <ExampleCard title="Small">
          <WexTable size="sm">
            <WexTable.Header>
              <WexTable.Row>
                <WexTable.Head>Invoice</WexTable.Head>
                <WexTable.Head>Status</WexTable.Head>
                <WexTable.Head className="text-right">Amount</WexTable.Head>
              </WexTable.Row>
            </WexTable.Header>
            <WexTable.Body>
              {invoices.slice(0, 3).map((inv) => (
                <WexTable.Row key={inv.invoice}>
                  <WexTable.Cell className="font-medium">{inv.invoice}</WexTable.Cell>
                  <WexTable.Cell>{inv.status}</WexTable.Cell>
                  <WexTable.Cell className="text-right">{inv.amount}</WexTable.Cell>
                </WexTable.Row>
              ))}
            </WexTable.Body>
          </WexTable>
        </ExampleCard>

        <ExampleCard title="Large">
          <WexTable size="lg">
            <WexTable.Header>
              <WexTable.Row>
                <WexTable.Head>Invoice</WexTable.Head>
                <WexTable.Head>Status</WexTable.Head>
                <WexTable.Head className="text-right">Amount</WexTable.Head>
              </WexTable.Row>
            </WexTable.Header>
            <WexTable.Body>
              {invoices.slice(0, 3).map((inv) => (
                <WexTable.Row key={inv.invoice}>
                  <WexTable.Cell className="font-medium">{inv.invoice}</WexTable.Cell>
                  <WexTable.Cell>{inv.status}</WexTable.Cell>
                  <WexTable.Cell className="text-right">{inv.amount}</WexTable.Cell>
                </WexTable.Row>
              ))}
            </WexTable.Body>
          </WexTable>
        </ExampleCard>
      </Section>

      {/* ============================================================
          WITH BADGES AND SELECTION
          ============================================================ */}
      <Section title="Advanced Examples" description="Tables with badges and selection.">
        <ExampleCard title="With Status Badges">
          <WexTable>
            <WexTable.Header>
              <WexTable.Row>
                <WexTable.Head>Invoice</WexTable.Head>
                <WexTable.Head>Status</WexTable.Head>
                <WexTable.Head className="text-right">Amount</WexTable.Head>
              </WexTable.Row>
            </WexTable.Header>
            <WexTable.Body>
              {invoices.map((inv) => (
                <WexTable.Row key={inv.invoice}>
                  <WexTable.Cell className="font-medium">{inv.invoice}</WexTable.Cell>
                  <WexTable.Cell>
                    <WexBadge intent={inv.status === "Paid" ? "success" : inv.status === "Pending" ? "warning" : "destructive"}>
                      {inv.status}
                    </WexBadge>
                  </WexTable.Cell>
                  <WexTable.Cell className="text-right">{inv.amount}</WexTable.Cell>
                </WexTable.Row>
              ))}
            </WexTable.Body>
          </WexTable>
        </ExampleCard>

        <ExampleCard title="Selectable Rows">
          <WexTable>
            <WexTable.Header>
              <WexTable.Row>
                <WexTable.Head className="w-[50px]">
                  <WexCheckbox
                    aria-label="Select all"
                    checked={selected.size === invoices.length}
                    onCheckedChange={() => {
                      if (selected.size === invoices.length) setSelected(new Set());
                      else setSelected(new Set(invoices.map(i => i.invoice)));
                    }}
                  />
                </WexTable.Head>
                <WexTable.Head>Invoice</WexTable.Head>
                <WexTable.Head>Status</WexTable.Head>
                <WexTable.Head className="text-right">Actions</WexTable.Head>
              </WexTable.Row>
            </WexTable.Header>
            <WexTable.Body>
              {invoices.map((inv) => (
                <WexTable.Row key={inv.invoice} className={selected.has(inv.invoice) ? "bg-muted/50" : ""}>
                  <WexTable.Cell>
                    <WexCheckbox
                      aria-label={`Select ${inv.invoice}`}
                      checked={selected.has(inv.invoice)}
                      onCheckedChange={() => toggleRow(inv.invoice)}
                    />
                  </WexTable.Cell>
                  <WexTable.Cell className="font-medium">{inv.invoice}</WexTable.Cell>
                  <WexTable.Cell>{inv.status}</WexTable.Cell>
                  <WexTable.Cell className="text-right">
                    <WexButton intent="ghost" size="sm">View</WexButton>
                  </WexTable.Cell>
                </WexTable.Row>
              ))}
            </WexTable.Body>
          </WexTable>
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
          code={`import { WexTable } from "@/components/wex";

// Basic table
<WexTable>
  <WexTable.Header>
    <WexTable.Row>
      <WexTable.Head>Column</WexTable.Head>
    </WexTable.Row>
  </WexTable.Header>
  <WexTable.Body>
    <WexTable.Row>
      <WexTable.Cell>Value</WexTable.Cell>
    </WexTable.Row>
  </WexTable.Body>
</WexTable>

// Striped rows
<WexTable striped>...</WexTable>

// With gridlines
<WexTable gridlines>...</WexTable>

// Sizes
<WexTable size="sm">...</WexTable>
<WexTable size="md">...</WexTable>  {/* default */}
<WexTable size="lg">...</WexTable>

// Combined
<WexTable striped gridlines size="sm">...</WexTable>`}
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

      <Section title="API Reference">
        <PropsTable props={tableProps} title="WexTable" />
      </Section>

      <TokenReference tokens={tableTokens} className="mt-12" />
    </ComponentPage>
  );
}
