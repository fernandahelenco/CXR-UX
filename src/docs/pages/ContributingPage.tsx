/**
 * Contributing Components Guide Page
 *
 * Documentation for external developers on how to create and submit
 * new components to the WEX Design System.
 */

import React from "react";
import { Section } from "@/docs/components/Section";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { WexAlert, WexCard } from "@/components/wex";
import { GitBranch, CheckCircle, BookOpen, Send } from "lucide-react";

export default function ContributingPage() {
  return (
    <article>
      <header className="mb-10">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Contributing Components
        </h1>
        <p className="text-lg text-muted-foreground">
          Learn how to create and submit new components to the WEX Design System.
        </p>
      </header>

      <WexAlert intent="info" className="mb-10">
        <BookOpen className="h-4 w-4" />
        <WexAlert.Title>For Contributors</WexAlert.Title>
        <WexAlert.Description>
          This guide covers how to create and submit new components to the WEX Design System. 
          All contributions must follow the technical requirements outlined below.
        </WexAlert.Description>
      </WexAlert>

      {/* When to Contribute */}
      <Section title="When to Contribute" className="mb-12">
        <p className="text-muted-foreground mb-6">
          Before proposing a new component, consider these criteria:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChecklistCard
            title="Is it reusable?"
            description="The component should be useful across multiple applications or contexts."
          />
          <ChecklistCard
            title="Is it non-domain-specific?"
            description="Avoid business logic or app-specific components."
          />
          <ChecklistCard
            title="Does it already exist?"
            description="Check if a similar component is already in the library."
          />
          <ChecklistCard
            title="Does it belong here?"
            description="Utility functions, hooks, or page layouts typically don't belong in the component library."
          />
        </div>
      </Section>

      {/* Submission Workflow */}
      <Section title="Submission Workflow" className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <WorkflowStep
            icon={<Send className="h-5 w-5" />}
            step="1"
            title="RFC Issue"
            description="Open a GitHub Issue describing the component, use cases, and proposed API."
            color="amber"
          />
          <WorkflowStep
            icon={<GitBranch className="h-5 w-5" />}
            step="2"
            title="Development"
            description="After approval, create a feature branch and build the component."
            color="violet"
          />
          <WorkflowStep
            icon={<CheckCircle className="h-5 w-5" />}
            step="3"
            title="Review & Merge"
            description="Submit a PR, pass validation, and get Design System Team approval."
            color="emerald"
          />
        </div>
      </Section>

      {/* File Naming */}
      <Section title="File Naming Convention" className="mb-12">
        <div className="space-y-4">
          <p className="text-muted-foreground">
            All WEX components follow a consistent naming pattern:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border bg-muted/30">
              <p className="text-sm font-medium mb-2">File Location</p>
              <code className="text-sm text-primary">src/components/wex/wex-&#123;name&#125;.tsx</code>
            </div>
            <div className="p-4 rounded-lg border border-border bg-muted/30">
              <p className="text-sm font-medium mb-2">Export Name</p>
              <code className="text-sm text-primary">Wex&#123;Name&#125;</code>
              <span className="text-sm text-muted-foreground ml-2">(PascalCase)</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Examples: <code>wex-badge.tsx</code> → <code>WexBadge</code>,{" "}
            <code>wex-alert-dialog.tsx</code> → <code>WexAlertDialog</code>
          </p>
        </div>
      </Section>

      {/* Component Patterns */}
      <Section title="Component Patterns" className="mb-12">
        <div className="space-y-8">
          {/* Simple Component */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Simple Component (with CVA)</h3>
            <p className="text-muted-foreground mb-4">
              For components without sub-parts, use class-variance-authority for variants:
            </p>
            <CodeBlock
              code={`import * as React from "react";
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

export { WexComponent };`}
              language="tsx"
            />
          </div>

          {/* Compound Component */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Compound Component (Namespace Pattern)</h3>
            <p className="text-muted-foreground mb-4">
              For components with sub-parts (like Card, Dialog), use the namespace pattern:
            </p>
            <CodeBlock
              code={`import { BaseComponent, Part1, Part2 } from "@/components/ui/base";

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
});`}
              language="tsx"
            />
          </div>
        </div>
      </Section>

      {/* Technical Requirements */}
      <Section title="Technical Requirements" className="mb-12">
        <div className="space-y-4">
          <p className="text-muted-foreground">
            All components must meet these requirements:
          </p>
          <ul className="space-y-3">
            <RequirementItem text="Use React.forwardRef with displayName set" />
            <RequirementItem text="Use CVA with semantic variant names (intent, not color)" />
            <RequirementItem text="Only use WEX tokens via Tailwind (no raw hex/rgb/hsl values)" />
            <RequirementItem text="Interactive elements must have focus-visible ring pattern" />
            <RequirementItem text="Buttons/controls must have min-h-target min-w-target" />
            <RequirementItem text="Include JSDoc comment with @example usage" />
          </ul>
        </div>
      </Section>

      {/* Testing */}
      <Section title="Testing Requirements" className="mb-12">
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Create a comprehensive unit test file at{" "}
            <code className="px-1.5 py-0.5 bg-muted rounded text-xs">tests/components/wex-&#123;name&#125;.test.tsx</code>.
            Use the template at <code className="px-1.5 py-0.5 bg-muted rounded text-xs">tests/components/_template.test.tsx</code> as a starting point.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-sm font-medium">Rendering</p>
              <p className="text-xs text-muted-foreground">Mount, props, children</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-sm font-medium">Interactions</p>
              <p className="text-xs text-muted-foreground">Click, toggle, focus</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-sm font-medium">Keyboard</p>
              <p className="text-xs text-muted-foreground">Arrow, Tab, Enter, Esc</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-sm font-medium">States</p>
              <p className="text-xs text-muted-foreground">Disabled, loading, controlled</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-sm font-medium">Accessibility</p>
              <p className="text-xs text-muted-foreground">ARIA roles, labels</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-sm font-medium">Edge Cases</p>
              <p className="text-xs text-muted-foreground">Rapid actions, limits</p>
            </div>
          </div>

          <CodeBlock
            code={`import { render, screen } from "@testing-library/react";
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
});`}
            language="tsx"
          />
          <div className="flex gap-4 mt-6">
            <div className="p-4 rounded-lg border border-border bg-muted/30 flex-1">
              <p className="text-sm font-medium mb-2">Run Unit Tests</p>
              <code className="text-sm text-primary">npm run test:unit</code>
            </div>
            <div className="p-4 rounded-lg border border-border bg-muted/30 flex-1">
              <p className="text-sm font-medium mb-2">Run A11y Tests</p>
              <code className="text-sm text-primary">npm run test:a11y</code>
            </div>
          </div>
        </div>
      </Section>

      {/* PR Checklist */}
      <Section title="PR Checklist" className="mb-12">
        <div className="p-6 rounded-lg border border-border bg-card">
          <p className="text-sm text-muted-foreground mb-4">
            Include this checklist in your PR description:
          </p>
          <div className="space-y-4">
            <ChecklistGroup title="Component">
              <ChecklistItem text="Located at src/components/wex/wex-{name}.tsx" />
              <ChecklistItem text="Uses Wex prefix in export name" />
              <ChecklistItem text="Uses React.forwardRef with displayName" />
              <ChecklistItem text="Uses CVA with semantic variant names" />
              <ChecklistItem text="No raw color values" />
            </ChecklistGroup>
            <ChecklistGroup title="Documentation">
              <ChecklistItem text="Docs page at src/docs/pages/components/{Name}Page.tsx" />
              <ChecklistItem text="Examples wrapped in ExampleCard" />
            </ChecklistGroup>
            <ChecklistGroup title="Testing">
              <ChecklistItem text="Unit tests at tests/components/wex-{name}.test.tsx" />
              <ChecklistItem text="npm run test:unit passes" />
              <ChecklistItem text="npm run test:a11y passes" />
            </ChecklistGroup>
            <ChecklistGroup title="Registry">
              <ChecklistItem text="Added to src/docs/registry/components.ts" />
              <ChecklistItem text="Status set to alpha" />
              <ChecklistItem text="Changelog updated" />
            </ChecklistGroup>
          </div>
        </div>
      </Section>
    </article>
  );
}

// Helper Components

function ChecklistCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
      <div className="flex items-start gap-3">
        <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}

const workflowColors = {
  amber: { bg: "bg-amber-500/10", text: "text-amber-500" },
  violet: { bg: "bg-violet-500/10", text: "text-violet-500" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-500" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-500" },
} as const;

function WorkflowStep({
  icon,
  step,
  title,
  description,
  color = "blue",
}: {
  icon: React.ReactNode;
  step: string;
  title: string;
  description: string;
  color?: keyof typeof workflowColors;
}) {
  const colorClasses = workflowColors[color];
  return (
    <WexCard>
      <WexCard.Content className="pt-6">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg ${colorClasses.bg} ${colorClasses.text}`}>{icon}</div>
          <span className="text-xs font-semibold text-muted-foreground">STEP {step}</span>
        </div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </WexCard.Content>
    </WexCard>
  );
}

function RequirementItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
      <span className="text-foreground">{text}</span>
    </li>
  );
}

function ChecklistGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-medium text-foreground mb-2">{title}</p>
      <div className="space-y-1 pl-4">{children}</div>
    </div>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="w-4 h-4 border border-border rounded flex items-center justify-center">
        <span className="text-muted-foreground text-xs">☐</span>
      </div>
      <span className="text-muted-foreground">{text}</span>
    </div>
  );
}

