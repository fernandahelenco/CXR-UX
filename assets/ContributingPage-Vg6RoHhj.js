import{j as e,g as d,B as b,a as p}from"./index-CQs5K25y.js";import{S as r}from"./Section-CRDm-i2q.js";import{C as c}from"./CodeBlock-BqnAyGed.js";import{S as j}from"./send-DTwg2tTU.js";import{G as f}from"./git-branch-C0g4xjg1.js";import{C as m}from"./circle-check-big-CgJkV1sf.js";import"./prism-css-C4fqG-wf.js";import"./copy-Ci3Zb5HA.js";function T(){return e.jsxs("article",{children:[e.jsxs("header",{className:"mb-10",children:[e.jsx("h1",{className:"text-3xl font-display font-bold text-foreground mb-2",children:"Contributing Components"}),e.jsx("p",{className:"text-lg text-muted-foreground",children:"Learn how to create and submit new components to the WEX Design System."})]}),e.jsxs(d,{intent:"info",className:"mb-10",children:[e.jsx(b,{className:"h-4 w-4"}),e.jsx(d.Title,{children:"For Contributors"}),e.jsx(d.Description,{children:"This guide covers how to create and submit new components to the WEX Design System. All contributions must follow the technical requirements outlined below."})]}),e.jsxs(r,{title:"When to Contribute",className:"mb-12",children:[e.jsx("p",{className:"text-muted-foreground mb-6",children:"Before proposing a new component, consider these criteria:"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsx(a,{title:"Is it reusable?",description:"The component should be useful across multiple applications or contexts."}),e.jsx(a,{title:"Is it non-domain-specific?",description:"Avoid business logic or app-specific components."}),e.jsx(a,{title:"Does it already exist?",description:"Check if a similar component is already in the library."}),e.jsx(a,{title:"Does it belong here?",description:"Utility functions, hooks, or page layouts typically don't belong in the component library."})]})]}),e.jsx(r,{title:"Submission Workflow",className:"mb-12",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",children:[e.jsx(l,{icon:e.jsx(j,{className:"h-5 w-5"}),step:"1",title:"RFC Issue",description:"Open a GitHub Issue describing the component, use cases, and proposed API.",color:"amber"}),e.jsx(l,{icon:e.jsx(f,{className:"h-5 w-5"}),step:"2",title:"Development",description:"After approval, create a feature branch and build the component.",color:"violet"}),e.jsx(l,{icon:e.jsx(m,{className:"h-5 w-5"}),step:"3",title:"Review & Merge",description:"Submit a PR, pass validation, and get Design System Team approval.",color:"emerald"})]})}),e.jsx(r,{title:"File Naming Convention",className:"mb-12",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("p",{className:"text-muted-foreground",children:"All WEX components follow a consistent naming pattern:"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-4 rounded-lg border border-border bg-muted/30",children:[e.jsx("p",{className:"text-sm font-medium mb-2",children:"File Location"}),e.jsx("code",{className:"text-sm text-primary",children:"src/components/wex/wex-{name}.tsx"})]}),e.jsxs("div",{className:"p-4 rounded-lg border border-border bg-muted/30",children:[e.jsx("p",{className:"text-sm font-medium mb-2",children:"Export Name"}),e.jsx("code",{className:"text-sm text-primary",children:"Wex{Name}"}),e.jsx("span",{className:"text-sm text-muted-foreground ml-2",children:"(PascalCase)"})]})]}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Examples: ",e.jsx("code",{children:"wex-badge.tsx"})," → ",e.jsx("code",{children:"WexBadge"}),","," ",e.jsx("code",{children:"wex-alert-dialog.tsx"})," → ",e.jsx("code",{children:"WexAlertDialog"})]})]})}),e.jsx(r,{title:"Component Patterns",className:"mb-12",children:e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Simple Component (with CVA)"}),e.jsx("p",{className:"text-muted-foreground mb-4",children:"For components without sub-parts, use class-variance-authority for variants:"}),e.jsx(c,{code:`import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const wexComponentVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5",
  {
    variants: {
      intent: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
    },
    defaultVariants: { intent: "default" },
  }
);

export interface WexComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wexComponentVariants> {}

const WexComponent = React.forwardRef<HTMLDivElement, WexComponentProps>(
  ({ className, intent, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(wexComponentVariants({ intent }), className)}
      {...props}
    />
  )
);
WexComponent.displayName = "WexComponent";

export { WexComponent };`,language:"tsx"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Compound Component (Namespace Pattern)"}),e.jsx("p",{className:"text-muted-foreground mb-4",children:"For components with sub-parts (like Card, Dialog), use the namespace pattern:"}),e.jsx(c,{code:`import { BaseComponent, Part1, Part2 } from "@/components/ui/base";

/**
 * WexComponent - WEX Design System Component
 *
 * @example
 * <WexComponent>
 *   <WexComponent.Part1>Title</WexComponent.Part1>
 *   <WexComponent.Part2>Content</WexComponent.Part2>
 * </WexComponent>
 */
export const WexComponent = Object.assign(BaseComponent, {
  Part1: Part1,
  Part2: Part2,
});`,language:"tsx"})]})]})}),e.jsx(r,{title:"Technical Requirements",className:"mb-12",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("p",{className:"text-muted-foreground",children:"All components must meet these requirements:"}),e.jsxs("ul",{className:"space-y-3",children:[e.jsx(n,{text:"Use React.forwardRef with displayName set"}),e.jsx(n,{text:"Use CVA with semantic variant names (intent, not color)"}),e.jsx(n,{text:"Only use WEX tokens via Tailwind (no raw hex/rgb/hsl values)"}),e.jsx(n,{text:"Interactive elements must have focus-visible ring pattern"}),e.jsx(n,{text:"Buttons/controls must have min-h-target min-w-target"}),e.jsx(n,{text:"Include JSDoc comment with @example usage"})]})]})}),e.jsx(r,{title:"Testing Requirements",className:"mb-12",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("p",{className:"text-muted-foreground",children:["Create a comprehensive unit test file at"," ",e.jsx("code",{className:"px-1.5 py-0.5 bg-muted rounded text-xs",children:"tests/components/wex-{name}.test.tsx"}),". Use the template at ",e.jsx("code",{className:"px-1.5 py-0.5 bg-muted rounded text-xs",children:"tests/components/_template.test.tsx"})," as a starting point."]}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-3 my-4",children:[e.jsxs("div",{className:"p-3 rounded-lg border border-border bg-muted/30",children:[e.jsx("p",{className:"text-sm font-medium",children:"Rendering"}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"Mount, props, children"})]}),e.jsxs("div",{className:"p-3 rounded-lg border border-border bg-muted/30",children:[e.jsx("p",{className:"text-sm font-medium",children:"Interactions"}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"Click, toggle, focus"})]}),e.jsxs("div",{className:"p-3 rounded-lg border border-border bg-muted/30",children:[e.jsx("p",{className:"text-sm font-medium",children:"Keyboard"}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"Arrow, Tab, Enter, Esc"})]}),e.jsxs("div",{className:"p-3 rounded-lg border border-border bg-muted/30",children:[e.jsx("p",{className:"text-sm font-medium",children:"States"}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"Disabled, loading, controlled"})]}),e.jsxs("div",{className:"p-3 rounded-lg border border-border bg-muted/30",children:[e.jsx("p",{className:"text-sm font-medium",children:"Accessibility"}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"ARIA roles, labels"})]}),e.jsxs("div",{className:"p-3 rounded-lg border border-border bg-muted/30",children:[e.jsx("p",{className:"text-sm font-medium",children:"Edge Cases"}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"Rapid actions, limits"})]})]}),e.jsx(c,{code:`import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { WexComponent } from "@/components/wex";

describe("WexComponent", () => {
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<WexComponent>Content</WexComponent>);
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("calls onClick handler", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<WexComponent onClick={handleClick}>Click</WexComponent>);
      await user.click(screen.getByText("Click"));
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<WexComponent>Content</WexComponent>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });
});`,language:"tsx"}),e.jsxs("div",{className:"flex gap-4 mt-6",children:[e.jsxs("div",{className:"p-4 rounded-lg border border-border bg-muted/30 flex-1",children:[e.jsx("p",{className:"text-sm font-medium mb-2",children:"Run Unit Tests"}),e.jsx("code",{className:"text-sm text-primary",children:"npm run test:unit"})]}),e.jsxs("div",{className:"p-4 rounded-lg border border-border bg-muted/30 flex-1",children:[e.jsx("p",{className:"text-sm font-medium mb-2",children:"Run A11y Tests"}),e.jsx("code",{className:"text-sm text-primary",children:"npm run test:a11y"})]})]})]})}),e.jsx(r,{title:"PR Checklist",className:"mb-12",children:e.jsxs("div",{className:"p-6 rounded-lg border border-border bg-card",children:[e.jsx("p",{className:"text-sm text-muted-foreground mb-4",children:"Include this checklist in your PR description:"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs(i,{title:"Component",children:[e.jsx(t,{text:"Located at src/components/wex/wex-{name}.tsx"}),e.jsx(t,{text:"Uses Wex prefix in export name"}),e.jsx(t,{text:"Uses React.forwardRef with displayName"}),e.jsx(t,{text:"Uses CVA with semantic variant names"}),e.jsx(t,{text:"No raw color values"})]}),e.jsxs(i,{title:"Documentation",children:[e.jsx(t,{text:"Docs page at src/docs/pages/components/{Name}Page.tsx"}),e.jsx(t,{text:"Examples wrapped in ExampleCard"})]}),e.jsxs(i,{title:"Testing",children:[e.jsx(t,{text:"Unit tests at tests/components/wex-{name}.test.tsx"}),e.jsx(t,{text:"npm run test:unit passes"}),e.jsx(t,{text:"npm run test:a11y passes"})]}),e.jsxs(i,{title:"Registry",children:[e.jsx(t,{text:"Added to src/docs/registry/components.ts"}),e.jsx(t,{text:"Status set to alpha"}),e.jsx(t,{text:"Changelog updated"})]})]})]})})]})}function a({title:s,description:o}){return e.jsx("div",{className:"p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors",children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(m,{className:"h-5 w-5 text-success shrink-0 mt-0.5"}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-foreground",children:s}),e.jsx("p",{className:"text-sm text-muted-foreground",children:o})]})]})})}const N={amber:{bg:"bg-amber-500/10",text:"text-amber-500"},violet:{bg:"bg-violet-500/10",text:"text-violet-500"},emerald:{bg:"bg-emerald-500/10",text:"text-emerald-500"},blue:{bg:"bg-blue-500/10",text:"text-blue-500"}};function l({icon:s,step:o,title:u,description:h,color:g="blue"}){const x=N[g];return e.jsx(p,{children:e.jsxs(p.Content,{className:"pt-6",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[e.jsx("div",{className:`p-2 rounded-lg ${x.bg} ${x.text}`,children:s}),e.jsxs("span",{className:"text-xs font-semibold text-muted-foreground",children:["STEP ",o]})]}),e.jsx("h3",{className:"font-semibold text-foreground mb-1",children:u}),e.jsx("p",{className:"text-sm text-muted-foreground",children:h})]})})}function n({text:s}){return e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(m,{className:"h-4 w-4 text-success shrink-0 mt-0.5"}),e.jsx("span",{className:"text-foreground",children:s})]})}function i({title:s,children:o}){return e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-foreground mb-2",children:s}),e.jsx("div",{className:"space-y-1 pl-4",children:o})]})}function t({text:s}){return e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[e.jsx("div",{className:"w-4 h-4 border border-border rounded flex items-center justify-center",children:e.jsx("span",{className:"text-muted-foreground text-xs",children:"☐"})}),e.jsx("span",{className:"text-muted-foreground",children:s})]})}export{T as default};
