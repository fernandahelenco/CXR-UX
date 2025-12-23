import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexButton } from "@/components/wex";
import { Plus, Trash2, Settings, Download, Check, Info, AlertTriangle, HelpCircle, ExternalLink } from "lucide-react";

// Token mappings for WexButton variants - using Layer 3 component tokens
const buttonTokens: TokenRow[] = [
  // Primary (Layer 3)
  { element: "Primary", property: "Background", token: "--wex-component-button-primary-bg" },
  { element: "Primary", property: "Text", token: "--wex-component-button-primary-fg" },
  { element: "Primary", property: "Hover", token: "--wex-component-button-primary-hover-bg" },
  // Secondary (Layer 3)
  { element: "Secondary", property: "Background", token: "--wex-component-button-secondary-bg" },
  { element: "Secondary", property: "Text", token: "--wex-component-button-secondary-fg" },
  // Destructive (Layer 3)
  { element: "Destructive", property: "Background", token: "--wex-component-button-destructive-bg" },
  // Success (Layer 3)
  { element: "Success", property: "Background", token: "--wex-component-button-success-bg" },
  { element: "Success", property: "Text", token: "--wex-component-button-success-fg" },
  // Info (Layer 3)
  { element: "Info", property: "Background", token: "--wex-component-button-info-bg" },
  { element: "Info", property: "Text", token: "--wex-component-button-info-fg" },
  // Warning (Layer 3)
  { element: "Warning", property: "Background", token: "--wex-component-button-warning-bg" },
  { element: "Warning", property: "Text", token: "--wex-component-button-warning-fg" },
  // Help (Layer 3)
  { element: "Help", property: "Background", token: "--wex-component-button-help-bg" },
  { element: "Help", property: "Text", token: "--wex-component-button-help-fg" },
  // Contrast (Layer 3)
  { element: "Contrast", property: "Background", token: "--wex-component-button-contrast-bg" },
  { element: "Contrast", property: "Text", token: "--wex-component-button-contrast-fg" },
  // Link (Layer 3)
  { element: "Link", property: "Text", token: "--wex-component-button-link-fg" },
  // Shared
  { element: "Raised", property: "Shadow", token: "--wex-component-button-raised-shadow" },
  { element: "All Variants", property: "Disabled Opacity", token: "--wex-component-button-disabled-opacity" },
];

export default function ButtonPage() {
  return (
    <ComponentPage
      title="Button"
      description="Primary interactive element for triggering actions and submitting forms. Supports 11 intent variants, modifiers, and loading states."
      status="stable"
      registryKey="button"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="flex flex-wrap gap-2">
            <WexButton>Primary</WexButton>
            <WexButton intent="secondary">Secondary</WexButton>
            <WexButton intent="success">Success</WexButton>
            <WexButton intent="destructive">Destructive</WexButton>
          </div>
        </ExampleCard>
        <Guidance>
          WexButton is the foundational action element. It's hardened with 
          WCAG 2.5.5 compliant touch targets (44px minimum) and consistent 
          focus ring styling using WEX tokens.
        </Guidance>
      </Section>

      {/* ============================================================
          SEVERITIES (All Intents)
          ============================================================ */}
      <Section title="Severities" description="Full range of semantic button severities inspired by PrimeNG.">
        <ExampleCard title="All Severities">
          <div className="flex flex-wrap gap-3">
            <WexButton intent="primary">Primary</WexButton>
            <WexButton intent="secondary">Secondary</WexButton>
            <WexButton intent="success">Success</WexButton>
            <WexButton intent="info">Info</WexButton>
            <WexButton intent="warning">Warning</WexButton>
            <WexButton intent="destructive">Danger</WexButton>
            <WexButton intent="help">Help</WexButton>
            <WexButton intent="contrast">Contrast</WexButton>
          </div>
        </ExampleCard>
        
        <ExampleCard title="With Icons">
          <div className="flex flex-wrap gap-3">
            <WexButton intent="success"><Check className="h-4 w-4" />Complete</WexButton>
            <WexButton intent="info"><Info className="h-4 w-4" />Information</WexButton>
            <WexButton intent="warning"><AlertTriangle className="h-4 w-4" />Warning</WexButton>
            <WexButton intent="destructive"><Trash2 className="h-4 w-4" />Delete</WexButton>
            <WexButton intent="help"><HelpCircle className="h-4 w-4" />Need Help?</WexButton>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          TEXT VARIANTS
          ============================================================ */}
      <Section title="Text Variants" description="Outline, ghost, and link styles for subtle actions.">
        <ExampleCard title="Ghost & Outline">
          <div className="flex flex-wrap gap-3">
            <WexButton intent="ghost">Ghost</WexButton>
            <WexButton intent="outline">Outline</WexButton>
          </div>
        </ExampleCard>

        <ExampleCard title="Link Style">
          <div className="flex items-center gap-3">
            <WexButton intent="link">Learn More</WexButton>
            <WexButton intent="link"><ExternalLink className="h-4 w-4" />External Link</WexButton>
          </div>
        </ExampleCard>
        <Guidance>
          Link buttons render as text with underline on hover, perfect for inline actions.
        </Guidance>
      </Section>

      {/* ============================================================
          MODIFIERS
          ============================================================ */}
      <Section title="Modifiers" description="Rounded and raised modifiers for different visual styles.">
        <ExampleCard title="Rounded (Pill)">
          <div className="flex flex-wrap gap-3">
            <WexButton rounded>Rounded</WexButton>
            <WexButton intent="success" rounded>Success Pill</WexButton>
            <WexButton intent="info" rounded>Info Pill</WexButton>
            <WexButton intent="warning" rounded>Warning Pill</WexButton>
          </div>
        </ExampleCard>
        
        <ExampleCard title="Raised (Elevated Shadow)">
          <div className="flex flex-wrap gap-3">
            <WexButton raised>Raised</WexButton>
            <WexButton intent="secondary" raised>Raised Secondary</WexButton>
            <WexButton intent="success" raised>Raised Success</WexButton>
          </div>
        </ExampleCard>

        <ExampleCard title="Combined Modifiers">
          <div className="flex flex-wrap gap-3">
            <WexButton rounded raised>Rounded + Raised</WexButton>
            <WexButton intent="success" rounded raised>Success Pill Raised</WexButton>
            <WexButton intent="contrast" rounded raised>Contrast Pill Raised</WexButton>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          LOADING STATE
          ============================================================ */}
      <Section title="Loading State" description="Built-in loading prop with spinner animation.">
        <ExampleCard title="Loading Buttons">
          <div className="flex flex-wrap gap-3">
            <WexButton loading>Loading...</WexButton>
            <WexButton intent="success" loading>Saving...</WexButton>
            <WexButton intent="destructive" loading>Deleting...</WexButton>
          </div>
        </ExampleCard>
        <Guidance>
          The loading prop automatically disables the button and shows a spinner.
          The button is also marked with aria-busy="true" for accessibility.
        </Guidance>
      </Section>

      {/* ============================================================
          SIZES
          ============================================================ */}
      <Section title="Sizes" description="Three sizes for different contexts.">
        <ExampleCard>
          <div className="flex items-center gap-4">
            <WexButton size="sm">Small</WexButton>
            <WexButton size="md">Medium</WexButton>
            <WexButton size="lg">Large</WexButton>
          </div>
        </ExampleCard>
        <div className="mt-4 text-sm text-muted-foreground">
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Small (sm)</strong>: Compact contexts like table rows (h-8)</li>
            <li><strong>Medium (md)</strong>: Default size, WCAG compliant (h-11)</li>
            <li><strong>Large (lg)</strong>: Hero sections or emphasis (h-12)</li>
          </ul>
        </div>

        <ExampleCard title="Icon Size" description="Square button for icon-only actions.">
          <div className="flex gap-2">
            <WexButton intent="primary" size="icon" aria-label="Add item">
              <Plus className="h-4 w-4" />
            </WexButton>
            <WexButton intent="secondary" size="icon" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </WexButton>
            <WexButton intent="ghost" size="icon" aria-label="Download">
              <Download className="h-4 w-4" />
            </WexButton>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          ALL VARIANTS TABLE
          ============================================================ */}
      <Section title="All Variants at a Glance" description="Complete overview of all button intents.">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Intent</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Default</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Rounded</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Raised</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Disabled</th>
              </tr>
            </thead>
            <tbody>
              {(["primary", "secondary", "success", "info", "warning", "destructive", "help", "contrast", "ghost", "outline", "link"] as const).map((intent) => (
                <tr key={intent} className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium capitalize">{intent}</td>
                  <td className="py-3 px-4"><WexButton intent={intent} size="sm">{intent}</WexButton></td>
                  <td className="py-3 px-4"><WexButton intent={intent} size="sm" rounded>Pill</WexButton></td>
                  <td className="py-3 px-4"><WexButton intent={intent} size="sm" raised>Raised</WexButton></td>
                  <td className="py-3 px-4"><WexButton intent={intent} size="sm" disabled>Disabled</WexButton></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Touch Target</h3>
            <p className="text-sm text-muted-foreground">
              WexButton enforces a minimum 44px touch target (WCAG 2.5.5) via 
              min-h-target and min-w-target utilities.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Loading State</h3>
            <p className="text-sm text-muted-foreground">
              When loading=true, the button is automatically disabled and marked 
              with aria-busy="true" for screen readers.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Icon-Only Buttons</h3>
            <p className="text-sm text-muted-foreground">
              Icon-only buttons (size="icon") must include aria-label to provide 
              an accessible name for screen readers.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexButton } from "@/components/wex";

// Severities
<WexButton intent="primary">Primary</WexButton>
<WexButton intent="secondary">Secondary</WexButton>
<WexButton intent="success">Success</WexButton>
<WexButton intent="info">Info</WexButton>
<WexButton intent="warning">Warning</WexButton>
<WexButton intent="destructive">Danger</WexButton>
<WexButton intent="help">Help</WexButton>
<WexButton intent="contrast">Contrast</WexButton>

// Text variants
<WexButton intent="ghost">Ghost</WexButton>
<WexButton intent="outline">Outline</WexButton>
<WexButton intent="link">Link</WexButton>

// Modifiers
<WexButton rounded>Pill Button</WexButton>
<WexButton raised>Elevated Button</WexButton>
<WexButton rounded raised>Pill + Elevated</WexButton>

// Loading state
<WexButton loading>Saving...</WexButton>

// Sizes
<WexButton size="sm">Small</WexButton>
<WexButton size="md">Medium</WexButton>
<WexButton size="lg">Large</WexButton>

// Icon button (MUST have aria-label)
<WexButton size="icon" aria-label="Add">
  <Plus className="h-4 w-4" />
</WexButton>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">intent</code>: "primary" | "secondary" | "success" | "info" | "warning" | "destructive" | "help" | "contrast" | "ghost" | "outline" | "link"</li>
            <li><code className="bg-muted px-1 rounded">size</code>: "sm" | "md" | "lg" | "icon"</li>
            <li><code className="bg-muted px-1 rounded">rounded</code>: boolean - Pill shape</li>
            <li><code className="bg-muted px-1 rounded">raised</code>: boolean - Elevated shadow</li>
            <li><code className="bg-muted px-1 rounded">loading</code>: boolean - Shows spinner, disables button</li>
            <li><code className="bg-muted px-1 rounded">asChild</code>: boolean - Render as child element</li>
          </ul>
        </div>
      </Section>

      <TokenReference tokens={buttonTokens} className="mt-12" />
    </ComponentPage>
  );
}
