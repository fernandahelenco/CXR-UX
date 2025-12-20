/**
 * WexResizable Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexResizable } from "@/components/wex";

describe("WexResizable", () => {
  it("renders without crashing", () => {
    render(
      <WexResizable.PanelGroup direction="horizontal">
        <WexResizable.Panel>Panel 1</WexResizable.Panel>
        <WexResizable.Handle />
        <WexResizable.Panel>Panel 2</WexResizable.Panel>
      </WexResizable.PanelGroup>
    );
    expect(screen.getByText("Panel 1")).toBeInTheDocument();
    expect(screen.getByText("Panel 2")).toBeInTheDocument();
  });

  it("renders panels with content", () => {
    render(
      <WexResizable.PanelGroup direction="horizontal">
        <WexResizable.Panel>Left Panel</WexResizable.Panel>
        <WexResizable.Handle />
        <WexResizable.Panel>Right Panel</WexResizable.Panel>
      </WexResizable.PanelGroup>
    );
    expect(screen.getByText("Left Panel")).toBeInTheDocument();
    expect(screen.getByText("Right Panel")).toBeInTheDocument();
  });
});

