/**
 * WexAspectRatio Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexAspectRatio } from "@/components/wex";

describe("WexAspectRatio", () => {
  it("renders without crashing", () => {
    render(
      <WexAspectRatio ratio={16 / 9}>
        <div data-testid="content">Content</div>
      </WexAspectRatio>
    );
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <WexAspectRatio ratio={4 / 3}>
        <img src="test.jpg" alt="Test" />
      </WexAspectRatio>
    );
    expect(screen.getByAltText("Test")).toBeInTheDocument();
  });
});

