import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexSwitch, WexLabel } from "@/components/wex";

// Props documentation for WexSwitch
const switchProps: PropDefinition[] = [
  { name: "checked", type: "boolean", description: "Controlled checked state" },
  { name: "defaultChecked", type: "boolean", default: "false", description: "Default checked state for uncontrolled usage" },
  { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Callback when checked state changes" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the switch" },
  { name: "required", type: "boolean", default: "false", description: "Marks the switch as required" },
  { name: "name", type: "string", description: "Name for form submission" },
  { name: "value", type: "string", default: '"on"', description: "Value for form submission" },
  { name: "id", type: "string", description: "ID for label association" },
];

// Token mappings for Switch
// Layer 3 component tokens
const switchTokens: TokenRow[] = [
  { element: "Track (Off)", property: "Background", token: "--wex-component-switch-bg" },
  { element: "Track (On)", property: "Background", token: "--wex-component-switch-checked-bg" },
  { element: "Thumb", property: "Background", token: "--wex-component-switch-thumb" },
  { element: "Focus Ring", property: "Color", token: "--wex-component-switch-focus-ring" },
  { element: "Disabled", property: "Opacity", token: "--wex-component-switch-disabled-opacity" },
];

export default function SwitchPage() {
  return (
    <ComponentPage
      title="Switch"
      description="A toggle control for switching between on and off states."
      status="stable"
      registryKey="switch"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="flex items-center space-x-2">
            <WexSwitch id="airplane-mode" />
            <WexLabel htmlFor="airplane-mode">Airplane Mode</WexLabel>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          STATES
          ============================================================ */}
      <Section title="States" description="Switch supports multiple interactive states.">
        <div className="space-y-4">
          <ExampleCard title="Off">
            <div className="flex items-center space-x-2">
              <WexSwitch id="off-state" />
              <WexLabel htmlFor="off-state">Feature disabled</WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="On">
            <div className="flex items-center space-x-2">
              <WexSwitch id="on-state" defaultChecked />
              <WexLabel htmlFor="on-state">Feature enabled</WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled Off">
            <div className="flex items-center space-x-2">
              <WexSwitch id="disabled-off" disabled />
              <WexLabel htmlFor="disabled-off" className="text-muted-foreground">
                Unavailable feature
              </WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled On">
            <div className="flex items-center space-x-2">
              <WexSwitch id="disabled-on" disabled defaultChecked />
              <WexLabel htmlFor="disabled-on" className="text-muted-foreground">
                Locked enabled
              </WexLabel>
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          SETTINGS PATTERN
          ============================================================ */}
      <Section title="Settings Pattern" description="Common switch usage for settings.">
        <ExampleCard>
          <div className="space-y-6 w-full max-w-md">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <WexLabel htmlFor="notifications">Push Notifications</WexLabel>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications on your device.
                </p>
              </div>
              <WexSwitch id="notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <WexLabel htmlFor="marketing">Marketing Emails</WexLabel>
                <p className="text-sm text-muted-foreground">
                  Receive emails about new features and products.
                </p>
              </div>
              <WexSwitch id="marketing" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <WexLabel htmlFor="dark-mode">Dark Mode</WexLabel>
                <p className="text-sm text-muted-foreground">
                  Use dark theme across the application.
                </p>
              </div>
              <WexSwitch id="dark-mode" defaultChecked />
            </div>
          </div>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Label Association</h3>
            <p className="text-sm text-muted-foreground">
              Always use Label with matching htmlFor and id attributes.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Tab: Move focus to/from switch</li>
              <li>Space: Toggle switch state</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Switch vs Checkbox</h3>
            <p className="text-sm text-muted-foreground">
              Use Switch for immediate-effect binary settings.
              Use Checkbox for options requiring form submission.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexSwitch } from "@/components/wex";

// With label
<div className="flex items-center space-x-2">
  <WexSwitch id="feature" />
  <Label htmlFor="feature">Enable feature</Label>
</div>

// Controlled
const [enabled, setEnabled] = useState(false);
<WexSwitch 
  checked={enabled} 
  onCheckedChange={setEnabled} 
/>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={switchProps} />
      </Section>

      <TokenReference tokens={switchTokens} className="mt-12" />
    </ComponentPage>
  );
}
