/**
 * WexChart Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexChart } from "@/components/wex";

describe("WexChart", () => {
  const chartConfig = {
    desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
    mobile: { label: "Mobile", color: "hsl(var(--chart-2))" },
  };

  it("renders container without crashing", () => {
    render(
      <WexChart.Container config={chartConfig}>
        <div data-testid="chart-content">Chart</div>
      </WexChart.Container>
    );
    expect(screen.getByTestId("chart-content")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(
      <WexChart.Container config={chartConfig} className="custom-class">
        <div>Chart</div>
      </WexChart.Container>
    );
    expect(document.querySelector(".custom-class")).toBeInTheDocument();
  });
});

