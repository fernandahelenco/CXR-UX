/**
 * Theme Builder V5 - Two-Workflow Architecture
 * 
 * Two distinct modes:
 * 1. Palette Ramps - Edit brand colors (mode-agnostic, affects both light/dark)
 * 2. Semantic Tokens - Edit theme mapping (mode-specific, light vs dark)
 * 
 * Left nav: Mode selector + Light/Dark toggle + Exit/Export/Reset
 * Center: Mode-specific workspace with filtered live preview
 */

import * as React from "react";
import { useThemeBuilder } from "@/docs/context/ThemeBuilderContext";
import { useThemeOverrides } from "@/docs/hooks/useThemeOverrides";
import { PALETTE_RAMPS, SEMANTIC_TOKENS } from "@/docs/data/tokenRegistry";
import { 
  WexButton, 
  WexCard,
  WexInput,
  WexAlertDialog,
} from "@/components/wex";
import { ThemeBuilderNav, type ThemeBuilderMode } from "@/docs/components/ThemeBuilderNav";
import { TokenRowWithPicker } from "@/docs/components/PaletteSwatchPicker";
import { FilteredLivePreview } from "@/docs/components/FilteredLivePreview";
import { Paintbrush, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { hslToHex, parseHSL } from "@/docs/utils/color-convert";
import { generateRampFromBase, applyRampToDocument, type GeneratedRamp } from "@/docs/utils/ramp-generator";

// ============================================================================
// Types
// ============================================================================

interface RampEditorProps {
  paletteName: string;
  onClose: () => void;
}

// ============================================================================
// Palette Ramp Editor
// ============================================================================

function RampEditor({ paletteName, onClose }: RampEditorProps) {
  const { setToken } = useThemeOverrides();
  const rampDef = PALETTE_RAMPS.find(r => r.name === paletteName);
  
  // Get current 500 value - reinitialize when paletteName changes
  const [baseHex, setBaseHex] = React.useState("#0052CC");
  
  // Update baseHex when paletteName changes
  React.useEffect(() => {
    if (!rampDef) return;
    const token = `--wex-palette-${paletteName}-500`;
    const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
    const parsed = parseHSL(value);
    setBaseHex(parsed ? hslToHex(parsed) : "#0052CC");
  }, [paletteName, rampDef]);
  
  // Generate preview ramp using the utility
  const generatedRamp = React.useMemo<GeneratedRamp | null>(() => {
    return generateRampFromBase(baseHex, paletteName);
  }, [baseHex, paletteName]);
  
  // Apply ramp to all shades
  const handleApplyRamp = React.useCallback(() => {
    if (!generatedRamp) return;
    
    // Apply to document
    applyRampToDocument(generatedRamp);
    
    // Store in overrides for both modes (palette is mode-agnostic)
    generatedRamp.shades.forEach(shade => {
      const hslString = `${shade.hsl.h} ${shade.hsl.s}% ${shade.hsl.l}%`;
      setToken(shade.token, hslString, "light");
      setToken(shade.token, hslString, "dark");
    });
    
    onClose();
  }, [generatedRamp, setToken, onClose]);
  
  if (!rampDef || !generatedRamp) return null;
  
  return (
    <WexCard className="max-w-xl">
      <WexCard.Header>
        <WexCard.Title className="flex items-center gap-2">
          <Paintbrush className="w-5 h-5" />
          Edit {rampDef.label} Palette
        </WexCard.Title>
        <WexCard.Description>
          Set the base color (500) and the full 50-900 ramp will be generated automatically.
        </WexCard.Description>
      </WexCard.Header>
      <WexCard.Content className="space-y-6">
        {/* Base Color Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Base Color (500)</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={baseHex}
              onChange={(e) => setBaseHex(e.target.value)}
              className="w-12 h-10 rounded border border-border cursor-pointer"
            />
            <WexInput
              type="text"
              value={baseHex}
              onChange={(e) => setBaseHex(e.target.value)}
              placeholder="#0052CC"
              className="flex-1 font-mono"
            />
          </div>
        </div>
        
        {/* Preview Ramp */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Generated Ramp Preview</label>
          <div className="flex gap-1">
            {generatedRamp.shades.map(({ shade, hex }) => (
              <div key={shade} className="flex flex-col items-center gap-1">
                <div 
                  className="w-8 h-8 rounded border border-border/50"
                  style={{ backgroundColor: hex }}
                />
                <span className="text-[9px] text-muted-foreground">{shade}</span>
              </div>
            ))}
          </div>
        </div>
      </WexCard.Content>
      <WexCard.Footer className="flex justify-end gap-2">
        <WexButton intent="outline" onClick={onClose}>Cancel</WexButton>
        <WexButton onClick={handleApplyRamp}>Apply Ramp</WexButton>
      </WexCard.Footer>
    </WexCard>
  );
}

// ============================================================================
// Palette Mode Workspace
// ============================================================================

interface PaletteModeProps {
  onResetPalette: (name: string) => void;
}

function PaletteMode({ onResetPalette }: PaletteModeProps) {
  const [editingPalette, setEditingPalette] = React.useState<string | null>(null);

  if (editingPalette) {
    return (
      <RampEditor 
        paletteName={editingPalette} 
        onClose={() => setEditingPalette(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Palette Ramps</h2>
        <p className="text-sm text-muted-foreground">
          Edit brand colors by setting a base 500 shade. Changes affect both light and dark modes.
        </p>
      </div>

      <div className="space-y-3">
        {PALETTE_RAMPS.map(ramp => {
          // Find which semantic tokens use this ramp
          const usedBy = SEMANTIC_TOKENS
            .filter(t => t.references?.includes(`-${ramp.name}-`) || t.darkReferences?.includes(`-${ramp.name}-`))
            .map(t => t.label);
          
          return (
            <WexCard key={ramp.name} className="p-4">
              <div className="flex items-center gap-4">
                {/* Color preview */}
                <div 
                  className="w-12 h-12 rounded-md border border-border/50 flex-shrink-0"
                  style={{ backgroundColor: `hsl(var(--wex-palette-${ramp.name}-500))` }}
                />
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{ramp.label}</div>
                  
                  {/* Ramp preview */}
                  <div className="flex gap-0.5 mt-1.5">
                    {ramp.shades.map(shade => (
                      <div
                        key={shade.shade}
                        className="w-4 h-4 rounded-sm"
                        style={{ backgroundColor: `hsl(var(${shade.token}))` }}
                        title={`${shade.shade}`}
                      />
                    ))}
                  </div>
                  
                  {/* Usage annotation */}
                  {usedBy.length > 0 && (
                    <div className="text-xs text-muted-foreground mt-1.5">
                      Used by: {usedBy.join(", ")}
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <WexButton 
                    size="sm" 
                    intent="outline"
                    onClick={() => onResetPalette(ramp.name)}
                    title="Reset to default"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </WexButton>
                  <WexButton 
                    size="sm"
                    onClick={() => setEditingPalette(ramp.name)}
                  >
                    Edit
                  </WexButton>
                </div>
              </div>
            </WexCard>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// Semantic Mode Workspace
// ============================================================================

function SemanticMode() {
  const { editMode } = useThemeBuilder();
  const { setToken } = useThemeOverrides();
  const [selectedToken, setSelectedToken] = React.useState<string | null>(null);
  
  // Get semantic tokens that reference palettes
  const editableTokens = SEMANTIC_TOKENS.filter(t => t.references);
  
  // Track current assignments
  const [assignments, setAssignments] = React.useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    editableTokens.forEach(t => {
      const ref = editMode === "light" ? t.references : (t.darkReferences || t.references);
      if (ref) {
        // Extract "blue-700" from "--wex-palette-blue-700"
        const match = ref.match(/--wex-palette-(\w+-\d+)/);
        initial[t.name] = match ? match[1] : "";
      }
    });
    return initial;
  });
  
  // Update when mode changes
  React.useEffect(() => {
    const updated: Record<string, string> = {};
    editableTokens.forEach(t => {
      const ref = editMode === "light" ? t.references : (t.darkReferences || t.references);
      if (ref) {
        const match = ref.match(/--wex-palette-(\w+-\d+)/);
        updated[t.name] = match ? match[1] : "";
      }
    });
    setAssignments(updated);
  }, [editMode]);
  
  // Handle assignment change
  const handleAssignmentChange = React.useCallback((tokenName: string, paletteValue: string) => {
    const paletteToken = `--wex-palette-${paletteValue}`;
    
    // Update CSS to reference the palette token
    document.documentElement.style.setProperty(tokenName, `var(${paletteToken})`);
    
    // Update state
    setAssignments(prev => ({ ...prev, [tokenName]: paletteValue }));
    
    // Persist to overrides
    setToken(tokenName, `var(${paletteToken})`, editMode);
    
    // Keep selected for preview
    setSelectedToken(tokenName);
  }, [editMode, setToken]);

  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      {/* Left: Token Editor */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">
            Semantic Tokens
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({editMode} mode)
            </span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Click a token to change its palette mapping. Changes apply to {editMode} mode only.
          </p>
        </div>

        <WexCard>
          <WexCard.Content className="p-2 space-y-1">
            {editableTokens.map(token => (
              <div
                key={token.name}
                className={cn(
                  "rounded-md transition-colors",
                  selectedToken === token.name && "bg-muted/50"
                )}
                onClick={() => setSelectedToken(token.name)}
              >
                <TokenRowWithPicker
                  label={token.label}
                  value={assignments[token.name] || "blue-500"}
                  onChange={(value) => handleAssignmentChange(token.name, value)}
                />
              </div>
            ))}
          </WexCard.Content>
        </WexCard>
      </div>

      {/* Right: Filtered Live Preview */}
      <FilteredLivePreview selectedToken={selectedToken} />
    </div>
  );
}

// ============================================================================
// Main Theme Builder Page
// ============================================================================

export default function ThemeBuilderPage() {
  const { setSelectedToken } = useThemeBuilder();
  const { resetAll, exportAsJSON, hasOverrides, removeToken } = useThemeOverrides();
  
  // Current mode
  const [mode, setMode] = React.useState<ThemeBuilderMode>("semantic");
  
  // Reset confirmation dialog
  const [showResetDialog, setShowResetDialog] = React.useState(false);
  
  // Handle export
  const handleExport = React.useCallback(() => {
    const json = exportAsJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
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
    setShowResetDialog(false);
    setSelectedToken(null);
    window.location.reload();
  }, [resetAll, setSelectedToken]);
  
  // Handle reset individual palette
  const handleResetPalette = React.useCallback((paletteName: string) => {
    const ramp = PALETTE_RAMPS.find(r => r.name === paletteName);
    if (!ramp) return;
    
    ramp.shades.forEach(shade => {
      removeToken(shade.token, "light");
      removeToken(shade.token, "dark");
    });
  }, [removeToken]);
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left Navigation */}
      <div className="w-64 flex-shrink-0">
        <ThemeBuilderNav
          mode={mode}
          onModeChange={setMode}
          onExport={handleExport}
          onReset={() => setShowResetDialog(true)}
          hasUnsavedChanges={hasOverrides}
          hasOverrides={hasOverrides}
        />
      </div>
      
      {/* Main Workspace */}
      <div className="flex-1 p-6 overflow-y-auto bg-background">
        <div className="max-w-5xl mx-auto">
          {mode === "palette" ? (
            <PaletteMode onResetPalette={handleResetPalette} />
          ) : (
            <SemanticMode />
          )}
        </div>
      </div>
      
      {/* Reset Confirmation Dialog */}
      <WexAlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <WexAlertDialog.Content>
          <WexAlertDialog.Header>
            <WexAlertDialog.Title>Reset All Changes?</WexAlertDialog.Title>
            <WexAlertDialog.Description>
              This will reset all theme customizations back to their default values. 
              This action cannot be undone.
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
