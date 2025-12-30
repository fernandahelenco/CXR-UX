import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, SubComponentProps, type PropDefinition } from "@/docs/components/PropsTable";
import { WexRadioGroup, WexLabel } from "@/components/wex";

// Props documentation for WexRadioGroup
const radioGroupProps: PropDefinition[] = [
  { name: "value", type: "string", description: "Controlled selected value" },
  { name: "defaultValue", type: "string", description: "Default selected value for uncontrolled usage" },
  { name: "onValueChange", type: "(value: string) => void", description: "Callback when selection changes" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables all radio items" },
  { name: "required", type: "boolean", default: "false", description: "Marks the group as required" },
  { name: "name", type: "string", description: "Name for form submission" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

const radioItemProps: PropDefinition[] = [
  { name: "value", type: "string", required: true, description: "Unique value for this option" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables this option" },
  { name: "id", type: "string", description: "ID for label association" },
];

// Token mappings for RadioGroup
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

      {/* ============================================================
          HORIZONTAL LAYOUT
          ============================================================ */}
      <Section title="Layouts" description="Vertical and horizontal arrangements.">
        <ExampleCard title="Horizontal">
          <WexRadioGroup defaultValue="h-1" className="flex gap-6">
            <div className="flex items-center space-x-2">
              <WexRadioGroup.Item value="h-1" id="h-1" />
              <WexLabel htmlFor="h-1">Option 1</WexLabel>
            </div>
            <div className="flex items-center space-x-2">
              <WexRadioGroup.Item value="h-2" id="h-2" />
              <WexLabel htmlFor="h-2">Option 2</WexLabel>
            </div>
            <div className="flex items-center space-x-2">
              <WexRadioGroup.Item value="h-3" id="h-3" />
              <WexLabel htmlFor="h-3">Option 3</WexLabel>
            </div>
          </WexRadioGroup>
        </ExampleCard>
      </Section>

      {/* ============================================================
          STATES
          ============================================================ */}
      <Section title="States" description="Disabled options.">
        <ExampleCard title="With Disabled Options">
          <WexRadioGroup defaultValue="enabled">
            <div className="flex items-center space-x-2">
              <WexRadioGroup.Item value="enabled" id="enabled" />
              <WexLabel htmlFor="enabled">Available option</WexLabel>
            </div>
            <div className="flex items-center space-x-2">
              <WexRadioGroup.Item value="disabled" id="disabled" disabled />
              <WexLabel htmlFor="disabled" className="text-muted-foreground">Unavailable option</WexLabel>
            </div>
            <div className="flex items-center space-x-2">
              <WexRadioGroup.Item value="another" id="another" />
              <WexLabel htmlFor="another">Another option</WexLabel>
            </div>
          </WexRadioGroup>
        </ExampleCard>
      </Section>

      {/* ============================================================
          WITH DESCRIPTIONS
          ============================================================ */}
      <Section title="With Descriptions" description="Radio options with helper text.">
        <ExampleCard>
          <WexRadioGroup defaultValue="card" className="space-y-4">
            <div className="flex items-start space-x-3">
              <WexRadioGroup.Item value="card" id="card" className="mt-1" />
              <div>
                <WexLabel htmlFor="card" className="font-medium">Credit Card</WexLabel>
                <p className="text-sm text-muted-foreground">
                  Pay with Visa, Mastercard, or American Express.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <WexRadioGroup.Item value="bank" id="bank" className="mt-1" />
              <div>
                <WexLabel htmlFor="bank" className="font-medium">Bank Transfer</WexLabel>
                <p className="text-sm text-muted-foreground">
                  Direct transfer from your bank account.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <WexRadioGroup.Item value="paypal" id="paypal" className="mt-1" />
              <div>
                <WexLabel htmlFor="paypal" className="font-medium">PayPal</WexLabel>
                <p className="text-sm text-muted-foreground">
                  Fast checkout with your PayPal account.
                </p>
              </div>
            </div>
          </WexRadioGroup>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Arrow Up/Down: Navigate between options</li>
              <li>Space: Select the focused option</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">ARIA Support</h3>
            <p className="text-sm text-muted-foreground">
              Uses role="radiogroup" with proper aria-checked states.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexRadioGroup } from "@/components/wex";

// Basic usage
<WexRadioGroup defaultValue="option-1">
  <div className="flex items-center space-x-2">
    <WexRadioGroup.Item value="option-1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <WexRadioGroup.Item value="option-2" id="r2" />
    <Label htmlFor="r2">Option 2</Label>
  </div>
</WexRadioGroup>

// Horizontal layout
<WexRadioGroup className="flex gap-6">
  ...
</WexRadioGroup>

// Controlled
const [value, setValue] = useState("option-1");
<WexRadioGroup value={value} onValueChange={setValue}>
  ...
</WexRadioGroup>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={radioGroupProps} title="WexRadioGroup" />
        <SubComponentProps name="WexRadioGroup.Item" props={radioItemProps} />
      </Section>

      <TokenReference tokens={radioGroupTokens} className="mt-12" />
    </ComponentPage>
  );
}
