import * as React from "react";
import { Check, AlertTriangle, X, HelpCircle, ChevronDown, ChevronUp, FlaskConical, Sun, Moon } from "lucide-react";
import { useA11yCompliance, useA11yExampleResults, type ComplianceResult } from "@/docs/hooks/useA11yCompliance";

/**
 * A11yResultsSection - Accessibility results summary for component pages
 *
 * Displays a compact summary of accessibility test results showing:
 * - Overall pass/fail status with light/dark mode indicators
 * - Contrast and ARIA check status
 * - Collapsible variant details
 * - Last tested date
 */

interface A11yResultsSectionProps {
  /** Registry key for the component */
  registryKey: string;
}

export function A11yResultsSection({ registryKey }: A11yResultsSectionProps) {
  const compliance = useA11yCompliance(registryKey);

  if (!compliance) {
    return <NotTestedSection />;
  }

  return <ResultsSection compliance={compliance} registryKey={registryKey} />;
}

function NotTestedSection() {
  return (
    <section className="rounded-lg border border-border bg-card p-4 mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">
          Accessibility
        </h3>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium tracking-wide rounded border border-border bg-muted text-muted-foreground">
          Not Tested
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-2">
        No accessibility test results available for this component.
      </p>
      <div className="text-xs text-muted-foreground bg-muted/50 rounded p-2 font-mono">
        npm run test:a11y
      </div>
    </section>
  );
}

interface ResultsSectionProps {
  compliance: ComplianceResult;
  registryKey: string;
}

function ResultsSection({ compliance, registryKey }: ResultsSectionProps) {
  const { status, violations, issues, testedAt, modes } = compliance;
  const [showVariants, setShowVariants] = React.useState(false);
  const exampleResults = useA11yExampleResults(registryKey);

  const statusConfig = getStatusConfig(status);
  
  // Mode-specific statuses
  const lightPassed = modes?.light?.status === "pass";
  const darkPassed = modes?.dark?.status === "pass";
  
  // Determine check statuses
  const hasContrastIssue = issues.includes("color-contrast");
  const hasAriaIssue = issues.some(issue => 
    issue.includes("aria") || 
    issue.includes("label") || 
    issue.includes("role") ||
    issue.includes("name")
  );
  
  const contrastPassed = !hasContrastIssue;
  const ariaPassed = !hasAriaIssue;
  
  // Count variants tested
  const variantsTested = exampleResults.length;
  const variantsPassing = exampleResults.filter(
    (e) => e.light?.status === "pass" && e.dark?.status === "pass"
  ).length;
  
  const hasExampleResults = exampleResults.length > 0;
  
  // Format date
  const testedDate = testedAt ? new Date(testedAt).toLocaleDateString() : null;

  return (
    <section className="rounded-lg border border-border bg-card overflow-hidden mb-8">
      {/* Header - compact with mode indicators */}
      <div className="flex items-center justify-between gap-3 p-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-foreground">Accessibility</h3>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded ${statusConfig.badgeClass}`}>
            {statusConfig.icon}
            {statusConfig.label}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Light mode indicator */}
          <span 
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] rounded ${
              lightPassed ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            }`}
            title={lightPassed ? "Light mode passes" : "Light mode has issues"}
          >
            <Sun className="h-3 w-3" />
            {lightPassed ? "✓" : "✗"}
          </span>
          {/* Dark mode indicator */}
          <span 
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] rounded ${
              darkPassed ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            }`}
            title={darkPassed ? "Dark mode passes" : "Dark mode has issues"}
          >
            <Moon className="h-3 w-3" />
            {darkPassed ? "✓" : "✗"}
          </span>
        </div>
      </div>

      {/* Checks and violations row */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-4">
          <CheckIndicator passed={contrastPassed} label="Contrast" />
          <CheckIndicator passed={ariaPassed} label="ARIA" />
        </div>
        <div className="text-sm">
          {(violations ?? 0) > 0 ? (
            <span className="text-destructive font-medium">{violations} violation{violations !== 1 ? 's' : ''}</span>
          ) : (
            <span className="text-success font-medium">No violations</span>
          )}
        </div>
      </div>

      {/* Variant details toggle */}
      {hasExampleResults && (
        <button
          onClick={() => setShowVariants(!showVariants)}
          className="w-full flex items-center justify-between p-3 text-xs text-muted-foreground hover:bg-muted/50 transition-colors"
        >
          <span>
            Show variant details ({variantsPassing}/{variantsTested} pass)
          </span>
          {showVariants ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      )}

      {/* Variant chips */}
      {showVariants && hasExampleResults && (
        <div className="px-3 pb-3 flex flex-wrap gap-2 border-t border-border pt-3">
          {exampleResults.map((result) => {
            const passed = result.light?.status === "pass" && result.dark?.status === "pass";
            return (
              <VariantChip 
                key={result.exampleId} 
                name={formatExampleId(result.exampleId)} 
                passed={passed} 
              />
            );
          })}
        </div>
      )}

      {/* Footer with date */}
      {testedDate && (
        <div className="px-3 py-2 bg-muted/30 border-t border-border text-[10px] text-muted-foreground flex items-center gap-1.5">
          <FlaskConical className="h-3 w-3" />
          Last tested: {testedDate}
        </div>
      )}
    </section>
  );
}

interface CheckIndicatorProps {
  passed: boolean;
  label: string;
}

function CheckIndicator({ passed, label }: CheckIndicatorProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm ${passed ? "text-success" : "text-destructive"}`}>
      {passed ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
      {label}
    </span>
  );
}

interface VariantChipProps {
  name: string;
  passed: boolean;
}

function VariantChip({ name, passed }: VariantChipProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
      passed 
        ? "bg-success/10 text-success" 
        : "bg-destructive/10 text-destructive"
    }`}>
      {passed ? (
        <Check className="h-3 w-3" />
      ) : (
        <X className="h-3 w-3" />
      )}
      {name}
    </span>
  );
}

/**
 * Format example ID for display
 * Converts "example-0" to "Example 1", or uses the actual ID if it's descriptive
 */
function formatExampleId(id: string): string {
  if (id.startsWith("example-")) {
    const num = parseInt(id.replace("example-", ""), 10);
    return `Example ${num + 1}`;
  }
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface StatusConfig {
  label: string;
  icon: React.ReactNode;
  badgeClass: string;
}

function getStatusConfig(status: ComplianceResult["status"]): StatusConfig {
  switch (status) {
    case "pass":
      return {
        label: "Pass",
        icon: <Check className="h-3.5 w-3.5" />,
        badgeClass: "border border-success/50 bg-success/10 text-success",
      };
    case "partial":
      return {
        label: "Partial",
        icon: <AlertTriangle className="h-3.5 w-3.5" />,
        badgeClass: "border border-warning/50 bg-warning/10 text-warning",
      };
    case "fail":
      return {
        label: "Fail",
        icon: <X className="h-3.5 w-3.5" />,
        badgeClass: "border border-destructive/50 bg-destructive/10 text-destructive",
      };
    case "no_examples":
      return {
        label: "No Examples",
        icon: <AlertTriangle className="h-3.5 w-3.5" />,
        badgeClass: "border border-warning/50 bg-warning/10 text-warning",
      };
    case "pending":
    default:
      return {
        label: "Pending",
        icon: <HelpCircle className="h-3.5 w-3.5" />,
        badgeClass: "border border-border bg-muted text-muted-foreground",
      };
  }
}
