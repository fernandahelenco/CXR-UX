import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
  RowsPerPage,
  PageReport,
  JumpToPage,
} from "@/components/ui/pagination";

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
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </ExampleCard>
      </Section>

      {/* ============================================================
          FIRST & LAST
          ============================================================ */}
      <Section title="First & Last Buttons" description="Navigate to first or last page.">
        <ExampleCard>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationFirst href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </ExampleCard>
      </Section>

      {/* ============================================================
          ROWS PER PAGE
          ============================================================ */}
      <Section title="Rows Per Page" description="Let users control page size.">
        <ExampleCard>
          <div className="flex items-center gap-4">
            <RowsPerPage
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
            <PageReport
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
            <JumpToPage
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
              <RowsPerPage
                value={rowsPerPage}
                onChange={setRowsPerPage}
                options={[10, 25, 50]}
              />
              <PageReport
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={rowsPerPage}
              />
            </div>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationFirst 
                    href="#" 
                    onClick={() => setCurrentPage(1)}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink 
                    href="#" 
                    isActive={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {currentPage > 2 && currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationLink 
                      href="#" 
                      isActive
                    >
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink 
                    href="#" 
                    isActive={currentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLast 
                    href="#" 
                    onClick={() => setCurrentPage(totalPages)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <div className="flex justify-end">
              <JumpToPage
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
          code={`import { 
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationPrevious, PaginationNext,
  PaginationFirst, PaginationLast, PaginationEllipsis,
  RowsPerPage, PageReport, JumpToPage
} from "@/components/ui/pagination";

// Basic pagination
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>

// First & Last buttons
<PaginationFirst href="#" />
<PaginationLast href="#" />

// Rows per page
<RowsPerPage
  value={rowsPerPage}
  onChange={setRowsPerPage}
  options={[10, 25, 50, 100]}
/>

// Page report
<PageReport
  currentPage={5}
  totalPages={25}
  totalItems={250}
  pageSize={10}
/>

// Jump to page
<JumpToPage
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

      <TokenReference tokens={paginationTokens} className="mt-12" />
    </ComponentPage>
  );
}
