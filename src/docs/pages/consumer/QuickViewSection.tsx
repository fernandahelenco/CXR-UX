import { useNavigate } from "react-router-dom";
import { WexCard } from "@/components/wex/wex-card";
import { WexButton } from "@/components/wex/wex-button";
import { WexChart, type WexChartConfig } from "@/components/wex/wex-chart";
import { WexSeparator } from "@/components/wex/wex-separator";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from "recharts";
import { AlertCircle, ChevronRight } from "lucide-react";
import { hsaContributionsData, paidClaimsCategoryData } from "./mockData";

/**
 * Quick View Charts Section
 * 
 * Two-column layout with:
 * - Left: Bar chart showing HSA contributions by tax year
 * - Right: Donut/Pie chart showing paid claims by category
 */

// Chart configurations
const hsaChartConfig = {
  amount: {
    label: "Contribution",
    color: "hsl(var(--chart-1))",
  },
} satisfies WexChartConfig;

const claimsChartConfig = {
  Medical: {
    label: "Medical",
    color: "hsl(var(--chart-1))",
  },
  Dental: {
    label: "Dental",
    color: "hsl(var(--chart-2))",
  },
  Vision: {
    label: "Vision",
    color: "hsl(var(--chart-3))",
  },
} satisfies WexChartConfig;

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
];

export function QuickViewSection() {
  const navigate = useNavigate();
  
  // Transform data for pie chart
  const pieData = paidClaimsCategoryData.map((item) => ({
    name: item.category,
    value: item.amount,
  }));

  return (
    <WexCard>
      <WexCard.Content className="p-6">
        <div className="space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-semibold text-foreground">
              Quick View
            </h2>
            <WexButton 
              intent="link" 
              size="md"
              onClick={() => {
                navigate("/account-overview");
              }}
            >
              View All Accounts
              <ChevronRight className="h-4 w-4" />
            </WexButton>
          </div>

          {/* Charts Layout - Side by Side */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Bar Chart - HSA Contributions */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-display font-semibold">
                  HSA Contributions by Tax Year
                </h3>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </div>

              <WexChart.Container config={hsaChartConfig} className="h-[300px]">
                <BarChart data={hsaContributionsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="year"
                    tickLine={false}
                    axisLine={false}
                    className="text-xs"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    className="text-xs"
                    tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                  />
                  <WexChart.Tooltip
                    content={<WexChart.TooltipContent />}
                    formatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Bar
                    dataKey="amount"
                    fill="var(--chart-1)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </WexChart.Container>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "hsl(var(--chart-1))" }} />
                  <span className="text-muted-foreground">Current Distribution</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "hsl(var(--chart-2))" }} />
                  <span className="text-muted-foreground">Maximum Contribution</span>
                </div>
              </div>
            </div>

            <WexSeparator orientation="vertical" className="hidden md:block" />

            {/* Pie Chart - Paid Claims */}
            <div className="flex-1 space-y-4">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-display font-semibold">
                  Paid Claims by Category
                </h3>
                <p className="text-sm text-muted-foreground">01/01/2025 - 12/31/2025</p>
              </div>

              <WexChart.Container config={claimsChartConfig} className="h-[300px]">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <WexChart.Tooltip
                    content={<WexChart.TooltipContent />}
                    formatter={(value) => `$${value}`}
                  />
                </PieChart>
              </WexChart.Container>

              {/* Legend */}
              <div className="flex items-center justify-center gap-4 text-sm">
                {paidClaimsCategoryData.map((item, index) => (
                  <div key={item.category} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-sm" 
                      style={{ backgroundColor: COLORS[index] }} 
                    />
                    <span className="text-muted-foreground">{item.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </WexCard.Content>
    </WexCard>
  );
}

