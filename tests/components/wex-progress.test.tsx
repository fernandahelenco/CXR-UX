/**
 * WexProgress Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexProgress } from "@/components/wex";

describe("WexProgress", () => {
  it("renders without crashing", () => {
    render(<WexProgress value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexProgress value={50} className="custom-class" />);
    expect(screen.getByRole("progressbar")).toHaveClass("custom-class");
  });

  it("accepts value prop", () => {
    render(<WexProgress value={75} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "75");
  });

  it("handles zero value", () => {
    render(<WexProgress value={0} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("handles 100 value", () => {
    render(<WexProgress value={100} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
  });
});

