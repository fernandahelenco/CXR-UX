import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexSwitch, WexLabel } from "@/components/wex";

// Token mappings for WexSwitch
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

      <Section title="States" description="Switch supports multiple interactive states.">
        <div className="space-y-4">
          <ExampleCard title="Off" description="Default off/unchecked state.">
            <div className="flex items-center space-x-2">
              <WexSwitch id="off-state" />
              <WexLabel htmlFor="off-state">Feature disabled</WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="On" description="Active on/checked state.">
            <div className="flex items-center space-x-2">
              <WexSwitch id="on-state" defaultChecked />
              <WexLabel htmlFor="on-state">Feature enabled</WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled Off" description="Non-interactive disabled state.">
            <div className="flex items-center space-x-2">
              <WexSwitch id="disabled-off" disabled />
              <WexLabel htmlFor="disabled-off" className="text-muted-foreground">
                Unavailable feature
              </WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled On" description="Disabled but enabled.">
            <div className="flex items-center space-x-2">
              <WexSwitch id="disabled-on" disabled defaultChecked />
              <WexLabel htmlFor="disabled-on" className="text-muted-foreground">
                Locked enabled
              </WexLabel>
            </div>
          </ExampleCard>
        </div>
      </Section>

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

      <Section title="Sizing">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Switch Dimensions</h3>
          <p className="text-sm text-muted-foreground">
            Switch is 24px tall (h-6) and 44px wide (w-11), with a 20px (h-5, w-5) thumb.
            Combined with the label, the total clickable area meets accessibility requirements.
          </p>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Label Association</h3>
            <p className="text-sm text-muted-foreground">
              Always use Label with matching{" "}
              <code className="bg-muted px-1 rounded">htmlFor</code> and{" "}
              <code className="bg-muted px-1 rounded">id</code> attributes.
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
            <h3 className="font-medium mb-2">When to Use Switch vs Checkbox</h3>
            <p className="text-sm text-muted-foreground">
              Use Switch for binary settings that take effect immediately.
              Use Checkbox for options in forms that require submission.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexSwitch, WexLabel } from "@/components/wex";

// Basic switch
<div className="flex items-center space-x-2">
  <WexSwitch id="feature" />
  <WexLabel htmlFor="feature">Enable feature</WexLabel>
</div>

// Controlled switch
const [enabled, setEnabled] = useState(false);
<WexSwitch 
  checked={enabled} 
  onCheckedChange={setEnabled} 
/>

// Settings pattern
<div className="flex items-center justify-between">
  <div>
    <WexLabel htmlFor="setting">Setting Name</WexLabel>
    <p className="text-sm text-muted-foreground">
      Description of the setting.
    </p>
  </div>
  <WexSwitch id="setting" />
</div>`}
        />
      </Section>

      <TokenReference tokens={switchTokens} className="mt-12" />
    </ComponentPage>
  );
}
