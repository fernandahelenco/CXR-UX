import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { Skeleton, SkeletonCard, SkeletonList } from "@/components/ui/skeleton";

// Token mappings for Skeleton
// Layer 3 component tokens
const skeletonTokens: TokenRow[] = [
  { element: "Skeleton", property: "Background", token: "--wex-component-skeleton-bg" },
  { element: "Animation", property: "Type", token: "pulse / wave (CSS animation)" },
];

export default function SkeletonPage() {
  return (
    <ComponentPage
      title="Skeleton"
      description="Loading placeholder with shapes, animations, and prebuilt presets."
      status="stable"
      registryKey="skeleton"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="flex items-center space-x-4">
            <Skeleton shape="circle" className="h-12 w-12" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          SHAPES
          ============================================================ */}
      <Section title="Shapes" description="Three shape variants for different content types.">
        <ExampleCard title="Rectangle (Default)">
          <div className="space-y-2 w-64">
            <Skeleton shape="rectangle" className="h-32 w-full" />
            <p className="text-xs text-muted-foreground">For images, cards, content blocks</p>
          </div>
        </ExampleCard>

        <ExampleCard title="Circle">
          <div className="flex items-center gap-4">
            <Skeleton shape="circle" className="h-10 w-10" />
            <Skeleton shape="circle" className="h-12 w-12" />
            <Skeleton shape="circle" className="h-16 w-16" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">For avatars, icons</p>
        </ExampleCard>

        <ExampleCard title="Text">
          <div className="space-y-2 w-64">
            <Skeleton shape="text" />
            <Skeleton shape="text" className="w-3/4" />
            <Skeleton shape="text" className="w-1/2" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">For text lines, paragraphs</p>
        </ExampleCard>
      </Section>

      {/* ============================================================
          ANIMATIONS
          ============================================================ */}
      <Section title="Animations" description="Three animation options.">
        <ExampleCard title="Pulse (Default)">
          <Skeleton animation="pulse" className="h-12 w-48" />
        </ExampleCard>

        <ExampleCard title="Wave">
          <Skeleton animation="wave" className="h-12 w-48" />
        </ExampleCard>

        <ExampleCard title="None">
          <Skeleton animation="none" className="h-12 w-48" />
          <p className="text-xs text-muted-foreground mt-2">
            Use for reduced motion preferences or static placeholders
          </p>
        </ExampleCard>
      </Section>

      {/* ============================================================
          PRESETS
          ============================================================ */}
      <Section title="Presets" description="Pre-built skeleton patterns for common layouts.">
        <ExampleCard title="SkeletonCard">
          <div className="w-64">
            <SkeletonCard />
          </div>
        </ExampleCard>

        <ExampleCard title="SkeletonList">
          <div className="w-64">
            <SkeletonList count={3} />
          </div>
        </ExampleCard>

        <ExampleCard title="SkeletonList with 5 items">
          <div className="w-64">
            <SkeletonList count={5} />
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          COMBINED EXAMPLES
          ============================================================ */}
      <Section title="Examples" description="Common skeleton patterns.">
        <div className="space-y-4">
          <ExampleCard title="User Profile">
            <div className="flex items-center space-x-4">
              <Skeleton shape="circle" className="h-12 w-12" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-3 w-[80px]" />
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="Article Preview">
            <div className="space-y-3 w-full max-w-md">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </ExampleCard>

          <ExampleCard title="Table Row">
            <div className="flex items-center gap-4 w-full max-w-md">
              <Skeleton shape="circle" className="h-8 w-8" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16 ml-auto" />
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
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
              Use <code className="bg-muted px-1 rounded">animation="none"</code> for users who prefer reduced motion,
              or the animation will automatically respect prefers-reduced-motion.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { Skeleton, SkeletonCard, SkeletonList } from "@/components/ui/skeleton";

// Shapes
<Skeleton shape="rectangle" className="h-32 w-full" />
<Skeleton shape="circle" className="h-12 w-12" />
<Skeleton shape="text" className="h-4 w-[200px]" />

// Animations
<Skeleton animation="pulse" />  {/* default */}
<Skeleton animation="wave" />
<Skeleton animation="none" />

// Presets
<SkeletonCard />
<SkeletonList count={3} />

// Combined
<Skeleton 
  shape="rectangle" 
  animation="pulse" 
  className="h-48 w-full" 
/>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Skeleton Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">shape</code>: "rectangle" | "circle" | "text"</li>
            <li><code className="bg-muted px-1 rounded">animation</code>: "pulse" | "wave" | "none"</li>
          </ul>
          <p className="mt-3"><strong>Preset Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">SkeletonList count</code>: number - Number of list items</li>
          </ul>
        </div>
      </Section>

      <TokenReference tokens={skeletonTokens} className="mt-12" />
    </ComponentPage>
  );
}
