import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexHoverCard, WexButton, WexAvatar } from "@/components/wex";
import { CalendarDays, ExternalLink, Github, Mail } from "lucide-react";

// Props documentation
const hoverCardRootProps: PropDefinition[] = [
  { name: "open", type: "boolean", description: "Controlled open state" },
  { name: "defaultOpen", type: "boolean", default: "false", description: "Default open state" },
  { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open changes" },
  { name: "openDelay", type: "number", default: "700", description: "Delay before opening (ms)" },
  { name: "closeDelay", type: "number", default: "300", description: "Delay before closing (ms)" },
];

const hoverCardContentProps: PropDefinition[] = [
  { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Preferred side" },
  { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment" },
  { name: "sideOffset", type: "number", default: "4", description: "Offset from trigger" },
];

// Token mappings for WexHoverCard
// Layer 3 component tokens
const hoverCardTokens: TokenRow[] = [
  { element: "Content", property: "Background", token: "--wex-component-hovercard-bg" },
  { element: "Content", property: "Text", token: "--wex-component-hovercard-fg" },
  { element: "Content", property: "Border", token: "--wex-component-hovercard-border" },
];

export default function HoverCardPage() {
  return (
    <ComponentPage
      title="Hover Card"
      description="Preview content displayed when hovering over a trigger element."
      status="stable"
      registryKey="hover-card"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexHoverCard>
            <WexHoverCard.Trigger asChild>
              <WexButton intent="ghost" className="text-link underline underline-offset-4">@wexinc</WexButton>
            </WexHoverCard.Trigger>
            <WexHoverCard.Content className="w-80">
              <div className="flex justify-between space-x-4">
                <WexAvatar>
                  <WexAvatar.Fallback>WX</WexAvatar.Fallback>
                </WexAvatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@wexinc</h4>
                  <p className="text-sm">
                    The WEX Design System – components and tokens for building
                    consistent applications.
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-muted-foreground">
                      Joined December 2023
                    </span>
                  </div>
                </div>
              </div>
            </WexHoverCard.Content>
          </WexHoverCard>
        </ExampleCard>
        <Guidance>
          Use HoverCard for rich previews of linked content. Unlike Tooltip,
          HoverCard can contain interactive elements and complex content.
        </Guidance>
      </Section>

      <Section title="Variants" description="Different hover card configurations.">
        <div className="space-y-6">
          <ExampleCard title="User Profile" description="Preview user information on hover.">
            <WexHoverCard>
              <WexHoverCard.Trigger asChild>
                <WexButton intent="ghost" className="text-link underline underline-offset-4">View Profile</WexButton>
              </WexHoverCard.Trigger>
              <WexHoverCard.Content className="w-80">
                <div className="flex justify-between space-x-4">
                  <WexAvatar className="h-12 w-12">
                    <WexAvatar.Fallback>JD</WexAvatar.Fallback>
                  </WexAvatar>
                  <div className="space-y-1 flex-1">
                    <h4 className="text-sm font-semibold">John Doe</h4>
                    <p className="text-sm text-muted-foreground">
                      Senior Software Engineer
                    </p>
                    <div className="flex items-center gap-2 pt-2">
                      <Mail className="h-4 w-4 opacity-70" />
                      <span className="text-xs text-muted-foreground">
                        john.doe@wex.com
                      </span>
                    </div>
                  </div>
                </div>
              </WexHoverCard.Content>
            </WexHoverCard>
          </ExampleCard>

          <ExampleCard title="Link Preview" description="Preview external links on hover.">
            <WexHoverCard>
              <WexHoverCard.Trigger asChild>
                <a href="#" className="inline-flex items-center gap-1 text-link underline underline-offset-4 hover:text-link-hover">
                  <ExternalLink className="h-4 w-4" />
                  External Link
                </a>
              </WexHoverCard.Trigger>
              <WexHoverCard.Content className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Example Website</h4>
                  <p className="text-sm text-muted-foreground">
                    A brief description of the external website content that will
                    be displayed when following this link.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    example.com
                  </div>
                </div>
              </WexHoverCard.Content>
            </WexHoverCard>
          </ExampleCard>

          <ExampleCard title="Repository Info" description="Preview repository details.">
            <WexHoverCard>
              <WexHoverCard.Trigger asChild>
                <a href="#" className="inline-flex items-center gap-2 text-link underline underline-offset-4 hover:text-link-hover">
                  <Github className="h-4 w-4" />
                  wex-brand
                </a>
              </WexHoverCard.Trigger>
              <WexHoverCard.Content className="w-80">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    <h4 className="text-sm font-semibold">wex-inc/wex-brand</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    WEX Design System - React components and design tokens.
                  </p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>TypeScript</span>
                    <span>MIT License</span>
                    <span>Updated 2h ago</span>
                  </div>
                </div>
              </WexHoverCard.Content>
            </WexHoverCard>
          </ExampleCard>

          <ExampleCard title="Different Alignments" description="Content can align to different sides.">
            <div className="flex gap-4">
              <WexHoverCard>
                <WexHoverCard.Trigger asChild>
                  <WexButton intent="outline" size="sm">Align Start</WexButton>
                </WexHoverCard.Trigger>
                <WexHoverCard.Content align="start" className="w-64">
                  <p className="text-sm">Content aligned to start.</p>
                </WexHoverCard.Content>
              </WexHoverCard>

              <WexHoverCard>
                <WexHoverCard.Trigger asChild>
                  <WexButton intent="outline" size="sm">Align Center</WexButton>
                </WexHoverCard.Trigger>
                <WexHoverCard.Content align="center" className="w-64">
                  <p className="text-sm">Content aligned to center.</p>
                </WexHoverCard.Content>
              </WexHoverCard>

              <WexHoverCard>
                <WexHoverCard.Trigger asChild>
                  <WexButton intent="outline" size="sm">Align End</WexButton>
                </WexHoverCard.Trigger>
                <WexHoverCard.Content align="end" className="w-64">
                  <p className="text-sm">Content aligned to end.</p>
                </WexHoverCard.Content>
              </WexHoverCard>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="States" description="Hover card interaction states.">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Hover State</h3>
            <p className="text-sm text-muted-foreground">
              Content appears when hovering over the trigger. There's a small delay
              before showing to prevent accidental triggers.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Open Delay</h3>
            <p className="text-sm text-muted-foreground">
              By default, there's a short delay before the card appears. Use the{" "}
              <code className="bg-muted px-1 rounded">openDelay</code> prop to customize.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Close Delay</h3>
            <p className="text-sm text-muted-foreground">
              A delay before closing allows users to move to the card content.
              Use the <code className="bg-muted px-1 rounded">closeDelay</code> prop to customize.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Mouse and Keyboard</h3>
            <p className="text-sm text-muted-foreground">
              HoverCard opens on hover for mouse users. For keyboard users,
              focus on the trigger will also open the card.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Touch Devices</h3>
            <p className="text-sm text-muted-foreground">
              On touch devices where hover isn't available, the card opens on tap.
              Consider alternative patterns for touch-first interfaces.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Screen Readers</h3>
            <p className="text-sm text-muted-foreground">
              HoverCard content is announced when triggered. Ensure content
              is meaningful and provides value to all users.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexHoverCard, WexButton, WexAvatar } from "@/components/wex";

// Basic hover card
<WexHoverCard>
  <WexHoverCard.Trigger asChild>
    <WexButton intent="link">@username</WexButton>
  </WexHoverCard.Trigger>
  <WexHoverCard.Content className="w-80">
    <div className="flex justify-between space-x-4">
      <WexAvatar>
        <WexAvatar.Fallback>UN</WexAvatar.Fallback>
      </WexAvatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@username</h4>
        <p className="text-sm">User description here.</p>
      </div>
    </div>
  </WexHoverCard.Content>
</WexHoverCard>

// With custom alignment and delays
<WexHoverCard openDelay={200} closeDelay={100}>
  <WexHoverCard.Trigger asChild>
    <a href="#">Link</a>
  </WexHoverCard.Trigger>
  <WexHoverCard.Content align="start" sideOffset={8}>
    Preview content
  </WexHoverCard.Content>
</WexHoverCard>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable 
          props={hoverCardRootProps}
          subComponents={[
            { name: "WexHoverCard.Trigger", props: [{ name: "asChild", type: "boolean", default: "false", description: "Merge with child element" }] },
            { name: "WexHoverCard.Content", props: hoverCardContentProps },
          ]}
        />
      </Section>

      <TokenReference tokens={hoverCardTokens} className="mt-12" />
    </ComponentPage>
  );
}
