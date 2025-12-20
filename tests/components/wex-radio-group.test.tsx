/**
 * WexRadioGroup Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexRadioGroup } from "@/components/wex";

describe("WexRadioGroup", () => {
  it("renders without crashing", () => {
    render(
      <WexRadioGroup defaultValue="option-1">
        <WexRadioGroup.Item value="option-1" id="option-1" />
        <WexRadioGroup.Item value="option-2" id="option-2" />
      </WexRadioGroup>
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("renders multiple radio items", () => {
    render(
      <WexRadioGroup defaultValue="a">
        <WexRadioGroup.Item value="a" id="a" />
        <WexRadioGroup.Item value="b" id="b" />
        <WexRadioGroup.Item value="c" id="c" />
      </WexRadioGroup>
    );
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
  });

  it("has default value selected", () => {
    render(
      <WexRadioGroup defaultValue="selected">
        <WexRadioGroup.Item value="selected" id="selected" />
        <WexRadioGroup.Item value="other" id="other" />
      </WexRadioGroup>
    );
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).toBeChecked();
  });
});

