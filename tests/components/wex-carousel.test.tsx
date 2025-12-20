/**
 * WexCarousel Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexCarousel } from "@/components/wex";

describe("WexCarousel", () => {
  it("renders without crashing", () => {
    render(
      <WexCarousel>
        <WexCarousel.Content>
          <WexCarousel.Item>Slide 1</WexCarousel.Item>
          <WexCarousel.Item>Slide 2</WexCarousel.Item>
        </WexCarousel.Content>
      </WexCarousel>
    );
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
  });

  it("renders multiple items", () => {
    render(
      <WexCarousel>
        <WexCarousel.Content>
          <WexCarousel.Item>First</WexCarousel.Item>
          <WexCarousel.Item>Second</WexCarousel.Item>
          <WexCarousel.Item>Third</WexCarousel.Item>
        </WexCarousel.Content>
      </WexCarousel>
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
    expect(screen.getByText("Third")).toBeInTheDocument();
  });
});

