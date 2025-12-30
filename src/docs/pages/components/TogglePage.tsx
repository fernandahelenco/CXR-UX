import { useState } from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexToggle } from "@/components/wex";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Star } from "lucide-react";

// Props documentation
const toggleProps: PropDefinition[] = [
  { name: "pressed", type: "boolean", description: "Controlled pressed state" },
  { name: "defaultPressed", type: "boolean", default: "false", description: "Default pressed state" },
  { name: "onPressedChange", type: "(pressed: boolean) => void", description: "Callback when pressed changes" },
  { name: "variant", type: '"default" | "outline"', default: '"default"', description: "Visual variant" },
  { name: "size", type: '"default" | "sm" | "lg"', default: '"default"', description: "Toggle size" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the toggle" },
];

// Token mappings for WexToggle
// Layer 3 component tokens
const toggleTokens: TokenRow[] = [
  { element: "Toggle", property: "Background", token: "--wex-component-toggle-bg" },
  { element: "Toggle", property: "Text", token: "--wex-component-toggle-fg" },
  { element: "Toggle (Hover)", property: "Background", token: "--wex-component-toggle-hover-bg" },
  { element: "Toggle (Hover)", property: "Text", token: "--wex-component-toggle-hover-fg" },
  { element: "Toggle (Pressed)", property: "Background", token: "--wex-component-toggle-pressed-bg" },
  { element: "Toggle (Pressed)", property: "Text", token: "--wex-component-toggle-pressed-fg" },
  { element: "Focus Ring", property: "Color", token: "--wex-component-toggle-focus-ring" },
  { element: "Disabled", property: "Opacity", token: "--wex-component-toggle-disabled-opacity" },
];

export default function TogglePage() {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <ComponentPage
      title="Toggle"
      description="A two-state button that can be either on or off."
      status="stable"
      registryKey="toggle"
    >
      <Section title="Overview">
        <ExampleCard title="Text Formatting Toolbar" description="Common use case for toggles in a toolbar.">
          <div className="flex gap-1">
            <WexToggle aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </WexToggle>
            <WexToggle aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </WexToggle>
            <WexToggle aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </WexToggle>
          </div>
        </ExampleCard>
        <Guidance>
          Toggle is a two-state button that can be on or off. It's commonly used for 
          formatting options, view switches, and binary settings. Always provide an 
          aria-label for icon-only toggles.
        </Guidance>
      </Section>

      <Section title="Variants" description="Available styling variants.">
        <div className="space-y-4">
          <ExampleCard title="Default" description="Transparent background, visible on hover and when pressed.">
            <div className="flex gap-2">
              <WexToggle aria-label="Default toggle">
                <Star className="h-4 w-4" />
              </WexToggle>
              <WexToggle aria-label="Default toggle pressed" defaultPressed>
                <Star className="h-4 w-4" />
              </WexToggle>
            </div>
          </ExampleCard>

          <ExampleCard title="Outline" description="Bordered variant with subtle styling.">
            <div className="flex gap-2">
              <WexToggle variant="outline" aria-label="Outline toggle">
                <Star className="h-4 w-4" />
              </WexToggle>
              <WexToggle variant="outline" aria-label="Outline toggle pressed" defaultPressed>
                <Star className="h-4 w-4" />
              </WexToggle>
            </div>
          </ExampleCard>

          <ExampleCard title="With Text" description="Toggle can include text labels.">
            <div className="flex gap-2">
              <WexToggle aria-label="Toggle preview mode">
                Preview
              </WexToggle>
              <WexToggle variant="outline" aria-label="Toggle edit mode">
                Edit
              </WexToggle>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Sizes" description="Three size options to fit different layouts.">
        <div className="space-y-4">
          <ExampleCard title="Small (sm)" description="Compact size for dense UIs.">
            <WexToggle size="sm" aria-label="Small toggle">
              <Star className="h-3 w-3" />
            </WexToggle>
          </ExampleCard>

          <ExampleCard title="Default" description="Standard size for most use cases.">
            <WexToggle aria-label="Default size toggle">
              <Star className="h-4 w-4" />
            </WexToggle>
          </ExampleCard>

          <ExampleCard title="Large (lg)" description="Larger touch target for mobile or prominent actions.">
            <WexToggle size="lg" aria-label="Large toggle">
              <Star className="h-5 w-5" />
            </WexToggle>
          </ExampleCard>
        </div>
      </Section>

      <Section title="States" description="Interactive states of the toggle.">
        <div className="space-y-4">
          <ExampleCard title="Controlled State" description="Manage toggle state externally.">
            <div className="flex items-center gap-4">
              <WexToggle 
                pressed={isPressed} 
                onPressedChange={setIsPressed}
                aria-label="Controlled toggle"
              >
                <Star className="h-4 w-4" />
              </WexToggle>
              <span className="text-sm text-muted-foreground">
                State: {isPressed ? "On" : "Off"}
              </span>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled" description="Non-interactive state.">
            <div className="flex gap-2">
              <WexToggle disabled aria-label="Disabled toggle">
                <Star className="h-4 w-4" />
              </WexToggle>
              <WexToggle disabled defaultPressed aria-label="Disabled pressed toggle">
                <Star className="h-4 w-4" />
              </WexToggle>
            </div>
          </ExampleCard>

          <ExampleCard title="Focus State" description="Tab to see focus ring.">
            <WexToggle aria-label="Focusable toggle">
              <Star className="h-4 w-4" />
            </WexToggle>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Use Cases" description="Common patterns and compositions.">
        <div className="space-y-4">
          <ExampleCard title="Alignment Toolbar" description="Mutually exclusive options (use ToggleGroup for this pattern).">
            <div className="flex gap-1 rounded-md border border-border p-1">
              <WexToggle aria-label="Align left">
                <AlignLeft className="h-4 w-4" />
              </WexToggle>
              <WexToggle aria-label="Align center">
                <AlignCenter className="h-4 w-4" />
              </WexToggle>
              <WexToggle aria-label="Align right">
                <AlignRight className="h-4 w-4" />
              </WexToggle>
            </div>
          </ExampleCard>

          <ExampleCard title="Feature Toggle" description="Binary on/off controls.">
            <div className="flex items-center gap-3">
              <WexToggle variant="outline" aria-label="Toggle notifications" defaultPressed>
                <Star className="h-4 w-4" />
                Notifications
              </WexToggle>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">WCAG 2.2 AA Compliant</h3>
            <p className="text-sm text-muted-foreground">
              Toggle meets WCAG 2.2 Level AA requirements for interactive controls.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">ARIA Requirements</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><code className="bg-muted px-1 rounded">aria-label</code>: Required for icon-only toggles</li>
              <li><code className="bg-muted px-1 rounded">aria-pressed</code>: Automatically managed by Radix UI</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Tab: Focus the toggle</li>
              <li>Space or Enter: Toggle the pressed state</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Target Size</h3>
            <p className="text-sm text-muted-foreground">
              Default size meets WCAG 2.5.8 minimum target size (24x24px).
              Large size provides enhanced touch targets for mobile.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexToggle } from "@/components/wex";
import { Bold, Italic, Star } from "lucide-react";

// Icon-only toggle (requires aria-label)
<WexToggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</WexToggle>

// Outline variant
<WexToggle variant="outline" aria-label="Toggle feature">
  <Star className="h-4 w-4" />
</WexToggle>

// With text
<WexToggle>Preview</WexToggle>

// Different sizes
<WexToggle size="sm">Small</WexToggle>
<WexToggle size="default">Default</WexToggle>
<WexToggle size="lg">Large</WexToggle>

// Controlled state
const [pressed, setPressed] = useState(false);
<WexToggle 
  pressed={pressed} 
  onPressedChange={setPressed}
  aria-label="Favorite"
>
  <Star className="h-4 w-4" />
</WexToggle>

// Disabled state
<WexToggle disabled aria-label="Disabled toggle">
  <Star className="h-4 w-4" />
</WexToggle>

// Default pressed (uncontrolled)
<WexToggle defaultPressed aria-label="Initially pressed">
  <Star className="h-4 w-4" />
</WexToggle>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={toggleProps} />
      </Section>

      <TokenReference tokens={toggleTokens} className="mt-12" />
    </ComponentPage>
  );
}
