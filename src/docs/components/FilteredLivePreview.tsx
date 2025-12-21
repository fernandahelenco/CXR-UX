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

// =============================================================================
// EDIT CONTROL COMPONENT
// =============================================================================

interface EditControlProps {
  value: string;
  onChange: (value: string) => void;
  tokenLabel: string;
}

function EditControl({ value, onChange, tokenLabel }: EditControlProps) {
  return (
    <PaletteSwatchPicker value={value} onSelect={onChange}>
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-background hover:bg-muted/50 transition-colors"
        title={`Edit ${tokenLabel}`}
      >
        <SwatchDisplay value={value} size="sm" className="ring-1 ring-border/50" />
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
  className,
  fullWidth = false,
}: FilteredLivePreviewProps) {
  const mapping = selectedToken 
    ? TOKEN_COMPONENT_MAP.find(m => m.token === selectedToken)
    : null;

  const easyUsages = selectedToken ? getEasyUsagesForToken(selectedToken) : [];
  const hardUsages = selectedToken ? getHardUsagesForToken(selectedToken) : [];

  // Full width layout for main workspace
  if (fullWidth) {
    return (
      <div className={cn("h-full flex flex-col", className)}>
        {/* Edit Bar Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-6 py-4">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div>
              <h2 className="text-lg font-semibold">
                {mapping ? mapping.label : "Live Preview"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {mapping 
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
            
            {/* Foreground tokens */}
            {selectedToken === "--wex-primary-contrast" && <PrimaryContrastPreview />}
            {selectedToken === "--wex-destructive-foreground" && <DestructiveForegroundPreview />}
            {selectedToken === "--wex-success-foreground" && <SuccessForegroundPreview />}
            {selectedToken === "--wex-warning-foreground" && <WarningForegroundPreview />}
            {selectedToken === "--wex-info-foreground" && <InfoForegroundPreview />}

            {/* Palette tokens */}
            {selectedToken?.startsWith("--wex-palette-") && (
              <PaletteTokenPreview tokenName={selectedToken} />
            )}

            {/* Hard states swatches */}
            {hardUsages.length > 0 && (
              <HardStateSwatches usages={hardUsages} tokenName={selectedToken || ""} />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Original card layout (for backward compatibility)
  return (
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
          <a href="#" onClick={e => e.preventDefault()} className="text-primary text-sm hover:underline">Link</a>
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
        <textarea 
          className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Textarea with border-input..."
        />
      </PreviewSection>

      {/* Outline buttons */}
      <PreviewSection label="Outline Buttons (border-input)">
        <div className="flex flex-wrap gap-2">
          <WexButton intent="outline" size="sm">Outline Button</WexButton>
          <WexButton intent="outline" size="sm" disabled>Disabled</WexButton>
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

function PreviewCard({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 rounded-lg border bg-card">
      <div className="text-sm font-medium text-muted-foreground mb-3">{title}</div>
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
            <WexButton intent="link">Link Style</WexButton>
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
      </PreviewGrid>

      {/* Calendar - Full width */}
      <div className="p-4 rounded-lg border bg-card">
        <div className="text-sm font-medium text-muted-foreground mb-3">Calendar (Selected Date)</div>
        <div className="flex justify-center">
          <WexCalendar 
            mode="single" 
            selected={calendarDate} 
            onSelect={setCalendarDate}
          />
        </div>
      </div>
    </div>
  );
}

function DestructivePreviewFullWidth() {
  return (
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
  );
}

function SuccessPreviewFullWidth() {
  return (
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
  );
}

function WarningPreviewFullWidth() {
  return (
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
  );
}

function InfoPreviewFullWidth() {
  return (
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
