import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexSlider, WexLabel } from "@/components/wex";

// Props documentation for WexSlider
const sliderProps: PropDefinition[] = [
  { name: "value", type: "number[]", description: "Controlled value(s) - array for range" },
  { name: "defaultValue", type: "number[]", description: "Default value(s) for uncontrolled usage" },
  { name: "onValueChange", type: "(value: number[]) => void", description: "Callback when value changes" },
  { name: "min", type: "number", default: "0", description: "Minimum value" },
  { name: "max", type: "number", default: "100", description: "Maximum value" },
  { name: "step", type: "number", default: "1", description: "Step increment" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the slider" },
  { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Slider orientation" },
];

// Token mappings for Slider
// Layer 3 component tokens
const sliderTokens: TokenRow[] = [
  { element: "Track", property: "Background", token: "--wex-component-slider-track-bg" },
  { element: "Range", property: "Background", token: "--wex-component-slider-range-bg" },
  { element: "Thumb", property: "Background", token: "--wex-component-slider-thumb-bg" },
  { element: "Thumb", property: "Border", token: "--wex-component-slider-thumb-border" },
  { element: "Focus Ring", property: "Color", token: "--wex-component-slider-focus-ring" },
  { element: "Disabled", property: "Opacity", token: "--wex-component-slider-disabled-opacity" },
];

export default function SliderPage() {
  const [volume, setVolume] = React.useState([50]);
  const [rangeValue, setRangeValue] = React.useState([25, 75]);
  
  return (
    <ComponentPage
      title="Slider"
      description="An input for selecting values, with range selection support."
      status="stable"
      registryKey="slider"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="w-full max-w-sm space-y-2">
            <WexLabel>Volume: {volume[0]}%</WexLabel>
            <WexSlider 
              value={volume} 
              onValueChange={setVolume} 
              max={100} 
              step={1}
            />
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          SINGLE VALUE
          ============================================================ */}
      <Section title="Single Value" description="Standard slider with one thumb.">
        <ExampleCard title="Basic Slider">
          <div className="w-64">
            <WexSlider defaultValue={[50]} max={100} aria-label="Basic slider" />
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          RANGE MODE
          ============================================================ */}
      <Section title="Range Selection" description="Two thumbs for selecting a range of values.">
        <ExampleCard title="Price Range">
          <div className="w-full max-w-sm space-y-2">
            <div className="flex justify-between text-sm">
              <span>Price Range</span>
              <span>${rangeValue[0]} - ${rangeValue[1]}</span>
            </div>
            <WexSlider 
              value={rangeValue}
              onValueChange={setRangeValue}
              max={100}
              step={5}
            />
          </div>
        </ExampleCard>

        <ExampleCard title="Time Range">
          <div className="w-full max-w-sm space-y-2">
            <WexLabel>Select time range (hours)</WexLabel>
            <WexSlider 
              defaultValue={[9, 17]}
              min={0}
              max={24}
              step={1}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>12 AM</span>
              <span>12 PM</span>
              <span>12 AM</span>
            </div>
          </div>
        </ExampleCard>
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Tip:</strong> To enable range mode, pass an array with two values to <code className="bg-muted px-1 rounded">defaultValue</code> or <code className="bg-muted px-1 rounded">value</code>.
          </p>
        </div>
      </Section>

      {/* ============================================================
          VARIANTS
          ============================================================ */}
      <Section title="Variants" description="Different slider configurations.">
        <div className="space-y-4">
          <ExampleCard title="With Steps">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel>Quality (step: 25)</WexLabel>
              <WexSlider defaultValue={[50]} max={100} step={25} aria-label="Quality slider" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
                <span>Ultra</span>
                <span>Max</span>
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="Custom Range">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel>Temperature (°C)</WexLabel>
              <WexSlider defaultValue={[20]} min={-10} max={40} step={1} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>-10°</span>
                <span>40°</span>
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled">
            <WexSlider defaultValue={[50]} max={100} disabled className="w-64" />
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Arrow Left/Down: Decrease value by step</li>
              <li>Arrow Right/Up: Increase value by step</li>
              <li>Home: Set to minimum value</li>
              <li>End: Set to maximum value</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexSlider } from "@/components/wex";

// Basic slider
<WexSlider defaultValue={[50]} max={100} />

// Range slider (pass two values)
<WexSlider defaultValue={[25, 75]} max={100} />

// With custom step
<WexSlider defaultValue={[50]} max={100} step={25} />

// Controlled
const [value, setValue] = useState([50]);
<WexSlider 
  value={value} 
  onValueChange={setValue} 
  max={100} 
/>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={sliderProps} />
      </Section>

      <TokenReference tokens={sliderTokens} className="mt-12" />
    </ComponentPage>
  );
}
