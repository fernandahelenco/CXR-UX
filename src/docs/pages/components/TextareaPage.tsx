import { useState } from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexTextarea, WexLabel } from "@/components/wex";

// Props documentation for WexTextarea
const textareaProps: PropDefinition[] = [
  { name: "textareaSize", type: '"sm" | "md" | "lg"', default: '"md"', description: "Textarea size variant" },
  { name: "autoResize", type: "boolean", default: "false", description: "Auto-grow height with content" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the textarea" },
  { name: "readOnly", type: "boolean", default: "false", description: "Makes the textarea read-only" },
  { name: "maxLength", type: "number", description: "Maximum character count" },
  { name: "placeholder", type: "string", description: "Placeholder text" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

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
  const [bioText, setBioText] = useState("");

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
            <WexTextarea id="demo-textarea" placeholder="Type your message here..." />
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
              <WexTextarea textareaSize="sm" placeholder="Small textarea" />
            </div>
            <div className="space-y-2">
              <WexLabel>Medium (Default)</WexLabel>
              <WexTextarea textareaSize="md" placeholder="Medium textarea" />
            </div>
            <div className="space-y-2">
              <WexLabel>Large</WexLabel>
              <WexTextarea textareaSize="lg" placeholder="Large textarea" />
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
            <WexTextarea 
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
              <WexTextarea 
                id="char-count-textarea" 
                placeholder="Write a brief bio..."
                maxLength={200}
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
              />
              <p className="text-sm text-muted-foreground text-right">{bioText.length} / 200</p>
            </div>
          </ExampleCard>

          <ExampleCard title="Required Field">
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

      {/* ============================================================
          STATES
          ============================================================ */}
      <Section title="States" description="Interactive and visual states.">
        <div className="space-y-4 max-w-md">
          <ExampleCard title="Default">
            <WexTextarea placeholder="Default textarea" aria-label="Default textarea" />
          </ExampleCard>

          <ExampleCard title="Disabled">
            <WexTextarea disabled placeholder="Disabled textarea" aria-label="Disabled textarea" />
          </ExampleCard>

          <ExampleCard title="Read Only">
            <WexTextarea 
              readOnly 
              defaultValue="This content is read-only and cannot be modified."
              aria-label="Read only content"
            />
          </ExampleCard>

          <ExampleCard title="Non-Resizable">
            <WexTextarea 
              placeholder="Cannot resize this textarea..." 
              className="resize-none"
              aria-label="Non-resizable textarea"
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
          code={`import { WexTextarea } from "@/components/wex";

// Sizes
<WexTextarea textareaSize="sm" placeholder="Small" />
<WexTextarea textareaSize="md" placeholder="Medium (default)" />
<WexTextarea textareaSize="lg" placeholder="Large" />

// Auto-resize (grows with content)
<WexTextarea autoResize placeholder="Type and watch it grow..." />

// Non-resizable
<WexTextarea className="resize-none" />

// All props
<WexTextarea
  textareaSize="md"
  autoResize
  placeholder="Full example"
  maxLength={500}
/>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={textareaProps} />
      </Section>

      <TokenReference tokens={textareaTokens} className="mt-12" />
    </ComponentPage>
  );
}
