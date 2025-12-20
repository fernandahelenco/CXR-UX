/**
 * WexCollapsible Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexCollapsible, WexButton } from "@/components/wex";

describe("WexCollapsible", () => {
  it("renders trigger without crashing", () => {
    render(
      <WexCollapsible>
        <WexCollapsible.Trigger asChild>
          <WexButton>Toggle</WexButton>
        </WexCollapsible.Trigger>
        <WexCollapsible.Content>Hidden content</WexCollapsible.Content>
      </WexCollapsible>
    );
    expect(screen.getByText("Toggle")).toBeInTheDocument();
  });

  it("shows content when open", () => {
    render(
      <WexCollapsible open>
        <WexCollapsible.Trigger asChild>
          <WexButton>Toggle</WexButton>
        </WexCollapsible.Trigger>
        <WexCollapsible.Content>Visible content</WexCollapsible.Content>
      </WexCollapsible>
    );
    expect(screen.getByText("Visible content")).toBeInTheDocument();
  });
});

