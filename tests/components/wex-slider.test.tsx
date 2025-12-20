/**
 * WexSlider Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexSlider } from "@/components/wex";

describe("WexSlider", () => {
  it("renders without crashing", () => {
    render(<WexSlider aria-label="Volume" />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexSlider aria-label="Volume" className="custom-class" />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("accepts defaultValue", () => {
    render(<WexSlider aria-label="Volume" defaultValue={[50]} />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(<WexSlider aria-label="Volume" disabled />);
    // Radix uses data-disabled attribute instead of disabled
    expect(screen.getByRole("slider")).toHaveAttribute("data-disabled");
  });

  it("accepts min and max", () => {
    render(<WexSlider aria-label="Volume" min={0} max={100} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
  });
});

