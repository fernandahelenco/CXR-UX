/**
 * FilteredLivePreview Component
 * 
 * Data-driven live preview that shows components affected by the selected token.
 * Uses tokenComponentMap.ts as the single source of truth.
 * 
 * Features:
 * - Renders actual components for "easy" states
 * - Shows color swatches for "hard" states (focus, hover)
 * - Calendar date range for surface-subtle token
 */

import * as React from "react";
import {
  WexButton,
  WexBadge,
  WexAlert,
  WexProgress,
  WexSwitch,
  WexCheckbox,
  WexRadioGroup,
  WexSlider,
  WexSkeleton,
  WexCard,
  WexTabs,
  WexInput,
  WexSeparator,
  WexCalendar,
  WexToggle,
  WexSpinner,
  WexButtonGroup,
  WexPagination,
  WexAvatar,
  WexTextarea,
  WexSelect,
} from "@/components/wex";
import { cn } from "@/lib/utils";
import { 
  TOKEN_COMPONENT_MAP, 
  getEasyUsagesForToken, 
  getHardUsagesForToken,
  type ComponentUsage 
} from "@/docs/data/tokenComponentMap";
import { PALETTE_RAMPS } from "@/docs/data/tokenRegistry";
import { addDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import { PaletteSwatchPicker, SwatchDisplay, formatPaletteValue } from "./PaletteSwatchPicker";
import { ColorInput } from "./ColorInput";
import { hexToHSL, formatHSL, hslToHex, parseHSL } from "@/docs/utils/color-convert";
import { useContrastCompliance, type ContrastCheckResult } from "@/docs/hooks/useContrastCompliance";
import { WexPopover } from "@/components/wex";
import { CheckCircle2, AlertTriangle, ChevronRight } from "lucide-react";
import { TokenCascadeView } from "./TokenCascadeView";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// =============================================================================
// EDIT CONTROL COMPONENT
// =============================================================================

interface EditControlProps {
  value: string;
  onChange: (value: string) => void;
  tokenLabel: string;
  tokenName?: string; // The actual CSS variable name (e.g., "--wex-primary")
}

function EditControl({ value, onChange, tokenLabel, tokenName }: EditControlProps) {
  // Read actual color from CSS variable if tokenName is provided (for semantic tokens)
  const [actualColor, setActualColor] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    if (!tokenName || typeof window === 'undefined') return;

    const readColor = () => {
      const cssValue = getComputedStyle(document.documentElement)
        .getPropertyValue(tokenName)
        .trim();
      if (cssValue) {
        setActualColor(cssValue);
      } else {
        setActualColor(null);
      }
    };

    // Read immediately
    readColor();

    // Watch for style changes on documentElement
    const observer = new MutationObserver(() => {
      readColor();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    // Also poll periodically (fallback)
    const interval = setInterval(readColor, 200);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [tokenName, value]); // Re-read when value changes

  // Use actual CSS variable color if available, otherwise use palette reference
  const swatchColor = React.useMemo(() => {
    if (actualColor && tokenName) {
      // Parse HSL and convert to hex for display
      const hsl = parseHSL(actualColor);
      if (hsl) {
        return hslToHex(hsl);
      }
    }
    return null; // Fall back to SwatchDisplay using value
  }, [actualColor, tokenName]);

  return (
    <PaletteSwatchPicker value={value} onSelect={onChange}>
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-background hover:bg-muted/50 transition-colors"
        title={`Edit ${tokenLabel}`}
      >
        {swatchColor ? (
          <div
            className="w-4 h-4 rounded-sm border border-border/50 flex-shrink-0 ring-1 ring-border/50"
            style={{ backgroundColor: swatchColor }}
          />
        ) : (
          <SwatchDisplay value={value} size="sm" className="ring-1 ring-border/50" />
        )}
        <span className="text-sm font-medium">{formatPaletteValue(value)}</span>
        <svg 
          className="w-4 h-4 text-muted-foreground" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </PaletteSwatchPicker>
  );
}

interface FilteredLivePreviewProps {
  /** The semantic token being edited, e.g., "--wex-primary" */
  selectedToken: string | null;
  /** Current palette value for the selected token, e.g., "blue-700" */
  currentValue?: string;
  /** Callback when the value is changed via the edit control */
  onValueChange?: (value: string) => void;
  /** Callback when a palette ramp color is changed */
  onRampChange?: (rampName: string, hslValue: string) => void;
  /** Optional className */
  className?: string;
  /** Full width mode for main workspace */
  fullWidth?: boolean;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function FilteredLivePreview({ 
  selectedToken, 
  currentValue,
  onValueChange,
  onRampChange,
  className,
  fullWidth = false,
}: FilteredLivePreviewProps) {
  const mapping = selectedToken 
    ? TOKEN_COMPONENT_MAP.find(m => m.token === selectedToken)
    : null;

  const easyUsages = selectedToken ? getEasyUsagesForToken(selectedToken) : [];
  const hardUsages = selectedToken ? getHardUsagesForToken(selectedToken) : [];

  // Real-time contrast compliance checking
  const { getIssuesForCard } = useContrastCompliance();
  const complianceContextValue = React.useMemo(
    () => ({ getIssuesForCard }),
    [getIssuesForCard]
  );

  // Full width layout for main workspace
  if (fullWidth) {
    return (
      <ContrastComplianceContext.Provider value={complianceContextValue}>
        <div className={cn("h-full flex flex-col", className)}>
        {/* Edit Bar Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-6 py-4">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div>
              <h2 className="text-lg font-semibold">
                {selectedToken === "--wex-palette-ramps" 
                  ? "Palette Ramps"
                  : mapping 
                    ? mapping.label 
                    : "Live Preview"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedToken === "--wex-palette-ramps"
                  ? "Edit base colors for all palette ramps. Changes cascade to all shades."
                  : mapping 
                    ? `${easyUsages.length} components, ${hardUsages.length} hover/focus states`
                    : "Select a token from the left panel to see affected components"
                }
              </p>
            </div>
            
            {/* Edit control in header */}
            {selectedToken && currentValue && onValueChange && (
              <EditControl 
                value={currentValue} 
                onChange={onValueChange}
                tokenLabel={mapping?.label || selectedToken}
                tokenName={selectedToken}
              />
            )}
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-8">
            {!selectedToken && <EmptyStateFullWidth />}
            
            {selectedToken === "--wex-primary" && <PrimaryPreviewFullWidth />}
            {selectedToken === "--wex-destructive" && <DestructivePreviewFullWidth />}
            {selectedToken === "--wex-success" && <SuccessPreviewFullWidth />}
            {selectedToken === "--wex-warning" && <WarningPreviewFullWidth />}
            {selectedToken === "--wex-info" && <InfoPreviewFullWidth />}
            {selectedToken === "--wex-content-bg" && <SurfaceBackgroundPreview />}
            {selectedToken === "--wex-surface-subtle" && <SurfaceSubtlePreview />}
            {selectedToken === "--wex-content-border" && <BorderPreview />}
            {selectedToken === "--wex-input-border" && <InputBorderPreview />}
            {selectedToken === "--wex-text" && <TextPreview />}
            {selectedToken === "--wex-text-muted" && <TextMutedPreview />}
            {selectedToken === "--wex-focus-ring-color" && <FocusRingPreview />}
            
            {/* Radius tokens */}
            {(selectedToken === "--wex-radius-sm" || selectedToken === "--wex-radius-md" || selectedToken === "--wex-radius-lg") && (
              <RadiusPreview tokenName={selectedToken} />
            )}
            
            {/* Typography tokens */}
            {(selectedToken === "--wex-font-sans" || selectedToken === "--wex-font-display") && (
              <TypographyPreview tokenName={selectedToken} />
            )}
            
            {/* Foreground tokens */}
            {selectedToken === "--wex-primary-contrast" && <PrimaryContrastPreview />}
            {selectedToken === "--wex-destructive-foreground" && <DestructiveForegroundPreview />}
            {selectedToken === "--wex-success-foreground" && <SuccessForegroundPreview />}
            {selectedToken === "--wex-warning-foreground" && <WarningForegroundPreview />}
            {selectedToken === "--wex-info-foreground" && <InfoForegroundPreview />}

            {/* All Palette Ramps */}
            {selectedToken === "--wex-palette-ramps" && (
              <AllPaletteRampsPreview 
                currentValue={currentValue}
                onValueChange={onValueChange}
                onRampChange={onRampChange}
              />
            )}

            {/* Individual palette tokens */}
            {selectedToken?.startsWith("--wex-palette-") && 
             selectedToken !== "--wex-palette-ramps" && (
              <PaletteTokenPreview tokenName={selectedToken} />
            )}

            {/* Layer 3 Component Tokens */}
            {selectedToken?.startsWith("--wex-component-") && (
              <ComponentTokenPreview tokenName={selectedToken} />
            )}

            {/* Token Cascade Visualization */}
            {selectedToken && !selectedToken.includes("-palette-ramps") && (
              <TokenCascadeView tokenName={selectedToken} className="mt-8" />
            )}

            {/* Hard states swatches */}
            {hardUsages.length > 0 && (
              <HardStateSwatches usages={hardUsages} tokenName={selectedToken || ""} />
            )}
          </div>
        </div>
      </div>
      </ContrastComplianceContext.Provider>
    );
  }

  // Original card layout (for backward compatibility)
  return (
    <ContrastComplianceContext.Provider value={complianceContextValue}>
      <WexCard className={cn("h-fit", className)}>
      <WexCard.Header className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <WexCard.Title className="text-base">Live Preview</WexCard.Title>
            <WexCard.Description>
              {mapping 
                ? `${mapping.label}: ${easyUsages.length} renderable, ${hardUsages.length} hover/focus states`
                : "Select a token to see affected components"
              }
            </WexCard.Description>
          </div>
          
          {/* Edit control */}
          {selectedToken && currentValue && onValueChange && (
            <EditControl 
              value={currentValue} 
              onChange={onValueChange}
              tokenLabel={mapping?.label || selectedToken}
              tokenName={selectedToken}
            />
          )}
        </div>
      </WexCard.Header>
      <WexCard.Content className="space-y-6">
        {!selectedToken && <DefaultPreview />}
        
        {selectedToken === "--wex-primary" && <PrimaryPreview />}
        {selectedToken === "--wex-destructive" && <DestructivePreview />}
        {selectedToken === "--wex-success" && <SuccessPreview />}
        {selectedToken === "--wex-warning" && <WarningPreview />}
        {selectedToken === "--wex-info" && <InfoPreview />}
        {selectedToken === "--wex-content-bg" && <SurfaceBackgroundPreview />}
        {selectedToken === "--wex-surface-subtle" && <SurfaceSubtlePreview />}
        {selectedToken === "--wex-content-border" && <BorderPreview />}
        {selectedToken === "--wex-input-border" && <InputBorderPreview />}
        {selectedToken === "--wex-text" && <TextPreview />}
        {selectedToken === "--wex-text-muted" && <TextMutedPreview />}
        {selectedToken === "--wex-focus-ring-color" && <FocusRingPreview />}
        
        {/* Foreground tokens (text ON colored backgrounds) */}
        {selectedToken === "--wex-primary-contrast" && <PrimaryContrastPreview />}
        {selectedToken === "--wex-destructive-foreground" && <DestructiveForegroundPreview />}
        {selectedToken === "--wex-success-foreground" && <SuccessForegroundPreview />}
        {selectedToken === "--wex-warning-foreground" && <WarningForegroundPreview />}
        {selectedToken === "--wex-info-foreground" && <InfoForegroundPreview />}

        {/* Show hard-to-render states as swatches */}
        {hardUsages.length > 0 && (
          <HardStateSwatches usages={hardUsages} tokenName={selectedToken || ""} />
        )}
      </WexCard.Content>
    </WexCard>
    </ContrastComplianceContext.Provider>
  );
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

function PreviewSection({ 
  label, 
  children 
}: { 
  label: string; 
  children: React.ReactNode; 
}) {
  return (
    <div className="space-y-1.5">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

function DefaultPreview() {
  return (
    <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
      Select a semantic token to preview affected components
    </div>
  );
}


/**
 * Shows swatches for hard-to-render states
 */
function HardStateSwatches({ 
  usages, 
  tokenName 
}: { 
  usages: ComponentUsage[];
  tokenName: string;
}) {
  // Group by state type
  const hoverStates = usages.filter(u => u.state === "hover");
  const focusStates = usages.filter(u => u.state === "focus");

  // Determine the base color class for swatches
  const getSwatchColor = () => {
    if (tokenName.includes("primary")) return "bg-primary";
    if (tokenName.includes("destructive")) return "bg-destructive";
    if (tokenName.includes("success")) return "bg-success";
    if (tokenName.includes("warning")) return "bg-warning";
    if (tokenName.includes("info")) return "bg-info";
    if (tokenName.includes("focus") || tokenName.includes("ring")) return "bg-ring";
    if (tokenName.includes("muted")) return "bg-muted";
    if (tokenName.includes("accent")) return "bg-accent";
    return "bg-primary";
  };

  const swatchColor = getSwatchColor();
  
  return (
    <PreviewSection label="Interactive States (Swatches)">
      <div className="space-y-3 p-3 rounded-md bg-muted/30 border border-dashed">
        <p className="text-xs text-muted-foreground italic">
          These states require user interaction and cannot be shown statically:
        </p>
        
        {hoverStates.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-medium">Hover States</div>
            <div className="flex items-center gap-3">
              {/* Hover swatch - slightly darker shade */}
              <div 
                className={cn(
                  "w-6 h-6 rounded-md border border-border/50",
                  swatchColor
                )}
                style={{ filter: "brightness(0.85)" }}
                title="Hover color (darker shade)"
              />
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">{hoverStates.length} components</span>
                <span className="ml-1">({hoverStates.slice(0, 3).map(u => u.component).join(", ")}{hoverStates.length > 3 ? "..." : ""})</span>
              </div>
            </div>
          </div>
        )}
        
        {focusStates.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-medium">Focus States</div>
            <div className="flex items-center gap-3">
              <div 
                className={cn(
                  "w-6 h-6 rounded-md ring-2 ring-offset-2 ring-offset-background",
                  swatchColor.replace("bg-", "ring-")
                )}
              />
              <span className="text-xs text-muted-foreground">
                {focusStates.length} components use this focus ring
              </span>
            </div>
          </div>
        )}
      </div>
    </PreviewSection>
  );
}

// =============================================================================
// PRIMARY TOKEN PREVIEW
// =============================================================================

function PrimaryPreview() {
  const [calendarDate, setCalendarDate] = React.useState<Date | undefined>(new Date());
  
  return (
    <div className="space-y-4">
      {/* Buttons */}
      <PreviewSection label="Button (default, disabled)">
        <div className="flex flex-wrap gap-2">
          <WexButton size="sm">Primary</WexButton>
          <WexButton size="sm" disabled>Disabled</WexButton>
          <a href="#" onClick={e => e.preventDefault()} className="text-link text-sm hover:underline">Link</a>
        </div>
      </PreviewSection>

      {/* Badge */}
      <PreviewSection label="Badge">
        <WexBadge>Default Badge</WexBadge>
      </PreviewSection>

      {/* Progress */}
      <PreviewSection label="Progress (track bg-primary/20 + bar bg-primary)">
        <WexProgress value={65} className="w-full" />
      </PreviewSection>

      {/* Switch - only checked uses primary (unchecked uses bg-input) */}
      <PreviewSection label="Switch (checked only uses primary)">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <WexSwitch defaultChecked id="sw-checked" />
            <label htmlFor="sw-checked" className="text-xs">On (bg-primary)</label>
          </div>
          <div className="flex items-center gap-2">
            <WexSwitch disabled defaultChecked id="sw-disabled" />
            <label htmlFor="sw-disabled" className="text-xs text-muted-foreground">Disabled</label>
          </div>
        </div>
      </PreviewSection>

      {/* Checkbox */}
      <PreviewSection label="Checkbox (checked, unchecked, disabled)">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <WexCheckbox defaultChecked id="cb-checked" />
            <label htmlFor="cb-checked" className="text-xs">Checked</label>
          </div>
          <div className="flex items-center gap-2">
            <WexCheckbox id="cb-unchecked" />
            <label htmlFor="cb-unchecked" className="text-xs">Unchecked</label>
          </div>
          <div className="flex items-center gap-2">
            <WexCheckbox disabled defaultChecked id="cb-disabled" />
            <label htmlFor="cb-disabled" className="text-xs text-muted-foreground">Disabled</label>
          </div>
        </div>
      </PreviewSection>

      {/* Radio */}
      <PreviewSection label="Radio Group (border + indicator)">
        <WexRadioGroup defaultValue="opt1" className="flex gap-4">
          <div className="flex items-center gap-2">
            <WexRadioGroup.Item value="opt1" id="r1" />
            <label htmlFor="r1" className="text-xs">Selected</label>
          </div>
          <div className="flex items-center gap-2">
            <WexRadioGroup.Item value="opt2" id="r2" />
            <label htmlFor="r2" className="text-xs">Option 2</label>
          </div>
        </WexRadioGroup>
      </PreviewSection>

      {/* Slider */}
      <PreviewSection label="Slider (track, range, thumb border)">
        <WexSlider defaultValue={[50]} max={100} step={1} className="w-full" />
      </PreviewSection>

      {/* Skeleton */}
      <PreviewSection label="Skeleton (bg-primary/10)">
        <div className="flex items-center gap-3">
          <WexSkeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <WexSkeleton className="h-4 w-32" />
            <WexSkeleton className="h-3 w-24" />
          </div>
        </div>
      </PreviewSection>

      {/* Calendar */}
      <PreviewSection label="Calendar (selected date)">
        <div className="border rounded-md w-fit">
          <WexCalendar 
            mode="single" 
            selected={calendarDate} 
            onSelect={setCalendarDate}
            className="p-0"
          />
        </div>
      </PreviewSection>

      {/* Field checked state */}
      <PreviewSection label="Field (checked highlight bg-primary/5)">
        <div className="flex items-center gap-3 p-3 rounded-md border bg-primary/5 border-primary">
          <WexCheckbox defaultChecked id="field-cb" />
          <label htmlFor="field-cb" className="text-sm">Selected field with primary highlight</label>
        </div>
      </PreviewSection>

      {/* Focus Ring - uses same color as primary */}
      <PreviewSection label="Focus Ring (same color as primary)">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-md border-2 ring-2 ring-ring ring-offset-2 ring-offset-background" />
          <div className="text-xs text-muted-foreground">
            Focus ring uses same Blue 700 palette shade
          </div>
        </div>
      </PreviewSection>
    </div>
  );
}

// =============================================================================
// DESTRUCTIVE TOKEN PREVIEW
// =============================================================================

function DestructivePreview() {
  return (
    <div className="space-y-4">
      {/* Button */}
      <PreviewSection label="Button (default, disabled)">
        <div className="flex flex-wrap gap-2">
          <WexButton size="sm" intent="destructive">Delete</WexButton>
          <WexButton size="sm" intent="destructive" disabled>Disabled</WexButton>
        </div>
      </PreviewSection>

      {/* Badge */}
      <PreviewSection label="Badge">
        <WexBadge intent="destructive">Error</WexBadge>
      </PreviewSection>

      {/* Alert */}
      <PreviewSection label="Alert">
        <WexAlert intent="destructive">
          <WexAlert.Title>Error</WexAlert.Title>
          <WexAlert.Description>
            Something went wrong. Please try again.
          </WexAlert.Description>
        </WexAlert>
      </PreviewSection>

      {/* Form Error State */}
      <PreviewSection label="Form Field (error state)">
        <div className="space-y-1">
          <WexInput 
            placeholder="Email address" 
            className="border-destructive focus-visible:ring-destructive/20"
            aria-invalid="true"
          />
          <p className="text-sm text-destructive">Please enter a valid email address.</p>
        </div>
      </PreviewSection>
    </div>
  );
}

// =============================================================================
// SUCCESS TOKEN PREVIEW
// =============================================================================

function SuccessPreview() {
  return (
    <div className="space-y-4">
      {/* Badge */}
      <PreviewSection label="Badge">
        <WexBadge intent="success">Success</WexBadge>
      </PreviewSection>

      {/* Alert */}
      <PreviewSection label="Alert">
        <WexAlert intent="success">
          <WexAlert.Title>Success!</WexAlert.Title>
          <WexAlert.Description>
            Your changes have been saved successfully.
          </WexAlert.Description>
        </WexAlert>
      </PreviewSection>
    </div>
  );
}

// =============================================================================
// WARNING TOKEN PREVIEW
// =============================================================================

function WarningPreview() {
  return (
    <div className="space-y-4">
      {/* Badge */}
      <PreviewSection label="Badge">
        <WexBadge intent="warning">Warning</WexBadge>
      </PreviewSection>

      {/* Alert */}
      <PreviewSection label="Alert">
        <WexAlert intent="warning">
          <WexAlert.Title>Warning</WexAlert.Title>
          <WexAlert.Description>
            Please review this information before continuing.
          </WexAlert.Description>
        </WexAlert>
      </PreviewSection>
    </div>
  );
}

// =============================================================================
// INFO TOKEN PREVIEW
// =============================================================================

function InfoPreview() {
  return (
    <div className="space-y-4">
      {/* Badge */}
      <PreviewSection label="Badge">
        <WexBadge intent="info">Info</WexBadge>
      </PreviewSection>

      {/* Alert */}
      <PreviewSection label="Alert">
        <WexAlert intent="info">
          <WexAlert.Title>Information</WexAlert.Title>
          <WexAlert.Description>
            Here is some helpful information for you.
          </WexAlert.Description>
        </WexAlert>
      </PreviewSection>
    </div>
  );
}

// =============================================================================
// SURFACE BACKGROUND PREVIEW
// =============================================================================

function SurfaceBackgroundPreview() {
  return (
    <div className="space-y-4">
      {/* Card */}
      <PreviewSection label="Card (bg-background)">
        <WexCard className="p-4">
          <p className="text-sm">Card uses background color.</p>
        </WexCard>
      </PreviewSection>

      {/* Nested example */}
      <PreviewSection label="Layered Surfaces">
        <div className="p-4 bg-muted rounded-md">
          <p className="text-xs text-muted-foreground mb-2">Muted layer</p>
          <div className="p-3 bg-background rounded-md border">
            <p className="text-sm">Content on background</p>
          </div>
        </div>
      </PreviewSection>

      {/* Additional non-renderable components */}
      <AdditionalComponentsList
        tokenName="--background"
        components={[
          { name: "WexDialog", description: "Dialog content background" },
          { name: "WexAlertDialog", description: "Alert dialog content background" },
          { name: "WexSheet", description: "Sheet content background" },
          { name: "WexDrawer", description: "Drawer content background" },
          { name: "WexPopover", description: "Popover content background" },
          { name: "WexTooltip", description: "Tooltip content background" },
          { name: "WexHoverCard", description: "Hover card content background" },
          { name: "WexDropdownMenu", description: "Dropdown menu background" },
          { name: "WexContextMenu", description: "Context menu background" },
          { name: "WexCommand", description: "Command palette background" },
          { name: "WexMenubar", description: "Menubar background" },
          { name: "WexNavigationMenu", description: "Navigation menu trigger" },
          { name: "WexSidebar", description: "Sidebar content background" },
        ]}
      />
    </div>
  );
}

// =============================================================================
// SURFACE SUBTLE (MUTED/ACCENT) PREVIEW
// =============================================================================

function SurfaceSubtlePreview() {
  const today = new Date();
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 5),
  });

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <PreviewSection label="Tabs (bg-muted list)">
        <WexTabs defaultValue="tab1" className="w-full">
          <WexTabs.List>
            <WexTabs.Trigger value="tab1">Active</WexTabs.Trigger>
            <WexTabs.Trigger value="tab2">Inactive</WexTabs.Trigger>
          </WexTabs.List>
        </WexTabs>
      </PreviewSection>

      {/* Muted Background */}
      <PreviewSection label="Muted Background">
        <div className="bg-muted rounded-md p-4">
          <p className="text-sm">Content on muted surface.</p>
        </div>
      </PreviewSection>

      {/* Avatar */}
      <PreviewSection label="Avatar (fallback = bg-muted)">
        <div className="flex items-center gap-3">
          <WexAvatar>
            <WexAvatar.Fallback>JD</WexAvatar.Fallback>
          </WexAvatar>
          <WexAvatar>
            <WexAvatar.Fallback>AB</WexAvatar.Fallback>
          </WexAvatar>
          <WexAvatar>
            <WexAvatar.Fallback>WX</WexAvatar.Fallback>
          </WexAvatar>
        </div>
      </PreviewSection>

      {/* Toggle (on state uses accent) */}
      <PreviewSection label="Toggle (on = bg-accent)">
        <div className="flex gap-2">
          <WexToggle defaultPressed>On</WexToggle>
          <WexToggle>Off</WexToggle>
        </div>
      </PreviewSection>

      {/* Calendar Date Range - shows bg-accent for middle dates */}
      <PreviewSection label="Calendar Date Range (middle dates = bg-accent)">
        <div className="border rounded-md w-fit">
          <WexCalendar 
            mode="range" 
            selected={dateRange}
            onSelect={setDateRange}
            className="p-0"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Dates between start and end use bg-accent (surface-subtle)
        </p>
      </PreviewSection>

      {/* Kbd */}
      <PreviewSection label="Keyboard Shortcut (bg-muted)">
        <div className="flex items-center gap-1 text-sm">
          Press <kbd className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-xs font-mono">⌘</kbd> + 
          <kbd className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-xs font-mono">K</kbd>
        </div>
      </PreviewSection>

      {/* Additional non-renderable components */}
      <AdditionalComponentsList
        tokenName="--muted"
        components={[
          { name: "WexAccordion", description: "Trigger hover background" },
          { name: "WexDataTable", description: "Row hover background" },
          { name: "WexTable", description: "Footer background" },
          { name: "WexCarousel", description: "Navigation button background" },
          { name: "WexSidebar", description: "Inactive item background" },
          { name: "WexEmpty", description: "Icon container background" },
        ]}
      />
    </div>
  );
}

// =============================================================================
// BORDER TOKEN PREVIEW
// =============================================================================

function BorderPreview() {
  return (
    <div className="space-y-4">
      {/* Card */}
      <PreviewSection label="Card Border">
        <WexCard className="p-4">
          <p className="text-sm">Card with border.</p>
        </WexCard>
      </PreviewSection>

      {/* Separator */}
      <PreviewSection label="Separator">
        <div className="space-y-2">
          <p className="text-sm">Content above</p>
          <WexSeparator />
          <p className="text-sm">Content below</p>
        </div>
      </PreviewSection>

      {/* Additional non-renderable components */}
      <AdditionalComponentsList
        tokenName="--border"
        components={[
          { name: "WexAccordion", description: "Accordion item borders" },
          { name: "WexTable", description: "Table cell borders" },
          { name: "WexDataTable", description: "Data table borders" },
          { name: "WexDialog", description: "Dialog border" },
          { name: "WexSheet", description: "Sheet border" },
          { name: "WexDrawer", description: "Drawer border" },
          { name: "WexSidebar", description: "Sidebar border" },
        ]}
      />
    </div>
  );
}

// =============================================================================
// INPUT BORDER TOKEN PREVIEW
// =============================================================================

function InputBorderPreview() {
  return (
    <div className="space-y-4">
      {/* Input - default, focused states */}
      <PreviewSection label="Input (default, disabled)">
        <div className="space-y-2">
          <WexInput placeholder="Default input..." />
          <WexInput placeholder="Disabled input..." disabled />
        </div>
      </PreviewSection>

      {/* Textarea */}
      <PreviewSection label="Textarea">
        <WexTextarea placeholder="Multi-line text input with border-input..." />
      </PreviewSection>

      {/* Select */}
      <PreviewSection label="Select (trigger = border-input)">
        <WexSelect>
          <WexSelect.Trigger className="w-full">
            <WexSelect.Value placeholder="Select an option..." />
          </WexSelect.Trigger>
          <WexSelect.Content>
            <WexSelect.Item value="option1">Option 1</WexSelect.Item>
            <WexSelect.Item value="option2">Option 2</WexSelect.Item>
            <WexSelect.Item value="option3">Option 3</WexSelect.Item>
          </WexSelect.Content>
        </WexSelect>
      </PreviewSection>

      {/* Outline buttons */}
      <PreviewSection label="Outline Buttons (border-input)">
        <div className="flex flex-wrap gap-2">
          <WexButton variant="outline" size="sm">Outline Button</WexButton>
          <WexButton variant="outline" size="sm" disabled>Disabled</WexButton>
        </div>
      </PreviewSection>

      {/* Toggle outline variant */}
      <PreviewSection label="Toggle Outline (border-input)">
        <div className="flex gap-2">
          <WexToggle variant="outline">Toggle</WexToggle>
          <WexToggle variant="outline" defaultPressed>Pressed</WexToggle>
        </div>
      </PreviewSection>

      {/* Focus state note */}
      <PreviewSection label="Focus State">
        <div className="p-3 rounded-md bg-muted/30 border border-dashed">
          <p className="text-xs text-muted-foreground italic">
            Click an input above to see the focus ring (ring-ring token).
            The border-input color remains visible around focused elements.
          </p>
        </div>
      </PreviewSection>

      {/* Additional non-renderable components */}
      <AdditionalComponentsList
        tokenName="--input"
        components={[
          { name: "WexInputOTP", description: "OTP input slot borders" },
          { name: "WexInputGroup", description: "Input group container border" },
          { name: "WexDatePicker", description: "Date picker input trigger" },
          { name: "WexCombobox", description: "Combobox input trigger" },
        ]}
      />
    </div>
  );
}

// =============================================================================
// TEXT TOKEN PREVIEW
// =============================================================================

function TextPreview() {
  return (
    <div className="space-y-4">
      {/* Foreground text */}
      <PreviewSection label="Body Text">
        <p className="text-foreground">
          This is primary text content using the foreground color.
        </p>
      </PreviewSection>

      {/* Card title */}
      <PreviewSection label="Card Title">
        <WexCard>
          <WexCard.Header>
            <WexCard.Title>Card Title (text-foreground)</WexCard.Title>
          </WexCard.Header>
        </WexCard>
      </PreviewSection>

      {/* Alert default */}
      <PreviewSection label="Alert Default">
        <WexAlert>
          <WexAlert.Title>Default Alert</WexAlert.Title>
          <WexAlert.Description>Uses text-foreground for content.</WexAlert.Description>
        </WexAlert>
      </PreviewSection>

      {/* Badge outline */}
      <PreviewSection label="Badge Outline">
        <WexBadge intent="outline">Outline Badge</WexBadge>
      </PreviewSection>

      {/* Active tab */}
      <PreviewSection label="Active Tab">
        <WexTabs defaultValue="tab1">
          <WexTabs.List>
            <WexTabs.Trigger value="tab1">Active (foreground)</WexTabs.Trigger>
            <WexTabs.Trigger value="tab2">Inactive</WexTabs.Trigger>
          </WexTabs.List>
        </WexTabs>
      </PreviewSection>

      {/* Hard to show - reference swatches */}
      <PreviewSection label="Also Uses text-foreground (not renderable)">
        <div className="p-3 rounded-md bg-muted/30 border border-dashed space-y-2">
          <p className="text-xs text-muted-foreground italic mb-2">
            These components use text-foreground but require interaction to view:
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-background border">Dialog Title</span>
            <span className="px-2 py-1 rounded bg-background border">Sheet Title</span>
            <span className="px-2 py-1 rounded bg-background border">Toast Default</span>
            <span className="px-2 py-1 rounded bg-background border">Popover Content</span>
            <span className="px-2 py-1 rounded bg-background border">Tooltip Text</span>
            <span className="px-2 py-1 rounded bg-background border">Dropdown Items</span>
            <span className="px-2 py-1 rounded bg-background border">Context Menu</span>
          </div>
        </div>
      </PreviewSection>
    </div>
  );
}

// =============================================================================
// TEXT MUTED TOKEN PREVIEW
// =============================================================================

function TextMutedPreview() {
  return (
    <div className="space-y-4">
      {/* Muted text */}
      <PreviewSection label="Muted Text">
        <p className="text-muted-foreground">
          This is secondary/muted text for descriptions and labels.
        </p>
      </PreviewSection>

      {/* Placeholder */}
      <PreviewSection label="Input Placeholder">
        <WexInput placeholder="Placeholder uses muted color..." />
      </PreviewSection>

      {/* Card description */}
      <PreviewSection label="Card Description">
        <WexCard>
          <WexCard.Header>
            <WexCard.Title>Title</WexCard.Title>
            <WexCard.Description>
              This description uses muted foreground color.
            </WexCard.Description>
          </WexCard.Header>
        </WexCard>
      </PreviewSection>

      {/* Inactive tabs */}
      <PreviewSection label="Inactive Tab Text">
        <WexTabs defaultValue="tab2">
          <WexTabs.List>
            <WexTabs.Trigger value="tab1">Tab 1 (inactive/muted)</WexTabs.Trigger>
            <WexTabs.Trigger value="tab2">Tab 2 (active)</WexTabs.Trigger>
          </WexTabs.List>
        </WexTabs>
      </PreviewSection>
    </div>
  );
}

// =============================================================================
// FOCUS RING TOKEN PREVIEW
// =============================================================================

function FocusRingPreview() {
  return (
    <div className="space-y-4">
      {/* Explanation */}
      <PreviewSection label="Focus Ring Color">
        <p className="text-sm text-muted-foreground">
          The focus ring appears when elements are focused via keyboard navigation.
          Below are swatches showing how the ring color is used:
        </p>
      </PreviewSection>

      {/* Visual swatch showing the ring */}
      <PreviewSection label="Ring Swatch">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-md border-2 ring-2 ring-ring ring-offset-2 ring-offset-background" />
          <div className="text-sm">
            <div className="font-medium">Focus Ring</div>
            <div className="text-muted-foreground text-xs">ring-ring with ring-offset-background</div>
          </div>
        </div>
      </PreviewSection>

      {/* Focusable elements */}
      <PreviewSection label="Try Tab Key to See Focus">
        <div className="flex flex-wrap gap-2">
          <WexButton size="sm">Tab to me</WexButton>
          <WexInput className="w-32" placeholder="Or me..." />
          <WexCheckbox id="focus-cb" />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Press Tab to navigate and see the focus ring on each element.
        </p>
      </PreviewSection>

      {/* Components that use focus ring */}
      <PreviewSection label="Components with Focus Ring">
        <div className="text-xs text-muted-foreground space-y-1">
          <div>• WexButton, WexBadge, WexCheckbox, WexRadioGroup</div>
          <div>• WexSwitch, WexSlider, WexInput, WexTextarea</div>
          <div>• WexSelect, WexTabs, WexCalendar, Toggle</div>
          <div>• Dialog/Sheet close buttons, Resizable handles</div>
        </div>
      </PreviewSection>
    </div>
  );
}

// =============================================================================
// FOREGROUND TOKEN PREVIEWS (text ON colored backgrounds)
// =============================================================================

function PrimaryContrastPreview() {
  return (
    <div className="space-y-4">
      <PreviewSection label="Text on Primary Background">
        <div className="bg-primary text-primary-foreground p-4 rounded-md">
          <div className="font-semibold">Primary Button Text</div>
          <div className="text-sm opacity-90">This text appears on primary-colored backgrounds.</div>
        </div>
      </PreviewSection>

      <PreviewSection label="Components Using primary-foreground">
        <div className="flex flex-wrap items-center gap-3">
          <WexButton>Submit</WexButton>
          <WexBadge>New</WexBadge>
          <WexCheckbox defaultChecked id="preview-cb" />
        </div>
      </PreviewSection>

      <PreviewSection label="Also Uses (Calendar, Toast)">
        <div className="p-3 rounded-md bg-muted/30 border border-dashed">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-primary text-primary-foreground">Selected Date</span>
            <span className="px-2 py-1 rounded bg-primary text-primary-foreground">Toast Action</span>
          </div>
        </div>
      </PreviewSection>

      <PreviewSection label="Auto-Derived Note">
        <p className="text-xs text-muted-foreground">
          This color is auto-derived from primary luminance: white text for dark backgrounds, black text for light.
        </p>
      </PreviewSection>
    </div>
  );
}

function DestructiveForegroundPreview() {
  return (
    <div className="space-y-4">
      <PreviewSection label="Text on Destructive Background">
        <div className="bg-destructive text-destructive-foreground p-4 rounded-md">
          <div className="font-semibold">Destructive Action Text</div>
          <div className="text-sm opacity-90">White text on red for maximum contrast.</div>
        </div>
      </PreviewSection>

      <PreviewSection label="Components Using destructive-foreground">
        <div className="flex flex-wrap items-center gap-3">
          <WexButton intent="destructive">Delete</WexButton>
          <WexBadge intent="destructive">Error</WexBadge>
        </div>
      </PreviewSection>

      <PreviewSection label="Also Uses (Toast)">
        <div className="p-3 rounded-md bg-muted/30 border border-dashed">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-destructive text-destructive-foreground">Error Toast</span>
          </div>
        </div>
      </PreviewSection>
    </div>
  );
}

function SuccessForegroundPreview() {
  return (
    <div className="space-y-4">
      <PreviewSection label="Text on Success Background">
        <div className="bg-success text-success-foreground p-4 rounded-md">
          <div className="font-semibold">Success Message</div>
          <div className="text-sm opacity-90">White text on green for clarity.</div>
        </div>
      </PreviewSection>

      <PreviewSection label="Components Using success-foreground">
        <div className="flex flex-wrap items-center gap-3">
          <WexBadge intent="success">Complete</WexBadge>
        </div>
      </PreviewSection>

      <PreviewSection label="Also Uses (Toast)">
        <div className="p-3 rounded-md bg-muted/30 border border-dashed">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-success text-success-foreground">Success Toast</span>
          </div>
        </div>
      </PreviewSection>

      <PreviewSection label="Note">
        <p className="text-xs text-muted-foreground">
          WexAlert success uses <code className="text-xs">text-success</code> (not foreground) for tinted backgrounds.
        </p>
      </PreviewSection>
    </div>
  );
}

function WarningForegroundPreview() {
  return (
    <div className="space-y-4">
      <PreviewSection label="Text on Warning Background">
        <div className="bg-warning text-warning-foreground p-4 rounded-md">
          <div className="font-semibold">Warning Message</div>
          <div className="text-sm opacity-90">Black text on amber for readability.</div>
        </div>
      </PreviewSection>

      <PreviewSection label="Components Using warning-foreground">
        <div className="flex flex-wrap gap-2">
          <WexBadge intent="warning">Caution</WexBadge>
          <WexAlert intent="warning">
            <WexAlert.Title>Warning</WexAlert.Title>
          </WexAlert>
        </div>
      </PreviewSection>

      <PreviewSection label="Also Uses (not renderable)">
        <div className="p-3 rounded-md bg-muted/30 border border-dashed">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-warning text-warning-foreground">Warning Toast</span>
          </div>
        </div>
      </PreviewSection>
    </div>
  );
}

function InfoForegroundPreview() {
  return (
    <div className="space-y-4">
      <PreviewSection label="Text on Info Background">
        <div className="bg-info text-info-foreground p-4 rounded-md">
          <div className="font-semibold">Info Message</div>
          <div className="text-sm opacity-90">White text on cyan for visibility.</div>
        </div>
      </PreviewSection>

      <PreviewSection label="Components Using info-foreground">
        <div className="flex flex-wrap items-center gap-3">
          <WexBadge intent="info">Note</WexBadge>
        </div>
      </PreviewSection>

      <PreviewSection label="Also Uses (Toast)">
        <div className="p-3 rounded-md bg-muted/30 border border-dashed">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-info text-info-foreground">Info Toast</span>
          </div>
        </div>
      </PreviewSection>

      <PreviewSection label="Note">
        <p className="text-xs text-muted-foreground">
          WexAlert info uses <code className="text-xs">text-info</code> (not foreground) for tinted backgrounds.
        </p>
      </PreviewSection>
    </div>
  );
}

// =============================================================================
// FULL WIDTH LAYOUT COMPONENTS
// =============================================================================

function EmptyStateFullWidth() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </div>
      <h3 className="text-lg font-medium mb-2">Select a Token</h3>
      <p className="text-muted-foreground max-w-md">
        Choose a token from the left panel to see all the components that use it.
        You can edit the color value to preview changes in real-time.
      </p>
    </div>
  );
}

/**
 * Full-width grid layout for preview sections
 */
function PreviewGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  );
}

// =============================================================================
// CONTRAST BADGE COMPONENT
// =============================================================================

interface ContrastBadgeProps {
  cardTitle: string;
  getIssuesForCard: (title: string) => ContrastCheckResult[];
}

function ContrastBadge({ cardTitle, getIssuesForCard }: ContrastBadgeProps) {
  const issues = getIssuesForCard(cardTitle);
  
  // If no contrast pairs are mapped to this card, don't show anything
  if (issues.length === 0) {
    return null;
  }

  const failingIssues = issues.filter((i) => !i.passes);
  const allPass = failingIssues.length === 0;
  
  // Show the lowest ratio for quick reference
  const lowestRatio = Math.min(...issues.map((i) => i.ratio));

  return (
    <WexPopover>
      <WexPopover.Trigger asChild>
        <button
          className={cn(
            "flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors",
            allPass
              ? "bg-success/10 text-success hover:bg-success/20"
              : "bg-destructive/10 text-destructive hover:bg-destructive/20"
          )}
          aria-label={allPass ? "Contrast checks passing" : "Contrast issues detected"}
        >
          {allPass ? (
            <CheckCircle2 className="h-3 w-3" />
          ) : (
            <AlertTriangle className="h-3 w-3" />
          )}
          <span>{lowestRatio.toFixed(1)}:1</span>
        </button>
      </WexPopover.Trigger>
      <WexPopover.Content side="top" align="end" className="w-72 p-0">
        <div className="p-3 space-y-2">
          <div className="text-xs font-semibold">
            {allPass ? "All Contrast Checks Passing" : "Contrast Issues"}
          </div>
          {issues.map((issue, idx) => (
            <div
              key={idx}
              className={cn(
                "text-xs p-2 rounded border",
                issue.passes
                  ? "bg-success/5 border-success/20"
                  : "bg-destructive/5 border-destructive/20"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{issue.pair.name}</span>
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded text-[10px] font-medium",
                    issue.passes ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                  )}
                >
                  {issue.ratio.toFixed(1)}:1
                </span>
              </div>
              {!issue.passes && issue.suggestion && (
                <p className="text-muted-foreground text-[10px] leading-relaxed">
                  {issue.suggestion}
                </p>
              )}
            </div>
          ))}
        </div>
      </WexPopover.Content>
    </WexPopover>
  );
}

// =============================================================================
// ADDITIONAL COMPONENTS LIST (for non-renderable components)
// =============================================================================

interface AdditionalComponent {
  name: string;
  description: string;
}

interface AdditionalComponentsListProps {
  /** Token name for color swatch */
  tokenName: string;
  /** List of components that use this token but aren't rendered */
  components: AdditionalComponent[];
  /** Get contrast check results for a component */
  getContrastForComponent?: (componentName: string) => ContrastCheckResult | undefined;
}

function AdditionalComponentsList({ 
  tokenName, 
  components,
  getContrastForComponent 
}: AdditionalComponentsListProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Get the token color for the swatch (must be before early return to respect rules of hooks)
  const tokenColor = React.useMemo(() => {
    if (typeof window === "undefined") return "hsl(0 0% 50%)";
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(tokenName)
      .trim();
    return value ? `hsl(${value})` : "hsl(0 0% 50%)";
  }, [tokenName]);
  
  if (components.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 border-t border-border pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronRight
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-90"
          )}
        />
        <span>Additional Components ({components.length})</span>
      </button>
      
      {isOpen && (
        <div className="mt-3 space-y-1">
          {components.map((comp) => {
            const contrastResult = getContrastForComponent?.(comp.name);
            
            return (
              <div 
                key={comp.name}
                className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-muted/50 transition-colors"
              >
                {/* Color swatch */}
                <div 
                  className="w-4 h-4 rounded-sm border border-border/50 flex-shrink-0"
                  style={{ backgroundColor: tokenColor }}
                />
                
                {/* Component info */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{comp.name}</div>
                  <div className="text-[10px] text-muted-foreground truncate">
                    {comp.description}
                  </div>
                </div>
                
                {/* Contrast badge */}
                {contrastResult && (
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded text-[10px] font-medium flex-shrink-0",
                      contrastResult.passes
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    )}
                  >
                    {contrastResult.ratio.toFixed(1)}:1
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// CONTRAST COMPLIANCE CONTEXT
// =============================================================================

interface ContrastComplianceContextValue {
  getIssuesForCard: (title: string) => ContrastCheckResult[];
}

const ContrastComplianceContext = React.createContext<ContrastComplianceContextValue | null>(null);

function useContrastComplianceContext() {
  return React.useContext(ContrastComplianceContext);
}

// =============================================================================
// PREVIEW CARD WITH A11Y INDICATOR
// =============================================================================

function PreviewCard({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode;
}) {
  const complianceContext = useContrastComplianceContext();

  return (
    <div className="p-4 rounded-lg border bg-card relative">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        {complianceContext && (
          <ContrastBadge 
            cardTitle={title} 
            getIssuesForCard={complianceContext.getIssuesForCard} 
          />
        )}
      </div>
      {children}
    </div>
  );
}

function PrimaryPreviewFullWidth() {
  const [calendarDate, setCalendarDate] = React.useState<Date | undefined>(new Date());
  
  return (
    <div className="space-y-8">
      <PreviewGrid>
        <PreviewCard title="Buttons">
          <div className="flex flex-wrap gap-2">
            <WexButton>Primary</WexButton>
            <WexButton disabled>Disabled</WexButton>
            <WexButton variant="ghost">Ghost Style</WexButton>
          </div>
        </PreviewCard>

        <PreviewCard title="Badge">
          <div className="flex flex-wrap gap-2">
            <WexBadge>Default</WexBadge>
            <WexBadge>New</WexBadge>
            <WexBadge>Beta</WexBadge>
          </div>
        </PreviewCard>

        <PreviewCard title="Progress">
          <WexProgress value={65} className="w-full" />
          <p className="text-xs text-muted-foreground mt-2">Track (20% opacity) + Bar (solid)</p>
        </PreviewCard>

        <PreviewCard title="Switch">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <WexSwitch defaultChecked id="sw1" />
              <label htmlFor="sw1" className="text-sm">On</label>
            </div>
            <div className="flex items-center gap-2">
              <WexSwitch disabled defaultChecked id="sw2" />
              <label htmlFor="sw2" className="text-sm text-muted-foreground">Disabled</label>
            </div>
          </div>
        </PreviewCard>

        <PreviewCard title="Checkbox">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <WexCheckbox defaultChecked id="cb1" />
              <label htmlFor="cb1" className="text-sm">Checked</label>
            </div>
            <div className="flex items-center gap-2">
              <WexCheckbox id="cb2" />
              <label htmlFor="cb2" className="text-sm">Unchecked</label>
            </div>
          </div>
        </PreviewCard>

        <PreviewCard title="Radio Group">
          <WexRadioGroup defaultValue="opt1" className="flex gap-4">
            <div className="flex items-center gap-2">
              <WexRadioGroup.Item value="opt1" id="r1" />
              <label htmlFor="r1" className="text-sm">Selected</label>
            </div>
            <div className="flex items-center gap-2">
              <WexRadioGroup.Item value="opt2" id="r2" />
              <label htmlFor="r2" className="text-sm">Option 2</label>
            </div>
          </WexRadioGroup>
        </PreviewCard>

        <PreviewCard title="Slider">
          <WexSlider defaultValue={[50]} max={100} step={1} className="w-full" />
          <p className="text-xs text-muted-foreground mt-2">Track, range fill, thumb border</p>
        </PreviewCard>

        <PreviewCard title="Skeleton">
          <div className="flex items-center gap-3">
            <WexSkeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <WexSkeleton className="h-4 w-32" />
              <WexSkeleton className="h-3 w-24" />
            </div>
          </div>
        </PreviewCard>

        <PreviewCard title="Focus Ring">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md border-2 ring-2 ring-ring ring-offset-2 ring-offset-background" />
            <span className="text-xs text-muted-foreground">Uses same palette shade</span>
          </div>
        </PreviewCard>

        <PreviewCard title="Spinner">
          <div className="flex items-center gap-4">
            <WexSpinner className="h-6 w-6 text-primary" />
            <span className="text-xs text-muted-foreground">Loading indicator</span>
          </div>
        </PreviewCard>

        <PreviewCard title="Button Group">
          <WexButtonGroup>
            <WexButton size="sm">One</WexButton>
            <WexButton size="sm">Two</WexButton>
            <WexButton size="sm">Three</WexButton>
          </WexButtonGroup>
        </PreviewCard>

        <PreviewCard title="Pagination">
          <WexPagination>
            <WexPagination.Content>
              <WexPagination.Item>
                <WexPagination.Previous href="#" />
              </WexPagination.Item>
              <WexPagination.Item>
                <WexPagination.Link href="#">1</WexPagination.Link>
              </WexPagination.Item>
              <WexPagination.Item>
                <WexPagination.Link href="#" isActive>2</WexPagination.Link>
              </WexPagination.Item>
              <WexPagination.Item>
                <WexPagination.Link href="#">3</WexPagination.Link>
              </WexPagination.Item>
              <WexPagination.Item>
                <WexPagination.Next href="#" />
              </WexPagination.Item>
            </WexPagination.Content>
          </WexPagination>
        </PreviewCard>
      </PreviewGrid>

      {/* Calendar - Full width */}
      <PreviewCard title="Calendar">
        <div className="flex justify-center">
          <WexCalendar 
            mode="single" 
            selected={calendarDate} 
            onSelect={setCalendarDate}
          />
        </div>
      </PreviewCard>

      {/* Additional non-renderable components */}
      <AdditionalComponentsList
        tokenName="--primary"
        components={[
          { name: "WexDialog", description: "Primary action button in dialogs" },
          { name: "WexAlertDialog", description: "Confirm button uses primary" },
          { name: "WexSheet", description: "Action buttons in sheet" },
          { name: "WexDrawer", description: "Action buttons in drawer" },
          { name: "WexSelect", description: "Selected item indicator" },
          { name: "WexCommand", description: "Selected command item" },
          { name: "WexCombobox", description: "Selected item highlight" },
          { name: "WexDropdownMenu", description: "Focus state on items" },
          { name: "WexContextMenu", description: "Focus state on items" },
          { name: "WexNavigationMenu", description: "Active link indicator" },
          { name: "WexMenubar", description: "Active menu item" },
          { name: "WexDataTable", description: "Sort column indicator" },
          { name: "WexTable", description: "Sort headers, row selection" },
          { name: "WexDatePicker", description: "Selected date (via Calendar)" },
          { name: "WexBreadcrumb", description: "Link hover state" },
          { name: "WexAccordion", description: "Trigger hover/focus state" },
          { name: "WexCarousel", description: "Active navigation dot" },
          { name: "WexChart", description: "Primary data series color" },
          { name: "WexEmpty", description: "Action link uses primary" },
          { name: "WexHoverCard", description: "Link text in card content" },
          { name: "WexSidebar", description: "Active navigation item" },
          { name: "WexToggleGroup", description: "Pressed toggle state" },
          { name: "WexTooltip", description: "Link text in tooltip" },
        ]}
      />
    </div>
  );
}

function DestructivePreviewFullWidth() {
  return (
    <div className="space-y-8">
      <PreviewGrid>
        <PreviewCard title="Buttons">
          <div className="flex flex-wrap gap-2">
            <WexButton intent="destructive">Delete</WexButton>
            <WexButton intent="destructive" disabled>Disabled</WexButton>
          </div>
        </PreviewCard>

        <PreviewCard title="Badge">
          <div className="flex flex-wrap gap-2">
            <WexBadge intent="destructive">Error</WexBadge>
            <WexBadge intent="destructive">Failed</WexBadge>
          </div>
        </PreviewCard>

        <PreviewCard title="Alert">
          <WexAlert intent="destructive">
            <WexAlert.Title>Error</WexAlert.Title>
            <WexAlert.Description>Something went wrong.</WexAlert.Description>
          </WexAlert>
        </PreviewCard>

        <PreviewCard title="Form Error">
          <div className="space-y-1">
            <WexInput placeholder="Email" aria-invalid="true" className="border-destructive" />
            <p className="text-sm text-destructive">Invalid email address</p>
          </div>
        </PreviewCard>
      </PreviewGrid>

      {/* Additional non-renderable components */}
      <AdditionalComponentsList
        tokenName="--destructive"
        components={[
          { name: "WexAlertDialog", description: "Destructive action button" },
          { name: "WexButtonGroup", description: "Grouped destructive buttons" },
          { name: "WexToast/Sonner", description: "Error toast notifications" },
          { name: "WexForm", description: "Validation error messages" },
          { name: "WexField", description: "Invalid field styling" },
          { name: "WexInputGroup", description: "Invalid input group border" },
          { name: "WexInputOTP", description: "Invalid OTP slot styling" },
        ]}
      />
    </div>
  );
}

function SuccessPreviewFullWidth() {
  return (
    <div className="space-y-8">
      <PreviewGrid>
        <PreviewCard title="Badge">
          <div className="flex flex-wrap gap-2">
            <WexBadge intent="success">Complete</WexBadge>
            <WexBadge intent="success">Active</WexBadge>
            <WexBadge intent="success">Verified</WexBadge>
          </div>
        </PreviewCard>

        <PreviewCard title="Alert">
          <WexAlert intent="success">
            <WexAlert.Title>Success!</WexAlert.Title>
            <WexAlert.Description>Your changes have been saved.</WexAlert.Description>
          </WexAlert>
        </PreviewCard>

        <PreviewCard title="Toast Preview">
          <div className="p-3 rounded-md bg-success text-success-foreground">
            <div className="font-medium">Success Toast</div>
            <div className="text-sm opacity-90">Operation completed successfully.</div>
          </div>
        </PreviewCard>
      </PreviewGrid>

      {/* Additional non-renderable components */}
      <AdditionalComponentsList
        tokenName="--success"
        components={[
          { name: "WexToast/Sonner", description: "Success toast notifications" },
        ]}
      />
    </div>
  );
}

function WarningPreviewFullWidth() {
  return (
    <div className="space-y-8">
      <PreviewGrid>
        <PreviewCard title="Badge">
          <div className="flex flex-wrap gap-2">
            <WexBadge intent="warning">Caution</WexBadge>
            <WexBadge intent="warning">Pending</WexBadge>
          </div>
        </PreviewCard>

        <PreviewCard title="Alert">
          <WexAlert intent="warning">
            <WexAlert.Title>Warning</WexAlert.Title>
            <WexAlert.Description>Please review before continuing.</WexAlert.Description>
          </WexAlert>
        </PreviewCard>

        <PreviewCard title="Toast Preview">
          <div className="p-3 rounded-md bg-warning text-warning-foreground">
            <div className="font-medium">Warning Toast</div>
            <div className="text-sm opacity-90">Something needs attention.</div>
          </div>
        </PreviewCard>
      </PreviewGrid>

      {/* Additional non-renderable components */}
      <AdditionalComponentsList
        tokenName="--warning"
        components={[
          { name: "WexToast/Sonner", description: "Warning toast notifications" },
        ]}
      />
    </div>
  );
}

function InfoPreviewFullWidth() {
  return (
    <div className="space-y-8">
      <PreviewGrid>
        <PreviewCard title="Badge">
          <div className="flex flex-wrap gap-2">
            <WexBadge intent="info">Note</WexBadge>
            <WexBadge intent="info">Info</WexBadge>
            <WexBadge intent="info">Tip</WexBadge>
          </div>
        </PreviewCard>

        <PreviewCard title="Alert">
          <WexAlert intent="info">
            <WexAlert.Title>Information</WexAlert.Title>
            <WexAlert.Description>Here's some helpful information.</WexAlert.Description>
          </WexAlert>
        </PreviewCard>

        <PreviewCard title="Toast Preview">
          <div className="p-3 rounded-md bg-info text-info-foreground">
            <div className="font-medium">Info Toast</div>
            <div className="text-sm opacity-90">For your information.</div>
          </div>
        </PreviewCard>
      </PreviewGrid>

      {/* Additional non-renderable components */}
      <AdditionalComponentsList
        tokenName="--info"
        components={[
          { name: "WexToast/Sonner", description: "Info toast notifications" },
        ]}
      />
    </div>
  );
}

/**
 * Preview for all palette ramps (when clicking "Palette Ramps" in nav)
 */
interface AllPaletteRampsPreviewProps {
  currentValue?: string;
  onValueChange?: (value: string) => void;
  onRampChange?: (rampName: string, hslValue: string) => void;
}

function AllPaletteRampsPreview({ currentValue, onValueChange, onRampChange }: AllPaletteRampsPreviewProps) {
  const [editingRamp, setEditingRamp] = React.useState<string | null>(null);
  const [tempColorValue, setTempColorValue] = React.useState<Record<string, string>>({});
  const [rampValues, setRampValues] = React.useState<Record<string, { h: number; s: number; l: number }>>({});

  // Read current CSS variable values from DOM
  const readRampFromCSS = React.useCallback((rampName: string) => {
    if (typeof window === 'undefined') return null;
    
    const token500 = `--wex-palette-${rampName}-500`;
    const cssValue = getComputedStyle(document.documentElement)
      .getPropertyValue(token500)
      .trim();
    
    if (!cssValue) return null;
    
    // Parse HSL value like "208 100% 32%"
    const hsl = parseHSL(cssValue);
    return hsl;
  }, []);

  // Update ramp values from CSS variables
  React.useEffect(() => {
    const values: Record<string, { h: number; s: number; l: number }> = {};
    
    PALETTE_RAMPS.forEach((ramp) => {
      const hsl = readRampFromCSS(ramp.name);
      if (hsl) {
        values[ramp.name] = hsl;
      } else {
        // Fallback to static data if CSS variable not found
        const shade500 = ramp.shades.find((s) => s.shade === 500);
        values[ramp.name] = shade500
          ? { h: ramp.hue, s: ramp.saturation, l: shade500.lightness }
          : { h: 0, s: 0, l: 50 };
      }
    });
    
    setRampValues(values);
  }, [readRampFromCSS, currentValue]); // Re-read when currentValue changes (after save)

  // Also listen for CSS variable changes (MutationObserver or periodic check)
  React.useEffect(() => {
    const interval = setInterval(() => {
      const values: Record<string, { h: number; s: number; l: number }> = {};
      PALETTE_RAMPS.forEach((ramp) => {
        const hsl = readRampFromCSS(ramp.name);
        if (hsl) {
          values[ramp.name] = hsl;
        }
      });
      setRampValues((prev) => {
        // Only update if values actually changed
        const changed = Object.keys(values).some(
          (key) => !prev[key] || 
          prev[key].h !== values[key].h || 
          prev[key].s !== values[key].s || 
          prev[key].l !== values[key].l
        );
        return changed ? { ...prev, ...values } : prev;
      });
    }, 100); // Check every 100ms

    return () => clearInterval(interval);
  }, [readRampFromCSS]);

  const handleColorChange = React.useCallback((rampName: string, hexColor: string) => {
    // Store the temporary color value while editing (don't apply yet)
    setTempColorValue((prev) => ({ ...prev, [rampName]: hexColor }));
  }, []);

  const handleSave = React.useCallback((rampName: string) => {
    const hexColor = tempColorValue[rampName];
    if (hexColor) {
      const hsl = hexToHSL(hexColor);
      if (hsl) {
        const hslValue = formatHSL(hsl);
        // Apply the change
        if (onRampChange) {
          onRampChange(rampName, hslValue);
        } else if (onValueChange) {
          onValueChange(hslValue);
        }
        
        // Update local state immediately (optimistic update)
        setRampValues((prev) => ({
          ...prev,
          [rampName]: hsl,
        }));
      }
    }
    // Clear temp value and close edit mode
    setTempColorValue((prev) => {
      const next = { ...prev };
      delete next[rampName];
      return next;
    });
    setEditingRamp(null);
  }, [tempColorValue, onValueChange, onRampChange]);

  const handleCancel = React.useCallback((rampName: string) => {
    // Clear temp value and close edit mode
    setTempColorValue((prev) => {
      const next = { ...prev };
      delete next[rampName];
      return next;
    });
    setEditingRamp(null);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Palette Ramps</h2>
        <p className="text-sm text-muted-foreground">
          Edit the base color (500 shade) for each palette. All shades will be generated automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PALETTE_RAMPS.map((ramp) => {
          // Get current HSL from CSS variables (or fallback to static)
          const currentHsl = rampValues[ramp.name] || (() => {
            const shade500 = ramp.shades.find((s) => s.shade === 500);
            return shade500
              ? { h: ramp.hue, s: ramp.saturation, l: shade500.lightness }
              : { h: 0, s: 0, l: 50 };
          })();
          
          const isEditing = editingRamp === ramp.name;
          // Use temp color if editing, otherwise use current from CSS
          const displayHex = isEditing && tempColorValue[ramp.name] 
            ? tempColorValue[ramp.name]
            : hslToHex({ h: currentHsl.h, s: currentHsl.s, l: currentHsl.l });
          
          // Compute preview HSL from temp color if editing
          const previewHsl = isEditing && tempColorValue[ramp.name]
            ? hexToHSL(tempColorValue[ramp.name]) || currentHsl
            : currentHsl;

          return (
            <div
              key={ramp.name}
              className="rounded-lg border border-border bg-card p-4 space-y-3"
            >
              {/* Ramp header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-sm">{ramp.label}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Base: {Math.round(previewHsl.h)}° {Math.round(previewHsl.s)}% {Math.round(previewHsl.l)}%
                  </p>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setEditingRamp(ramp.name)}
                    className="p-1.5 rounded hover:bg-muted transition-colors"
                    title="Edit ramp"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                      <path d="m15 5 4 4" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Full ramp preview - update in real-time when editing */}
              <div className="flex gap-px rounded overflow-hidden border border-border/30">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => {
                  const shadeData = ramp.shades.find((s) => s.shade === shade);
                  // If editing, use the new hue/saturation from previewHsl, keep lightness from shade
                  const l = shadeData?.lightness ?? 50;
                  const displayHue = isEditing ? previewHsl.h : ramp.hue;
                  const displaySat = isEditing ? previewHsl.s : ramp.saturation;
                  return (
                    <div
                      key={shade}
                      className="h-12 flex-1 relative group"
                      style={{
                        backgroundColor: `hsl(${displayHue} ${displaySat}% ${l}%)`,
                      }}
                      title={`${ramp.label} ${shade}`}
                    >
                      {shade === 500 && (
                        <div className="absolute inset-0 border-2 border-foreground/20 pointer-events-none" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Edit controls - using ColorInput for direct HSL/Hex editing */}
              {isEditing && (
                <div className="space-y-3 pt-2 border-t border-border">
                  <ColorInput
                    token={`--wex-palette-${ramp.name}-500`}
                    label="Base Color (500)"
                    value={formatHSL(previewHsl)}
                    onChange={(hsl) => {
                      const hex = hslToHex(parseHSL(hsl) || previewHsl);
                      if (hex) {
                        handleColorChange(ramp.name, hex);
                      }
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSave(ramp.name)}
                      className="px-3 py-1.5 text-xs rounded bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleCancel(ramp.name)}
                      className="px-3 py-1.5 text-xs rounded border border-border hover:bg-muted"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Neutrals section */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="font-medium text-sm mb-3">Neutrals</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-12 h-12 rounded border border-border/50"
              style={{ backgroundColor: "hsl(0 0% 100%)" }}
            />
            <div>
              <div className="text-sm font-medium">White</div>
              <div className="text-xs text-muted-foreground">hsl(0 0% 100%)</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-12 h-12 rounded border border-border/50"
              style={{ backgroundColor: "hsl(0 0% 0%)" }}
            />
            <div>
              <div className="text-sm font-medium">Black</div>
              <div className="text-xs text-muted-foreground">hsl(0 0% 0%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Preview for palette tokens (when clicking on a ramp in left panel)
 */
function PaletteTokenPreview({ tokenName }: { tokenName: string }) {
  // Extract ramp name and shade from token like "--wex-palette-blue-500"
  const match = tokenName.match(/--wex-palette-(\w+)-?(\d+)?/);
  const rampName = match?.[1] || "unknown";
  const shade = match?.[2] ? parseInt(match[2], 10) : null;

  // Compute color from PALETTE_RAMPS (same as nav swatches)
  const swatchColor = React.useMemo(() => {
    if (rampName === "white") return "hsl(0 0% 100%)";
    if (rampName === "black") return "hsl(0 0% 0%)";
    if (!shade) return "hsl(0 0% 50%)";
    
    const ramp = PALETTE_RAMPS.find((r) => r.name === rampName);
    if (!ramp) return "hsl(0 0% 50%)";
    
    const shadeData = ramp.shades.find((s) => s.shade === shade);
    if (!shadeData) return "hsl(0 0% 50%)";
    
    return `hsl(${ramp.hue} ${ramp.saturation}% ${shadeData.lightness}%)`;
  }, [rampName, shade]);

  return (
    <div className="space-y-6">
      <PreviewCard title={`Palette Token: ${rampName}${shade ? ` ${shade}` : ""}`}>
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-lg border border-border"
            style={{ backgroundColor: swatchColor }}
          />
          <div>
            <div className="font-mono text-sm">{tokenName}</div>
            <div className="text-xs text-muted-foreground mt-1">
              This palette shade is used by semantic tokens that reference it.
            </div>
          </div>
        </div>
      </PreviewCard>

      <div className="p-4 rounded-lg border bg-muted/30">
        <p className="text-sm text-muted-foreground">
          Palette tokens define the raw color values. Semantic tokens (like Primary, Destructive) 
          reference palette tokens to get their colors. Changes to this shade will affect all 
          semantic tokens that use it.
        </p>
      </div>
    </div>
  );
}

/**
 * Preview for Layer 3 Component Tokens
 */
function ComponentTokenPreview({ tokenName }: { tokenName: string }) {
  // Read actual CSS variable value
  const [actualColor, setActualColor] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !tokenName) return;

    const readColor = () => {
      const cssValue = getComputedStyle(document.documentElement)
        .getPropertyValue(tokenName)
        .trim();
      if (cssValue) {
        setActualColor(cssValue);
      }
    };

    readColor();
    const interval = setInterval(readColor, 200);
    return () => clearInterval(interval);
  }, [tokenName]);

  // Parse the token name to extract component and slot info
  const tokenParts = tokenName.replace("--wex-component-", "").split("-");
  const componentName = tokenParts[0] || "Unknown";
  const slotInfo = tokenParts.slice(1).join(" ");

  // Compute swatch color
  let swatchColor = "hsl(0 0% 50%)";
  if (actualColor) {
    if (actualColor.includes("%")) {
      swatchColor = `hsl(${actualColor})`;
    } else {
      swatchColor = actualColor;
    }
  }

  // Determine what component to show based on the token
  const renderPreviewComponent = () => {
    if (tokenName.includes("button-primary")) {
      return (
        <div className="flex flex-wrap gap-2">
          <WexButton>Primary</WexButton>
          <WexButton disabled>Disabled</WexButton>
        </div>
      );
    }
    if (tokenName.includes("button-success")) {
      return (
        <div className="flex flex-wrap gap-2">
          <WexButton intent="success">Success</WexButton>
          <WexButton intent="success" disabled>Disabled</WexButton>
        </div>
      );
    }
    if (tokenName.includes("button-info")) {
      return (
        <div className="flex flex-wrap gap-2">
          <WexButton intent="info">Info</WexButton>
          <WexButton intent="info" disabled>Disabled</WexButton>
        </div>
      );
    }
    if (tokenName.includes("button-warning")) {
      return (
        <div className="flex flex-wrap gap-2">
          <WexButton intent="warning">Warning</WexButton>
          <WexButton intent="warning" disabled>Disabled</WexButton>
        </div>
      );
    }
    if (tokenName.includes("button-destructive")) {
      return (
        <div className="flex flex-wrap gap-2">
          <WexButton intent="destructive">Destructive</WexButton>
          <WexButton intent="destructive" disabled>Disabled</WexButton>
        </div>
      );
    }
    if (tokenName.includes("input-")) {
      return (
        <div className="space-y-2 max-w-sm">
          <WexInput placeholder="Default input" />
          <WexInput variant="filled" placeholder="Filled input" />
        </div>
      );
    }
    if (tokenName.includes("card-")) {
      return (
        <div className="grid grid-cols-2 gap-4">
          <Card variant="default" className="p-4">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-sm">Default</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-xs text-muted-foreground">
              With shadow
            </CardContent>
          </Card>
          <Card variant="elevated" className="p-4">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-sm">Elevated</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-xs text-muted-foreground">
              Strong shadow
            </CardContent>
          </Card>
        </div>
      );
    }
    if (tokenName.includes("tabs-")) {
      return (
        <WexTabs defaultValue="tab1">
          <WexTabs.List>
            <WexTabs.Trigger value="tab1">Active</WexTabs.Trigger>
            <WexTabs.Trigger value="tab2">Inactive</WexTabs.Trigger>
          </WexTabs.List>
        </WexTabs>
      );
    }
    if (tokenName.includes("badge-")) {
      return (
        <div className="flex flex-wrap gap-2">
          <WexBadge>Default</WexBadge>
          <WexBadge intent="info">Info</WexBadge>
          <WexBadge intent="success">Success</WexBadge>
          <WexBadge intent="warning">Warning</WexBadge>
          <WexBadge intent="destructive">Destructive</WexBadge>
        </div>
      );
    }
    if (tokenName.includes("progress-")) {
      return <WexProgress value={65} className="w-full max-w-md" />;
    }
    if (tokenName.includes("tooltip-")) {
      return (
        <div 
          className="inline-block px-3 py-1.5 rounded text-sm"
          style={{ 
            backgroundColor: tokenName.includes("-bg") ? swatchColor : undefined,
            color: tokenName.includes("-fg") ? swatchColor : undefined,
          }}
        >
          Tooltip preview text
        </div>
      );
    }
    if (tokenName.includes("skeleton-")) {
      return (
        <div className="flex items-center gap-3">
          <WexSkeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <WexSkeleton className="h-4 w-32" />
            <WexSkeleton className="h-3 w-24" />
          </div>
        </div>
      );
    }
    if (tokenName.includes("separator-")) {
      return (
        <div className="space-y-2">
          <p className="text-sm">Above</p>
          <WexSeparator />
          <p className="text-sm">Below</p>
        </div>
      );
    }
    
    // Generic color swatch fallback
    return (
      <div className="flex items-center gap-4">
        <div 
          className="w-16 h-16 rounded-lg border border-border"
          style={{ backgroundColor: swatchColor }}
        />
        <div className="text-sm text-muted-foreground">
          Token color preview
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PreviewCard title={`Layer 3: ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} - ${slotInfo}`}>
        <div className="space-y-4">
          {/* Token info */}
          <div className="flex items-center gap-4 p-3 rounded-md bg-muted/30 border border-dashed">
            <div 
              className="w-10 h-10 rounded-md border border-border/50 flex-shrink-0"
              style={{ backgroundColor: swatchColor }}
            />
            <div>
              <div className="font-mono text-xs">{tokenName}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                Layer 3 component token
              </div>
            </div>
          </div>

          {/* Live component preview */}
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-2">Live Preview</div>
            {renderPreviewComponent()}
          </div>
        </div>
      </PreviewCard>

      <div className="p-4 rounded-lg border bg-muted/30">
        <p className="text-sm text-muted-foreground">
          Layer 3 component tokens provide granular control over individual component styling.
          They reference Layer 2 semantic tokens, which in turn reference Layer 1 palette colors.
          This cascade allows theme customization at any level while maintaining design consistency.
        </p>
      </div>
    </div>
  );
}

// =============================================================================
// RADIUS PREVIEW COMPONENT
// =============================================================================

interface RadiusPreviewProps {
  tokenName: string;
}

function RadiusPreview({ tokenName }: RadiusPreviewProps) {
  const [radiusValue, setRadiusValue] = React.useState<string>("6px");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const readRadius = () => {
      const cssValue = getComputedStyle(document.documentElement)
        .getPropertyValue(tokenName)
        .trim();
      if (cssValue) {
        setRadiusValue(cssValue);
      }
    };
    readRadius();
    const observer = new MutationObserver(readRadius);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });
    const interval = setInterval(readRadius, 200);
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [tokenName]);

  return (
    <div className="space-y-6">
      <PreviewCard title="Border Radius Preview" getIssuesForCard={() => []}>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Current value: <code className="font-mono">{radiusValue}</code>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Button */}
            <div className="space-y-2">
              <div className="text-xs font-medium">Button</div>
              <WexButton
                style={{ borderRadius: radiusValue }}
                className="w-full"
              >
                Button with {tokenName.replace("--wex-radius-", "")} radius
              </WexButton>
            </div>
            
            {/* Input */}
            <div className="space-y-2">
              <div className="text-xs font-medium">Input</div>
              <WexInput
                style={{ borderRadius: radiusValue }}
                placeholder="Input field"
                className="w-full"
              />
            </div>
            
            {/* Card */}
            <div className="space-y-2">
              <div className="text-xs font-medium">Card</div>
              <div
                className="p-4 border border-border bg-card"
                style={{ borderRadius: radiusValue }}
              >
                <div className="text-sm font-medium">Card Title</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Card content with {tokenName.replace("--wex-radius-", "")} radius
                </div>
              </div>
            </div>
            
            {/* Badge */}
            <div className="space-y-2">
              <div className="text-xs font-medium">Badge</div>
              <WexBadge
                style={{ borderRadius: radiusValue }}
                variant="default"
              >
                Badge
              </WexBadge>
            </div>
            
            {/* Alert */}
            <div className="space-y-2">
              <div className="text-xs font-medium">Alert</div>
              <div
                className="p-3 border border-border bg-muted/50"
                style={{ borderRadius: radiusValue }}
              >
                <div className="text-sm">Alert message</div>
              </div>
            </div>
            
            {/* Progress */}
            <div className="space-y-2">
              <div className="text-xs font-medium">Progress Bar</div>
              <div
                className="h-2 bg-muted overflow-hidden"
                style={{ borderRadius: radiusValue }}
              >
                <div
                  className="h-full bg-primary"
                  style={{ width: "60%", borderRadius: radiusValue }}
                />
              </div>
            </div>
          </div>
        </div>
      </PreviewCard>
    </div>
  );
}

// =============================================================================
// TYPOGRAPHY PREVIEW COMPONENT
// =============================================================================

interface TypographyPreviewProps {
  tokenName: string;
}

function TypographyPreview({ tokenName }: TypographyPreviewProps) {
  const [fontValue, setFontValue] = React.useState<string>("");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const readFont = () => {
      const cssValue = getComputedStyle(document.documentElement)
        .getPropertyValue(tokenName)
        .trim();
      if (cssValue) {
        setFontValue(cssValue);
      }
    };
    readFont();
    const observer = new MutationObserver(readFont);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });
    const interval = setInterval(readFont, 200);
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [tokenName]);

  const isDisplay = tokenName === "--wex-font-display";
  const primaryFont = fontValue.split(",")[0]?.trim() || fontValue;

  return (
    <div className="space-y-6">
      <PreviewCard title="Typography Preview" getIssuesForCard={() => []}>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Current font: <code className="font-mono">{primaryFont}</code>
          </div>
          
          <div className="space-y-6">
            {isDisplay ? (
              <>
                <div className="space-y-2">
                  <div className="text-xs font-medium">Display Heading (H1)</div>
                  <h1 style={{ fontFamily: fontValue }} className="text-4xl font-bold">
                    Display Heading
                  </h1>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs font-medium">Section Heading (H2)</div>
                  <h2 style={{ fontFamily: fontValue }} className="text-3xl font-semibold">
                    Section Heading
                  </h2>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs font-medium">Subsection Heading (H3)</div>
                  <h3 style={{ fontFamily: fontValue }} className="text-2xl font-semibold">
                    Subsection Heading
                  </h3>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="text-xs font-medium">Body Text</div>
                  <p style={{ fontFamily: fontValue }} className="text-base">
                    This is body text using the {tokenName.replace("--wex-font-", "")} font family.
                    It should be readable and comfortable for extended reading.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs font-medium">Small Text</div>
                  <p style={{ fontFamily: fontValue }} className="text-sm text-muted-foreground">
                    This is smaller text, often used for captions, labels, or secondary information.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs font-medium">Button Text</div>
                  <WexButton style={{ fontFamily: fontValue }}>
                    Button with {tokenName.replace("--wex-font-", "")} font
                  </WexButton>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs font-medium">Input Text</div>
                  <WexInput
                    style={{ fontFamily: fontValue }}
                    placeholder="Input with custom font"
                    className="w-full"
                  />
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <div className="text-xs font-medium">Full Font Stack</div>
              <div className="p-3 bg-muted/50 rounded border border-border">
                <code className="text-xs font-mono break-all">{fontValue}</code>
              </div>
            </div>
          </div>
        </div>
      </PreviewCard>
    </div>
  );
}
