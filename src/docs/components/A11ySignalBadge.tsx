import * as React from "react";
import { Link } from "react-router-dom";
import { Check, AlertTriangle, X, HelpCircle, Sun, Moon } from "lucide-react";
import { useA11yCompliance, type ComplianceResult, type ModeComplianceResult } from "@/docs/hooks/useA11yCompliance";
import { WexTooltip } from "@/components/wex";

/**
 * A11ySignalBadge - Displays accessibility test signal (NOT certification)
 *
 * This badge shows the result of automated axe-core testing on the
 * documented examples for a component. It is NOT a compliance certification.
 * 
 * Now shows results for both light and dark modes.
 *
 * IMPORTANT FRAMING:
 * - This is a TEST RESULT / SIGNAL, not a compliance certification
 * - Automated tools cannot verify all WCAG criteria
 * - The badge indicates "we ran tests and found X violations"
 *
 * @example
 * ```tsx
 * <A11ySignalBadge registryKey="button" />
 * <A11ySignalBadge registryKey="button" linkToDashboard={false} />
 * ```
 */

interface A11ySignalBadgeProps {
  /** Registry key that corresponds to the documented examples */
  registryKey: string;
  /** Whether to make the badge a link to the accessibility dashboard (default: true) */
  linkToDashboard?: boolean;
}

export function A11ySignalBadge({ registryKey, linkToDashboard = true }: A11ySignalBadgeProps) {
  const compliance = useA11yCompliance(registryKey);

  if (!compliance) {
    return <NotTestedBadge registryKey={registryKey} linkToDashboard={linkToDashboard} />;
  }

  return <BadgeWithTooltip compliance={compliance} registryKey={registryKey} linkToDashboard={linkToDashboard} />;
}

interface NotTestedBadgeProps {
  registryKey: string;
  linkToDashboard: boolean;
}

function NotTestedBadge({ registryKey, linkToDashboard }: NotTestedBadgeProps) {
  const badgeContent = (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium tracking-wide rounded border border-border bg-muted text-muted-foreground ${linkToDashboard ? "cursor-pointer" : ""}`}>
      <HelpCircle className="h-3 w-3" />
      A11y: Not tested
    </span>
  );

  if (linkToDashboard) {
    return (
      <Link 
        to={`/accessibility?component=${registryKey}`}
        className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {badgeContent}
      </Link>
    );
  }

  return badgeContent;
}

interface BadgeWithTooltipProps {
  compliance: ComplianceResult;
  registryKey: string;
  linkToDashboard: boolean;
}

function BadgeWithTooltip({ compliance, registryKey, linkToDashboard }: BadgeWithTooltipProps) {
  const { status, levelAchieved, testedAt, subject, examplesFound, scope, modes } = compliance;

  // Determine badge appearance based on combined status
  const config = getBadgeConfig(status, levelAchieved, linkToDashboard);

  // Format last tested date
  const testedDate = testedAt ? new Date(testedAt).toLocaleDateString() : "Never";

  const badgeElement = (
    <span className={config.className}>
      {config.icon}
      {config.label}
    </span>
  );

  const linkedBadge = linkToDashboard ? (
    <Link 
      to={`/accessibility?component=${registryKey}`}
      className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {badgeElement}
    </Link>
  ) : badgeElement;

  return (
    <WexTooltip.Provider>
      <WexTooltip>
        <WexTooltip.Trigger asChild>
          {linkedBadge}
        </WexTooltip.Trigger>
        <WexTooltip.Content side="bottom" align="start" className="max-w-sm">
          <TooltipContent
            subject={subject}
            status={status}
            testedDate={testedDate}
            levelAchieved={levelAchieved}
            examplesFound={examplesFound}
            scope={scope}
            linkToDashboard={linkToDashboard}
            modes={modes}
          />
        </WexTooltip.Content>
      </WexTooltip>
    </WexTooltip.Provider>
  );
}

interface TooltipContentProps {
  subject: string;
  status: string;
  testedDate: string;
  levelAchieved: string | null;
  examplesFound: number;
  scope: string;
  linkToDashboard: boolean;
  modes?: {
    light: ModeComplianceResult | null;
    dark: ModeComplianceResult | null;
  };
}

function TooltipContent({
  subject,
  status,
  testedDate,
  levelAchieved,
  examplesFound,
  scope,
  linkToDashboard,
  modes,
}: TooltipContentProps) {
  const isNoExamples = status === "no_examples";
  const hasModesData = modes && (modes.light || modes.dark);
  
  return (
    <div className="space-y-2 text-xs">
      <p className="font-semibold text-foreground">Accessibility Test Signal</p>
      <p className="text-muted-foreground">
        {isNoExamples 
          ? "No component examples found on this page. Check that ExampleCard components have data-testid attributes."
          : "Automated axe-core results for component examples. Tests run in both light and dark modes. This is a test signal, not a compliance certification."
        }
      </p>
      
      {/* Mode-specific results */}
      {hasModesData && !isNoExamples && (
        <div className="border-t border-border pt-2 space-y-2">
          <p className="font-medium text-foreground">Mode Results:</p>
          <div className="grid grid-cols-2 gap-2">
            {modes?.light && (
              <ModeResultDisplay mode="light" result={modes.light} />
            )}
            {modes?.dark && (
              <ModeResultDisplay mode="dark" result={modes.dark} />
            )}
          </div>
        </div>
      )}
      
      <div className="border-t border-border pt-2 space-y-1">
        <p><span className="text-muted-foreground">Subject:</span> {subject}</p>
        <p><span className="text-muted-foreground">Scope:</span> {scope}</p>
        <p><span className="text-muted-foreground">Examples found:</span> {examplesFound}</p>
        <p><span className="text-muted-foreground">Combined status:</span> {status}</p>
        {levelAchieved && (
          <p><span className="text-muted-foreground">Level:</span> {levelAchieved} (based on automated ruleset)</p>
        )}
        <p><span className="text-muted-foreground">Last tested:</span> {testedDate}</p>
      </div>
      
      {linkToDashboard && (
        <p className="text-muted-foreground text-[10px] pt-1 border-t border-border">
          Click badge for full details
        </p>
      )}
    </div>
  );
}

interface ModeResultDisplayProps {
  mode: "light" | "dark";
  result: ModeComplianceResult;
}

function ModeResultDisplay({ mode, result }: ModeResultDisplayProps) {
  const statusIcon = getStatusIcon(result.status);
  const statusLabel = result.status.replace("_", " ");
  
  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded bg-muted/50">
      {mode === "light" ? (
        <Sun className="h-3 w-3 text-muted-foreground" />
      ) : (
        <Moon className="h-3 w-3 text-muted-foreground" />
      )}
      <span className="capitalize text-muted-foreground">{mode}:</span>
      {statusIcon}
      <span className="capitalize">{statusLabel}</span>
      <span className="text-muted-foreground">({result.violations})</span>
    </div>
  );
}

function getStatusIcon(status: ModeComplianceResult["status"]): React.ReactNode {
  switch (status) {
    case "pass":
      return <Check className="h-3 w-3 text-success" />;
    case "partial":
      return <AlertTriangle className="h-3 w-3 text-warning" />;
    case "fail":
      return <X className="h-3 w-3 text-destructive" />;
    case "no_examples":
      return <AlertTriangle className="h-3 w-3 text-warning" />;
    default:
      return <HelpCircle className="h-3 w-3 text-muted-foreground" />;
  }
}

interface BadgeConfig {
  label: string;
  className: string;
  icon: React.ReactNode;
}

function getBadgeConfig(
  status: ComplianceResult["status"],
  levelAchieved: string | null,
  isLinked: boolean
): BadgeConfig {
  const cursorClass = isLinked ? "cursor-pointer" : "cursor-help";
  const baseClasses = `inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium tracking-wide rounded border ${cursorClass}`;

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
        className: `${baseClasses} border-warning/50 bg-warning/10 text-warning`,
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
        className: `${baseClasses} border-warning/50 bg-warning/10 text-warning`,
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
