/**
 * WexAlert Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexAlert } from "@/components/wex";

describe("WexAlert", () => {
  it("renders without crashing", () => {
    render(<WexAlert>Alert content</WexAlert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexAlert className="custom-class">Alert</WexAlert>);
    expect(screen.getByRole("alert")).toHaveClass("custom-class");
  });

  it("renders with default variant", () => {
    render(<WexAlert>Default</WexAlert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders with destructive variant", () => {
    render(<WexAlert variant="destructive">Destructive</WexAlert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});

describe("WexAlert.Title", () => {
  it("renders without crashing", () => {
    render(
      <WexAlert>
        <WexAlert.Title>Alert Title</WexAlert.Title>
      </WexAlert>
    );
    expect(screen.getByText("Alert Title")).toBeInTheDocument();
  });
});

describe("WexAlert.Description", () => {
  it("renders without crashing", () => {
    render(
      <WexAlert>
        <WexAlert.Description>Alert description</WexAlert.Description>
      </WexAlert>
    );
    expect(screen.getByText("Alert description")).toBeInTheDocument();
  });
});

describe("WexAlert compound structure", () => {
  it("renders complete alert", () => {
    render(
      <WexAlert>
        <WexAlert.Title>Warning</WexAlert.Title>
        <WexAlert.Description>This is a warning message.</WexAlert.Description>
      </WexAlert>
    );

    expect(screen.getByText("Warning")).toBeInTheDocument();
    expect(screen.getByText("This is a warning message.")).toBeInTheDocument();
  });
});

