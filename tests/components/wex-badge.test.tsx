/**
 * WexBadge Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexBadge } from "@/components/wex";

describe("WexBadge", () => {
  it("renders without crashing", () => {
    render(<WexBadge>Badge</WexBadge>);
    expect(screen.getByText("Badge")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexBadge className="custom-class">Badge</WexBadge>);
    expect(screen.getByText("Badge")).toHaveClass("custom-class");
  });

  it("renders with default variant", () => {
    render(<WexBadge>Default</WexBadge>);
    expect(screen.getByText("Default")).toBeInTheDocument();
  });

  it("renders with secondary variant", () => {
    render(<WexBadge variant="secondary">Secondary</WexBadge>);
    expect(screen.getByText("Secondary")).toBeInTheDocument();
  });

  it("renders with destructive variant", () => {
    render(<WexBadge variant="destructive">Destructive</WexBadge>);
    expect(screen.getByText("Destructive")).toBeInTheDocument();
  });

  it("renders with outline variant", () => {
    render(<WexBadge variant="outline">Outline</WexBadge>);
    expect(screen.getByText("Outline")).toBeInTheDocument();
  });
});

