import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, SubComponentProps, type PropDefinition } from "@/docs/components/PropsTable";
import {
  WexInput,
  WexLabel,
  WexTextarea,
  WexCheckbox,
  WexRadioGroup,
  WexSwitch,
  WexSelect,
  WexButton,
} from "@/components/wex";

// Props documentation for WexForm (React Hook Form integration)
const formFieldProps: PropDefinition[] = [
  { name: "control", type: "Control", required: true, description: "React Hook Form control object" },
  { name: "name", type: "string", required: true, description: "Field name in form schema" },
  { name: "render", type: "({ field }) => ReactNode", required: true, description: "Render function for the field" },
];

const formItemProps: PropDefinition[] = [
  { name: "className", type: "string", description: "Additional CSS classes" },
  { name: "children", type: "ReactNode", required: true, description: "Form item content (label, control, message)" },
];

// Token mappings for WexForm
const formTokens: TokenRow[] = [
  { element: "Label", property: "Text", token: "--foreground" },
  { element: "Description", property: "Text", token: "--muted-foreground" },
  { element: "Error Message", property: "Text", token: "--destructive" },
  { element: "Note", property: "", token: "Form items use respective component tokens" },
];

export default function FormPage() {
  return (
    <ComponentPage
      title="Form"
      description="Form components for building accessible, validated forms."
      status="stable"
      registryKey="form"
    >
      <Section
        title="Overview"
        description="Forms collect user input and submit data. All form inputs are designed for accessibility with proper sizing and focus states."
      >
        <ExampleCard>
          <form className="w-full max-w-md space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <WexLabel htmlFor="name">Full Name</WexLabel>
              <WexInput id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <WexLabel htmlFor="email">Email</WexLabel>
              <WexInput id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <WexLabel htmlFor="message">Message</WexLabel>
              <WexTextarea id="message" placeholder="Type your message..." />
            </div>
            <WexButton intent="primary" type="submit">Submit</WexButton>
          </form>
        </ExampleCard>
      </Section>

      <Section
        title="Text Inputs"
        description="Various text input types for different data collection needs."
      >
        <div className="space-y-4">
          <ExampleCard title="Text Input" description="Standard text input for single-line text.">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel htmlFor="text-input">Username</WexLabel>
              <WexInput id="text-input" placeholder="Enter username" />
            </div>
          </ExampleCard>

          <ExampleCard title="Email Input" description="Input with email validation hint.">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel htmlFor="email-input">Email Address</WexLabel>
              <WexInput id="email-input" type="email" placeholder="name@company.com" />
            </div>
          </ExampleCard>

          <ExampleCard title="Password Input" description="Masked input for sensitive data.">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel htmlFor="password-input">Password</WexLabel>
              <WexInput id="password-input" type="password" placeholder="Enter password" />
            </div>
          </ExampleCard>

          <ExampleCard title="Number Input" description="Input for numeric values.">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel htmlFor="number-input">Quantity</WexLabel>
              <WexInput id="number-input" type="number" placeholder="0" min={0} max={100} />
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled Input" description="Non-interactive disabled state.">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel htmlFor="disabled-input">Disabled Field</WexLabel>
              <WexInput id="disabled-input" disabled placeholder="Cannot edit" />
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section
        title="Textarea"
        description="Multi-line text input for longer content."
      >
        <div className="space-y-4">
          <ExampleCard title="Default Textarea">
            <div className="w-full max-w-md space-y-2">
              <WexLabel htmlFor="textarea-default">Description</WexLabel>
              <WexTextarea id="textarea-default" placeholder="Write a detailed description..." />
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled Textarea">
            <div className="w-full max-w-md space-y-2">
              <WexLabel htmlFor="textarea-disabled">Notes (Read Only)</WexLabel>
              <WexTextarea id="textarea-disabled" disabled placeholder="This content cannot be edited" />
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section
        title="Select"
        description="Dropdown for selecting from a list of options."
      >
        <div className="space-y-4">
          <ExampleCard title="Basic Select">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel id="form-country-label">Country</WexLabel>
              <WexSelect>
                <WexSelect.Trigger aria-labelledby="form-country-label">
                  <WexSelect.Value placeholder="Select a country" />
                </WexSelect.Trigger>
                <WexSelect.Content>
                  <WexSelect.Item value="us">United States</WexSelect.Item>
                  <WexSelect.Item value="uk">United Kingdom</WexSelect.Item>
                  <WexSelect.Item value="ca">Canada</WexSelect.Item>
                  <WexSelect.Item value="au">Australia</WexSelect.Item>
                </WexSelect.Content>
              </WexSelect>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled Select">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel id="form-region-label">Region (Locked)</WexLabel>
              <WexSelect disabled>
                <WexSelect.Trigger aria-labelledby="form-region-label">
                  <WexSelect.Value placeholder="Cannot change" />
                </WexSelect.Trigger>
                <WexSelect.Content>
                  <WexSelect.Item value="locked">Locked Option</WexSelect.Item>
                </WexSelect.Content>
              </WexSelect>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section
        title="Checkboxes"
        description="For boolean selections or multiple choice options."
      >
        <div className="space-y-4">
          <ExampleCard title="Single Checkbox">
            <div className="flex items-center space-x-2">
              <WexCheckbox id="terms" />
              <WexLabel htmlFor="terms">I accept the terms and conditions</WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="Checkbox Group" description="Multiple checkboxes for multi-select.">
            <div className="space-y-3">
              <WexLabel className="text-base">Select your interests</WexLabel>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <WexCheckbox id="interest-1" />
                  <WexLabel htmlFor="interest-1">Technology</WexLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <WexCheckbox id="interest-2" />
                  <WexLabel htmlFor="interest-2">Design</WexLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <WexCheckbox id="interest-3" />
                  <WexLabel htmlFor="interest-3">Business</WexLabel>
                </div>
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled Checkbox">
            <div className="flex items-center space-x-2">
              <WexCheckbox id="disabled-check" disabled />
              <WexLabel htmlFor="disabled-check" className="text-muted-foreground">This option is unavailable</WexLabel>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section
        title="Radio Groups"
        description="For mutually exclusive single-selection options."
      >
        <div className="space-y-4">
          <ExampleCard title="Basic Radio Group">
            <WexRadioGroup defaultValue="option-1">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <WexRadioGroup.Item value="option-1" id="r1" />
                  <WexLabel htmlFor="r1">Standard Shipping (5-7 days)</WexLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <WexRadioGroup.Item value="option-2" id="r2" />
                  <WexLabel htmlFor="r2">Express Shipping (2-3 days)</WexLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <WexRadioGroup.Item value="option-3" id="r3" />
                  <WexLabel htmlFor="r3">Overnight Shipping (1 day)</WexLabel>
                </div>
              </div>
            </WexRadioGroup>
          </ExampleCard>
        </div>
      </Section>

      <Section
        title="Switch"
        description="Toggle between two states, typically on/off."
      >
        <div className="space-y-4">
          <ExampleCard title="Basic Switch">
            <div className="flex items-center space-x-2">
              <WexSwitch id="notifications" />
              <WexLabel htmlFor="notifications">Enable notifications</WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="Switch with Default On">
            <div className="flex items-center space-x-2">
              <WexSwitch id="marketing" defaultChecked />
              <WexLabel htmlFor="marketing">Receive marketing emails</WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled Switch">
            <div className="flex items-center space-x-2">
              <WexSwitch id="locked-switch" disabled />
              <WexLabel htmlFor="locked-switch" className="text-muted-foreground">Feature unavailable</WexLabel>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section
        title="Complete Form Example"
        description="A realistic form combining multiple input types."
      >
        <ExampleCard>
          <form className="w-full max-w-lg space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <WexLabel htmlFor="first-name">First Name</WexLabel>
                <WexInput id="first-name" placeholder="John" />
              </div>
              <div className="space-y-2">
                <WexLabel htmlFor="last-name">Last Name</WexLabel>
                <WexInput id="last-name" placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <WexLabel htmlFor="form-email">Email</WexLabel>
              <WexInput id="form-email" type="email" placeholder="john@company.com" />
            </div>

            <div className="space-y-2">
              <WexLabel id="account-type-label">Account Type</WexLabel>
              <WexSelect>
                <WexSelect.Trigger aria-labelledby="account-type-label">
                  <WexSelect.Value placeholder="Choose account type" />
                </WexSelect.Trigger>
                <WexSelect.Content>
                  <WexSelect.Item value="personal">Personal</WexSelect.Item>
                  <WexSelect.Item value="business">Business</WexSelect.Item>
                  <WexSelect.Item value="enterprise">Enterprise</WexSelect.Item>
                </WexSelect.Content>
              </WexSelect>
            </div>

            <div className="space-y-2">
              <WexLabel htmlFor="bio">Bio</WexLabel>
              <WexTextarea id="bio" placeholder="Tell us about yourself..." />
            </div>

            <div className="flex items-center space-x-2">
              <WexCheckbox id="form-terms" />
              <WexLabel htmlFor="form-terms">I agree to the terms of service</WexLabel>
            </div>

            <div className="flex gap-3">
              <WexButton intent="primary" type="submit">Create Account</WexButton>
              <WexButton intent="secondary" type="button">Cancel</WexButton>
            </div>
          </form>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Label Association</h3>
            <p className="text-sm text-muted-foreground">
              All form inputs must be associated with labels using matching{" "}
              <code className="bg-muted px-1 rounded">htmlFor</code> and{" "}
              <code className="bg-muted px-1 rounded">id</code> attributes.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Input Height</h3>
            <p className="text-sm text-muted-foreground">
              All inputs are 44px (h-11) to meet WCAG touch target requirements.
              This ensures usability on touch devices.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Focus Visibility</h3>
            <p className="text-sm text-muted-foreground">
              All inputs display a visible focus ring when navigated via keyboard,
              ensuring keyboard users can track their position.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage with React Hook Form">
        <Guidance>
          For complex forms with validation, use the WexForm components with React Hook Form
          and Zod schema validation.
        </Guidance>
        <CodeBlock
          code={`import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { WexForm, WexInput, WexButton } from "@/components/wex";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", name: "" },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <WexForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <WexForm.Field
          control={form.control}
          name="name"
          render={({ field }) => (
            <WexForm.Item>
              <WexForm.Label>Name</WexForm.Label>
              <WexForm.Control>
                <WexInput placeholder="Your name" {...field} />
              </WexForm.Control>
              <WexForm.Message />
            </WexForm.Item>
          )}
        />
        <WexButton type="submit">Submit</WexButton>
      </form>
    </WexForm>
  );
}`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={formFieldProps} title="WexForm.Field" />
        <SubComponentProps name="WexForm.Item" props={formItemProps} />
      </Section>

      <TokenReference tokens={formTokens} className="mt-12" />
    </ComponentPage>
  );
}
