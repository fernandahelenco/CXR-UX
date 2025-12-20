/**
 * WexKbd Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexKbd } from "@/components/wex";

describe("WexKbd", () => {
  it("renders without crashing", () => {
    render(<WexKbd>Ctrl</WexKbd>);
    expect(screen.getByText("Ctrl")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexKbd className="custom-class">K</WexKbd>);
    expect(screen.getByText("K")).toHaveClass("custom-class");
  });

  it("renders multiple keys", () => {
    render(
      <>
        <WexKbd>Cmd</WexKbd>
        <WexKbd>K</WexKbd>
      </>
    );
    expect(screen.getByText("Cmd")).toBeInTheDocument();
    expect(screen.getByText("K")).toBeInTheDocument();
  });
});

