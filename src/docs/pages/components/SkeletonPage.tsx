import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexSkeleton } from "@/components/wex";

// Token mappings for WexSkeleton
// Layer 3 component tokens
const skeletonTokens: TokenRow[] = [
  { element: "Skeleton", property: "Background", token: "--wex-component-skeleton-bg" },
  { element: "Animation", property: "Type", token: "pulse (CSS animation)" },
];

export default function SkeletonPage() {
  return (
    <ComponentPage
      title="Skeleton"
      description="Use to show a placeholder while content is loading."
      status="stable"
      registryKey="skeleton"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="flex items-center space-x-4">
            <WexSkeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <WexSkeleton className="h-4 w-[200px]" />
              <WexSkeleton className="h-4 w-[150px]" />
            </div>
          </div>
        </ExampleCard>
      </Section>

      <Section title="Examples" description="Common skeleton patterns.">
        <div className="space-y-4">
          <ExampleCard title="Card Skeleton">
            <div className="space-y-2 w-64">
              <WexSkeleton className="h-32 w-full rounded-lg" />
              <WexSkeleton className="h-4 w-3/4" />
              <WexSkeleton className="h-4 w-1/2" />
            </div>
          </ExampleCard>

          <ExampleCard title="List Skeleton">
            <div className="space-y-2 w-48">
              <WexSkeleton className="h-4 w-full" />
              <WexSkeleton className="h-4 w-full" />
              <WexSkeleton className="h-4 w-3/4" />
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">WCAG 2.2 Level AA Compliant</h3>
            <p className="text-sm text-muted-foreground">
              This component meets WCAG 2.2 Level AA accessibility requirements.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Screen Reader Announcements</h3>
            <p className="text-sm text-muted-foreground">
              Wrap skeleton loading states with <code className="bg-muted px-1 rounded">aria-busy="true"</code> 
              and <code className="bg-muted px-1 rounded">aria-live="polite"</code> to announce when loading completes.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Motion Sensitivity</h3>
            <p className="text-sm text-muted-foreground">
              The skeleton animation respects <code className="bg-muted px-1 rounded">prefers-reduced-motion</code> 
              media query for users with motion sensitivities.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexSkeleton } from "@/components/wex";

<WexSkeleton className="h-4 w-48" />
<WexSkeleton className="h-12 w-12 rounded-full" />`}
        />
      </Section>

      <TokenReference tokens={skeletonTokens} className="mt-12" />
    </ComponentPage>
  );
}

