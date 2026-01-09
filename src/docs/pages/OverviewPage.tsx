import { Link } from "react-router-dom";
import { WexButton, WexCard, WexSeparator } from "@/components/wex";
import {
  Palette,
  Shield,
  Eye,
  Users,
  ArrowRight,
  Layers,
  Accessibility,
} from "lucide-react";

/**
 * Overview / landing page for docs site
 * Redesigned for maximum professional clarity, inspired by Atlassian Design System.
 * Now featuring "Glassmorphism" refinements for a premium feel.
 */
export default function OverviewPage() {
  const glassCard = "relative overflow-hidden bg-white/10 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] transition-all duration-500 hover:bg-white/20 dark:hover:bg-white/[0.06] hover:border-white/50 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:-translate-y-1 group/card";

  return (
    <article className="relative pb-20">
      <div className="space-y-24">
        {/* Hero Section: Clean, Airy, and Professional */}
        <header className="relative pt-10 pb-16">
          <div className="max-w-3xl">
          <h1 className="mb-6 text-5xl font-display font-bold tracking-tight text-foreground md:text-7xl">
            Design, develop, 
            <br />
            <span className="text-brand-red">deliver at scale</span>
          </h1>
          
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground md:text-2xl">
            The WEX Design System provides the foundations, components, and 
            governance needed to build accessible, consistent WEX applications 
            without the guesswork.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <WexButton 
              size="lg" 
              asChild 
              className="bg-brand-red text-white hover:bg-brand-red/90 shadow-[0_4px_14px_rgba(200,16,46,0.3)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(200,16,46,0.4)]"
            >
              <Link to="/getting-started" className="group">
                Get started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </WexButton>
            <WexButton variant="outline" size="lg" asChild className="backdrop-blur-sm border-white/20">
              <Link to="/story">
                Our philosophy
              </Link>
            </WexButton>
          </div>
        </div>

        {/* Abstract Component Preview (Decorative) */}
        <div className="absolute top-10 right-0 hidden w-1/3 opacity-40 lg:block">
           <div className="relative h-64 w-full">
              <div className="absolute top-0 right-0 h-40 w-full rounded-xl border border-border bg-card shadow-sm" />
              <div className="absolute top-10 right-10 h-40 w-full rounded-xl border border-border bg-card shadow-md" />
              <div className="absolute top-20 right-20 h-40 w-full rounded-xl border border-primary/20 bg-primary/5 shadow-lg backdrop-blur-sm" />
           </div>
        </div>
      </header>

      {/* Main Entry Points: Glassmorphic Cards */}
      <section className="grid gap-8 md:grid-cols-2">
        <Link to="/components/button" className="group">
          <WexCard className={`h-full p-4 ${glassCard}`}>
            {/* Subtle Shine Effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover/card:translate-x-full" />
            
            <WexCard.Header className="pb-4">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background/80 shadow-sm ring-1 ring-border/50 backdrop-blur-sm">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <WexCard.Title className="text-2xl">Components</WexCard.Title>
              <WexCard.Description className="text-base text-muted-foreground">
                Accessible, documented, and production-ready components that follow WEX governance.
              </WexCard.Description>
            </WexCard.Header>
            <WexCard.Footer>
               <span className="inline-flex items-center text-sm font-semibold text-primary">
                 Explore library <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
               </span>
            </WexCard.Footer>
          </WexCard>
        </Link>

        <Link to="/foundations/token-architecture" className="group">
          <WexCard className={`h-full p-4 ${glassCard}`}>
            {/* Subtle Shine Effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover/card:translate-x-full" />

            <WexCard.Header className="pb-4">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background/80 shadow-sm ring-1 ring-border/50 backdrop-blur-sm">
                <Palette className="h-6 w-6 text-primary" />
              </div>
              <WexCard.Title className="text-2xl">Foundations</WexCard.Title>
              <WexCard.Description className="text-base text-muted-foreground">
                The building blocks of our system: tokens, colors, typography, and spacing.
              </WexCard.Description>
            </WexCard.Header>
            <WexCard.Footer>
               <span className="inline-flex items-center text-sm font-semibold text-primary">
                 View foundations <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
               </span>
            </WexCard.Footer>
          </WexCard>
        </Link>
      </section>

      {/* Pillars: Content-First approach */}
      <section className="space-y-16 py-10">
        <div className="max-w-2xl">
          <h2 className="mb-4 text-3xl font-display font-bold">Built for real products</h2>
          <p className="text-lg text-muted-foreground">
            A design system is only as good as the guardrails it provides. 
            WEX is built on four core principles that ensure quality at scale.
          </p>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Shield className="h-8 w-8 text-brand-red" />
            <h3 className="text-lg font-bold">WEX Contract</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every component is a WEX-prefixed wrapper, ensuring we own the API and can theme consistently.
            </p>
          </div>
          <div className="space-y-4">
            <Eye className="h-8 w-8 text-info" />
            <h3 className="text-lg font-bold">A11y Signals</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We don't guess at accessibility. Every component has automated tests and visible signals.
            </p>
          </div>
          <div className="space-y-4">
            <Palette className="h-8 w-8 text-warning" />
            <h3 className="text-lg font-bold">Token First</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Raw colors are forbidden. Everything is a semantic token, making light/dark mode a standard.
            </p>
          </div>
          <div className="space-y-4">
            <Users className="h-8 w-8 text-primary" />
            <h3 className="text-lg font-bold">Shared Language</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Design and engineering use the exact same tokens and components. No translation required.
            </p>
          </div>
        </div>
      </section>

      <WexSeparator />

      {/* Honesty Section: Transparency as a Value */}
      <section className="flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-warning/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-warning">
            <Accessibility className="h-4 w-4" />
            Transparency report
          </div>
          <h2 className="mb-4 text-3xl font-display font-bold">
            We're not hiding our homework.
          </h2>
          <p className="mb-6 text-lg text-muted-foreground">
            WEX accessibility is measured, not promised. We surface our test 
            failures directly on component pages so teams know exactly where we stand 
            and what we're fixing next.
          </p>
          <WexButton intent="secondary" asChild>
            <Link to="/accessibility">
              View accessibility dashboard
            </Link>
          </WexButton>
        </div>

        <div className={`w-full max-w-sm space-y-3 rounded-2xl p-6 ${glassCard}`}>
           <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Current Pulse</h4>
           <div className="flex items-center justify-between border-b border-border/50 py-2">
             <span className="text-sm font-medium text-foreground">A11y Tests Passed</span>
             <span className="text-sm font-bold text-success">38</span>
           </div>
           <div className="flex items-center justify-between border-b border-border/50 py-2">
             <span className="text-sm font-medium text-foreground">Failed Scenarios</span>
             <span className="text-sm font-bold text-warning">16</span>
           </div>
           <div className="flex items-center justify-between py-2">
             <span className="text-sm font-medium text-foreground">WEX Components</span>
             <span className="text-sm font-bold text-primary">54</span>
           </div>
        </div>
      </section>

      {/* Footer Section: Professional & Categorized */}
      <footer className="relative mt-24 border-t border-border/50 pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Overview</h4>
            <ul className="space-y-2">
              <li><Link to="/getting-started" className="text-sm text-muted-foreground transition-colors hover:text-brand-red">Getting Started</Link></li>
              <li><Link to="/story" className="text-sm text-muted-foreground transition-colors hover:text-brand-red">Our Story</Link></li>
              <li><Link to="/changelog" className="text-sm text-muted-foreground transition-colors hover:text-brand-red">Changelog</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Foundations</h4>
            <ul className="space-y-2">
              <li><Link to="/foundations/token-architecture" className="text-sm text-muted-foreground transition-colors hover:text-brand-red">Design Tokens</Link></li>
              <li><Link to="/foundations/colors" className="text-sm text-muted-foreground transition-colors hover:text-brand-red">Color Palette</Link></li>
              <li><Link to="/foundations/typography" className="text-sm text-muted-foreground transition-colors hover:text-brand-red">Typography</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Components</h4>
            <ul className="space-y-2">
              <li><Link to="/components/button" className="text-sm text-muted-foreground transition-colors hover:text-brand-red">Buttons</Link></li>
              <li><Link to="/components/form" className="text-sm text-muted-foreground transition-colors hover:text-brand-red">Forms</Link></li>
              <li><Link to="/components/chart" className="text-sm text-muted-foreground transition-colors hover:text-brand-red">Charts</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Governance</h4>
            <ul className="space-y-2">
              <li><Link to="/accessibility" className="text-sm text-muted-foreground transition-colors hover:text-brand-red">Accessibility</Link></li>
              <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-brand-red">Figma Library</a></li>
              <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-brand-red">GitHub Repo</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 border-t border-border/30 py-10">
          <div className="flex flex-col items-center gap-3 text-center text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <img src={`${import.meta.env.BASE_URL}WEX_Logo_Red_Vector.svg`} alt="WEX" className="h-5" />
              <span className="text-sm font-medium text-muted-foreground">Design System</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} WEX Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </article>
  );
}
