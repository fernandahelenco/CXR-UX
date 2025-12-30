import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, SubComponentProps, type PropDefinition } from "@/docs/components/PropsTable";
import { WexInputGroup } from "@/components/wex";
import { Search, Mail, Eye } from "lucide-react";

// Props documentation for WexInputGroup
const inputGroupProps: PropDefinition[] = [
  { name: "className", type: "string", description: "Additional CSS classes for the container" },
  { name: "children", type: "ReactNode", required: true, description: "Addon and Input elements" },
];

const inputGroupAddonProps: PropDefinition[] = [
  { name: "align", type: '"inline-start" | "inline-end"', default: '"inline-start"', description: "Position of the addon" },
  { name: "children", type: "ReactNode", required: true, description: "Icon, text, or button content" },
];

// Token mappings for WexInputGroup
const inputGroupTokens: TokenRow[] = [
  { element: "Input", property: "Background", token: "--background" },
  { element: "Input", property: "Border", token: "--input" },
  { element: "Addon", property: "Background", token: "--muted" },
  { element: "Addon", property: "Text", token: "--muted-foreground" },
  { element: "Button", property: "", token: "Uses WexButton tokens" },
];

export default function InputGroupPage() {
  return (
    <ComponentPage
      title="Input Group"
      description="Input with addons, buttons, and text decorations."
      status="stable"
      registryKey="input-group"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexInputGroup className="max-w-sm">
            <WexInputGroup.Addon>
              <Search className="h-4 w-4" aria-hidden="true" />
            </WexInputGroup.Addon>
            <WexInputGroup.Input placeholder="Search..." aria-label="Search" />
          </WexInputGroup>
        </ExampleCard>
      </Section>

      <Section title="Variants" description="Different input group configurations.">
        <div className="space-y-6 max-w-sm">
          <ExampleCard title="With Icon Start" description="Icon before the input.">
            <WexInputGroup>
              <WexInputGroup.Addon align="inline-start">
                <Mail className="h-4 w-4" aria-hidden="true" />
              </WexInputGroup.Addon>
              <WexInputGroup.Input placeholder="Email address" aria-label="Email address" />
            </WexInputGroup>
          </ExampleCard>

          <ExampleCard title="With Icon End" description="Icon after the input.">
            <WexInputGroup>
              <WexInputGroup.Input type="password" placeholder="Password" aria-label="Password" />
              <WexInputGroup.Addon align="inline-end">
                <WexInputGroup.Button aria-label="Toggle password visibility">
                  <Eye className="h-4 w-4" aria-hidden="true" />
                </WexInputGroup.Button>
              </WexInputGroup.Addon>
            </WexInputGroup>
          </ExampleCard>

          <ExampleCard title="With Text" description="Text prefix or suffix.">
            <WexInputGroup>
              <WexInputGroup.Addon>
                <WexInputGroup.Text>https://</WexInputGroup.Text>
              </WexInputGroup.Addon>
              <WexInputGroup.Input placeholder="example.com" aria-label="Website URL" />
            </WexInputGroup>
          </ExampleCard>

          <ExampleCard title="With Button" description="Action button in the input.">
            <WexInputGroup>
              <WexInputGroup.Input placeholder="Search..." aria-label="Search query" />
              <WexInputGroup.Addon align="inline-end">
                <WexInputGroup.Button>Search</WexInputGroup.Button>
              </WexInputGroup.Addon>
            </WexInputGroup>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Use role="group" to indicate related elements. Ensure icons have 
            aria-hidden="true" if they are decorative, or provide accessible 
            labels for icon buttons.
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexInputGroup } from "@/components/wex";
import { Search, Mail } from "lucide-react";

// With icon
<WexInputGroup>
  <WexInputGroup.Addon>
    <Search className="h-4 w-4" />
  </WexInputGroup.Addon>
  <WexInputGroup.Input placeholder="Search..." />
</WexInputGroup>

// With text
<WexInputGroup>
  <WexInputGroup.Addon>
    <WexInputGroup.Text>https://</WexInputGroup.Text>
  </WexInputGroup.Addon>
  <WexInputGroup.Input placeholder="example.com" />
</WexInputGroup>

// With button
<WexInputGroup>
  <WexInputGroup.Input placeholder="Search..." />
  <WexInputGroup.Addon align="inline-end">
    <WexInputGroup.Button>Go</WexInputGroup.Button>
  </WexInputGroup.Addon>
</WexInputGroup>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={inputGroupProps} title="WexInputGroup" />
        <SubComponentProps name="WexInputGroup.Addon" props={inputGroupAddonProps} />
      </Section>

      <TokenReference tokens={inputGroupTokens} className="mt-12" />
    </ComponentPage>
  );
}

