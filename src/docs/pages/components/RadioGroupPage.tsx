import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { WexLabel } from "@/components/wex";

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
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <WexLabel htmlFor="option-one">Option One</WexLabel>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <WexLabel htmlFor="option-two">Option Two</WexLabel>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-three" id="option-three" />
              <WexLabel htmlFor="option-three">Option Three</WexLabel>
            </div>
          </RadioGroup>
        </ExampleCard>
      </Section>

      {/* ============================================================
          HORIZONTAL LAYOUT
          ============================================================ */}
      <Section title="Layouts" description="Vertical and horizontal arrangements.">
        <ExampleCard title="Horizontal">
          <RadioGroup defaultValue="h-1" className="flex gap-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="h-1" id="h-1" />
              <WexLabel htmlFor="h-1">Option 1</WexLabel>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="h-2" id="h-2" />
              <WexLabel htmlFor="h-2">Option 2</WexLabel>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="h-3" id="h-3" />
              <WexLabel htmlFor="h-3">Option 3</WexLabel>
            </div>
          </RadioGroup>
        </ExampleCard>
      </Section>

      {/* ============================================================
          STATES
          ============================================================ */}
      <Section title="States" description="Disabled options.">
        <ExampleCard title="With Disabled Options">
          <RadioGroup defaultValue="enabled">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="enabled" id="enabled" />
              <WexLabel htmlFor="enabled">Available option</WexLabel>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="disabled" id="disabled" disabled />
              <WexLabel htmlFor="disabled" className="text-muted-foreground">Unavailable option</WexLabel>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="another" id="another" />
              <WexLabel htmlFor="another">Another option</WexLabel>
            </div>
          </RadioGroup>
        </ExampleCard>
      </Section>

      {/* ============================================================
          WITH DESCRIPTIONS
          ============================================================ */}
      <Section title="With Descriptions" description="Radio options with helper text.">
        <ExampleCard>
          <RadioGroup defaultValue="card" className="space-y-4">
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="card" id="card" className="mt-1" />
              <div>
                <WexLabel htmlFor="card" className="font-medium">Credit Card</WexLabel>
                <p className="text-sm text-muted-foreground">
                  Pay with Visa, Mastercard, or American Express.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="bank" id="bank" className="mt-1" />
              <div>
                <WexLabel htmlFor="bank" className="font-medium">Bank Transfer</WexLabel>
                <p className="text-sm text-muted-foreground">
                  Direct transfer from your bank account.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
              <div>
                <WexLabel htmlFor="paypal" className="font-medium">PayPal</WexLabel>
                <p className="text-sm text-muted-foreground">
                  Fast checkout with your PayPal account.
                </p>
              </div>
            </div>
          </RadioGroup>
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
          code={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Basic usage
<RadioGroup defaultValue="option-1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-2" id="r2" />
    <Label htmlFor="r2">Option 2</Label>
  </div>
</RadioGroup>

// Horizontal layout
<RadioGroup className="flex gap-6">
  ...
</RadioGroup>

// Controlled
const [value, setValue] = useState("option-1");
<RadioGroup value={value} onValueChange={setValue}>
  ...
</RadioGroup>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>RadioGroup Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">value</code>: string</li>
            <li><code className="bg-muted px-1 rounded">onValueChange</code>: (value: string) =&gt; void</li>
            <li><code className="bg-muted px-1 rounded">defaultValue</code>: string</li>
          </ul>
        </div>
      </Section>

      <TokenReference tokens={radioGroupTokens} className="mt-12" />
    </ComponentPage>
  );
}
