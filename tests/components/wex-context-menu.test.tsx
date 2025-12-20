/**
 * WexContextMenu Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexContextMenu } from "@/components/wex";

describe("WexContextMenu", () => {
  it("renders trigger without crashing", () => {
    render(
      <WexContextMenu>
        <WexContextMenu.Trigger>
          <div>Right click me</div>
        </WexContextMenu.Trigger>
        <WexContextMenu.Content>
          <WexContextMenu.Item>Cut</WexContextMenu.Item>
          <WexContextMenu.Item>Copy</WexContextMenu.Item>
        </WexContextMenu.Content>
      </WexContextMenu>
    );
    expect(screen.getByText("Right click me")).toBeInTheDocument();
  });
});

