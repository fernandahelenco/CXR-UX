/**
 * Tests for chart color utilities
 * 
 * Tests CSS variable resolution and chart color constants
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  resolveChartColor,
  getChartColors,
  chartColorVars,
  sampleData,
} from "@/docs/utils/chartColors";

describe("chartColorVars", () => {
  it("has all 5 chart color variables", () => {
    expect(chartColorVars.chart1).toBe("hsl(var(--chart-1))");
    expect(chartColorVars.chart2).toBe("hsl(var(--chart-2))");
    expect(chartColorVars.chart3).toBe("hsl(var(--chart-3))");
    expect(chartColorVars.chart4).toBe("hsl(var(--chart-4))");
    expect(chartColorVars.chart5).toBe("hsl(var(--chart-5))");
  });

  it("has exactly 5 entries", () => {
    expect(Object.keys(chartColorVars)).toHaveLength(5);
  });
});

describe("resolveChartColor", () => {
  it("returns hsl(var(...)) for unknown variables", () => {
    // In test environment, getComputedStyle returns empty for unknown vars
    const result = resolveChartColor("--chart-unknown");
    expect(result).toBe("hsl(var(--chart-unknown))");
  });

  it("returns fallback format when variable not found", () => {
    const result = resolveChartColor("--nonexistent");
    expect(result).toMatch(/^hsl\(/);
  });
});

describe("getChartColors", () => {
  it("returns an array of 5 colors", () => {
    const colors = getChartColors();
    expect(colors).toHaveLength(5);
  });

  it("returns strings that start with hsl(", () => {
    const colors = getChartColors();
    colors.forEach(color => {
      expect(color).toMatch(/^hsl\(/);
    });
  });
});

describe("sampleData", () => {
  describe("monthly", () => {
    it("has 6 data points", () => {
      expect(sampleData.monthly).toHaveLength(6);
    });

    it("has month and value properties", () => {
      sampleData.monthly.forEach(item => {
        expect(item).toHaveProperty("month");
        expect(item).toHaveProperty("value");
        expect(typeof item.month).toBe("string");
        expect(typeof item.value).toBe("number");
      });
    });
  });

  describe("multiSeries", () => {
    it("has 6 data points", () => {
      expect(sampleData.multiSeries).toHaveLength(6);
    });

    it("has month, revenue, and expenses properties", () => {
      sampleData.multiSeries.forEach(item => {
        expect(item).toHaveProperty("month");
        expect(item).toHaveProperty("revenue");
        expect(item).toHaveProperty("expenses");
      });
    });
  });

  describe("distribution", () => {
    it("has 4 data points", () => {
      expect(sampleData.distribution).toHaveLength(4);
    });

    it("has name, value, and fill properties", () => {
      sampleData.distribution.forEach(item => {
        expect(item).toHaveProperty("name");
        expect(item).toHaveProperty("value");
        expect(item).toHaveProperty("fill");
        expect(item.fill).toMatch(/^hsl\(var\(--chart-\d\)\)$/);
      });
    });

    it("uses chart color variables for fills", () => {
      const fills = sampleData.distribution.map(d => d.fill);
      expect(fills).toContain("hsl(var(--chart-1))");
      expect(fills).toContain("hsl(var(--chart-2))");
      expect(fills).toContain("hsl(var(--chart-3))");
      expect(fills).toContain("hsl(var(--chart-4))");
    });
  });
});

