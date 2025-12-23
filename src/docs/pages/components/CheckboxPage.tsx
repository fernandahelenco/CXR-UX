import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexCheckbox, WexLabel } from "@/components/wex";

// Token mappings for WexCheckbox
// Layer 3 component tokens
const checkboxTokens: TokenRow[] = [
  { element: "Box", property: "Background", token: "--wex-component-checkbox-bg" },
  { element: "Box", property: "Border", token: "--wex-component-checkbox-border" },
  { element: "Box (Checked)", property: "Background", token: "--wex-component-checkbox-checked-bg" },
  { element: "Checkmark", property: "Color", token: "--wex-component-checkbox-checked-fg" },
  { element: "Focus Ring", property: "Color", token: "--wex-component-checkbox-focus-ring" },
  { element: "Disabled", property: "Opacity", token: "--wex-component-checkbox-disabled-opacity" },
];

export default function CheckboxPage() {
  return (
    <ComponentPage
      title="Checkbox"
      description="A control that allows the user to toggle between checked and not checked."
      status="stable"
      registryKey="checkbox"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="flex items-center space-x-2">
            <WexCheckbox id="terms" />
            <WexLabel htmlFor="terms">Accept terms and conditions</WexLabel>
          </div>
        </ExampleCard>
      </Section>

      <Section title="States" description="Checkbox supports multiple interactive states.">
        <div className="space-y-4">
          <ExampleCard title="Unchecked" description="Default unchecked state.">
            <div className="flex items-center space-x-2">
              <WexCheckbox id="unchecked" />
              <WexLabel htmlFor="unchecked">Unchecked option</WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="Checked" description="Activated checked state.">
            <div className="flex items-center space-x-2">
              <WexCheckbox id="checked" defaultChecked />
              <WexLabel htmlFor="checked">Checked option</WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled Unchecked" description="Non-interactive disabled state.">
            <div className="flex items-center space-x-2">
              <WexCheckbox id="disabled-unchecked" disabled />
              <WexLabel htmlFor="disabled-unchecked" className="text-muted-foreground">
                Disabled option
              </WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled Checked" description="Disabled but selected.">
            <div className="flex items-center space-x-2">
              <WexCheckbox id="disabled-checked" disabled defaultChecked />
              <WexLabel htmlFor="disabled-checked" className="text-muted-foreground">
                Locked selection
              </WexLabel>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Checkbox Groups" description="Multiple checkboxes for multi-select scenarios.">
        <div className="space-y-4">
          <ExampleCard title="Vertical Group" description="Standard vertical list of options.">
            <div className="space-y-3">
              <WexLabel className="text-base font-medium">Select your interests</WexLabel>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <WexCheckbox id="tech" />
                  <WexLabel htmlFor="tech">Technology</WexLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <WexCheckbox id="design" />
                  <WexLabel htmlFor="design">Design</WexLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <WexCheckbox id="business" />
                  <WexLabel htmlFor="business">Business</WexLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <WexCheckbox id="marketing" />
                  <WexLabel htmlFor="marketing">Marketing</WexLabel>
                </div>
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="Inline Group" description="Horizontal layout for compact spaces.">
            <div className="space-y-2">
              <WexLabel className="text-base font-medium">Notification preferences</WexLabel>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <WexCheckbox id="email-notify" defaultChecked />
                  <WexLabel htmlFor="email-notify">Email</WexLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <WexCheckbox id="sms-notify" />
                  <WexLabel htmlFor="sms-notify">SMS</WexLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <WexCheckbox id="push-notify" defaultChecked />
                  <WexLabel htmlFor="push-notify">Push</WexLabel>
                </div>
              </div>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="With Description" description="Checkbox with additional helper text.">
        <ExampleCard>
          <div className="items-top flex space-x-2">
            <WexCheckbox id="newsletter" />
            <div className="grid gap-1.5 leading-none">
              <WexLabel htmlFor="newsletter">Subscribe to newsletter</WexLabel>
              <p className="text-sm text-muted-foreground">
                Get updates about new features and product announcements.
              </p>
            </div>
          </div>
        </ExampleCard>
      </Section>

      <Section title="Sizing">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Checkbox Size</h3>
          <p className="text-sm text-muted-foreground">
            Checkboxes are 20px (h-5, w-5). When combined with their label,
            the total clickable area meets touch target guidelines.
          </p>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Label Association</h3>
            <p className="text-sm text-muted-foreground">
              Always associate checkboxes with labels using matching{" "}
              <code className="bg-muted px-1 rounded">id</code> and{" "}
              <code className="bg-muted px-1 rounded">htmlFor</code> attributes.
              This allows users to click the label to toggle the checkbox.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Tab: Move focus to/from checkbox</li>
              <li>Space: Toggle checkbox state</li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Focus Visibility</h3>
            <p className="text-sm text-muted-foreground">
              A visible focus ring appears when navigating with keyboard,
              meeting WCAG 2.4.7 requirements.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexCheckbox, WexLabel } from "@/components/wex";

// Basic checkbox with label
<div className="flex items-center space-x-2">
  <WexCheckbox id="option" />
  <WexLabel htmlFor="option">Option label</WexLabel>
</div>

// Controlled checkbox
const [checked, setChecked] = useState(false);
<WexCheckbox 
  checked={checked} 
  onCheckedChange={setChecked} 
/>

// With description
<div className="items-top flex space-x-2">
  <WexCheckbox id="terms" />
  <div className="grid gap-1.5">
    <WexLabel htmlFor="terms">Accept terms</WexLabel>
    <p className="text-sm text-muted-foreground">
      Read our terms of service.
    </p>
  </div>
</div>`}
        />
      </Section>

      <TokenReference tokens={checkboxTokens} className="mt-12" />
    </ComponentPage>
  );
}
