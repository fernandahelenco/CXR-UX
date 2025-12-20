/**
 * WexLabel Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexLabel } from "@/components/wex";

describe("WexLabel", () => {
  it("renders without crashing", () => {
    render(<WexLabel>Label text</WexLabel>);
    expect(screen.getByText("Label text")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexLabel className="custom-class">Label</WexLabel>);
    expect(screen.getByText("Label")).toHaveClass("custom-class");
  });

  it("accepts htmlFor prop", () => {
    render(<WexLabel htmlFor="input-id">Label</WexLabel>);
    expect(screen.getByText("Label")).toHaveAttribute("for", "input-id");
  });
});

