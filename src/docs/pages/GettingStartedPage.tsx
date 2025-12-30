import { Section } from "@/docs/components/Section";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { WexAlert, WexCard } from "@/components/wex";
import { Package, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Getting Started page
 * Installation and usage instructions
 */
export default function GettingStartedPage() {
  return (
    <article>
      <header className="mb-8 pb-6 border-b border-border">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Getting Started
        </h1>
        <p className="text-lg text-muted-foreground">
          Learn how to use WEX components in your project.
        </p>
      </header>

      <div className="space-y-12">
        <Section
          title="Choose Your Integration"
          description="The WEX Design System offers two packages for different needs."
        >
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <WexCard className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <WexCard.Title className="text-base mb-1">
                    @wex/components
                  </WexCard.Title>
                  <WexCard.Description className="text-sm mb-2">
                    Full component library with WEX-branded variants and namespace patterns. 
                    Recommended for most teams.
                  </WexCard.Description>
                  <span className="inline-flex items-center text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded">
                    Recommended
                  </span>
                </div>
              </div>
            </WexCard>
            <WexCard className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-info/10">
                  <Zap className="h-5 w-5 text-info" />
                </div>
                <div>
                  <WexCard.Title className="text-base mb-1">
                    @wex/design-tokens
                  </WexCard.Title>
                  <WexCard.Description className="text-sm mb-2">
                    Theme-only package with CSS variables and Tailwind preset. 
                    For teams that need more control.
                  </WexCard.Description>
                  <span className="inline-flex items-center text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    Advanced
                  </span>
                </div>
              </div>
            </WexCard>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Link 
              to="/architecture" 
              className="text-link hover:underline inline-flex items-center gap-1"
            >
              Learn about WEX architecture
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </Section>

        <Section
          title="Prerequisites"
          description="The WEX design system requires the following dependencies."
        >
          <ul className="list-disc list-inside space-y-2 text-foreground mb-4">
            <li>React 18 or later</li>
            <li>Tailwind CSS 3.4 or later</li>
            <li>TypeScript (recommended)</li>
          </ul>
          
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <h4 className="font-medium mb-2 text-sm">What about shadcn and Radix?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">@wex/components</code> bundles 
              shadcn/ui patterns and Radix UI primitives internally. You don't need to install them 
              separately—just install the WEX package and you're ready to go.
            </p>
            <Link 
              to="/architecture" 
              className="text-sm text-link hover:underline inline-flex items-center gap-1"
            >
              Learn about the architecture
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </Section>

        <Section
          title="Installation"
          description="Install the WEX component package for the easiest integration."
        >
          <div className="space-y-4">
            <WexAlert intent="info">
              <WexAlert.Description>
                Package publication is coming soon. For now, components are available 
                directly in this repository.
              </WexAlert.Description>
            </WexAlert>
            
            <p className="text-muted-foreground">
              WEX components live in{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">src/components/wex/</code>.
              Token files are in{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm">src/styles/</code>.
            </p>

            <CodeBlock
              code={`// Required CSS imports (add to your entry file)
import './styles/wex.tokens.css';
import './styles/wex.shadcn-bridge.css';

// Component import (from the wex barrel export)
import { WexButton, WexCard, WexDialog } from '@/components/wex';`}
            />
          </div>
        </Section>

        <Section
          title="Basic Usage"
          description="Import and use components in your React code."
        >
          <CodeBlock
            code={`import { WexButton, WexCard, WexDialog } from '@/components/wex';

function MyComponent() {
  return (
    <div>
      {/* Simple component */}
      <WexButton intent="primary" onClick={() => alert('Clicked!')}>
        Click Me
      </WexButton>
      
      {/* Compound component with namespace pattern */}
      <WexCard>
        <WexCard.Header>
          <WexCard.Title>Card Title</WexCard.Title>
          <WexCard.Description>Card description here.</WexCard.Description>
        </WexCard.Header>
        <WexCard.Content>
          Content goes here.
        </WexCard.Content>
      </WexCard>
    </div>
  );
}`}
          />
          <Guidance>
            WEX components use a namespace pattern for compound components. 
            This keeps imports clean and groups related sub-components together.
          </Guidance>
        </Section>

        <Section
          title="Dark Mode"
          description="Toggle dark mode by adding the .dark class to the html element."
        >
          <CodeBlock
            code={`// Toggle dark mode
document.documentElement.classList.toggle('dark');

// Or set explicitly
document.documentElement.classList.add('dark');
document.documentElement.classList.remove('dark');`}
          />
          <p className="text-muted-foreground mt-4">
            The theme toggle in this docs site persists your preference to
            localStorage.
          </p>
        </Section>

        <Section title="Component Rules">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">WEX_COMPONENT_RULES.md</h3>
            <p className="text-sm text-muted-foreground mb-3">
              All component development must follow the rules defined in{" "}
              <code className="bg-muted px-1 rounded">
                WEX_COMPONENT_RULES.md
              </code>{" "}
              at the repository root. This includes:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>No raw hex/rgb/hsl color values</li>
              <li>No arbitrary color value wrappers</li>
              <li>Minimum 44×44px touch targets on interactive elements</li>
              <li>Visible focus rings on all focusable elements</li>
              <li>CVA for all variant-based components</li>
            </ul>
          </div>
          <Guidance>
            Read WEX_COMPONENT_RULES.md before contributing. It is the binding
            contract for component development.
          </Guidance>
        </Section>

        <Section
          title="Tailwind Configuration"
          description="The Tailwind config extends colors with semantic tokens."
        >
          <CodeBlock
            code={`// tailwind.config.ts (excerpt)
theme: {
  extend: {
    colors: {
      background: "hsl(var(--background) / <alpha-value>)",
      foreground: "hsl(var(--foreground) / <alpha-value>)",
      primary: {
        DEFAULT: "hsl(var(--primary) / <alpha-value>)",
        foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        hover: "hsl(var(--primary-hover) / <alpha-value>)",
      },
      // ... more semantic colors
    },
  },
}`}
          />
        </Section>
      </div>
    </article>
  );
}

