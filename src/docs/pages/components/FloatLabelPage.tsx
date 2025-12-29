import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { Guidance } from "@/docs/components/ProseBlock";
import { WexFloatLabel } from "@/components/wex";

// Token mappings for FloatLabel - Layer 3 component tokens
const floatLabelTokens: TokenRow[] = [
  { element: "Label", property: "Text (Default)", token: "--wex-component-floatlabel-label-fg" },
  { element: "Label", property: "Text (Focused)", token: "--wex-component-floatlabel-label-focus-fg" },
  { element: "Label", property: "Text (Filled)", token: "--wex-component-floatlabel-label-filled-fg" },
  { element: "Input", property: "Background", token: "--wex-component-input-bg" },
  { element: "Input", property: "Border", token: "--wex-component-input-border" },
  { element: "Input", property: "Border (Focus)", token: "--wex-component-input-border-focus" },
  { element: "Focus Ring", property: "Color", token: "--wex-component-input-focus-ring" },
];

export default function FloatLabelPage() {
  return (
    <ComponentPage
      title="Float Label"
      description="Input with a floating label that animates from inside the field to above it on focus or when containing a value."
      status="stable"
      registryKey="float-label"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="w-full max-w-sm">
            <WexFloatLabel label="Username" />
          </div>
        </ExampleCard>
        <Guidance>
          FloatLabel provides a Material Design / PrimeNG-style floating label input.
          The label appears centered inside the input when empty, then animates to float
          above when the user focuses or enters text.
        </Guidance>
      </Section>

      {/* ============================================================
          SIZES
          ============================================================ */}
      <Section title="Sizes" description="Three sizes for different contexts.">
        <ExampleCard title="All Sizes">
          <div className="w-full max-w-sm space-y-6">
            <WexFloatLabel label="Small" size="sm" />
            <WexFloatLabel label="Medium (Default)" size="md" />
            <WexFloatLabel label="Large" size="lg" />
          </div>
        </ExampleCard>
        <CodeBlock language="tsx" code={`<WexFloatLabel label="Small" size="sm" />
<WexFloatLabel label="Medium (Default)" size="md" />
<WexFloatLabel label="Large" size="lg" />`} />
      </Section>

      {/* ============================================================
          INPUT TYPES
          ============================================================ */}
      <Section title="Input Types" description="Works with various HTML input types.">
        <ExampleCard title="Email">
          <WexFloatLabel label="Email Address" type="email" className="max-w-sm" />
        </ExampleCard>

        <ExampleCard title="Password">
          <WexFloatLabel label="Password" type="password" className="max-w-sm" />
        </ExampleCard>

        <ExampleCard title="Number">
          <WexFloatLabel label="Amount" type="number" className="max-w-sm" />
        </ExampleCard>

        <CodeBlock language="tsx" code={`<WexFloatLabel label="Email Address" type="email" />
<WexFloatLabel label="Password" type="password" />
<WexFloatLabel label="Amount" type="number" />`} />
      </Section>

      {/* ============================================================
          VALIDATION
          ============================================================ */}
      <Section title="Validation" description="Invalid state for form validation.">
        <ExampleCard title="Invalid State">
          <div className="w-full max-w-sm space-y-6">
            <WexFloatLabel label="Email" type="email" invalid />
            <WexFloatLabel label="Username" invalid defaultValue="x" />
          </div>
        </ExampleCard>
        <CodeBlock language="tsx" code={`<WexFloatLabel label="Email" type="email" invalid />
<WexFloatLabel label="Username" invalid defaultValue="x" />`} />
      </Section>

      {/* ============================================================
          DISABLED
          ============================================================ */}
      <Section title="Disabled" description="Disabled state for non-interactive inputs.">
        <ExampleCard title="Disabled">
          <div className="w-full max-w-sm space-y-6">
            <WexFloatLabel label="Disabled Empty" disabled />
            <WexFloatLabel label="Disabled With Value" disabled defaultValue="Readonly value" />
          </div>
        </ExampleCard>
        <CodeBlock language="tsx" code={`<WexFloatLabel label="Disabled Empty" disabled />
<WexFloatLabel label="Disabled With Value" disabled defaultValue="Readonly value" />`} />
      </Section>

      {/* ============================================================
          CONTROLLED
          ============================================================ */}
      <Section title="Controlled" description="Works as a controlled component.">
        <ControlledExample />
        <CodeBlock language="tsx" code={`const [value, setValue] = React.useState("");

<WexFloatLabel
  label="Controlled Input"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`} />
      </Section>

      {/* ============================================================
          TOKENS
          ============================================================ */}
      <Section title="Token Reference">
        <TokenReference tokens={floatLabelTokens} />
      </Section>

      {/* ============================================================
          USAGE NOTES
          ============================================================ */}
      <Section title="Usage Notes">
        <Guidance>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>Accessibility:</strong> The label is properly associated with the input
              via htmlFor/id attributes. Screen readers will announce the label.
            </li>
            <li>
              <strong>Placeholder:</strong> The component uses an invisible placeholder (" ")
              internally to enable CSS-only state detection. Don't pass a placeholder prop.
            </li>
            <li>
              <strong>PrimeNG Variant:</strong> This implements the "in" variant where the
              label starts inside the input field.
            </li>
          </ul>
        </Guidance>
      </Section>
    </ComponentPage>
  );
}

// Controlled example component
function ControlledExample() {
  const [value, setValue] = React.useState("");

  return (
    <ExampleCard title="Controlled">
      <div className="w-full max-w-sm space-y-4">
        <WexFloatLabel
          label="Type something..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          Current value: {value ? `"${value}"` : "(empty)"}
        </p>
      </div>
    </ExampleCard>
  );
}
