import * as React from "react";
import { Check, AlertTriangle, X, HelpCircle } from "lucide-react";
import { useA11yCompliance, type ComplianceResult } from "@/docs/hooks/useA11yCompliance";
import { WexTooltip } from "@/components/wex";

/**
 * A11ySignalBadge - Displays accessibility test signal (NOT certification)
 *
 * This badge shows the result of automated axe-core testing on the
 * documented examples for a component. It is NOT a compliance certification.
 *
 * IMPORTANT FRAMING:
 * - This is a TEST RESULT / SIGNAL, not a compliance certification
 * - Automated tools cannot verify all WCAG criteria
 * - The badge indicates "we ran tests and found X violations"
 *
 * @example
 * ```tsx
 * <A11ySignalBadge registryKey="button" />
 * ```
 */

interface A11ySignalBadgeProps {
  /** Registry key that corresponds to the documented examples */
  registryKey: string;
}

export function A11ySignalBadge({ registryKey }: A11ySignalBadgeProps) {
  const compliance = useA11yCompliance(registryKey);

  if (!compliance) {
    return <NotTestedBadge />;
  }

  return <BadgeWithTooltip compliance={compliance} />;
}

function NotTestedBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium tracking-wide rounded border border-border bg-muted text-muted-foreground">
      <HelpCircle className="h-3 w-3" />
      A11y: Not tested
    </span>
  );
}

interface BadgeWithTooltipProps {
  compliance: ComplianceResult;
}

function BadgeWithTooltip({ compliance }: BadgeWithTooltipProps) {
  const { status, levelAchieved, violations, testedAt, issues, subject, examplesFound, scope } = compliance;

  // Determine badge appearance based on status
  const config = getBadgeConfig(status, levelAchieved);

  // Format last tested date
  const testedDate = testedAt ? new Date(testedAt).toLocaleDateString() : "Never";

  return (
    <WexTooltip.Provider>
      <WexTooltip>
        <WexTooltip.Trigger asChild>
          <span className={config.className}>
            {config.icon}
            {config.label}
          </span>
        </WexTooltip.Trigger>
        <WexTooltip.Content side="bottom" align="start" className="max-w-xs">
          <TooltipContent
            subject={subject}
            status={status}
            violations={violations}
            testedDate={testedDate}
            issues={issues}
            levelAchieved={levelAchieved}
            examplesFound={examplesFound}
            scope={scope}
          />
        </WexTooltip.Content>
      </WexTooltip>
    </WexTooltip.Provider>
  );
}

interface TooltipContentProps {
  subject: string;
  status: string;
  violations: number | null;
  testedDate: string;
  issues: string[];
  levelAchieved: string | null;
  examplesFound: number;
  scope: string;
}

function TooltipContent({
  subject,
  status,
  violations,
  testedDate,
  issues,
  levelAchieved,
  examplesFound,
  scope,
}: TooltipContentProps) {
  const isNoExamples = status === "no_examples";
  
  return (
    <div className="space-y-2 text-xs">
      <p className="font-semibold text-foreground">Accessibility Test Signal</p>
      <p className="text-muted-foreground">
        {isNoExamples 
          ? "No component examples found on this page. Check that ExampleCard components have data-testid attributes."
          : "Automated axe-core results for component examples only. Docs UI is excluded. This is a test signal, not a compliance certification."
        }
      </p>
      <div className="border-t border-border pt-2 space-y-1">
        <p><span className="text-muted-foreground">Subject:</span> {subject}</p>
        <p><span className="text-muted-foreground">Scope:</span> {scope}</p>
        <p><span className="text-muted-foreground">Examples found:</span> {examplesFound}</p>
        <p><span className="text-muted-foreground">Status:</span> {status}</p>
        {levelAchieved && (
          <p><span className="text-muted-foreground">Level:</span> {levelAchieved} (target, not certified)</p>
        )}
        {!isNoExamples && (
          <p><span className="text-muted-foreground">Violations:</span> {violations ?? "N/A"}</p>
        )}
        <p><span className="text-muted-foreground">Last tested:</span> {testedDate}</p>
        {issues.length > 0 && (
          <div>
            <span className="text-muted-foreground">Issues:</span>
            <ul className="list-disc list-inside ml-2 mt-1">
              {issues.slice(0, 5).map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
              {issues.length > 5 && <li>...and {issues.length - 5} more</li>}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

interface BadgeConfig {
  label: string;
  className: string;
  icon: React.ReactNode;
}

function getBadgeConfig(
  status: ComplianceResult["status"],
  levelAchieved: string | null
): BadgeConfig {
  const baseClasses = "inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium tracking-wide rounded border cursor-help";

  switch (status) {
    case "pass":
      return {
        label: `A11y: Pass${levelAchieved ? ` (${levelAchieved})` : ""}`,
        className: `${baseClasses} border-success/50 bg-success/10 text-success`,
        icon: <Check className="h-3 w-3" />,
      };
    case "partial":
      return {
        label: `A11y: Partial${levelAchieved ? ` (${levelAchieved})` : ""}`,
        className: `${baseClasses} border-warning/50 bg-warning/10 text-warning-foreground`,
        icon: <AlertTriangle className="h-3 w-3" />,
      };
    case "fail":
      return {
        label: "A11y: Fail",
        className: `${baseClasses} border-destructive/50 bg-destructive/10 text-destructive`,
        icon: <X className="h-3 w-3" />,
      };
    case "no_examples":
      return {
        label: "A11y: No Examples",
        className: `${baseClasses} border-warning/50 bg-warning/10 text-warning-foreground`,
        icon: <AlertTriangle className="h-3 w-3" />,
      };
    case "pending":
    default:
      return {
        label: "A11y: Pending",
        className: `${baseClasses} border-border bg-muted text-muted-foreground`,
        icon: <HelpCircle className="h-3 w-3" />,
      };
  }
}
