import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, SubComponentProps, type PropDefinition } from "@/docs/components/PropsTable";
import { WexDialog, WexButton, WexInput, WexLabel } from "@/components/wex";

// Props documentation for WexDialog
const dialogRootProps: PropDefinition[] = [
  { name: "open", type: "boolean", description: "Controlled open state" },
  { name: "defaultOpen", type: "boolean", default: "false", description: "Default open state for uncontrolled usage" },
  { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes" },
  { name: "modal", type: "boolean", default: "true", description: "Whether to render as modal with backdrop" },
];

const dialogContentProps: PropDefinition[] = [
  { name: "size", type: '"sm" | "md" | "lg" | "xl" | "full"', default: '"md"', description: "Dialog width size variant" },
  { name: "position", type: '"center" | "top" | "bottom" | "left" | "right"', default: '"center"', description: "Position of the dialog" },
  { name: "maximizable", type: "boolean", default: "false", description: "Show maximize/restore button" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

const dialogTriggerProps: PropDefinition[] = [
  { name: "asChild", type: "boolean", default: "false", description: "Render as child element (polymorphic)" },
];

// Token mappings for Dialog
// Layer 3 component tokens
const dialogTokens: TokenRow[] = [
  { element: "Overlay", property: "Background", token: "--wex-component-dialog-overlay-bg" },
  { element: "Content", property: "Background", token: "--wex-component-dialog-bg" },
  { element: "Content", property: "Border", token: "--wex-component-dialog-border" },
  { element: "Header/Title", property: "Text", token: "--wex-component-dialog-header-fg" },
  { element: "Close Button", property: "Hover BG", token: "--wex-component-dialog-close-hover-bg" },
];

export default function DialogPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <ComponentPage
      title="Dialog"
      description="A modal dialog with size variants, positions, and maximizable option."
      status="stable"
      registryKey="dialog"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexDialog>
            <WexDialog.Trigger asChild>
              <WexButton intent="outline">Open Dialog</WexButton>
            </WexDialog.Trigger>
            <WexDialog.Content>
              <WexDialog.Header>
                <WexDialog.Title>Dialog Title</WexDialog.Title>
                <WexDialog.Description>
                  This is a dialog description. It provides context for the dialog content.
                </WexDialog.Description>
              </WexDialog.Header>
              <p className="text-sm text-muted-foreground">
                Dialog content goes here.
              </p>
            </WexDialog.Content>
          </WexDialog>
        </ExampleCard>
        <Guidance>
          Use Dialog for content that requires user attention but doesn't require an 
          immediate decision. For confirmations, use AlertDialog instead.
        </Guidance>
      </Section>

      {/* ============================================================
          SIZES
          ============================================================ */}
      <Section title="Sizes" description="Five size variants from small to full screen.">
        <div className="flex flex-wrap gap-2">
          {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
            <WexDialog key={size}>
              <WexDialog.Trigger asChild>
                <WexButton intent="outline" className="capitalize">{size}</WexButton>
              </WexDialog.Trigger>
              <WexDialog.Content size={size}>
                <WexDialog.Header>
                  <WexDialog.Title className="capitalize">{size} Dialog</WexDialog.Title>
                  <WexDialog.Description>
                    This dialog uses the {size} size variant.
                  </WexDialog.Description>
                </WexDialog.Header>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    {size === "full" 
                      ? "Full screen dialogs are great for complex content or mobile views."
                      : `The ${size} size is suitable for ${size === "sm" ? "simple messages" : size === "md" ? "standard forms" : size === "lg" ? "detailed content" : "complex layouts"}.`
                    }
                  </p>
                </div>
                <WexDialog.Footer>
                  <WexDialog.Close asChild>
                    <WexButton>Close</WexButton>
                  </WexDialog.Close>
                </WexDialog.Footer>
              </WexDialog.Content>
            </WexDialog>
          ))}
        </div>
      </Section>

      {/* ============================================================
          POSITIONS
          ============================================================ */}
      <Section title="Positions" description="Dialog can appear from different positions.">
        <div className="flex flex-wrap gap-2">
          {(["center", "top", "bottom", "left", "right"] as const).map((position) => (
            <WexDialog key={position}>
              <WexDialog.Trigger asChild>
                <WexButton intent="outline" className="capitalize">{position}</WexButton>
              </WexDialog.Trigger>
              <WexDialog.Content position={position} size="sm">
                <WexDialog.Header>
                  <WexDialog.Title className="capitalize">{position} Position</WexDialog.Title>
                  <WexDialog.Description>
                    This dialog slides in from the {position}.
                  </WexDialog.Description>
                </WexDialog.Header>
                <WexDialog.Footer>
                  <WexDialog.Close asChild>
                    <WexButton>Close</WexButton>
                  </WexDialog.Close>
                </WexDialog.Footer>
              </WexDialog.Content>
            </WexDialog>
          ))}
        </div>
      </Section>

      {/* ============================================================
          MAXIMIZABLE
          ============================================================ */}
      <Section title="Maximizable" description="Dialog with maximize/restore button.">
        <ExampleCard>
          <WexDialog>
            <WexDialog.Trigger asChild>
              <WexButton intent="outline">Maximizable Dialog</WexButton>
            </WexDialog.Trigger>
            <WexDialog.Content maximizable size="md">
              <WexDialog.Header>
                <WexDialog.Title>Maximizable Dialog</WexDialog.Title>
                <WexDialog.Description>
                  Click the maximize button in the header to expand to full screen.
                </WexDialog.Description>
              </WexDialog.Header>
              <div className="py-4">
                <p className="text-sm text-muted-foreground">
                  This dialog can be maximized for more content space. 
                  Click the expand button to toggle fullscreen mode.
                </p>
              </div>
              <WexDialog.Footer>
                <WexDialog.Close asChild>
                  <WexButton>Done</WexButton>
                </WexDialog.Close>
              </WexDialog.Footer>
            </WexDialog.Content>
          </WexDialog>
        </ExampleCard>
      </Section>

      {/* ============================================================
          WITH FORM
          ============================================================ */}
      <Section title="With Form" description="Dialog containing form elements.">
        <ExampleCard>
          <WexDialog>
            <WexDialog.Trigger asChild>
              <WexButton intent="outline">Edit Profile</WexButton>
            </WexDialog.Trigger>
            <WexDialog.Content size="md">
              <WexDialog.Header>
                <WexDialog.Title>Edit Profile</WexDialog.Title>
                <WexDialog.Description>
                  Make changes to your profile here. Click save when you're done.
                </WexDialog.Description>
              </WexDialog.Header>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <WexLabel htmlFor="name" className="text-right">Name</WexLabel>
                  <WexInput id="name" defaultValue="John Doe" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <WexLabel htmlFor="username" className="text-right">Username</WexLabel>
                  <WexInput id="username" defaultValue="@johndoe" className="col-span-3" />
                </div>
              </div>
              <WexDialog.Footer>
                <WexDialog.Close asChild>
                  <WexButton intent="outline">Cancel</WexButton>
                </WexDialog.Close>
                <WexButton>Save changes</WexButton>
              </WexDialog.Footer>
            </WexDialog.Content>
          </WexDialog>
        </ExampleCard>
      </Section>

      {/* ============================================================
          CONTROLLED
          ============================================================ */}
      <Section title="Controlled" description="Programmatically control open state.">
        <ExampleCard>
          <div className="flex gap-2">
            <WexButton intent="outline" onClick={() => setOpen(true)}>
              Open via State
            </WexButton>
            <WexDialog open={open} onOpenChange={setOpen}>
              <WexDialog.Content>
                <WexDialog.Header>
                  <WexDialog.Title>Controlled Dialog</WexDialog.Title>
                  <WexDialog.Description>
                    This dialog is controlled via React state.
                  </WexDialog.Description>
                </WexDialog.Header>
                <WexDialog.Footer>
                  <WexButton onClick={() => setOpen(false)}>Close</WexButton>
                </WexDialog.Footer>
              </WexDialog.Content>
            </WexDialog>
          </div>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Focus Management</h3>
            <p className="text-sm text-muted-foreground">
              Focus is trapped within the dialog when open. Pressing Escape closes
              the dialog and returns focus to the trigger.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Tab: Move focus to next focusable element</li>
              <li>Shift + Tab: Move focus to previous element</li>
              <li>Escape: Close the dialog</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexDialog } from "@/components/wex";

// Basic dialog
<WexDialog>
  <WexDialog.Trigger asChild>
    <Button>Open</Button>
  </WexDialog.Trigger>
  <WexDialog.Content>
    <WexDialog.Header>
      <WexDialog.Title>Title</WexDialog.Title>
      <WexDialog.Description>Description</WexDialog.Description>
    </WexDialog.Header>
    Content here
  </WexDialog.Content>
</WexDialog>

// With sizes
<WexDialog.Content size="sm">...</WexDialog.Content>
<WexDialog.Content size="md">...</WexDialog.Content>  {/* default */}
<WexDialog.Content size="lg">...</WexDialog.Content>
<WexDialog.Content size="xl">...</WexDialog.Content>
<WexDialog.Content size="full">...</WexDialog.Content>

// With positions
<WexDialog.Content position="center">...</WexDialog.Content>
<WexDialog.Content position="top">...</WexDialog.Content>
<WexDialog.Content position="bottom">...</WexDialog.Content>
<WexDialog.Content position="left">...</WexDialog.Content>
<WexDialog.Content position="right">...</WexDialog.Content>

// Maximizable
<WexDialog.Content maximizable>...</WexDialog.Content>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={dialogRootProps} title="WexDialog" />
        <SubComponentProps name="WexDialog.Content" props={dialogContentProps} />
        <SubComponentProps name="WexDialog.Trigger" props={dialogTriggerProps} />
      </Section>

      <TokenReference tokens={dialogTokens} className="mt-12" />
    </ComponentPage>
  );
}
