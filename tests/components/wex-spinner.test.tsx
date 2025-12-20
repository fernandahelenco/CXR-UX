/**
 * WexSpinner Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexSpinner } from "@/components/wex";

describe("WexSpinner", () => {
  it("renders without crashing", () => {
    render(<WexSpinner data-testid="spinner" />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexSpinner className="custom-class" data-testid="spinner" />);
    expect(screen.getByTestId("spinner")).toHaveClass("custom-class");
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<WexSpinner size="sm" data-testid="spinner" />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    rerender(<WexSpinner size="lg" data-testid="spinner" />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("has accessible role", () => {
    render(<WexSpinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});

