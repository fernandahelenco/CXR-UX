import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { WexButton, WexInput, WexLabel } from "@/components/wex";

// Token mappings for Sheet
// Layer 3 component tokens
const sheetTokens: TokenRow[] = [
  { element: "Overlay", property: "Background", token: "--wex-component-sheet-overlay-bg" },
  { element: "Content", property: "Background", token: "--wex-component-sheet-bg" },
  { element: "Content", property: "Border", token: "--wex-component-sheet-border" },
  { element: "Close Button", property: "Hover BG", token: "--wex-component-sheet-close-hover-bg" },
];

export default function SheetPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <ComponentPage
      title="Sheet"
      description="A slide-out panel with size variants for navigation and focused content."
      status="stable"
      registryKey="sheet"
    >
      <Section title="Overview">
        <ExampleCard>
          <Sheet>
            <SheetTrigger asChild>
              <WexButton intent="outline">Open Sheet</WexButton>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Sheet Title</SheetTitle>
                <SheetDescription>Sheet description text.</SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground">Sheet content goes here.</p>
              </div>
            </SheetContent>
          </Sheet>
        </ExampleCard>
        <Guidance>
          Use Sheet for desktop side panels, navigation drawers, or focused content
          that slides in from any edge of the screen.
        </Guidance>
      </Section>

      {/* ============================================================
          SIZES
          ============================================================ */}
      <Section title="Sizes" description="Five size variants for different content needs.">
        <div className="flex flex-wrap gap-2">
          {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
            <Sheet key={size}>
              <SheetTrigger asChild>
                <WexButton intent="outline" className="capitalize">{size}</WexButton>
              </SheetTrigger>
              <SheetContent size={size}>
                <SheetHeader>
                  <SheetTitle className="capitalize">{size} Sheet</SheetTitle>
                  <SheetDescription>
                    This sheet uses the {size} size variant.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    {size === "full" 
                      ? "Full screen sheets cover the entire viewport."
                      : `The ${size} size is suitable for ${size === "sm" ? "compact menus" : size === "md" ? "standard panels" : size === "lg" ? "detailed content" : "complex layouts"}.`
                    }
                  </p>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <WexButton>Close</WexButton>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </Section>

      {/* ============================================================
          SIDES
          ============================================================ */}
      <Section title="Sides" description="Sheet can slide from any edge of the screen.">
        <div className="flex flex-wrap gap-2">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <WexButton intent="outline" className="capitalize">{side}</WexButton>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle className="capitalize">{side} Sheet</SheetTitle>
                  <SheetDescription>
                    This sheet slides in from the {side}.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Content for the {side} sheet.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </Section>

      {/* ============================================================
          NAVIGATION
          ============================================================ */}
      <Section title="Navigation Pattern" description="Sheet as navigation menu.">
        <ExampleCard>
          <Sheet>
            <SheetTrigger asChild>
              <WexButton intent="outline">Open Menu</WexButton>
            </SheetTrigger>
            <SheetContent side="left" size="sm">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
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
            </SheetContent>
          </Sheet>
        </ExampleCard>
      </Section>

      {/* ============================================================
          WITH FORM
          ============================================================ */}
      <Section title="With Form" description="Sheet containing form elements.">
        <ExampleCard>
          <Sheet>
            <SheetTrigger asChild>
              <WexButton intent="outline">Edit Profile</WexButton>
            </SheetTrigger>
            <SheetContent size="md">
              <SheetHeader>
                <SheetTitle>Edit Profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <WexLabel htmlFor="sheet-name" className="text-right">Name</WexLabel>
                  <WexInput id="sheet-name" defaultValue="John Doe" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <WexLabel htmlFor="sheet-email" className="text-right">Email</WexLabel>
                  <WexInput id="sheet-email" defaultValue="john@example.com" className="col-span-3" />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <WexButton intent="outline">Cancel</WexButton>
                </SheetClose>
                <WexButton>Save changes</WexButton>
              </SheetFooter>
            </SheetContent>
          </Sheet>
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
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Controlled Sheet</SheetTitle>
                  <SheetDescription>
                    This sheet is controlled via React state.
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                  <WexButton onClick={() => setOpen(false)}>Close</WexButton>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </ExampleCard>
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
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger, SheetClose } from "@/components/ui/sheet";

// Basic sheet
<Sheet>
  <SheetTrigger asChild>
    <Button>Open</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
      <SheetDescription>Description</SheetDescription>
    </SheetHeader>
    Content here
  </SheetContent>
</Sheet>

// With sizes
<SheetContent size="sm">...</SheetContent>
<SheetContent size="md">...</SheetContent>  {/* default */}
<SheetContent size="lg">...</SheetContent>
<SheetContent size="xl">...</SheetContent>
<SheetContent size="full">...</SheetContent>

// With sides
<SheetContent side="left">...</SheetContent>
<SheetContent side="right">...</SheetContent>  {/* default */}
<SheetContent side="top">...</SheetContent>
<SheetContent side="bottom">...</SheetContent>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>SheetContent Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">side</code>: "top" | "right" | "bottom" | "left"</li>
            <li><code className="bg-muted px-1 rounded">size</code>: "sm" | "md" | "lg" | "xl" | "full"</li>
          </ul>
        </div>
      </Section>

      <TokenReference tokens={sheetTokens} className="mt-12" />
    </ComponentPage>
  );
}
