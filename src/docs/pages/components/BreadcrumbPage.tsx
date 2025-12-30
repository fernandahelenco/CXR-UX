import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexBreadcrumb } from "@/components/wex";

// Props documentation
const breadcrumbLinkProps: PropDefinition[] = [
  { name: "href", type: "string", description: "URL for the link" },
  { name: "asChild", type: "boolean", default: "false", description: "Render as child element" },
  { name: "children", type: "ReactNode", required: true, description: "Link text" },
];

// Token mappings for WexBreadcrumb
// Layer 3 component tokens
const breadcrumbTokens: TokenRow[] = [
  { element: "Link", property: "Text", token: "--wex-component-breadcrumb-link-fg" },
  { element: "Link (Hover)", property: "Text", token: "--wex-component-breadcrumb-link-hover-fg" },
  { element: "Current Page", property: "Text", token: "--wex-component-breadcrumb-current-fg" },
  { element: "Separator", property: "Color", token: "--wex-component-breadcrumb-separator-fg" },
];

export default function BreadcrumbDocPage() {
  return (
    <ComponentPage
      title="Breadcrumb"
      description="Displays the path to the current resource using a hierarchy of links."
      status="stable"
      registryKey="breadcrumb"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexBreadcrumb>
            <WexBreadcrumb.List>
              <WexBreadcrumb.Item>
                <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
              </WexBreadcrumb.Item>
              <WexBreadcrumb.Separator />
              <WexBreadcrumb.Item>
                <WexBreadcrumb.Link href="/components">Components</WexBreadcrumb.Link>
              </WexBreadcrumb.Item>
              <WexBreadcrumb.Separator />
              <WexBreadcrumb.Item>
                <WexBreadcrumb.Page>Breadcrumb</WexBreadcrumb.Page>
              </WexBreadcrumb.Item>
            </WexBreadcrumb.List>
          </WexBreadcrumb>
        </ExampleCard>
      </Section>

      <Section title="With Ellipsis">
        <ExampleCard>
          <WexBreadcrumb>
            <WexBreadcrumb.List>
              <WexBreadcrumb.Item>
                <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
              </WexBreadcrumb.Item>
              <WexBreadcrumb.Separator />
              <WexBreadcrumb.Item>
                <WexBreadcrumb.Ellipsis />
              </WexBreadcrumb.Item>
              <WexBreadcrumb.Separator />
              <WexBreadcrumb.Item>
                <WexBreadcrumb.Link href="/components">Components</WexBreadcrumb.Link>
              </WexBreadcrumb.Item>
              <WexBreadcrumb.Separator />
              <WexBreadcrumb.Item>
                <WexBreadcrumb.Page>Breadcrumb</WexBreadcrumb.Page>
              </WexBreadcrumb.Item>
            </WexBreadcrumb.List>
          </WexBreadcrumb>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Navigation Landmark</h3>
          <p className="text-sm text-muted-foreground">
            Breadcrumb uses a nav element with aria-label for screen readers.
            The current page is marked with aria-current="page".
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexBreadcrumb } from "@/components/wex";

<WexBreadcrumb>
  <WexBreadcrumb.List>
    <WexBreadcrumb.Item>
      <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
    </WexBreadcrumb.Item>
    <WexBreadcrumb.Separator />
    <WexBreadcrumb.Item>
      <WexBreadcrumb.Page>Current Page</WexBreadcrumb.Page>
    </WexBreadcrumb.Item>
  </WexBreadcrumb.List>
</WexBreadcrumb>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={breadcrumbLinkProps} title="WexBreadcrumb.Link" />
      </Section>

      <TokenReference tokens={breadcrumbTokens} className="mt-12" />
    </ComponentPage>
  );
}
