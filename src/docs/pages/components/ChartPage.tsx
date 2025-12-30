import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { Guidance } from "@/docs/components/ProseBlock";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexChart, type WexChartConfig } from "@/components/wex/wex-chart";

// Props documentation
const chartContainerProps: PropDefinition[] = [
  { name: "config", type: "WexChartConfig", required: true, description: "Chart configuration mapping keys to colors/labels" },
  { name: "className", type: "string", description: "Additional CSS classes" },
  { name: "children", type: "ReactNode", required: true, description: "Recharts chart component" },
];

const chartTooltipProps: PropDefinition[] = [
  { name: "content", type: "ReactNode | ({ active, payload, label }) => ReactNode", description: "Custom tooltip content" },
  { name: "hideLabel", type: "boolean", default: "false", description: "Hide the label in tooltip" },
  { name: "hideIndicator", type: "boolean", default: "false", description: "Hide color indicator" },
  { name: "indicator", type: '"line" | "dot" | "dashed"', default: '"dot"', description: "Indicator style" },
  { name: "nameKey", type: "string", description: "Key to use for data name" },
  { name: "labelKey", type: "string", description: "Key to use for label" },
];
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  Area,
  AreaChart,
} from "recharts";

// Token mappings for WexChart
const chartTokens: TokenRow[] = [
  { element: "Chart 1", property: "Fill", token: "--chart-1" },
  { element: "Chart 2", property: "Fill", token: "--chart-2" },
  { element: "Chart 3", property: "Fill", token: "--chart-3" },
  { element: "Chart 4", property: "Fill", token: "--chart-4" },
  { element: "Chart 5", property: "Fill", token: "--chart-5" },
  { element: "Tooltip", property: "Background", token: "--popover" },
  { element: "Tooltip", property: "Border", token: "--border" },
  { element: "Axis", property: "Color", token: "--muted-foreground" },
];
import { sampleData, chartColorVars } from "@/docs/utils/chartColors";

export default function ChartPage() {
  return (
    <ComponentPage
      title="Chart"
      description="Data visualization components built with Recharts and shadcn/ui chart primitives."
      status="beta"
      registryKey="chart"
    >
      <Section title="Overview">
        <Guidance>
          Charts use Recharts under the hood with a shadcn/ui wrapper for consistent styling.
          Colors are resolved from CSS variables (--chart-1 through --chart-5) for theme consistency.
        </Guidance>
        <ExampleCard title="Basic Bar Chart" description="Single series bar chart with axes and tooltip.">
          <BasicBarChartExample />
        </ExampleCard>
        <Guidance>
          <strong>When to use:</strong> Bar charts are ideal for comparing discrete categories or 
          showing changes over time with distinct periods.
        </Guidance>
      </Section>

      <Section title="Chart Types" description="Common chart types for different data visualization needs.">
        <div className="space-y-8">
          <ExampleCard title="Line Chart" description="Track trends over continuous data points.">
            <LineChartExample />
          </ExampleCard>
          <Guidance>
            <strong>When to use:</strong> Line charts excel at showing trends over time or 
            continuous data. Best for 5+ data points where you want to emphasize the overall pattern.
          </Guidance>

          <ExampleCard title="Multi-Series Bar Chart" description="Compare two data series side by side.">
            <MultiSeriesBarChartExample />
          </ExampleCard>
          <Guidance>
            <strong>When to use:</strong> Multi-series charts compare related metrics (e.g., revenue vs. expenses).
            Include a legend to differentiate series.
          </Guidance>

          <ExampleCard title="Area Chart" description="Filled line chart emphasizing volume.">
            <AreaChartExample />
          </ExampleCard>
          <Guidance>
            <strong>When to use:</strong> Area charts emphasize the magnitude of values over time.
            Good for showing cumulative totals or comparing parts of a whole.
          </Guidance>

          <ExampleCard title="Pie Chart" description="Show proportional distribution of data.">
            <PieChartExample />
          </ExampleCard>
          <Guidance>
            <strong>When to use:</strong> Pie charts show part-to-whole relationships.
            Limit to 5-6 segments for readability. Always include a legend.
          </Guidance>
        </div>
      </Section>

      <Section title="Data Shape" description="Expected data format for chart components.">
        <CodeBlock
          code={`// Basic single-series data
const data = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: 305 },
  { month: "Mar", value: 237 },
];

// Multi-series data
const data = [
  { month: "Jan", revenue: 186, expenses: 80 },
  { month: "Feb", revenue: 305, expenses: 200 },
];

// Pie/distribution data (include fill for colors)
const data = [
  { name: "Desktop", value: 400, fill: "hsl(var(--chart-1))" },
  { name: "Mobile", value: 300, fill: "hsl(var(--chart-2))" },
];`}
        />
      </Section>

      <Section title="Chart Configuration" description="Define colors and labels via WexChartConfig.">
        <CodeBlock
          code={`import { WexChart, type WexChartConfig } from "@/components/wex/wex-chart";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies WexChartConfig;

// Use with WexChart.Container
<WexChart.Container config={chartConfig}>
  <BarChart data={data}>
    <Bar dataKey="revenue" fill="var(--color-revenue)" />
    <Bar dataKey="expenses" fill="var(--color-expenses)" />
  </BarChart>
</WexChart.Container>`}
        />
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Color is Not the Only Signal</h3>
            <p className="text-sm text-muted-foreground">
              Charts should not rely solely on color to convey meaning. Include:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside mt-2 space-y-1">
              <li>Clear legends with text labels</li>
              <li>Tooltips showing exact values on hover/focus</li>
              <li>Data tables as alternatives for screen readers</li>
              <li>Patterns or textures where possible</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Non-text Contrast (WCAG 1.4.11)</h3>
            <p className="text-sm text-muted-foreground">
              Chart colors should maintain at least 3:1 contrast ratio against adjacent 
              colors. The chart color tokens are designed with this in mind.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <p className="text-sm text-muted-foreground">
              Recharts tooltips are accessible via mouse hover. For full keyboard 
              accessibility, consider providing a companion data table.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexChart, type WexChartConfig } from "@/components/wex/wex-chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: 305 },
];

const chartConfig = {
  value: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies WexChartConfig;

function MyChart() {
  return (
    <WexChart.Container config={chartConfig} className="h-[300px]">
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <WexChart.Tooltip content={<WexChart.TooltipContent />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </WexChart.Container>
  );
}`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable 
          props={chartContainerProps}
          subComponents={[
            { name: "WexChart.Tooltip", props: chartTooltipProps },
            { name: "WexChart.Legend", props: [{ name: "content", type: "ReactNode", description: "Custom legend content" }] },
          ]}
        />
      </Section>

      <TokenReference tokens={chartTokens} className="mt-12" />
    </ComponentPage>
  );
}

// ============================================
// Chart Example Components
// ============================================

const barChartConfig = {
  value: {
    label: "Value",
    color: chartColorVars.chart1,
  },
} satisfies WexChartConfig;

function BasicBarChartExample() {
  return (
    <WexChart.Container config={barChartConfig} className="h-[250px] w-full">
      <BarChart data={sampleData.monthly} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} />
        <WexChart.Tooltip content={<WexChart.TooltipContent />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </WexChart.Container>
  );
}

const lineChartConfig = {
  value: {
    label: "Value",
    color: chartColorVars.chart2,
  },
} satisfies WexChartConfig;

function LineChartExample() {
  return (
    <WexChart.Container config={lineChartConfig} className="h-[250px] w-full">
      <LineChart data={sampleData.monthly} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} />
        <WexChart.Tooltip content={<WexChart.TooltipContent />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={{ fill: "var(--color-value)" }}
        />
      </LineChart>
    </WexChart.Container>
  );
}

const multiSeriesConfig = {
  revenue: {
    label: "Revenue",
    color: chartColorVars.chart1,
  },
  expenses: {
    label: "Expenses",
    color: chartColorVars.chart3,
  },
} satisfies WexChartConfig;

function MultiSeriesBarChartExample() {
  return (
    <WexChart.Container config={multiSeriesConfig} className="h-[250px] w-full">
      <BarChart data={sampleData.multiSeries} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} />
        <WexChart.Tooltip content={<WexChart.TooltipContent />} />
        <WexChart.Legend content={<WexChart.LegendContent />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
      </BarChart>
    </WexChart.Container>
  );
}

const areaChartConfig = {
  value: {
    label: "Value",
    color: chartColorVars.chart4,
  },
} satisfies WexChartConfig;

function AreaChartExample() {
  return (
    <WexChart.Container config={areaChartConfig} className="h-[250px] w-full">
      <AreaChart data={sampleData.monthly} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} axisLine={false} />
        <WexChart.Tooltip content={<WexChart.TooltipContent />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--color-value)"
          fill="var(--color-value)"
          fillOpacity={0.3}
        />
      </AreaChart>
    </WexChart.Container>
  );
}

const pieChartConfig = {
  desktop: {
    label: "Desktop",
    color: chartColorVars.chart1,
  },
  mobile: {
    label: "Mobile",
    color: chartColorVars.chart2,
  },
  tablet: {
    label: "Tablet",
    color: chartColorVars.chart3,
  },
  other: {
    label: "Other",
    color: chartColorVars.chart4,
  },
} satisfies WexChartConfig;

function PieChartExample() {
  return (
    <WexChart.Container config={pieChartConfig} className="h-[250px] w-full">
      <PieChart accessibilityLayer>
        <WexChart.Tooltip content={<WexChart.TooltipContent />} />
        <WexChart.Legend content={<WexChart.LegendContent />} />
        <Pie
          data={sampleData.distribution}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          paddingAngle={2}
        >
          {sampleData.distribution.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </WexChart.Container>
  );
}
