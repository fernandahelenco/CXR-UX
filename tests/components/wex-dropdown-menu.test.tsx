/**
 * WexDropdownMenu Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexDropdownMenu, WexButton } from "@/components/wex";

describe("WexDropdownMenu", () => {
  it("renders trigger without crashing", () => {
    render(
      <WexDropdownMenu>
        <WexDropdownMenu.Trigger asChild>
          <WexButton>Open Menu</WexButton>
        </WexDropdownMenu.Trigger>
        <WexDropdownMenu.Content>
          <WexDropdownMenu.Item>Item 1</WexDropdownMenu.Item>
          <WexDropdownMenu.Item>Item 2</WexDropdownMenu.Item>
        </WexDropdownMenu.Content>
      </WexDropdownMenu>
    );
    expect(screen.getByText("Open Menu")).toBeInTheDocument();
  });

  it("shows items when open", () => {
    render(
      <WexDropdownMenu open>
        <WexDropdownMenu.Trigger asChild>
          <WexButton>Trigger</WexButton>
        </WexDropdownMenu.Trigger>
        <WexDropdownMenu.Content>
          <WexDropdownMenu.Item>First Item</WexDropdownMenu.Item>
          <WexDropdownMenu.Item>Second Item</WexDropdownMenu.Item>
        </WexDropdownMenu.Content>
      </WexDropdownMenu>
    );
    expect(screen.getByText("First Item")).toBeInTheDocument();
    expect(screen.getByText("Second Item")).toBeInTheDocument();
  });
});

