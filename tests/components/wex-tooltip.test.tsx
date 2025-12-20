/**
 * WexTooltip Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexTooltip, WexButton } from "@/components/wex";

describe("WexTooltip", () => {
  it("renders trigger without crashing", () => {
    render(
      <WexTooltip.Provider>
        <WexTooltip>
          <WexTooltip.Trigger asChild>
            <WexButton>Hover me</WexButton>
          </WexTooltip.Trigger>
          <WexTooltip.Content>Tooltip text</WexTooltip.Content>
        </WexTooltip>
      </WexTooltip.Provider>
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });
});

