/**
 * WexCalendar Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexCalendar } from "@/components/wex";

describe("WexCalendar", () => {
  it("renders without crashing", () => {
    render(<WexCalendar />);
    // Calendar should render with navigation buttons
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexCalendar className="custom-class" />);
    expect(screen.getByRole("grid").closest(".custom-class")).toBeInTheDocument();
  });

  it("accepts selected date", () => {
    const date = new Date(2024, 0, 15); // Jan 15, 2024
    render(<WexCalendar selected={date} />);
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });
});

