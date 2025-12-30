import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexButton } from "@/components/wex";
import { toast } from "sonner";

// Props documentation (using Sonner's toast function)
const toastFunctionProps: PropDefinition[] = [
  { name: "message", type: "string | ReactNode", required: true, description: "Toast message content" },
  { name: "description", type: "string | ReactNode", description: "Additional description" },
  { name: "duration", type: "number", default: "4000", description: "Duration in ms (Infinity to persist)" },
  { name: "position", type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"', default: '"bottom-right"', description: "Toast position" },
  { name: "action", type: "{ label: string; onClick: () => void }", description: "Action button config" },
  { name: "cancel", type: "{ label: string; onClick: () => void }", description: "Cancel button config" },
];

// Layer 3 component tokens for Toast (Sonner) variants
const toastTokens: TokenRow[] = [
  // Default
  { element: "Default", property: "Background", token: "--background" },
  { element: "Default", property: "Text", token: "--foreground" },
  { element: "Default", property: "Border", token: "--border" },
  // Info (Layer 3)
  { element: "Info", property: "Background", token: "--wex-component-toast-info-bg" },
  { element: "Info", property: "Text", token: "--wex-component-toast-info-fg" },
  { element: "Info", property: "Border", token: "--wex-component-toast-info-border" },
  // Success (Layer 3)
  { element: "Success", property: "Background", token: "--wex-component-toast-success-bg" },
  { element: "Success", property: "Text", token: "--wex-component-toast-success-fg" },
  { element: "Success", property: "Border", token: "--wex-component-toast-success-border" },
  // Destructive (Layer 3)
  { element: "Error", property: "Background", token: "--wex-component-toast-destructive-bg" },
  { element: "Error", property: "Text", token: "--wex-component-toast-destructive-fg" },
  { element: "Error", property: "Border", token: "--wex-component-toast-destructive-border" },
  // Warning (Layer 2 - no dedicated Layer 3 tokens yet)
  { element: "Warning", property: "Background", token: "--warning" },
  { element: "Warning", property: "Text", token: "--warning-foreground" },
  // Close Button
  { element: "Close Button", property: "Hover BG", token: "--wex-component-toast-close-hover-bg" },
];

export default function ToastPage() {
  return (
    <ComponentPage
      title="Toast"
      description="A succinct message that is displayed temporarily."
      status="beta"
      registryKey="toast"
    >
      <Section title="Overview">
        <div className="rounded-lg border border-border bg-card p-6 mb-4">
          <p className="text-muted-foreground">
            Toast notifications provide brief feedback about an operation. We use
            the <strong>Sonner</strong> library for toast functionality, which provides
            a modern, accessible toast system.
          </p>
        </div>
        <ExampleCard>
          <div className="flex flex-wrap gap-2">
            <WexButton intent="outline" onClick={() => toast("Event has been created")}>
              Default Toast
            </WexButton>
            <WexButton intent="outline" onClick={() => toast.success("Successfully saved!")}>
              Success
            </WexButton>
            <WexButton intent="outline" onClick={() => toast.error("Something went wrong")}>
              Error
            </WexButton>
          </div>
        </ExampleCard>
        <Guidance>
          Note: The Sonner page provides comprehensive toast documentation. 
          This page exists for reference to the shadcn Toast primitive.
        </Guidance>
      </Section>

      <Section title="Toast Types" description="Different toast variants for different scenarios.">
        <div className="space-y-4">
          <ExampleCard title="Default" description="General notifications.">
            <WexButton intent="outline" onClick={() => toast("Your changes have been saved")}>
              Show Default
            </WexButton>
          </ExampleCard>

          <ExampleCard title="Success" description="Positive confirmations.">
            <WexButton intent="outline" onClick={() => toast.success("Profile updated successfully")}>
              Show Success
            </WexButton>
          </ExampleCard>

          <ExampleCard title="Error" description="Error messages.">
            <WexButton intent="outline" onClick={() => toast.error("Failed to save changes")}>
              Show Error
            </WexButton>
          </ExampleCard>

          <ExampleCard title="Warning" description="Caution messages.">
            <WexButton intent="outline" onClick={() => toast.warning("Session expires in 5 minutes")}>
              Show Warning
            </WexButton>
          </ExampleCard>

          <ExampleCard title="Info" description="Informational messages.">
            <WexButton intent="outline" onClick={() => toast.info("New version available")}>
              Show Info
            </WexButton>
          </ExampleCard>

          <ExampleCard title="With Description" description="Toast with additional context.">
            <WexButton
              intent="outline"
              onClick={() =>
                toast("Event Created", {
                  description: "Your event has been scheduled for tomorrow at 3pm.",
                })
              }
            >
              With Description
            </WexButton>
          </ExampleCard>

          <ExampleCard title="With Action" description="Toast with action button.">
            <WexButton
              intent="outline"
              onClick={() =>
                toast("Message sent", {
                  action: {
                    label: "Undo",
                    onClick: () => toast("Undone!"),
                  },
                })
              }
            >
              With Action
            </WexButton>
          </ExampleCard>

          <ExampleCard title="Loading" description="For async operations.">
            <WexButton
              intent="outline"
              onClick={() => {
                const id = toast.loading("Saving...");
                setTimeout(() => {
                  toast.success("Saved!", { id });
                }, 2000);
              }}
            >
              Show Loading
            </WexButton>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Setup">
        <div className="rounded-lg border border-border bg-card p-4 mb-4">
          <h3 className="font-medium mb-2">Required: Add Toaster Component</h3>
          <p className="text-sm text-muted-foreground mb-3">
            The Toaster component must be included once in your application root.
          </p>
        </div>
        <CodeBlock
          code={`// In App.tsx or layout
import { WexToaster } from "@/components/wex";

function App() {
  return (
    <>
      <YourApp />
      <WexToaster />
    </>
  );
}`}
        />
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">WCAG 2.2 Level AA Compliant</h3>
            <p className="text-sm text-muted-foreground">
              Toast notifications meet WCAG 2.2 Level AA accessibility requirements.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">ARIA Live Regions</h3>
            <p className="text-sm text-muted-foreground">
              Toasts use <code className="bg-muted px-1 rounded">aria-live="polite"</code> to announce 
              messages to screen readers without interrupting the user.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Tab: Focus action buttons</li>
              <li>Enter: Activate action</li>
              <li>Escape: Dismiss toast (when focused)</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { wexToast } from "@/components/wex";

// Basic
wexToast("Hello World");

// Variants
wexToast.success("Saved!");
wexToast.error("Failed!");
wexToast.warning("Caution!");
wexToast.info("FYI...");

// With description
wexToast("Title", {
  description: "More details here.",
});

// With action
wexToast("Undo?", {
  action: {
    label: "Undo",
    onClick: () => console.log("Undone"),
  },
});

// Loading → Success
const id = wexToast.loading("Loading...");
// After async operation:
wexToast.success("Done!", { id });

// Dismiss
wexToast.dismiss(); // All
wexToast.dismiss(id); // Specific`}
        />
      </Section>

      <Section title="API Reference">
        <p className="text-sm text-muted-foreground mb-4">
          Toast is called as a function: <code className="text-sm">toast("Message")</code> or <code className="text-sm">toast.success("Message")</code>
        </p>
        <PropsTable props={toastFunctionProps} />
      </Section>

      <TokenReference tokens={toastTokens} className="mt-12" />
    </ComponentPage>
  );
}
