import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexProgress, WexButton } from "@/components/wex";

// Token mappings for WexProgress
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
      description="Displays an indicator showing the completion progress of a task."
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
          uploads). For indeterminate loading, use a Spinner or Skeleton instead.
        </Guidance>
      </Section>

      <Section title="Examples" description="Different progress scenarios.">
        <div className="space-y-6">
          <ExampleCard title="Interactive Demo" description="Click to simulate progress.">
            <div className="w-full max-w-md space-y-4">
              <WexProgress value={progress} aria-label={`${progress}% complete`} />
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

          <ExampleCard title="Different Values" description="Various progress states.">
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span id="just-started-label">Just started</span>
                  <span className="text-muted-foreground">10%</span>
                </div>
                <WexProgress value={10} aria-labelledby="just-started-label" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span id="in-progress-label">In progress</span>
                  <span className="text-muted-foreground">45%</span>
                </div>
                <WexProgress value={45} aria-labelledby="in-progress-label" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span id="almost-done-label">Almost done</span>
                  <span className="text-muted-foreground">80%</span>
                </div>
                <WexProgress value={80} aria-labelledby="almost-done-label" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span id="complete-label">Complete</span>
                  <span className="text-muted-foreground">100%</span>
                </div>
                <WexProgress value={100} aria-labelledby="complete-label" />
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="File Upload" description="Common use case pattern.">
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

          <ExampleCard title="Multi-step Process" description="Showing overall progress.">
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

          <ExampleCard title="With Label" description="Clearly labeled progress.">
            <div className="w-full max-w-md space-y-2">
              <label className="text-sm font-medium" id="download-label">Downloading updates...</label>
              <WexProgress value={67} aria-labelledby="download-label" />
              <p className="text-xs text-muted-foreground">
                Estimated time remaining: 2 minutes
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
            <h3 className="font-medium mb-2">Live Regions</h3>
            <p className="text-sm text-muted-foreground">
              For progress updates that users need to hear, add{" "}
              <code className="bg-muted px-1 rounded">aria-live="polite"</code> to a 
              container that announces the percentage change.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexProgress } from "@/components/wex";

// Basic progress
<WexProgress value={50} />

// With label
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Uploading...</span>
    <span>{progress}%</span>
  </div>
  <WexProgress value={progress} />
</div>

// Controlled progress
const [progress, setProgress] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prev) => Math.min(prev + 10, 100));
  }, 500);
  return () => clearInterval(timer);
}, []);

<WexProgress value={progress} />`}
        />
      </Section>

      <TokenReference tokens={progressTokens} className="mt-12" />
    </ComponentPage>
  );
}
