import complianceData from "@/docs/registry/compliance.json";

/**
 * Mode-specific compliance result
 */
export interface ModeComplianceResult {
  /** Status: pass | partial | fail | pending | no_examples */
  status: "pass" | "partial" | "fail" | "pending" | "no_examples";
  /** WCAG level achieved (signal only, not certification) */
  levelAchieved: "A" | "AA" | "AAA" | null;
  /** Number of violations found */
  violations: number;
  /** Array of axe rule IDs that failed */
  issues: string[];
  /** Number of example containers found on the page */
  examplesFound: number;
}

/**
 * Compliance result from axe-core testing
 * 
 * SCOPING: Tests are scoped to component examples only.
 * Docs UI (sidebar, headers, guidance text) is NOT included.
 * 
 * MODES: Tests run in both light and dark modes.
 */
export interface ComplianceResult {
  /** Combined status: pass | partial | fail | pending | no_examples */
  status: "pass" | "partial" | "fail" | "pending" | "no_examples";
  /** Combined WCAG level achieved (signal only, not certification) */
  levelAchieved: "A" | "AA" | "AAA" | null;
  /** Total number of violations found (both modes combined) */
  violations: number | null;
  /** Unique array of axe rule IDs that failed across both modes */
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
  /** Mode-specific results (new in dual-mode testing) */
  modes?: {
    light: ModeComplianceResult | null;
    dark: ModeComplianceResult | null;
  };
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
 * 
 * // Access mode-specific results
 * if (compliance?.modes?.dark?.status === "fail") {
 *   // Dark mode has issues
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

/**
 * Get mode-specific compliance result
 * 
 * @param registryKey - The component's registry key
 * @param mode - "light" or "dark"
 * @returns ModeComplianceResult or null if not found
 */
export function useA11yComplianceForMode(
  registryKey: string, 
  mode: "light" | "dark"
): ModeComplianceResult | null {
  const compliance = useA11yCompliance(registryKey);
  
  if (!compliance?.modes) {
    return null;
  }
  
  return compliance.modes[mode] ?? null;
}
