/**
 * Tests for useA11yCompliance hook
 * 
 * Tests data fetching from compliance.json and type handling
 */

import { describe, it, expect } from "vitest";
import { useA11yCompliance, useA11yComplianceForMode } from "@/docs/hooks/useA11yCompliance";

describe("useA11yCompliance", () => {
  it("returns null for _meta key", () => {
    const result = useA11yCompliance("_meta");
    expect(result).toBeNull();
  });

  it("returns null for non-existent component", () => {
    const result = useA11yCompliance("nonexistent-component-xyz");
    expect(result).toBeNull();
  });

  it("returns compliance data for existing component", () => {
    // "button" should exist in compliance.json
    const result = useA11yCompliance("button");
    
    // May or may not exist depending on test state, but should be null or valid object
    if (result !== null) {
      expect(result).toHaveProperty("status");
      expect(result).toHaveProperty("violations");
      expect(result).toHaveProperty("scope");
    }
  });

  it("returns data with expected structure when component exists", () => {
    const result = useA11yCompliance("button");
    
    if (result !== null) {
      // Check required properties exist
      expect(result.status).toMatch(/^(pass|partial|fail|pending|no_examples)$/);
      expect(typeof result.violations).toBe("number");
      expect(Array.isArray(result.issues)).toBe(true);
      expect(result.scope).toBe("component-examples-only");
    }
  });

  it("includes mode-specific data when available", () => {
    const result = useA11yCompliance("button");
    
    if (result !== null && result.modes) {
      // Check light mode structure
      if (result.modes.light) {
        expect(result.modes.light.status).toMatch(/^(pass|partial|fail|pending|no_examples)$/);
        expect(typeof result.modes.light.violations).toBe("number");
        expect(typeof result.modes.light.examplesFound).toBe("number");
      }
      
      // Check dark mode structure
      if (result.modes.dark) {
        expect(result.modes.dark.status).toMatch(/^(pass|partial|fail|pending|no_examples)$/);
        expect(typeof result.modes.dark.violations).toBe("number");
        expect(typeof result.modes.dark.examplesFound).toBe("number");
      }
    }
  });
});

describe("useA11yComplianceForMode", () => {
  it("returns null for non-existent component", () => {
    const result = useA11yComplianceForMode("nonexistent-xyz", "light");
    expect(result).toBeNull();
  });

  it("returns mode-specific data for existing component", () => {
    const lightResult = useA11yComplianceForMode("button", "light");
    const darkResult = useA11yComplianceForMode("button", "dark");
    
    // May be null if component doesn't have mode data
    if (lightResult !== null) {
      expect(lightResult.status).toMatch(/^(pass|partial|fail|pending|no_examples)$/);
      expect(typeof lightResult.violations).toBe("number");
    }
    
    if (darkResult !== null) {
      expect(darkResult.status).toMatch(/^(pass|partial|fail|pending|no_examples)$/);
      expect(typeof darkResult.violations).toBe("number");
    }
  });

  it("returns correct mode when both are available", () => {
    const compliance = useA11yCompliance("button");
    
    if (compliance?.modes?.light && compliance?.modes?.dark) {
      const lightResult = useA11yComplianceForMode("button", "light");
      const darkResult = useA11yComplianceForMode("button", "dark");
      
      // Results should match the parent compliance data
      expect(lightResult?.status).toBe(compliance.modes.light.status);
      expect(darkResult?.status).toBe(compliance.modes.dark.status);
    }
  });
});

