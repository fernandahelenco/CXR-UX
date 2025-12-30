import * as React from "react";
import { Section } from "@/docs/components/Section";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { WexCard, WexAlert, WexButton, WexTabs } from "@/components/wex";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Shield, 
  RefreshCw, 
  Zap, 
  Package, 
  CheckCircle,
  ArrowRight,
  Code2,
  FileCode,
  Moon,
  RotateCcw
} from "lucide-react";

/**
 * Architecture Page - Explains WEX component strategy and enterprise value
 */
export default function ArchitecturePage() {
  return (
    <article>
      <header className="mb-8 pb-6 border-b border-border">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Architecture
        </h1>
        <p className="text-lg text-muted-foreground">
          Understanding the WEX Design System component strategy and how it benefits enterprise teams.
        </p>
      </header>

      <Section title="Overview" className="mb-16">
        <p className="text-foreground mb-6">
          The WEX Design System provides two complementary packages that work together to deliver 
          a consistent, brand-compliant UI experience across all WEX applications:
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <WexCard className="p-5">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <WexCard.Title className="text-base mb-2">@wex/components</WexCard.Title>
                <WexCard.Description className="leading-relaxed">
                  Full component library with WEX-branded variants, namespace patterns, 
                  and curated updates from upstream dependencies.
                </WexCard.Description>
              </div>
            </div>
          </WexCard>
          <WexCard className="p-5">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-info/10">
                <Zap className="h-5 w-5 text-info" />
              </div>
              <div>
                <WexCard.Title className="text-base mb-2">@wex/design-tokens</WexCard.Title>
                <WexCard.Description className="leading-relaxed">
                  Theme-only package with CSS variables, Tailwind preset, and shadcn bridge 
                  for teams needing more control.
                </WexCard.Description>
              </div>
            </div>
          </WexCard>
        </div>
        <WexAlert intent="info">
          <WexAlert.Title>Recommended for most teams</WexAlert.Title>
          <WexAlert.Description>
            Use <code className="bg-muted px-1.5 py-0.5 rounded text-sm">@wex/components</code> for 
            the simplest integration path. The theme-only package is available for power users 
            with specific requirements.
          </WexAlert.Description>
        </WexAlert>
      </Section>

      <Section title="Why WEX Components?" description="Enterprise benefits of using the WEX component library." className="mb-16">
        <div className="grid md:grid-cols-2 gap-6 mt-2">
          <BenefitCard
            icon={<Building2 className="h-5 w-5" />}
            iconColor="text-primary"
            title="Consistency at Scale"
            description="All teams use the same component versions with identical APIs and behaviors. 
              No more Team A using v1.2 while Team B uses v1.4 with different bugs."
          />
          <BenefitCard
            icon={<Shield className="h-5 w-5" />}
            iconColor="text-success"
            title="Brand Compliance Built-In"
            description="Developers can't accidentally go off-brand. The intent variants (primary, 
              success, warning) ensure the right colors are used every time."
          />
          <BenefitCard
            icon={<RefreshCw className="h-5 w-5" />}
            iconColor="text-info"
            title="Controlled Updates"
            description="The WEX team evaluates upstream changes, runs full test suites, and 
              publishes migration guides. App teams update with confidence."
          />
          <BenefitCard
            icon={<Zap className="h-5 w-5" />}
            iconColor="text-warning"
            title="Reduced Onboarding"
            description="New developers ship WEX-compliant features on day one. No complex 
              setup, no configuration, no learning curve."
          />
        </div>
      </Section>

      <Section 
        title="Developer Experience Comparison" 
        description="Two scenarios: extended variants vs. wrapper components."
        className="mb-16"
      >
        <p className="text-muted-foreground mb-8 mt-2">
          WEX components fall into two categories. Here's what each looks like compared to 
          using shadcn directly with tokens:
        </p>

        {/* Scenario 1: Extended Variants */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-info/10 text-info text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-info" />
              Scenario 1
            </span>
            <h3 className="text-lg font-semibold">When You Need Extended Variants</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            <strong>Applies to:</strong> Button, Badge, Alert (3 components) — these need intents 
            like <code className="bg-muted px-1 rounded">destructive</code>, <code className="bg-muted px-1 rounded">success</code>, <code className="bg-muted px-1 rounded">warning</code> that 
            shadcn doesn't offer out of the box.
          </p>

          {/* Live Button Comparison */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Live Result (identical appearance):</h4>
            <div className="flex gap-8 items-center p-6 rounded-lg bg-muted/30 border border-border">
              <div className="text-center">
                <WexButton intent="destructive">Delete Account</WexButton>
                <p className="text-xs text-muted-foreground mt-2">WexButton</p>
              </div>
              <div className="text-center">
                <Button
                  className="
                    inline-flex items-center justify-center gap-2
                    h-11 min-h-[44px] px-4 py-2 rounded-md
                    text-sm font-medium transition-colors
                    bg-wex-button-destructive-bg
                    text-wex-button-destructive-fg
                    border border-wex-button-destructive-border
                    hover:bg-wex-button-destructive-hover-bg
                    active:bg-wex-button-destructive-active-bg
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                    focus-visible:ring-wex-button-destructive-focus-ring
                    disabled:pointer-events-none disabled:opacity-50
                    disabled:bg-wex-button-destructive-disabled-bg
                    disabled:text-wex-button-destructive-disabled-fg
                  "
                >
                  Delete Account
                </Button>
                <p className="text-xs text-muted-foreground mt-2">shadcn + manual CSS</p>
              </div>
            </div>
          </div>

          {/* Code Comparison Tabs */}
          <WexTabs defaultValue="wex" className="mb-6">
            <WexTabs.List className="mb-4">
              <WexTabs.Trigger value="wex" className="gap-2">
                <Code2 className="h-4 w-4" />
                With @wex/components
              </WexTabs.Trigger>
              <WexTabs.Trigger value="shadcn" className="gap-2">
                <Code2 className="h-4 w-4" />
                With shadcn + tokens
              </WexTabs.Trigger>
            </WexTabs.List>
            
            <WexTabs.Content value="wex">
              <CodeBlock 
                language="tsx"
                filename="MyComponent.tsx"
                code={`import { WexButton } from '@wex/components';

<WexButton intent="destructive">Delete Account</WexButton>`}
              />
              <p className="text-sm text-muted-foreground mt-3">
                <span className="font-semibold text-success">3 lines</span> — Import and use. That's it.
              </p>
            </WexTabs.Content>
            
            <WexTabs.Content value="shadcn">
              <CodeBlock 
                language="tsx"
                filename="MyComponent.tsx"
                code={`import { Button } from '@/components/ui/button';
import './button-variants.css';

<Button className="btn-destructive">Delete Account</Button>`}
              />
              
              <p className="text-xs font-medium text-muted-foreground mt-6 mb-3 uppercase tracking-wide">
                Plus the CSS you write and maintain (using Tailwind @apply with WEX utilities):
              </p>
              
              <CodeBlock 
                language="css"
                filename="button-variants.css"
                code={`.btn-destructive {
  @apply inline-flex items-center justify-center gap-2;
  @apply h-11 min-h-[44px] px-4 py-2 rounded-md;
  @apply text-sm font-medium transition-colors;
  @apply bg-wex-button-destructive-bg;
  @apply text-wex-button-destructive-fg;
  @apply border border-wex-button-destructive-border;
}

.btn-destructive:hover {
  @apply bg-wex-button-destructive-hover-bg;
}

.btn-destructive:active {
  @apply bg-wex-button-destructive-active-bg;
}

.btn-destructive:focus-visible {
  @apply outline-none ring-2 ring-offset-2;
  @apply ring-wex-button-destructive-focus-ring;
}

.btn-destructive:disabled {
  @apply pointer-events-none opacity-50;
  @apply bg-wex-button-destructive-disabled-bg;
  @apply text-wex-button-destructive-disabled-fg;
}`}
              />
              <p className="text-sm text-muted-foreground mt-3">
                <span className="font-semibold text-destructive">~20 lines of CSS</span> — for just one button variant.
              </p>
            </WexTabs.Content>
          </WexTabs>

          {/* Metrics Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              icon={<Code2 className="h-5 w-5" />}
              label="Component Code"
              wexValue="3 lines"
              manualValue="4 lines"
            />
            <MetricCard
              icon={<FileCode className="h-5 w-5" />}
              label="CSS to Write"
              wexValue="0 lines"
              manualValue="~20 lines"
            />
            <MetricCard
              icon={<Moon className="h-5 w-5" />}
              label="Dark Mode"
              wexValue="Automatic"
              manualValue="Manual"
            />
            <MetricCard
              icon={<RotateCcw className="h-5 w-5" />}
              label="Token Updates"
              wexValue="Automatic"
              manualValue="Manual sync"
            />
          </div>
        </div>

        {/* Scenario 2: Wrapper Components */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-success" />
              Scenario 2
            </span>
            <h3 className="text-lg font-semibold">When shadcn Variants Work As-Is</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            <strong>Applies to:</strong> Dialog, Card, Tabs, and 52 other components — shadcn's 
            built-in variants are sufficient, so WEX provides a thin wrapper with namespace patterns.
          </p>

          {/* Code Comparison */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">With @wex/components</p>
              <CodeBlock 
                language="tsx"
                code={`import { WexDialog } from '@wex/components';

<WexDialog>
  <WexDialog.Trigger>Open</WexDialog.Trigger>
  <WexDialog.Content>
    <WexDialog.Header>
      <WexDialog.Title>Title</WexDialog.Title>
    </WexDialog.Header>
    <p>Dialog content here.</p>
  </WexDialog.Content>
</WexDialog>`}
              />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">With shadcn + tokens</p>
              <CodeBlock 
                language="tsx"
                code={`import { Dialog, DialogTrigger, DialogContent, 
  DialogHeader, DialogTitle } from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content here.</p>
  </DialogContent>
</Dialog>`}
              />
            </div>
          </div>

          <WexAlert intent="info">
            <WexAlert.Title>Similar code, different value</WexAlert.Title>
            <WexAlert.Description>
              For wrapper components, the code looks nearly identical. The value of WEX is in 
              <strong> consistency</strong> (same patterns across all teams), 
              <strong> namespace syntax</strong> (cleaner imports), and 
              <strong> curated updates</strong> (upstream changes are vetted before reaching your app).
            </WexAlert.Description>
          </WexAlert>
        </div>

        {/* Summary Callout */}
        <div className="p-5 rounded-lg bg-muted/30 border border-border">
          <h4 className="font-medium mb-3">Summary</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-info mb-1">Extended variants (3 components)</p>
              <p className="text-muted-foreground">
                Button, Badge, Alert — WEX saves ~20 lines of CSS per variant you'd otherwise write yourself.
              </p>
            </div>
            <div>
              <p className="font-medium text-success mb-1">Wrapper components (55 components)</p>
              <p className="text-muted-foreground">
                Dialog, Card, Tabs, etc. — WEX provides consistency, namespace patterns, and curated updates.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Dependency Model" description="How WEX components relate to underlying libraries." className="mb-16">
        <div className="bg-muted/30 border border-border rounded-lg p-8 mb-6 mt-2">
          <div className="flex flex-col items-center gap-5">
            {/* Your Application */}
            <DependencyNode 
              label="Your Application" 
              sublabel="React + Tailwind" 
              highlight 
            />
            
            <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
            
            {/* WEX Layer */}
            <div className="flex gap-6 items-center">
              <DependencyNode 
                label="@wex/components" 
                sublabel="Component Library" 
                primary
              />
              <span className="text-muted-foreground text-sm font-medium">or</span>
              <DependencyNode 
                label="@wex/design-tokens" 
                sublabel="Theme Only" 
              />
            </div>
            
            <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
            
            {/* shadcn Layer */}
            <DependencyNode 
              label="shadcn/ui" 
              sublabel="Component Primitives" 
            />
            
            <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
            
            {/* Radix Layer */}
            <DependencyNode 
              label="@radix-ui" 
              sublabel="Headless Primitives" 
            />
          </div>
        </div>
        
        <p className="text-muted-foreground">
          WEX components wrap shadcn/ui, which wraps Radix UI primitives. This layered approach 
          means you get accessibility, keyboard navigation, and proper ARIA attributes out of the box, 
          with WEX branding applied on top.
        </p>
      </Section>

      <Section title="Update Path" description="How upstream improvements reach your application." className="mb-16">
        <div className="space-y-5 mt-2">
          <UpdateStep 
            number={1}
            title="Upstream Release"
            description="shadcn/ui or Radix releases a new version with improvements or fixes."
          />
          <UpdateStep 
            number={2}
            title="WEX Evaluation"
            description="The WEX team evaluates compatibility, runs accessibility tests, and checks for breaking changes."
          />
          <UpdateStep 
            number={3}
            title="Internal Update"
            description="WEX updates the internal dependency and runs the full test suite across all components."
          />
          <UpdateStep 
            number={4}
            title="Release & Migration Guide"
            description="New @wex/components version is published with changelog and any migration notes."
          />
          <UpdateStep 
            number={5}
            title="Team Adoption"
            description="App teams update at their own pace with confidence that changes have been vetted."
          />
        </div>
        
        <WexAlert className="mt-8" intent="success">
          <WexAlert.Title>You're not locked in</WexAlert.Title>
          <WexAlert.Description>
            WEX components wrap upstream libraries—they don't fork them. You still get all 
            improvements from shadcn and Radix, just with an extra layer of quality assurance.
          </WexAlert.Description>
        </WexAlert>
      </Section>

      <Section title="Package Comparison" description="Choose the right package for your team's needs.">
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">Feature</th>
                <th className="text-left py-3 px-4 font-medium">@wex/components</th>
                <th className="text-left py-3 px-4 font-medium">@wex/design-tokens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <ComparisonRow 
                feature="Ready-to-use components" 
                components={true} 
                tokens={false} 
              />
              <ComparisonRow 
                feature="WEX intent variants (success, warning, etc.)" 
                components={true} 
                tokens={false} 
              />
              <ComparisonRow 
                feature="Namespace pattern (WexDialog.Content)" 
                components={true} 
                tokens={false} 
              />
              <ComparisonRow 
                feature="CSS design tokens" 
                components={true} 
                tokens={true} 
              />
              <ComparisonRow 
                feature="Tailwind preset" 
                components={true} 
                tokens={true} 
              />
              <ComparisonRow 
                feature="Use with raw shadcn CLI" 
                components={false} 
                tokens={true} 
              />
              <ComparisonRow 
                feature="Full control over components" 
                components={false} 
                tokens={true} 
              />
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 p-5 rounded-lg bg-muted/30 border border-border">
          <h4 className="font-medium mb-3">When to use @wex/design-tokens alone:</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
            <li>You need to customize component behavior beyond what WEX provides</li>
            <li>You're integrating with an existing shadcn setup</li>
            <li>You require specific shadcn versions for compatibility reasons</li>
            <li>You're building a new component library on top of WEX tokens</li>
          </ul>
        </div>
      </Section>

      <Section 
        title="Component Implementation Patterns" 
        description="How WEX components are built under the hood."
        className="mb-16 mt-16"
      >
        <p className="text-muted-foreground mb-6 mt-2">
          WEX components follow two implementation patterns depending on whether shadcn's 
          built-in variants meet WEX requirements:
        </p>
        
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">Pattern</th>
                <th className="text-left py-3 px-4 font-medium">Count</th>
                <th className="text-left py-3 px-4 font-medium">Components</th>
                <th className="text-left py-3 px-4 font-medium">Why</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-info" />
                    Extended CVA
                  </span>
                </td>
                <td className="py-4 px-4 font-medium">3</td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">Button</code>,{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">Badge</code>,{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">Alert</code>
                </td>
                <td className="py-4 px-4 text-muted-foreground">
                  Need WEX intents (success, info, warning, help, contrast) beyond shadcn defaults
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-success" />
                    shadcn Wrapper
                  </span>
                </td>
                <td className="py-4 px-4 font-medium">55</td>
                <td className="py-4 px-4 whitespace-nowrap text-muted-foreground">
                  All other components
                </td>
                <td className="py-4 px-4 text-muted-foreground">
                  shadcn variants are sufficient; just add namespace pattern
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <WexAlert intent="info">
          <WexAlert.Title>CVA = Class Variance Authority</WexAlert.Title>
          <WexAlert.Description>
            CVA is a library for defining component variants declaratively with Tailwind. 
            When shadcn's built-in variants don't cover WEX's semantic intents, we extend 
            with custom CVA configurations rather than forking the entire component.
          </WexAlert.Description>
        </WexAlert>
      </Section>

      <Section 
        title="Industry Validation" 
        description="This pattern is used by leading design systems."
        className="mb-16"
      >
        <p className="text-muted-foreground mb-6 mt-2">
          The layered approach—headless primitives → styled components → brand layer—is 
          the industry standard for enterprise design systems:
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <ValidationCard
            company="Vercel"
            logo={<img src="/logos/vercel.svg" alt="Vercel" className="h-5 w-auto dark:invert" />}
            description="Builds on Radix + Tailwind for their internal design system and Geist UI."
          />
          <ValidationCard
            company="Shopify"
            logo={<img src="/logos/shopify.svg" alt="Shopify" className="h-5 w-auto" />}
            description="Uses headless primitives with a brand layer on top for consistent merchant experiences."
          />
          <ValidationCard
            company="Stripe"
            logo={<img src="/logos/stripe.svg" alt="Stripe" className="h-5 w-auto dark:invert" />}
            description="Wraps Radix components with custom styling for their dashboard and documentation."
          />
        </div>

        <div className="p-5 rounded-lg bg-muted/30 border border-border">
          <h4 className="font-medium mb-2">Why this pattern works</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
            <li><strong>Accessibility guaranteed</strong> — Radix provides WCAG-compliant primitives</li>
            <li><strong>Brand consistency</strong> — Token layer ensures visual alignment</li>
            <li><strong>Upgrade path</strong> — Upstream improvements flow through without friction</li>
            <li><strong>Developer experience</strong> — Familiar patterns, minimal learning curve</li>
          </ul>
        </div>
      </Section>

    </article>
  );
}

// Helper Components

function BenefitCard({ 
  icon, 
  iconColor, 
  title, 
  description 
}: { 
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-5 rounded-lg border border-border bg-card">
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-lg bg-muted ${iconColor}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

function DependencyNode({ 
  label, 
  sublabel, 
  highlight = false,
  primary = false
}: { 
  label: string;
  sublabel: string;
  highlight?: boolean;
  primary?: boolean;
}) {
  return (
    <div className={`
      px-5 py-3 rounded-lg border text-center min-w-[200px]
      ${highlight ? 'bg-primary/10 border-primary/30' : ''}
      ${primary ? 'bg-info/10 border-info/30' : ''}
      ${!highlight && !primary ? 'bg-card border-border' : ''}
    `}>
      <div className="font-medium text-sm mb-0.5">{label}</div>
      <div className="text-xs text-muted-foreground">{sublabel}</div>
    </div>
  );
}

function UpdateStep({ 
  number, 
  title, 
  description 
}: { 
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center text-sm">
        {number}
      </div>
      <div className="pt-0.5">
        <h4 className="font-medium text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function ComparisonRow({ 
  feature, 
  components, 
  tokens 
}: { 
  feature: string;
  components: boolean;
  tokens: boolean;
}) {
  return (
    <tr>
      <td className="py-4 px-4">{feature}</td>
      <td className="py-4 px-4">
        {components ? (
          <CheckCircle className="h-4 w-4 text-success" />
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </td>
      <td className="py-4 px-4">
        {tokens ? (
          <CheckCircle className="h-4 w-4 text-success" />
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </td>
    </tr>
  );
}

function MetricCard({
  icon,
  label,
  wexValue,
  manualValue,
}: {
  icon: React.ReactNode;
  label: string;
  wexValue: string;
  manualValue: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 text-muted-foreground mb-3">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">WEX</span>
          <span className="text-sm font-medium text-success">{wexValue}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Manual</span>
          <span className="text-sm font-medium text-destructive">{manualValue}</span>
        </div>
      </div>
    </div>
  );
}

function ValidationCard({
  company,
  logo,
  description,
}: {
  company: string;
  logo?: React.ReactNode;
  description: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 mb-2">
        {logo && (
          <span className="text-foreground">{logo}</span>
        )}
        <h4 className="font-medium text-foreground">{company}</h4>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

