/**
 * ThemeBuilderNav Component (Component-First Design)
 *
 * Left rail navigation with component-first structure.
 *
 * Structure:
 * - Light/Dark toggle at TOP
 * - Components section (top) - visual component selector
 * - Foundation section (bottom) - global presets (Color Ramps, Radius, Typography)
 * - Actions at bottom: Reset, Export, Exit
 */

import * as React from "react";
import { WexSeparator, WexPopover } from "@/components/wex";
import {
  ArrowLeft,
  Download,
  RotateCcw,
  Sun,
  Moon,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Palette,
  Square,
  Type,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useThemeBuilder } from "@/docs/context/ThemeBuilderContext";
import { useContrastCompliance } from "@/docs/hooks/useContrastCompliance";
import { ComponentSelector, type MVPComponent } from "./ComponentSelector";

// ============================================================================
// Types
// ============================================================================

export interface ThemeBuilderNavProps {
  /** Currently selected component */
  selectedComponent: MVPComponent | null;
  /** Callback when component is selected */
  onSelectComponent: (component: MVPComponent) => void;
  /** Currently selected foundation item (e.g., "color-ramps", "radius-presets") */
  selectedFoundation: string | null;
  /** Callback when foundation item is selected */
  onSelectFoundation: (item: string) => void;
  /** Callback for export action */
  onExport: () => void;
  /** Callback for reset action */
  onReset: () => void;
  /** Whether there are unsaved changes */
  hasUnsavedChanges?: boolean;
  /** Whether export/reset should be enabled */
  hasOverrides?: boolean;
}

// ============================================================================
// Foundation Sections Configuration
// ============================================================================

interface FoundationSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultOpen?: boolean;
}

const FOUNDATION_SECTIONS: FoundationSection[] = [
  {
    id: "color-ramps",
    label: "Color Ramps",
    icon: Palette,
    defaultOpen: true,
  },
  {
    id: "radius-presets",
    label: "Radius Presets",
    icon: Square,
    defaultOpen: true,
  },
  {
    id: "typography",
    label: "Typography",
    icon: Type,
    defaultOpen: false,
  },
];

// ============================================================================
// Main Component
// ============================================================================

export function ThemeBuilderNav({
  selectedComponent,
  onSelectComponent,
  selectedFoundation,
  onSelectFoundation,
  onExport,
  onReset,
  hasUnsavedChanges = false,
  hasOverrides = false,
}: ThemeBuilderNavProps) {
  const { exitThemeBuilder, editMode, setEditMode } = useThemeBuilder();

  // Foundation section open/closed state
  const [openFoundationSections, setOpenFoundationSections] = React.useState<
    Record<string, boolean>
  >({
    "color-ramps": true,
    "radius-presets": true,
    "typography": false,
  });

  const toggleFoundationSection = (sectionId: string) => {
    setOpenFoundationSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Handle exit - changes are auto-saved, so no warning needed
  const handleExit = React.useCallback(() => {
    exitThemeBuilder();
  }, [exitThemeBuilder]);

  return (
    <div className="h-full flex flex-col bg-muted/30 border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="text-sm font-semibold">Theme Builder</div>
      </div>

      {/* Light/Dark Toggle at TOP */}
      <div className="p-3 border-b border-border">
        <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Editing Mode
        </div>
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setEditMode("light")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all",
              editMode === "light"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Sun className="h-3.5 w-3.5" />
            Light
          </button>
          <button
            onClick={() => setEditMode("dark")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all",
              editMode === "dark"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Moon className="h-3.5 w-3.5" />
            Dark
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Components Section */}
        <div className="p-3 border-b border-border">
          <ComponentSelector
            selectedComponent={selectedComponent}
            onSelectComponent={onSelectComponent}
          />
        </div>

        <WexSeparator />

        {/* Foundation Section */}
        <div className="p-3">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Foundation
          </div>
          <div className="space-y-1">
            {FOUNDATION_SECTIONS.map((section) => {
              const Icon = section.icon;
              const isSelected = selectedFoundation === section.id;
              const isOpen = openFoundationSections[section.id] ?? section.defaultOpen ?? false;
              
              return (
                <div key={section.id}>
                  <button
                    type="button"
                    onClick={() => {
                      toggleFoundationSection(section.id);
                      onSelectFoundation(section.id);
                    }}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-all",
                      "hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
                      isSelected && "bg-primary/5 text-foreground"
                    )}
                  >
                    <ChevronRight
                      className={cn(
                        "h-3.5 w-3.5 transition-transform text-muted-foreground",
                        isOpen && "rotate-90"
                      )}
                    />
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className={cn(
                      "flex-1 text-left",
                      isSelected ? "font-medium" : "font-normal"
                    )}>
                      {section.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* A11y Compliance Summary + Actions at bottom */}
      <div className="p-3 border-t border-border space-y-1">
        <ContrastComplianceSummary />
        <WexSeparator className="my-2" />
        <ActionButton
          onClick={onReset}
          icon={<RotateCcw className="h-4 w-4" />}
          label="Reset All"
          disabled={!hasOverrides}
        />
        <ActionButton
          onClick={onExport}
          icon={<Download className="h-4 w-4" />}
          label="Export Theme"
        />
        <WexSeparator className="my-2" />
        <ActionButton
          onClick={handleExit}
          icon={<ArrowLeft className="h-4 w-4" />}
          label="Exit Theme Builder"
          badge={hasUnsavedChanges ? "●" : undefined}
        />
        </div>
    </div>
  );
}

// ============================================================================
// WCAG Contrast Compliance Summary
// ============================================================================

function ContrastComplianceSummary() {
  const { results, passCount, failCount, totalCount, isCompliant } = useContrastCompliance();
  const { editMode } = useThemeBuilder();

  if (totalCount === 0) {
    return null; // Still loading
  }

  const ModeIcon = editMode === "light" ? Sun : Moon;

  return (
    <WexPopover>
      <WexPopover.Trigger asChild>
        <button
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
            isCompliant
              ? "text-success hover:bg-success/10"
              : "text-destructive hover:bg-destructive/10"
          )}
        >
          <ModeIcon className="h-3.5 w-3.5 text-muted-foreground" />
          {isCompliant ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertTriangle className="h-4 w-4" />
          )}
          <span className="flex-1 text-left">
            {isCompliant ? "Contrast: OK" : `Contrast: ${failCount} Issue${failCount !== 1 ? "s" : ""}`}
          </span>
          <span className="text-xs text-muted-foreground">
            {passCount}/{totalCount}
          </span>
        </button>
      </WexPopover.Trigger>
      <WexPopover.Content side="right" align="end" className="w-80 p-0 max-h-96 overflow-y-auto">
        <div className="p-3 border-b border-border sticky top-0 bg-popover">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ModeIcon className="h-4 w-4 text-muted-foreground" />
            {isCompliant ? "All Contrast Checks Passing" : "Contrast Issues Detected"}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            WCAG AA requires 4.5:1 for normal text ({editMode} mode)
          </div>
        </div>
        <div className="p-3 space-y-2">
          {results.map((result, idx) => (
            <div
              key={idx}
              className={cn(
                "p-2 rounded border text-xs",
                result.passes
                  ? "bg-success/5 border-success/20"
                  : "bg-destructive/5 border-destructive/20"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{result.pair.name}</span>
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded text-[10px] font-medium",
                    result.passes
                      ? "bg-success/20 text-success"
                      : "bg-destructive/20 text-destructive"
                  )}
                >
                  {result.ratio.toFixed(1)}:1
                </span>
              </div>
              <div className="text-muted-foreground text-[10px]">
                {result.pair.component}
              </div>
              {!result.passes && result.suggestion && (
                <p className="text-muted-foreground text-[10px] mt-1 pt-1 border-t border-border/50">
                  {result.suggestion}
                </p>
              )}
            </div>
          ))}
        </div>
      </WexPopover.Content>
    </WexPopover>
  );
}

// ============================================================================
// Action Button
// ============================================================================

interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  badge?: string;
}

function ActionButton({
  onClick,
  icon,
  label,
  disabled,
  badge,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
        disabled
          ? "text-muted-foreground/50 cursor-not-allowed"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      )}
    >
      {icon}
      <span>{label}</span>
      {badge && <span className="ml-auto text-warning text-xs">{badge}</span>}
    </button>
  );
}

// Re-export type for backward compatibility
export type ThemeBuilderMode = "palette" | "semantic";
