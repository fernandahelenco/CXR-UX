/**
 * WexCommand Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexCommand } from "@/components/wex";

describe("WexCommand", () => {
  it("renders without crashing", () => {
    render(
      <WexCommand>
        <WexCommand.Input placeholder="Search..." />
        <WexCommand.List>
          <WexCommand.Empty>No results.</WexCommand.Empty>
          <WexCommand.Group heading="Suggestions">
            <WexCommand.Item>Item 1</WexCommand.Item>
            <WexCommand.Item>Item 2</WexCommand.Item>
          </WexCommand.Group>
        </WexCommand.List>
      </WexCommand>
    );
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("renders command items", () => {
    render(
      <WexCommand>
        <WexCommand.List>
          <WexCommand.Group>
            <WexCommand.Item>First Item</WexCommand.Item>
            <WexCommand.Item>Second Item</WexCommand.Item>
          </WexCommand.Group>
        </WexCommand.List>
      </WexCommand>
    );
    expect(screen.getByText("First Item")).toBeInTheDocument();
    expect(screen.getByText("Second Item")).toBeInTheDocument();
  });
});

