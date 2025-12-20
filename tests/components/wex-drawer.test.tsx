/**
 * WexDrawer Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexDrawer, WexButton } from "@/components/wex";

describe("WexDrawer", () => {
  it("renders trigger without crashing", () => {
    render(
      <WexDrawer>
        <WexDrawer.Trigger asChild>
          <WexButton>Open Drawer</WexButton>
        </WexDrawer.Trigger>
        <WexDrawer.Content>
          <WexDrawer.Header>
            <WexDrawer.Title>Drawer Title</WexDrawer.Title>
          </WexDrawer.Header>
        </WexDrawer.Content>
      </WexDrawer>
    );
    expect(screen.getByText("Open Drawer")).toBeInTheDocument();
  });
});

