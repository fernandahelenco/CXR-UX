/**
 * Token Architecture Documentation Page
 * 
 * Explains the 4-layer token system used in the WEX Design System.
 */
export default function TokenArchitecturePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="font-display text-4xl font-bold tracking-tight">
          Token Architecture
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          The WEX Design System uses a 4-layer token architecture to provide
          flexibility, maintainability, and rich component customization without
          sacrificing consistency.
        </p>
      </div>

      {/* Overview */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-semibold">Overview</h2>
        <p className="text-muted-foreground max-w-3xl">
          Our token system is designed to solve the "primary bleed" problem
          common in design systems—where a single <code className="bg-muted px-1.5 py-0.5 rounded text-sm">--primary</code> token
          gets used everywhere, making granular theming difficult.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <LayerCard
            layer={1}
            title="Primitives & Semantics"
            file="wex.tokens.css"
            description="Raw palette values and semantic tokens. The source of truth."
            examples={["--wex-palette-blue-700", "--wex-primary", "--wex-text"]}
          />
          <LayerCard
            layer={2}
            title="shadcn Bridge"
            file="wex.shadcn-bridge.css"
            description="Maps WEX semantics to shadcn required variables. Small and stable."
            examples={["--primary", "--muted", "--border"]}
          />
          <LayerCard
            layer={3}
            title="Component Slots"
            file="wex.components-bridge.css"
            description="Granular component-level tokens for rich customization."
            examples={["--wex-component-button-primary-bg", "--wex-component-input-border-focus"]}
          />
          <LayerCard
            layer={4}
            title="Tailwind Utilities"
            file="tailwind.config.ts"
            description="Exposes Layer 2 and Layer 3 tokens as Tailwind classes."
            examples={["bg-primary", "bg-wex-button-primary-bg"]}
          />
        </div>
      </section>

      {/* Layer 3 Deep Dive */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-semibold">
          Layer 3: Component Slot Tokens
        </h2>
        <p className="text-muted-foreground max-w-3xl">
          Layer 3 provides component-specific tokens that give each component
          its own "slots" for backgrounds, foregrounds, borders, and states.
          This enables PrimeNG-like richness while maintaining shadcn compatibility.
        </p>

        <div className="bg-muted/50 border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-semibold">Naming Convention</h3>
          <code className="block bg-background px-4 py-2 rounded text-sm font-mono">
            --wex-component-{"{component}"}-{"{variant?}"}-{"{slot}"}
          </code>
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div>
              <span className="font-medium">component:</span>
              <span className="text-muted-foreground ml-2">button, input, tabs, etc.</span>
            </div>
            <div>
              <span className="font-medium">variant:</span>
              <span className="text-muted-foreground ml-2">primary, secondary, info (optional)</span>
            </div>
            <div>
              <span className="font-medium">slot:</span>
              <span className="text-muted-foreground ml-2">bg, fg, border, hover-bg, etc.</span>
            </div>
          </div>
        </div>

        {/* Component Token Tables */}
        <div className="space-y-8">
          <TokenTable
            component="Button"
            tokens={[
              { name: "--wex-component-button-primary-bg", source: "var(--wex-primary)" },
              { name: "--wex-component-button-primary-fg", source: "var(--wex-primary-contrast)" },
              { name: "--wex-component-button-primary-hover-bg", source: "var(--wex-primary-hover)" },
              { name: "--wex-component-button-primary-active-bg", source: "var(--wex-primary-active)" },
              { name: "--wex-component-button-secondary-bg", source: "var(--wex-surface-subtle)" },
              { name: "--wex-component-button-destructive-bg", source: "var(--wex-destructive)" },
            ]}
          />

          <TokenTable
            component="Input"
            tokens={[
              { name: "--wex-component-input-bg", source: "var(--wex-content-bg)" },
              { name: "--wex-component-input-border", source: "var(--wex-input-border)" },
              { name: "--wex-component-input-border-focus", source: "var(--wex-primary)" },
              { name: "--wex-component-input-disabled-bg", source: "var(--wex-surface-subtle)" },
            ]}
          />

          <TokenTable
            component="Badge"
            tokens={[
              { name: "--wex-component-badge-info-bg", source: "var(--wex-info)" },
              { name: "--wex-component-badge-success-bg", source: "var(--wex-success)" },
              { name: "--wex-component-badge-warning-bg", source: "var(--wex-warning)" },
              { name: "--wex-component-badge-destructive-bg", source: "var(--wex-destructive)" },
            ]}
          />
        </div>
      </section>

      {/* Usage */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-semibold">Usage</h2>

        <div className="space-y-4">
          <h3 className="font-medium">Tailwind Utilities (Recommended)</h3>
          <p className="text-muted-foreground text-sm">
            Use the <code className="bg-muted px-1 rounded">wex.*</code> utilities
            for component-specific styling:
          </p>
          <pre className="bg-muted/50 border border-border rounded-lg p-4 text-sm font-mono overflow-x-auto">
{`<button className="
  bg-wex-button-primary-bg
  text-wex-button-primary-fg
  hover:bg-wex-button-primary-hover-bg
  active:bg-wex-button-primary-active-bg
">
  Click me
</button>`}
          </pre>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">CVA Integration</h3>
          <p className="text-muted-foreground text-sm">
            In CVA variant definitions, use the wex utilities:
          </p>
          <pre className="bg-muted/50 border border-border rounded-lg p-4 text-sm font-mono overflow-x-auto">
{`const buttonVariants = cva("...", {
  variants: {
    intent: {
      primary: "bg-wex-button-primary-bg text-wex-button-primary-fg hover:bg-wex-button-primary-hover-bg",
      secondary: "bg-wex-button-secondary-bg text-wex-button-secondary-fg hover:bg-wex-button-secondary-hover-bg",
    }
  }
});`}
          </pre>
        </div>
      </section>

      {/* Rules */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-semibold">Rules</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <RuleCard
            title="Layer 3 tokens MUST reference Layer 1"
            description="Component tokens should reference semantic tokens (--wex-primary) or palette steps (--wex-palette-blue-700), never raw hex values."
            status="required"
          />
          <RuleCard
            title="No circular references"
            description="A token cannot reference itself or create a reference loop."
            status="required"
          />
          <RuleCard
            title="Prefix with --wex-component-*"
            description="All Layer 3 tokens must use the collision-proof prefix."
            status="required"
          />
          <RuleCard
            title="Dark mode auto-shifts"
            description="Reference semantic tokens for automatic dark mode support. Only add .dark overrides when truly necessary."
            status="recommended"
          />
        </div>
      </section>

      {/* Why This Matters */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-semibold">Why This Matters</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <BenefitCard
            title="Eliminates Primary Bleed"
            description="Each component has its own tokens, so changing the button primary color doesn't affect badges, tabs, or other components."
          />
          <BenefitCard
            title="Rich Variant Support"
            description="Support for multiple button intents, badge styles, and component states without workarounds."
          />
          <BenefitCard
            title="Theme Builder Ready"
            description="The Theme Builder can target specific component slots for granular theming."
          />
        </div>
      </section>
    </div>
  );
}

// ============================================================
// Helper Components
// ============================================================

interface LayerCardProps {
  layer: number;
  title: string;
  file: string;
  description: string;
  examples: string[];
}

function LayerCard({ layer, title, file, description, examples }: LayerCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
          {layer}
        </span>
        <span className="font-semibold">{title}</span>
      </div>
      <code className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
        {file}
      </code>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="space-y-1">
        {examples.map((example) => (
          <code key={example} className="block text-xs font-mono text-primary">
            {example}
          </code>
        ))}
      </div>
    </div>
  );
}

interface TokenTableProps {
  component: string;
  tokens: { name: string; source: string }[];
}

function TokenTable({ component, tokens }: TokenTableProps) {
  return (
    <div className="space-y-2">
      <h4 className="font-medium">{component}</h4>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Token</th>
              <th className="px-4 py-2 text-left font-medium">References</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, i) => (
              <tr key={token.name} className={i % 2 === 0 ? "" : "bg-muted/25"}>
                <td className="px-4 py-2 font-mono text-xs">{token.name}</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{token.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface RuleCardProps {
  title: string;
  description: string;
  status: "required" | "recommended";
}

function RuleCard({ title, description, status }: RuleCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <div className="flex items-center gap-2">
        <span
          className={`px-2 py-0.5 rounded text-xs font-medium ${
            status === "required"
              ? "bg-destructive/10 text-destructive"
              : "bg-info/10 text-info"
          }`}
        >
          {status}
        </span>
        <span className="font-medium">{title}</span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

interface BenefitCardProps {
  title: string;
  description: string;
}

function BenefitCard({ title, description }: BenefitCardProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

