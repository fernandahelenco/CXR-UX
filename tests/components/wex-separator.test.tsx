/**
 * WexSeparator Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexSeparator } from "@/components/wex";

describe("WexSeparator", () => {
  it("renders without crashing", () => {
    render(<WexSeparator />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexSeparator className="custom-class" />);
    expect(screen.getByRole("separator")).toHaveClass("custom-class");
  });

  it("renders horizontal by default", () => {
    render(<WexSeparator data-testid="separator" />);
    // Radix separator uses role="none" for decorative separators
    expect(screen.getByTestId("separator")).toHaveAttribute("data-orientation", "horizontal");
  });

  it("renders vertical when specified", () => {
    render(<WexSeparator orientation="vertical" data-testid="separator" />);
    // Vertical separator has role="none" per Radix
    expect(screen.getByTestId("separator")).toHaveAttribute("data-orientation", "vertical");
  });
});

