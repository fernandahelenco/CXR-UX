/**
 * WexDialog Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexDialog, WexButton } from "@/components/wex";

describe("WexDialog", () => {
  it("renders trigger without crashing", () => {
    render(
      <WexDialog>
        <WexDialog.Trigger asChild>
          <WexButton>Open Dialog</WexButton>
        </WexDialog.Trigger>
        <WexDialog.Content>
          <WexDialog.Header>
            <WexDialog.Title>Dialog Title</WexDialog.Title>
          </WexDialog.Header>
        </WexDialog.Content>
      </WexDialog>
    );
    expect(screen.getByText("Open Dialog")).toBeInTheDocument();
  });

  it("shows dialog content when open", () => {
    render(
      <WexDialog open>
        <WexDialog.Content>
          <WexDialog.Header>
            <WexDialog.Title>Test Dialog</WexDialog.Title>
            <WexDialog.Description>Dialog description text</WexDialog.Description>
          </WexDialog.Header>
        </WexDialog.Content>
      </WexDialog>
    );
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("Dialog description text")).toBeInTheDocument();
  });

  it("renders footer", () => {
    render(
      <WexDialog open>
        <WexDialog.Content>
          <WexDialog.Footer>Footer Content</WexDialog.Footer>
        </WexDialog.Content>
      </WexDialog>
    );
    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });
});

