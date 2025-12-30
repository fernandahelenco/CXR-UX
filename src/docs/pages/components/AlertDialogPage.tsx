import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexAlertDialog, WexButton } from "@/components/wex";

// Props documentation
const alertDialogRootProps: PropDefinition[] = [
  { name: "open", type: "boolean", description: "Controlled open state" },
  { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes" },
];

// Token mappings for WexAlertDialog
// Layer 3 component tokens
const alertDialogTokens: TokenRow[] = [
  { element: "Overlay", property: "Background", token: "--wex-component-alertdialog-overlay-bg" },
  { element: "Overlay", property: "Opacity", token: "--wex-component-alertdialog-overlay-opacity" },
  { element: "Content", property: "Background", token: "--wex-component-alertdialog-bg" },
  { element: "Content", property: "Text", token: "--wex-component-alertdialog-fg" },
  { element: "Content", property: "Border", token: "--wex-component-alertdialog-border" },
  { element: "Action Button", property: "Background", token: "--wex-component-alertdialog-action-bg" },
  { element: "Action Button", property: "Text", token: "--wex-component-alertdialog-action-fg" },
  { element: "Cancel Button", property: "Background", token: "--wex-component-alertdialog-cancel-bg" },
  { element: "Cancel Button", property: "Text", token: "--wex-component-alertdialog-cancel-fg" },
];

export default function AlertDialogPage() {
  return (
    <ComponentPage
      title="Alert Dialog"
      description="Modal dialog for important confirmations that require user acknowledgment."
      status="stable"
      registryKey="alert-dialog"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexAlertDialog>
            <WexAlertDialog.Trigger asChild>
              <WexButton intent="destructive">Delete Account</WexButton>
            </WexAlertDialog.Trigger>
            <WexAlertDialog.Content>
              <WexAlertDialog.Header>
                <WexAlertDialog.Title>Are you absolutely sure?</WexAlertDialog.Title>
                <WexAlertDialog.Description>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </WexAlertDialog.Description>
              </WexAlertDialog.Header>
              <WexAlertDialog.Footer>
                <WexAlertDialog.Cancel>Cancel</WexAlertDialog.Cancel>
                <WexAlertDialog.Action>Continue</WexAlertDialog.Action>
              </WexAlertDialog.Footer>
            </WexAlertDialog.Content>
          </WexAlertDialog>
        </ExampleCard>
      </Section>

      <Section title="Variants" description="Different alert dialog configurations.">
        <div className="space-y-4">
          <ExampleCard title="Confirmation" description="Standard confirmation dialog.">
            <WexAlertDialog>
              <WexAlertDialog.Trigger asChild>
                <WexButton intent="outline">Show Confirmation</WexButton>
              </WexAlertDialog.Trigger>
              <WexAlertDialog.Content>
                <WexAlertDialog.Header>
                  <WexAlertDialog.Title>Confirm Action</WexAlertDialog.Title>
                  <WexAlertDialog.Description>
                    Are you sure you want to proceed with this action?
                  </WexAlertDialog.Description>
                </WexAlertDialog.Header>
                <WexAlertDialog.Footer>
                  <WexAlertDialog.Cancel>Cancel</WexAlertDialog.Cancel>
                  <WexAlertDialog.Action>Confirm</WexAlertDialog.Action>
                </WexAlertDialog.Footer>
              </WexAlertDialog.Content>
            </WexAlertDialog>
          </ExampleCard>

          <ExampleCard title="Destructive Action" description="For dangerous operations.">
            <WexAlertDialog>
              <WexAlertDialog.Trigger asChild>
                <WexButton intent="destructive">Delete Item</WexButton>
              </WexAlertDialog.Trigger>
              <WexAlertDialog.Content>
                <WexAlertDialog.Header>
                  <WexAlertDialog.Title>Delete Item</WexAlertDialog.Title>
                  <WexAlertDialog.Description>
                    This will permanently delete this item. This action cannot be undone.
                  </WexAlertDialog.Description>
                </WexAlertDialog.Header>
                <WexAlertDialog.Footer>
                  <WexAlertDialog.Cancel>Cancel</WexAlertDialog.Cancel>
                  <WexAlertDialog.Action className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                  </WexAlertDialog.Action>
                </WexAlertDialog.Footer>
              </WexAlertDialog.Content>
            </WexAlertDialog>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Focus Management</h3>
            <p className="text-sm text-muted-foreground">
              When opened, focus moves to the alert dialog. The Cancel button receives
              initial focus by default. When closed, focus returns to the trigger.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Escape: Close the dialog (activates Cancel)</li>
              <li>Tab: Move between focusable elements</li>
              <li>Enter/Space: Activate the focused button</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexAlertDialog, WexButton } from "@/components/wex";

<WexAlertDialog>
  <WexAlertDialog.Trigger asChild>
    <WexButton intent="destructive">Delete</WexButton>
  </WexAlertDialog.Trigger>
  <WexAlertDialog.Content>
    <WexAlertDialog.Header>
      <WexAlertDialog.Title>Are you sure?</WexAlertDialog.Title>
      <WexAlertDialog.Description>
        This action cannot be undone.
      </WexAlertDialog.Description>
    </WexAlertDialog.Header>
    <WexAlertDialog.Footer>
      <WexAlertDialog.Cancel>Cancel</WexAlertDialog.Cancel>
      <WexAlertDialog.Action>Continue</WexAlertDialog.Action>
    </WexAlertDialog.Footer>
  </WexAlertDialog.Content>
</WexAlertDialog>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={alertDialogRootProps} title="WexAlertDialog" />
      </Section>

      <TokenReference tokens={alertDialogTokens} className="mt-12" />
    </ComponentPage>
  );
}
