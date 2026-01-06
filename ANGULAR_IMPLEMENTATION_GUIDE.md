# WEX Design System - Angular Implementation Guide

This guide provides instructions for a development team building the Angular version of the WEX Design System, mirroring the patterns and conventions established in the React implementation.

---

## Overview

The React WEX Design System was built using:

| Layer | React Stack | Angular Equivalent |
|-------|-------------|-------------------|
| **UI Primitives** | Radix UI | Angular CDK |
| **Component Library** | shadcn/ui | Spartan UI |
| **Styling** | Tailwind CSS | Tailwind CSS |
| **Variant Management** | class-variance-authority (CVA) | class-variance-authority (CVA) |
| **Documentation** | Custom Vite + React site | Custom Angular standalone app |
| **Testing** | Vitest + React Testing Library | Jest/Karma + Angular Testing Library |
| **A11y Testing** | Playwright + axe-core | Playwright + axe-core |

> **Note**: Angular 21.0.5 is the current stable release (December 2025). This guide targets Angular 17+ for compatibility.

---

## Technology Stack

### 1. Angular Version

**Target: Angular 17+ (Current: Angular 21)**

Angular 21 is the latest stable release (as of December 2025). The WEX Angular implementation should target Angular 17+ for broad compatibility while leveraging the latest features:

- Standalone components (no NgModules required) - Angular 14+
- Signals for reactive state - Angular 16+
- New control flow syntax (`@if`, `@for`, `@switch`) - Angular 17+
- Deferred loading with `@defer` - Angular 17+
- Resource API and linked signals - Angular 19+

```bash
# Create new Angular 21 project
ng new wex-angular-brand --standalone --style=scss --routing
```

### 2. UI Primitives: Spartan UI

[Spartan UI](https://www.spartan.ng/) is the Angular equivalent of shadcn/ui:
- Built on Angular CDK (like shadcn uses Radix)
- Copy-paste, own-the-code philosophy
- Accessible by default
- Unstyled primitives you customize

```bash
# Install Spartan CLI
npm install -D @spartan-ng/cli

# Initialize Spartan in your project
npx nx g @spartan-ng/cli:ui

# Add specific primitives
npx nx g @spartan-ng/cli:ui button
npx nx g @spartan-ng/cli:ui dialog
npx nx g @spartan-ng/cli:ui card
# ... add more as needed
```

### 3. Styling: Tailwind CSS

Same Tailwind setup as React version:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

**tailwind.config.js** - Use the same WEX preset:

```javascript
const wexPreset = require('@wex/theme/tailwind-preset');

module.exports = {
  presets: [wexPreset],
  content: [
    "./src/**/*.{html,ts}",
  ],
};
```

### 4. Variant Management: CVA

CVA works identically in Angular:

```bash
npm install class-variance-authority
```

---

## Component Naming Convention

### Prefix Pattern

All WEX components use the `Wex` prefix, matching the React implementation:

| Pattern | React | Angular |
|---------|-------|---------|
| **Component Name** | `WexButton` | `WexButtonComponent` |
| **File Name** | `wex-button.tsx` | `wex-button.component.ts` |
| **Selector** | N/A (JSX) | `wex-button` |
| **Directory** | `src/components/wex/` | `src/components/wex/` |

### File Structure

```
src/
├── components/
│   └── wex/
│       ├── wex-button/
│       │   ├── wex-button.component.ts
│       │   ├── wex-button.component.html (optional, can use inline)
│       │   └── index.ts
│       ├── wex-card/
│       │   ├── wex-card.component.ts
│       │   ├── wex-card-header.component.ts
│       │   ├── wex-card-content.component.ts
│       │   └── index.ts
│       └── index.ts  (barrel export)
├── lib/
│   └── utils.ts  (cn() helper)
└── styles/
    ├── wex.tokens.css
    └── wex.shadcn-bridge.css
```

---

## Component Templates

### Simple Component (with CVA)

**wex-button.component.ts**

```typescript
import { Component, Input, HostBinding } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * WexButton - WEX Design System Button Component
 *
 * @example
 * <wex-button intent="primary">Click me</wex-button>
 * <wex-button intent="secondary" size="lg">Large Button</wex-button>
 */

const wexButtonVariants = cva(
  // Base styles - no raw colors!
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-target min-w-target',
  {
    variants: {
      intent: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'default',
    },
  }
);

type WexButtonVariants = VariantProps<typeof wexButtonVariants>;

@Component({
  selector: 'wex-button',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': 'computedClass',
    'role': 'button',
    '[attr.tabindex]': '0',
  },
})
export class WexButtonComponent {
  @Input() intent: WexButtonVariants['intent'] = 'default';
  @Input() size: WexButtonVariants['size'] = 'default';
  @Input() class: string = '';

  get computedClass(): string {
    return cn(wexButtonVariants({ intent: this.intent, size: this.size }), this.class);
  }
}
```

### Compound Component (Multi-part)

For components like Card, Dialog, etc., create separate components:

**wex-card.component.ts**

```typescript
import { Component, Input } from '@angular/core';
import { cn } from '@/lib/utils';

@Component({
  selector: 'wex-card',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': 'computedClass',
  },
})
export class WexCardComponent {
  @Input() class: string = '';

  get computedClass(): string {
    return cn('rounded-xl border bg-card text-card-foreground shadow', this.class);
  }
}
```

**wex-card-header.component.ts**

```typescript
import { Component, Input } from '@angular/core';
import { cn } from '@/lib/utils';

@Component({
  selector: 'wex-card-header',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': 'computedClass',
  },
})
export class WexCardHeaderComponent {
  @Input() class: string = '';

  get computedClass(): string {
    return cn('flex flex-col space-y-1.5 p-6', this.class);
  }
}
```

**wex-card-content.component.ts**

```typescript
import { Component, Input } from '@angular/core';
import { cn } from '@/lib/utils';

@Component({
  selector: 'wex-card-content',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': 'computedClass',
  },
})
export class WexCardContentComponent {
  @Input() class: string = '';

  get computedClass(): string {
    return cn('p-6 pt-0', this.class);
  }
}
```

**Usage:**

```html
<wex-card>
  <wex-card-header>
    <wex-card-title>Card Title</wex-card-title>
  </wex-card-header>
  <wex-card-content>
    Card content goes here.
  </wex-card-content>
</wex-card>
```

---

## Utility Function: cn()

Create the same `cn()` helper used in React:

**src/lib/utils.ts**

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

Install dependencies:

```bash
npm install clsx tailwind-merge
```

---

## Theme Files

Copy these files from the React implementation:

| File | Purpose |
|------|---------|
| `@wex/design-tokens` | npm package containing all token formats |
| `design-tokens.json` | Source of truth (JSON format) |
| `css/design-tokens.css` | Generated CSS custom properties |
| `css/shadcn-bridge.css` | Maps tokens to shadcn/Spartan variables |
| `tailwind.config.ts` (preset portion) | Tailwind theme configuration |

Import in your global styles:

**styles.scss**

```scss
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@import '@wex/design-tokens/css';
// Or individually:
// @import '@wex/design-tokens/css/design-tokens';
// @import '@wex/design-tokens/css/shadcn-bridge';
```

---

## Documentation Site Structure

Mirror the React docs site structure:

```
src/
├── app/
│   ├── docs/
│   │   ├── layout/
│   │   │   ├── docs-layout.component.ts
│   │   │   └── sidebar-nav.component.ts
│   │   ├── components/
│   │   │   ├── section.component.ts
│   │   │   ├── example-card.component.ts
│   │   │   └── code-block.component.ts
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   ├── getting-started/
│   │   │   ├── foundations/
│   │   │   │   ├── tokens-page.component.ts
│   │   │   │   └── typography-page.component.ts
│   │   │   └── components/
│   │   │       ├── button-page.component.ts
│   │   │       ├── card-page.component.ts
│   │   │       └── ...
│   │   └── registry/
│   │       ├── components.ts
│   │       └── foundations.ts
│   └── app.routes.ts
└── components/
    └── wex/
        └── ... (component library)
```

---

## Testing

### Unit Tests

Use Angular Testing Library for component tests:

```bash
npm install -D @testing-library/angular @testing-library/jest-dom
```

**wex-button.component.spec.ts**

```typescript
import { render, screen } from '@testing-library/angular';
import { WexButtonComponent } from './wex-button.component';

describe('WexButtonComponent', () => {
  it('renders with default intent', async () => {
    await render(WexButtonComponent, {
      inputs: { intent: 'default' },
      componentProperties: {},
    });
    // Test assertions
  });

  it('applies custom class', async () => {
    await render(`<wex-button class="custom-class">Click</wex-button>`, {
      imports: [WexButtonComponent],
    });
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});
```

### Accessibility Tests

Same Playwright + axe-core setup as React:

```bash
npm install -D @axe-core/playwright playwright
```

**tests/a11y/button.spec.ts**

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('WexButton Accessibility', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/components/button');
    
    const results = await new AxeBuilder({ page })
      .include('[data-testid="example-card"]')
      .analyze();
    
    expect(results.violations).toEqual([]);
  });
});
```

---

## Component Rules

All rules from `WEX_COMPONENT_RULES.md` apply to Angular components:

### ✅ Must Have

- [ ] Use `Wex` prefix in component class name
- [ ] Use `wex-` prefix in selector
- [ ] Use CVA for variant management
- [ ] Only use WEX tokens via Tailwind (no raw hex/rgb/hsl)
- [ ] Focus-visible ring on interactive elements
- [ ] `min-h-target min-w-target` on buttons/controls
- [ ] Standalone component (no NgModule)

### ❌ Avoid

- [ ] Raw color values
- [ ] Inline styles
- [ ] NgModules (use standalone)
- [ ] ViewEncapsulation.None (unless necessary)

---

## Package Distribution

The Angular theme will be distributed as `@wex/angular-theme`:

```
@wex/angular-theme/
├── package.json
├── README.md
├── src/
│   ├── lib/
│   │   └── utils.ts
│   └── tailwind-preset.js
└── components/        # Reference implementation (optional)

Note: Design tokens are installed via `@wex/design-tokens` npm package.
    └── wex/
        └── ...
```

Consumer usage:

```bash
npm install @wex/angular-theme
```

**angular.json** - Add styles:

```json
{
  "styles": [
    "node_modules/@wex/design-tokens/css/index.css",
    "src/styles.scss"
  ]
}
```

**tailwind.config.js**:

```javascript
const wexPreset = require('@wex/angular-theme/tailwind-preset');

module.exports = {
  presets: [wexPreset],
  // ...
};
```

---

## Migration Mapping: React → Angular

| React Pattern | Angular Equivalent |
|---------------|-------------------|
| `React.forwardRef` | Native element ref via `ViewChild` |
| `displayName` | Component class name |
| `className` prop | `class` input + host binding |
| JSX `{children}` | `<ng-content>` |
| `useState` | Signals (`signal()`) |
| `useEffect` | `effect()` or lifecycle hooks |
| `useMemo` | `computed()` |
| Compound components via `Object.assign` | Separate components with shared prefix |
| React Context | Angular Services or DI |
| Radix primitives | Spartan/Angular CDK directives |

---

## Getting Started Checklist

1. [ ] Create new Angular 21 standalone project (or 17+ minimum)
2. [ ] Install Spartan UI CLI
3. [ ] Configure Tailwind CSS
4. [ ] Install `@wex/design-tokens` package and import CSS
5. [ ] Create `cn()` utility
6. [ ] Add Spartan primitives as needed
7. [ ] Create first WEX component (`wex-button`)
8. [ ] Set up docs site structure
9. [ ] Configure unit tests (Angular Testing Library)
10. [ ] Configure a11y tests (Playwright + axe-core)
11. [ ] Create component registry
12. [ ] Build remaining components following patterns

---

## Resources

### Spartan UI
- [Documentation](https://www.spartan.ng/)
- [GitHub](https://github.com/spartan-ng/spartan)
- [Components List](https://www.spartan.ng/components)

### Angular CDK
- [Official Docs](https://material.angular.io/cdk/categories)
- [Accessibility (a11y)](https://material.angular.io/cdk/a11y/overview)

### Tailwind CSS
- [Angular Setup Guide](https://tailwindcss.com/docs/guides/angular)

### Testing
- [Angular Testing Library](https://testing-library.com/docs/angular-testing-library/intro/)
- [Playwright](https://playwright.dev/)
- [axe-core](https://github.com/dequelabs/axe-core)

---

## Questions?

Reach out to the Design System Team with questions about Angular implementation patterns or component parity with the React version.

