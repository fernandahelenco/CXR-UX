/**
 * WexSonner (Toaster) Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexToaster } from "@/components/wex";

describe("WexToaster", () => {
  it("renders without crashing", () => {
    render(<WexToaster data-testid="toaster" />);
    // Toaster renders as a section element
    expect(document.querySelector("section")).toBeInTheDocument();
  });
});

