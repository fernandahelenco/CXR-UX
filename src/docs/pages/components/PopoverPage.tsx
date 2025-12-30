import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, SubComponentProps, type PropDefinition } from "@/docs/components/PropsTable";
import { WexPopover, WexButton, WexInput, WexLabel, WexCalendar } from "@/components/wex";
import { format } from "date-fns";
import { CalendarIcon, Settings, User } from "lucide-react";

// Props documentation for WexPopover
const popoverRootProps: PropDefinition[] = [
  { name: "open", type: "boolean", description: "Controlled open state" },
  { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes" },
  { name: "modal", type: "boolean", default: "false", description: "Whether to render as modal" },
];

const popoverContentProps: PropDefinition[] = [
  { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Preferred side to render" },
  { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment along the side" },
  { name: "sideOffset", type: "number", default: "4", description: "Offset from the trigger" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

// Token mappings for WexPopover
// Layer 3 component tokens
const popoverTokens: TokenRow[] = [
  { element: "Content", property: "Background", token: "--wex-component-popover-bg" },
  { element: "Content", property: "Text", token: "--wex-component-popover-fg" },
  { element: "Content", property: "Border", token: "--wex-component-popover-border" },
];

export default function PopoverPage() {
  const [date, setDate] = React.useState<Date>();

  return (
    <ComponentPage
      title="Popover"
      description="Displays rich content in a portal, triggered by a button."
      status="stable"
      registryKey="popover"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexPopover>
            <WexPopover.Trigger asChild>
              <WexButton intent="outline">Open Popover</WexButton>
            </WexPopover.Trigger>
            <WexPopover.Content className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <WexLabel htmlFor="width">Width</WexLabel>
                    <WexInput id="width" defaultValue="100%" className="col-span-2 h-8" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <WexLabel htmlFor="height">Height</WexLabel>
                    <WexInput id="height" defaultValue="25px" className="col-span-2 h-8" />
                  </div>
                </div>
              </div>
            </WexPopover.Content>
          </WexPopover>
        </ExampleCard>
        <Guidance>
          Use Popover for interactive content that needs to appear in context.
          For simple text hints, use Tooltip instead.
        </Guidance>
      </Section>

      <Section title="Variants" description="Different popover configurations.">
        <div className="space-y-6">
          <ExampleCard title="Simple Content" description="Basic popover with text.">
            <WexPopover>
              <WexPopover.Trigger asChild>
                <WexButton intent="outline">Info</WexButton>
              </WexPopover.Trigger>
              <WexPopover.Content className="w-64">
                <p className="text-sm">
                  This is a simple popover with just text content. It can be used
                  for quick information display.
                </p>
              </WexPopover.Content>
            </WexPopover>
          </ExampleCard>

          <ExampleCard title="Date Picker" description="Popover with calendar.">
            <WexPopover>
              <WexPopover.Trigger asChild>
                <WexButton
                  intent="outline"
                  className="w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </WexButton>
              </WexPopover.Trigger>
              <WexPopover.Content className="w-auto p-0" align="start">
                <WexCalendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </WexPopover.Content>
            </WexPopover>
          </ExampleCard>

          <ExampleCard title="With Form" description="Popover containing form fields.">
            <WexPopover>
              <WexPopover.Trigger asChild>
                <WexButton intent="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </WexButton>
              </WexPopover.Trigger>
              <WexPopover.Content className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Quick Settings</h4>
                    <p className="text-sm text-muted-foreground">
                      Adjust common settings here.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-4">
                      <WexLabel htmlFor="name" className="w-20">Name</WexLabel>
                      <WexInput id="name" placeholder="Your name" />
                    </div>
                    <div className="flex items-center gap-4">
                      <WexLabel htmlFor="email" className="w-20">Email</WexLabel>
                      <WexInput id="email" type="email" placeholder="email@example.com" />
                    </div>
                  </div>
                  <WexButton size="sm">Save</WexButton>
                </div>
              </WexPopover.Content>
            </WexPopover>
          </ExampleCard>

          <ExampleCard title="User Card" description="Popover showing user details.">
            <WexPopover>
              <WexPopover.Trigger asChild>
                <WexButton intent="outline" className="gap-2">
                  <User className="h-4 w-4" />
                  @johndoe
                </WexButton>
              </WexPopover.Trigger>
              <WexPopover.Content className="w-80">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">John Doe</h4>
                    <p className="text-sm text-muted-foreground">@johndoe</p>
                    <p className="text-sm">
                      Software engineer at WEX. Building great things.
                    </p>
                    <div className="flex gap-4 pt-2">
                      <div className="text-xs">
                        <span className="font-semibold">127</span>{" "}
                        <span className="text-muted-foreground">following</span>
                      </div>
                      <div className="text-xs">
                        <span className="font-semibold">1.4k</span>{" "}
                        <span className="text-muted-foreground">followers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </WexPopover.Content>
            </WexPopover>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Positions" description="Popover can appear on any side.">
        <ExampleCard>
          <div className="flex flex-wrap gap-4 justify-center">
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <WexPopover key={side}>
                <WexPopover.Trigger asChild>
                  <WexButton intent="outline" className="capitalize">
                    {side}
                  </WexButton>
                </WexPopover.Trigger>
                <WexPopover.Content side={side} className="w-48">
                  <p className="text-sm">
                    Popover positioned on {side}.
                  </p>
                </WexPopover.Content>
              </WexPopover>
            ))}
          </div>
        </ExampleCard>
      </Section>

      <Section title="Alignment" description="Control popover alignment along the edge.">
        <ExampleCard>
          <div className="flex flex-wrap gap-4 justify-center">
            {(["start", "center", "end"] as const).map((align) => (
              <WexPopover key={align}>
                <WexPopover.Trigger asChild>
                  <WexButton intent="outline" className="capitalize">
                    Align {align}
                  </WexButton>
                </WexPopover.Trigger>
                <WexPopover.Content align={align} className="w-48">
                  <p className="text-sm">
                    Aligned to {align}.
                  </p>
                </WexPopover.Content>
              </WexPopover>
            ))}
          </div>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Focus Management</h3>
            <p className="text-sm text-muted-foreground">
              When opened, focus moves into the popover. Pressing Escape or
              clicking outside closes the popover and returns focus to the trigger.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Support</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Enter/Space: Open popover (on trigger)</li>
              <li>Escape: Close popover</li>
              <li>Tab: Navigate within popover</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexPopover, WexButton } from "@/components/wex";

// Basic popover
<WexPopover>
  <WexPopover.Trigger asChild>
    <WexButton>Open</WexButton>
  </WexPopover.Trigger>
  <WexPopover.Content>
    Popover content
  </WexPopover.Content>
</WexPopover>

// With positioning
<WexPopover.Content side="right" align="start">
  Content
</WexPopover.Content>

// As date picker
<WexPopover>
  <WexPopover.Trigger asChild>
    <WexButton intent="outline">
      {date ? format(date, "PPP") : "Pick a date"}
    </WexButton>
  </WexPopover.Trigger>
  <WexPopover.Content className="w-auto p-0">
    <Calendar mode="single" selected={date} onSelect={setDate} />
  </WexPopover.Content>
</WexPopover>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={popoverRootProps} title="WexPopover" />
        <SubComponentProps name="WexPopover.Content" props={popoverContentProps} />
      </Section>

      <TokenReference tokens={popoverTokens} className="mt-12" />
    </ComponentPage>
  );
}
