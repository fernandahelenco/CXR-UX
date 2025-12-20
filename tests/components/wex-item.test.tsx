/**
 * WexItem Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexItem } from "@/components/wex";

describe("WexItem", () => {
  it("renders without crashing", () => {
    render(<WexItem>Item content</WexItem>);
    expect(screen.getByText("Item content")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexItem className="custom-class">Item</WexItem>);
    expect(screen.getByText("Item")).toHaveClass("custom-class");
  });
});

describe("WexItem.Separator", () => {
  it("renders without crashing", () => {
    render(<WexItem.Separator data-testid="separator" />);
    expect(screen.getByTestId("separator")).toBeInTheDocument();
  });
});

