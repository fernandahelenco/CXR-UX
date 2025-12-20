# Color Palette Generator - Future Enhancement

> Saved from design system discussion on Dec 20, 2024

## Overview

This document outlines plans to create a reusable color palette generator that:
1. Takes brand hex colors as input
2. Generates accessible 50-900 luminosity scales
3. Outputs CSS variables for `wex.tokens.css`

---

## Current Architecture

```
src/styles/wex.tokens.css          ← SOURCE OF TRUTH (designer edits here)
src/styles/wex.shadcn-bridge.css   ← Maps WEX → shadcn semantic variables
tailwind.config.ts                 ← Consumes via hsl(var(...))
```

### Data Flow

```
wex.tokens.css (HSL values)
        ↓
wex.shadcn-bridge.css (maps --wex-* → --primary, --warning, etc.)
        ↓
tailwind.config.ts (consumes --primary, --warning via hsl(var(...)))
        ↓
Tailwind utilities (bg-primary, text-warning, etc.)
```

---

## Designer Handoff

When a designer needs to update brand colors:
1. Edit `src/styles/wex.tokens.css`
2. Update the `--wex-primary`, `--wex-danger-*`, `--wex-success-*`, `--wex-warning-*` values
3. Optionally regenerate palette ramps (50-900) using the generator script

### Key Token Sections in wex.tokens.css

| Section | Purpose |
|---------|---------|
| `--wex-primary` | Main brand blue |
| `--wex-danger-*` | Error/destructive states |
| `--wex-success-*` | Success states |
| `--wex-warning-*` | Warning states |
| `--wex-info-*` | Informational states |
| `--wex-palette-*-50` to `900` | Extended color scales |

---

## Proposed Script: `scripts/generate-palette.ts`

```typescript
import Color from "color"; // npm install color

interface BrandColors {
  primary: string;    // e.g., "#0052a3"
  success: string;    // e.g., "#16a34a"
  warning: string;    // e.g., "#f59e0b"
  danger: string;     // e.g., "#dc2626"
}

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

// Lightness targets for each step (designed for WCAG contrast)
const LIGHTNESS_MAP: Record<number, number> = {
  50: 97,   // Very light (backgrounds)
  100: 93,
  200: 85,
  300: 72,
  400: 56,
  500: 45,  // Base/mid
  600: 38,
  700: 32,  // Primary action level
  800: 26,
  900: 20,  // Darkest
};

function generatePaletteRamp(baseColor: string, name: string): string[] {
  const color = Color(baseColor);
  const hue = color.hsl().hue();
  const saturation = color.hsl().saturationl();

  return STEPS.map((step) => {
    const lightness = LIGHTNESS_MAP[step];
    return `  --wex-palette-${name}-${step}: ${Math.round(hue)} ${Math.round(saturation)}% ${lightness}%;`;
  });
}

function generateTokensCSS(brand: BrandColors): string {
  const output: string[] = [];
  
  output.push("/* Auto-generated palette from brand colors */");
  output.push(":root {");
  
  output.push("  /* Blue ramp (from primary) */");
  output.push(...generatePaletteRamp(brand.primary, "blue"));
  output.push("");
  
  output.push("  /* Green ramp (from success) */");
  output.push(...generatePaletteRamp(brand.success, "green"));
  output.push("");
  
  output.push("  /* Amber ramp (from warning) */");
  output.push(...generatePaletteRamp(brand.warning, "amber"));
  output.push("");
  
  output.push("  /* Red ramp (from danger) */");
  output.push(...generatePaletteRamp(brand.danger, "red"));
  
  output.push("}");
  
  return output.join("\n");
}

// WEX Brand Colors (update these when brand changes)
const WEX_BRAND: BrandColors = {
  primary: "#0052a3",   // WEX Blue
  success: "#16a34a",   // Green
  warning: "#f59e0b",   // Amber
  danger: "#dc2626",    // Red
};

console.log(generateTokensCSS(WEX_BRAND));
```

---

## Usage (Once Implemented)

```bash
# Install dependency
npm install color @types/color

# Run generator
npx ts-node scripts/generate-palette.ts > src/styles/_generated-palette.css

# Or add to package.json:
"scripts": {
  "generate:palette": "ts-node scripts/generate-palette.ts"
}
```

---

## Known Issues to Address

### Warning Foreground Contrast
- `--wex-warning-fg: 0 0% 0%` (black) fails contrast on dark backgrounds
- **Solution**: Use `text-warning` (amber) for icons/text NOT on amber backgrounds
- **Consider**: Adding `--wex-warning-icon` token for this use case

### Foreground Token Design Pattern
For each semantic color, we have:
- `--wex-{color}-bg` - The background color
- `--wex-{color}-fg` - Text color FOR USE ON that background
- `--wex-{color}-hover` - Hover state of the background

The `-fg` tokens are designed for text ON the colored background, not for use as standalone icon/text colors on arbitrary backgrounds.

---

## Future Enhancement: Interactive Widget

Add a page to the docs site (`/tools/palette-generator`) that:
1. Lets designer input hex values in a form
2. Live-previews the generated palette with contrast scores
3. Has "Copy CSS" button to export
4. Shows WCAG AA/AAA ratings for each generated step

---

## Related Files

| File | Purpose |
|------|---------|
| `src/styles/wex.tokens.css` | Token definitions (source of truth) |
| `src/styles/wex.shadcn-bridge.css` | Semantic mappings to shadcn |
| `tailwind.config.ts` | Tailwind color consumption |
| `WEX_COMPONENT_RULES.md` | Governance rules |
| `src/docs/pages/foundations/ColorsPage.tsx` | Colors documentation |

---

## Implementation Checklist

- [ ] Create `scripts/generate-palette.ts`
- [ ] Add `color` package as dev dependency
- [ ] Add npm script `generate:palette`
- [ ] Test output matches existing palette structure
- [ ] Document in WEX_COMPONENT_RULES.md
- [ ] (Optional) Build interactive widget in docs site

