import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexKbd } from "@/components/wex";

// Props documentation
const kbdProps: PropDefinition[] = [
  { name: "children", type: "ReactNode", required: true, description: "Key label or symbol" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

// Token mappings for WexKbd
// Layer 3 component tokens
const kbdTokens: TokenRow[] = [
  { element: "Key", property: "Background", token: "--wex-component-kbd-bg" },
  { element: "Key", property: "Text", token: "--wex-component-kbd-fg" },
  { element: "Key", property: "Border", token: "--wex-component-kbd-border" },
];

export default function KbdPage() {
  return (
    <ComponentPage
      title="Kbd"
      description="Displays keyboard shortcuts or key combinations."
      status="stable"
      registryKey="kbd"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="flex items-center gap-2">
            <WexKbd>⌘</WexKbd>
            <WexKbd>K</WexKbd>
          </div>
        </ExampleCard>
      </Section>

      <Section title="Variants" description="Different keyboard key configurations.">
        <div className="space-y-6">
          <ExampleCard title="Single Key" description="Individual keyboard keys.">
            <div className="flex items-center gap-4">
              <WexKbd>Enter</WexKbd>
              <WexKbd>Esc</WexKbd>
              <WexKbd>Tab</WexKbd>
              <WexKbd>Space</WexKbd>
            </div>
          </ExampleCard>

          <ExampleCard title="Modifier Keys" description="Common modifier symbols.">
            <div className="flex items-center gap-4">
              <WexKbd>⌘</WexKbd>
              <WexKbd>⌥</WexKbd>
              <WexKbd>⇧</WexKbd>
              <WexKbd>⌃</WexKbd>
            </div>
          </ExampleCard>

          <ExampleCard title="Key Combinations" description="Multiple keys together.">
            <div className="flex items-center gap-4">
              <WexKbd.Group>
                <WexKbd>⌘</WexKbd>
                <WexKbd>C</WexKbd>
              </WexKbd.Group>
              <span className="text-muted-foreground">Copy</span>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <WexKbd.Group>
                <WexKbd>⌘</WexKbd>
                <WexKbd>V</WexKbd>
              </WexKbd.Group>
              <span className="text-muted-foreground">Paste</span>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <WexKbd.Group>
                <WexKbd>⌘</WexKbd>
                <WexKbd>⇧</WexKbd>
                <WexKbd>P</WexKbd>
              </WexKbd.Group>
              <span className="text-muted-foreground">Command Palette</span>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Keyboard shortcuts should be documented with descriptive text. 
            Screen readers will read the content of each kbd element.
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexKbd } from "@/components/wex";

// Single key
<WexKbd>Enter</WexKbd>

// Key combination
<WexKbd.Group>
  <WexKbd>⌘</WexKbd>
  <WexKbd>K</WexKbd>
</WexKbd.Group>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={kbdProps} />
      </Section>

      <TokenReference tokens={kbdTokens} className="mt-12" />
    </ComponentPage>
  );
}

