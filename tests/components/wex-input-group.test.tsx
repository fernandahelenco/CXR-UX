/**
 * WexInputGroup Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexInputGroup, WexInput } from "@/components/wex";

describe("WexInputGroup", () => {
  it("renders without crashing", () => {
    render(
      <WexInputGroup>
        <WexInputGroup.Addon>$</WexInputGroup.Addon>
        <WexInput placeholder="Amount" />
      </WexInputGroup>
    );
    expect(screen.getByText("$")).toBeInTheDocument();
  });

  it("renders with addon", () => {
    render(
      <WexInputGroup>
        <WexInputGroup.Addon>https://</WexInputGroup.Addon>
        <WexInput placeholder="website.com" />
      </WexInputGroup>
    );
    expect(screen.getByText("https://")).toBeInTheDocument();
  });
});

