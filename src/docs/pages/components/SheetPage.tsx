import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexSheet, WexButton, WexInput, WexLabel } from "@/components/wex";

// Token mappings for WexSheet
// Layer 3 component tokens
const sheetTokens: TokenRow[] = [
  { element: "Overlay", property: "Background", token: "--wex-component-sheet-overlay-bg" },
  { element: "Overlay", property: "Opacity", token: "--wex-component-sheet-overlay-opacity" },
  { element: "Content", property: "Background", token: "--wex-component-sheet-bg" },
  { element: "Content", property: "Border", token: "--wex-component-sheet-border" },
  { element: "Close Button", property: "Hover BG", token: "--wex-component-sheet-close-hover-bg" },
];

export default function SheetPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <ComponentPage
      title="Sheet"
      description="A slide-out panel from the edge of the screen for focused content or navigation."
      status="stable"
      registryKey="sheet"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexSheet>
            <WexSheet.Trigger asChild>
              <WexButton intent="outline">Open Sheet</WexButton>
            </WexSheet.Trigger>
            <WexSheet.Content>
              <WexSheet.Header>
                <WexSheet.Title>Sheet Title</WexSheet.Title>
                <WexSheet.Description>Sheet description text.</WexSheet.Description>
              </WexSheet.Header>
              <div className="py-4">
                <p className="text-sm text-muted-foreground">Sheet content goes here.</p>
              </div>
            </WexSheet.Content>
          </WexSheet>
        </ExampleCard>
        <Guidance>
          Use Sheet for desktop side panels, navigation drawers, or focused content
          that slides in from any edge of the screen.
        </Guidance>
      </Section>

      <Section title="Sides" description="Sheet can slide from any edge of the screen.">
        <div className="flex flex-wrap gap-2">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <WexSheet key={side}>
              <WexSheet.Trigger asChild>
                <WexButton intent="outline" className="capitalize">{side}</WexButton>
              </WexSheet.Trigger>
              <WexSheet.Content side={side}>
                <WexSheet.Header>
                  <WexSheet.Title className="capitalize">{side} Sheet</WexSheet.Title>
                  <WexSheet.Description>
                    This sheet slides in from the {side}.
                  </WexSheet.Description>
                </WexSheet.Header>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Content for the {side} sheet.
                  </p>
                </div>
              </WexSheet.Content>
            </WexSheet>
          ))}
        </div>
      </Section>

      <Section title="Variants" description="Different sheet configurations for various use cases.">
        <div className="space-y-6">
          <ExampleCard title="Navigation" description="Sheet as navigation menu.">
            <WexSheet>
              <WexSheet.Trigger asChild>
                <WexButton intent="outline">Open Menu</WexButton>
              </WexSheet.Trigger>
              <WexSheet.Content side="left">
                <WexSheet.Header>
                  <WexSheet.Title>Navigation</WexSheet.Title>
                </WexSheet.Header>
                <nav className="flex flex-col gap-2 py-4">
                  <a href="#" className="block px-2 py-2 text-sm rounded-md hover:bg-accent">
                    Dashboard
                  </a>
                  <a href="#" className="block px-2 py-2 text-sm rounded-md hover:bg-accent">
                    Settings
                  </a>
                  <a href="#" className="block px-2 py-2 text-sm rounded-md hover:bg-accent">
                    Profile
                  </a>
                  <a href="#" className="block px-2 py-2 text-sm rounded-md hover:bg-accent">
                    Logout
                  </a>
                </nav>
              </WexSheet.Content>
            </WexSheet>
          </ExampleCard>

          <ExampleCard title="With Form" description="Sheet containing a form.">
            <WexSheet>
              <WexSheet.Trigger asChild>
                <WexButton intent="outline">Edit Profile</WexButton>
              </WexSheet.Trigger>
              <WexSheet.Content>
                <WexSheet.Header>
                  <WexSheet.Title>Edit Profile</WexSheet.Title>
                  <WexSheet.Description>
                    Make changes to your profile here. Click save when you're done.
                  </WexSheet.Description>
                </WexSheet.Header>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <WexLabel htmlFor="sheet-name" className="text-right">
                      Name
                    </WexLabel>
                    <WexInput id="sheet-name" defaultValue="John Doe" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <WexLabel htmlFor="sheet-email" className="text-right">
                      Email
                    </WexLabel>
                    <WexInput id="sheet-email" defaultValue="john@example.com" className="col-span-3" />
                  </div>
                </div>
                <WexSheet.Footer>
                  <WexSheet.Close asChild>
                    <WexButton intent="outline">Cancel</WexButton>
                  </WexSheet.Close>
                  <WexButton>Save changes</WexButton>
                </WexSheet.Footer>
              </WexSheet.Content>
            </WexSheet>
          </ExampleCard>

          <ExampleCard title="Controlled" description="Programmatically control open state.">
            <div className="flex gap-2">
              <WexButton intent="outline" onClick={() => setOpen(true)}>
                Open via State
              </WexButton>
              <WexSheet open={open} onOpenChange={setOpen}>
                <WexSheet.Content>
                  <WexSheet.Header>
                    <WexSheet.Title>Controlled Sheet</WexSheet.Title>
                    <WexSheet.Description>
                      This sheet is controlled via React state.
                    </WexSheet.Description>
                  </WexSheet.Header>
                  <WexSheet.Footer>
                    <WexButton onClick={() => setOpen(false)}>Close</WexButton>
                  </WexSheet.Footer>
                </WexSheet.Content>
              </WexSheet>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="States" description="Sheet interaction states.">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Open State</h3>
            <p className="text-sm text-muted-foreground">
              Sheet can be opened via trigger click or controlled via the{" "}
              <code className="bg-muted px-1 rounded">open</code> prop.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Focus State</h3>
            <p className="text-sm text-muted-foreground">
              When open, focus is trapped within the sheet. The close button and 
              interactive elements show focus rings on keyboard navigation.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Overlay</h3>
            <p className="text-sm text-muted-foreground">
              A dimmed overlay appears behind the sheet. Clicking the overlay
              closes the sheet.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Focus Management</h3>
            <p className="text-sm text-muted-foreground">
              Focus is trapped within the sheet when open. Pressing Escape closes
              the sheet and returns focus to the trigger.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Tab: Move focus to next focusable element</li>
              <li>Shift + Tab: Move focus to previous element</li>
              <li>Escape: Close the sheet</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Screen Readers</h3>
            <p className="text-sm text-muted-foreground">
              The sheet uses proper ARIA roles. Title and description are announced
              when opened. Use WexSheet.Title and WexSheet.Description for proper
              accessible labeling.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexSheet, WexButton } from "@/components/wex";

// Basic sheet (right side default)
<WexSheet>
  <WexSheet.Trigger asChild>
    <WexButton>Open</WexButton>
  </WexSheet.Trigger>
  <WexSheet.Content>
    <WexSheet.Header>
      <WexSheet.Title>Title</WexSheet.Title>
      <WexSheet.Description>Description</WexSheet.Description>
    </WexSheet.Header>
    Content here
    <WexSheet.Footer>
      <WexSheet.Close asChild>
        <WexButton intent="outline">Cancel</WexButton>
      </WexSheet.Close>
      <WexButton>Save</WexButton>
    </WexSheet.Footer>
  </WexSheet.Content>
</WexSheet>

// Different sides
<WexSheet.Content side="left">...</WexSheet.Content>
<WexSheet.Content side="top">...</WexSheet.Content>
<WexSheet.Content side="bottom">...</WexSheet.Content>
<WexSheet.Content side="right">...</WexSheet.Content>

// Controlled sheet
const [open, setOpen] = useState(false);

<WexSheet open={open} onOpenChange={setOpen}>
  <WexSheet.Content>...</WexSheet.Content>
</WexSheet>`}
        />
      </Section>

      <TokenReference tokens={sheetTokens} className="mt-12" />
    </ComponentPage>
  );
}
