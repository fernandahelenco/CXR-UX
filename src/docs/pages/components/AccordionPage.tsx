import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexAccordion } from "@/components/wex";

// Props documentation
const accordionRootProps: PropDefinition[] = [
  { name: "type", type: '"single" | "multiple"', default: '"single"', description: "Allow one or multiple items open" },
  { name: "collapsible", type: "boolean", default: "false", description: "Allow all items to be closed (single mode)" },
  { name: "defaultValue", type: "string | string[]", description: "Default open item(s)" },
  { name: "value", type: "string | string[]", description: "Controlled open item(s)" },
  { name: "onValueChange", type: "(value) => void", description: "Callback when open items change" },
];

const accordionItemProps: PropDefinition[] = [
  { name: "value", type: "string", required: true, description: "Unique value for this item" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables this item" },
];

// Token mappings for WexAccordion
// Layer 3 component tokens
const accordionTokens: TokenRow[] = [
  { element: "Item", property: "Border", token: "--wex-component-accordion-border" },
  { element: "Trigger", property: "Text", token: "--wex-component-accordion-trigger-fg" },
  { element: "Trigger (Hover)", property: "Background", token: "--wex-component-accordion-trigger-hover-bg" },
  { element: "Icon", property: "Color", token: "--wex-component-accordion-icon-fg" },
];

export default function AccordionPage() {
  return (
    <ComponentPage
      title="Accordion"
      description="A vertically stacked set of interactive headings that reveal or hide associated content."
      status="stable"
      registryKey="accordion"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexAccordion type="single" collapsible className="w-full max-w-md">
            <WexAccordion.Item value="item-1">
              <WexAccordion.Trigger>Is it accessible?</WexAccordion.Trigger>
              <WexAccordion.Content>
                Yes. It adheres to the WAI-ARIA design pattern.
              </WexAccordion.Content>
            </WexAccordion.Item>
            <WexAccordion.Item value="item-2">
              <WexAccordion.Trigger>Is it styled?</WexAccordion.Trigger>
              <WexAccordion.Content>
                Yes. It comes with default styles that match the WEX design system.
              </WexAccordion.Content>
            </WexAccordion.Item>
            <WexAccordion.Item value="item-3">
              <WexAccordion.Trigger>Is it animated?</WexAccordion.Trigger>
              <WexAccordion.Content>
                Yes. It uses CSS animations for smooth expand/collapse transitions.
              </WexAccordion.Content>
            </WexAccordion.Item>
          </WexAccordion>
        </ExampleCard>
      </Section>

      <Section title="Variants" description="Different accordion configurations.">
        <div className="space-y-4">
          <ExampleCard title="Single (Collapsible)" description="Only one item open at a time, can close all.">
            <WexAccordion type="single" collapsible className="w-full max-w-md">
              <WexAccordion.Item value="item-1">
                <WexAccordion.Trigger>First Item</WexAccordion.Trigger>
                <WexAccordion.Content>Content for first item.</WexAccordion.Content>
              </WexAccordion.Item>
              <WexAccordion.Item value="item-2">
                <WexAccordion.Trigger>Second Item</WexAccordion.Trigger>
                <WexAccordion.Content>Content for second item.</WexAccordion.Content>
              </WexAccordion.Item>
            </WexAccordion>
          </ExampleCard>

          <ExampleCard title="Multiple" description="Multiple items can be open simultaneously.">
            <WexAccordion type="multiple" className="w-full max-w-md">
              <WexAccordion.Item value="item-1">
                <WexAccordion.Trigger>First Item</WexAccordion.Trigger>
                <WexAccordion.Content>Content for first item.</WexAccordion.Content>
              </WexAccordion.Item>
              <WexAccordion.Item value="item-2">
                <WexAccordion.Trigger>Second Item</WexAccordion.Trigger>
                <WexAccordion.Content>Content for second item.</WexAccordion.Content>
              </WexAccordion.Item>
            </WexAccordion>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Space/Enter: Toggle the focused accordion item</li>
              <li>Arrow Down/Up: Move focus to adjacent items</li>
              <li>Home/End: Move focus to first/last item</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexAccordion } from "@/components/wex";

// Single collapsible
<WexAccordion type="single" collapsible>
  <WexAccordion.Item value="item-1">
    <WexAccordion.Trigger>Title</WexAccordion.Trigger>
    <WexAccordion.Content>Content</WexAccordion.Content>
  </WexAccordion.Item>
</WexAccordion>

// Multiple open
<WexAccordion type="multiple">
  <WexAccordion.Item value="item-1">...</WexAccordion.Item>
  <WexAccordion.Item value="item-2">...</WexAccordion.Item>
</WexAccordion>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable 
          props={accordionRootProps} 
          subComponents={[
            { name: "WexAccordion.Item", props: accordionItemProps },
            { name: "WexAccordion.Trigger", props: [{ name: "children", type: "ReactNode", required: true, description: "Trigger content" }] },
            { name: "WexAccordion.Content", props: [{ name: "children", type: "ReactNode", required: true, description: "Content shown when expanded" }] },
          ]}
        />
      </Section>

      <TokenReference tokens={accordionTokens} className="mt-12" />
    </ComponentPage>
  );
}
