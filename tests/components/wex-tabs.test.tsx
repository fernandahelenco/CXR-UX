/**
 * WexTabs Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexTabs } from "@/components/wex";

describe("WexTabs", () => {
  it("renders without crashing", () => {
    render(
      <WexTabs defaultValue="tab1">
        <WexTabs.List>
          <WexTabs.Trigger value="tab1">Tab 1</WexTabs.Trigger>
          <WexTabs.Trigger value="tab2">Tab 2</WexTabs.Trigger>
        </WexTabs.List>
        <WexTabs.Content value="tab1">Content 1</WexTabs.Content>
        <WexTabs.Content value="tab2">Content 2</WexTabs.Content>
      </WexTabs>
    );
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("renders tab triggers", () => {
    render(
      <WexTabs defaultValue="tab1">
        <WexTabs.List>
          <WexTabs.Trigger value="tab1">First Tab</WexTabs.Trigger>
          <WexTabs.Trigger value="tab2">Second Tab</WexTabs.Trigger>
        </WexTabs.List>
        <WexTabs.Content value="tab1">Content 1</WexTabs.Content>
        <WexTabs.Content value="tab2">Content 2</WexTabs.Content>
      </WexTabs>
    );
    expect(screen.getByText("First Tab")).toBeInTheDocument();
    expect(screen.getByText("Second Tab")).toBeInTheDocument();
  });

  it("shows default tab content", () => {
    render(
      <WexTabs defaultValue="tab1">
        <WexTabs.List>
          <WexTabs.Trigger value="tab1">Tab 1</WexTabs.Trigger>
        </WexTabs.List>
        <WexTabs.Content value="tab1">Default Content</WexTabs.Content>
      </WexTabs>
    );
    expect(screen.getByText("Default Content")).toBeInTheDocument();
  });

  it("accepts className on triggers", () => {
    render(
      <WexTabs defaultValue="tab1">
        <WexTabs.List>
          <WexTabs.Trigger value="tab1" className="custom-trigger">Tab</WexTabs.Trigger>
        </WexTabs.List>
        <WexTabs.Content value="tab1">Content</WexTabs.Content>
      </WexTabs>
    );
    expect(screen.getByText("Tab")).toHaveClass("custom-trigger");
  });
});

