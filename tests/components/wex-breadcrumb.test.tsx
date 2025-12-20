/**
 * WexBreadcrumb Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexBreadcrumb } from "@/components/wex";

describe("WexBreadcrumb", () => {
  it("renders without crashing", () => {
    render(
      <WexBreadcrumb>
        <WexBreadcrumb.List>
          <WexBreadcrumb.Item>
            <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
          </WexBreadcrumb.Item>
          <WexBreadcrumb.Separator />
          <WexBreadcrumb.Item>
            <WexBreadcrumb.Page>Current</WexBreadcrumb.Page>
          </WexBreadcrumb.Item>
        </WexBreadcrumb.List>
      </WexBreadcrumb>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders breadcrumb items", () => {
    render(
      <WexBreadcrumb>
        <WexBreadcrumb.List>
          <WexBreadcrumb.Item>
            <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
          </WexBreadcrumb.Item>
          <WexBreadcrumb.Separator />
          <WexBreadcrumb.Item>
            <WexBreadcrumb.Link href="/products">Products</WexBreadcrumb.Link>
          </WexBreadcrumb.Item>
        </WexBreadcrumb.List>
      </WexBreadcrumb>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
  });
});

