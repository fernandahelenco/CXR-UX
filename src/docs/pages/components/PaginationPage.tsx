import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexPagination } from "@/components/wex";

// Token mappings for WexPagination
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
  return (
    <ComponentPage
      title="Pagination"
      description="Pagination with page navigation, next and previous links."
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

      <Section title="With Ellipsis">
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
            </WexPagination.Content>
          </WexPagination>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">WCAG 2.2 Level AA Compliant</h3>
            <p className="text-sm text-muted-foreground">
              This component meets WCAG 2.2 Level AA accessibility requirements.
            </p>
          </div>
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
      <WexPagination.Next href="#" />
    </WexPagination.Item>
  </WexPagination.Content>
</WexPagination>`}
        />
      </Section>

      <TokenReference tokens={paginationTokens} className="mt-12" />
    </ComponentPage>
  );
}
