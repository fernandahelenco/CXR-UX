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
          version="1.1.0"
          date="December 30, 2025"
          title="Button Outline Variants & A11y Fixes"
          changes={[
            "BREAKING: WexButton API refactored - added 'variant' prop (solid | outline | ghost | link)",
            "BREAKING: WexButton 'intent' now restricted to semantic values only (primary, secondary, success, info, warning, destructive, help, contrast)",
            "BREAKING: Removed ghost, outline, link from intent - use variant prop instead",
            "Components: Outline variant now works with ALL intents (not just neutral)",
            "Components: Tinted hover/active backgrounds for outline buttons per intent",
            "Components: Removed outline-contrast variant (too similar to outline-secondary)",
            "Tokens: Added 64 new CSS variables for outline button variants (fg, border, hover-bg, active-bg per intent)",
            "Tailwind: Added outline-* utilities for each button intent",
            "A11y: Fixed WexTabs nested-interactive issue with closable tabs",
            "A11y: Fixed WexFloatLabel target-size issue (password toggle now 24x24)",
            "A11y: Fixed WexChart svg-img-alt with MutationObserver to hide SVG from AT",
            "A11y: All 57 components now pass accessibility tests (light and dark modes)",
            "A11y: Added 16 new ExampleCards for outline button variants with proper test coverage",
            "Tokens: Fixed dark mode outline colors using valid palette shades (900/800 instead of 950)",
            "Tokens: Fixed outline-warning contrast (amber-800 instead of amber-700)",
            "Tokens: Fixed outline-destructive dark contrast (red-300 instead of red-400)",
            "Tokens: Fixed outline-help dark contrast (purple-300 instead of purple-400)",
            "Docs: Updated ButtonPage with Outline Severities section",
            "Docs: Updated API Reference to reflect variant/intent split",
            "Version: Bumped @wex/components and root package to 1.1.0",
          ]}
        />

        <ChangelogEntry
          version="0.23.0"
          date="December 29, 2025"
          title="Float Label Component & Extended Test Coverage"
          changes={[
            "Components: Added WexFloatLabel - floating label input matching PrimeNG 'in' variant",
            "Components: Float label supports leftIcon and rightIcon props for visual context",
            "Components: Float label includes all sizes (sm, md, lg), disabled, and invalid states",
            "Tokens: Added floatlabel tokens (label-fg, label-focus-fg, label-filled-fg, label-bg)",
            "Testing: Expanded 8 under-tested components from 1-2 tests to 10-18 tests each",
            "Testing: WexSidebar expanded from 1 to 18 tests (structure, menus, groups, trigger)",
            "Testing: WexInputOTP expanded from 1 to 15 tests (rendering, input, controlled, disabled)",
            "Testing: WexSonner expanded from 1 to 14 tests (toast types, dismissal, promise)",
            "Testing: WexForm expanded from 2 to 15 tests (validation, submission, field types)",
            "Testing: WexContextMenu expanded from 1 to 12 tests (interaction, variants, sub-menus)",
            "Testing: WexBreadcrumb expanded from 2 to 13 tests (links, separators, ellipsis)",
            "Testing: WexPagination expanded from 2 to 12 tests (navigation, active state)",
            "Testing: WexHoverCard expanded from 2 to 11 tests (interactions, trigger variations)",
            "Testing: Added 31 unit tests for WexFloatLabel (rendering, icons, accessibility)",
            "Testing: Total tests increased to 877 with 97% pass rate",
            "A11y: Float label passes all accessibility tests (4 examples tested in light/dark)",
            "Infra: Added JSDOM mocks for elementFromPoint, hasPointerCapture, setPointerCapture",
            "Docs: Added Float Label documentation page with icon examples",
            "Docs: Cross-linked Float Label from Input page",
          ]}
        />

        <ChangelogEntry
          version="0.22.0"
          date="December 29, 2025"
          title="Comprehensive Unit Test Suite"
          changes={[
            "Testing: Expanded unit tests from 257 to 745 tests (189% increase)",
            "Testing: 719 tests passing with 97% pass rate",
            "Testing: Added interaction tests - click handlers, toggle behaviors, open/close",
            "Testing: Added keyboard navigation tests - Arrow keys, Tab, Enter, Escape",
            "Testing: Added state management tests - controlled/uncontrolled modes, callbacks",
            "Testing: Added form integration tests - name, value, required attributes",
            "Testing: Added accessibility tests - ARIA roles, labels, states",
            "Testing: Added edge case tests - rapid actions, empty states, limits",
            "Components: WexButton tests expanded from 4 to 47 tests",
            "Components: WexInput tests expanded from 3 to 54 tests",
            "Components: WexCheckbox tests expanded from 3 to 29 tests",
            "Components: WexSwitch tests expanded from 3 to 29 tests",
            "Components: WexDialog tests expanded from 3 to 23 tests",
            "Components: WexSheet tests expanded from 3 to 24 tests",
            "Components: WexTabs tests expanded from 4 to 33 tests",
            "Components: WexAccordion tests expanded from 3 to 31 tests",
            "Components: WexSelect tests expanded from 4 to 33 tests",
            "Components: WexCombobox tests expanded from 4 to 35 tests",
            "Components: WexDropdownMenu tests expanded from 2 to 32 tests",
            "Components: WexRadioGroup tests expanded from 4 to 35 tests",
            "Components: WexSlider tests expanded from 5 to 42 tests",
            "Dashboard: Updated Unit Tests page with comprehensive coverage notes",
            "Dashboard: Added test category cards showing coverage areas",
          ]}
        />

        <ChangelogEntry
          version="0.21.0"
          date="December 23, 2025"
          title="100% Accessibility Pass Rate"
          changes={[
            "A11y: All 56 components now pass accessibility tests (386 tests, 0 failures)",
            "A11y: Fixed InputOTP route and manifest - now properly tested",
            "A11y: Redesigned AccessibilityPage KPIs - consolidated into single row",
            "A11y: Redesigned A11yResultsSection with light/dark mode indicators (☀️/🌙)",
            "A11y: Added last tested date to component accessibility summaries",
            "Tokens: Added adaptive text tokens (text-success, text-destructive, text-info, text-warning) for dark mode contrast",
            "Tokens: Added link tokens (--wex-link, --wex-link-hover, --wex-link-active) with proper dark mode overrides",
            "Tokens: Darkened success (green-700) and info (cyan-700) for WCAG 4.5:1 contrast",
            "Components: Fixed Slider ARIA - labels now on thumbs, not root element",
            "Components: Added grab/grabbing cursor to Slider thumb for better UX",
            "Components: Fixed Tabs nested-interactive ARIA issue in ClosableTabsTrigger",
            "Components: Fixed Field error text to use Layer 3 token for dark mode contrast",
            "Styles: Added text selection styles (blue-100 light, blue-800 dark)",
            "Manifest: Created a11y-test-manifest.json for explicit test control per component",
            "Docs: Split Badge and Button pages into individual ExampleCards for granular testing",
            "Docs: Updated 8 component pages with proper aria-labels",
          ]}
        />

        <ChangelogEntry
          version="0.20.0"
          date="December 23, 2025"
          title="Layer 3 Complete Token Migration for axe-core Reliability"
          changes={[
            "Tokens: Added 60+ new Layer 3 component tokens for Alert, Avatar, Calendar, Sidebar, Field, Empty, Item, Input-Group, Chart, and DataTable",
            "Tokens: Added Alert default and warning variant tokens (previously using Layer 2)",
            "Tailwind: Added 40+ new wex.* utilities for Calendar, Avatar, Sidebar, Field, Empty, Item, InputGroup, Chart, and DataTable",
            "Components: Migrated WexAlert default and warning variants from Layer 2 to Layer 3 tokens",
            "Components: Migrated Calendar component from bg-background/text-muted-foreground to Layer 3 tokens",
            "Components: Migrated Avatar component from bg-muted/text-muted-foreground to Layer 3 tokens",
            "Components: Migrated Sidebar component from bg-background to Layer 3 tokens",
            "Components: Migrated Field component from text-muted-foreground to Layer 3 tokens",
            "Components: Migrated Empty component from bg-muted/text-muted-foreground to Layer 3 tokens",
            "Components: Migrated Item component from bg-muted/text-muted-foreground to Layer 3 tokens",
            "Components: Migrated InputGroup component from text-muted-foreground to Layer 3 tokens",
            "Components: Migrated Pagination component from text-muted-foreground to Layer 3 tokens",
            "Components: Migrated Badge component from Layer 2 to Layer 3 tokens",
            "Components: Migrated Chart component from bg-background/text-foreground to Layer 3 tokens",
            "Components: Migrated DataTable component from bg-background/text-muted-foreground to Layer 3 tokens",
            "A11y: Reduced CSS variable nesting depth from 4 to 2 levels for improved axe-core compatibility",
            "Architecture: All components now use explicit Layer 3 tokens with predictable contrast",
          ]}
        />

        <ChangelogEntry
          version="0.19.0"
          date="December 23, 2025"
          title="Code Quality & Convention Enforcement"
          changes={[
            "Components: Fixed WexButton asChild prop - no longer renders loading spinner when asChild is true (prevents React.Children.only error)",
            "Components: Fixed AvatarBadge being clipped by overflow-hidden on Avatar container",
            "A11y: Enhanced Accessibility Dashboard with per-variant pass/fail status for light and dark modes",
            "A11y: Variant badges now show color-coded indicators (green/red) with sun/moon icons for mode",
            "Docs: Updated 16 component pages to use Wex-prefixed imports (WexCard, WexDialog, WexTable, etc.)",
            "Docs: All code examples now show correct @/components/wex import pattern",
            "Wrappers: Extended WexAvatar with Group and Badge subcomponents",
            "Wrappers: Extended WexSkeleton with Card and List subcomponents",
            "Wrappers: Extended WexTabs with ScrollableList and ClosableTrigger subcomponents",
            "Wrappers: Extended WexPagination with First, Last, RowsPerPage, PageReport, JumpToPage subcomponents",
            "Convention: Enforced namespace pattern (WexTable.Row vs WexTableRow) across all compound components",
          ]}
        />

        <ChangelogEntry
          version="0.18.0"
          date="December 22, 2025"
          title="Phase 4: PrimeNG Variant Parity & Token Architecture Polish"
          changes={[
            "Components: Added 11 button intent variants (primary, secondary, success, info, warning, destructive, help, contrast, ghost, outline, link)",
            "Components: Added button modifiers (rounded/pill) and loading state with spinner",
            "Components: Removed raised button modifier (not needed)",
            "Components: Added Input sizes (sm, md, lg), filled variant, icons, and invalid state",
            "Components: Added Textarea sizes and autoResize functionality",
            "Components: Added Checkbox, RadioGroup, Switch sizes (sm, md, lg)",
            "Components: Added Slider range mode support",
            "Components: Added Progress indeterminate and showLabel props",
            "Components: Added Avatar sizes, shapes (circle/square), groups, and badge variants",
            "Components: Added Card variants (default, elevated, outlined, flat)",
            "Components: Added Dialog sizes, positions, and maximizable props",
            "Components: Added Sheet sizes",
            "Components: Added Tabs underline indicator styling (PrimeNG style)",
            "Components: Added ScrollableTabsList and ClosableTabsTrigger for Tabs",
            "Components: Added Pagination RowsPerPage, PageReport, JumpToPage, First/Last components",
            "Components: Added Badge sizes and pill modifier",
            "Components: Added Skeleton shapes and animations",
            "Components: Added Tooltip delayDuration prop",
            "Components: Added Table striped, gridlines, and size variants",
            "Docs: Updated 18 component documentation pages with Phase 4 variants",
            "Docs: Added interactive password toggle example to Input page",
            "Docs: Added reactive character counter example to Textarea page",
            "Docs: Created PrimeNG Parity tracking page under Foundations",
            "Tokens: Extended Layer 3 component tokens for all Phase 4 variants",
            "Architecture: Maintained 4-layer token system integrity throughout Phase 4",
          ]}
        />

        <ChangelogEntry
          version="0.17.0"
          date="December 21, 2025"
          title="WCAG Contrast Checker, Complete Component Coverage & NPM Package"
          changes={[
            "Contrast: Renamed A11y checker to 'WCAG Contrast' for clarity",
            "Contrast: Added sun/moon icon to indicate which mode (light/dark) is being checked",
            "Contrast: Badges now show actual contrast ratio (e.g., '4.8:1') instead of 'AA'",
            "Contrast: Added contrast pairs for all 57 WEX components",
            "Components: Added live previews for Spinner, ButtonGroup, Pagination, Avatar, Textarea, Select",
            "Components: Created 'Additional Components' collapsible lists for non-renderable components",
            "Components: Added Additional Components sections to Primary, Destructive, Success, Warning, Info tokens",
            "Components: Added Additional Components sections to Surface Background, Surface Muted, Border, Input Border",
            "Coverage: All 57 WEX components now accounted for (27 live + 22 additional + 8 structural)",
            "Package: Created @wex/design-tokens package scaffold in packages/design-tokens/",
            "Package: Includes tokens.css, shadcn-bridge.css, and tailwind-preset.js",
            "Package: Added consumer-facing README.md with usage documentation",
            "Docs: Created PACKAGE_MAINTENANCE.md with versioning strategy and Artifactory publishing guide",
            "Docs: Updated TOKEN_CASCADE_ANALYSIS.md to reflect complete Theme Builder coverage",
          ]}
        />

        <ChangelogEntry
          version="0.16.0"
          date="December 21, 2025"
          title="Theme Builder V5 - Production Ready & Code Cleanup"
          changes={[
            "Export: Export theme button now always enabled - export current theme state anytime",
            "Export: Removed header and 'Back to Preview' button from export view for cleaner UX",
            "Export: Added Prism.js syntax highlighting for CSS and JSON code blocks",
            "Navigation: Fixed previous page tracking - now correctly returns to page you came from",
            "Navigation: Remembers navigation path (homepage → page → theme builder → back to page)",
            "UX: Removed unsaved changes dialog - changes are auto-saved to localStorage",
            "UX: Streamlined exit flow - no confirmation needed since changes persist automatically",
            "Code: Removed all debug logging and agent instrumentation code",
            "Code: Cleaned up unused components, imports, and debug data attributes",
            "Code: Removed temporary debug fetch calls and console.log statements",
            "Performance: Optimized code by removing unused PaletteRampRow component",
            "Quality: Production-ready codebase with all development artifacts removed",
          ]}
        />

        <ChangelogEntry
          version="0.15.0"
          date="December 21, 2025"
          title="Theme Builder V4 - Clean Rebuild with Two-Layer Architecture"
          changes={[
            "Architecture: Two distinct layers - Palette Ramps (mode-agnostic) and Semantic Tokens (mode-specific)",
            "Palette Ramps: Set a 500 base color, system auto-generates full 50-900 ramp",
            "Palette Ramps: Affects both light and dark modes (source of truth for colors)",
            "Semantic Editor: Assign palette shades to semantic tokens per mode",
            "Semantic Editor: Dropdown shows all available shades from all palettes",
            "Semantic Editor: Light/Dark toggle switches which assignments you're editing",
            "Cascade Display: Visual chain showing palette → semantic → component flow",
            "Cascade Display: Lists all affected components including transparency variants",
            "Live Preview: Real-time component updates with buttons, badges, progress, switches",
            "Live Preview: Includes checkbox, radio, skeleton components",
            "Left Nav: Inline palette swatches with mode-aware usage indicators",
            "Left Nav: Dots on swatches show which shades are in use for current mode",
            "Utils: Created ramp-generator.ts for 50-900 ramp generation from base color",
            "UX: Clean workspace with Palette Ramps / Semantic Tokens view toggle",
            "UX: Removed cluttered Palette/Semantic tabs from previous version",
          ]}
        />

        <ChangelogEntry
          version="0.14.0"
          date="December 21, 2025"
          title="Theme Builder V4 - Simplified Navigation & Real-Time A11y"
          changes={[
            "Navigation: Replaced over-engineered category nav with inline palette swatches",
            "Navigation: Each palette row shows clickable 50-900 shade swatches",
            "Navigation: Usage indicators (dots) show which shades are referenced by semantic tokens",
            "Navigation: Brand Colors section for WEX Red and other brand-specific colors",
            "A11y: Replaced misleading 'Token Conflicts' with real-time WCAG contrast checking",
            "A11y: Header shows count of contrast failures that need attention",
            "A11y: Expandable details show exactly which foreground/background pairs fail",
            "A11y: Defined contrast pairs for all semantic color combinations",
            "Dialogs: Reset confirmation now uses WexAlertDialog instead of browser confirm()",
            "Dialogs: Exit confirmation for unsaved changes uses WexAlertDialog",
            "Editor: Fixed reset state bug where editor panel color didn't update after reset",
            "Editor: Shared state via ThemeBuilderContext for consistent selection across components",
            "Preview: Added Checkbox, Radio Group, and Skeleton components",
            "Preview: All components now shown with per-variant 'affected' highlighting",
            "Preview: Affected components get visual ring highlight when their token is selected",
            "Code: Created checkAllContrastPairs() in contrast.ts for real-time accessibility checking",
            "Code: Added CONTRAST_PAIRS constant defining all foreground/background relationships",
            "Code: Extended ThemeBuilderContext with selectedToken state for shared selection",
          ]}
        />

        <ChangelogEntry
          version="0.13.0"
          date="December 21, 2025"
          title="Theme Builder V3 - Token Architecture"
          changes={[
            "Architecture: Wired semantic tokens to palette references establishing proper cascade",
            "Architecture: Palette tokens (50-900) are now the single source of truth for colors",
            "Architecture: Changing a palette color automatically updates all semantic tokens",
            "Palette: Added new Cyan palette (50-900) for info token",
            "Tokens: Primary → blue-700 (light) / blue-500 (dark)",
            "Tokens: Destructive → red-500/600 for base/hover",
            "Tokens: Success → green-600/700 (light) / green-500/600 (dark)",
            "Tokens: Warning → amber-500/600 (light) / amber-400/500 (dark)",
            "Tokens: Info → cyan-500/600 (light) / cyan-400/500 (dark)",
            "Tokens: Focus ring now references primary palette",
            "UI: Token-first editing experience - select palette or semantic tokens",
            "UI: Cascade visualization shows palette → semantic → component chain",
            "UI: Conflict detection warns when multiple tokens resolve to same color",
            "Data: Created tokenRegistry.ts with full token definitions and cascade data",
            "Data: Extended TokenMapping.tsx with reverse lookups and cascade chains",
            "Export: Style Dictionary compatible JSON maintains token references",
          ]}
        />

        <ChangelogEntry
          version="0.12.0"
          date="December 21, 2025"
          title="Theme Builder V2 - Figma-Style Editing"
          changes={[
            "Theme Builder: Complete V2 redesign with Figma-style selection-driven editing",
            "Left Rail: Replaced sidebar with ThemeBuilderNav for global/component selection",
            "Left Rail: Global tokens section (Surfaces, Text, Borders, Focus, Radii, Brand)",
            "Left Rail: Component list with a11y badges showing failing components per mode",
            "Workspace: Selection-driven preview - click a component to see all its variants",
            "Workspace: Global category previews with relevant component examples",
            "Properties: Scoped token editors - only shows tokens used by selected item",
            "Properties: Each token shows WEX → Tailwind utility mapping",
            "A11y: Mode toggle shows issue counts for light/dark modes",
            "A11y: Warning badges on components with accessibility issues",
            "A11y: Inline guidance for fixing color-contrast issues",
            "Token Map: New modal showing full WEX → Tailwind → Component mappings",
            "Token Map: Searchable/filterable reference for all design tokens",
            "Guards: Unsaved changes warning on exit and browser close",
            "Guards: Reset confirmation dialog to prevent accidental data loss",
            "Export: Download overrides as Style Dictionary compatible JSON",
            "Data: Created componentTokenMap.ts mapping components to their tokens",
            "Data: Created useThemeBuilderState hook for selection management",
          ]}
        />

        <ChangelogEntry
          version="0.11.0"
          date="December 20, 2025"
          title="Theme Builder Initial Release"
          changes={[
            "Theme Builder: Initial implementation with app-style layout",
            "Layout: Full-width three-region design (top bar, center workspace, right properties panel)",
            "Layout: Removed docs page constraints for full viewport usage",
            "Properties: Collapsible token groups organized by semantic purpose",
            "Properties: Added Surfaces, Borders, Focus tokens sections",
            "Preview: Live component preview with buttons, badges, alerts, forms, cards",
            "Preview: Contrast validation panel with WCAG rating badges",
            "A11y Tab: Integrated compliance.json data showing all 54 components",
            "Export: Download theme overrides as Style Dictionary compatible JSON",
            "UX: Mode toggle (light/dark) in top bar for editing either mode",
            "UX: Unsaved changes indicator with reset button",
          ]}
        />

        <ChangelogEntry
          version="0.10.0"
          date="December 20, 2025"
          title="Architecture Documentation & Dialog Fix"
          changes={[
            "Fix: Resolved Dialog/Sheet component conflict caused by shared Radix primitive mutation",
            "Fix: Created wrapper function pattern to isolate namespace properties per component",
            "Docs: Added Architecture page explaining WEX component strategy and enterprise value",
            "Docs: Architecture page includes dependency model diagram and update path explanation",
            "Docs: Package comparison table for @wex/components vs @wex/design-tokens",
            "Docs: Updated CONTRIBUTING.md with Object.assign gotcha and correct wrapper pattern",
            "Docs: Added 'Understanding the WEX Wrapper Architecture' section to contributor guide",
            "Docs: Updated Getting Started page with package options and link to Architecture",
            "Docs: Added Design Tokens reference section to all 54 component pages for @wex/design-tokens users",
            "Navigation: Added Architecture link under Resources section",
          ]}
        />

        <ChangelogEntry
          version="0.9.0"
          date="December 20, 2025"
          title="Contributing Components Guide"
          changes={[
            "Docs: Added CONTRIBUTING.md with step-by-step guide for creating WEX components",
            "Docs: Added /contributing page under Resources with visual workflow documentation",
            "Docs: Includes simple and compound component templates with CVA patterns",
            "Docs: Technical requirements checklist referencing WEX_COMPONENT_RULES.md",
            "Docs: Unit test template and validation commands",
            "Docs: PR checklist for component submissions",
            "Docs: RFC submission workflow for Design System Team approval",
            "Navigation: Added Contributing link to Resources section",
          ]}
        />

        <ChangelogEntry
          version="0.8.0"
          date="December 20, 2025"
          title="Semantic Variants & Navigation"
          changes={[
            "Components: Added success, warning, and info intent variants to WexAlert",
            "Components: Added success, warning, and info intent variants to WexBadge",
            "Tokens: Unlocked semantic color tokens (success, warning, info) that were previously blocked",
            "Docs: Updated AlertPage with live examples for all new intent variants",
            "Docs: Updated BadgePage with live examples for all new intent variants",
            "Navigation: Reorganized sidebar - moved Accessibility and Story to new 'About' section before Foundations",
            "Navigation: Added visual separation between nav sections with border and accent indicator",
            "Navigation: Changed hover/active states from gray to blue tint matching brand",
            "Layout: Improved Section component with className prop support and better spacing",
            "A11y: Known issue - dark mode Alert variants have color-contrast warnings (investigating)",
          ]}
        />

        <ChangelogEntry
          version="0.7.0"
          date="December 20, 2025"
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
          date="December 19, 2025"
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
          date="December 19, 2025"
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
          date="December 19, 2025"
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
          date="December 19, 2025"
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
          date="December 19, 2025"
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
          date="December 2025"
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
          date="December 2025"
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

