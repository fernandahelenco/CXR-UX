import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexScrollArea } from "@/components/wex";

// Props documentation
const scrollAreaProps: PropDefinition[] = [
  { name: "type", type: '"auto" | "always" | "scroll" | "hover"', default: '"hover"', description: "When scrollbars appear" },
  { name: "scrollHideDelay", type: "number", default: "600", description: "Delay before scrollbars hide (ms)" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

// Token mappings for WexScrollArea
const scrollAreaTokens: TokenRow[] = [
  { element: "Scrollbar", property: "Track", token: "--muted (transparent)" },
  { element: "Scrollbar", property: "Thumb", token: "--border" },
  { element: "Scrollbar", property: "Thumb (hover)", token: "--border-hover" },
];

export default function ScrollAreaPage() {
  return (
    <ComponentPage
      title="Scroll Area"
      description="Augments native scroll functionality for custom scrollbars."
      status="stable"
      registryKey="scroll-area"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexScrollArea className="h-48 w-48 rounded-md border p-4">
            <div className="space-y-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="text-sm">Item {i + 1}</div>
              ))}
            </div>
          </WexScrollArea>
        </ExampleCard>
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
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Tab: Focus the scroll area</li>
              <li>Arrow keys: Scroll content</li>
              <li>Page Up/Down: Scroll by page</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Best Practices</h3>
            <p className="text-sm text-muted-foreground">
              Content remains accessible via keyboard scrolling. Custom scrollbars 
              are styled but maintain native scroll behavior.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexScrollArea } from "@/components/wex";

<WexScrollArea className="h-48 w-48 rounded-md border">
  <div className="p-4">
    Scrollable content
  </div>
</WexScrollArea>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={scrollAreaProps} />
      </Section>

      <TokenReference tokens={scrollAreaTokens} className="mt-12" />
    </ComponentPage>
  );
}

