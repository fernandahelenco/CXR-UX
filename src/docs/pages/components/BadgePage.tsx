import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexBadge } from "@/components/wex";

// Props documentation for WexBadge
const badgeProps: PropDefinition[] = [
  { name: "intent", type: '"default" | "secondary" | "outline" | "success" | "warning" | "destructive" | "info"', default: '"default"', description: "Visual intent variant" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Badge size" },
  { name: "pill", type: "boolean", default: "false", description: "Fully rounded pill shape" },
  { name: "className", type: "string", description: "Additional CSS classes" },
  { name: "children", type: "ReactNode", required: true, description: "Badge content" },
];

// Layer 3 component tokens for Badge variants
const badgeTokens: TokenRow[] = [
  { element: "Neutral", property: "Background", token: "--wex-component-badge-neutral-bg" },
  { element: "Neutral", property: "Text", token: "--wex-component-badge-neutral-fg" },
  { element: "Info", property: "Background", token: "--wex-component-badge-info-bg" },
  { element: "Info", property: "Text", token: "--wex-component-badge-info-fg" },
  { element: "Success", property: "Background", token: "--wex-component-badge-success-bg" },
  { element: "Success", property: "Text", token: "--wex-component-badge-success-fg" },
  { element: "Warning", property: "Background", token: "--wex-component-badge-warning-bg" },
  { element: "Warning", property: "Text", token: "--wex-component-badge-warning-fg" },
  { element: "Destructive", property: "Background", token: "--wex-component-badge-destructive-bg" },
  { element: "Destructive", property: "Text", token: "--wex-component-badge-destructive-fg" },
];

export default function BadgePage() {
  return (
    <ComponentPage
      title="Badge"
      description="Small status descriptor with size and pill variants for labels, counts, or categories."
      status="stable"
      registryKey="badge"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="flex flex-wrap gap-2">
            <WexBadge>Default</WexBadge>
            <WexBadge intent="secondary">Secondary</WexBadge>
            <WexBadge intent="success">Success</WexBadge>
            <WexBadge intent="warning">Warning</WexBadge>
            <WexBadge intent="destructive">Destructive</WexBadge>
            <WexBadge intent="info">Info</WexBadge>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          SIZES
          ============================================================ */}
      <Section title="Sizes" description="Three sizes for different contexts.">
        <ExampleCard title="All Sizes">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <WexBadge size="sm">Small</WexBadge>
              <p className="text-xs text-muted-foreground mt-1">sm</p>
            </div>
            <div className="text-center">
              <WexBadge size="md">Medium</WexBadge>
              <p className="text-xs text-muted-foreground mt-1">md (default)</p>
            </div>
            <div className="text-center">
              <WexBadge size="lg">Large</WexBadge>
              <p className="text-xs text-muted-foreground mt-1">lg</p>
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Sizes with Intents">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <WexBadge intent="success" size="sm">Active</WexBadge>
              <WexBadge intent="warning" size="sm">Pending</WexBadge>
              <WexBadge intent="destructive" size="sm">Error</WexBadge>
            </div>
            <div className="flex flex-wrap gap-2">
              <WexBadge intent="success" size="lg">Active</WexBadge>
              <WexBadge intent="warning" size="lg">Pending</WexBadge>
              <WexBadge intent="destructive" size="lg">Error</WexBadge>
            </div>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          PILL SHAPE
          ============================================================ */}
      <Section title="Pill Shape" description="Fully rounded pill badges.">
        <ExampleCard title="Default vs Pill">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Default</p>
              <div className="flex gap-2">
                <WexBadge>Default</WexBadge>
                <WexBadge intent="success">Success</WexBadge>
                <WexBadge intent="info">Info</WexBadge>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Pill</p>
              <div className="flex gap-2">
                <WexBadge pill>Default</WexBadge>
                <WexBadge intent="success" pill>Success</WexBadge>
                <WexBadge intent="info" pill>Info</WexBadge>
              </div>
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Pill with Sizes">
          <div className="flex items-center gap-4">
            <WexBadge pill size="sm">Small Pill</WexBadge>
            <WexBadge pill size="md">Medium Pill</WexBadge>
            <WexBadge pill size="lg">Large Pill</WexBadge>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          VARIANTS (INTENT)
          ============================================================ */}
      <Section title="Variants (Intent)" description="Semantic intent variants - each tested individually for accessibility.">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ExampleCard title="Default">
            <WexBadge intent="default">Default</WexBadge>
          </ExampleCard>
          <ExampleCard title="Secondary">
            <WexBadge intent="secondary">Secondary</WexBadge>
          </ExampleCard>
          <ExampleCard title="Outline">
            <WexBadge intent="outline">Outline</WexBadge>
          </ExampleCard>
          <ExampleCard title="Success">
            <WexBadge intent="success">Success</WexBadge>
          </ExampleCard>
          <ExampleCard title="Warning">
            <WexBadge intent="warning">Warning</WexBadge>
          </ExampleCard>
          <ExampleCard title="Destructive">
            <WexBadge intent="destructive">Destructive</WexBadge>
          </ExampleCard>
          <ExampleCard title="Info">
            <WexBadge intent="info">Info</WexBadge>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          USE CASES
          ============================================================ */}
      <Section title="Use Cases" description="Common badge patterns.">
        <div className="space-y-4">
          <ExampleCard title="Status Indicators">
            <div className="flex flex-wrap gap-2">
              <WexBadge intent="success" pill>Active</WexBadge>
              <WexBadge intent="warning" pill>Pending</WexBadge>
              <WexBadge intent="destructive" pill>Inactive</WexBadge>
              <WexBadge intent="secondary" pill>Draft</WexBadge>
            </div>
          </ExampleCard>

          <ExampleCard title="Counts">
            <div className="flex flex-wrap gap-2">
              <WexBadge pill size="sm">3</WexBadge>
              <WexBadge intent="destructive" pill size="sm">99+</WexBadge>
              <WexBadge intent="info" pill size="sm">New</WexBadge>
            </div>
          </ExampleCard>

          <ExampleCard title="Tags">
            <div className="flex flex-wrap gap-2">
              <WexBadge intent="secondary">React</WexBadge>
              <WexBadge intent="secondary">TypeScript</WexBadge>
              <WexBadge intent="secondary">Tailwind</WexBadge>
              <WexBadge intent="secondary">Node.js</WexBadge>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Semantic Usage</h3>
          <p className="text-sm text-muted-foreground">
            Badges are typically decorative and don't require ARIA attributes.
            If a badge conveys important status, ensure the status is also 
            communicated in text for screen readers.
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexBadge } from "@/components/wex";

// Sizes
<WexBadge size="sm">Small</WexBadge>
<WexBadge size="md">Medium</WexBadge>  {/* default */}
<WexBadge size="lg">Large</WexBadge>

// Pill shape
<WexBadge pill>Pill Badge</WexBadge>

// Intents
<WexBadge intent="default">Default</WexBadge>
<WexBadge intent="secondary">Secondary</WexBadge>
<WexBadge intent="outline">Outline</WexBadge>
<WexBadge intent="success">Success</WexBadge>
<WexBadge intent="warning">Warning</WexBadge>
<WexBadge intent="destructive">Destructive</WexBadge>
<WexBadge intent="info">Info</WexBadge>

// Combined
<WexBadge intent="success" size="lg" pill>
  Active
</WexBadge>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={badgeProps} />
      </Section>

      <TokenReference tokens={badgeTokens} className="mt-12" />
    </ComponentPage>
  );
}
