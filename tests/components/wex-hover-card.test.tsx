/**
 * WexHoverCard Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexHoverCard } from "@/components/wex";

describe("WexHoverCard", () => {
  it("renders trigger without crashing", () => {
    render(
      <WexHoverCard>
        <WexHoverCard.Trigger>Hover over me</WexHoverCard.Trigger>
        <WexHoverCard.Content>Card content</WexHoverCard.Content>
      </WexHoverCard>
    );
    expect(screen.getByText("Hover over me")).toBeInTheDocument();
  });

  it("shows content when open", () => {
    render(
      <WexHoverCard open>
        <WexHoverCard.Trigger>Trigger</WexHoverCard.Trigger>
        <WexHoverCard.Content>Visible content</WexHoverCard.Content>
      </WexHoverCard>
    );
    expect(screen.getByText("Visible content")).toBeInTheDocument();
  });
});

