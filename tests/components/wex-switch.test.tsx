/**
 * WexSwitch Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexSwitch } from "@/components/wex";

describe("WexSwitch", () => {
  it("renders without crashing", () => {
    render(<WexSwitch />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexSwitch className="custom-class" />);
    expect(screen.getByRole("switch")).toHaveClass("custom-class");
  });

  it("can be disabled", () => {
    render(<WexSwitch disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("accepts checked state", () => {
    render(<WexSwitch checked />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("accepts aria-label", () => {
    render(<WexSwitch aria-label="Enable notifications" />);
    expect(screen.getByLabelText("Enable notifications")).toBeInTheDocument();
  });
});

