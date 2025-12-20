/**
 * WexSheet Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexSheet, WexButton } from "@/components/wex";

describe("WexSheet", () => {
  it("renders trigger without crashing", () => {
    render(
      <WexSheet>
        <WexSheet.Trigger asChild>
          <WexButton>Open Sheet</WexButton>
        </WexSheet.Trigger>
        <WexSheet.Content>
          <WexSheet.Header>
            <WexSheet.Title>Sheet Title</WexSheet.Title>
          </WexSheet.Header>
        </WexSheet.Content>
      </WexSheet>
    );
    expect(screen.getByText("Open Sheet")).toBeInTheDocument();
  });

  it("shows content when open", () => {
    render(
      <WexSheet open>
        <WexSheet.Content>
          <WexSheet.Header>
            <WexSheet.Title>Test Sheet</WexSheet.Title>
            <WexSheet.Description>Sheet description</WexSheet.Description>
          </WexSheet.Header>
        </WexSheet.Content>
      </WexSheet>
    );
    expect(screen.getByText("Test Sheet")).toBeInTheDocument();
    expect(screen.getByText("Sheet description")).toBeInTheDocument();
  });
});

