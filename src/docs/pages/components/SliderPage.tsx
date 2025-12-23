import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexSlider, WexLabel } from "@/components/wex";

// Token mappings for WexSlider
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
  
  return (
    <ComponentPage
      title="Slider"
      description="An input for selecting a value within a range."
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

      <Section title="Variants" description="Different slider configurations.">
        <div className="space-y-4">
          <ExampleCard title="Default" description="Single value slider.">
            <WexSlider defaultValue={[50]} max={100} step={1} className="w-64" aria-label="Default slider" />
          </ExampleCard>

          <ExampleCard title="With Steps" description="Slider with defined step increments.">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel>Quality (step: 25)</WexLabel>
              <WexSlider defaultValue={[50]} max={100} step={25} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
                <span>Ultra</span>
                <span>Max</span>
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="Custom Range" description="Slider with custom min/max values.">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel>Temperature (°C)</WexLabel>
              <WexSlider defaultValue={[20]} min={-10} max={40} step={1} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>-10°</span>
                <span>40°</span>
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="Small Values" description="Slider for precise small values.">
            <div className="w-full max-w-sm space-y-2">
              <WexLabel>Opacity</WexLabel>
              <WexSlider defaultValue={[0.5]} min={0} max={1} step={0.1} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>1</span>
              </div>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="States" description="Interactive states.">
        <div className="space-y-4">
          <ExampleCard title="Default" description="Normal interactive state.">
            <WexSlider defaultValue={[33]} max={100} className="w-64" aria-label="Interactive state example" />
          </ExampleCard>

          <ExampleCard title="Disabled" description="Non-interactive disabled state.">
            <WexSlider defaultValue={[50]} max={100} disabled className="w-64" aria-label="Disabled slider example" />
          </ExampleCard>
        </div>
      </Section>

      <Section title="With Label and Value Display" description="Common patterns for slider usage.">
        <div className="space-y-4">
          <ExampleCard title="Brightness Control">
            <div className="w-full max-w-sm space-y-4">
              <div className="flex justify-between">
                <WexLabel>Brightness</WexLabel>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
              <WexSlider defaultValue={[75]} max={100} step={5} />
            </div>
          </ExampleCard>

          <ExampleCard title="Price Range">
            <div className="w-full max-w-sm space-y-4">
              <div className="flex justify-between">
                <WexLabel>Max Price</WexLabel>
                <span className="text-sm text-muted-foreground">$500</span>
              </div>
              <WexSlider defaultValue={[500]} max={1000} step={50} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$0</span>
                <span>$1000</span>
              </div>
            </div>
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
              <li>Page Up: Increase by larger step</li>
              <li>Page Down: Decrease by larger step</li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Thumb Size</h3>
            <p className="text-sm text-muted-foreground">
              The slider thumb is 20px (h-5, w-5) with a visible track of 8px (h-2),
              providing adequate touch targets.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexSlider } from "@/components/wex";

// Basic slider
<WexSlider defaultValue={[50]} max={100} step={1} />

// Controlled slider
const [value, setValue] = useState([50]);
<WexSlider value={value} onValueChange={setValue} />

// Custom range
<WexSlider defaultValue={[0]} min={-50} max={50} step={5} />

// With label and value display
<div className="space-y-2">
  <div className="flex justify-between">
    <WexLabel>Volume</WexLabel>
    <span>{value[0]}%</span>
  </div>
  <WexSlider value={value} onValueChange={setValue} max={100} />
</div>`}
        />
      </Section>

      <TokenReference tokens={sliderTokens} className="mt-12" />
    </ComponentPage>
  );
}
