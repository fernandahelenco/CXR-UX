/**
 * Theme Builder V6 - Layers Panel Architecture
 *
 * Unified layout with:
 * - Left rail: Layers panel with all tokens in collapsible sections
 * - Main area: Full-width live preview
 *
 * All token editing happens via popovers in the left rail.
 * The preview shows affected components for the selected token.
 */

import * as React from "react";
import { useThemeBuilder } from "@/docs/context/ThemeBuilderContext";
import { useThemeOverrides } from "@/docs/hooks/useThemeOverrides";
import {
  PALETTE_RAMPS,
  SEMANTIC_TOKENS,
  SURFACE_TOKENS,
  TEXT_TOKENS,
} from "@/docs/data/tokenRegistry";
import { WexAlertDialog } from "@/components/wex";
import { ThemeBuilderNav } from "@/docs/components/ThemeBuilderNav";
import { FilteredLivePreview } from "@/docs/components/FilteredLivePreview";

// ============================================================================
// Main Theme Builder Page
// ============================================================================

export default function ThemeBuilderPage() {
  const { setSelectedToken, editMode } = useThemeBuilder();
  const { resetAll, exportAsJSON, hasOverrides, setToken } = useThemeOverrides();

  // Currently selected token for preview
  const [selectedToken, setSelectedTokenLocal] = React.useState<string | null>(
    null
  );

  // Reset confirmation dialog
  const [showResetDialog, setShowResetDialog] = React.useState(false);

  // Get all editable tokens (flattened)
  const allEditableTokens = React.useMemo(
    () => [
      ...SEMANTIC_TOKENS.filter(
        (t) =>
          t.references &&
          !t.name.includes("-hover") &&
          !t.name.includes("-foreground") &&
          !t.name.includes("-contrast")
      ),
      ...SURFACE_TOKENS,
      ...TEXT_TOKENS,
    ],
    []
  );

  // Track current assignments - for tokens with palette references
  const [assignments, setAssignments] = React.useState<Record<string, string>>(
    () => {
      const initial: Record<string, string> = {};
      allEditableTokens.forEach((t) => {
        if (t.references) {
          const ref =
            editMode === "light"
              ? t.references
              : t.darkReferences || t.references;
          if (ref) {
            const matchWithShade = ref.match(/--wex-palette-(\w+-\d+)/);
            const matchNeutral = ref.match(/--wex-palette-(white|black)/);
            initial[t.name] = matchWithShade
              ? matchWithShade[1]
              : matchNeutral
                ? matchNeutral[1]
                : "";
          }
        }
      });
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/cfb597a8-c124-40f4-8323-a95d1a296ffa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ThemeBuilderPage.tsx:assignments-init',message:'Initial assignments created',data:{assignmentKeys:Object.keys(initial),sampleAssignments:{'--wex-primary':initial['--wex-primary'],'--wex-destructive':initial['--wex-destructive'],'--wex-content-bg':initial['--wex-content-bg']}},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      return initial;
    }
  );

  // Update assignments when mode changes
  React.useEffect(() => {
    const updated: Record<string, string> = {};
    allEditableTokens.forEach((t) => {
      if (t.references) {
        const ref =
          editMode === "light"
            ? t.references
            : t.darkReferences || t.references;
        if (ref) {
          const matchWithShade = ref.match(/--wex-palette-(\w+-\d+)/);
          const matchNeutral = ref.match(/--wex-palette-(white|black)/);
          updated[t.name] = matchWithShade
            ? matchWithShade[1]
            : matchNeutral
              ? matchNeutral[1]
              : "";
        }
      }
    });
    setAssignments(updated);
  }, [editMode, allEditableTokens]);

  // Handle assignment change
  const handleAssignmentChange = React.useCallback(
    (tokenName: string, value: string) => {
      const isPaletteRefWithShade = /^[a-z]+-\d+$/.test(value);
      const isNeutralRef = value === "white" || value === "black";

      if (isPaletteRefWithShade || isNeutralRef) {
        const paletteToken = `--wex-palette-${value}`;
        document.documentElement.style.setProperty(
          tokenName,
          `var(${paletteToken})`
        );
        setAssignments((prev) => ({ ...prev, [tokenName]: value }));
        setToken(tokenName, `var(${paletteToken})`, editMode);
      } else {
        document.documentElement.style.setProperty(tokenName, value);
        setToken(tokenName, value, editMode);
      }

      setSelectedTokenLocal(tokenName);
    },
    [editMode, setToken]
  );

  // Handle token selection
  const handleSelectToken = React.useCallback(
    (token: string) => {
      setSelectedTokenLocal(token);
      setSelectedToken(token);
    },
    [setSelectedToken]
  );

  // Handle export
  const handleExport = React.useCallback(() => {
    const json = exportAsJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wex-theme-overrides.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [exportAsJSON]);

  // Handle reset all
  const confirmReset = React.useCallback(() => {
    resetAll();
    setSelectedTokenLocal(null);
    setShowResetDialog(false);
    window.location.reload();
  }, [resetAll]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left Navigation - Layers Panel */}
      <div className="w-72 flex-shrink-0">
        <ThemeBuilderNav
          selectedToken={selectedToken}
          onSelectToken={handleSelectToken}
          assignments={assignments}
          onAssignmentChange={handleAssignmentChange}
          onExport={handleExport}
          onReset={() => setShowResetDialog(true)}
          hasUnsavedChanges={hasOverrides}
          hasOverrides={hasOverrides}
        />
      </div>

      {/* Main Workspace - Full Width Live Preview */}
      <div className="flex-1 overflow-y-auto bg-background">
        <FilteredLivePreview
          selectedToken={selectedToken}
          currentValue={selectedToken ? assignments[selectedToken] : undefined}
          onValueChange={
            selectedToken
              ? (value) => handleAssignmentChange(selectedToken, value)
              : undefined
          }
          fullWidth
        />
      </div>

      {/* Reset Confirmation Dialog */}
      <WexAlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <WexAlertDialog.Content>
          <WexAlertDialog.Header>
            <WexAlertDialog.Title>Reset All Changes?</WexAlertDialog.Title>
            <WexAlertDialog.Description>
              This will reset all theme customizations back to their default
              values. This action cannot be undone.
            </WexAlertDialog.Description>
          </WexAlertDialog.Header>
          <WexAlertDialog.Footer>
            <WexAlertDialog.Cancel>Cancel</WexAlertDialog.Cancel>
            <WexAlertDialog.Action onClick={confirmReset}>
              Reset All
            </WexAlertDialog.Action>
          </WexAlertDialog.Footer>
        </WexAlertDialog.Content>
      </WexAlertDialog>
    </div>
  );
}
