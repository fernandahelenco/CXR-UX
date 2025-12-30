import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexDatePicker } from "@/components/wex";

// Props documentation for WexDatePicker
const datePickerProps: PropDefinition[] = [
  { name: "date", type: "Date | undefined", description: "Controlled selected date" },
  { name: "onDateChange", type: "(date: Date | undefined) => void", description: "Callback when date changes" },
  { name: "placeholder", type: "string", default: '"Pick a date"', description: "Placeholder text when no date selected" },
  { name: "fromDate", type: "Date", description: "Minimum selectable date" },
  { name: "toDate", type: "Date", description: "Maximum selectable date" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the date picker" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

// Token mappings for WexDatePicker
const datePickerTokens: TokenRow[] = [
  { element: "Trigger", property: "Border", token: "--input" },
  { element: "Trigger", property: "Background", token: "--background" },
  { element: "Trigger (hover)", property: "Background", token: "--accent" },
  { element: "Trigger (focus)", property: "Ring", token: "--ring" },
  { element: "Popover", property: "Background", token: "--popover" },
  { element: "Popover", property: "Border", token: "--border" },
  { element: "Calendar", property: "Background", token: "--background" },
  { element: "Day (selected)", property: "Background", token: "--primary" },
  { element: "Day (selected)", property: "Text", token: "--primary-foreground" },
  { element: "Day (today)", property: "Background", token: "--accent" },
];

export default function DatePickerPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [date2, setDate2] = React.useState<Date | undefined>();
  const [date3, setDate3] = React.useState<Date | undefined>();

  return (
    <ComponentPage
      title="Date Picker"
      description="Date selection input combining Calendar with Popover for picking dates."
      status="stable"
      registryKey="date-picker"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexDatePicker
            date={date}
            onDateChange={setDate}
            placeholder="Pick a date"
          />
        </ExampleCard>
        <Guidance>
          Date Picker provides a convenient way to select dates. It combines the Calendar
          component with a Popover trigger, allowing users to pick dates from a calendar
          interface or enter them manually (with WithInput variant).
        </Guidance>
      </Section>

      <Section title="Variants" description="Different date picker configurations.">
        <div className="space-y-8">
          <ExampleCard title="Basic" description="Simple date picker with button trigger.">
            <WexDatePicker
              date={date2}
              onDateChange={setDate2}
              placeholder="Pick a date"
            />
          </ExampleCard>

          <ExampleCard title="With Input Field" description="Date picker with input field for manual entry.">
            <WexDatePicker.WithInput
              date={date3}
              onDateChange={setDate3}
              placeholder="Enter or pick a date"
            />
          </ExampleCard>

          <ExampleCard title="With Date Range" description="Date picker with min/max date constraints.">
            <WexDatePicker
              date={date}
              onDateChange={setDate}
              placeholder="Pick a date"
              fromDate={new Date(2020, 0, 1)}
              toDate={new Date(2030, 11, 31)}
            />
          </ExampleCard>

          <ExampleCard title="Disabled" description="Date picker in disabled state.">
            <WexDatePicker
              date={new Date()}
              disabled
              placeholder="Pick a date"
            />
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Keyboard Navigation</h3>
          <p className="text-sm text-muted-foreground">
            Date Picker supports full keyboard navigation. Use Arrow keys to navigate the
            calendar, Enter to select a date, Escape to close, and Tab to navigate between
            elements.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 mt-4">
          <h3 className="font-medium mb-2">Screen Reader Support</h3>
          <p className="text-sm text-muted-foreground">
            The calendar uses proper ARIA labels and roles. Selected dates are announced,
            and navigation between months is accessible.
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexDatePicker } from "@/components/wex";

const [date, setDate] = React.useState<Date | undefined>();

// Basic date picker
<WexDatePicker
  date={date}
  onDateChange={setDate}
  placeholder="Pick a date"
/>

// With input field
<WexDatePicker.WithInput
  date={date}
  onDateChange={setDate}
  placeholder="Enter or pick a date"
/>

// With date range constraints
<WexDatePicker
  date={date}
  onDateChange={setDate}
  placeholder="Pick a date"
  fromDate={new Date(2020, 0, 1)}
  toDate={new Date(2030, 11, 31)}
/>`}
          language="tsx"
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={datePickerProps} />
      </Section>

      <TokenReference tokens={datePickerTokens} className="mt-12" />
    </ComponentPage>
  );
}

