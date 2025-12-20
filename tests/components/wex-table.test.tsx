/**
 * WexTable Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexTable } from "@/components/wex";

describe("WexTable", () => {
  it("renders without crashing", () => {
    render(
      <WexTable>
        <WexTable.Header>
          <WexTable.Row>
            <WexTable.Head>Name</WexTable.Head>
            <WexTable.Head>Value</WexTable.Head>
          </WexTable.Row>
        </WexTable.Header>
        <WexTable.Body>
          <WexTable.Row>
            <WexTable.Cell>Item 1</WexTable.Cell>
            <WexTable.Cell>100</WexTable.Cell>
          </WexTable.Row>
        </WexTable.Body>
      </WexTable>
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders header and body", () => {
    render(
      <WexTable>
        <WexTable.Header>
          <WexTable.Row>
            <WexTable.Head>Column</WexTable.Head>
          </WexTable.Row>
        </WexTable.Header>
        <WexTable.Body>
          <WexTable.Row>
            <WexTable.Cell>Data</WexTable.Cell>
          </WexTable.Row>
        </WexTable.Body>
      </WexTable>
    );
    expect(screen.getByText("Column")).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
  });

  it("renders caption", () => {
    render(
      <WexTable>
        <WexTable.Caption>Table Caption</WexTable.Caption>
        <WexTable.Body>
          <WexTable.Row>
            <WexTable.Cell>Cell</WexTable.Cell>
          </WexTable.Row>
        </WexTable.Body>
      </WexTable>
    );
    expect(screen.getByText("Table Caption")).toBeInTheDocument();
  });

  it("renders footer", () => {
    render(
      <WexTable>
        <WexTable.Body>
          <WexTable.Row>
            <WexTable.Cell>Cell</WexTable.Cell>
          </WexTable.Row>
        </WexTable.Body>
        <WexTable.Footer>
          <WexTable.Row>
            <WexTable.Cell>Footer</WexTable.Cell>
          </WexTable.Row>
        </WexTable.Footer>
      </WexTable>
    );
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});

