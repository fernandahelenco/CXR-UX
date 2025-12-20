/**
 * Chart Color Utilities
 * 
 * Resolves chart CSS variables at runtime for use with Recharts.
 * Uses computed styles to get actual color values without hardcoding.
 * 
 * Chart tokens: --chart-1 through --chart-5
 */

/**
 * Resolve a CSS variable to its computed hsl() value
 * Returns a string Recharts can consume: "hsl(210 100% 50%)"
 */
export function resolveChartColor(varName: string): string {
  if (typeof window === "undefined") {
    // SSR fallback - return the CSS variable reference
    return `hsl(var(${varName}))`;
  }
  
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(varName).trim();
  
  if (!value) {
    // Fallback to CSS variable reference if not found
    return `hsl(var(${varName}))`;
  }
  
  // Return as hsl() string - value should be in format "210 100% 50%"
  return `hsl(${value})`;
}

/**
 * Get all chart colors (1-5) as an array
 */
export function getChartColors(): string[] {
  return [1, 2, 3, 4, 5].map(n => resolveChartColor(`--chart-${n}`));
}

/**
 * Chart color CSS variable references for use in ChartConfig
 * These are static references that work with shadcn chart system
 */
export const chartColorVars = {
  chart1: "hsl(var(--chart-1))",
  chart2: "hsl(var(--chart-2))",
  chart3: "hsl(var(--chart-3))",
  chart4: "hsl(var(--chart-4))",
  chart5: "hsl(var(--chart-5))",
} as const;

/**
 * Sample data generators for chart examples
 */
export const sampleData = {
  // Basic monthly data
  monthly: [
    { month: "Jan", value: 186 },
    { month: "Feb", value: 305 },
    { month: "Mar", value: 237 },
    { month: "Apr", value: 273 },
    { month: "May", value: 209 },
    { month: "Jun", value: 214 },
  ],
  
  // Multi-series data (revenue vs expenses)
  multiSeries: [
    { month: "Jan", revenue: 186, expenses: 80 },
    { month: "Feb", revenue: 305, expenses: 200 },
    { month: "Mar", revenue: 237, expenses: 120 },
    { month: "Apr", revenue: 273, expenses: 190 },
    { month: "May", revenue: 209, expenses: 130 },
    { month: "Jun", revenue: 214, expenses: 140 },
  ],
  
  // Pie/donut data
  distribution: [
    { name: "Desktop", value: 400, fill: "hsl(var(--chart-1))" },
    { name: "Mobile", value: 300, fill: "hsl(var(--chart-2))" },
    { name: "Tablet", value: 200, fill: "hsl(var(--chart-3))" },
    { name: "Other", value: 100, fill: "hsl(var(--chart-4))" },
  ],
};

