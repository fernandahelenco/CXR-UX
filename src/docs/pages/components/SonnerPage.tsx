import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexButton, wexToast } from "@/components/wex";
import { AccessibilitySection } from "@/docs/components/AccessibilitySection";

// Props documentation for wexToast function
const wexToastProps: PropDefinition[] = [
  { name: "message", type: "string | ReactNode", required: true, description: "Toast message content" },
  { name: "description", type: "string | ReactNode", description: "Additional description" },
  { name: "duration", type: "number", default: "4000", description: "Duration in ms" },
  { name: "position", type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"', default: '"top-center"', description: "Toast position" },
  { name: "action", type: "{ label: string; onClick: () => void }", description: "Action button config" },
  { name: "cancel", type: "{ label: string; onClick: () => void }", description: "Cancel button config" },
  { name: "id", type: "string | number", description: "Unique ID for deduplication" },
  { name: "dismissible", type: "boolean", default: "true", description: "Show close button" },
];

// Token mappings for WexSonner (Toast)
const sonnerTokens: TokenRow[] = [
  { element: "Toast", property: "Background", token: "--background" },
  { element: "Toast", property: "Border", token: "--border" },
  { element: "Toast", property: "Text", token: "--foreground" },
  { element: "Success", property: "Icon", token: "--success" },
  { element: "Error", property: "Icon", token: "--destructive" },
  { element: "Warning", property: "Icon", token: "--warning" },
  { element: "Info", property: "Icon", token: "--info" },
  { element: "Action Button", property: "Background", token: "--primary" },
];

/**
 * Sonner - An opinionated toast component for React
 * 
 * Key differences from Toast:
 * - Default position: top-center
 * - Visual stacking behavior
 * - Promise-based toasts
 */
export default function SonnerPage() {
  // Sonner uses top-center as default position
  const sonnerPosition = "top-center" as const;

  return (
    <ComponentPage
      title="Sonner"
      description="An opinionated toast component for React."
      status="stable"
      registryKey="sonner"
    >
      {/* Overview - Single Show Toast button */}
      <Section title="Overview">
        <ExampleCard>
          <WexButton
            intent="outline"
            onClick={() =>
              wexToast("Event has been created", {
                position: sonnerPosition,
              })
            }
          >
            Show Toast
          </WexButton>
        </ExampleCard>
        <Guidance>
          Sonner is an opinionated toast component that defaults to top-center 
          positioning with visual stacking behavior. Use <code className="bg-muted px-1 rounded">WexToaster</code> at 
          your app root and <code className="bg-muted px-1 rounded">wexToast()</code> to trigger notifications.
        </Guidance>
      </Section>

      {/* Usage Section */}
      <Section title="Usage">
        <CodeBlock
          code={`// 1. Add WexToaster to your app root (once)
import { WexToaster } from "@/components/wex";

function App() {
  return (
    <>
      <Routes />
      <WexToaster position="top-center" />
    </>
  );
}

// 2. Trigger toasts anywhere in your app
import { wexToast } from "@/components/wex";

wexToast("Event has been created");`}
        />
      </Section>

      {/* Examples - All toast types in a horizontal row */}
      <Section title="Variants" description="Different toast types for various feedback scenarios.">
        <ExampleCard>
          <div className="flex flex-wrap gap-2">
            <WexButton
              intent="outline"
              onClick={() =>
                wexToast("Event has been created", {
                  position: sonnerPosition,
                })
              }
            >
              Default
            </WexButton>

            <WexButton
              intent="outline"
              onClick={() =>
                wexToast.success("Event has been created", {
                  position: sonnerPosition,
                })
              }
            >
              Success
            </WexButton>

            <WexButton
              intent="outline"
              onClick={() =>
                wexToast.info("Be at the area 10 minutes before the event time", {
                  position: sonnerPosition,
                })
              }
            >
              Info
            </WexButton>

            <WexButton
              intent="outline"
              onClick={() =>
                wexToast.warning("Event start time cannot be earlier than 8am", {
                  position: sonnerPosition,
                })
              }
            >
              Warning
            </WexButton>

            <WexButton
              intent="outline"
              onClick={() =>
                wexToast.error("Event has not been created", {
                  position: sonnerPosition,
                })
              }
            >
              Error
            </WexButton>

            <WexButton
              intent="outline"
              onClick={() =>
                wexToast.promise(
                  new Promise<{ name: string }>((resolve) =>
                    setTimeout(() => resolve({ name: "Sonner" }), 2000)
                  ),
                  {
                    loading: "Loading...",
                    success: (data) => `${data.name} toast has been added`,
                    error: "Error",
                    position: sonnerPosition,
                  }
                )
              }
            >
              Promise
            </WexButton>
          </div>
        </ExampleCard>
        <Guidance>
          Sonner automatically stacks multiple toasts visually. Try clicking
          multiple buttons in quick succession to see the stacking behavior.
        </Guidance>
        <div className="mt-4">
          <CodeBlock
            code={`// Default toast
wexToast("Event has been created");

// Success toast
wexToast.success("Saved successfully!");

// Error toast
wexToast.error("Something went wrong");

// Warning toast
wexToast.warning("Please review your input");

// Info toast
wexToast.info("New update available");

// Promise toast (loading → success/error)
wexToast.promise(saveData(), {
  loading: "Saving...",
  success: "Data saved!",
  error: "Failed to save",
});`}
          />
        </div>
      </Section>

      {/* With Description */}
      <Section title="With Description" description="Add additional context to your toast.">
        <ExampleCard>
          <WexButton
            intent="outline"
            onClick={() =>
              wexToast("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
                position: sonnerPosition,
              })
            }
          >
            Show Toast
          </WexButton>
        </ExampleCard>
        <div className="mt-4">
          <CodeBlock
            code={`wexToast("Event has been created", {
  description: "Sunday, December 03, 2023 at 9:00 AM",
});`}
          />
        </div>
      </Section>

      {/* With Action */}
      <Section title="With Action" description="Add an action button to your toast.">
        <ExampleCard>
          <WexButton
            intent="outline"
            onClick={() =>
              wexToast("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
                action: {
                  label: "Undo",
                  onClick: () => wexToast("Undo clicked", { position: sonnerPosition }),
                },
                position: sonnerPosition,
              })
            }
          >
            Show Toast
          </WexButton>
        </ExampleCard>
        <div className="mt-4">
          <CodeBlock
            code={`wexToast("Event has been created", {
  description: "Sunday, December 03, 2023 at 9:00 AM",
  action: {
    label: "Undo",
    onClick: () => console.log("Undo clicked"),
  },
});`}
          />
        </div>
      </Section>

      {/* Loading State */}
      <Section title="Loading State" description="Show a loading toast that updates when complete.">
        <ExampleCard>
          <WexButton
            intent="outline"
            onClick={() => {
              const toastId = wexToast.loading("Saving changes...", { position: sonnerPosition });
              setTimeout(() => {
                wexToast.success("Changes saved!", { id: toastId, position: sonnerPosition });
              }, 2000);
            }}
          >
            Show Loading
          </WexButton>
        </ExampleCard>
        <div className="mt-4">
          <CodeBlock
            code={`// Show loading toast, then update to success
const toastId = wexToast.loading("Saving changes...");

// After async operation completes:
wexToast.success("Changes saved!", { id: toastId });

// Or if it fails:
wexToast.error("Failed to save", { id: toastId });`}
          />
        </div>
      </Section>

      <AccessibilitySection
        compliance="2.2"
        level="AA"
        notes={[
          {
            title: "ARIA Live Region",
            description: "Toasts use aria-live='polite' to announce messages without interrupting the user.",
          },
          {
            title: "Keyboard Navigation",
            items: [
              "Tab: Focus action buttons within the toast",
              "Enter: Activate focused action",
              "Escape: Dismiss focused toast",
            ],
          },
          {
            title: "Visual Indicators",
            description: "Color is not the only indicator of toast type - icons are also used for accessibility.",
          },
        ]}
      />

      <Section title="API Reference">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">WexToaster Props</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><code className="bg-muted px-1 rounded">position</code>: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">wexToast Methods</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><code className="bg-muted px-1 rounded">wexToast(message, options?)</code> - Default toast</li>
              <li><code className="bg-muted px-1 rounded">wexToast.success(message, options?)</code> - Success variant</li>
              <li><code className="bg-muted px-1 rounded">wexToast.error(message, options?)</code> - Error variant</li>
              <li><code className="bg-muted px-1 rounded">wexToast.warning(message, options?)</code> - Warning variant</li>
              <li><code className="bg-muted px-1 rounded">wexToast.info(message, options?)</code> - Info variant</li>
              <li><code className="bg-muted px-1 rounded">wexToast.loading(message, options?)</code> - Loading state</li>
              <li><code className="bg-muted px-1 rounded">wexToast.promise(promise, options)</code> - Async operation</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <p className="text-sm text-muted-foreground mb-4">
          Use the <code className="text-sm">wexToast</code> function: <code className="text-sm">wexToast("Message")</code> or <code className="text-sm">wexToast.success("Message")</code>
        </p>
        <PropsTable props={wexToastProps} />
      </Section>

      <TokenReference tokens={sonnerTokens} className="mt-12" />
    </ComponentPage>
  );
}
