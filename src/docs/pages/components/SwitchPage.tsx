import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { Switch } from "@/components/ui/switch";
import { WexLabel } from "@/components/wex";

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
            <Switch id="airplane-mode" />
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
              <Switch id="off-state" />
              <WexLabel htmlFor="off-state">Feature disabled</WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="On">
            <div className="flex items-center space-x-2">
              <Switch id="on-state" defaultChecked />
              <WexLabel htmlFor="on-state">Feature enabled</WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled Off">
            <div className="flex items-center space-x-2">
              <Switch id="disabled-off" disabled />
              <WexLabel htmlFor="disabled-off" className="text-muted-foreground">
                Unavailable feature
              </WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled On">
            <div className="flex items-center space-x-2">
              <Switch id="disabled-on" disabled defaultChecked />
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
              <Switch id="notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <WexLabel htmlFor="marketing">Marketing Emails</WexLabel>
                <p className="text-sm text-muted-foreground">
                  Receive emails about new features and products.
                </p>
              </div>
              <Switch id="marketing" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <WexLabel htmlFor="dark-mode">Dark Mode</WexLabel>
                <p className="text-sm text-muted-foreground">
                  Use dark theme across the application.
                </p>
              </div>
              <Switch id="dark-mode" defaultChecked />
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
          code={`import { Switch } from "@/components/ui/switch";

// With label
<div className="flex items-center space-x-2">
  <Switch id="feature" />
  <Label htmlFor="feature">Enable feature</Label>
</div>

// Controlled
const [enabled, setEnabled] = useState(false);
<Switch 
  checked={enabled} 
  onCheckedChange={setEnabled} 
/>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">checked</code>: boolean</li>
            <li><code className="bg-muted px-1 rounded">onCheckedChange</code>: (checked: boolean) =&gt; void</li>
            <li><code className="bg-muted px-1 rounded">disabled</code>: boolean</li>
          </ul>
        </div>
      </Section>

      <TokenReference tokens={switchTokens} className="mt-12" />
    </ComponentPage>
  );
}
