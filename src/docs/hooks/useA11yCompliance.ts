import complianceData from "@/docs/registry/compliance.json";

/**
 * Compliance result from axe-core testing
 * 
 * SCOPING: Tests are scoped to component examples only.
 * Docs UI (sidebar, headers, guidance text) is NOT included.
 */
export interface ComplianceResult {
  /** Status: pass | partial | fail | pending | no_examples */
  status: "pass" | "partial" | "fail" | "pending" | "no_examples";
  /** WCAG level achieved (signal only, not certification) */
  levelAchieved: "A" | "AA" | "AAA" | null;
  /** Number of violations found */
  violations: number | null;
  /** Array of axe rule IDs that failed */
  issues: string[];
  /** ISO timestamp of when the test was run */
  testedAt: string | null;
  /** Test scope - should always be "component-examples-only" */
  scope: string;
  /** Number of example containers found on the page */
  examplesFound: number;
  /** Names/IDs of examples that were tested (from data-example-id) */
  scenariosTested: string[];
  /** Human-readable description of what was tested */
  subject: string;
}

/**
 * Hook to get a11y compliance data for a component
 *
 * @param registryKey - The component's registry key (e.g., "button", "accordion")
 * @returns ComplianceResult or null if not found
 *
 * @example
 * ```tsx
 * const compliance = useA11yCompliance("button");
 * if (compliance?.status === "pass") {
 *   // Show green badge
 * }
 * ```
 */
export function useA11yCompliance(registryKey: string): ComplianceResult | null {
  // Skip metadata key
  if (registryKey === "_meta") {
    return null;
  }

  const data = complianceData as Record<string, ComplianceResult | unknown>;
  const result = data[registryKey];

  if (!result || typeof result !== "object") {
    return null;
  }

  return result as ComplianceResult;
}
