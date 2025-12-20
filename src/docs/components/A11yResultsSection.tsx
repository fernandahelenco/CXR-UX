import * as React from "react";
import { Link } from "react-router-dom";
import { Check, AlertTriangle, X, HelpCircle, ArrowRight, Sun, Moon } from "lucide-react";
import { useA11yCompliance, type ComplianceResult, type ModeComplianceResult } from "@/docs/hooks/useA11yCompliance";

/**
 * A11yResultsSection - Lightweight accessibility results summary for component pages
 *
 * Shows a summary of accessibility test results with a link to the full dashboard.
 * Now displays results for both light and dark modes.
 * Uses "signal" language only - this is NOT a compliance certification.
 */

interface A11yResultsSectionProps {
  /** Registry key for the component */
  registryKey: string;
}

export function A11yResultsSection({ registryKey }: A11yResultsSectionProps) {
  const compliance = useA11yCompliance(registryKey);

  if (!compliance) {
    return <NotTestedSection registryKey={registryKey} />;
  }

  return <ResultsSection compliance={compliance} registryKey={registryKey} />;
}

interface NotTestedSectionProps {
  registryKey: string;
}

function NotTestedSection({ registryKey }: NotTestedSectionProps) {
  return (
    <section className="rounded-lg border border-border bg-card p-4 mb-8">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-muted">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground mb-1">
            Accessibility Results
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            No accessibility test results available for this component.
          </p>
          <div className="text-xs text-muted-foreground bg-muted/50 rounded p-2 mb-3 font-mono">
            npm run test:a11y
          </div>
          <Link 
            to={`/accessibility?component=${registryKey}`}
            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          >
            View accessibility dashboard
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ResultsSectionProps {
  compliance: ComplianceResult;
  registryKey: string;
}

function ResultsSection({ compliance, registryKey }: ResultsSectionProps) {
  const { status, levelAchieved, violations, testedAt, issues, modes } = compliance;

  const statusConfig = getStatusConfig(status);
  const testedDate = testedAt ? new Date(testedAt).toLocaleDateString() : "Never";
  
  // Show top 2 issues inline
  const topIssues = issues.slice(0, 2);
  const remainingIssuesCount = issues.length - topIssues.length;
  
  const hasModesData = modes && (modes.light || modes.dark);

  return (
    <section className="rounded-lg border border-border bg-card p-4 mb-8">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${statusConfig.bgClass}`}>
          {statusConfig.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-foreground">
              Accessibility Results
            </h3>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium tracking-wide rounded border ${statusConfig.badgeClass}`}>
              {statusConfig.label}
            </span>
          </div>

          {/* Mode-specific results */}
          {hasModesData && (
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              {modes?.light && (
                <ModeResultBadge mode="light" result={modes.light} />
              )}
              {modes?.dark && (
                <ModeResultBadge mode="dark" result={modes.dark} />
              )}
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-xs mt-2 mb-3">
            <div>
              <span className="text-muted-foreground">Combined:</span>{" "}
              <span className="text-foreground font-medium">{statusConfig.statusText}</span>
            </div>
            {levelAchieved && (
              <div>
                <span className="text-muted-foreground">Level:</span>{" "}
                <span className="text-foreground font-medium">{levelAchieved}</span>
              </div>
            )}
            <div>
              <span className="text-muted-foreground">Total violations:</span>{" "}
              <span className="text-foreground font-medium">{violations ?? 0}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Tested:</span>{" "}
              <span className="text-foreground font-medium">{testedDate}</span>
            </div>
          </div>

          {topIssues.length > 0 && (
            <div className="text-xs mb-3">
              <span className="text-muted-foreground">Top issues: </span>
              <span className="text-foreground">
                {topIssues.map((issue, i) => (
                  <React.Fragment key={issue}>
                    <code className="bg-muted px-1 rounded text-[10px]">{issue}</code>
                    {i < topIssues.length - 1 && ", "}
                  </React.Fragment>
                ))}
                {remainingIssuesCount > 0 && (
                  <span className="text-muted-foreground"> +{remainingIssuesCount} more</span>
                )}
              </span>
            </div>
          )}

          <p className="text-[10px] text-muted-foreground mb-3">
            Tests run in both light and dark modes. WCAG level mapping based on automated ruleset coverage. This is a test signal, not a compliance certification.
          </p>

          <Link 
            to={`/accessibility?component=${registryKey}`}
            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          >
            View full details
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ModeResultBadgeProps {
  mode: "light" | "dark";
  result: ModeComplianceResult;
}

function ModeResultBadge({ mode, result }: ModeResultBadgeProps) {
  const config = getModeStatusConfig(result.status);
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded ${config.bgClass}`}>
      {mode === "light" ? (
        <Sun className="h-3 w-3 text-muted-foreground" />
      ) : (
        <Moon className="h-3 w-3 text-muted-foreground" />
      )}
      <span className="capitalize text-muted-foreground">{mode}:</span>
      {config.icon}
      <span className={config.textClass}>{result.status.replace("_", " ")}</span>
      <span className="text-muted-foreground">({result.violations})</span>
    </span>
  );
}

function getModeStatusConfig(status: ModeComplianceResult["status"]) {
  switch (status) {
    case "pass":
      return {
        icon: <Check className="h-3 w-3 text-success" />,
        textClass: "text-success",
        bgClass: "bg-success/5",
      };
    case "partial":
      return {
        icon: <AlertTriangle className="h-3 w-3 text-warning" />,
        textClass: "text-warning",
        bgClass: "bg-warning/5",
      };
    case "fail":
      return {
        icon: <X className="h-3 w-3 text-destructive" />,
        textClass: "text-destructive",
        bgClass: "bg-destructive/5",
      };
    case "no_examples":
      return {
        icon: <AlertTriangle className="h-3 w-3 text-warning" />,
        textClass: "text-warning",
        bgClass: "bg-warning/5",
      };
    default:
      return {
        icon: <HelpCircle className="h-3 w-3 text-muted-foreground" />,
        textClass: "text-muted-foreground",
        bgClass: "bg-muted",
      };
  }
}

interface StatusConfig {
  label: string;
  statusText: string;
  icon: React.ReactNode;
  bgClass: string;
  badgeClass: string;
}

function getStatusConfig(status: ComplianceResult["status"]): StatusConfig {
  switch (status) {
    case "pass":
      return {
        label: "Pass",
        statusText: "Passing",
        icon: <Check className="h-4 w-4 text-success" />,
        bgClass: "bg-success/10",
        badgeClass: "border-success/50 bg-success/10 text-success",
      };
    case "partial":
      return {
        label: "Partial",
        statusText: "Partial",
        icon: <AlertTriangle className="h-4 w-4 text-warning" />,
        bgClass: "bg-warning/10",
        badgeClass: "border-warning/50 bg-warning/10 text-warning",
      };
    case "fail":
      return {
        label: "Fail",
        statusText: "Failing",
        icon: <X className="h-4 w-4 text-destructive" />,
        bgClass: "bg-destructive/10",
        badgeClass: "border-destructive/50 bg-destructive/10 text-destructive",
      };
    case "no_examples":
      return {
        label: "No Examples",
        statusText: "No examples found",
        icon: <AlertTriangle className="h-4 w-4 text-warning" />,
        bgClass: "bg-warning/10",
        badgeClass: "border-warning/50 bg-warning/10 text-warning",
      };
    case "pending":
    default:
      return {
        label: "Pending",
        statusText: "Pending",
        icon: <HelpCircle className="h-4 w-4 text-muted-foreground" />,
        bgClass: "bg-muted",
        badgeClass: "border-border bg-muted text-muted-foreground",
      };
  }
}
