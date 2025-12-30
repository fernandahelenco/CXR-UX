import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexSpinner, WexButton } from "@/components/wex";

// Props documentation
const spinnerProps: PropDefinition[] = [
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Spinner size" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

// Token mappings for WexSpinner
const spinnerTokens: TokenRow[] = [
  { element: "Spinner", property: "Color", token: "--primary" },
  { element: "Animation", property: "Type", token: "spin (CSS animation)" },
];

export default function SpinnerPage() {
  return (
    <ComponentPage
      title="Spinner"
      description="Loading spinner indicator for async operations."
      status="stable"
      registryKey="spinner"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexSpinner />
        </ExampleCard>
      </Section>

      <Section title="Variants" description="Different spinner sizes and contexts.">
        <div className="space-y-6">
          <ExampleCard title="Sizes" description="Different spinner sizes via className.">
            <div className="flex items-center gap-4">
              <WexSpinner className="h-4 w-4" />
              <WexSpinner className="h-6 w-6" />
              <WexSpinner className="h-8 w-8" />
              <WexSpinner className="h-12 w-12" />
            </div>
          </ExampleCard>

          <ExampleCard title="In Button" description="Loading state in a button.">
            <WexButton disabled>
              <WexSpinner className="mr-2" />
              Loading...
            </WexButton>
          </ExampleCard>

          <ExampleCard title="Page Loading" description="Centered loading indicator.">
            <div className="flex items-center justify-center p-12 border rounded-lg">
              <div className="flex flex-col items-center gap-4">
                <WexSpinner className="h-8 w-8" />
                <p className="text-sm text-muted-foreground">Loading content...</p>
              </div>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">ARIA Attributes</h3>
          <p className="text-sm text-muted-foreground">
            WexSpinner includes role="status" and aria-label="Loading" by default.
            Screen readers will announce the loading state.
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexSpinner, WexButton } from "@/components/wex";

// Basic spinner
<WexSpinner />

// Custom size
<WexSpinner className="h-8 w-8" />

// In a button
<WexButton disabled>
  <WexSpinner className="mr-2" />
  Loading...
</WexButton>

// Centered loading
<div className="flex items-center justify-center p-12">
  <WexSpinner className="h-8 w-8" />
</div>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={spinnerProps} />
      </Section>

      <TokenReference tokens={spinnerTokens} className="mt-12" />
    </ComponentPage>
  );
}

