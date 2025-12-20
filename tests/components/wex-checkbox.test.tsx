/**
 * WexCheckbox Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexCheckbox } from "@/components/wex";

describe("WexCheckbox", () => {
  it("renders without crashing", () => {
    render(<WexCheckbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexCheckbox className="custom-class" />);
    expect(screen.getByRole("checkbox")).toHaveClass("custom-class");
  });

  it("can be disabled", () => {
    render(<WexCheckbox disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("accepts checked state", () => {
    render(<WexCheckbox checked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("accepts aria-label", () => {
    render(<WexCheckbox aria-label="Accept terms" />);
    expect(screen.getByLabelText("Accept terms")).toBeInTheDocument();
  });
});

