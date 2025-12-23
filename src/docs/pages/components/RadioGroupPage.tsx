import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexRadioGroup, WexLabel } from "@/components/wex";

// Token mappings for WexRadioGroup
// Layer 3 component tokens
const radioGroupTokens: TokenRow[] = [
  { element: "Radio", property: "Background", token: "--wex-component-radio-bg" },
  { element: "Radio", property: "Border", token: "--wex-component-radio-border" },
  { element: "Radio (Selected)", property: "Indicator", token: "--wex-component-radio-checked-fg" },
  { element: "Focus Ring", property: "Color", token: "--wex-component-radio-focus-ring" },
  { element: "Disabled", property: "Opacity", token: "--wex-component-radio-disabled-opacity" },
];

export default function RadioGroupPage() {
  return (
    <ComponentPage
      title="Radio Group"
      description="A set of checkable buttons where only one can be checked at a time."
      status="stable"
      registryKey="radio-group"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexRadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <WexRadioGroup.Item value="option-one" id="option-one" />
              <WexLabel htmlFor="option-one">Option One</WexLabel>
            </div>
            <div className="flex items-center space-x-2">
              <WexRadioGroup.Item value="option-two" id="option-two" />
              <WexLabel htmlFor="option-two">Option Two</WexLabel>
            </div>
            <div className="flex items-center space-x-2">
              <WexRadioGroup.Item value="option-three" id="option-three" />
              <WexLabel htmlFor="option-three">Option Three</WexLabel>
            </div>
          </WexRadioGroup>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Keyboard Navigation</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>Arrow Up/Down: Navigate between options</li>
            <li>Space: Select the focused option</li>
          </ul>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexRadioGroup, WexLabel } from "@/components/wex";

<WexRadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <WexRadioGroup.Item value="option-one" id="r1" />
    <WexLabel htmlFor="r1">Option 1</WexLabel>
  </div>
</WexRadioGroup>`}
        />
      </Section>

      <TokenReference tokens={radioGroupTokens} className="mt-12" />
    </ComponentPage>
  );
}

