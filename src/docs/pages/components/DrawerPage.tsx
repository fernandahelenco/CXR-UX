import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, SubComponentProps, type PropDefinition } from "@/docs/components/PropsTable";
import { WexDrawer, WexButton, WexInput, WexLabel } from "@/components/wex";

// Props documentation for WexDrawer
const drawerRootProps: PropDefinition[] = [
  { name: "open", type: "boolean", description: "Controlled open state" },
  { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes" },
  { name: "shouldScaleBackground", type: "boolean", default: "true", description: "Whether to scale the background" },
];

const drawerContentProps: PropDefinition[] = [
  { name: "className", type: "string", description: "Additional CSS classes" },
  { name: "children", type: "ReactNode", required: true, description: "Drawer content" },
];

// Token mappings for WexDrawer
// Layer 3 component tokens
const drawerTokens: TokenRow[] = [
  { element: "Overlay", property: "Background", token: "--wex-component-drawer-overlay-bg" },
  { element: "Overlay", property: "Opacity", token: "--wex-component-drawer-overlay-opacity" },
  { element: "Content", property: "Background", token: "--wex-component-drawer-bg" },
  { element: "Content", property: "Border", token: "--wex-component-drawer-border" },
  { element: "Handle", property: "Background", token: "--wex-component-drawer-handle-bg" },
];

export default function DrawerPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <ComponentPage
      title="Drawer"
      description="A drawer that slides in from the bottom of the screen, typically used on mobile."
      status="stable"
      registryKey="drawer"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexDrawer>
            <WexDrawer.Trigger asChild>
              <WexButton intent="outline">Open Drawer</WexButton>
            </WexDrawer.Trigger>
            <WexDrawer.Content>
              <WexDrawer.Header>
                <WexDrawer.Title>Drawer Title</WexDrawer.Title>
                <WexDrawer.Description>Drawer description text.</WexDrawer.Description>
              </WexDrawer.Header>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">Drawer content goes here.</p>
              </div>
              <WexDrawer.Footer>
                <WexDrawer.Close asChild>
                  <WexButton intent="outline">Close</WexButton>
                </WexDrawer.Close>
              </WexDrawer.Footer>
            </WexDrawer.Content>
          </WexDrawer>
        </ExampleCard>
        <Guidance>
          Use Drawer for mobile-first experiences where content slides up from the bottom.
          For desktop side panels, consider using Sheet instead.
        </Guidance>
      </Section>

      <Section title="Variants" description="Different drawer configurations for various use cases.">
        <div className="space-y-6">
          <ExampleCard title="Simple" description="Basic informational drawer.">
            <WexDrawer>
              <WexDrawer.Trigger asChild>
                <WexButton intent="outline">Simple Drawer</WexButton>
              </WexDrawer.Trigger>
              <WexDrawer.Content>
                <WexDrawer.Header>
                  <WexDrawer.Title>Welcome</WexDrawer.Title>
                  <WexDrawer.Description>
                    This is a simple drawer with basic content.
                  </WexDrawer.Description>
                </WexDrawer.Header>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Simple informational content can go here.
                  </p>
                </div>
              </WexDrawer.Content>
            </WexDrawer>
          </ExampleCard>

          <ExampleCard title="With Form" description="Drawer containing a form.">
            <WexDrawer>
              <WexDrawer.Trigger asChild>
                <WexButton intent="outline">Edit Settings</WexButton>
              </WexDrawer.Trigger>
              <WexDrawer.Content>
                <WexDrawer.Header>
                  <WexDrawer.Title>Edit Settings</WexDrawer.Title>
                  <WexDrawer.Description>
                    Make changes to your settings here.
                  </WexDrawer.Description>
                </WexDrawer.Header>
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <WexLabel htmlFor="drawer-name">Name</WexLabel>
                    <WexInput id="drawer-name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <WexLabel htmlFor="drawer-email">Email</WexLabel>
                    <WexInput id="drawer-email" type="email" defaultValue="john@example.com" />
                  </div>
                </div>
                <WexDrawer.Footer>
                  <WexDrawer.Close asChild>
                    <WexButton intent="outline">Cancel</WexButton>
                  </WexDrawer.Close>
                  <WexButton>Save Changes</WexButton>
                </WexDrawer.Footer>
              </WexDrawer.Content>
            </WexDrawer>
          </ExampleCard>

          <ExampleCard title="With Footer Actions" description="Drawer with action buttons.">
            <WexDrawer>
              <WexDrawer.Trigger asChild>
                <WexButton intent="outline">Confirm Action</WexButton>
              </WexDrawer.Trigger>
              <WexDrawer.Content>
                <WexDrawer.Header>
                  <WexDrawer.Title>Confirm Subscription</WexDrawer.Title>
                  <WexDrawer.Description>
                    Review and confirm your subscription details.
                  </WexDrawer.Description>
                </WexDrawer.Header>
                <div className="p-4">
                  <div className="rounded-lg border border-border bg-muted/50 p-4">
                    <p className="text-sm font-medium">Pro Plan - $19/month</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Billed monthly. Cancel anytime.
                    </p>
                  </div>
                </div>
                <WexDrawer.Footer>
                  <WexDrawer.Close asChild>
                    <WexButton intent="outline">Cancel</WexButton>
                  </WexDrawer.Close>
                  <WexButton>Subscribe</WexButton>
                </WexDrawer.Footer>
              </WexDrawer.Content>
            </WexDrawer>
          </ExampleCard>

          <ExampleCard title="Controlled" description="Programmatically control open state.">
            <div className="flex gap-2">
              <WexButton intent="outline" onClick={() => setOpen(true)}>
                Open via State
              </WexButton>
              <WexDrawer open={open} onOpenChange={setOpen}>
                <WexDrawer.Content>
                  <WexDrawer.Header>
                    <WexDrawer.Title>Controlled Drawer</WexDrawer.Title>
                    <WexDrawer.Description>
                      This drawer is controlled via React state.
                    </WexDrawer.Description>
                  </WexDrawer.Header>
                  <WexDrawer.Footer>
                    <WexButton onClick={() => setOpen(false)}>Close</WexButton>
                  </WexDrawer.Footer>
                </WexDrawer.Content>
              </WexDrawer>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="States" description="Drawer interaction states.">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Open State</h3>
            <p className="text-sm text-muted-foreground">
              Drawer slides up from the bottom when opened. Users can drag
              the handle to dismiss or swipe down on mobile devices.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Focus State</h3>
            <p className="text-sm text-muted-foreground">
              When open, focus is trapped within the drawer. The close button and 
              interactive elements show focus rings on keyboard navigation.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Drag Gesture</h3>
            <p className="text-sm text-muted-foreground">
              On touch devices, users can drag the drawer handle to dismiss.
              The drawer snaps to open or closed based on velocity.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Focus Management</h3>
            <p className="text-sm text-muted-foreground">
              Focus is trapped within the drawer when open. Pressing Escape closes
              the drawer and returns focus to the trigger element.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Tab: Move focus to next focusable element</li>
              <li>Shift + Tab: Move focus to previous element</li>
              <li>Escape: Close the drawer</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Screen Readers</h3>
            <p className="text-sm text-muted-foreground">
              The drawer uses proper ARIA roles. Title and description are announced
              when the drawer opens. Use WexDrawer.Title and WexDrawer.Description
              for accessible labeling.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexDrawer, WexButton } from "@/components/wex";

// Basic drawer
<WexDrawer>
  <WexDrawer.Trigger asChild>
    <WexButton>Open</WexButton>
  </WexDrawer.Trigger>
  <WexDrawer.Content>
    <WexDrawer.Header>
      <WexDrawer.Title>Title</WexDrawer.Title>
      <WexDrawer.Description>Description</WexDrawer.Description>
    </WexDrawer.Header>
    <div className="p-4">Content here</div>
    <WexDrawer.Footer>
      <WexDrawer.Close asChild>
        <WexButton intent="outline">Cancel</WexButton>
      </WexDrawer.Close>
      <WexButton>Confirm</WexButton>
    </WexDrawer.Footer>
  </WexDrawer.Content>
</WexDrawer>

// Controlled drawer
const [open, setOpen] = useState(false);

<WexDrawer open={open} onOpenChange={setOpen}>
  <WexDrawer.Trigger asChild>
    <WexButton>Open</WexButton>
  </WexDrawer.Trigger>
  <WexDrawer.Content>
    <WexDrawer.Header>
      <WexDrawer.Title>Controlled</WexDrawer.Title>
    </WexDrawer.Header>
    <WexButton onClick={() => setOpen(false)}>
      Close
    </WexButton>
  </WexDrawer.Content>
</WexDrawer>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={drawerRootProps} title="WexDrawer" />
        <SubComponentProps name="WexDrawer.Content" props={drawerContentProps} />
      </Section>

      <TokenReference tokens={drawerTokens} className="mt-12" />
    </ComponentPage>
  );
}
