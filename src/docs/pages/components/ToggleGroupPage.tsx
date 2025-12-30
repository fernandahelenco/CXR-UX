import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexToggleGroup } from "@/components/wex";

// Props documentation
const toggleGroupRootProps: PropDefinition[] = [
  { name: "type", type: '"single" | "multiple"', required: true, description: "Single or multiple selection" },
  { name: "value", type: "string | string[]", description: "Controlled selected value(s)" },
  { name: "defaultValue", type: "string | string[]", description: "Default selected value(s)" },
  { name: "onValueChange", type: "(value) => void", description: "Callback when selection changes" },
  { name: "variant", type: '"default" | "outline"', default: '"default"', description: "Visual variant" },
  { name: "size", type: '"default" | "sm" | "lg"', default: '"default"', description: "Size of items" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables all items" },
];

const toggleGroupItemProps: PropDefinition[] = [
  { name: "value", type: "string", required: true, description: "Item value" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables this item" },
];

// Token mappings for WexToggleGroup
// Layer 3 component tokens (uses toggle tokens)
const toggleGroupTokens: TokenRow[] = [
  { element: "Item", property: "Background", token: "--wex-component-toggle-bg" },
  { element: "Item", property: "Text", token: "--wex-component-toggle-fg" },
  { element: "Item (Hover)", property: "Background", token: "--wex-component-toggle-hover-bg" },
  { element: "Item (Active)", property: "Background", token: "--wex-component-toggle-pressed-bg" },
  { element: "Item (Active)", property: "Text", token: "--wex-component-toggle-pressed-fg" },
];

export default function ToggleGroupPage() {
  return (
    <ComponentPage
      title="Toggle Group"
      description="A set of two-state buttons that can be toggled on or off."
      status="stable"
      registryKey="toggle-group"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexToggleGroup type="single" defaultValue="center">
            <WexToggleGroup.Item value="left" aria-label="Align left">
              L
            </WexToggleGroup.Item>
            <WexToggleGroup.Item value="center" aria-label="Align center">
              C
            </WexToggleGroup.Item>
            <WexToggleGroup.Item value="right" aria-label="Align right">
              R
            </WexToggleGroup.Item>
          </WexToggleGroup>
        </ExampleCard>
      </Section>

      <Section title="Types" description="Toggle groups support single and multiple selection.">
        <div className="space-y-4">
          <ExampleCard title="Single" description="Only one item can be selected.">
            <WexToggleGroup type="single">
              <WexToggleGroup.Item value="a">A</WexToggleGroup.Item>
              <WexToggleGroup.Item value="b">B</WexToggleGroup.Item>
              <WexToggleGroup.Item value="c">C</WexToggleGroup.Item>
            </WexToggleGroup>
          </ExampleCard>

          <ExampleCard title="Multiple" description="Multiple items can be selected.">
            <WexToggleGroup type="multiple">
              <WexToggleGroup.Item value="a">A</WexToggleGroup.Item>
              <WexToggleGroup.Item value="b">B</WexToggleGroup.Item>
              <WexToggleGroup.Item value="c">C</WexToggleGroup.Item>
            </WexToggleGroup>
          </ExampleCard>
        </div>
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
              <li><code className="bg-muted px-1 rounded">aria-label</code>: Required for icon-only toggle items</li>
              <li><code className="bg-muted px-1 rounded">role="group"</code>: Automatically applied</li>
              <li><code className="bg-muted px-1 rounded">aria-pressed</code>: Managed by Radix UI</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Tab: Focus the toggle group</li>
              <li>Arrow keys: Navigate between items</li>
              <li>Space or Enter: Toggle item state</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexToggleGroup } from "@/components/wex";

// Single selection
<WexToggleGroup type="single">
  <WexToggleGroup.Item value="a">A</WexToggleGroup.Item>
  <WexToggleGroup.Item value="b">B</WexToggleGroup.Item>
</WexToggleGroup>

// Multiple selection
<WexToggleGroup type="multiple">
  <WexToggleGroup.Item value="a">A</WexToggleGroup.Item>
  <WexToggleGroup.Item value="b">B</WexToggleGroup.Item>
</WexToggleGroup>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable 
          props={toggleGroupRootProps}
          subComponents={[
            { name: "WexToggleGroup.Item", props: toggleGroupItemProps },
          ]}
        />
      </Section>

      <TokenReference tokens={toggleGroupTokens} className="mt-12" />
    </ComponentPage>
  );
}

