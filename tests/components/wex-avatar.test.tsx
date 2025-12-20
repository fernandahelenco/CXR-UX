/**
 * WexAvatar Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexAvatar } from "@/components/wex";

describe("WexAvatar", () => {
  it("renders without crashing", () => {
    render(<WexAvatar data-testid="avatar" />);
    expect(screen.getByTestId("avatar")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexAvatar className="custom-class" data-testid="avatar" />);
    expect(screen.getByTestId("avatar")).toHaveClass("custom-class");
  });
});

describe("WexAvatar.Fallback", () => {
  it("renders fallback text", () => {
    render(
      <WexAvatar>
        <WexAvatar.Fallback>JD</WexAvatar.Fallback>
      </WexAvatar>
    );
    expect(screen.getByText("JD")).toBeInTheDocument();
  });
});

