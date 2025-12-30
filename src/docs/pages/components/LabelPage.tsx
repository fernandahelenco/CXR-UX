import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexLabel, WexInput } from "@/components/wex";

// Props documentation for WexLabel
const labelProps: PropDefinition[] = [
  { name: "htmlFor", type: "string", description: "ID of the associated input element" },
  { name: "className", type: "string", description: "Additional CSS classes" },
  { name: "children", type: "ReactNode", required: true, description: "Label text" },
];

// Token mappings for WexLabel
const labelTokens: TokenRow[] = [
  { element: "Label", property: "Text", token: "--foreground" },
  { element: "Disabled", property: "Opacity", token: "70%" },
];

export default function LabelPage() {
  return (
    <ComponentPage
      title="Label"
      description="Accessible label for form controls."
      status="stable"
      registryKey="label"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="w-full max-w-sm space-y-2">
            <WexLabel htmlFor="email-example">Email</WexLabel>
            <WexInput id="email-example" placeholder="you@example.com" />
          </div>
        </ExampleCard>
      </Section>

      <Section title="Variants" description="Different label configurations.">
        <div className="space-y-4">
          <ExampleCard title="With Input" description="Standard label/input pair.">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel htmlFor="name-input">Name</WexLabel>
              <WexInput id="name-input" placeholder="Enter your name" />
            </div>
          </ExampleCard>

          <ExampleCard title="Required Field" description="Indicate required fields.">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel htmlFor="required-input">
                Username <span className="text-destructive">*</span>
              </WexLabel>
              <WexInput id="required-input" placeholder="Required" required />
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Label Association</h3>
          <p className="text-sm text-muted-foreground">
            Always use the <code className="bg-muted px-1 rounded">htmlFor</code> prop
            to associate labels with their inputs. This enables clicking the label
            to focus the input and provides screen reader support.
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexLabel, WexInput } from "@/components/wex";

<WexLabel htmlFor="email">Email</WexLabel>
<WexInput id="email" placeholder="you@example.com" />

// Required field
<WexLabel htmlFor="required">
  Username <span className="text-destructive">*</span>
</WexLabel>
<WexInput id="required" required />`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={labelProps} />
      </Section>

      <TokenReference tokens={labelTokens} className="mt-12" />
    </ComponentPage>
  );
}
