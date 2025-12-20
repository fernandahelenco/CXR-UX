/**
 * WexEmpty Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexEmpty } from "@/components/wex";

describe("WexEmpty", () => {
  it("renders without crashing", () => {
    render(<WexEmpty />);
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  it("renders with custom message", () => {
    render(<WexEmpty message="No items found" />);
    expect(screen.getByText("No items found")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexEmpty className="custom-class" data-testid="empty" />);
    expect(screen.getByTestId("empty")).toHaveClass("custom-class");
  });
});

