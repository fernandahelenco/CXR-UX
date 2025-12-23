import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexTooltip, WexButton } from "@/components/wex";

// Token mappings for WexTooltip
// Layer 3 component tokens
const tooltipTokens: TokenRow[] = [
  { element: "Content", property: "Background", token: "--wex-component-tooltip-bg" },
  { element: "Content", property: "Text", token: "--wex-component-tooltip-fg" },
];

export default function TooltipPage() {
  return (
    <ComponentPage
      title="Tooltip"
      description="A popup that displays information related to an element."
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

      <Section title="Variants" description="Different tooltip configurations.">
        <div className="space-y-6">
          <ExampleCard title="With Icon Button" description="Tooltip on icon-only buttons.">
            <WexTooltip.Provider>
              <WexTooltip>
                <WexTooltip.Trigger asChild>
                  <WexButton intent="ghost" size="icon">
                    <span className="sr-only">Settings</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </WexButton>
                </WexTooltip.Trigger>
                <WexTooltip.Content>
                  <p>Settings</p>
                </WexTooltip.Content>
              </WexTooltip>
            </WexTooltip.Provider>
          </ExampleCard>

          <ExampleCard title="With Delay" description="Custom open/close delays.">
            <WexTooltip.Provider delayDuration={0}>
              <WexTooltip>
                <WexTooltip.Trigger asChild>
                  <WexButton intent="outline">Instant tooltip</WexButton>
                </WexTooltip.Trigger>
                <WexTooltip.Content>
                  <p>No delay!</p>
                </WexTooltip.Content>
              </WexTooltip>
            </WexTooltip.Provider>
          </ExampleCard>
        </div>
      </Section>

      <Section title="States" description="Tooltip interaction states.">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Hover State</h3>
            <p className="text-sm text-muted-foreground">
              Tooltip appears after a brief delay when hovering over the trigger.
              The delay prevents accidental triggers during normal mouse movement.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Focus State</h3>
            <p className="text-sm text-muted-foreground">
              Tooltip also appears when the trigger receives keyboard focus,
              ensuring accessibility for keyboard users.
            </p>
          </div>
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
            <h3 className="font-medium mb-2">Screen Readers</h3>
            <p className="text-sm text-muted-foreground">
              Tooltip content is associated with the trigger via ARIA attributes.
              Screen readers announce the tooltip when the trigger is focused.
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
          code={`import { WexTooltip, WexButton } from "@/components/wex";

// Wrap your app or section with Provider (once)
<WexTooltip.Provider>
  {/* Your app content */}
</WexTooltip.Provider>

// Basic tooltip
<WexTooltip>
  <WexTooltip.Trigger asChild>
    <WexButton>Hover me</WexButton>
  </WexTooltip.Trigger>
  <WexTooltip.Content>
    Tooltip text
  </WexTooltip.Content>
</WexTooltip>

// With custom position
<WexTooltip>
  <WexTooltip.Trigger asChild>
    <WexButton>Trigger</WexButton>
  </WexTooltip.Trigger>
  <WexTooltip.Content side="right" sideOffset={8}>
    Right side tooltip
  </WexTooltip.Content>
</WexTooltip>

// Instant tooltip (no delay)
<WexTooltip.Provider delayDuration={0}>
  <WexTooltip>
    <WexTooltip.Trigger>...</WexTooltip.Trigger>
    <WexTooltip.Content>...</WexTooltip.Content>
  </WexTooltip>
</WexTooltip.Provider>`}
        />
      </Section>

      <TokenReference tokens={tooltipTokens} className="mt-12" />
    </ComponentPage>
  );
}
