import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, SubComponentProps, type PropDefinition } from "@/docs/components/PropsTable";
import { WexDropdownMenu, WexButton } from "@/components/wex";

// Props documentation
const dropdownMenuContentProps: PropDefinition[] = [
  { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Preferred side to render" },
  { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment along the side" },
  { name: "sideOffset", type: "number", default: "4", description: "Offset from the trigger" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

const dropdownMenuItemProps: PropDefinition[] = [
  { name: "disabled", type: "boolean", default: "false", description: "Disables the item" },
  { name: "onSelect", type: "(event: Event) => void", description: "Callback when item is selected" },
];

// Token mappings for WexDropdownMenu
// Layer 3 component tokens
const dropdownMenuTokens: TokenRow[] = [
  { element: "Content", property: "Background", token: "--wex-component-menu-content-bg" },
  { element: "Content", property: "Border", token: "--wex-component-menu-content-border" },
  { element: "Item", property: "Text", token: "--wex-component-menu-item-fg" },
  { element: "Item (Focus)", property: "Background", token: "--wex-component-menu-item-focus-bg" },
  { element: "Item (Hover)", property: "Background", token: "--wex-component-menu-item-hover-bg" },
  { element: "Separator", property: "Color", token: "--wex-component-menu-separator" },
  { element: "Shortcut", property: "Text", token: "--wex-component-menu-shortcut-fg" },
  { element: "Disabled", property: "Opacity", token: "--wex-component-menu-disabled-opacity" },
];

export default function DropdownMenuPage() {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [position, setPosition] = React.useState("bottom");

  return (
    <ComponentPage
      title="Dropdown Menu"
      description="Displays a menu of actions or options triggered by a button."
      status="stable"
      registryKey="dropdown-menu"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexDropdownMenu>
            <WexDropdownMenu.Trigger asChild>
              <WexButton intent="outline">Open Menu</WexButton>
            </WexDropdownMenu.Trigger>
            <WexDropdownMenu.Content>
              <WexDropdownMenu.Label>My Account</WexDropdownMenu.Label>
              <WexDropdownMenu.Separator />
              <WexDropdownMenu.Item>Profile</WexDropdownMenu.Item>
              <WexDropdownMenu.Item>Settings</WexDropdownMenu.Item>
              <WexDropdownMenu.Item>Billing</WexDropdownMenu.Item>
              <WexDropdownMenu.Separator />
              <WexDropdownMenu.Item>Logout</WexDropdownMenu.Item>
            </WexDropdownMenu.Content>
          </WexDropdownMenu>
        </ExampleCard>
        <Guidance>
          Dropdown menus are for navigation and actions. For selecting options 
          that affect a value, use Select instead.
        </Guidance>
      </Section>

      <Section title="Variants" description="Different dropdown menu configurations.">
        <div className="space-y-6">
          <ExampleCard title="With Keyboard Shortcuts" description="Show keyboard shortcuts for actions.">
            <WexDropdownMenu>
              <WexDropdownMenu.Trigger asChild>
                <WexButton intent="outline">Edit Menu</WexButton>
              </WexDropdownMenu.Trigger>
              <WexDropdownMenu.Content className="w-56">
                <WexDropdownMenu.Label>Edit</WexDropdownMenu.Label>
                <WexDropdownMenu.Separator />
                <WexDropdownMenu.Item>
                  Undo
                  <WexDropdownMenu.Shortcut>⌘Z</WexDropdownMenu.Shortcut>
                </WexDropdownMenu.Item>
                <WexDropdownMenu.Item>
                  Redo
                  <WexDropdownMenu.Shortcut>⇧⌘Z</WexDropdownMenu.Shortcut>
                </WexDropdownMenu.Item>
                <WexDropdownMenu.Separator />
                <WexDropdownMenu.Item>
                  Cut
                  <WexDropdownMenu.Shortcut>⌘X</WexDropdownMenu.Shortcut>
                </WexDropdownMenu.Item>
                <WexDropdownMenu.Item>
                  Copy
                  <WexDropdownMenu.Shortcut>⌘C</WexDropdownMenu.Shortcut>
                </WexDropdownMenu.Item>
                <WexDropdownMenu.Item>
                  Paste
                  <WexDropdownMenu.Shortcut>⌘V</WexDropdownMenu.Shortcut>
                </WexDropdownMenu.Item>
              </WexDropdownMenu.Content>
            </WexDropdownMenu>
          </ExampleCard>

          <ExampleCard title="With Submenus" description="Nested menu items.">
            <WexDropdownMenu>
              <WexDropdownMenu.Trigger asChild>
                <WexButton intent="outline">File</WexButton>
              </WexDropdownMenu.Trigger>
              <WexDropdownMenu.Content className="w-56">
                <WexDropdownMenu.Group>
                  <WexDropdownMenu.Item>New File</WexDropdownMenu.Item>
                  <WexDropdownMenu.Item>New Window</WexDropdownMenu.Item>
                </WexDropdownMenu.Group>
                <WexDropdownMenu.Separator />
                <WexDropdownMenu.Sub>
                  <WexDropdownMenu.SubTrigger>Share</WexDropdownMenu.SubTrigger>
                  <WexDropdownMenu.SubContent>
                    <WexDropdownMenu.Item>Email</WexDropdownMenu.Item>
                    <WexDropdownMenu.Item>Messages</WexDropdownMenu.Item>
                    <WexDropdownMenu.Item>AirDrop</WexDropdownMenu.Item>
                    <WexDropdownMenu.Separator />
                    <WexDropdownMenu.Item>More...</WexDropdownMenu.Item>
                  </WexDropdownMenu.SubContent>
                </WexDropdownMenu.Sub>
                <WexDropdownMenu.Sub>
                  <WexDropdownMenu.SubTrigger>Export</WexDropdownMenu.SubTrigger>
                  <WexDropdownMenu.SubContent>
                    <WexDropdownMenu.Item>PDF</WexDropdownMenu.Item>
                    <WexDropdownMenu.Item>PNG</WexDropdownMenu.Item>
                    <WexDropdownMenu.Item>SVG</WexDropdownMenu.Item>
                  </WexDropdownMenu.SubContent>
                </WexDropdownMenu.Sub>
                <WexDropdownMenu.Separator />
                <WexDropdownMenu.Item>Print</WexDropdownMenu.Item>
              </WexDropdownMenu.Content>
            </WexDropdownMenu>
          </ExampleCard>

          <ExampleCard title="With Checkboxes" description="Toggle options on/off.">
            <WexDropdownMenu>
              <WexDropdownMenu.Trigger asChild>
                <WexButton intent="outline">View Options</WexButton>
              </WexDropdownMenu.Trigger>
              <WexDropdownMenu.Content className="w-56">
                <WexDropdownMenu.Label>Appearance</WexDropdownMenu.Label>
                <WexDropdownMenu.Separator />
                <WexDropdownMenu.CheckboxItem
                  checked={showStatusBar}
                  onCheckedChange={setShowStatusBar}
                >
                  Status Bar
                </WexDropdownMenu.CheckboxItem>
                <WexDropdownMenu.CheckboxItem
                  checked={showActivityBar}
                  onCheckedChange={setShowActivityBar}
                >
                  Activity Bar
                </WexDropdownMenu.CheckboxItem>
                <WexDropdownMenu.Separator />
                <WexDropdownMenu.CheckboxItem checked disabled>
                  Panel (Always visible)
                </WexDropdownMenu.CheckboxItem>
              </WexDropdownMenu.Content>
            </WexDropdownMenu>
          </ExampleCard>

          <ExampleCard title="With Radio Items" description="Select one option from a group.">
            <WexDropdownMenu>
              <WexDropdownMenu.Trigger asChild>
                <WexButton intent="outline">Position: {position}</WexButton>
              </WexDropdownMenu.Trigger>
              <WexDropdownMenu.Content className="w-56">
                <WexDropdownMenu.Label>Panel Position</WexDropdownMenu.Label>
                <WexDropdownMenu.Separator />
                <WexDropdownMenu.RadioGroup value={position} onValueChange={setPosition}>
                  <WexDropdownMenu.RadioItem value="top">Top</WexDropdownMenu.RadioItem>
                  <WexDropdownMenu.RadioItem value="right">Right</WexDropdownMenu.RadioItem>
                  <WexDropdownMenu.RadioItem value="bottom">Bottom</WexDropdownMenu.RadioItem>
                  <WexDropdownMenu.RadioItem value="left">Left</WexDropdownMenu.RadioItem>
                </WexDropdownMenu.RadioGroup>
              </WexDropdownMenu.Content>
            </WexDropdownMenu>
          </ExampleCard>

          <ExampleCard title="With Disabled Items" description="Some options unavailable.">
            <WexDropdownMenu>
              <WexDropdownMenu.Trigger asChild>
                <WexButton intent="outline">Actions</WexButton>
              </WexDropdownMenu.Trigger>
              <WexDropdownMenu.Content className="w-56">
                <WexDropdownMenu.Item>View Details</WexDropdownMenu.Item>
                <WexDropdownMenu.Item>Edit</WexDropdownMenu.Item>
                <WexDropdownMenu.Item>Duplicate</WexDropdownMenu.Item>
                <WexDropdownMenu.Separator />
                <WexDropdownMenu.Item disabled>
                  Archive (not available)
                </WexDropdownMenu.Item>
                <WexDropdownMenu.Item className="text-destructive">
                  Delete
                </WexDropdownMenu.Item>
              </WexDropdownMenu.Content>
            </WexDropdownMenu>
          </ExampleCard>

          <ExampleCard title="With Groups" description="Organized sections.">
            <WexDropdownMenu>
              <WexDropdownMenu.Trigger asChild>
                <WexButton intent="outline">Account</WexButton>
              </WexDropdownMenu.Trigger>
              <WexDropdownMenu.Content className="w-56">
                <WexDropdownMenu.Label>john@example.com</WexDropdownMenu.Label>
                <WexDropdownMenu.Separator />
                <WexDropdownMenu.Group>
                  <WexDropdownMenu.Item>Profile</WexDropdownMenu.Item>
                  <WexDropdownMenu.Item>Billing</WexDropdownMenu.Item>
                  <WexDropdownMenu.Item>Settings</WexDropdownMenu.Item>
                </WexDropdownMenu.Group>
                <WexDropdownMenu.Separator />
                <WexDropdownMenu.Group>
                  <WexDropdownMenu.Item>Team</WexDropdownMenu.Item>
                  <WexDropdownMenu.Item>Invite Users</WexDropdownMenu.Item>
                  <WexDropdownMenu.Item>New Team</WexDropdownMenu.Item>
                </WexDropdownMenu.Group>
                <WexDropdownMenu.Separator />
                <WexDropdownMenu.Item>Log out</WexDropdownMenu.Item>
              </WexDropdownMenu.Content>
            </WexDropdownMenu>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Enter/Space: Open menu or select item</li>
              <li>Arrow Down: Move to next item</li>
              <li>Arrow Up: Move to previous item</li>
              <li>Arrow Right: Open submenu</li>
              <li>Arrow Left: Close submenu</li>
              <li>Escape: Close menu</li>
              <li>Home/End: Jump to first/last item</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Type Ahead</h3>
            <p className="text-sm text-muted-foreground">
              Type characters to jump to matching menu items quickly.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexDropdownMenu, WexButton } from "@/components/wex";

// Basic menu
<WexDropdownMenu>
  <WexDropdownMenu.Trigger>Open</WexDropdownMenu.Trigger>
  <WexDropdownMenu.Content>
    <WexDropdownMenu.Item>Action 1</WexDropdownMenu.Item>
    <WexDropdownMenu.Item>Action 2</WexDropdownMenu.Item>
  </WexDropdownMenu.Content>
</WexDropdownMenu>

// With checkbox items
const [checked, setChecked] = useState(false);
<WexDropdownMenu.CheckboxItem 
  checked={checked} 
  onCheckedChange={setChecked}
>
  Toggle Option
</WexDropdownMenu.CheckboxItem>

// With radio items
const [value, setValue] = useState("a");
<WexDropdownMenu.RadioGroup value={value} onValueChange={setValue}>
  <WexDropdownMenu.RadioItem value="a">Option A</WexDropdownMenu.RadioItem>
  <WexDropdownMenu.RadioItem value="b">Option B</WexDropdownMenu.RadioItem>
</WexDropdownMenu.RadioGroup>

// With shortcuts
<WexDropdownMenu.Item>
  Save
  <WexDropdownMenu.Shortcut>⌘S</WexDropdownMenu.Shortcut>
</WexDropdownMenu.Item>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={dropdownMenuContentProps} title="WexDropdownMenu.Content" />
        <SubComponentProps name="WexDropdownMenu.Item" props={dropdownMenuItemProps} />
      </Section>

      <TokenReference tokens={dropdownMenuTokens} className="mt-12" />
    </ComponentPage>
  );
}
