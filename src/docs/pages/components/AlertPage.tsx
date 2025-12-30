import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexAlert } from "@/components/wex";
import { AlertCircle, Info, Terminal, AlertTriangle, CheckCircle } from "lucide-react";

// Props documentation for WexAlert
const alertProps: PropDefinition[] = [
  { name: "intent", type: '"default" | "destructive" | "success" | "warning" | "info"', default: '"default"', description: "Visual intent variant" },
  { name: "className", type: "string", description: "Additional CSS classes" },
  { name: "children", type: "ReactNode", required: true, description: "Alert content (icon, title, description)" },
];

// Layer 3 component tokens for WexAlert variants
const alertTokens: TokenRow[] = [
  // Default
  { element: "Default", property: "Background", token: "--background" },
  { element: "Default", property: "Text", token: "--foreground" },
  { element: "Default", property: "Border", token: "--border" },
  // Info (Layer 3)
  { element: "Info", property: "Background", token: "--wex-component-alert-info-bg" },
  { element: "Info", property: "Text", token: "--wex-component-alert-info-fg" },
  { element: "Info", property: "Border", token: "--wex-component-alert-info-border" },
  { element: "Info", property: "Icon", token: "--wex-component-alert-info-icon" },
  // Success (Layer 3)
  { element: "Success", property: "Background", token: "--wex-component-alert-success-bg" },
  { element: "Success", property: "Text", token: "--wex-component-alert-success-fg" },
  { element: "Success", property: "Border", token: "--wex-component-alert-success-border" },
  { element: "Success", property: "Icon", token: "--wex-component-alert-success-icon" },
  // Destructive (Layer 3)
  { element: "Destructive", property: "Background", token: "--wex-component-alert-destructive-bg" },
  { element: "Destructive", property: "Text", token: "--wex-component-alert-destructive-fg" },
  { element: "Destructive", property: "Border", token: "--wex-component-alert-destructive-border" },
  { element: "Destructive", property: "Icon", token: "--wex-component-alert-destructive-icon" },
  // Warning (Layer 2 - no dedicated Layer 3 tokens yet)
  { element: "Warning", property: "Background", token: "--warning (10% opacity)" },
  { element: "Warning", property: "Text", token: "--warning-foreground" },
];

export default function AlertPage() {
  return (
    <ComponentPage
      title="Alert"
      description="Displays a callout for important messages and feedback."
      status="stable"
      registryKey="alert"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexAlert className="max-w-md">
            <Terminal className="h-4 w-4" />
            <WexAlert.Title>Heads up!</WexAlert.Title>
            <WexAlert.Description>
              You can add components to your app using the CLI.
            </WexAlert.Description>
          </WexAlert>
        </ExampleCard>
        <Guidance>
          Use alerts to communicate important information that doesn't require 
          immediate action. For actions, use WexToaster notifications instead.
        </Guidance>
      </Section>

      <Section title="Variants (Intent)" description="WexAlert supports different intent variants.">
        <div className="space-y-4">
          <ExampleCard title="Default" description="Standard informational alert.">
            <WexAlert intent="default" className="max-w-md">
              <Info className="h-4 w-4" />
              <WexAlert.Title>Information</WexAlert.Title>
              <WexAlert.Description>
                This is a default alert for general information. It draws 
                attention without implying success or failure.
              </WexAlert.Description>
            </WexAlert>
          </ExampleCard>

          <ExampleCard title="Destructive" description="Use for errors or critical warnings.">
            <WexAlert intent="destructive" className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <WexAlert.Title>Error</WexAlert.Title>
              <WexAlert.Description>
                Your session has expired. Please log in again to continue.
              </WexAlert.Description>
            </WexAlert>
          </ExampleCard>

          <ExampleCard title="Success" description="Use for positive outcomes or confirmations.">
            <WexAlert intent="success" className="max-w-md">
              <CheckCircle className="h-4 w-4" />
              <WexAlert.Title>Success</WexAlert.Title>
              <WexAlert.Description>
                Your changes have been saved successfully.
              </WexAlert.Description>
            </WexAlert>
          </ExampleCard>

          <ExampleCard title="Warning" description="Use for cautionary messages that need attention.">
            <WexAlert intent="warning" className="max-w-md">
              <AlertTriangle className="h-4 w-4" />
              <WexAlert.Title>Warning</WexAlert.Title>
              <WexAlert.Description>
                Your session will expire in 5 minutes. Save your work.
              </WexAlert.Description>
            </WexAlert>
          </ExampleCard>

          <ExampleCard title="Info" description="Use for neutral informational messages.">
            <WexAlert intent="info" className="max-w-md">
              <Info className="h-4 w-4" />
              <WexAlert.Title>Information</WexAlert.Title>
              <WexAlert.Description>
                A new version is available. Refresh to update.
              </WexAlert.Description>
            </WexAlert>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Sizes" description="WexAlert does not support size variants.">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Size variants are not supported for WexAlert. The component uses 
            consistent padding and typography across all uses.
          </p>
        </div>
      </Section>

      <Section title="States" description="Interactive and display states.">
        <div className="space-y-4">
          <ExampleCard title="With Icons" description="Icons help users quickly identify alert type.">
            <div className="space-y-4 max-w-md">
              <WexAlert>
                <Terminal className="h-4 w-4" />
                <WexAlert.Title>Terminal</WexAlert.Title>
                <WexAlert.Description>
                  Run <code className="bg-muted px-1 rounded">npm install</code> to get started.
                </WexAlert.Description>
              </WexAlert>

              <WexAlert>
                <Info className="h-4 w-4" />
                <WexAlert.Title>Did you know?</WexAlert.Title>
                <WexAlert.Description>
                  You can customize the theme by editing the CSS variables.
                </WexAlert.Description>
              </WexAlert>

              <WexAlert intent="destructive">
                <AlertTriangle className="h-4 w-4" />
                <WexAlert.Title>Warning</WexAlert.Title>
                <WexAlert.Description>
                  This action cannot be undone. Proceed with caution.
                </WexAlert.Description>
              </WexAlert>
            </div>
          </ExampleCard>

          <ExampleCard title="Without Title" description="Simpler alerts with just description.">
            <div className="space-y-4 max-w-md">
              <WexAlert>
                <Info className="h-4 w-4" />
                <WexAlert.Description>
                  Your preferences have been saved.
                </WexAlert.Description>
              </WexAlert>

              <WexAlert intent="destructive">
                <AlertCircle className="h-4 w-4" />
                <WexAlert.Description>
                  Please fix the errors before submitting.
                </WexAlert.Description>
              </WexAlert>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Role and Semantics</h3>
            <p className="text-sm text-muted-foreground">
              WexAlert uses <code className="bg-muted px-1 rounded">role="alert"</code> which 
              causes screen readers to immediately announce the content. Use for 
              important, time-sensitive information.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Icon Accessibility</h3>
            <p className="text-sm text-muted-foreground">
              Icons are decorative and hidden from screen readers. The alert text 
              should convey all necessary information without relying on the icon.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <p className="text-sm text-muted-foreground">
              Alerts are static content and do not require keyboard interaction.
              Any interactive elements within alerts should be focusable.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexAlert } from "@/components/wex";
import { Info, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

// Default alert with icon
<WexAlert>
  <Info className="h-4 w-4" />
  <WexAlert.Title>Note</WexAlert.Title>
  <WexAlert.Description>
    Important information for the user.
  </WexAlert.Description>
</WexAlert>

// Destructive alert
<WexAlert intent="destructive">
  <AlertCircle className="h-4 w-4" />
  <WexAlert.Title>Error</WexAlert.Title>
  <WexAlert.Description>Something went wrong.</WexAlert.Description>
</WexAlert>

// Success alert
<WexAlert intent="success">
  <CheckCircle className="h-4 w-4" />
  <WexAlert.Title>Success</WexAlert.Title>
  <WexAlert.Description>Your changes have been saved.</WexAlert.Description>
</WexAlert>

// Warning alert
<WexAlert intent="warning">
  <AlertTriangle className="h-4 w-4" />
  <WexAlert.Title>Warning</WexAlert.Title>
  <WexAlert.Description>This action cannot be undone.</WexAlert.Description>
</WexAlert>

// Info alert
<WexAlert intent="info">
  <Info className="h-4 w-4" />
  <WexAlert.Title>Info</WexAlert.Title>
  <WexAlert.Description>A new version is available.</WexAlert.Description>
</WexAlert>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={alertProps} />
      </Section>

      <TokenReference tokens={alertTokens} className="mt-12" />
    </ComponentPage>
  );
}
