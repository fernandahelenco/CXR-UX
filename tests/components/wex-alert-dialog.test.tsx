/**
 * WexAlertDialog Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexAlertDialog, WexButton } from "@/components/wex";

describe("WexAlertDialog", () => {
  it("renders trigger without crashing", () => {
    render(
      <WexAlertDialog>
        <WexAlertDialog.Trigger asChild>
          <WexButton>Delete</WexButton>
        </WexAlertDialog.Trigger>
        <WexAlertDialog.Content>
          <WexAlertDialog.Header>
            <WexAlertDialog.Title>Are you sure?</WexAlertDialog.Title>
          </WexAlertDialog.Header>
        </WexAlertDialog.Content>
      </WexAlertDialog>
    );
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("shows content when open", () => {
    render(
      <WexAlertDialog open>
        <WexAlertDialog.Content>
          <WexAlertDialog.Header>
            <WexAlertDialog.Title>Confirm Action</WexAlertDialog.Title>
            <WexAlertDialog.Description>This action cannot be undone.</WexAlertDialog.Description>
          </WexAlertDialog.Header>
          <WexAlertDialog.Footer>
            <WexAlertDialog.Cancel>Cancel</WexAlertDialog.Cancel>
            <WexAlertDialog.Action>Continue</WexAlertDialog.Action>
          </WexAlertDialog.Footer>
        </WexAlertDialog.Content>
      </WexAlertDialog>
    );
    expect(screen.getByText("Confirm Action")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });
});

