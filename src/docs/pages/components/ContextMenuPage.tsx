import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexContextMenu } from "@/components/wex";

// Token mappings for WexContextMenu
// Layer 3 component tokens
const contextMenuTokens: TokenRow[] = [
  { element: "Content", property: "Background", token: "--wex-component-menu-content-bg" },
  { element: "Content", property: "Border", token: "--wex-component-menu-content-border" },
  { element: "Item", property: "Text", token: "--wex-component-menu-item-fg" },
  { element: "Item (Focus)", property: "Background", token: "--wex-component-menu-item-focus-bg" },
  { element: "Separator", property: "Color", token: "--wex-component-menu-separator" },
  { element: "Shortcut", property: "Text", token: "--wex-component-menu-shortcut-fg" },
  { element: "Disabled", property: "Opacity", token: "--wex-component-menu-disabled-opacity" },
];

export default function ContextMenuPage() {
  return (
    <ComponentPage
      title="Context Menu"
      description="Displays a menu located at the pointer, triggered by right-click."
      status="stable"
      registryKey="context-menu"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexContextMenu>
            <WexContextMenu.Trigger className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm">
              Right click here
            </WexContextMenu.Trigger>
            <WexContextMenu.Content>
              <WexContextMenu.Item>Profile</WexContextMenu.Item>
              <WexContextMenu.Item>Settings</WexContextMenu.Item>
              <WexContextMenu.Item>Logout</WexContextMenu.Item>
            </WexContextMenu.Content>
          </WexContextMenu>
        </ExampleCard>
      </Section>

      <Section title="With Shortcuts">
        <ExampleCard>
          <WexContextMenu>
            <WexContextMenu.Trigger className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm">
              Right click here
            </WexContextMenu.Trigger>
            <WexContextMenu.Content>
              <WexContextMenu.Item>
                Back <WexContextMenu.Shortcut>⌘[</WexContextMenu.Shortcut>
              </WexContextMenu.Item>
              <WexContextMenu.Item>
                Forward <WexContextMenu.Shortcut>⌘]</WexContextMenu.Shortcut>
              </WexContextMenu.Item>
              <WexContextMenu.Separator />
              <WexContextMenu.Item>
                Reload <WexContextMenu.Shortcut>⌘R</WexContextMenu.Shortcut>
              </WexContextMenu.Item>
            </WexContextMenu.Content>
          </WexContextMenu>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">WCAG 2.1 Level AA Compliant</h3>
            <p className="text-sm text-muted-foreground">
              Context menus are WCAG 2.1 compliant. Note: WCAG 2.2 recommends 
              alternative activation methods for users who cannot right-click.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Right-click or Shift+F10: Open context menu</li>
              <li>Arrow Up/Down: Navigate items</li>
              <li>Enter: Select item</li>
              <li>Escape: Close menu</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Best Practices</h3>
            <p className="text-sm text-muted-foreground">
              Provide alternative ways to access context menu actions for keyboard 
              users who may not be able to right-click.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexContextMenu } from "@/components/wex";

<WexContextMenu>
  <WexContextMenu.Trigger>Right click here</WexContextMenu.Trigger>
  <WexContextMenu.Content>
    <WexContextMenu.Item>Action 1</WexContextMenu.Item>
    <WexContextMenu.Item>Action 2</WexContextMenu.Item>
  </WexContextMenu.Content>
</WexContextMenu>`}
        />
      </Section>

      <TokenReference tokens={contextMenuTokens} className="mt-12" />
    </ComponentPage>
  );
}
