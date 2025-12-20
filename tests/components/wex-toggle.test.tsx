/**
 * WexToggle Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexToggle } from "@/components/wex";

describe("WexToggle", () => {
  it("renders without crashing", () => {
    render(<WexToggle aria-label="Toggle">Toggle</WexToggle>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexToggle aria-label="Toggle" className="custom-class">Toggle</WexToggle>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("can be disabled", () => {
    render(<WexToggle aria-label="Toggle" disabled>Toggle</WexToggle>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders with different variants", () => {
    const { rerender } = render(<WexToggle aria-label="Toggle" variant="default">Default</WexToggle>);
    expect(screen.getByRole("button")).toBeInTheDocument();

    rerender(<WexToggle aria-label="Toggle" variant="outline">Outline</WexToggle>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

