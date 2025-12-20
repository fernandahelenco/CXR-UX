/**
 * WexSelect Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexSelect } from "@/components/wex";

describe("WexSelect", () => {
  it("renders trigger without crashing", () => {
    render(
      <WexSelect>
        <WexSelect.Trigger>
          <WexSelect.Value placeholder="Select option" />
        </WexSelect.Trigger>
        <WexSelect.Content>
          <WexSelect.Item value="1">Option 1</WexSelect.Item>
          <WexSelect.Item value="2">Option 2</WexSelect.Item>
        </WexSelect.Content>
      </WexSelect>
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows placeholder", () => {
    render(
      <WexSelect>
        <WexSelect.Trigger>
          <WexSelect.Value placeholder="Choose..." />
        </WexSelect.Trigger>
        <WexSelect.Content>
          <WexSelect.Item value="1">Option</WexSelect.Item>
        </WexSelect.Content>
      </WexSelect>
    );
    expect(screen.getByText("Choose...")).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(
      <WexSelect disabled>
        <WexSelect.Trigger>
          <WexSelect.Value placeholder="Disabled" />
        </WexSelect.Trigger>
        <WexSelect.Content>
          <WexSelect.Item value="1">Option</WexSelect.Item>
        </WexSelect.Content>
      </WexSelect>
    );
    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});

