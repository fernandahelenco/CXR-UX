import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexTextarea, WexLabel } from "@/components/wex";

// Token mappings for WexTextarea
// Layer 3 component tokens
const textareaTokens: TokenRow[] = [
  { element: "Textarea", property: "Background", token: "--wex-component-textarea-bg" },
  { element: "Textarea", property: "Text", token: "--wex-component-textarea-fg" },
  { element: "Textarea", property: "Border", token: "--wex-component-textarea-border" },
  { element: "Placeholder", property: "Text", token: "--wex-component-textarea-placeholder" },
  { element: "Focus Ring", property: "Color", token: "--wex-component-textarea-focus-ring" },
  { element: "Disabled", property: "Opacity", token: "--wex-component-textarea-disabled-opacity" },
];

export default function TextareaPage() {
  return (
    <ComponentPage
      title="Textarea"
      description="Multi-line text input for longer form content."
      status="stable"
      registryKey="textarea"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="w-full max-w-md space-y-2">
            <WexLabel htmlFor="demo-textarea">Message</WexLabel>
            <WexTextarea id="demo-textarea" placeholder="Type your message here..." />
          </div>
        </ExampleCard>
      </Section>

      <Section title="Examples" description="Common textarea use cases.">
        <div className="space-y-4">
          <ExampleCard title="Default" description="Standard textarea with placeholder.">
            <div className="w-full max-w-md space-y-2">
              <WexLabel htmlFor="default-textarea">Description</WexLabel>
              <WexTextarea id="default-textarea" placeholder="Enter a description..." />
            </div>
          </ExampleCard>

          <ExampleCard title="With Value" description="Pre-filled textarea content.">
            <div className="w-full max-w-md space-y-2">
              <WexLabel htmlFor="value-textarea">Bio</WexLabel>
              <WexTextarea 
                id="value-textarea" 
                defaultValue="This is an example of pre-filled textarea content. Users can edit this text as needed."
              />
            </div>
          </ExampleCard>

          <ExampleCard title="With Character Limit" description="Textarea with character count guidance.">
            <div className="w-full max-w-md space-y-2">
              <WexLabel htmlFor="limited-textarea">Short Bio (max 200 characters)</WexLabel>
              <WexTextarea 
                id="limited-textarea" 
                placeholder="Write a brief bio..."
                maxLength={200}
              />
              <p className="text-sm text-muted-foreground text-right">0 / 200</p>
            </div>
          </ExampleCard>

          <ExampleCard title="Required Field" description="Textarea marked as required.">
            <div className="w-full max-w-md space-y-2">
              <WexLabel htmlFor="required-textarea">
                Feedback <span className="text-destructive">*</span>
              </WexLabel>
              <WexTextarea 
                id="required-textarea" 
                placeholder="Please share your feedback..."
                required
              />
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="States" description="Interactive and visual states.">
        <div className="space-y-4">
          <ExampleCard title="Focus State" description="Click or tab to see focus ring.">
            <WexTextarea placeholder="Click or tab to focus this textarea..." className="max-w-md" />
          </ExampleCard>

          <ExampleCard title="Disabled" description="Non-interactive disabled state.">
            <div className="w-full max-w-md space-y-2">
              <WexLabel htmlFor="disabled-textarea">Notes (Locked)</WexLabel>
              <WexTextarea 
                id="disabled-textarea" 
                disabled 
                placeholder="This field cannot be edited"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Read Only" description="Visible content that cannot be edited.">
            <div className="w-full max-w-md space-y-2">
              <WexLabel htmlFor="readonly-textarea">Terms Summary</WexLabel>
              <WexTextarea 
                id="readonly-textarea" 
                readOnly 
                defaultValue="By using this service, you agree to our terms of service and privacy policy. This content is read-only and cannot be modified."
              />
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Sizing" description="Textarea dimensions and resize behavior.">
        <div className="space-y-4">
          <ExampleCard title="Default Height" description="100px minimum height.">
            <WexTextarea placeholder="Default size..." className="max-w-md" />
          </ExampleCard>

          <ExampleCard title="Custom Height" description="Can be customized via className.">
            <WexTextarea placeholder="Taller textarea..." className="max-w-md min-h-[200px]" />
          </ExampleCard>

          <ExampleCard title="Non-Resizable" description="Prevent user resizing.">
            <WexTextarea placeholder="Cannot resize..." className="max-w-md resize-none" />
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Label Association</h3>
            <p className="text-sm text-muted-foreground">
              Always associate textareas with labels using matching{" "}
              <code className="bg-muted px-1 rounded">htmlFor</code> and{" "}
              <code className="bg-muted px-1 rounded">id</code> attributes.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Focus Visibility</h3>
            <p className="text-sm text-muted-foreground">
              Textarea displays a visible focus ring when navigated via keyboard,
              meeting WCAG 2.4.7 requirements.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Placeholder Guidelines</h3>
            <p className="text-sm text-muted-foreground">
              Use placeholder text for examples only, not instructions.
              Important information belongs in the label or helper text.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexTextarea, WexLabel } from "@/components/wex";

// Basic usage
<WexTextarea placeholder="Enter text..." />

// With label (recommended)
<div className="space-y-2">
  <WexLabel htmlFor="message">Message</WexLabel>
  <WexTextarea id="message" placeholder="Type your message..." />
</div>

// Controlled textarea
const [value, setValue] = useState("");
<WexTextarea 
  value={value} 
  onChange={(e) => setValue(e.target.value)} 
/>

// Custom height
<WexTextarea className="min-h-[200px]" />

// Non-resizable
<WexTextarea className="resize-none" />

// With character limit
<WexTextarea maxLength={500} />`}
        />
      </Section>

      <TokenReference tokens={textareaTokens} className="mt-12" />
    </ComponentPage>
  );
}
