import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexCombobox, type ComboboxOption } from "@/components/wex";

// Props documentation for WexCombobox
const comboboxProps: PropDefinition[] = [
  { name: "options", type: "ComboboxOption[]", required: true, description: "Array of options { value, label }" },
  { name: "value", type: "string", description: "Controlled selected value" },
  { name: "onValueChange", type: "(value: string) => void", description: "Callback when selection changes" },
  { name: "placeholder", type: "string", default: '"Select..."', description: "Placeholder text when no option selected" },
  { name: "searchPlaceholder", type: "string", default: '"Search..."', description: "Placeholder for the search input" },
  { name: "emptyText", type: "string", default: '"No results found."', description: "Text shown when no options match search" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the combobox" },
  { name: "className", type: "string", description: "Additional CSS classes" },
];

// Token mappings for WexCombobox
const comboboxTokens: TokenRow[] = [
  { element: "Trigger", property: "Border", token: "--input" },
  { element: "Trigger", property: "Background", token: "--background" },
  { element: "Trigger (hover)", property: "Background", token: "--accent" },
  { element: "Trigger (focus)", property: "Ring", token: "--ring" },
  { element: "Popover", property: "Background", token: "--popover" },
  { element: "Popover", property: "Border", token: "--border" },
  { element: "Input", property: "Text", token: "--foreground" },
  { element: "Input", property: "Placeholder", token: "--muted-foreground" },
  { element: "Item (selected)", property: "Background", token: "--accent" },
  { element: "Item (hover)", property: "Background", token: "--accent" },
];

const frameworks: ComboboxOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "next", label: "Next.js" },
  { value: "nuxt", label: "Nuxt" },
];

const countries: ComboboxOption[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

export default function ComboboxPage() {
  const [framework, setFramework] = React.useState<string>("");
  const [country, setCountry] = React.useState<string>("");

  return (
    <ComponentPage
      title="Combobox"
      description="Autocomplete input combining Command search with Popover dropdown for selecting from a list of options."
      status="stable"
      registryKey="combobox"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexCombobox
            options={frameworks}
            value={framework}
            onValueChange={setFramework}
            placeholder="Select a framework..."
            searchPlaceholder="Search frameworks..."
          />
        </ExampleCard>
        <Guidance>
          Combobox provides an autocomplete input that allows users to search and select
          from a list of options. It combines the Command component for search functionality
          with Popover for the dropdown display.
        </Guidance>
      </Section>

      <Section title="Variants" description="Different combobox configurations.">
        <div className="space-y-8">
          <ExampleCard title="Basic" description="Simple combobox with options.">
            <WexCombobox
              options={frameworks}
              value={framework}
              onValueChange={setFramework}
              placeholder="Select a framework..."
            />
          </ExampleCard>

          <ExampleCard title="With Custom Placeholders" description="Custom search and select placeholders.">
            <WexCombobox
              options={countries}
              value={country}
              onValueChange={setCountry}
              placeholder="Choose a country..."
              searchPlaceholder="Type to search countries..."
              emptyText="No countries found."
            />
          </ExampleCard>

          <ExampleCard title="Disabled" description="Combobox in disabled state.">
            <WexCombobox
              options={frameworks}
              value="react"
              disabled
              placeholder="Select a framework..."
            />
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Keyboard Navigation</h3>
          <p className="text-sm text-muted-foreground">
            Combobox supports full keyboard navigation. Use Arrow keys to navigate options,
            Enter to select, Escape to close, and type to search.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 mt-4">
          <h3 className="font-medium mb-2">ARIA Attributes</h3>
          <p className="text-sm text-muted-foreground">
            The combobox trigger has role="combobox" and aria-expanded attributes for
            screen reader compatibility.
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexCombobox, type ComboboxOption } from "@/components/wex";

const options: ComboboxOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];

const [value, setValue] = React.useState<string>("");

<WexCombobox
  options={options}
  value={value}
  onValueChange={setValue}
  placeholder="Select a framework..."
  searchPlaceholder="Search frameworks..."
  emptyText="No option found."
/>`}
          language="tsx"
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={comboboxProps} />
      </Section>

      <TokenReference tokens={comboboxTokens} className="mt-12" />
    </ComponentPage>
  );
}

