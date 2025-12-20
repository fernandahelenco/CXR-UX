/**
 * WexButton Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { createRef } from "react";
import { WexButton } from "@/components/wex";

describe("WexButton", () => {
  it("renders without crashing", () => {
    render(<WexButton>Click me</WexButton>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<WexButton>Test Button</WexButton>);
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexButton className="custom-class">Button</WexButton>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<WexButton ref={ref}>Button</WexButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("renders with default variant", () => {
    render(<WexButton>Default</WexButton>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("renders with destructive variant", () => {
    render(<WexButton variant="destructive">Destructive</WexButton>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("renders with outline variant", () => {
    render(<WexButton variant="outline">Outline</WexButton>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("renders with ghost variant", () => {
    render(<WexButton variant="ghost">Ghost</WexButton>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<WexButton size="sm">Small</WexButton>);
    expect(screen.getByRole("button")).toBeInTheDocument();

    rerender(<WexButton size="lg">Large</WexButton>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(<WexButton disabled>Disabled</WexButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("accepts onClick handler", () => {
    let clicked = false;
    render(<WexButton onClick={() => (clicked = true)}>Click</WexButton>);
    screen.getByRole("button").click();
    expect(clicked).toBe(true);
  });
});

