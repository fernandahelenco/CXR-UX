/**
 * WexPagination Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexPagination } from "@/components/wex";

describe("WexPagination", () => {
  it("renders without crashing", () => {
    render(
      <WexPagination>
        <WexPagination.Content>
          <WexPagination.Item>
            <WexPagination.Previous href="#" />
          </WexPagination.Item>
          <WexPagination.Item>
            <WexPagination.Link href="#">1</WexPagination.Link>
          </WexPagination.Item>
          <WexPagination.Item>
            <WexPagination.Next href="#" />
          </WexPagination.Item>
        </WexPagination.Content>
      </WexPagination>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders page links", () => {
    render(
      <WexPagination>
        <WexPagination.Content>
          <WexPagination.Item>
            <WexPagination.Link href="#">1</WexPagination.Link>
          </WexPagination.Item>
          <WexPagination.Item>
            <WexPagination.Link href="#">2</WexPagination.Link>
          </WexPagination.Item>
        </WexPagination.Content>
      </WexPagination>
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});

