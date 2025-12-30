import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexCalendar } from "@/components/wex";
import type { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

// Props documentation for WexCalendar
const calendarProps: PropDefinition[] = [
  { name: "mode", type: '"single" | "multiple" | "range"', default: '"single"', description: "Selection mode" },
  { name: "selected", type: "Date | Date[] | DateRange", description: "Controlled selected date(s)" },
  { name: "onSelect", type: "(date) => void", description: "Callback when selection changes" },
  { name: "defaultMonth", type: "Date", description: "Month to display initially" },
  { name: "numberOfMonths", type: "number", default: "1", description: "Number of months to display" },
  { name: "disabled", type: "Matcher | Matcher[]", description: "Dates to disable (function or date range)" },
  { name: "footer", type: "ReactNode", description: "Content to display below the calendar" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

// Token mappings for WexCalendar
const calendarTokens: TokenRow[] = [
  { element: "Container", property: "Background", token: "--background" },
  { element: "Day", property: "Text", token: "--foreground" },
  { element: "Day (hover)", property: "Background", token: "--accent" },
  { element: "Day (selected)", property: "Background", token: "--primary" },
  { element: "Day (selected)", property: "Text", token: "--primary-foreground" },
  { element: "Day (outside)", property: "Text", token: "--muted-foreground" },
  { element: "Day (disabled)", property: "Opacity", token: "50%" },
  { element: "Navigation", property: "Color", token: "--muted-foreground" },
];

export default function CalendarPage() {
  const [singleDate, setSingleDate] = React.useState<Date | undefined>(new Date());
  const [multipleDates, setMultipleDates] = React.useState<Date[] | undefined>([
    new Date(),
    addDays(new Date(), 2),
  ]);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <ComponentPage
      title="Calendar"
      description="A date picker component with single, multiple, and range selection modes."
      status="stable"
      registryKey="calendar"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexCalendar
            mode="single"
            selected={singleDate}
            onSelect={setSingleDate}
            className="rounded-md border"
          />
        </ExampleCard>
      </Section>

      <Section title="Selection Modes" description="Calendar supports different selection modes.">
        <div className="space-y-6">
          <ExampleCard title="Single Date" description="Select a single date.">
            <div className="space-y-2">
              <WexCalendar
                mode="single"
                selected={singleDate}
                onSelect={setSingleDate}
                className="rounded-md border"
              />
              <p className="text-sm text-muted-foreground">
                Selected: {singleDate?.toLocaleDateString() || "None"}
              </p>
            </div>
          </ExampleCard>

          <ExampleCard title="Multiple Dates" description="Select multiple individual dates.">
            <div className="space-y-2">
              <WexCalendar
                mode="multiple"
                selected={multipleDates}
                onSelect={setMultipleDates}
                className="rounded-md border"
              />
              <p className="text-sm text-muted-foreground">
                Selected: {multipleDates?.length || 0} date(s)
              </p>
            </div>
          </ExampleCard>

          <ExampleCard title="Date Range" description="Select a range of dates.">
            <div className="space-y-2">
              <WexCalendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className="rounded-md border"
              />
              <p className="text-sm text-muted-foreground">
                Range: {dateRange?.from?.toLocaleDateString() || "Start"} - {dateRange?.to?.toLocaleDateString() || "End"}
              </p>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Variants" description="Different calendar configurations.">
        <div className="space-y-6">
          <ExampleCard title="With Default Month" description="Start on a specific month.">
            <WexCalendar
              mode="single"
              defaultMonth={new Date(2024, 0)}
              className="rounded-md border"
            />
          </ExampleCard>

          <ExampleCard title="Disabled Dates" description="Prevent selection of certain dates.">
            <WexCalendar
              mode="single"
              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
              className="rounded-md border"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Past dates and weekends are disabled.
            </p>
          </ExampleCard>

          <ExampleCard title="Two Months" description="Display multiple months.">
            <WexCalendar
              mode="single"
              numberOfMonths={2}
              className="rounded-md border"
            />
          </ExampleCard>

          <ExampleCard title="With Footer" description="Add context below the calendar.">
            <WexCalendar
              mode="single"
              selected={singleDate}
              onSelect={setSingleDate}
              className="rounded-md border"
              footer={
                <p className="text-sm text-muted-foreground pt-3 border-t mt-3">
                  {singleDate ? `Selected: ${singleDate.toDateString()}` : "Pick a date"}
                </p>
              }
            />
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Arrow keys: Navigate between dates</li>
              <li>Enter/Space: Select the focused date</li>
              <li>Page Up: Previous month</li>
              <li>Page Down: Next month</li>
              <li>Shift + Page Up: Previous year</li>
              <li>Shift + Page Down: Next year</li>
              <li>Home: First day of month</li>
              <li>End: Last day of month</li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Screen Reader Support</h3>
            <p className="text-sm text-muted-foreground">
              Calendar uses ARIA labels and live regions to announce date changes
              and selection status to screen reader users.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexCalendar } from "@/components/wex";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

// Single date selection
const [date, setDate] = useState<Date | undefined>(new Date());
<WexCalendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>

// Multiple dates selection
const [dates, setDates] = useState<Date[] | undefined>([]);
<WexCalendar
  mode="multiple"
  selected={dates}
  onSelect={setDates}
/>

// Date range selection
const [range, setRange] = useState<DateRange | undefined>();
<WexCalendar
  mode="range"
  selected={range}
  onSelect={setRange}
  numberOfMonths={2}
/>

// With disabled dates
<WexCalendar
  mode="single"
  disabled={(date) => date < new Date()}
/>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={calendarProps} />
      </Section>

      <TokenReference tokens={calendarTokens} className="mt-12" />
    </ComponentPage>
  );
}
