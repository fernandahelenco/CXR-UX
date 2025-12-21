/**
 * ThemeBuilderNav Component (V5)
 * 
 * Left rail navigation for Theme Builder with mode selection.
 * Two modes: Palette Ramps (brand-level) | Semantic Tokens (theme-level)
 * 
 * Structure:
 * - Mode selector (Palette / Semantic)
 * - Light/Dark toggle (only in Semantic mode)
 * - Exit, Export, Reset actions
 */

import * as React from "react";
import { WexSeparator, WexAlertDialog } from "@/components/wex";
import { 
  ArrowLeft, 
  Download, 
  RotateCcw, 
  Palette, 
  Layers,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useThemeBuilder } from "@/docs/context/ThemeBuilderContext";

export type ThemeBuilderMode = "palette" | "semantic";

interface ThemeBuilderNavProps {
  /** Current mode */
  mode: ThemeBuilderMode;
  /** Callback when mode changes */
  onModeChange: (mode: ThemeBuilderMode) => void;
  /** Callback for export action */
  onExport: () => void;
  /** Callback for reset action */
  onReset: () => void;
  /** Whether there are unsaved changes */
  hasUnsavedChanges?: boolean;
  /** Whether export/reset should be disabled */
  hasOverrides?: boolean;
}

export function ThemeBuilderNav({ 
  mode,
  onModeChange,
  onExport,
  onReset,
  hasUnsavedChanges = false,
  hasOverrides = false,
}: ThemeBuilderNavProps) {
  const { exitThemeBuilder, editMode, setEditMode } = useThemeBuilder();
  
  // Exit confirmation dialog state
  const [showExitDialog, setShowExitDialog] = React.useState(false);

  // Handle exit with unsaved changes warning
  const handleExit = React.useCallback(() => {
    if (hasUnsavedChanges) {
      setShowExitDialog(true);
    } else {
      exitThemeBuilder();
    }
  }, [hasUnsavedChanges, exitThemeBuilder]);

  return (
    <div className="h-full flex flex-col bg-muted/30 border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          <span className="font-semibold">Theme Builder</span>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="p-3 space-y-1">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Mode
        </div>
        
        <ModeButton
          active={mode === "palette"}
          onClick={() => onModeChange("palette")}
          icon={<Palette className="h-4 w-4" />}
          label="Palette Ramps"
          description="Edit brand colors"
        />
        
        <ModeButton
          active={mode === "semantic"}
          onClick={() => onModeChange("semantic")}
          icon={<Layers className="h-4 w-4" />}
          label="Semantic Tokens"
          description="Edit theme mapping"
        />
      </div>

      {/* Light/Dark Toggle - Only in Semantic mode */}
      {mode === "semantic" && (
        <>
          <WexSeparator />
          <div className="p-3">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
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
        </>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="p-3 border-t border-border space-y-1">
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
          disabled={!hasOverrides}
        />
        <WexSeparator className="my-2" />
        <ActionButton
          onClick={handleExit}
          icon={<ArrowLeft className="h-4 w-4" />}
          label="Exit Theme Builder"
          badge={hasUnsavedChanges ? "●" : undefined}
        />
      </div>
      
      {/* Exit Confirmation Dialog */}
      <WexAlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <WexAlertDialog.Content>
          <WexAlertDialog.Header>
            <WexAlertDialog.Title>Unsaved Changes</WexAlertDialog.Title>
            <WexAlertDialog.Description>
              You have unsaved theme changes. Are you sure you want to exit? 
              Your changes will be lost.
            </WexAlertDialog.Description>
          </WexAlertDialog.Header>
          <WexAlertDialog.Footer>
            <WexAlertDialog.Cancel>Cancel</WexAlertDialog.Cancel>
            <WexAlertDialog.Action onClick={exitThemeBuilder}>
              Exit Anyway
            </WexAlertDialog.Action>
          </WexAlertDialog.Footer>
        </WexAlertDialog.Content>
      </WexAlertDialog>
    </div>
  );
}

/**
 * Mode selection button
 */
interface ModeButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  description: string;
}

function ModeButton({ active, onClick, icon, label, description }: ModeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
        active 
          ? "bg-primary/10 text-foreground border border-primary/30" 
          : "hover:bg-muted/50 text-muted-foreground border border-transparent"
      )}
    >
      <div className={cn(
        "mt-0.5",
        active ? "text-primary" : "text-muted-foreground"
      )}>
        {icon}
      </div>
      <div>
        <div className={cn(
          "text-sm font-medium",
          active ? "text-foreground" : "text-muted-foreground"
        )}>
          {label}
        </div>
        <div className="text-xs text-muted-foreground">
          {description}
        </div>
      </div>
    </button>
  );
}

/**
 * Action button for footer
 */
interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  badge?: string;
}

function ActionButton({ onClick, icon, label, disabled, badge }: ActionButtonProps) {
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
      {badge && (
        <span className="ml-auto text-warning text-xs">{badge}</span>
      )}
    </button>
  );
}
