import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, SubComponentProps, type PropDefinition } from "@/docs/components/PropsTable";
import { WexField, WexInput } from "@/components/wex";

// Props documentation for WexField
const fieldProps: PropDefinition[] = [
  { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Layout orientation of label and input" },
  { name: "data-invalid", type: '"true" | undefined', description: "Marks the field as invalid for error styling" },
  { name: "className", type: "string", description: "Additional CSS classes" },
  { name: "children", type: "ReactNode", required: true, description: "Field content (Label, Input, Description, Error)" },
];

const fieldLabelProps: PropDefinition[] = [
  { name: "htmlFor", type: "string", required: true, description: "ID of the associated input element" },
  { name: "children", type: "ReactNode", required: true, description: "Label text" },
];

// Token mappings for WexField
const fieldTokens: TokenRow[] = [
  { element: "Label", property: "Text", token: "--foreground" },
  { element: "Description", property: "Text", token: "--muted-foreground" },
  { element: "Error", property: "Text", token: "--destructive" },
  { element: "Required (*)", property: "Color", token: "--destructive" },
];

export default function FieldPage() {
  return (
    <ComponentPage
      title="Field"
      description="Form field container with label, description, and error handling."
      status="stable"
      registryKey="field"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexField className="max-w-sm">
            <WexField.Label htmlFor="email-field">Email</WexField.Label>
            <WexInput id="email-field" type="email" placeholder="you@example.com" />
            <WexField.Description>We'll never share your email.</WexField.Description>
          </WexField>
        </ExampleCard>
      </Section>

      <Section title="Variants" description="Different field configurations.">
        <div className="space-y-6 max-w-sm">
          <ExampleCard title="With Error" description="Field with validation error.">
            <WexField data-invalid="true">
              <WexField.Label htmlFor="error-field">Username</WexField.Label>
              <WexInput id="error-field" aria-invalid="true" defaultValue="ab" />
              <WexField.Error>Username must be at least 3 characters.</WexField.Error>
            </WexField>
          </ExampleCard>

          <ExampleCard title="Horizontal Layout" description="Label and input side by side.">
            <WexField orientation="horizontal">
              <WexField.Label htmlFor="horizontal-field">Name</WexField.Label>
              <WexInput id="horizontal-field" placeholder="John Doe" />
            </WexField>
          </ExampleCard>

          <ExampleCard title="Field Group" description="Group of related fields.">
            <WexField.Group>
              <WexField>
                <WexField.Label htmlFor="first-name">First Name</WexField.Label>
                <WexInput id="first-name" />
              </WexField>
              <WexField>
                <WexField.Label htmlFor="last-name">Last Name</WexField.Label>
                <WexInput id="last-name" />
              </WexField>
            </WexField.Group>
          </ExampleCard>

          <ExampleCard title="Fieldset with Legend" description="Grouped fields with a title.">
            <WexField.Set>
              <WexField.Legend>Contact Information</WexField.Legend>
              <WexField>
                <WexField.Label htmlFor="contact-email">Email</WexField.Label>
                <WexInput id="contact-email" type="email" />
              </WexField>
              <WexField>
                <WexField.Label htmlFor="contact-phone">Phone</WexField.Label>
                <WexInput id="contact-phone" type="tel" />
              </WexField>
            </WexField.Set>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Label Association</h3>
            <p className="text-sm text-muted-foreground">
              Always use WexField.Label with the htmlFor prop to associate 
              labels with their inputs for screen reader accessibility.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Error Announcements</h3>
            <p className="text-sm text-muted-foreground">
              WexField.Error uses role="alert" to announce validation errors 
              to screen readers when they appear.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexField, WexInput } from "@/components/wex";

// Basic field
<WexField>
  <WexField.Label htmlFor="email">Email</WexField.Label>
  <WexInput id="email" type="email" />
  <WexField.Description>We'll never share your email.</WexField.Description>
</WexField>

// Field with error
<WexField data-invalid="true">
  <WexField.Label htmlFor="username">Username</WexField.Label>
  <WexInput id="username" aria-invalid="true" />
  <WexField.Error>Username is required.</WexField.Error>
</WexField>

// Field group
<WexField.Group>
  <WexField>
    <WexField.Label htmlFor="first">First Name</WexField.Label>
    <WexInput id="first" />
  </WexField>
  <WexField>
    <WexField.Label htmlFor="last">Last Name</WexField.Label>
    <WexInput id="last" />
  </WexField>
</WexField.Group>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={fieldProps} title="WexField" />
        <SubComponentProps name="WexField.Label" props={fieldLabelProps} />
      </Section>

      <TokenReference tokens={fieldTokens} className="mt-12" />
    </ComponentPage>
  );
}

