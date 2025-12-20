/**
 * WexInputOTP Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexInputOTP } from "@/components/wex";

describe("WexInputOTP", () => {
  it("renders without crashing", () => {
    render(
      <WexInputOTP maxLength={6}>
        <WexInputOTP.Group>
          <WexInputOTP.Slot index={0} />
          <WexInputOTP.Slot index={1} />
          <WexInputOTP.Slot index={2} />
        </WexInputOTP.Group>
      </WexInputOTP>
    );
    // OTP input should be in the document
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});

