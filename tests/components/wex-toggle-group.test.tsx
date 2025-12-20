/**
 * WexToggleGroup Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexToggleGroup } from "@/components/wex";

describe("WexToggleGroup", () => {
  it("renders without crashing", () => {
    render(
      <WexToggleGroup type="single">
        <WexToggleGroup.Item value="a" aria-label="Option A">A</WexToggleGroup.Item>
        <WexToggleGroup.Item value="b" aria-label="Option B">B</WexToggleGroup.Item>
      </WexToggleGroup>
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("renders toggle items", () => {
    render(
      <WexToggleGroup type="single">
        <WexToggleGroup.Item value="bold" aria-label="Bold">Bold</WexToggleGroup.Item>
        <WexToggleGroup.Item value="italic" aria-label="Italic">Italic</WexToggleGroup.Item>
      </WexToggleGroup>
    );
    expect(screen.getByText("Bold")).toBeInTheDocument();
    expect(screen.getByText("Italic")).toBeInTheDocument();
  });

  it("accepts defaultValue", () => {
    render(
      <WexToggleGroup type="single" defaultValue="a">
        <WexToggleGroup.Item value="a" aria-label="A">A</WexToggleGroup.Item>
        <WexToggleGroup.Item value="b" aria-label="B">B</WexToggleGroup.Item>
      </WexToggleGroup>
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
  });
});

