/**
 * WexMenubar Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexMenubar } from "@/components/wex";

describe("WexMenubar", () => {
  it("renders without crashing", () => {
    render(
      <WexMenubar>
        <WexMenubar.Menu>
          <WexMenubar.Trigger>File</WexMenubar.Trigger>
          <WexMenubar.Content>
            <WexMenubar.Item>New</WexMenubar.Item>
            <WexMenubar.Item>Open</WexMenubar.Item>
          </WexMenubar.Content>
        </WexMenubar.Menu>
      </WexMenubar>
    );
    expect(screen.getByRole("menubar")).toBeInTheDocument();
  });

  it("renders menu triggers", () => {
    render(
      <WexMenubar>
        <WexMenubar.Menu>
          <WexMenubar.Trigger>File</WexMenubar.Trigger>
          <WexMenubar.Content>
            <WexMenubar.Item>Item</WexMenubar.Item>
          </WexMenubar.Content>
        </WexMenubar.Menu>
        <WexMenubar.Menu>
          <WexMenubar.Trigger>Edit</WexMenubar.Trigger>
          <WexMenubar.Content>
            <WexMenubar.Item>Item</WexMenubar.Item>
          </WexMenubar.Content>
        </WexMenubar.Menu>
      </WexMenubar>
    );
    expect(screen.getByText("File")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });
});

