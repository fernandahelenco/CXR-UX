/**
 * WexButtonGroup Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexButtonGroup, WexButton } from "@/components/wex";

describe("WexButtonGroup", () => {
  it("renders without crashing", () => {
    render(
      <WexButtonGroup>
        <WexButton>Button 1</WexButton>
        <WexButton>Button 2</WexButton>
      </WexButtonGroup>
    );
    expect(screen.getByText("Button 1")).toBeInTheDocument();
    expect(screen.getByText("Button 2")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(
      <WexButtonGroup className="custom-class" data-testid="button-group">
        <WexButton>Button</WexButton>
      </WexButtonGroup>
    );
    expect(screen.getByTestId("button-group")).toHaveClass("custom-class");
  });
});

