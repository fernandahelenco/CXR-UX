import { ArrowDown, Info } from "lucide-react";
import { CodeBlock } from "@/docs/components/CodeBlock";

/**
 * Design Tokens Documentation Page
 *
 * Clean, scannable documentation explaining the 4-layer token architecture
 * used in the WEX Design System.
 */
export default function TokenArchitecturePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="font-display text-4xl font-bold tracking-tight">
          Design Tokens
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A 4-layer token architecture enabling granular theming without
          sacrificing consistency.
        </p>
      </div>

      {/* Token Cascade Visual - Vertical Flow */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold">Token Cascade</h2>
        <div className="rounded-xl border border-border bg-gradient-to-b from-muted/30 to-muted/10 p-6">
          <div className="space-y-3">
            <CascadeRow
              layer="1a"
              label="Palette"
              token="--wex-palette-blue-700"
              value="208 100% 32%"
              sublabel="Raw color values"
            />
            <CascadeArrow />
            <CascadeRow
              layer="1b"
              label="Semantic"
              token="--wex-primary"
              value="var(--wex-palette-blue-700)"
              sublabel="Meaningful names"
            />
            <CascadeArrow />
            <CascadeRow
              layer="2"
              label="Bridge"
              token="--primary"
              value="var(--wex-primary)"
              sublabel="shadcn compatibility"
            />
            <CascadeArrow />
            <CascadeRow
              layer="3"
              label="Component"
              token="--wex-component-button-primary-bg"
              value="var(--wex-primary)"
              sublabel="Per-component slots"
            />
            <CascadeArrow />
            <CascadeRow
              layer="4"
              label="Tailwind"
              token="bg-primary"
              value="hsl(var(--primary))"
              sublabel="CSS utilities"
            />
          </div>
        </div>
      </section>

      {/* File Reference Table */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold">File Reference</h2>
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium w-20">Layer</th>
                <th className="px-4 py-3 text-left font-medium">File</th>
                <th className="px-4 py-3 text-left font-medium">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 font-mono text-xs">Source</td>
                <td className="px-4 py-3 font-mono text-xs text-primary">
                  design-tokens.json
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Single source of truth for all token values (JSON format)
                </td>
              </tr>
              <tr className="border-t border-border bg-muted/25">
                <td className="px-4 py-3 font-mono text-xs">1</td>
                <td className="px-4 py-3 font-mono text-xs text-primary">
                  design-tokens.css (generated)
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Palette ramps and semantic tokens as CSS custom properties
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 font-mono text-xs">2</td>
                <td className="px-4 py-3 font-mono text-xs text-primary">
                  shadcn-bridge.css
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Maps WEX tokens to shadcn variables
                </td>
              </tr>
              <tr className="border-t border-border bg-muted/25">
                <td className="px-4 py-3 font-mono text-xs">3</td>
                <td className="px-4 py-3 font-mono text-xs text-primary">
                  components-bridge.css
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Granular component slot tokens
                </td>
              </tr>
              <tr className="border-t border-border bg-muted/25">
                <td className="px-4 py-3 font-mono text-xs">4</td>
                <td className="px-4 py-3 font-mono text-xs text-primary">
                  tailwind.config.ts
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Exposes tokens as Tailwind utilities
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Code Example */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold">Example</h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Semantic tokens reference palette steps. Dark mode swaps to different
          palette steps for contrast.
        </p>
        <CodeBlock
          code={`:root {
  /* Palette primitives */
  --wex-palette-blue-700: 208 100% 32%;
  --wex-palette-blue-800: 208 100% 26%;
  
  /* Semantic tokens reference palette */
  --wex-primary: var(--wex-palette-blue-700);
  --wex-primary-hover: var(--wex-palette-blue-800);
}

.dark {
  --wex-primary: var(--wex-palette-blue-500);
  --wex-primary-hover: var(--wex-palette-blue-600);
}`}
        />
      </section>

      {/* Layer 3: Component Slots */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold">
          Layer 3: Component Slots
        </h2>
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <p className="font-mono text-sm">
            --wex-component-
            <span className="text-primary">{"{component}"}</span>-
            <span className="text-muted-foreground">{"{variant?}"}</span>-
            <span className="text-primary">{"{slot}"}</span>
          </p>
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left font-medium">
                  Button Token
                </th>
                <th className="px-4 py-2 text-left font-medium">References</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "--wex-component-button-primary-bg",
                  ref: "var(--wex-primary)",
                },
                {
                  name: "--wex-component-button-primary-fg",
                  ref: "var(--wex-primary-contrast)",
                },
                {
                  name: "--wex-component-button-primary-hover-bg",
                  ref: "var(--wex-primary-hover)",
                },
                {
                  name: "--wex-component-button-secondary-bg",
                  ref: "var(--wex-surface-subtle)",
                },
                {
                  name: "--wex-component-button-destructive-bg",
                  ref: "var(--wex-destructive)",
                },
              ].map((token, i) => (
                <tr
                  key={token.name}
                  className={i % 2 === 0 ? "border-t border-border" : "border-t border-border bg-muted/25"}
                >
                  <td className="px-4 py-2 font-mono text-xs">{token.name}</td>
                  <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                    {token.ref}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          See individual component pages for full token reference.
        </p>
      </section>

      {/* Rules */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold">Rules</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-destructive font-medium shrink-0">
              Required
            </span>
            <span className="text-muted-foreground">
              Layer 3 tokens must reference Layer 1 (semantic or palette), never
              raw hex/HSL values.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-destructive font-medium shrink-0">
              Required
            </span>
            <span className="text-muted-foreground">
              No circular references between tokens.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-destructive font-medium shrink-0">
              Required
            </span>
            <span className="text-muted-foreground">
              All Layer 3 tokens use the{" "}
              <code className="bg-muted px-1 rounded">--wex-component-*</code>{" "}
              prefix.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-info font-medium shrink-0">Recommended</span>
            <span className="text-muted-foreground">
              Reference semantic tokens for automatic dark mode support.
            </span>
          </li>
        </ul>
      </section>

      {/* Future Note */}
      <aside className="flex items-start gap-3 bg-muted/30 border border-border rounded-lg p-4">
        <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Future:</span> Token
          files will be generated from Style Dictionary JSON sources. The bridge
          file will remain hand-authored.
        </p>
      </aside>
    </div>
  );
}

// ============================================================
// Helper Components
// ============================================================

interface CascadeRowProps {
  layer: string;
  label: string;
  token: string;
  value: string;
  sublabel?: string;
}

function CascadeRow({ layer, label, token, value, sublabel }: CascadeRowProps) {
  return (
    <div className="flex items-center gap-4 bg-background/50 rounded-lg px-4 py-3 border border-border/50">
      <div className="flex items-center gap-2 shrink-0 w-36">
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold">
          {layer}
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-medium leading-tight">{label}</span>
          {sublabel && (
            <span className="text-[10px] text-muted-foreground leading-tight">{sublabel}</span>
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <code className="text-sm font-mono text-primary break-all">
          {token}
        </code>
      </div>
      <div className="hidden sm:block text-right shrink-0">
        <code className="text-xs font-mono text-muted-foreground">
          {value}
        </code>
      </div>
    </div>
  );
}

function CascadeArrow() {
  return (
    <div className="flex justify-center pl-16">
      <ArrowDown className="w-4 h-4 text-muted-foreground" />
    </div>
  );
}
