/**
 * WexPopover Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexPopover, WexButton } from "@/components/wex";

describe("WexPopover", () => {
  it("renders trigger without crashing", () => {
    render(
      <WexPopover>
        <WexPopover.Trigger asChild>
          <WexButton>Open Popover</WexButton>
        </WexPopover.Trigger>
        <WexPopover.Content>Popover content</WexPopover.Content>
      </WexPopover>
    );
    expect(screen.getByText("Open Popover")).toBeInTheDocument();
  });

  it("shows content when open", () => {
    render(
      <WexPopover open>
        <WexPopover.Trigger asChild>
          <WexButton>Trigger</WexButton>
        </WexPopover.Trigger>
        <WexPopover.Content>Popover Text</WexPopover.Content>
      </WexPopover>
    );
    expect(screen.getByText("Popover Text")).toBeInTheDocument();
  });
});

