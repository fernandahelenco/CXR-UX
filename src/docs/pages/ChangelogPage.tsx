/**
 * Changelog page
 * Placeholder for future release notes
 */
export default function ChangelogPage() {
  return (
    <article>
      <header className="mb-8 pb-6 border-b border-border">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Changelog
        </h1>
        <p className="text-lg text-muted-foreground">
          Release notes and version history.
        </p>
      </header>

      <div className="space-y-8">
        <ChangelogEntry
          version="0.7.0"
          date="December 20, 2024"
          title="Unit Test Suite"
          changes={[
            "Testing: Added Vitest + React Testing Library test infrastructure",
            "Testing: Created 244 unit tests across components, utilities, and hooks",
            "Testing: 95% pass rate with 233 passing tests on initial run",
            "Testing: Created vitest.config.ts with JSDOM environment and JSON reporter",
            "Testing: Added tests/setup.ts with jest-dom matchers and browser API mocks",
            "Components: Basic render tests for all 54 WEX components",
            "Utils: Tests for cn(), contrast utilities, theme utilities, and chart colors",
            "Hooks: Tests for useA11yCompliance hook",
            "Scripts: Added generate-unit-test-report.js for dashboard-friendly output",
            "Dashboard: Added Unit Tests page under Resources showing pass/fail metrics",
            "Dashboard: Category breakdown for components, utilities, and hooks",
            "Dashboard: Test file list with status badges and duration",
            "Dashboard: Failure details tab for quick debugging",
            "NPM Scripts: Added test:unit, test:unit:watch, test:unit:report",
            "Dependencies: Added vitest, @testing-library/react, @testing-library/jest-dom, jsdom",
          ]}
        />

        <ChangelogEntry
          version="0.6.0"
          date="December 20, 2024"
          title="Story Page & Home Redesign"
          changes={[
            "Story: Added new 'Story' page with conversational narrative about how the system was built",
            "Story: Covers token-first architecture, WEX component contract, accessibility approach, and AI collaboration",
            "Home: Complete redesign using WexCard components for value pillars",
            "Home: Added stronger hero section with 'A Design System That Means It' headline",
            "Home: Added transparency callout acknowledging work in progress and honest a11y signals",
            "Home: Added quick navigation section linking to key areas",
            "Home: Added animated gradient mesh background with subtle blue/cyan blobs",
            "Home: Glassmorphism card effects with hover shine animations",
            "Navigation: Added Story link under Resources section",
            "Removed bespoke FeatureCard in favor of proper WexCard components",
            "Fix: Corrected 'Get Started' link on home page to point to the Getting Started guide",
            "Brand: Added official WEX Brand Red token (#c8102e) matching logo",
            "Header: Added 2px brand-red gradient accent line at top",
            "CodeBlock: Added Prism.js syntax highlighting with GitHub-inspired colors",
            "CodeBlock: Added copy-to-clipboard button with visual feedback",
            "CodeBlock: Added macOS-style window chrome (traffic light dots)",
            "CodeBlock: Added optional filename prop for context",
            "Dependencies: Added prismjs for syntax highlighting",
          ]}
        />

        <ChangelogEntry
          version="0.5.0"
          date="December 20, 2024"
          title="Hardening Pass"
          changes={[
            "Charts: Updated docs to use WexChart namespace (not raw ChartContainer)",
            "Charts: All chart examples now use WexChart.Container, WexChart.Tooltip, etc.",
            "Governance: Added Section 8 to WEX_COMPONENT_RULES.md (Component Introduction Requirements)",
            "Governance: All new components must use WEX prefix, be registered, have docs, and participate in a11y",
            "Dark Mode: Fixed text-black/70 in ColorsPage palette swatches to use semantic text-foreground",
            "A11y Dashboard: Made table rows fully clickable (removed Actions column)",
            "A11y Dashboard: Added keyboard navigation (Tab + Enter/Space to open details)",
            "Dialog: Fixed animation origin (replaced zoom with slide-in-from-top)",
            "A11y: Fixed scrollable-region-focusable in ScrollArea (added tabIndex=0)",
            "A11y: Fixed aria-required-children in Item (added role='listitem')",
            "A11y: Fixed button-name in Select and Form examples (added aria-labelledby)",
            "A11y: Added aria-label to Resizable handle (library aria-allowed-attr issue noted)",
            "A11y: ExampleCard now uses React.useId() for guaranteed unique data-example-id",
            "A11y Tests: Regenerated compliance.json (38 passing, 16 failing)",
          ]}
        />

        <ChangelogEntry
          version="0.4.1"
          date="December 20, 2024"
          title="Dark Mode Accessibility Fixes"
          changes={[
            "Colors: Added MutationObserver to re-compute contrast when theme changes",
            "Colors: Fixed contrast badge text unreadable in dark mode (AA-large was black-on-dark)",
            "Colors: Updated badge styling to use theme-adaptive text colors",
            "Colors: All contrast indicators now update live when toggling light/dark mode",
            "A11y: Replaced text-warning-foreground with text-warning across all docs components",
            "A11y: Fixed warning icons/badges unreadable in dark mode (21 instances)",
          ]}
        />

        <ChangelogEntry
          version="0.4.0"
          date="December 20, 2024"
          title="Charts, Colors & Governance"
          changes={[
            "Charts: Added 4 rendered examples (bar, line, multi-series, area, pie/donut)",
            "Charts: Created chartColors.ts utility for CSS variable resolution",
            "Charts: Updated chart page with guidance on when to use each chart type",
            "Colors: Added 'What These Ratings Mean' definitions section explaining WCAG thresholds",
            "Colors: Improved contrast badge legibility with larger text, icons, and better contrast",
            "Colors: Added compact contrast scores to extended palette (50-900) swatches",
            "Colors: Moved contrast badges from swatch overlay to card section for readability",
            "Governance: Added Section 7 to WEX_COMPONENT_RULES.md requiring changelog updates",
            "A11y Dashboard: Removed internal test metadata (scope, scenarios) from modal display",
            "A11y Dashboard: Added 'Variants Tested' section showing named variants only",
            "Dialog: Fixed centering issue with inline styles for reliable positioning",
          ]}
        />

        <ChangelogEntry
          version="0.3.0"
          date="December 19, 2024"
          title="Accessibility & Polish Update"
          changes={[
            "WCAG 2.2 AA compliance notes added to all component pages",
            "Navigation scroll-to-top on route change",
            "WEX logo integration in header (light/dark mode support)",
            "Favicon configuration with all platform sizes",
            "Dark mode contrast improvements (especially toast descriptions)",
            "Toast positioning variants (all 6 viewport positions)",
            "Toggle page completed with all sections and examples",
            "Success, warning, and info token definitions added",
            "Accessibility section standardization across components",
          ]}
        />

        <ChangelogEntry
          version="0.2.0"
          date="December 2024"
          title="Component Library Expansion"
          changes={[
            "All shadcn/ui components installed and wrapped as Wex* components",
            "Complete component documentation site with interactive examples",
            "Pattern A architecture with Wex wrapper components",
            "Single namespace exports from @/components/wex",
            "Page titles cleaned up (removed 'Wex' prefix for readability)",
            "Color swatches added to Colors foundation page",
            "Drawer, Sheet, HoverCard pages completed with all sections",
          ]}
        />

        <ChangelogEntry
          version="0.1.0"
          date="December 2024"
          title="Initial Release"
          changes={[
            "WexButton component with 5 intent variants and 3 sizes",
            "Two-layer token architecture (wex.tokens.css + wex.shadcn-bridge.css)",
            "Light and dark mode support",
            "Documentation site foundation",
            "WEX_COMPONENT_RULES.md governance document",
          ]}
        />

        <div className="rounded-lg border border-border bg-muted/50 p-6 text-center">
          <p className="text-muted-foreground">
            More releases coming soon. Watch the repository for updates.
          </p>
        </div>
      </div>
    </article>
  );
}

interface ChangelogEntryProps {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

function ChangelogEntry({ version, date, title, changes }: ChangelogEntryProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-2 py-1 text-sm font-mono bg-primary/10 text-primary rounded">
          v{version}
        </span>
        <span className="text-sm text-muted-foreground">{date}</span>
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-3">{title}</h2>
      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
        {changes.map((change, index) => (
          <li key={index}>{change}</li>
        ))}
      </ul>
    </div>
  );
}

