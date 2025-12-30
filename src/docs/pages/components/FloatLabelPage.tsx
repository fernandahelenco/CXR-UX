import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { Guidance } from "@/docs/components/ProseBlock";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexFloatLabel } from "@/components/wex";
import { Mail, Lock, Search, User, Eye, EyeOff } from "lucide-react";

// Props documentation for WexFloatLabel
const floatLabelProps: PropDefinition[] = [
  { name: "label", type: "string", required: true, description: "Label text that floats" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Input size variant" },
  { name: "type", type: "string", default: '"text"', description: "HTML input type (email, password, etc.)" },
  { name: "leftIcon", type: "ReactNode", description: "Icon displayed on the left" },
  { name: "rightIcon", type: "ReactNode", description: "Icon displayed on the right" },
  { name: "invalid", type: "boolean", default: "false", description: "Marks input as invalid" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the input" },
  { name: "containerClassName", type: "string", description: "Additional CSS classes for the container" },
  { name: "value", type: "string", description: "Controlled value" },
  { name: "onChange", type: "ChangeEventHandler", description: "Callback when value changes" },
];

// Token mappings for FloatLabel - Layer 3 component tokens
const floatLabelTokens: TokenRow[] = [
  { element: "Label", property: "Text (Default)", token: "--wex-component-floatlabel-label-fg" },
  { element: "Label", property: "Text (Focused)", token: "--wex-component-floatlabel-label-focus-fg" },
  { element: "Label", property: "Text (Filled)", token: "--wex-component-floatlabel-label-filled-fg" },
  { element: "Input", property: "Background", token: "--wex-component-input-bg" },
  { element: "Input", property: "Border", token: "--wex-component-input-border" },
  { element: "Input", property: "Border (Focus)", token: "--wex-component-input-border-focus" },
  { element: "Focus Ring", property: "Color", token: "--wex-component-input-focus-ring" },
];

export default function FloatLabelPage() {
  return (
    <ComponentPage
      title="Float Label"
      description="Input with a floating label that animates from inside the field to above it on focus or when containing a value."
      status="stable"
      registryKey="float-label"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="w-full max-w-sm">
            <WexFloatLabel label="Username" />
          </div>
        </ExampleCard>
        <Guidance>
          FloatLabel provides a Material Design / PrimeNG-style floating label input.
          The label appears centered inside the input when empty, then animates to float
          above when the user focuses or enters text.
        </Guidance>
      </Section>

      {/* ============================================================
          SIZES
          ============================================================ */}
      <Section title="Sizes" description="Three sizes for different contexts.">
        <ExampleCard title="All Sizes">
          <div className="w-full max-w-sm space-y-6">
            <WexFloatLabel label="Small" size="sm" />
            <WexFloatLabel label="Medium (Default)" size="md" />
            <WexFloatLabel label="Large" size="lg" />
          </div>
        </ExampleCard>
        <CodeBlock language="tsx" code={`<WexFloatLabel label="Small" size="sm" />
<WexFloatLabel label="Medium (Default)" size="md" />
<WexFloatLabel label="Large" size="lg" />`} />
      </Section>

      {/* ============================================================
          INPUT TYPES
          ============================================================ */}
      <Section title="Input Types" description="Works with various HTML input types.">
        <ExampleCard title="Email">
          <WexFloatLabel label="Email Address" type="email" className="max-w-sm" />
        </ExampleCard>

        <ExampleCard title="Password">
          <WexFloatLabel label="Password" type="password" className="max-w-sm" />
        </ExampleCard>

        <ExampleCard title="Number">
          <WexFloatLabel label="Amount" type="number" className="max-w-sm" />
        </ExampleCard>

        <CodeBlock language="tsx" code={`<WexFloatLabel label="Email Address" type="email" />
<WexFloatLabel label="Password" type="password" />
<WexFloatLabel label="Amount" type="number" />`} />
      </Section>

      {/* ============================================================
          ICONS
          ============================================================ */}
      <Section title="With Icons" description="Left and right icons for visual context.">
        <ExampleCard title="Left Icon">
          <WexFloatLabel 
            label="Email Address" 
            type="email" 
            leftIcon={<Mail className="h-4 w-4" />} 
            containerClassName="max-w-sm" 
          />
        </ExampleCard>

        <ExampleCard title="Right Icon">
          <WexFloatLabel 
            label="Search" 
            rightIcon={<Search className="h-4 w-4" />} 
            containerClassName="max-w-sm" 
          />
        </ExampleCard>

        <ExampleCard title="Both Icons">
          <WexFloatLabel 
            label="Username" 
            leftIcon={<User className="h-4 w-4" />}
            rightIcon={<Search className="h-4 w-4" />}
            containerClassName="max-w-sm" 
          />
        </ExampleCard>

        <PasswordWithToggle />

        <CodeBlock language="tsx" code={`import { Mail, Lock, Eye, EyeOff } from "lucide-react";

// Left icon
<WexFloatLabel 
  label="Email Address" 
  type="email" 
  leftIcon={<Mail className="h-4 w-4" />} 
/>

// Both icons (password with toggle)
const [show, setShow] = useState(false);
<WexFloatLabel 
  label="Password" 
  type={show ? "text" : "password"} 
  leftIcon={<Lock className="h-4 w-4" />}
  rightIcon={
    <button onClick={() => setShow(!show)}>
      {show ? <EyeOff /> : <Eye />}
    </button>
  }
/>`} />
      </Section>

      {/* ============================================================
          VALIDATION
          ============================================================ */}
      <Section title="Validation" description="Invalid state for form validation.">
        <ExampleCard title="Invalid State">
          <div className="w-full max-w-sm space-y-6">
            <WexFloatLabel label="Email" type="email" invalid />
            <WexFloatLabel label="Username" invalid defaultValue="x" />
          </div>
        </ExampleCard>
        <CodeBlock language="tsx" code={`<WexFloatLabel label="Email" type="email" invalid />
<WexFloatLabel label="Username" invalid defaultValue="x" />`} />
      </Section>

      {/* ============================================================
          DISABLED
          ============================================================ */}
      <Section title="Disabled" description="Disabled state for non-interactive inputs.">
        <ExampleCard title="Disabled">
          <div className="w-full max-w-sm space-y-6">
            <WexFloatLabel label="Disabled Empty" disabled />
            <WexFloatLabel label="Disabled With Value" disabled defaultValue="Readonly value" />
          </div>
        </ExampleCard>
        <CodeBlock language="tsx" code={`<WexFloatLabel label="Disabled Empty" disabled />
<WexFloatLabel label="Disabled With Value" disabled defaultValue="Readonly value" />`} />
      </Section>

      {/* ============================================================
          CONTROLLED
          ============================================================ */}
      <Section title="Controlled" description="Works as a controlled component.">
        <ControlledExample />
        <CodeBlock language="tsx" code={`const [value, setValue] = React.useState("");

<WexFloatLabel
  label="Controlled Input"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`} />
      </Section>

      {/* ============================================================
          API REFERENCE
          ============================================================ */}
      <Section title="API Reference">
        <PropsTable props={floatLabelProps} />
      </Section>

      {/* ============================================================
          TOKENS
          ============================================================ */}
      <Section title="Token Reference">
        <TokenReference tokens={floatLabelTokens} />
      </Section>

      {/* ============================================================
          USAGE NOTES
          ============================================================ */}
      <Section title="Usage Notes">
        <Guidance>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>Accessibility:</strong> The label is properly associated with the input
              via htmlFor/id attributes. Screen readers will announce the label.
            </li>
            <li>
              <strong>Placeholder:</strong> The component uses an invisible placeholder (" ")
              internally to enable CSS-only state detection. Don't pass a placeholder prop.
            </li>
            <li>
              <strong>PrimeNG Variant:</strong> This implements the "in" variant where the
              label starts inside the input field.
            </li>
          </ul>
        </Guidance>
      </Section>
    </ComponentPage>
  );
}

// Controlled example component
function ControlledExample() {
  const [value, setValue] = React.useState("");

  return (
    <ExampleCard title="Controlled">
      <div className="w-full max-w-sm space-y-4">
        <WexFloatLabel
          label="Type something..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          Current value: {value ? `"${value}"` : "(empty)"}
        </p>
      </div>
    </ExampleCard>
  );
}

// Password with toggle visibility example
function PasswordWithToggle() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <ExampleCard title="Password with Toggle">
      <WexFloatLabel
        label="Password"
        type={showPassword ? "text" : "password"}
        leftIcon={<Lock className="h-4 w-4" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer hover:text-foreground transition-colors pointer-events-auto"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        containerClassName="max-w-sm"
      />
    </ExampleCard>
  );
}
