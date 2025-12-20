/**
 * WexField Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexField, WexInput } from "@/components/wex";

describe("WexField", () => {
  it("renders without crashing", () => {
    render(
      <WexField>
        <WexField.Label>Email</WexField.Label>
        <WexInput />
      </WexField>
    );
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders with description", () => {
    render(
      <WexField>
        <WexField.Label>Username</WexField.Label>
        <WexInput />
        <WexField.Description>Enter your username</WexField.Description>
      </WexField>
    );
    expect(screen.getByText("Enter your username")).toBeInTheDocument();
  });

  it("renders with error message", () => {
    render(
      <WexField>
        <WexField.Label>Password</WexField.Label>
        <WexInput />
        <WexField.Error>Password is required</WexField.Error>
      </WexField>
    );
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });
});

