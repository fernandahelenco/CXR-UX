/**
 * WexScrollArea Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexScrollArea } from "@/components/wex";

describe("WexScrollArea", () => {
  it("renders without crashing", () => {
    render(
      <WexScrollArea className="h-48">
        <div>Scrollable content</div>
      </WexScrollArea>
    );
    expect(screen.getByText("Scrollable content")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(
      <WexScrollArea className="custom-class" data-testid="scroll-area">
        <div>Content</div>
      </WexScrollArea>
    );
    expect(screen.getByTestId("scroll-area")).toHaveClass("custom-class");
  });
});

