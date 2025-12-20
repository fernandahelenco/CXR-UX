/**
 * WexForm Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useForm } from "react-hook-form";
import { WexForm, WexInput, WexButton } from "@/components/wex";

function TestForm() {
  const form = useForm({
    defaultValues: { email: "" },
  });

  return (
    <WexForm {...form}>
      <form>
        <WexForm.Field
          control={form.control}
          name="email"
          render={({ field }) => (
            <WexForm.Item>
              <WexForm.Label>Email</WexForm.Label>
              <WexForm.Control>
                <WexInput {...field} />
              </WexForm.Control>
              <WexForm.Message />
            </WexForm.Item>
          )}
        />
        <WexButton type="submit">Submit</WexButton>
      </form>
    </WexForm>
  );
}

describe("WexForm", () => {
  it("renders form without crashing", () => {
    render(<TestForm />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<TestForm />);
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });
});

