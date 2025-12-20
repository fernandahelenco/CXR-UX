/**
 * WexCard Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { createRef } from "react";
import { WexCard } from "@/components/wex";

describe("WexCard", () => {
  it("renders without crashing", () => {
    render(<WexCard>Card content</WexCard>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexCard className="custom-class">Content</WexCard>);
    const card = screen.getByText("Content").closest("div");
    expect(card).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = createRef<HTMLDivElement>();
    render(<WexCard ref={ref}>Content</WexCard>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("WexCard.Header", () => {
  it("renders without crashing", () => {
    render(<WexCard.Header>Header</WexCard.Header>);
    expect(screen.getByText("Header")).toBeInTheDocument();
  });
});

describe("WexCard.Title", () => {
  it("renders without crashing", () => {
    render(<WexCard.Title>Title</WexCard.Title>);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});

describe("WexCard.Description", () => {
  it("renders without crashing", () => {
    render(<WexCard.Description>Description</WexCard.Description>);
    expect(screen.getByText("Description")).toBeInTheDocument();
  });
});

describe("WexCard.Content", () => {
  it("renders without crashing", () => {
    render(<WexCard.Content>Content</WexCard.Content>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});

describe("WexCard.Footer", () => {
  it("renders without crashing", () => {
    render(<WexCard.Footer>Footer</WexCard.Footer>);
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});

describe("WexCard compound structure", () => {
  it("renders complete card structure", () => {
    render(
      <WexCard>
        <WexCard.Header>
          <WexCard.Title>Card Title</WexCard.Title>
          <WexCard.Description>Card description text</WexCard.Description>
        </WexCard.Header>
        <WexCard.Content>Main content here</WexCard.Content>
        <WexCard.Footer>Footer actions</WexCard.Footer>
      </WexCard>
    );

    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card description text")).toBeInTheDocument();
    expect(screen.getByText("Main content here")).toBeInTheDocument();
    expect(screen.getByText("Footer actions")).toBeInTheDocument();
  });
});

