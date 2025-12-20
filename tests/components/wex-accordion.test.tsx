/**
 * WexAccordion Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexAccordion } from "@/components/wex";

describe("WexAccordion", () => {
  it("renders without crashing", () => {
    render(
      <WexAccordion type="single" collapsible>
        <WexAccordion.Item value="item-1">
          <WexAccordion.Trigger>Is it accessible?</WexAccordion.Trigger>
          <WexAccordion.Content>Yes, it is.</WexAccordion.Content>
        </WexAccordion.Item>
      </WexAccordion>
    );
    expect(screen.getByText("Is it accessible?")).toBeInTheDocument();
  });

  it("renders trigger text", () => {
    render(
      <WexAccordion type="single" collapsible>
        <WexAccordion.Item value="item-1">
          <WexAccordion.Trigger>Accordion Title</WexAccordion.Trigger>
          <WexAccordion.Content>Content here</WexAccordion.Content>
        </WexAccordion.Item>
      </WexAccordion>
    );
    expect(screen.getByText("Accordion Title")).toBeInTheDocument();
  });

  it("renders multiple items", () => {
    render(
      <WexAccordion type="single" collapsible>
        <WexAccordion.Item value="item-1">
          <WexAccordion.Trigger>First</WexAccordion.Trigger>
          <WexAccordion.Content>First content</WexAccordion.Content>
        </WexAccordion.Item>
        <WexAccordion.Item value="item-2">
          <WexAccordion.Trigger>Second</WexAccordion.Trigger>
          <WexAccordion.Content>Second content</WexAccordion.Content>
        </WexAccordion.Item>
      </WexAccordion>
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });
});

