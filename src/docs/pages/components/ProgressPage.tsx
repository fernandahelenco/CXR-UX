import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexProgress, WexButton } from "@/components/wex";

// Props documentation
const progressProps: PropDefinition[] = [
  { name: "value", type: "number", default: "0", description: "Current progress value (0-100)" },
  { name: "max", type: "number", default: "100", description: "Maximum value" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

// Token mappings for Progress
// Layer 3 component tokens
const progressTokens: TokenRow[] = [
  { element: "Track", property: "Background", token: "--wex-component-progress-track-bg" },
  { element: "Indicator", property: "Background", token: "--wex-component-progress-indicator-bg" },
];

export default function ProgressPage() {
  const [progress, setProgress] = React.useState(13);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setLoading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
      return () => clearInterval(timer);
    }
  }, [loading]);

  const startProgress = () => {
    setProgress(0);
    setLoading(true);
  };

  return (
    <ComponentPage
      title="Progress"
      description="Displays completion progress with determinate, indeterminate, and labeled modes."
      status="stable"
      registryKey="progress"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="w-full max-w-md space-y-4">
            <WexProgress value={33} aria-label="33% complete" />
            <WexProgress value={66} aria-label="66% complete" />
            <WexProgress value={100} aria-label="100% complete" />
          </div>
        </ExampleCard>
        <Guidance>
          Use progress bars for operations with determinate progress (e.g., file 
          uploads). For unknown durations, use indeterminate mode.
        </Guidance>
      </Section>

      {/* ============================================================
          INDETERMINATE MODE
          ============================================================ */}
      <Section title="Indeterminate Mode" description="For operations with unknown duration.">
        <ExampleCard title="Indeterminate Progress">
          <div className="w-full max-w-md space-y-4">
            <WexProgress indeterminate aria-label="Loading..." />
            <p className="text-sm text-muted-foreground text-center">
              Loading data...
            </p>
          </div>
        </ExampleCard>
        <Guidance>
          Use indeterminate mode when you don't know how long an operation will take.
          The progress bar animates continuously to indicate activity.
        </Guidance>
      </Section>

      {/* ============================================================
          WITH LABEL
          ============================================================ */}
      <Section title="With Label" description="Show progress percentage inside the bar.">
        <ExampleCard title="Labeled Progress">
          <div className="w-full max-w-md space-y-4">
            <WexProgress value={25} showLabel aria-label="25% complete" />
            <WexProgress value={50} showLabel aria-label="50% complete" />
            <WexProgress value={75} showLabel aria-label="75% complete" />
            <WexProgress value={100} showLabel aria-label="100% complete" />
          </div>
        </ExampleCard>

        <ExampleCard title="Custom Label Format">
          <div className="w-full max-w-md">
            <WexProgress 
              value={67} 
              showLabel 
              labelFormat={(v) => `${Math.round(v)}% done`}
              aria-label="67% complete" 
            />
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          INTERACTIVE DEMO
          ============================================================ */}
      <Section title="Interactive Demo" description="Simulated progress animation.">
        <ExampleCard title="Click to Start">
          <div className="w-full max-w-md space-y-4">
            <WexProgress value={progress} showLabel aria-label={`${progress}% complete`} />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {progress}% complete
              </span>
              <WexButton 
                size="sm" 
                onClick={startProgress}
                disabled={loading}
              >
                {loading ? "Loading..." : "Start"}
              </WexButton>
            </div>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          USE CASES
          ============================================================ */}
      <Section title="Use Cases" description="Common progress scenarios.">
        <div className="space-y-6">
          <ExampleCard title="File Upload">
            <div className="w-full max-w-md rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" id="file-upload-label">document.pdf</p>
                  <p className="text-xs text-muted-foreground">2.4 MB of 5.0 MB</p>
                </div>
                <span className="text-sm text-muted-foreground">48%</span>
              </div>
              <WexProgress value={48} aria-labelledby="file-upload-label" />
            </div>
          </ExampleCard>

          <ExampleCard title="Multi-step Process">
            <div className="w-full max-w-md space-y-4">
              <div className="flex justify-between text-sm">
                <span id="multi-step-label">Step 2 of 4: Configuring</span>
                <span className="text-muted-foreground">50%</span>
              </div>
              <WexProgress value={50} aria-labelledby="multi-step-label" />
              <div className="flex gap-2">
                <div className="flex-1 h-1 rounded-full bg-primary" />
                <div className="flex-1 h-1 rounded-full bg-primary" />
                <div className="flex-1 h-1 rounded-full bg-muted" />
                <div className="flex-1 h-1 rounded-full bg-muted" />
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="Loading State">
            <div className="w-full max-w-md space-y-2">
              <label className="text-sm font-medium" id="download-label">
                Downloading updates...
              </label>
              <WexProgress indeterminate aria-labelledby="download-label" />
              <p className="text-xs text-muted-foreground">
                Please wait...
              </p>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">ARIA Attributes</h3>
            <p className="text-sm text-muted-foreground">
              Progress uses <code className="bg-muted px-1 rounded">role="progressbar"</code> with{" "}
              <code className="bg-muted px-1 rounded">aria-valuenow</code>,{" "}
              <code className="bg-muted px-1 rounded">aria-valuemin</code>, and{" "}
              <code className="bg-muted px-1 rounded">aria-valuemax</code> for screen reader support.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Indeterminate Mode</h3>
            <p className="text-sm text-muted-foreground">
              When indeterminate, aria-valuenow is omitted to indicate unknown progress.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexProgress } from "@/components/wex";

// Basic determinate progress
<WexProgress value={50} />

// Indeterminate (unknown duration)
<WexProgress indeterminate />

// With visible label
<WexProgress value={75} showLabel />

// Custom label format
<WexProgress 
  value={67} 
  showLabel 
  labelFormat={(v) => \`\${Math.round(v)}% done\`}
/>

// All props
<WexProgress
  value={50}
  indeterminate={false}
  showLabel
  labelFormat={(v) => \`\${v}%\`}
  aria-label="Loading progress"
/>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">value</code>: number (0-100)</li>
            <li><code className="bg-muted px-1 rounded">indeterminate</code>: boolean - Animating bar for unknown duration</li>
            <li><code className="bg-muted px-1 rounded">showLabel</code>: boolean - Show percentage inside bar</li>
            <li><code className="bg-muted px-1 rounded">labelFormat</code>: (value: number) =&gt; string - Custom label formatter</li>
          </ul>
        </div>
      </Section>

      <Section title="API Reference">
        <PropsTable props={progressProps} />
      </Section>

      <TokenReference tokens={progressTokens} className="mt-12" />
    </ComponentPage>
  );
}
