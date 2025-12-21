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
import { PALETTE_RAMPS, SEMANTIC_TOKENS, SURFACE_TOKENS, TEXT_TOKENS, type TokenDefinition } from "@/docs/data/tokenRegistry";
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

// Token groups for organized display
const TOKEN_GROUPS = [
  {
    id: "intent",
    label: "Intent Colors",
    description: "Primary action and status colors",
    tokens: SEMANTIC_TOKENS.filter(t => 
      t.references && 
      !t.name.includes("-hover") && 
      !t.name.includes("-foreground") &&
      !t.name.includes("-contrast")
    ),
  },
  {
    id: "surface",
    label: "Surfaces",
    description: "Backgrounds and borders",
    tokens: SURFACE_TOKENS,
  },
  {
    id: "text",
    label: "Text",
    description: "Text and label colors",
    tokens: TEXT_TOKENS,
  },
];

function SemanticMode() {
  const { editMode } = useThemeBuilder();
  const { setToken } = useThemeOverrides();
  const [selectedToken, setSelectedToken] = React.useState<string | null>(null);
  
  // Get all editable tokens (flattened from groups)
  const allEditableTokens = React.useMemo(() => 
    TOKEN_GROUPS.flatMap(g => g.tokens),
    []
  );
  
  // Track current assignments - for tokens with palette references
  const [assignments, setAssignments] = React.useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    allEditableTokens.forEach(t => {
      if (t.references) {
        const ref = editMode === "light" ? t.references : (t.darkReferences || t.references);
        if (ref) {
          // Match both "name-shade" (e.g., blue-700) and simple names (e.g., white, black)
          const matchWithShade = ref.match(/--wex-palette-(\w+-\d+)/);
          const matchNeutral = ref.match(/--wex-palette-(white|black)/);
          initial[t.name] = matchWithShade ? matchWithShade[1] : (matchNeutral ? matchNeutral[1] : "");
        }
      }
    });
    return initial;
  });
  
  // Update when mode changes
  React.useEffect(() => {
    const updated: Record<string, string> = {};
    allEditableTokens.forEach(t => {
      if (t.references) {
        const ref = editMode === "light" ? t.references : (t.darkReferences || t.references);
        if (ref) {
          // Match both "name-shade" (e.g., blue-700) and simple names (e.g., white, black)
          const matchWithShade = ref.match(/--wex-palette-(\w+-\d+)/);
          const matchNeutral = ref.match(/--wex-palette-(white|black)/);
          updated[t.name] = matchWithShade ? matchWithShade[1] : (matchNeutral ? matchNeutral[1] : "");
        }
      }
    });
    setAssignments(updated);
  }, [editMode, allEditableTokens]);
  
  // Handle assignment change for palette-referenced tokens
  const handleAssignmentChange = React.useCallback((tokenName: string, value: string) => {
    // Check if this is a palette reference (like "blue-700" or "white"/"black")
    const isPaletteRefWithShade = /^[a-z]+-\d+$/.test(value);
    const isNeutralRef = value === "white" || value === "black";
    
    if (isPaletteRefWithShade || isNeutralRef) {
      // Palette reference - wrap with var()
      const paletteToken = `--wex-palette-${value}`;
      document.documentElement.style.setProperty(tokenName, `var(${paletteToken})`);
      setAssignments(prev => ({ ...prev, [tokenName]: value }));
      setToken(tokenName, `var(${paletteToken})`, editMode);
    } else {
      // Raw HSL value - apply directly
      document.documentElement.style.setProperty(tokenName, value);
      setToken(tokenName, value, editMode);
    }
    
    // Keep selected for preview
    setSelectedToken(tokenName);
  }, [editMode, setToken, setSelectedToken]);

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

        {TOKEN_GROUPS.map(group => (
          <TokenGroupCard
            key={group.id}
            label={group.label}
            description={group.description}
            tokens={group.tokens}
            assignments={assignments}
            selectedToken={selectedToken}
            onSelect={setSelectedToken}
            onChange={handleAssignmentChange}
            editMode={editMode}
          />
        ))}
      </div>

      {/* Right: Filtered Live Preview */}
      <FilteredLivePreview selectedToken={selectedToken} />
    </div>
  );
}

// ============================================================================
// HSL Token Row - For editing surface/text tokens with color picker
// ============================================================================

interface HslTokenRowProps {
  token: TokenDefinition;
  editMode: "light" | "dark";
  isSelected: boolean;
  onSelect: () => void;
  onChange: (hslValue: string) => void;
}

function HslTokenRow({ token, editMode, isSelected, onSelect, onChange }: HslTokenRowProps) {
  const currentValue = editMode === "light" ? token.lightValue : (token.darkValue || token.lightValue);
  const formattedValue = `HSL(${currentValue.replace(/\s+/g, ", ")})`;
  
  // Convert HSL to hex for the color picker
  const hslParts = currentValue.split(/\s+/);
  let hexValue = "#808080";
  try {
    if (hslParts.length >= 3) {
      const h = parseFloat(hslParts[0]);
      const s = parseFloat(hslParts[1].replace("%", ""));
      const l = parseFloat(hslParts[2].replace("%", ""));
      hexValue = hslToHex({ h, s, l });
    }
  } catch {
    // Use default
  }
  
  // Handle color picker change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    // Convert hex to HSL
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0;
    let s = 0;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    
    const hslString = `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    onChange(hslString);
  };
  
  return (
    <div
      className={cn(
        "flex items-center justify-between py-2 px-1 rounded-md transition-colors cursor-pointer",
        isSelected 
          ? "bg-primary/5 ring-1 ring-primary/20" 
          : "hover:bg-muted/30"
      )}
      onClick={onSelect}
    >
      {/* Left side: Swatch + Label/Value */}
      <div className="flex items-center gap-3">
        <div 
          className="w-6 h-6 rounded-sm ring-1 ring-border/50 flex-shrink-0"
          style={{ backgroundColor: `hsl(${currentValue})` }}
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{token.label}</span>
          <span className="text-xs text-muted-foreground font-mono">{formattedValue}</span>
        </div>
      </div>
      
      {/* Right side: Edit button with native color picker */}
      <label 
        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
        title={`Edit ${token.label}`}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="color"
          value={hexValue}
          onChange={handleColorChange}
          className="sr-only"
        />
        <svg 
          className="w-4 h-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </label>
    </div>
  );
}

// Token group card component
interface TokenGroupCardProps {
  label: string;
  description: string;
  tokens: TokenDefinition[];
  assignments: Record<string, string>;
  selectedToken: string | null;
  onSelect: (token: string) => void;
  onChange: (token: string, value: string) => void;
  editMode: "light" | "dark";
}

function TokenGroupCard({
  label,
  description,
  tokens,
  assignments,
  selectedToken,
  onSelect,
  onChange,
  editMode,
}: TokenGroupCardProps) {
  return (
    <WexCard>
      <WexCard.Header className="py-3 px-4">
        <WexCard.Title className="text-sm font-semibold">{label}</WexCard.Title>
        <WexCard.Description className="text-xs">{description}</WexCard.Description>
      </WexCard.Header>
      <hr className="border-border/60" />
      <WexCard.Content className="px-4 py-3">
        <div className="space-y-0.5">
          {tokens.map(token => {
            // For tokens with palette references, use the picker
            if (token.references) {
              return (
                <div
                  key={token.name}
                  className={cn(
                    "rounded-md transition-colors cursor-pointer",
                    selectedToken === token.name 
                      ? "bg-primary/5 ring-1 ring-primary/20" 
                      : "hover:bg-muted/30"
                  )}
                  onClick={() => onSelect(token.name)}
                >
                  <TokenRowWithPicker
                    label={token.label}
                    value={assignments[token.name] || "slate-500"}
                    onChange={(value) => onChange(token.name, value)}
                  />
                </div>
              );
            }
            
            // For surface/text tokens without palette refs, show editable color picker
            return (
              <HslTokenRow
                key={token.name}
                token={token}
                editMode={editMode}
                isSelected={selectedToken === token.name}
                onSelect={() => onSelect(token.name)}
                onChange={(hslValue) => onChange(token.name, hslValue)}
              />
            );
          })}
        </div>
      </WexCard.Content>
    </WexCard>
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
