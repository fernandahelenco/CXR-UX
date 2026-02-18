import{j as e,a as t,L as a,A as r}from"./index-CQs5K25y.js";import{S as n}from"./Section-CRDm-i2q.js";import{C as s}from"./CodeBlock-BqnAyGed.js";import{G as i}from"./ProseBlock-72pMsBWy.js";import{P as o,Z as d}from"./zap-DWA0TBzO.js";import"./prism-css-C4fqG-wf.js";import"./copy-Ci3Zb5HA.js";function g(){return e.jsxs("article",{children:[e.jsxs("header",{className:"mb-8 pb-6 border-b border-border",children:[e.jsx("h1",{className:"text-3xl font-display font-bold text-foreground mb-2",children:"Getting Started"}),e.jsx("p",{className:"text-lg text-muted-foreground",children:"Learn how to use WEX components in your project."})]}),e.jsxs("div",{className:"space-y-12",children:[e.jsxs(n,{title:"Choose Your Integration",description:"The WEX Design System offers two packages that work together.",children:[e.jsxs("div",{className:"grid md:grid-cols-2 gap-4 mb-6",children:[e.jsx(t,{className:"p-4",children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("div",{className:"p-2 rounded-lg bg-primary/10",children:e.jsx(o,{className:"h-5 w-5 text-primary"})}),e.jsxs("div",{children:[e.jsx(t.Title,{className:"text-base mb-1",children:"@wex/components + @wex/design-tokens"}),e.jsx(t.Description,{className:"text-sm mb-2",children:"Full component library with WEX-branded variants, plus design tokens for theming. Recommended for most teams."}),e.jsx("span",{className:"inline-flex items-center text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded",children:"Recommended"})]})]})}),e.jsx(t,{className:"p-4",children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("div",{className:"p-2 rounded-lg bg-info/10",children:e.jsx(d,{className:"h-5 w-5 text-info"})}),e.jsxs("div",{children:[e.jsx(t.Title,{className:"text-base mb-1",children:"@wex/design-tokens only"}),e.jsx(t.Description,{className:"text-sm mb-2",children:"Theme-only package with CSS variables and Tailwind preset. For teams building their own components."}),e.jsx("span",{className:"inline-flex items-center text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded",children:"Advanced"})]})]})})]}),e.jsx("div",{className:"flex items-center gap-2 text-sm",children:e.jsxs(a,{to:"/architecture",className:"text-link hover:underline inline-flex items-center gap-1",children:["Learn about WEX architecture",e.jsx(r,{className:"h-3 w-3"})]})})]}),e.jsxs(n,{title:"Prerequisites",description:"The WEX design system requires the following dependencies.",children:[e.jsxs("ul",{className:"list-disc list-inside space-y-2 text-foreground mb-4",children:[e.jsx("li",{children:"React 18 or later"}),e.jsx("li",{children:"Tailwind CSS 3.4 or later"}),e.jsx("li",{children:"TypeScript (recommended)"})]}),e.jsxs("div",{className:"p-4 rounded-lg bg-muted/30 border border-border",children:[e.jsx("h4",{className:"font-medium mb-2 text-sm",children:"What about shadcn and Radix?"}),e.jsxs("p",{className:"text-sm text-muted-foreground mb-3",children:[e.jsx("code",{className:"bg-muted px-1.5 py-0.5 rounded text-sm",children:"@wex/components"})," bundles shadcn/ui patterns and Radix UI primitives internally — you don't need to install them separately. Design tokens are a separate peer dependency so brand updates can ship independently of component updates."]}),e.jsxs(a,{to:"/architecture",className:"text-sm text-link hover:underline inline-flex items-center gap-1",children:["Learn about the architecture",e.jsx(r,{className:"h-3 w-3"})]})]})]}),e.jsx(n,{title:"Installation",description:"Install both packages for the complete WEX experience.",children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-medium mb-3",children:"1. Install packages"}),e.jsx(s,{language:"bash",code:"npm install @wex/components @wex/design-tokens"})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-medium mb-3",children:"2. Import tokens CSS (in your entry file)"}),e.jsx(s,{language:"tsx",code:`// main.tsx or App.tsx
import '@wex/design-tokens/css';`})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-medium mb-3",children:"3. Configure Tailwind"}),e.jsx(s,{language:"typescript",filename:"tailwind.config.ts",code:`import wexPreset from '@wex/design-tokens/tailwind-preset';

export default {
  presets: [wexPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@wex/components/**/*.js',
  ],
};`})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-medium mb-3",children:"4. Use components"}),e.jsx(s,{language:"tsx",code:"import { WexButton, WexCard } from '@wex/components';"})]})]})}),e.jsxs(n,{title:"Basic Usage",description:"Import and use components in your React code.",children:[e.jsx(s,{language:"tsx",code:`import { WexButton, WexCard, WexDialog } from '@wex/components';

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
}`}),e.jsx(i,{children:"WEX components use a namespace pattern for compound components. This keeps imports clean and groups related sub-components together."})]}),e.jsxs(n,{title:"Dark Mode",description:"Toggle dark mode by adding the .dark class to the html element.",children:[e.jsx(s,{code:`// Toggle dark mode
document.documentElement.classList.toggle('dark');

// Or set explicitly
document.documentElement.classList.add('dark');
document.documentElement.classList.remove('dark');`}),e.jsx("p",{className:"text-muted-foreground mt-4",children:"The theme toggle in this docs site persists your preference to localStorage."})]}),e.jsxs(n,{title:"Updating Tokens",description:"Brand updates are shipped independently of component updates.",children:[e.jsx("p",{className:"text-muted-foreground mb-4",children:"When the WEX brand palette or theme changes, you can update tokens without touching your component version:"}),e.jsx(s,{language:"bash",code:`# Update tokens only (no component changes)
npm update @wex/design-tokens`}),e.jsx(i,{children:"This separation means faster, safer brand rollouts across all applications."})]})]})]})}export{g as default};
