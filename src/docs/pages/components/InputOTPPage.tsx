import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, SubComponentProps, type PropDefinition } from "@/docs/components/PropsTable";
import { WexInputOTP } from "@/components/wex";

// Props documentation for WexInputOTP
const inputOTPProps: PropDefinition[] = [
  { name: "maxLength", type: "number", required: true, description: "Number of OTP digits" },
  { name: "value", type: "string", description: "Controlled value" },
  { name: "onChange", type: "(value: string) => void", description: "Callback when value changes" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the input" },
  { name: "aria-labelledby", type: "string", description: "ID of element that labels this input" },
];

const inputOTPSlotProps: PropDefinition[] = [
  { name: "index", type: "number", required: true, description: "Zero-based index of this slot" },
];

// Token mappings for WexInputOTP
// Layer 3 component tokens
const inputOTPTokens: TokenRow[] = [
  { element: "Slot", property: "Background", token: "--wex-component-inputotp-bg" },
  { element: "Slot", property: "Border", token: "--wex-component-inputotp-border" },
  { element: "Slot (Active)", property: "Focus Ring", token: "--wex-component-inputotp-focus-ring" },
  { element: "Caret", property: "Color", token: "--wex-component-inputotp-caret" },
  { element: "Disabled", property: "Opacity", token: "--wex-component-inputotp-disabled-opacity" },
];

export default function InputOTPPage() {
  return (
    <ComponentPage
      title="Input OTP"
      description="Accessible one-time password input component."
      status="stable"
      registryKey="input-otp"
    >
      <Section title="Overview">
        <ExampleCard title="Verification Code">
          <div className="space-y-2">
            <label id="otp-label" className="text-sm font-medium text-foreground">
              Enter verification code
            </label>
            <WexInputOTP maxLength={6} aria-labelledby="otp-label">
              <WexInputOTP.Group>
                <WexInputOTP.Slot index={0} />
                <WexInputOTP.Slot index={1} />
                <WexInputOTP.Slot index={2} />
                <WexInputOTP.Slot index={3} />
                <WexInputOTP.Slot index={4} />
                <WexInputOTP.Slot index={5} />
              </WexInputOTP.Group>
            </WexInputOTP>
          </div>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Keyboard Support</h3>
          <p className="text-sm text-muted-foreground">
            Supports keyboard navigation, paste from clipboard, and automatic
            focus advancement.
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexInputOTP } from "@/components/wex";

<WexInputOTP maxLength={6}>
  <WexInputOTP.Group>
    <WexInputOTP.Slot index={0} />
    <WexInputOTP.Slot index={1} />
    <WexInputOTP.Slot index={2} />
    <WexInputOTP.Slot index={3} />
    <WexInputOTP.Slot index={4} />
    <WexInputOTP.Slot index={5} />
  </WexInputOTP.Group>
</WexInputOTP>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={inputOTPProps} title="WexInputOTP" />
        <SubComponentProps name="WexInputOTP.Slot" props={inputOTPSlotProps} />
      </Section>

      <TokenReference tokens={inputOTPTokens} className="mt-12" />
    </ComponentPage>
  );
}

