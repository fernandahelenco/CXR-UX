/**
 * WexTextarea Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { createRef } from "react";
import { WexTextarea } from "@/components/wex";

describe("WexTextarea", () => {
  it("renders without crashing", () => {
    render(<WexTextarea />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexTextarea className="custom-class" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<WexTextarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("accepts placeholder", () => {
    render(<WexTextarea placeholder="Enter description..." />);
    expect(screen.getByPlaceholderText("Enter description...")).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(<WexTextarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("accepts rows prop", () => {
    render(<WexTextarea rows={5} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "5");
  });
});

