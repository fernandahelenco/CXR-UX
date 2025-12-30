import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexResizable } from "@/components/wex";

// Props documentation
const resizableGroupProps: PropDefinition[] = [
  { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Panel layout direction" },
  { name: "autoSaveId", type: "string", description: "ID for persisting layout to localStorage" },
  { name: "onLayout", type: "(sizes: number[]) => void", description: "Callback when layout changes" },
];

const resizablePanelProps: PropDefinition[] = [
  { name: "defaultSize", type: "number", description: "Initial size (percentage)" },
  { name: "minSize", type: "number", default: "10", description: "Minimum size (percentage)" },
  { name: "maxSize", type: "number", description: "Maximum size (percentage)" },
  { name: "collapsible", type: "boolean", default: "false", description: "Allow panel to collapse" },
  { name: "collapsedSize", type: "number", default: "0", description: "Size when collapsed" },
];

const resizableHandleProps: PropDefinition[] = [
  { name: "withHandle", type: "boolean", default: "true", description: "Show visible handle grip" },
  { name: "disabled", type: "boolean", default: "false", description: "Disable resizing" },
];

// Token mappings for WexResizable
const resizableTokens: TokenRow[] = [
  { element: "Handle", property: "Background", token: "--border" },
  { element: "Handle (hover)", property: "Background", token: "--ring" },
  { element: "Handle", property: "Width", token: "1px (vertical) / height (horizontal)" },
];

export default function ResizablePage() {
  return (
    <ComponentPage
      title="Resizable"
      description="Accessible resizable panel groups and layouts."
      status="stable"
      registryKey="resizable"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexResizable.Group orientation="horizontal" className="min-h-[200px] max-w-md rounded-lg border">
            <WexResizable.Panel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">One</span>
              </div>
            </WexResizable.Panel>
            <WexResizable.Handle aria-label="Resize panels" />
            <WexResizable.Panel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
            </WexResizable.Panel>
          </WexResizable.Group>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">WCAG 2.2 Level AA Compliant</h3>
            <p className="text-sm text-muted-foreground">
              This component meets WCAG 2.2 Level AA. New in 2.2: handles meet 
              WCAG 2.5.7 dragging movements requirement with keyboard alternatives.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Tab: Focus resize handle</li>
              <li>Arrow keys: Resize panels</li>
              <li>Home/End: Move to min/max size</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">ARIA Attributes</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><code className="bg-muted px-1 rounded">role="separator"</code>: On resize handle</li>
              <li><code className="bg-muted px-1 rounded">aria-orientation</code>: Indicates direction</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexResizable } from "@/components/wex";

<WexResizable.Group orientation="horizontal">
  <WexResizable.Panel>Panel 1</WexResizable.Panel>
  <WexResizable.Handle />
  <WexResizable.Panel>Panel 2</WexResizable.Panel>
</WexResizable.Group>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable 
          props={resizableGroupProps}
          subComponents={[
            { name: "WexResizable.Panel", props: resizablePanelProps },
            { name: "WexResizable.Handle", props: resizableHandleProps },
          ]}
        />
      </Section>

      <TokenReference tokens={resizableTokens} className="mt-12" />
    </ComponentPage>
  );
}
