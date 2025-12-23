import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { Input } from "@/components/ui/input";
import { WexLabel } from "@/components/wex";
import { Search, Mail, Eye, Lock, Calendar, Phone } from "lucide-react";

// Token mappings for Input - Layer 3 component tokens
const inputTokens: TokenRow[] = [
  { element: "Input", property: "Background", token: "--wex-component-input-bg" },
  { element: "Input", property: "Text", token: "--wex-component-input-fg" },
  { element: "Input", property: "Placeholder", token: "--wex-component-input-placeholder" },
  { element: "Input", property: "Border", token: "--wex-component-input-border" },
  { element: "Input", property: "Border (Hover)", token: "--wex-component-input-border-hover" },
  { element: "Input", property: "Border (Focus)", token: "--wex-component-input-border-focus" },
  { element: "Focus Ring", property: "Color", token: "--wex-component-input-focus-ring" },
  { element: "Filled", property: "Background", token: "--wex-component-input-filled-bg" },
  { element: "Invalid", property: "Border", token: "--wex-component-input-invalid-border" },
  { element: "Disabled", property: "Background", token: "--wex-component-input-disabled-bg" },
  { element: "Disabled", property: "Opacity", token: "--wex-component-input-disabled-opacity" },
];

export default function InputPage() {
  return (
    <ComponentPage
      title="Input"
      description="Text input field with sizes, variants, icons, and validation states."
      status="stable"
      registryKey="input"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="w-full max-w-sm space-y-2">
            <WexLabel htmlFor="demo-input">Email address</WexLabel>
            <Input id="demo-input" type="email" placeholder="you@example.com" />
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          SIZES
          ============================================================ */}
      <Section title="Sizes" description="Three sizes for different contexts.">
        <ExampleCard title="All Sizes">
          <div className="w-full max-w-sm space-y-4">
            <div className="space-y-2">
              <WexLabel>Small</WexLabel>
              <Input inputSize="sm" placeholder="Small input" />
            </div>
            <div className="space-y-2">
              <WexLabel>Medium (Default)</WexLabel>
              <Input inputSize="md" placeholder="Medium input" />
            </div>
            <div className="space-y-2">
              <WexLabel>Large</WexLabel>
              <Input inputSize="lg" placeholder="Large input" />
            </div>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          VARIANTS
          ============================================================ */}
      <Section title="Variants" description="Default outlined and filled styles.">
        <ExampleCard title="Default (Outlined)">
          <Input placeholder="Outlined input" className="max-w-sm" />
        </ExampleCard>

        <ExampleCard title="Filled">
          <Input variant="filled" placeholder="Filled input" className="max-w-sm" />
        </ExampleCard>
      </Section>

      {/* ============================================================
          WITH ICONS
          ============================================================ */}
      <Section title="With Icons" description="Icons for visual context and affordance.">
        <ExampleCard title="Left Icon">
          <div className="max-w-sm space-y-4">
            <Input 
              leftIcon={<Search className="h-4 w-4" />} 
              placeholder="Search..." 
            />
            <Input 
              leftIcon={<Mail className="h-4 w-4" />} 
              placeholder="Email address" 
              type="email"
            />
            <Input 
              leftIcon={<Phone className="h-4 w-4" />} 
              placeholder="Phone number" 
              type="tel"
            />
          </div>
        </ExampleCard>

        <ExampleCard title="Right Icon">
          <div className="max-w-sm space-y-4">
            <Input 
              rightIcon={<Calendar className="h-4 w-4" />} 
              placeholder="Select date" 
            />
            <Input 
              rightIcon={<Eye className="h-4 w-4" />} 
              placeholder="Password" 
              type="password"
            />
          </div>
        </ExampleCard>

        <ExampleCard title="Both Icons">
          <Input 
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={<Eye className="h-4 w-4" />} 
            placeholder="Enter password" 
            type="password"
            className="max-w-sm"
          />
        </ExampleCard>
      </Section>

      {/* ============================================================
          INVALID STATE
          ============================================================ */}
      <Section title="Invalid State" description="Visual feedback for validation errors.">
        <ExampleCard title="Invalid Input">
          <div className="w-full max-w-sm space-y-2">
            <WexLabel htmlFor="invalid-input">Email</WexLabel>
            <Input 
              id="invalid-input" 
              invalid 
              defaultValue="invalid-email" 
              type="email"
            />
            <p className="text-sm text-destructive">
              Please enter a valid email address.
            </p>
          </div>
        </ExampleCard>

        <ExampleCard title="Invalid with Icon">
          <div className="w-full max-w-sm space-y-2">
            <WexLabel htmlFor="invalid-icon-input">Password</WexLabel>
            <Input 
              id="invalid-icon-input" 
              invalid 
              leftIcon={<Lock className="h-4 w-4" />}
              placeholder="Enter password" 
              type="password"
            />
            <p className="text-sm text-destructive">
              Password must be at least 8 characters.
            </p>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          INPUT TYPES
          ============================================================ */}
      <Section title="Input Types" description="Common HTML5 input types.">
        <div className="grid gap-4 max-w-sm">
          <ExampleCard title="Text">
            <Input type="text" placeholder="Full name" />
          </ExampleCard>
          <ExampleCard title="Email">
            <Input type="email" placeholder="email@example.com" />
          </ExampleCard>
          <ExampleCard title="Password">
            <Input type="password" placeholder="Enter password" />
          </ExampleCard>
          <ExampleCard title="Number">
            <Input type="number" placeholder="0" min={0} max={100} />
          </ExampleCard>
          <ExampleCard title="Search">
            <Input type="search" placeholder="Search..." />
          </ExampleCard>
          <ExampleCard title="URL">
            <Input type="url" placeholder="https://example.com" />
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          STATES
          ============================================================ */}
      <Section title="States" description="Interactive and visual states.">
        <div className="space-y-4 max-w-sm">
          <ExampleCard title="Default">
            <Input placeholder="Default input" />
          </ExampleCard>
          <ExampleCard title="Disabled">
            <Input disabled placeholder="Disabled input" />
          </ExampleCard>
          <ExampleCard title="Read Only">
            <Input readOnly defaultValue="Read-only value" />
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Label Association</h3>
            <p className="text-sm text-muted-foreground">
              Always use Label with matching htmlFor and id attributes.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Invalid State</h3>
            <p className="text-sm text-muted-foreground">
              When invalid=true, the input is marked with aria-invalid="true" for screen readers.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Icons</h3>
            <p className="text-sm text-muted-foreground">
              Icons are decorative and hidden from screen readers. Important 
              information should be in labels or helper text.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { Input } from "@/components/ui/input";
import { Search, Mail, Lock, Eye } from "lucide-react";

// Sizes
<Input inputSize="sm" placeholder="Small" />
<Input inputSize="md" placeholder="Medium (default)" />
<Input inputSize="lg" placeholder="Large" />

// Variants
<Input placeholder="Default (outlined)" />
<Input variant="filled" placeholder="Filled" />

// With icons
<Input leftIcon={<Search />} placeholder="Search..." />
<Input rightIcon={<Eye />} placeholder="Password" type="password" />
<Input 
  leftIcon={<Lock />} 
  rightIcon={<Eye />} 
  placeholder="Both icons" 
/>

// Invalid state
<Input invalid placeholder="Invalid input" />
<p className="text-destructive">Error message</p>

// All props
<Input
  inputSize="md"
  variant="default"
  invalid={false}
  leftIcon={<Search />}
  rightIcon={<Eye />}
  placeholder="Full example"
/>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">inputSize</code>: "sm" | "md" | "lg"</li>
            <li><code className="bg-muted px-1 rounded">variant</code>: "default" | "filled"</li>
            <li><code className="bg-muted px-1 rounded">invalid</code>: boolean</li>
            <li><code className="bg-muted px-1 rounded">leftIcon</code>: ReactNode</li>
            <li><code className="bg-muted px-1 rounded">rightIcon</code>: ReactNode</li>
          </ul>
        </div>
      </Section>

      <TokenReference tokens={inputTokens} className="mt-12" />
    </ComponentPage>
  );
}
