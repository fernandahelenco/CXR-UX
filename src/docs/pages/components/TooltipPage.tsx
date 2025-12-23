import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { WexButton } from "@/components/wex";
import { Settings, Info, HelpCircle } from "lucide-react";

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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <WexButton intent="outline">Hover me</WexButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a tooltip</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
          <TooltipProvider>
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <WexButton intent="outline" size="sm">Default (700ms)</WexButton>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Standard delay</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <WexButton intent="outline" size="sm">Instant (0ms)</WexButton>
                </TooltipTrigger>
                <TooltipContent>
                  <p>No delay!</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <WexButton intent="outline" size="sm">Quick (300ms)</WexButton>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Quick delay</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={1500}>
                <TooltipTrigger asChild>
                  <WexButton intent="outline" size="sm">Slow (1500ms)</WexButton>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Longer delay</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
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
          <TooltipProvider>
            <div className="flex gap-4">
              {(["top", "right", "bottom", "left"] as const).map((side) => (
                <Tooltip key={side}>
                  <TooltipTrigger asChild>
                    <WexButton intent="outline" size="sm" className="capitalize">
                      {side}
                    </WexButton>
                  </TooltipTrigger>
                  <TooltipContent side={side}>
                    <p>Tooltip on {side}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </ExampleCard>
      </Section>

      {/* ============================================================
          USE CASES
          ============================================================ */}
      <Section title="Use Cases" description="Common tooltip patterns.">
        <div className="space-y-6">
          <ExampleCard title="Icon Buttons" description="Essential for icon-only buttons.">
            <TooltipProvider>
              <div className="flex gap-2">
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <WexButton intent="ghost" size="icon">
                      <span className="sr-only">Settings</span>
                      <Settings className="h-4 w-4" />
                    </WexButton>
                  </TooltipTrigger>
                  <TooltipContent>Settings</TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <WexButton intent="ghost" size="icon">
                      <span className="sr-only">Information</span>
                      <Info className="h-4 w-4" />
                    </WexButton>
                  </TooltipTrigger>
                  <TooltipContent>More information</TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <WexButton intent="ghost" size="icon">
                      <span className="sr-only">Help</span>
                      <HelpCircle className="h-4 w-4" />
                    </WexButton>
                  </TooltipTrigger>
                  <TooltipContent>Get help</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </ExampleCard>

          <ExampleCard title="Truncated Text" description="Show full text on hover.">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-32 truncate cursor-help">
                    This is a very long text that gets truncated
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a very long text that gets truncated</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </ExampleCard>

          <ExampleCard title="Disabled Button Explanation" description="Explain why an action is disabled.">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span tabIndex={0}>
                    <WexButton disabled>Submit</WexButton>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Complete all required fields to submit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
          code={`import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Wrap your app or section with Provider (once)
<TooltipProvider>
  {/* Your app content */}
</TooltipProvider>

// Basic tooltip
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>
    Tooltip text
  </TooltipContent>
</Tooltip>

// Custom delay (instant for icon buttons)
<Tooltip delayDuration={0}>
  <TooltipTrigger asChild>
    <Button size="icon">
      <Settings />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Settings</TooltipContent>
</Tooltip>

// Custom position
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Trigger</Button>
  </TooltipTrigger>
  <TooltipContent side="right" sideOffset={8}>
    Right side tooltip
  </TooltipContent>
</Tooltip>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Tooltip Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">delayDuration</code>: number (ms) - Time before tooltip appears</li>
          </ul>
          <p className="mt-3"><strong>TooltipContent Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">side</code>: "top" | "right" | "bottom" | "left"</li>
            <li><code className="bg-muted px-1 rounded">sideOffset</code>: number - Distance from trigger</li>
          </ul>
        </div>
      </Section>

      <TokenReference tokens={tooltipTokens} className="mt-12" />
    </ComponentPage>
  );
}
