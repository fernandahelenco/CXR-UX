import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexCollapsible, WexButton } from "@/components/wex";
import { ChevronsUpDown } from "lucide-react";

// Props documentation
const collapsibleProps: PropDefinition[] = [
  { name: "open", type: "boolean", description: "Controlled open state" },
  { name: "defaultOpen", type: "boolean", default: "false", description: "Default open state" },
  { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the collapsible" },
];

// Token mappings for WexCollapsible
const collapsibleTokens: TokenRow[] = [
  { element: "Note", property: "", token: "Headless component - no default styling" },
  { element: "Trigger", property: "", token: "Use WexButton tokens or custom styling" },
];

export default function CollapsiblePage() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <ComponentPage
      title="Collapsible"
      description="Expandable/collapsible content section."
      status="stable"
      registryKey="collapsible"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexCollapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full max-w-sm space-y-2"
          >
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-sm font-semibold">
                @radix-ui/primitives
              </h4>
              <WexCollapsible.Trigger asChild>
                <WexButton intent="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </WexButton>
              </WexCollapsible.Trigger>
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              @radix-ui/react-collapsible
            </div>
            <WexCollapsible.Content className="space-y-2">
              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                @radix-ui/react-accordion
              </div>
              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                @radix-ui/react-tabs
              </div>
            </WexCollapsible.Content>
          </WexCollapsible>
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
            <h3 className="font-medium mb-2">ARIA Attributes</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><code className="bg-muted px-1 rounded">aria-expanded</code>: Automatically managed by Radix UI</li>
              <li><code className="bg-muted px-1 rounded">aria-controls</code>: Links trigger to content</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Tab: Focus the trigger button</li>
              <li>Space or Enter: Toggle open/close state</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexCollapsible, WexButton } from "@/components/wex";
import { ChevronsUpDown } from "lucide-react";

const [isOpen, setIsOpen] = useState(false);

<WexCollapsible open={isOpen} onOpenChange={setIsOpen}>
  <div className="flex items-center justify-between">
    <h4>Title</h4>
    <WexCollapsible.Trigger asChild>
      <WexButton intent="ghost" size="sm">
        <ChevronsUpDown className="h-4 w-4" />
      </WexButton>
    </WexCollapsible.Trigger>
  </div>
  <div>Always visible content</div>
  <WexCollapsible.Content>
    Hidden content that expands
  </WexCollapsible.Content>
</WexCollapsible>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable 
          props={collapsibleProps} 
          subComponents={[
            { name: "WexCollapsible.Trigger", props: [{ name: "asChild", type: "boolean", default: "false", description: "Merge with child element" }] },
            { name: "WexCollapsible.Content", props: [{ name: "forceMount", type: "boolean", description: "Force mount for animation" }] },
          ]}
        />
      </Section>

      <TokenReference tokens={collapsibleTokens} className="mt-12" />
    </ComponentPage>
  );
}
