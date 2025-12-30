import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, SubComponentProps, type PropDefinition } from "@/docs/components/PropsTable";
import { WexTooltip, WexButton } from "@/components/wex";
import { Settings, Info, HelpCircle } from "lucide-react";

// Props documentation for WexTooltip
const tooltipProviderProps: PropDefinition[] = [
  { name: "delayDuration", type: "number", default: "700", description: "Delay before tooltip appears (ms)" },
  { name: "skipDelayDuration", type: "number", default: "300", description: "Skip delay when moving between triggers (ms)" },
];

const tooltipContentProps: PropDefinition[] = [
  { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "Preferred side to render" },
  { name: "sideOffset", type: "number", default: "4", description: "Offset from the trigger" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

// Token mappings for Tooltip
// Layer 3 component tokens
const tooltipTokens: TokenRow[] = [
  { element: "Content", property: "Background", token: "--wex-component-tooltip-bg" },
  { element: "Content", property: "Text", token: "--wex-component-tooltip-fg" },
  { element: "Content", property: "Border", token: "--wex-component-tooltip-border" },
];

export default function TooltipPage() {
  return (
    <ComponentPage
      title="Tooltip"
      description="A popup that displays information with customizable delay duration."
      status="stable"
      registryKey="tooltip"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexTooltip.Provider>
            <WexTooltip>
              <WexTooltip.Trigger asChild>
                <WexButton intent="outline">Hover me</WexButton>
              </WexTooltip.Trigger>
              <WexTooltip.Content>
                <p>This is a tooltip</p>
              </WexTooltip.Content>
            </WexTooltip>
          </WexTooltip.Provider>
        </ExampleCard>
        <Guidance>
          Use Tooltip for simple text hints. For interactive content or
          complex previews, use HoverCard instead.
        </Guidance>
      </Section>

      {/* ============================================================
          DELAY DURATION
          ============================================================ */}
      <Section title="Delay Duration" description="Control how quickly the tooltip appears.">
        <ExampleCard title="Different Delays">
          <WexTooltip.Provider>
            <div className="flex gap-4">
              <WexTooltip>
                <WexTooltip.Trigger asChild>
                  <WexButton intent="outline" size="sm">Default (700ms)</WexButton>
                </WexTooltip.Trigger>
                <WexTooltip.Content>
                  <p>Standard delay</p>
                </WexTooltip.Content>
              </WexTooltip>

              <WexTooltip delayDuration={0}>
                <WexTooltip.Trigger asChild>
                  <WexButton intent="outline" size="sm">Instant (0ms)</WexButton>
                </WexTooltip.Trigger>
                <WexTooltip.Content>
                  <p>No delay!</p>
                </WexTooltip.Content>
              </WexTooltip>

              <WexTooltip delayDuration={300}>
                <WexTooltip.Trigger asChild>
                  <WexButton intent="outline" size="sm">Quick (300ms)</WexButton>
                </WexTooltip.Trigger>
                <WexTooltip.Content>
                  <p>Quick delay</p>
                </WexTooltip.Content>
              </WexTooltip>

              <WexTooltip delayDuration={1500}>
                <WexTooltip.Trigger asChild>
                  <WexButton intent="outline" size="sm">Slow (1500ms)</WexButton>
                </WexTooltip.Trigger>
                <WexTooltip.Content>
                  <p>Longer delay</p>
                </WexTooltip.Content>
              </WexTooltip>
            </div>
          </WexTooltip.Provider>
        </ExampleCard>
        <Guidance>
          Use instant tooltips (0ms) for icon buttons where users need immediate feedback.
          Use longer delays for secondary information that shouldn't distract.
        </Guidance>
      </Section>

      {/* ============================================================
          POSITIONS
          ============================================================ */}
      <Section title="Positions" description="Tooltip can appear on any side.">
        <ExampleCard>
          <WexTooltip.Provider>
            <div className="flex gap-4">
              {(["top", "right", "bottom", "left"] as const).map((side) => (
                <WexTooltip key={side}>
                  <WexTooltip.Trigger asChild>
                    <WexButton intent="outline" size="sm" className="capitalize">
                      {side}
                    </WexButton>
                  </WexTooltip.Trigger>
                  <WexTooltip.Content side={side}>
                    <p>Tooltip on {side}</p>
                  </WexTooltip.Content>
                </WexTooltip>
              ))}
            </div>
          </WexTooltip.Provider>
        </ExampleCard>
      </Section>

      {/* ============================================================
          USE CASES
          ============================================================ */}
      <Section title="Use Cases" description="Common tooltip patterns.">
        <div className="space-y-6">
          <ExampleCard title="Icon Buttons" description="Essential for icon-only buttons.">
            <WexTooltip.Provider>
              <div className="flex gap-2">
                <WexTooltip delayDuration={0}>
                  <WexTooltip.Trigger asChild>
                    <WexButton intent="ghost" size="icon">
                      <span className="sr-only">Settings</span>
                      <Settings className="h-4 w-4" />
                    </WexButton>
                  </WexTooltip.Trigger>
                  <WexTooltip.Content>Settings</WexTooltip.Content>
                </WexTooltip>

                <WexTooltip delayDuration={0}>
                  <WexTooltip.Trigger asChild>
                    <WexButton intent="ghost" size="icon">
                      <span className="sr-only">Information</span>
                      <Info className="h-4 w-4" />
                    </WexButton>
                  </WexTooltip.Trigger>
                  <WexTooltip.Content>More information</WexTooltip.Content>
                </WexTooltip>

                <WexTooltip delayDuration={0}>
                  <WexTooltip.Trigger asChild>
                    <WexButton intent="ghost" size="icon">
                      <span className="sr-only">Help</span>
                      <HelpCircle className="h-4 w-4" />
                    </WexButton>
                  </WexTooltip.Trigger>
                  <WexTooltip.Content>Get help</WexTooltip.Content>
                </WexTooltip>
              </div>
            </WexTooltip.Provider>
          </ExampleCard>

          <ExampleCard title="Truncated Text" description="Show full text on hover.">
            <WexTooltip.Provider>
              <WexTooltip>
                <WexTooltip.Trigger asChild>
                  <div className="w-32 truncate cursor-help">
                    This is a very long text that gets truncated
                  </div>
                </WexTooltip.Trigger>
                <WexTooltip.Content>
                  <p>This is a very long text that gets truncated</p>
                </WexTooltip.Content>
              </WexTooltip>
            </WexTooltip.Provider>
          </ExampleCard>

          <ExampleCard title="Disabled Button Explanation" description="Explain why an action is disabled.">
            <WexTooltip.Provider>
              <WexTooltip>
                <WexTooltip.Trigger asChild>
                  <span tabIndex={0}>
                    <WexButton disabled>Submit</WexButton>
                  </span>
                </WexTooltip.Trigger>
                <WexTooltip.Content>
                  <p>Complete all required fields to submit</p>
                </WexTooltip.Content>
              </WexTooltip>
            </WexTooltip.Provider>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Support</h3>
            <p className="text-sm text-muted-foreground">
              Tooltips appear on focus, not just hover, ensuring keyboard users
              can access the information.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Icon Buttons</h3>
            <p className="text-sm text-muted-foreground">
              When using tooltips on icon-only buttons, include{" "}
              <code className="bg-muted px-1 rounded">sr-only</code> text for
              screen readers as a fallback.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexTooltip } from "@/components/wex";

// Wrap your app or section with Provider (once)
<WexTooltip.Provider>
  {/* Your app content */}
</WexTooltip.Provider>

// Basic tooltip
<WexTooltip>
  <WexTooltip.Trigger asChild>
    <Button>Hover me</Button>
  </WexTooltip.Trigger>
  <WexTooltip.Content>
    Tooltip text
  </WexTooltip.Content>
</WexTooltip>

// Custom delay (instant for icon buttons)
<WexTooltip delayDuration={0}>
  <WexTooltip.Trigger asChild>
    <Button size="icon">
      <Settings />
    </Button>
  </WexTooltip.Trigger>
  <WexTooltip.Content>Settings</WexTooltip.Content>
</WexTooltip>

// Custom position
<WexTooltip>
  <WexTooltip.Trigger asChild>
    <Button>Trigger</Button>
  </WexTooltip.Trigger>
  <WexTooltip.Content side="right" sideOffset={8}>
    Right side tooltip
  </WexTooltip.Content>
</WexTooltip>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={tooltipProviderProps} title="WexTooltip.Provider" />
        <SubComponentProps name="WexTooltip.Content" props={tooltipContentProps} />
      </Section>

      <TokenReference tokens={tooltipTokens} className="mt-12" />
    </ComponentPage>
  );
}
