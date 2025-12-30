import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, SubComponentProps, type PropDefinition } from "@/docs/components/PropsTable";
import { WexCommand, WexButton } from "@/components/wex";
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-react";

// Props documentation
const commandInputProps: PropDefinition[] = [
  { name: "placeholder", type: "string", description: "Placeholder text for the search input" },
  { name: "value", type: "string", description: "Controlled value" },
  { name: "onValueChange", type: "(value: string) => void", description: "Callback when value changes" },
];

const commandItemProps: PropDefinition[] = [
  { name: "value", type: "string", description: "Search value for filtering" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the item" },
  { name: "onSelect", type: "(value: string) => void", description: "Callback when item is selected" },
];

// Token mappings for WexCommand
// Layer 3 component tokens
const commandTokens: TokenRow[] = [
  { element: "Container", property: "Background", token: "--wex-component-command-bg" },
  { element: "Container", property: "Border", token: "--wex-component-command-border" },
  { element: "Input", property: "Placeholder", token: "--wex-component-command-input-placeholder" },
  { element: "Item (Hover)", property: "Background", token: "--wex-component-command-item-hover-bg" },
  { element: "Item (Selected)", property: "Background", token: "--wex-component-command-item-selected-bg" },
  { element: "Group Heading", property: "Text", token: "--wex-component-command-group-heading" },
  { element: "Separator", property: "Color", token: "--wex-component-command-separator" },
  { element: "Empty", property: "Text", token: "--wex-component-command-empty-fg" },
];

export default function CommandPage() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <ComponentPage
      title="Command"
      description="Command palette for keyboard-first navigation and search."
      status="stable"
      registryKey="command"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexCommand className="rounded-lg border shadow-md max-w-md">
            <WexCommand.Input placeholder="Type a command or search..." />
            <WexCommand.List>
              <WexCommand.Empty>No results found.</WexCommand.Empty>
              <WexCommand.Group heading="Suggestions">
                <WexCommand.Item>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </WexCommand.Item>
                <WexCommand.Item>
                  <Smile className="mr-2 h-4 w-4" />
                  <span>Search Emoji</span>
                </WexCommand.Item>
                <WexCommand.Item>
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculator</span>
                </WexCommand.Item>
              </WexCommand.Group>
              <WexCommand.Separator />
              <WexCommand.Group heading="Settings">
                <WexCommand.Item>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <WexCommand.Shortcut>⌘P</WexCommand.Shortcut>
                </WexCommand.Item>
                <WexCommand.Item>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <WexCommand.Shortcut>⌘B</WexCommand.Shortcut>
                </WexCommand.Item>
                <WexCommand.Item>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <WexCommand.Shortcut>⌘S</WexCommand.Shortcut>
                </WexCommand.Item>
              </WexCommand.Group>
            </WexCommand.List>
          </WexCommand>
        </ExampleCard>
      </Section>

      <Section title="Dialog Mode" description="Command palette in a dialog overlay.">
        <ExampleCard title="Press ⌘K to open">
          <p className="text-sm text-muted-foreground mb-4">
            Try pressing{" "}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </p>
          <WexButton intent="outline" onClick={() => setOpen(true)}>
            Open Command Palette
          </WexButton>
          <WexCommand.Dialog open={open} onOpenChange={setOpen}>
            <WexCommand.Input placeholder="Type a command or search..." />
            <WexCommand.List>
              <WexCommand.Empty>No results found.</WexCommand.Empty>
              <WexCommand.Group heading="Suggestions">
                <WexCommand.Item onSelect={() => setOpen(false)}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </WexCommand.Item>
                <WexCommand.Item onSelect={() => setOpen(false)}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </WexCommand.Item>
              </WexCommand.Group>
            </WexCommand.List>
          </WexCommand.Dialog>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">WCAG 2.2 Level AA Compliant</h3>
            <p className="text-sm text-muted-foreground">
              This component meets WCAG 2.2 Level AA accessibility requirements.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Arrow Up/Down: Navigate between items</li>
              <li>Enter: Select focused item</li>
              <li>Escape: Close dialog</li>
              <li>⌘K / Ctrl+K: Toggle dialog (when enabled)</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">ARIA Roles</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><code className="bg-muted px-1 rounded">role="combobox"</code>: On input</li>
              <li><code className="bg-muted px-1 rounded">role="listbox"</code>: On results list</li>
              <li><code className="bg-muted px-1 rounded">aria-selected</code>: Managed automatically</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexCommand, WexButton } from "@/components/wex";
import { Calendar, Settings } from "lucide-react";

// Inline command
<WexCommand className="rounded-lg border shadow-md">
  <WexCommand.Input placeholder="Search..." />
  <WexCommand.List>
    <WexCommand.Empty>No results found.</WexCommand.Empty>
    <WexCommand.Group heading="Suggestions">
      <WexCommand.Item>
        <Calendar className="mr-2 h-4 w-4" />
        <span>Calendar</span>
      </WexCommand.Item>
    </WexCommand.Group>
  </WexCommand.List>
</WexCommand>

// Dialog mode
const [open, setOpen] = useState(false);

<WexCommand.Dialog open={open} onOpenChange={setOpen}>
  <WexCommand.Input placeholder="Search..." />
  <WexCommand.List>
    <WexCommand.Item onSelect={() => setOpen(false)}>
      <Settings className="mr-2 h-4 w-4" />
      <span>Settings</span>
    </WexCommand.Item>
  </WexCommand.List>
</WexCommand.Dialog>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={commandInputProps} title="WexCommand.Input" />
        <SubComponentProps name="WexCommand.Item" props={commandItemProps} />
      </Section>

      <TokenReference tokens={commandTokens} className="mt-12" />
    </ComponentPage>
  );
}
