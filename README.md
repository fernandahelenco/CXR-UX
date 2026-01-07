# WEX Design System (React)

A comprehensive React design system built with TypeScript, Tailwind CSS, and shadcn/ui primitives. This repository contains both the publishable packages and the documentation site.

## Packages

| Package | Description |
|---------|-------------|
| `@wex/components` | Full component library with WEX-branded variants and namespace patterns |
| `@wex/design-tokens` | CSS variables, Tailwind preset, and shadcn bridge for theming |

## For Consumers

### Installation

```bash
# Install both packages
npm install @wex/components @wex/design-tokens
```

### Setup

```tsx
// 1. Import tokens CSS (in your entry file)
import '@wex/design-tokens/css';

// 2. Configure Tailwind
// tailwind.config.ts
import wexPreset from '@wex/design-tokens/tailwind-preset';

export default {
  presets: [wexPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@wex/components/**/*.js',
  ],
};

// 3. Use components
import { WexButton, WexCard, WexDialog } from '@wex/components';
```

### Why Two Packages?

- **`@wex/components`** bundles Radix UI and shadcn patterns internally
- **`@wex/design-tokens`** is a peer dependency so brand updates ship independently
- Update tokens without touching component versions

---

## For Contributors

### Getting Started

```bash
# Clone the repository
git clone https://github.com/wex-inc/wex-design-system-react.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure

```
packages/
├── wex-components/     # @wex/components package source
└── design-tokens/      # @wex/design-tokens package source

src/
├── components/
│   ├── ui/             # Base shadcn/ui components
│   └── wex/            # WEX-branded wrapper components
├── docs/
│   ├── components/     # Documentation site components
│   ├── context/        # React contexts (ThemeBuilder, etc.)
│   ├── data/           # Token registries and mappings
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Documentation pages
│   └── utils/          # Utility functions
├── lib/                # Shared utilities (cn, etc.)
└── packages/
    └── design-tokens/  # @wex/design-tokens package source
        └── design-tokens.json  # Source of truth for all tokens
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test:unit` | Run unit tests |
| `npm run test:a11y` | Run accessibility tests |
| `npm run generate:token-map` | Regenerate token-component mapping |

### Component Architecture

WEX components follow two patterns:

| Pattern | Count | Components | Why |
|---------|-------|------------|-----|
| **Extended CVA** | 3 | Button, Badge, Alert | Custom intents (success, info, warning) beyond shadcn |
| **shadcn Wrapper** | 55 | All others | Namespace pattern, curated updates |

### Token Cascade

The design tokens follow a three-layer architecture:

```
Palette Ramps (design-tokens.json → generated CSS)
  ↓
Semantic Tokens (design-tokens.json → generated CSS)
  ↓
Tailwind Utilities (tailwind.config.ts)
```

Example cascade:
```
--wex-palette-blue-700 → --wex-primary → --primary → bg-primary
```

### Contributing Guidelines

See the Contributing page in the documentation for:
- Component development patterns
- Token management
- Testing requirements (unit + accessibility)
- PR checklist

---

## Related

- **WEX Design System (Angular)** - `wex-design-system-angular` (separate repository)
