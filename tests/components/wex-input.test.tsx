/**
 * WexInput Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { createRef } from "react";
import { WexInput } from "@/components/wex";

describe("WexInput", () => {
  it("renders without crashing", () => {
    render(<WexInput />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexInput className="custom-class" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = createRef<HTMLInputElement>();
    render(<WexInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("accepts placeholder", () => {
    render(<WexInput placeholder="Enter text..." />);
    expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(<WexInput disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("accepts type prop", () => {
    render(<WexInput type="email" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
  });

  it("accepts value and onChange", () => {
    let value = "";
    render(
      <WexInput
        value={value}
        onChange={(e) => (value = e.target.value)}
      />
    );
    expect(screen.getByRole("textbox")).toHaveValue("");
  });
});

