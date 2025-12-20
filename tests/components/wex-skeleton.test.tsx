/**
 * WexSkeleton Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexSkeleton } from "@/components/wex";

describe("WexSkeleton", () => {
  it("renders without crashing", () => {
    render(<WexSkeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexSkeleton className="custom-class" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("custom-class");
  });

  it("renders as a div by default", () => {
    render(<WexSkeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton").tagName).toBe("DIV");
  });
});

