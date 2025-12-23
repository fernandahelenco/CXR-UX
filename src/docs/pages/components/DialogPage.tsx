import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { WexButton, WexInput, WexLabel } from "@/components/wex";

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
          <Dialog>
            <DialogTrigger asChild>
              <WexButton intent="outline">Open Dialog</WexButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>
                  This is a dialog description. It provides context for the dialog content.
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                Dialog content goes here.
              </p>
            </DialogContent>
          </Dialog>
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
            <Dialog key={size}>
              <DialogTrigger asChild>
                <WexButton intent="outline" className="capitalize">{size}</WexButton>
              </DialogTrigger>
              <DialogContent size={size}>
                <DialogHeader>
                  <DialogTitle className="capitalize">{size} Dialog</DialogTitle>
                  <DialogDescription>
                    This dialog uses the {size} size variant.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    {size === "full" 
                      ? "Full screen dialogs are great for complex content or mobile views."
                      : `The ${size} size is suitable for ${size === "sm" ? "simple messages" : size === "md" ? "standard forms" : size === "lg" ? "detailed content" : "complex layouts"}.`
                    }
                  </p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <WexButton>Close</WexButton>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </Section>

      {/* ============================================================
          POSITIONS
          ============================================================ */}
      <Section title="Positions" description="Dialog can appear from different positions.">
        <div className="flex flex-wrap gap-2">
          {(["center", "top", "bottom", "left", "right"] as const).map((position) => (
            <Dialog key={position}>
              <DialogTrigger asChild>
                <WexButton intent="outline" className="capitalize">{position}</WexButton>
              </DialogTrigger>
              <DialogContent position={position} size="sm">
                <DialogHeader>
                  <DialogTitle className="capitalize">{position} Position</DialogTitle>
                  <DialogDescription>
                    This dialog slides in from the {position}.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <WexButton>Close</WexButton>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </Section>

      {/* ============================================================
          MAXIMIZABLE
          ============================================================ */}
      <Section title="Maximizable" description="Dialog with maximize/restore button.">
        <ExampleCard>
          <Dialog>
            <DialogTrigger asChild>
              <WexButton intent="outline">Maximizable Dialog</WexButton>
            </DialogTrigger>
            <DialogContent maximizable size="md">
              <DialogHeader>
                <DialogTitle>Maximizable Dialog</DialogTitle>
                <DialogDescription>
                  Click the maximize button in the header to expand to full screen.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground">
                  This dialog can be maximized for more content space. 
                  Click the expand button to toggle fullscreen mode.
                </p>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <WexButton>Done</WexButton>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ExampleCard>
      </Section>

      {/* ============================================================
          WITH FORM
          ============================================================ */}
      <Section title="With Form" description="Dialog containing form elements.">
        <ExampleCard>
          <Dialog>
            <DialogTrigger asChild>
              <WexButton intent="outline">Edit Profile</WexButton>
            </DialogTrigger>
            <DialogContent size="md">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
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
              <DialogFooter>
                <DialogClose asChild>
                  <WexButton intent="outline">Cancel</WexButton>
                </DialogClose>
                <WexButton>Save changes</WexButton>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Controlled Dialog</DialogTitle>
                  <DialogDescription>
                    This dialog is controlled via React state.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <WexButton onClick={() => setOpen(false)}>Close</WexButton>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
          code={`import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";

// Basic dialog
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    Content here
  </DialogContent>
</Dialog>

// With sizes
<DialogContent size="sm">...</DialogContent>
<DialogContent size="md">...</DialogContent>  {/* default */}
<DialogContent size="lg">...</DialogContent>
<DialogContent size="xl">...</DialogContent>
<DialogContent size="full">...</DialogContent>

// With positions
<DialogContent position="center">...</DialogContent>
<DialogContent position="top">...</DialogContent>
<DialogContent position="bottom">...</DialogContent>
<DialogContent position="left">...</DialogContent>
<DialogContent position="right">...</DialogContent>

// Maximizable
<DialogContent maximizable>...</DialogContent>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>DialogContent Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">size</code>: "sm" | "md" | "lg" | "xl" | "full"</li>
            <li><code className="bg-muted px-1 rounded">position</code>: "center" | "top" | "bottom" | "left" | "right"</li>
            <li><code className="bg-muted px-1 rounded">maximizable</code>: boolean</li>
          </ul>
        </div>
      </Section>

      <TokenReference tokens={dialogTokens} className="mt-12" />
    </ComponentPage>
  );
}
