import * as React from "react";
import { Section } from "@/docs/components/Section";
import { WexCard, WexAlert } from "@/components/wex";
import { 
  Building2, 
  Shield, 
  RefreshCw, 
  Zap, 
  Package, 
  CheckCircle,
  ArrowRight
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

