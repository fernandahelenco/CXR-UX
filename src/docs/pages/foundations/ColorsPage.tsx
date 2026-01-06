import * as React from "react";
import { Section } from "@/docs/components/Section";
import { Guidance } from "@/docs/components/ProseBlock";
import { ContrastBadge, ContrastIndicator } from "@/docs/components/ContrastBadge";
import { WexTooltip } from "@/components/wex";
import { getContrastData, formatContrastRatio, shouldUseDarkText, type ContrastRating } from "@/docs/utils/contrast";

/**
 * Colors foundation page
 * Shows WEX brand tokens, semantic color mappings, and contrast signals
 */
export default function ColorsPage() {
  return (
    <article>
      <header className="mb-8 pb-6 border-b border-border">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Colors
        </h1>
        <p className="text-lg text-muted-foreground">
          WEX brand palette and semantic color system.
        </p>
      </header>

      <div className="space-y-12">
        {/* Contrast Signals Section - NEW */}
        <Section
          title="Contrast Signals"
          description="Computed contrast ratios for common text/background pairings. These are test signals, not certifications."
        >
          {/* Rating Definitions - Education Section */}
          <div className="rounded-lg border border-border bg-card p-4 mb-6">
            <h4 className="font-semibold text-foreground mb-3">What These Ratings Mean</h4>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex gap-2">
                <dt className="font-medium text-success min-w-[70px]">AAA</dt>
                <dd className="text-muted-foreground">≥7.0:1 ratio — Highest readability, ideal for all text</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium text-success min-w-[70px]">AA</dt>
                <dd className="text-muted-foreground">≥4.5:1 ratio — Minimum for normal text (body copy)</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium text-warning min-w-[70px]">AA-large</dt>
                <dd className="text-muted-foreground">≥3.0:1 ratio — Only for large text (≥18pt or 14pt bold)</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium text-destructive min-w-[70px]">Fail</dt>
                <dd className="text-muted-foreground">Below thresholds — Not accessible for text use</dd>
              </div>
            </dl>
            <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-border">
              These are contrast signals for specific foreground/background pairings, not a compliance certification.
              Always verify in context with real content.
            </p>
          </div>

          <Guidance>
            Hover over any contrast badge below to see the computed ratio and pairing details.
          </Guidance>

          <div className="space-y-4 mt-6">
            {/* Primary Pairings */}
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="bg-muted/50 px-4 py-2 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">Text on Backgrounds</h3>
              </div>
              <div className="p-4 space-y-3">
                <ContrastPairing
                  label="Text on Content Background"
                  fgVar="--wex-text"
                  bgVar="--wex-content-bg"
                />
                <ContrastPairing
                  label="Text on Surface Subtle"
                  fgVar="--wex-text"
                  bgVar="--wex-surface-subtle"
                />
                <ContrastPairing
                  label="Muted Text on Content Background"
                  fgVar="--wex-text-muted"
                  bgVar="--wex-content-bg"
                />
              </div>
            </div>

            {/* Semantic Color Pairings */}
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="bg-muted/50 px-4 py-2 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">Semantic Color Pairings</h3>
              </div>
              <div className="p-4 space-y-3">
                <ContrastPairing
                  label="Primary Contrast on Primary"
                  fgVar="--wex-primary-contrast"
                  bgVar="--wex-primary"
                />
                <ContrastPairing
                  label="Danger Foreground on Danger Background"
                  fgVar="--wex-destructive-foreground"
                  bgVar="--wex-destructive"
                />
                <ContrastPairing
                  label="Success Foreground on Success Background"
                  fgVar="--wex-success-foreground"
                  bgVar="--wex-success"
                />
                <ContrastPairing
                  label="Warning Foreground on Warning Background"
                  fgVar="--wex-warning-foreground"
                  bgVar="--wex-warning"
                />
                <ContrastPairing
                  label="Info Foreground on Info Background"
                  fgVar="--wex-info-foreground"
                  bgVar="--wex-info"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Semantic Tokens Section */}
        <Section
          title="Semantic Tokens (Source of Truth)"
          description="Core WEX semantic tokens defined in design-tokens.json. These reference palette steps for consistency."
        >
          <Guidance>
            Semantic tokens reference palette steps (e.g., <code className="bg-muted px-1 rounded">var(--wex-palette-blue-700)</code>) 
            rather than raw HSL values. This enables consistent theming across light and dark modes.
          </Guidance>

          <div className="space-y-6 mt-6">
            {/* Primary */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Primary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <TokenSwatchWithContrast
                  token="--wex-primary"
                  name="Primary"
                  value="var(--wex-palette-blue-700)"
                  valueDark="var(--wex-palette-blue-500)"
                  usage="Main brand color, primary actions"
                  contrastFgVar="--wex-primary-contrast"
                />
                <TokenSwatch
                  token="--wex-primary-contrast"
                  name="Primary Contrast"
                  value="0 0% 100%"
                  valueDark="216 10% 90%"
                  usage="Text on primary backgrounds"
                  contrastBgVar="--wex-primary"
                />
                <TokenSwatch
                  token="--wex-primary-hover"
                  name="Primary Hover"
                  value="var(--wex-palette-blue-800)"
                  valueDark="var(--wex-palette-blue-600)"
                  usage="Hover state for primary actions"
                  contrastFgVar="--wex-primary-contrast"
                />
              </div>
            </div>

            {/* Danger */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Danger / Destructive</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <TokenSwatchWithContrast
                  token="--wex-destructive"
                  name="Danger Background"
                  value="var(--wex-palette-red-500)"
                  usage="Destructive actions, errors"
                  contrastFgVar="--wex-destructive-foreground"
                />
                <TokenSwatch
                  token="--wex-destructive-foreground"
                  name="Danger Foreground"
                  value="0 0% 100%"
                  usage="Text on danger backgrounds"
                  contrastBgVar="--wex-destructive"
                />
                <TokenSwatch
                  token="--wex-destructive-hover"
                  name="Danger Hover"
                  value="var(--wex-palette-red-600)"
                  usage="Hover state for destructive actions"
                  contrastFgVar="--wex-destructive-foreground"
                />
              </div>
            </div>

            {/* Success */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Success</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <TokenSwatchWithContrast
                  token="--wex-success"
                  name="Success Background"
                  value="var(--wex-palette-green-600)"
                  valueDark="var(--wex-palette-green-500)"
                  usage="Positive feedback, confirmations"
                  contrastFgVar="--wex-success-foreground"
                />
                <TokenSwatch
                  token="--wex-success-foreground"
                  name="Success Foreground"
                  value="0 0% 100%"
                  usage="Text on success backgrounds"
                  contrastBgVar="--wex-success"
                />
                <TokenSwatch
                  token="--wex-success-hover"
                  name="Success Hover"
                  value="var(--wex-palette-green-700)"
                  valueDark="var(--wex-palette-green-600)"
                  usage="Hover state for success actions"
                  contrastFgVar="--wex-success-foreground"
                />
              </div>
            </div>

            {/* Warning */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Warning</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <TokenSwatchWithContrast
                  token="--wex-warning"
                  name="Warning Background"
                  value="var(--wex-palette-amber-500)"
                  valueDark="var(--wex-palette-amber-400)"
                  usage="Caution states, attention needed"
                  contrastFgVar="--wex-warning-foreground"
                />
                <TokenSwatch
                  token="--wex-warning-foreground"
                  name="Warning Foreground"
                  value="0 0% 0%"
                  usage="Text on warning backgrounds"
                  contrastBgVar="--wex-warning"
                />
                <TokenSwatch
                  token="--wex-warning-hover"
                  name="Warning Hover"
                  value="var(--wex-palette-amber-600)"
                  valueDark="var(--wex-palette-amber-500)"
                  usage="Hover state for warning actions"
                  contrastFgVar="--wex-warning-foreground"
                />
              </div>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <TokenSwatchWithContrast
                  token="--wex-info"
                  name="Info Background"
                  value="var(--wex-palette-cyan-500)"
                  valueDark="var(--wex-palette-cyan-400)"
                  usage="Informational messages"
                  contrastFgVar="--wex-info-foreground"
                />
                <TokenSwatch
                  token="--wex-info-foreground"
                  name="Info Foreground"
                  value="0 0% 100%"
                  usage="Text on info backgrounds"
                  contrastBgVar="--wex-info"
                />
                <TokenSwatch
                  token="--wex-info-hover"
                  name="Info Hover"
                  value="var(--wex-palette-cyan-600)"
                  valueDark="var(--wex-palette-cyan-500)"
                  usage="Hover state for info actions"
                  contrastFgVar="--wex-info-foreground"
                />
              </div>
            </div>

            {/* Surfaces */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Surfaces</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <TokenSwatchWithContrast
                  token="--wex-content-bg"
                  name="Content Background"
                  value="var(--wex-palette-white)"
                  valueDark="var(--wex-palette-slate-900)"
                  usage="Page and card backgrounds"
                  contrastFgVar="--wex-text"
                />
                <TokenSwatch
                  token="--wex-content-border"
                  name="Content Border"
                  value="var(--wex-palette-slate-200)"
                  valueDark="var(--wex-palette-slate-700)"
                  usage="Borders, secondary surfaces"
                  contrastFgVar="--wex-text"
                />
                <TokenSwatchWithContrast
                  token="--wex-surface-subtle"
                  name="Surface Subtle"
                  value="var(--wex-palette-slate-100)"
                  valueDark="var(--wex-palette-slate-800)"
                  usage="Subtle backgrounds, accent, muted"
                  contrastFgVar="--wex-text"
                />
              </div>
            </div>

            {/* Text */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Text</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TokenSwatch
                  token="--wex-text"
                  name="Text"
                  value="var(--wex-palette-slate-800)"
                  valueDark="var(--wex-palette-white)"
                  usage="Primary text color"
                  contrastBgVar="--wex-content-bg"
                />
                <TokenSwatch
                  token="--wex-text-muted"
                  name="Text Muted"
                  value="var(--wex-palette-slate-600)"
                  valueDark="var(--wex-palette-slate-200)"
                  usage="Secondary/muted text"
                  contrastBgVar="--wex-content-bg"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Palette Ramps Section */}
        <Section
          title="Extended Palette (50-900 Scales)"
          description="Full color ramps for subtle UI variations. Use semantic tokens in components; these are for special cases only."
        >
          <Guidance>
            These palette tokens are provided for subtle variations and should generally NOT be used 
            directly in components unless explicitly approved. Use semantic tokens (bg-primary, bg-success, etc.) 
            for component styling. Contrast indicators show the recommended text color (dark or white) based on each shade's luminance.
          </Guidance>

          <div className="space-y-8 mt-6">
            {/* Blue Ramp */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Blue</h3>
              <PaletteRamp colorName="blue" />
            </div>

            {/* Green Ramp */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Green</h3>
              <PaletteRamp colorName="green" />
            </div>

            {/* Amber Ramp */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Amber</h3>
              <PaletteRamp colorName="amber" />
            </div>

            {/* Red Ramp */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Red</h3>
              <PaletteRamp colorName="red" />
            </div>

            {/* Slate Ramp */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Slate (Neutral)</h3>
              <PaletteRamp colorName="slate" />
            </div>
          </div>
        </Section>

        {/* Semantic Roles Section */}
        <Section
          title="Semantic Roles"
          description="How WEX tokens map to shadcn semantic variables. Use these Tailwind utilities in components."
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-foreground">Semantic Variable</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Maps To</th>
                  <th className="text-left py-3 px-2 font-medium text-foreground">Tailwind Utility</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">--background</code></td>
                  <td className="py-2 px-2">--wex-content-bg</td>
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">bg-background</code></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">--foreground</code></td>
                  <td className="py-2 px-2">--wex-text</td>
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">text-foreground</code></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">--primary</code></td>
                  <td className="py-2 px-2">--wex-primary</td>
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">bg-primary</code></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">--destructive</code></td>
                  <td className="py-2 px-2">--wex-destructive</td>
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">bg-destructive</code></td>
                </tr>
                <tr className="border-b border-border bg-success/10">
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">--success</code></td>
                  <td className="py-2 px-2">--wex-success</td>
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">bg-success</code></td>
                </tr>
                <tr className="border-b border-border bg-warning/10">
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">--warning</code></td>
                  <td className="py-2 px-2">--wex-warning</td>
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">bg-warning</code></td>
                </tr>
                <tr className="border-b border-border bg-info/10">
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">--info</code></td>
                  <td className="py-2 px-2">--wex-info</td>
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">bg-info</code></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">--muted</code></td>
                  <td className="py-2 px-2">--wex-surface-subtle</td>
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">bg-muted</code></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">--accent</code></td>
                  <td className="py-2 px-2">--wex-surface-subtle</td>
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">bg-accent</code></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">--border</code></td>
                  <td className="py-2 px-2">--wex-content-border</td>
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">border-border</code></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">--ring</code></td>
                  <td className="py-2 px-2">--wex-focus-ring-color</td>
                  <td className="py-2 px-2"><code className="bg-muted px-1 rounded">ring-ring</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Live Swatches */}
        <Section
          title="Live Swatches"
          description="Interactive preview of semantic colors (respects current theme)."
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch name="Primary" utility="bg-primary" />
            <ColorSwatch name="Secondary" utility="bg-secondary" />
            <ColorSwatch name="Accent" utility="bg-accent" />
            <ColorSwatch name="Muted" utility="bg-muted" />
            <ColorSwatch name="Destructive" utility="bg-destructive" />
            <ColorSwatch name="Success" utility="bg-success" />
            <ColorSwatch name="Warning" utility="bg-warning" />
            <ColorSwatch name="Info" utility="bg-info" />
            <ColorSwatch name="Background" utility="bg-background" bordered />
            <ColorSwatch name="Card" utility="bg-card" bordered />
            <ColorSwatch name="Border" utility="bg-border" />
          </div>
        </Section>

        {/* Chart Colors */}
        <Section
          title="Chart Colors (Placeholder)"
          description="Data visualization palette. These are temporary values pending brand guidance."
        >
          <div className="grid grid-cols-5 gap-2 mb-4">
            <div className="rounded-lg overflow-hidden border border-border">
              <div className="h-12 bg-chart-1" />
              <div className="p-2 bg-card">
                <code className="text-xs text-muted-foreground">--chart-1</code>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-border">
              <div className="h-12 bg-chart-2" />
              <div className="p-2 bg-card">
                <code className="text-xs text-muted-foreground">--chart-2</code>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-border">
              <div className="h-12 bg-chart-3" />
              <div className="p-2 bg-card">
                <code className="text-xs text-muted-foreground">--chart-3</code>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-border">
              <div className="h-12 bg-chart-4" />
              <div className="p-2 bg-card">
                <code className="text-xs text-muted-foreground">--chart-4</code>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-border">
              <div className="h-12 bg-chart-5" />
              <div className="p-2 bg-card">
                <code className="text-xs text-muted-foreground">--chart-5</code>
              </div>
            </div>
          </div>
          <Guidance>
            These chart colors are derived from existing WEX tokens as placeholders.
            Contact the design team for official data visualization color palette.
          </Guidance>
        </Section>

        {/* Usage Guidelines */}
        <Section title="Usage Guidelines">
          <div className="space-y-4 text-foreground">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-medium mb-2">Do: Use Semantic Utilities</h3>
              <p className="text-sm text-muted-foreground">
                Always use Tailwind utilities that reference semantic tokens:{" "}
                <code className="bg-muted px-1 rounded">bg-primary</code>,{" "}
                <code className="bg-muted px-1 rounded">text-foreground</code>,{" "}
                <code className="bg-muted px-1 rounded">bg-success</code>,{" "}
                <code className="bg-muted px-1 rounded">bg-warning</code>,{" "}
                <code className="bg-muted px-1 rounded">bg-info</code>
              </p>
            </div>

            <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4">
              <h3 className="font-medium mb-2 text-destructive">
                Don't: Use Raw Colors
              </h3>
              <p className="text-sm text-muted-foreground">
                Never use Tailwind color utilities like{" "}
                <code className="bg-muted px-1 rounded">bg-blue-500</code> or
                arbitrary values like{" "}
                <code className="bg-muted px-1 rounded">text-[#003366]</code>
              </p>
            </div>

            <div className="rounded-lg border border-warning/50 bg-warning/5 p-4">
              <h3 className="font-medium mb-2 text-warning">
                Palette Tokens (Use Sparingly)
              </h3>
              <p className="text-sm text-muted-foreground">
                The 50-900 palette ramps are for special cases only. They are NOT exposed
                as Tailwind utilities. If you need palette access, consult the design team.
              </p>
            </div>
          </div>
        </Section>
      </div>
    </article>
  );
}

// ============================================
// Sub-components
// ============================================

interface ContrastPairingProps {
  label: string;
  fgVar: string;
  bgVar: string;
}

function ContrastPairing({ label, fgVar, bgVar }: ContrastPairingProps) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/30">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <div
            className="w-6 h-6 rounded border border-border"
            style={{ backgroundColor: `hsl(var(${bgVar}))` }}
          />
          <span className="text-muted-foreground text-xs">+</span>
          <div
            className="w-6 h-6 rounded border border-border"
            style={{ backgroundColor: `hsl(var(${fgVar}))` }}
          />
        </div>
        <span className="text-sm text-foreground">{label}</span>
      </div>
      <ContrastBadge fgVar={fgVar} bgVar={bgVar} />
    </div>
  );
}

interface TokenSwatchProps {
  token: string;
  name: string;
  value: string;
  valueDark?: string;
  usage: string;
  /** For foreground colors: the background they're designed for */
  contrastBgVar?: string;
  /** For background colors: the foreground they're designed for */
  contrastFgVar?: string;
}

function TokenSwatch({ token, name, value, valueDark, usage, contrastBgVar, contrastFgVar }: TokenSwatchProps) {
  // Determine contrast pairing - either this is a fg color tested on a bg, or a bg color tested with a fg
  const hasPairing = contrastBgVar || contrastFgVar;
  const fgVar = contrastFgVar || token; // If this IS a foreground color, use it as fg
  const bgVar = contrastBgVar || token; // If this IS a background color, use it as bg
  
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {/* Actual color preview */}
      <div 
        className="h-16 border-b border-border"
        style={{ backgroundColor: `hsl(var(${token}))` }}
      />
      <div className="p-3 bg-card">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="font-medium text-sm text-foreground">{name}</p>
            <code className="text-xs text-muted-foreground">{token}</code>
          </div>
          {hasPairing && (
            <ContrastIndicator fgVar={fgVar} bgVar={bgVar} />
          )}
        </div>
        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
          <div>Light: <code className="bg-muted px-1 rounded">{value}</code></div>
          {valueDark && (
            <div>Dark: <code className="bg-muted px-1 rounded">{valueDark}</code></div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2 italic">{usage}</p>
      </div>
    </div>
  );
}

interface TokenSwatchWithContrastProps extends TokenSwatchProps {
  contrastFgVar: string;
}

function TokenSwatchWithContrast({ 
  token, 
  name, 
  value, 
  valueDark, 
  usage,
  contrastFgVar 
}: TokenSwatchWithContrastProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {/* Color preview - no overlay, clean swatch */}
      <div 
        className="h-16 border-b border-border"
        style={{ backgroundColor: `hsl(var(${token}))` }}
      />
      <div className="p-3 bg-card">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="font-medium text-sm text-foreground">{name}</p>
            <code className="text-xs text-muted-foreground">{token}</code>
          </div>
          {/* Contrast indicator in card area for better readability */}
          <ContrastIndicator fgVar={contrastFgVar} bgVar={token} />
        </div>
        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
          <div>Light: <code className="bg-muted px-1 rounded">{value}</code></div>
          {valueDark && (
            <div>Dark: <code className="bg-muted px-1 rounded">{valueDark}</code></div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2 italic">{usage}</p>
      </div>
    </div>
  );
}

interface ColorSwatchProps {
  name: string;
  utility: string;
  bordered?: boolean;
}

function ColorSwatch({ name, utility, bordered }: ColorSwatchProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className={`h-12 ${utility} ${bordered ? "border-b border-border" : ""}`} />
      <div className="p-2 bg-card">
        <p className="font-medium text-xs text-foreground">{name}</p>
        <code className="text-xs text-muted-foreground">{utility}</code>
      </div>
    </div>
  );
}

const paletteSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

interface PaletteRampProps {
  colorName: string;
}

function PaletteRamp({ colorName }: PaletteRampProps) {
  return (
    <div className="grid grid-cols-5 md:grid-cols-10 gap-1">
      {paletteSteps.map((step) => (
        <PaletteSwatchWithScore key={step} colorName={colorName} step={step} />
      ))}
    </div>
  );
}

interface PaletteSwatchWithScoreProps {
  colorName: string;
  step: number;
}

function PaletteSwatchWithScore({ colorName, step }: PaletteSwatchWithScoreProps) {
  const bgVar = `--wex-palette-${colorName}-${step}`;
  
  const [contrastData, setContrastData] = React.useState<{
    ratio: number;
    rating: ContrastRating;
    useDarkText: boolean;
  } | null>(null);

  React.useEffect(() => {
    // Compute contrast using adaptive text color based on luminance
    const computeContrast = () => {
      const useDark = shouldUseDarkText(bgVar);
      const fgVar = useDark ? "--wex-text" : "--wex-primary-contrast";
      const data = getContrastData(fgVar, bgVar);
      if (data) {
        setContrastData({ ratio: data.ratio, rating: data.rating, useDarkText: useDark });
      }
    };

    computeContrast();

    // Listen for theme changes (dark mode toggle)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          computeContrast();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, [bgVar]);

  const ratingLabel = contrastData?.rating || "...";
  const ratingColor = getRatingColorForPalette(contrastData?.rating);
  const useDarkText = contrastData?.useDarkText ?? false;

  return (
    <WexTooltip.Provider>
      <WexTooltip>
        <WexTooltip.Trigger asChild>
          <div className="text-center cursor-help">
            <div
              className="h-10 rounded-t-md border border-b-0 border-border relative flex items-center justify-center"
              style={{ backgroundColor: `hsl(var(${bgVar}))` }}
            >
              <span 
                className={`text-[8px] font-medium ${useDarkText ? "text-foreground/70" : "text-primary-foreground/90"}`}
              >
                {step}
              </span>
            </div>
            <div className={`text-[8px] font-semibold py-0.5 rounded-b-md border border-t-0 border-border bg-card ${ratingColor}`}>
              {ratingLabel}
            </div>
          </div>
        </WexTooltip.Trigger>
        <WexTooltip.Content side="top" className="text-xs">
          <div className="space-y-1">
            <p className="font-semibold">{colorName}-{step}</p>
            <p className="text-muted-foreground">
              {useDarkText ? "Dark" : "White"} text contrast: {contrastData ? formatContrastRatio(contrastData.ratio) : "..."}
            </p>
            <p className="text-muted-foreground">
              Rating: {ratingLabel}
            </p>
          </div>
        </WexTooltip.Content>
      </WexTooltip>
    </WexTooltip.Provider>
  );
}

function getRatingColorForPalette(rating: ContrastRating | undefined): string {
  switch (rating) {
    case "AAA":
    case "AA":
      return "text-success";
    case "AA-large":
      // Use foreground text which adapts to light/dark mode
      return "text-foreground";
    case "Fail":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
}
