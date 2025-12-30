import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, SubComponentProps, type PropDefinition } from "@/docs/components/PropsTable";
import { WexLabel, WexSelect } from "@/components/wex";

// Props documentation for WexSelect
const selectRootProps: PropDefinition[] = [
  { name: "value", type: "string", description: "Controlled value of the selected item" },
  { name: "defaultValue", type: "string", description: "Default value for uncontrolled usage" },
  { name: "onValueChange", type: "(value: string) => void", description: "Callback when value changes" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the select" },
  { name: "required", type: "boolean", default: "false", description: "Marks the select as required" },
  { name: "name", type: "string", description: "Name for form submission" },
];

const selectTriggerProps: PropDefinition[] = [
  { name: "className", type: "string", description: "Additional CSS classes" },
  { name: "aria-label", type: "string", description: "Accessible label when no visible label exists" },
  { name: "aria-labelledby", type: "string", description: "ID of the element that labels this trigger" },
];

const selectItemProps: PropDefinition[] = [
  { name: "value", type: "string", required: true, description: "Unique value for the item" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables this option" },
  { name: "children", type: "ReactNode", required: true, description: "Display text for the option" },
];

// Token mappings for WexSelect
// Layer 3 component tokens
const selectTokens: TokenRow[] = [
  { element: "Trigger", property: "Background", token: "--wex-component-select-trigger-bg" },
  { element: "Trigger", property: "Text", token: "--wex-component-select-trigger-fg" },
  { element: "Trigger", property: "Border", token: "--wex-component-select-trigger-border" },
  { element: "Trigger", property: "Focus Ring", token: "--wex-component-select-trigger-focus-ring" },
  { element: "Content", property: "Background", token: "--wex-component-select-content-bg" },
  { element: "Item", property: "Hover Background", token: "--wex-component-select-item-hover-bg" },
  { element: "Item (Selected)", property: "Background", token: "--wex-component-select-item-selected-bg" },
  { element: "Item (Selected)", property: "Text", token: "--wex-component-select-item-selected-fg" },
  { element: "Disabled", property: "Opacity", token: "--wex-component-select-disabled-opacity" },
];

export default function SelectPage() {
  return (
    <ComponentPage
      title="Select"
      description="Dropdown for selecting from a list of options."
      status="stable"
      registryKey="select"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="w-full max-w-sm space-y-2">
            <WexLabel id="fruit-label">Favorite Fruit</WexLabel>
            <WexSelect>
              <WexSelect.Trigger aria-labelledby="fruit-label">
                <WexSelect.Value placeholder="Select a fruit" />
              </WexSelect.Trigger>
              <WexSelect.Content>
                <WexSelect.Item value="apple">Apple</WexSelect.Item>
                <WexSelect.Item value="banana">Banana</WexSelect.Item>
                <WexSelect.Item value="orange">Orange</WexSelect.Item>
                <WexSelect.Item value="grape">Grape</WexSelect.Item>
                <WexSelect.Item value="mango">Mango</WexSelect.Item>
              </WexSelect.Content>
            </WexSelect>
          </div>
        </ExampleCard>
      </Section>

      <Section title="Variants" description="Different select configurations.">
        <div className="space-y-4">
          <ExampleCard title="Basic Select" description="Simple dropdown with flat list.">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel id="country-label">Country</WexLabel>
              <WexSelect>
                <WexSelect.Trigger aria-labelledby="country-label">
                  <WexSelect.Value placeholder="Select a country" />
                </WexSelect.Trigger>
                <WexSelect.Content>
                  <WexSelect.Item value="us">United States</WexSelect.Item>
                  <WexSelect.Item value="uk">United Kingdom</WexSelect.Item>
                  <WexSelect.Item value="ca">Canada</WexSelect.Item>
                  <WexSelect.Item value="au">Australia</WexSelect.Item>
                  <WexSelect.Item value="de">Germany</WexSelect.Item>
                  <WexSelect.Item value="fr">France</WexSelect.Item>
                </WexSelect.Content>
              </WexSelect>
            </div>
          </ExampleCard>

          <ExampleCard title="Grouped Options" description="Options organized into groups.">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel id="timezone-label">Timezone</WexLabel>
              <WexSelect>
                <WexSelect.Trigger aria-labelledby="timezone-label">
                  <WexSelect.Value placeholder="Select timezone" />
                </WexSelect.Trigger>
                <WexSelect.Content>
                  <WexSelect.Group>
                    <WexSelect.Label>North America</WexSelect.Label>
                    <WexSelect.Item value="pst">Pacific Time (PST)</WexSelect.Item>
                    <WexSelect.Item value="mst">Mountain Time (MST)</WexSelect.Item>
                    <WexSelect.Item value="cst">Central Time (CST)</WexSelect.Item>
                    <WexSelect.Item value="est">Eastern Time (EST)</WexSelect.Item>
                  </WexSelect.Group>
                  <WexSelect.Group>
                    <WexSelect.Label>Europe</WexSelect.Label>
                    <WexSelect.Item value="gmt">Greenwich Mean Time (GMT)</WexSelect.Item>
                    <WexSelect.Item value="cet">Central European Time (CET)</WexSelect.Item>
                    <WexSelect.Item value="eet">Eastern European Time (EET)</WexSelect.Item>
                  </WexSelect.Group>
                </WexSelect.Content>
              </WexSelect>
            </div>
          </ExampleCard>

          <ExampleCard title="With Default Value" description="Pre-selected option.">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel id="priority-label">Priority</WexLabel>
              <WexSelect defaultValue="medium">
                <WexSelect.Trigger aria-labelledby="priority-label">
                  <WexSelect.Value placeholder="Select priority" />
                </WexSelect.Trigger>
                <WexSelect.Content>
                  <WexSelect.Item value="low">Low</WexSelect.Item>
                  <WexSelect.Item value="medium">Medium</WexSelect.Item>
                  <WexSelect.Item value="high">High</WexSelect.Item>
                  <WexSelect.Item value="urgent">Urgent</WexSelect.Item>
                </WexSelect.Content>
              </WexSelect>
            </div>
          </ExampleCard>

          <ExampleCard title="Required Field" description="Select marked as required.">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel id="account-type-label">
                Account Type <span className="text-destructive">*</span>
              </WexLabel>
              <WexSelect required>
                <WexSelect.Trigger aria-labelledby="account-type-label">
                  <WexSelect.Value placeholder="Select account type" />
                </WexSelect.Trigger>
                <WexSelect.Content>
                  <WexSelect.Item value="personal">Personal</WexSelect.Item>
                  <WexSelect.Item value="business">Business</WexSelect.Item>
                  <WexSelect.Item value="enterprise">Enterprise</WexSelect.Item>
                </WexSelect.Content>
              </WexSelect>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="States" description="Interactive and visual states.">
        <div className="space-y-4">
          <ExampleCard title="Default" description="Normal interactive state.">
            <WexSelect>
              <WexSelect.Trigger className="w-64" aria-label="Select an option">
                <WexSelect.Value placeholder="Click to open" />
              </WexSelect.Trigger>
              <WexSelect.Content>
                <WexSelect.Item value="1">Option 1</WexSelect.Item>
                <WexSelect.Item value="2">Option 2</WexSelect.Item>
              </WexSelect.Content>
            </WexSelect>
          </ExampleCard>

          <ExampleCard title="Disabled" description="Non-interactive disabled state.">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel id="department-label">Department (Locked)</WexLabel>
              <WexSelect disabled>
                <WexSelect.Trigger aria-labelledby="department-label">
                  <WexSelect.Value placeholder="Cannot change" />
                </WexSelect.Trigger>
                <WexSelect.Content>
                  <WexSelect.Item value="locked">Locked Option</WexSelect.Item>
                </WexSelect.Content>
              </WexSelect>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled Option" description="Individual options can be disabled.">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel id="subscription-label">Subscription Plan</WexLabel>
              <WexSelect>
                <WexSelect.Trigger aria-labelledby="subscription-label">
                  <WexSelect.Value placeholder="Select a plan" />
                </WexSelect.Trigger>
                <WexSelect.Content>
                  <WexSelect.Item value="free">Free</WexSelect.Item>
                  <WexSelect.Item value="pro">Pro</WexSelect.Item>
                  <WexSelect.Item value="enterprise" disabled>Enterprise (Contact Sales)</WexSelect.Item>
                </WexSelect.Content>
              </WexSelect>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Sizing">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Accessible Height</h3>
          <p className="text-sm text-muted-foreground">
            Select trigger is 44px (h-11) to meet WCAG 2.5.5 touch target requirements.
            This ensures usability on touch devices.
          </p>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Enter/Space: Open select dropdown</li>
              <li>Arrow Up/Down: Navigate options</li>
              <li>Enter: Select highlighted option</li>
              <li>Escape: Close dropdown without selecting</li>
              <li>Type characters: Jump to matching option</li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Screen Reader Support</h3>
            <p className="text-sm text-muted-foreground">
              Select uses proper ARIA attributes for screen reader compatibility.
              The selected value is announced when the trigger receives focus.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexSelect } from "@/components/wex";

// Basic usage
<WexSelect>
  <WexSelect.Trigger>
    <WexSelect.Value placeholder="Select..." />
  </WexSelect.Trigger>
  <WexSelect.Content>
    <WexSelect.Item value="option1">Option 1</WexSelect.Item>
    <WexSelect.Item value="option2">Option 2</WexSelect.Item>
  </WexSelect.Content>
</WexSelect>

// With groups
<WexSelect>
  <WexSelect.Trigger>
    <WexSelect.Value placeholder="Select..." />
  </WexSelect.Trigger>
  <WexSelect.Content>
    <WexSelect.Group>
      <WexSelect.Label>Group Label</WexSelect.Label>
      <WexSelect.Item value="a">Option A</WexSelect.Item>
      <WexSelect.Item value="b">Option B</WexSelect.Item>
    </WexSelect.Group>
  </WexSelect.Content>
</WexSelect>

// Controlled
const [value, setValue] = useState("");
<WexSelect value={value} onValueChange={setValue}>
  ...
</WexSelect>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={selectRootProps} title="WexSelect" />
        <SubComponentProps name="WexSelect.Trigger" props={selectTriggerProps} />
        <SubComponentProps name="WexSelect.Item" props={selectItemProps} />
      </Section>

      <TokenReference tokens={selectTokens} className="mt-12" />
    </ComponentPage>
  );
}
