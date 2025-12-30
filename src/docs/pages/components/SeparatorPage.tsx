import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexSeparator } from "@/components/wex";

// Props documentation
const separatorProps: PropDefinition[] = [
  { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Separator direction" },
  { name: "decorative", type: "boolean", default: "true", description: "If true, renders as purely decorative (no role)" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

// Token mappings for WexSeparator
// Layer 3 component tokens
const separatorTokens: TokenRow[] = [
  { element: "Line", property: "Color", token: "--wex-component-separator-bg" },
];

export default function SeparatorPage() {
  return (
    <ComponentPage
      title="Separator"
      description="Visually or semantically separates content."
      status="stable"
      registryKey="separator"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="w-full max-w-sm space-y-4">
            <div>Content above</div>
            <WexSeparator />
            <div>Content below</div>
          </div>
        </ExampleCard>
      </Section>

      <Section title="Orientations" description="Separator can be horizontal or vertical.">
        <div className="space-y-4">
          <ExampleCard title="Horizontal">
            <div className="w-48">
              <WexSeparator />
            </div>
          </ExampleCard>

          <ExampleCard title="Vertical">
            <div className="flex h-12 items-center space-x-4">
              <span>Left</span>
              <WexSeparator orientation="vertical" />
              <span>Right</span>
            </div>
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
            <h3 className="font-medium mb-2">ARIA Role</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><code className="bg-muted px-1 rounded">role="separator"</code>: Applied automatically</li>
              <li><code className="bg-muted px-1 rounded">aria-orientation</code>: Set based on orientation prop</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Decorative vs Semantic</h3>
            <p className="text-sm text-muted-foreground">
              Use <code className="bg-muted px-1 rounded">decorative</code> prop to hide from 
              screen readers when the separator is purely visual.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexSeparator } from "@/components/wex";

// Horizontal
<WexSeparator />

// Vertical
<WexSeparator orientation="vertical" />`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={separatorProps} />
      </Section>

      <TokenReference tokens={separatorTokens} className="mt-12" />
    </ComponentPage>
  );
}

