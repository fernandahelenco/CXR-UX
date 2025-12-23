import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { Slider } from "@/components/ui/slider";
import { WexLabel } from "@/components/wex";

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
            <Slider 
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
            <Slider defaultValue={[50]} max={100} />
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
            <Slider 
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
            <Slider 
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
              <Slider defaultValue={[50]} max={100} step={25} />
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
              <Slider defaultValue={[20]} min={-10} max={40} step={1} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>-10°</span>
                <span>40°</span>
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled">
            <Slider defaultValue={[50]} max={100} disabled className="w-64" />
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
          code={`import { Slider } from "@/components/ui/slider";

// Basic slider
<Slider defaultValue={[50]} max={100} />

// Range slider (pass two values)
<Slider defaultValue={[25, 75]} max={100} />

// With custom step
<Slider defaultValue={[50]} max={100} step={25} />

// Controlled
const [value, setValue] = useState([50]);
<Slider 
  value={value} 
  onValueChange={setValue} 
  max={100} 
/>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">value</code>: number[] - Current value(s)</li>
            <li><code className="bg-muted px-1 rounded">defaultValue</code>: number[] - Initial value(s)</li>
            <li><code className="bg-muted px-1 rounded">onValueChange</code>: (value: number[]) =&gt; void</li>
            <li><code className="bg-muted px-1 rounded">min</code>: number - Minimum value</li>
            <li><code className="bg-muted px-1 rounded">max</code>: number - Maximum value</li>
            <li><code className="bg-muted px-1 rounded">step</code>: number - Step increment</li>
          </ul>
        </div>
      </Section>

      <TokenReference tokens={sliderTokens} className="mt-12" />
    </ComponentPage>
  );
}
