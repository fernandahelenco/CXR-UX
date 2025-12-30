import { Section } from "@/docs/components/Section";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { WexCard } from "@/components/wex";
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
          description="The WEX Design System offers two packages that work together."
        >
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <WexCard className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <WexCard.Title className="text-base mb-1">
                    @wex/components + @wex/design-tokens
                  </WexCard.Title>
                  <WexCard.Description className="text-sm mb-2">
                    Full component library with WEX-branded variants, plus design tokens for theming. 
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
                    @wex/design-tokens only
                  </WexCard.Title>
                  <WexCard.Description className="text-sm mb-2">
                    Theme-only package with CSS variables and Tailwind preset. 
                    For teams building their own components.
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
              shadcn/ui patterns and Radix UI primitives internally — you don't need to install them 
              separately. Design tokens are a separate peer dependency so brand updates can ship 
              independently of component updates.
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
          description="Install both packages for the complete WEX experience."
        >
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3">1. Install packages</h4>
              <CodeBlock
                language="bash"
                code={`npm install @wex/components @wex/design-tokens`}
              />
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">2. Import tokens CSS (in your entry file)</h4>
              <CodeBlock
                language="tsx"
                code={`// main.tsx or App.tsx
import '@wex/design-tokens/css';`}
              />
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">3. Configure Tailwind</h4>
              <CodeBlock
                language="typescript"
                filename="tailwind.config.ts"
                code={`import wexPreset from '@wex/design-tokens/tailwind-preset';

export default {
  presets: [wexPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@wex/components/**/*.js',
  ],
};`}
              />
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">4. Use components</h4>
              <CodeBlock
                language="tsx"
                code={`import { WexButton, WexCard } from '@wex/components';`}
              />
            </div>
          </div>
        </Section>

        <Section
          title="Basic Usage"
          description="Import and use components in your React code."
        >
          <CodeBlock
            language="tsx"
            code={`import { WexButton, WexCard, WexDialog } from '@wex/components';

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

        <Section
          title="Updating Tokens"
          description="Brand updates are shipped independently of component updates."
        >
          <p className="text-muted-foreground mb-4">
            When the WEX brand palette or theme changes, you can update tokens without 
            touching your component version:
          </p>
          <CodeBlock
            language="bash"
            code={`# Update tokens only (no component changes)
npm update @wex/design-tokens`}
          />
          <Guidance>
            This separation means faster, safer brand rollouts across all applications.
          </Guidance>
        </Section>
      </div>
    </article>
  );
}

