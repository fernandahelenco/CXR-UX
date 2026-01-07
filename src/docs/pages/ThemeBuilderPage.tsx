/**
 * Theme Builder - Component-First Architecture
 *
 * Unified layout with:
 * - Left rail: Component selector + Foundation presets
 * - Main area: Component editor or foundation editor
 *
 * Component-first approach: select a component to edit its tokens,
 * or select a foundation preset to edit global values.
 */

import * as React from "react";
import { useThemeBuilder } from "@/docs/context/ThemeBuilderContext";
import { useThemeOverrides } from "@/docs/hooks/useThemeOverrides";
import { RADIUS_TOKENS } from "@/docs/data/tokenRegistry";
import { WexAlertDialog } from "@/components/wex";
import { ThemeBuilderNav } from "@/docs/components/ThemeBuilderNav";
import { ComponentEditor } from "@/docs/components/ComponentEditor";
import type { MVPComponent } from "@/docs/components/ComponentSelector";
import { GlobalRadiusEditor } from "@/docs/components/GlobalRadiusEditor";
import { ThemeExportView } from "@/docs/components/ThemeExportView";
import { WexButton, WexCard, WexInput, WexBadge, WexAlert } from "@/components/wex";

// ============================================================================
// Main Theme Builder Page
// ============================================================================

export default function ThemeBuilderPage() {
  const { editMode } = useThemeBuilder();
  const { resetAll, hasOverrides, setToken, getAllOverrides, overrides: hookOverrides } = useThemeOverrides();

  // Component-first selection state
  const [selectedComponent, setSelectedComponent] = React.useState<MVPComponent | null>(null);
  const [selectedFoundation, setSelectedFoundation] = React.useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = React.useState<string | null>(null);

  // Export view state
  const [showExportView, setShowExportView] = React.useState(false);

  // Reset confirmation dialog
  const [showResetDialog, setShowResetDialog] = React.useState(false);

  // Get current overrides for component editor - combine light and dark, make reactive
  const overrides = React.useMemo(() => {
    // Combine light and dark overrides (component editor uses combined view for MVP)
    return { ...hookOverrides.light, ...hookOverrides.dark };
  }, [hookOverrides]);

  // Get current radius values for global editor
  const radiusValues = React.useMemo(() => {
    const all = getAllOverrides();
    const values: Record<string, string> = {};
    RADIUS_TOKENS.forEach((token) => {
      const value = all.light[token.name] || token.lightValue;
      values[token.name] = value;
    });
    return values;
  }, [getAllOverrides]);

  // Handle component selection
  const handleSelectComponent = React.useCallback((component: MVPComponent) => {
    setSelectedComponent(component);
    setSelectedFoundation(null);
    setShowExportView(false);
  }, []);

  // Handle foundation selection
  const handleSelectFoundation = React.useCallback((foundation: string) => {
    setSelectedFoundation(foundation);
    setSelectedComponent(null);
    setShowExportView(false);
  }, []);

  // Handle token change from component editor
  const handleTokenChange = React.useCallback((tokenName: string, value: string) => {
    setToken(tokenName, value, editMode);
  }, [editMode, setToken]);

  // Handle radius change from global editor
  const handleRadiusChange = React.useCallback((tokenName: string, value: string) => {
    setToken(tokenName, value, editMode);
  }, [editMode, setToken]);

  // Handle export - toggle export view
  const handleExport = React.useCallback(() => {
    setShowExportView(true);
    setSelectedComponent(null);
    setSelectedFoundation(null);
  }, []);

  // Handle reset all
  const confirmReset = React.useCallback(() => {
    resetAll();
    setSelectedComponent(null);
    setSelectedFoundation(null);
    setShowResetDialog(false);
    window.location.reload();
  }, [resetAll]);

  return (
    <div className="h-full flex overflow-hidden">
      {/* Left Navigation - Component-First Navigation */}
      <div className="w-72 flex-shrink-0 h-full overflow-hidden">
        <ThemeBuilderNav
          selectedComponent={selectedComponent}
          onSelectComponent={handleSelectComponent}
          selectedFoundation={selectedFoundation}
          onSelectFoundation={handleSelectFoundation}
          onExport={handleExport}
          onReset={() => setShowResetDialog(true)}
          hasUnsavedChanges={hasOverrides}
          hasOverrides={hasOverrides}
        />
      </div>

      {/* Main Workspace - Component Editor, Foundation Editor, or Export View */}
      <div className="flex-1 h-full overflow-y-auto bg-background">
        {showExportView ? (
          <ThemeExportView onClose={() => setShowExportView(false)} />
        ) : selectedComponent ? (
          <div className="p-6 max-w-4xl mx-auto">
            <ComponentEditor
              component={selectedComponent}
              overrides={overrides}
              onTokenChange={handleTokenChange}
              onVariantChange={setSelectedVariant}
            />
            <div className="mt-8">
              <ComponentPreview component={selectedComponent} variant={selectedVariant} />
            </div>
          </div>
        ) : selectedFoundation === "radius-presets" ? (
          <div className="p-6 max-w-4xl mx-auto">
            <GlobalRadiusEditor
              values={radiusValues}
              onChange={handleRadiusChange}
            />
          </div>
        ) : selectedFoundation === "color-ramps" ? (
          <div className="p-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Color Ramps</h2>
                <p className="text-sm text-muted-foreground">
                  Edit global color palette ramps. Changes cascade to all components.
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                Color ramp editing will be implemented in a future update.
              </div>
            </div>
          </div>
        ) : selectedFoundation === "typography" ? (
          <div className="p-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Typography</h2>
                <p className="text-sm text-muted-foreground">
                  Edit global typography tokens. Changes cascade to all components.
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                Typography editing will be implemented in a future update.
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 max-w-4xl mx-auto">
            <div className="text-center py-12">
              <h2 className="text-lg font-semibold mb-2">Theme Builder</h2>
              <p className="text-sm text-muted-foreground">
                Select a component from the left to start editing, or choose a foundation preset.
              </p>
            </div>
          </div>
        )}
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

// ============================================================================
// Component Preview
// ============================================================================

interface ComponentPreviewProps {
  component: MVPComponent;
  variant: string | null;
}

function ComponentPreview({ component, variant }: ComponentPreviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-4">Live Preview</h3>
      </div>
      <div className="space-y-4">
        {component === "button" && variant && (
          <div className="flex flex-wrap gap-4">
            <WexButton intent={variant as any}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</WexButton>
          </div>
        )}
        {component === "card" && (
          <WexCard>
            <WexCard.Header>
              <WexCard.Title>Card Title</WexCard.Title>
            </WexCard.Header>
            <WexCard.Content>
              <p>This is a card component preview. Edit the card tokens to see changes here.</p>
            </WexCard.Content>
          </WexCard>
        )}
        {component === "input" && (
          <div className="space-y-4 max-w-md">
            <WexInput placeholder="Default input" />
            <WexInput variant="filled" placeholder="Filled input" />
            <WexInput invalid placeholder="Invalid input" />
          </div>
        )}
        {component === "badge" && variant && (
          <div className="flex flex-wrap gap-4">
            <WexBadge intent={variant as any}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</WexBadge>
          </div>
        )}
        {component === "alert" && variant && (
          <div className="space-y-4 max-w-2xl">
            <WexAlert 
              intent={variant as any} 
              style={{
                borderRadius: 'var(--wex-component-alert-radius)',
              }}
            >
              <WexAlert.Title>{variant.charAt(0).toUpperCase() + variant.slice(1)} Alert</WexAlert.Title>
              <WexAlert.Description>
                This is a {variant} alert message. Edit the {variant} variant tokens above to see changes here.
              </WexAlert.Description>
            </WexAlert>
          </div>
        )}
        {!variant && component !== "card" && component !== "input" && (
          <div className="text-sm text-muted-foreground">
            Select a variant above to see the preview.
          </div>
        )}
      </div>
    </div>
  );
}
