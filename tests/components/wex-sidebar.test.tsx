/**
 * WexSidebar Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexSidebar } from "@/components/wex";

describe("WexSidebar", () => {
  it("renders provider without crashing", () => {
    render(
      <WexSidebar.Provider>
        <div data-testid="content">Content</div>
      </WexSidebar.Provider>
    );
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });
});

