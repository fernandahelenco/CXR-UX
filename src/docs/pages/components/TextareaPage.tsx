import { useState } from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { Textarea } from "@/components/ui/textarea";
import { WexLabel } from "@/components/wex";

// Token mappings for Textarea
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
  const [autoResizeValue, setAutoResizeValue] = useState("");

  return (
    <ComponentPage
      title="Textarea"
      description="Multi-line text input with sizes and auto-resize capability."
      status="stable"
      registryKey="textarea"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="w-full max-w-md space-y-2">
            <WexLabel htmlFor="demo-textarea">Message</WexLabel>
            <Textarea id="demo-textarea" placeholder="Type your message here..." />
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          SIZES
          ============================================================ */}
      <Section title="Sizes" description="Three sizes for different contexts.">
        <ExampleCard title="All Sizes">
          <div className="w-full max-w-md space-y-4">
            <div className="space-y-2">
              <WexLabel>Small</WexLabel>
              <Textarea textareaSize="sm" placeholder="Small textarea" />
            </div>
            <div className="space-y-2">
              <WexLabel>Medium (Default)</WexLabel>
              <Textarea textareaSize="md" placeholder="Medium textarea" />
            </div>
            <div className="space-y-2">
              <WexLabel>Large</WexLabel>
              <Textarea textareaSize="lg" placeholder="Large textarea" />
            </div>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          AUTO-RESIZE
          ============================================================ */}
      <Section title="Auto-Resize" description="Textarea that grows with content.">
        <ExampleCard title="Auto-Resize Demo">
          <div className="w-full max-w-md space-y-2">
            <WexLabel htmlFor="auto-textarea">Type to see auto-resize</WexLabel>
            <Textarea 
              id="auto-textarea"
              autoResize
              placeholder="Start typing... the textarea will grow as you add more lines."
              value={autoResizeValue}
              onChange={(e) => setAutoResizeValue(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              {autoResizeValue.split('\n').length} line(s)
            </p>
          </div>
        </ExampleCard>
        <div className="mt-4 text-sm text-muted-foreground">
          The auto-resize feature uses CSS to dynamically adjust the textarea height 
          based on content. This provides a better user experience for variable-length input.
        </div>
      </Section>

      {/* ============================================================
          EXAMPLES
          ============================================================ */}
      <Section title="Examples" description="Common textarea use cases.">
        <div className="space-y-4">
          <ExampleCard title="With Character Count">
            <div className="w-full max-w-md space-y-2">
              <WexLabel htmlFor="char-count-textarea">Bio (max 200 characters)</WexLabel>
              <Textarea 
                id="char-count-textarea" 
                placeholder="Write a brief bio..."
                maxLength={200}
              />
              <p className="text-sm text-muted-foreground text-right">0 / 200</p>
            </div>
          </ExampleCard>

          <ExampleCard title="Required Field">
            <div className="w-full max-w-md space-y-2">
              <WexLabel htmlFor="required-textarea">
                Feedback <span className="text-destructive">*</span>
              </WexLabel>
              <Textarea 
                id="required-textarea" 
                placeholder="Please share your feedback..."
                required
              />
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          STATES
          ============================================================ */}
      <Section title="States" description="Interactive and visual states.">
        <div className="space-y-4 max-w-md">
          <ExampleCard title="Default">
            <Textarea placeholder="Default textarea" />
          </ExampleCard>

          <ExampleCard title="Disabled">
            <Textarea disabled placeholder="Disabled textarea" />
          </ExampleCard>

          <ExampleCard title="Read Only">
            <Textarea 
              readOnly 
              defaultValue="This content is read-only and cannot be modified."
            />
          </ExampleCard>

          <ExampleCard title="Non-Resizable">
            <Textarea 
              placeholder="Cannot resize this textarea..." 
              className="resize-none"
            />
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Label Association</h3>
            <p className="text-sm text-muted-foreground">
              Always associate textareas with labels using matching htmlFor and id attributes.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Focus Visibility</h3>
            <p className="text-sm text-muted-foreground">
              Textarea displays a visible focus ring when navigated via keyboard,
              meeting WCAG 2.4.7 requirements.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { Textarea } from "@/components/ui/textarea";

// Sizes
<Textarea textareaSize="sm" placeholder="Small" />
<Textarea textareaSize="md" placeholder="Medium (default)" />
<Textarea textareaSize="lg" placeholder="Large" />

// Auto-resize (grows with content)
<Textarea autoResize placeholder="Type and watch it grow..." />

// Non-resizable
<Textarea className="resize-none" />

// All props
<Textarea
  textareaSize="md"
  autoResize
  placeholder="Full example"
  maxLength={500}
/>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">textareaSize</code>: "sm" | "md" | "lg"</li>
            <li><code className="bg-muted px-1 rounded">autoResize</code>: boolean - Auto-grow with content</li>
          </ul>
        </div>
      </Section>

      <TokenReference tokens={textareaTokens} className="mt-12" />
    </ComponentPage>
  );
}
