import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexPagination } from "@/components/wex";

// Props documentation
const paginationProps: PropDefinition[] = [
  { name: "currentPage", type: "number", required: true, description: "Current active page" },
  { name: "totalPages", type: "number", required: true, description: "Total number of pages" },
  { name: "onPageChange", type: "(page: number) => void", description: "Callback when page changes" },
  { name: "siblingCount", type: "number", default: "1", description: "Number of siblings on each side" },
];

// Token mappings for Pagination
// Layer 3 component tokens
const paginationTokens: TokenRow[] = [
  { element: "Item", property: "Background", token: "--wex-component-pagination-item-bg" },
  { element: "Item", property: "Text", token: "--wex-component-pagination-item-fg" },
  { element: "Item (Hover)", property: "Background", token: "--wex-component-pagination-item-hover-bg" },
  { element: "Item (Active)", property: "Background", token: "--wex-component-pagination-active-bg" },
  { element: "Item (Active)", property: "Text", token: "--wex-component-pagination-active-fg" },
  { element: "Disabled", property: "Opacity", token: "--wex-component-pagination-disabled-opacity" },
];

export default function PaginationPage() {
  const [currentPage, setCurrentPage] = React.useState(5);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const totalItems = 250;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  return (
    <ComponentPage
      title="Pagination"
      description="Complete pagination with rows per page, page report, jump to page, and first/last navigation."
      status="stable"
      registryKey="pagination"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexPagination>
            <WexPagination.Content>
              <WexPagination.Item>
                <WexPagination.Previous href="#" />
              </WexPagination.Item>
              <WexPagination.Item>
                <WexPagination.Link href="#">1</WexPagination.Link>
              </WexPagination.Item>
              <WexPagination.Item>
                <WexPagination.Link href="#" isActive>2</WexPagination.Link>
              </WexPagination.Item>
              <WexPagination.Item>
                <WexPagination.Link href="#">3</WexPagination.Link>
              </WexPagination.Item>
              <WexPagination.Item>
                <WexPagination.Next href="#" />
              </WexPagination.Item>
            </WexPagination.Content>
          </WexPagination>
        </ExampleCard>
      </Section>

      {/* ============================================================
          FIRST & LAST
          ============================================================ */}
      <Section title="First & Last Buttons" description="Navigate to first or last page.">
        <ExampleCard>
          <WexPagination>
            <WexPagination.Content>
              <WexPagination.Item>
                <WexPagination.First href="#" />
              </WexPagination.Item>
              <WexPagination.Item>
                <WexPagination.Previous href="#" />
              </WexPagination.Item>
              <WexPagination.Item>
                <WexPagination.Link href="#">1</WexPagination.Link>
              </WexPagination.Item>
              <WexPagination.Item>
                <WexPagination.Ellipsis />
              </WexPagination.Item>
              <WexPagination.Item>
                <WexPagination.Link href="#" isActive>5</WexPagination.Link>
              </WexPagination.Item>
              <WexPagination.Item>
                <WexPagination.Ellipsis />
              </WexPagination.Item>
              <WexPagination.Item>
                <WexPagination.Link href="#">10</WexPagination.Link>
              </WexPagination.Item>
              <WexPagination.Item>
                <WexPagination.Next href="#" />
              </WexPagination.Item>
              <WexPagination.Item>
                <WexPagination.Last href="#" />
              </WexPagination.Item>
            </WexPagination.Content>
          </WexPagination>
        </ExampleCard>
      </Section>

      {/* ============================================================
          ROWS PER PAGE
          ============================================================ */}
      <Section title="Rows Per Page" description="Let users control page size.">
        <ExampleCard>
          <div className="flex items-center gap-4">
            <WexPagination.RowsPerPage
              value={rowsPerPage}
              onChange={setRowsPerPage}
              options={[10, 25, 50, 100]}
            />
            <span className="text-sm text-muted-foreground">
              Current: {rowsPerPage} rows per page
            </span>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          PAGE REPORT
          ============================================================ */}
      <Section title="Page Report" description="Show current range and total.">
        <ExampleCard>
          <div className="space-y-4">
            <WexPagination.PageReport
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={rowsPerPage}
            />
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="px-3 py-1 text-sm border rounded hover:bg-accent"
              >
                Prev
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="px-3 py-1 text-sm border rounded hover:bg-accent"
              >
                Next
              </button>
            </div>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          JUMP TO PAGE
          ============================================================ */}
      <Section title="Jump To Page" description="Direct page number input.">
        <ExampleCard>
          <div className="flex items-center gap-4">
            <WexPagination.JumpToPage
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          COMPLETE EXAMPLE
          ============================================================ */}
      <Section title="Complete Example" description="All pagination features combined.">
        <ExampleCard>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <WexPagination.RowsPerPage
                value={rowsPerPage}
                onChange={setRowsPerPage}
                options={[10, 25, 50]}
              />
              <WexPagination.PageReport
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={rowsPerPage}
              />
            </div>
            
            <WexPagination>
              <WexPagination.Content>
                <WexPagination.Item>
                  <WexPagination.First 
                    href="#" 
                    onClick={() => setCurrentPage(1)}
                  />
                </WexPagination.Item>
                <WexPagination.Item>
                  <WexPagination.Previous 
                    href="#" 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  />
                </WexPagination.Item>
                <WexPagination.Item>
                  <WexPagination.Link 
                    href="#" 
                    isActive={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </WexPagination.Link>
                </WexPagination.Item>
                {currentPage > 3 && (
                  <WexPagination.Item>
                    <WexPagination.Ellipsis />
                  </WexPagination.Item>
                )}
                {currentPage > 2 && currentPage < totalPages && (
                  <WexPagination.Item>
                    <WexPagination.Link 
                      href="#" 
                      isActive
                    >
                      {currentPage}
                    </WexPagination.Link>
                  </WexPagination.Item>
                )}
                {currentPage < totalPages - 2 && (
                  <WexPagination.Item>
                    <WexPagination.Ellipsis />
                  </WexPagination.Item>
                )}
                <WexPagination.Item>
                  <WexPagination.Link 
                    href="#" 
                    isActive={currentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </WexPagination.Link>
                </WexPagination.Item>
                <WexPagination.Item>
                  <WexPagination.Next 
                    href="#" 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  />
                </WexPagination.Item>
                <WexPagination.Item>
                  <WexPagination.Last 
                    href="#" 
                    onClick={() => setCurrentPage(totalPages)}
                  />
                </WexPagination.Item>
              </WexPagination.Content>
            </WexPagination>

            <div className="flex justify-end">
              <WexPagination.JumpToPage
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </ExampleCard>
        <Guidance>
          Combine RowsPerPage, PageReport, and JumpToPage with the base 
          Pagination component for a complete data table pagination experience.
        </Guidance>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">ARIA Requirements</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><code className="bg-muted px-1 rounded">nav role="navigation"</code>: Wraps pagination</li>
              <li><code className="bg-muted px-1 rounded">aria-label="Pagination"</code>: Describes the component</li>
              <li><code className="bg-muted px-1 rounded">aria-current="page"</code>: Marks the active page</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Tab: Navigate between page links</li>
              <li>Enter: Activate link</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexPagination } from "@/components/wex";

// Basic pagination
<WexPagination>
  <WexPagination.Content>
    <WexPagination.Item>
      <WexPagination.Previous href="#" />
    </WexPagination.Item>
    <WexPagination.Item>
      <WexPagination.Link href="#" isActive>1</WexPagination.Link>
    </WexPagination.Item>
    <WexPagination.Item>
      <WexPagination.Next href="#" />
    </WexPagination.Item>
  </WexPagination.Content>
</WexPagination>

// First & Last buttons
<WexPagination.First href="#" />
<WexPagination.Last href="#" />

// Rows per page
<WexPagination.RowsPerPage
  value={rowsPerPage}
  onChange={setRowsPerPage}
  options={[10, 25, 50, 100]}
/>

// Page report
<WexPagination.PageReport
  currentPage={5}
  totalPages={25}
  totalItems={250}
  pageSize={10}
/>

// Jump to page
<WexPagination.JumpToPage
  currentPage={5}
  totalPages={25}
  onPageChange={setCurrentPage}
/>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>New Components:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">PaginationFirst</code>: Jump to first page</li>
            <li><code className="bg-muted px-1 rounded">PaginationLast</code>: Jump to last page</li>
            <li><code className="bg-muted px-1 rounded">RowsPerPage</code>: Page size selector</li>
            <li><code className="bg-muted px-1 rounded">PageReport</code>: Shows "X-Y of Z items"</li>
            <li><code className="bg-muted px-1 rounded">JumpToPage</code>: Direct page input</li>
          </ul>
        </div>
      </Section>

      <Section title="API Reference">
        <PropsTable props={paginationProps} />
      </Section>

      <TokenReference tokens={paginationTokens} className="mt-12" />
    </ComponentPage>
  );
}
