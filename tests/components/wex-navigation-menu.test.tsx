/**
 * WexNavigationMenu Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexNavigationMenu } from "@/components/wex";

describe("WexNavigationMenu", () => {
  it("renders without crashing", () => {
    render(
      <WexNavigationMenu>
        <WexNavigationMenu.List>
          <WexNavigationMenu.Item>
            <WexNavigationMenu.Link href="/">Home</WexNavigationMenu.Link>
          </WexNavigationMenu.Item>
        </WexNavigationMenu.List>
      </WexNavigationMenu>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(
      <WexNavigationMenu>
        <WexNavigationMenu.List>
          <WexNavigationMenu.Item>
            <WexNavigationMenu.Link href="/">Home</WexNavigationMenu.Link>
          </WexNavigationMenu.Item>
          <WexNavigationMenu.Item>
            <WexNavigationMenu.Link href="/about">About</WexNavigationMenu.Link>
          </WexNavigationMenu.Item>
        </WexNavigationMenu.List>
      </WexNavigationMenu>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});

