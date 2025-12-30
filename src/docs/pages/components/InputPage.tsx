import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { Guidance } from "@/docs/components/ProseBlock";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexInput, WexLabel } from "@/components/wex";
import { Search, Mail, Eye, EyeOff, Lock, Calendar, Phone } from "lucide-react";

// Props documentation for WexInput
const inputProps: PropDefinition[] = [
  { name: "inputSize", type: '"sm" | "md" | "lg"', default: '"md"', description: "Input size variant" },
  { name: "variant", type: '"default" | "filled"', default: '"default"', description: "Visual style variant" },
  { name: "invalid", type: "boolean", default: "false", description: "Marks input as invalid with visual styling" },
  { name: "leftIcon", type: "ReactNode", description: "Icon displayed on the left side of the input" },
  { name: "rightIcon", type: "ReactNode", description: "Icon displayed on the right side of the input" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the input" },
  { name: "readOnly", type: "boolean", default: "false", description: "Makes the input read-only" },
  { name: "className", type: "string", description: "Additional CSS classes to apply" },
];

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

// Interactive password input component for documentation
function PasswordInputDemo({ withLeftIcon = false }: { withLeftIcon?: boolean }) {
  const [showPassword, setShowPassword] = React.useState(false);
  
  return (
    <WexInput 
      leftIcon={withLeftIcon ? <Lock className="h-4 w-4" /> : undefined}
      rightIcon={
        <button 
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="cursor-pointer hover:text-foreground transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
      placeholder="Enter password" 
      type={showPassword ? "text" : "password"}
      className="max-w-sm"
    />
  );
}

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
            <WexInput id="demo-input" type="email" placeholder="you@example.com" />
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
              <WexInput inputSize="sm" placeholder="Small input" />
            </div>
            <div className="space-y-2">
              <WexLabel>Medium (Default)</WexLabel>
              <WexInput inputSize="md" placeholder="Medium input" />
            </div>
            <div className="space-y-2">
              <WexLabel>Large</WexLabel>
              <WexInput inputSize="lg" placeholder="Large input" />
            </div>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          VARIANTS
          ============================================================ */}
      <Section title="Variants" description="Default outlined and filled styles.">
        <ExampleCard title="Default (Outlined)">
          <WexInput placeholder="Outlined input" className="max-w-sm" />
        </ExampleCard>

        <ExampleCard title="Filled">
          <WexInput variant="filled" placeholder="Filled input" className="max-w-sm" />
        </ExampleCard>
      </Section>

      {/* ============================================================
          WITH ICONS
          ============================================================ */}
      <Section title="With Icons" description="Icons for visual context and affordance.">
        <ExampleCard title="Left Icon">
          <div className="max-w-sm space-y-4">
            <WexInput 
              leftIcon={<Search className="h-4 w-4" />} 
              placeholder="Search..." 
            />
            <WexInput 
              leftIcon={<Mail className="h-4 w-4" />} 
              placeholder="Email address" 
              type="email"
            />
            <WexInput 
              leftIcon={<Phone className="h-4 w-4" />} 
              placeholder="Phone number" 
              type="tel"
            />
          </div>
        </ExampleCard>

        <ExampleCard title="Right Icon (Interactive)">
          <div className="max-w-sm space-y-4">
            <WexInput 
              rightIcon={<Calendar className="h-4 w-4" />} 
              placeholder="Select date" 
            />
            <div className="space-y-2">
              <WexLabel>Password (click eye to toggle)</WexLabel>
              <PasswordInputDemo />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Both Icons (Interactive Password)">
          <div className="space-y-2">
            <WexLabel>Secure Password</WexLabel>
            <PasswordInputDemo withLeftIcon />
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          INVALID STATE
          ============================================================ */}
      <Section title="Invalid State" description="Visual feedback for validation errors.">
        <ExampleCard title="Invalid Input">
          <div className="w-full max-w-sm space-y-2">
            <WexLabel htmlFor="invalid-input">Email</WexLabel>
            <WexInput 
              id="invalid-input" 
              invalid 
              defaultValue="invalid-email" 
              type="email"
            />
            <p className="text-sm text-wex-field-error-fg">
              Please enter a valid email address.
            </p>
          </div>
        </ExampleCard>

        <ExampleCard title="Invalid with Icon">
          <div className="w-full max-w-sm space-y-2">
            <WexLabel htmlFor="invalid-icon-input">Password</WexLabel>
            <WexInput 
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
            <WexInput type="text" placeholder="Full name" />
          </ExampleCard>
          <ExampleCard title="Email">
            <WexInput type="email" placeholder="email@example.com" />
          </ExampleCard>
          <ExampleCard title="Password">
            <WexInput type="password" placeholder="Enter password" />
          </ExampleCard>
          <ExampleCard title="Number">
            <WexInput type="number" placeholder="0" min={0} max={100} />
          </ExampleCard>
          <ExampleCard title="Search">
            <WexInput type="search" placeholder="Search..." />
          </ExampleCard>
          <ExampleCard title="URL">
            <WexInput type="url" placeholder="https://example.com" />
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          STATES
          ============================================================ */}
      <Section title="States" description="Interactive and visual states.">
        <div className="space-y-4 max-w-sm">
          <ExampleCard title="Default">
            <WexInput placeholder="Default input" />
          </ExampleCard>
          <ExampleCard title="Disabled">
            <WexInput disabled placeholder="Disabled input" />
          </ExampleCard>
          <ExampleCard title="Read Only">
            <WexInput readOnly defaultValue="Read-only value" aria-label="Read only input" />
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
            <h3 className="font-medium mb-2">Password Toggle</h3>
            <p className="text-sm text-muted-foreground">
              Interactive password toggles include proper aria-label for accessibility.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexInput } from "@/components/wex";
import { Search, Mail, Lock, Eye, EyeOff } from "lucide-react";

// Sizes
<WexInput inputSize="sm" placeholder="Small" />
<WexInput inputSize="md" placeholder="Medium (default)" />
<WexInput inputSize="lg" placeholder="Large" />

// Variants
<WexInput placeholder="Default (outlined)" />
<WexInput variant="filled" placeholder="Filled" />

// With icons
<WexInput leftIcon={<Search />} placeholder="Search..." />
<WexInput rightIcon={<Eye />} placeholder="Password" type="password" />
<WexInput 
  leftIcon={<Lock />} 
  rightIcon={<Eye />} 
  placeholder="Both icons" 
/>

// Interactive password toggle
const [showPassword, setShowPassword] = useState(false);
<WexInput
  type={showPassword ? "text" : "password"}
  rightIcon={
    <button onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? <EyeOff /> : <Eye />}
    </button>
  }
  placeholder="Password"
/>

// Invalid state
<WexInput invalid placeholder="Invalid input" />
<p className="text-destructive">Error message</p>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={inputProps} />
      </Section>

      <Section title="Related Components">
        <Guidance>
          Need the label to float from inside the field to above it when focused? Use{" "}
          <a href="/components/float-label" className="text-link hover:text-link-hover underline">
            Float Label
          </a>{" "}
          for the PrimeNG-style floating variant built on top of this input.
        </Guidance>
      </Section>

      <TokenReference tokens={inputTokens} className="mt-12" />
    </ComponentPage>
  );
}
