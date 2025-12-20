/**
 * Tests for the cn() utility function
 * 
 * cn() merges Tailwind classes using clsx + tailwind-merge
 * - Combines multiple class strings
 * - Handles conditional classes
 * - Resolves Tailwind conflicts (last wins)
 */

import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("merges multiple class strings", () => {
    const result = cn("px-4", "py-2", "text-sm");
    expect(result).toBe("px-4 py-2 text-sm");
  });

  it("handles empty inputs", () => {
    expect(cn()).toBe("");
    expect(cn("")).toBe("");
    expect(cn(null, undefined)).toBe("");
  });

  it("handles conditional classes", () => {
    const isActive = true;
    const isDisabled = false;
    
    const result = cn(
      "base-class",
      isActive && "active-class",
      isDisabled && "disabled-class"
    );
    
    expect(result).toBe("base-class active-class");
    expect(result).not.toContain("disabled-class");
  });

  it("resolves Tailwind conflicts (last wins)", () => {
    // padding conflict
    expect(cn("p-4", "p-2")).toBe("p-2");
    
    // margin conflict
    expect(cn("m-2", "m-4")).toBe("m-4");
    
    // text size conflict
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("merges partial conflicts correctly", () => {
    // px and py are not conflicting
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
    
    // px-4 and p-2: p-2 sets all padding, overrides px-4
    expect(cn("px-4", "p-2")).toBe("p-2");
  });

  it("handles object syntax from clsx", () => {
    const result = cn({
      "bg-primary": true,
      "text-white": true,
      "opacity-50": false,
    });
    
    expect(result).toBe("bg-primary text-white");
    expect(result).not.toContain("opacity-50");
  });

  it("handles array syntax", () => {
    const result = cn(["px-4", "py-2"], "text-sm");
    expect(result).toBe("px-4 py-2 text-sm");
  });

  it("preserves non-conflicting classes", () => {
    const result = cn(
      "flex items-center justify-between",
      "p-4 rounded-lg",
      "bg-card text-foreground"
    );
    
    expect(result).toContain("flex");
    expect(result).toContain("items-center");
    expect(result).toContain("justify-between");
    expect(result).toContain("p-4");
    expect(result).toContain("rounded-lg");
    expect(result).toContain("bg-card");
    expect(result).toContain("text-foreground");
  });
});

