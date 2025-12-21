/**
 * FilteredLivePreview Component
 * 
 * Shows only components that are affected by the currently selected semantic token.
 * This provides focused feedback when editing theme colors.
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
} from "@/components/wex";
import { cn } from "@/lib/utils";

interface FilteredLivePreviewProps {
  /** The semantic token being edited, e.g., "--wex-primary" */
  selectedToken: string | null;
  /** Optional className */
  className?: string;
}

/**
 * Component preview configurations per semantic token
 */
const TOKEN_PREVIEW_MAP: Record<string, React.FC> = {
  "--wex-primary": PrimaryPreview,
  "--wex-primary-contrast": PrimaryPreview,
  "--wex-primary-hover": PrimaryPreview,
  "--wex-destructive": DestructivePreview,
  "--wex-destructive-foreground": DestructivePreview,
  "--wex-destructive-hover": DestructivePreview,
  "--wex-success": SuccessPreview,
  "--wex-success-foreground": SuccessPreview,
  "--wex-success-hover": SuccessPreview,
  "--wex-warning": WarningPreview,
  "--wex-warning-foreground": WarningPreview,
  "--wex-warning-hover": WarningPreview,
  "--wex-info": InfoPreview,
  "--wex-info-foreground": InfoPreview,
  "--wex-info-hover": InfoPreview,
};

/**
 * Preview for Primary token - shows all components that use primary color
 */
function PrimaryPreview() {
  return (
    <div className="space-y-4">
      {/* Buttons */}
      <PreviewSection label="Buttons">
        <div className="flex flex-wrap gap-2">
          <WexButton size="sm">Primary</WexButton>
          <WexButton size="sm" disabled>Disabled</WexButton>
        </div>
      </PreviewSection>

      {/* Link Button */}
      <PreviewSection label="Link Button">
        <WexButton size="sm" intent="ghost" className="text-primary hover:text-primary/80">
          Link Style
        </WexButton>
      </PreviewSection>

      {/* Badge */}
      <PreviewSection label="Badge">
        <WexBadge>Default Badge</WexBadge>
      </PreviewSection>

      {/* Progress */}
      <PreviewSection label="Progress">
        <WexProgress value={65} className="w-full" />
      </PreviewSection>

      {/* Switch */}
      <PreviewSection label="Switch">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <WexSwitch defaultChecked id="sw-checked" />
            <label htmlFor="sw-checked" className="text-sm">Checked</label>
          </div>
          <div className="flex items-center gap-2">
            <WexSwitch id="sw-unchecked" />
            <label htmlFor="sw-unchecked" className="text-sm">Unchecked</label>
          </div>
        </div>
      </PreviewSection>

      {/* Checkbox */}
      <PreviewSection label="Checkbox">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <WexCheckbox defaultChecked id="cb-checked" />
            <label htmlFor="cb-checked" className="text-sm">Checked</label>
          </div>
          <div className="flex items-center gap-2">
            <WexCheckbox id="cb-unchecked" />
            <label htmlFor="cb-unchecked" className="text-sm">Unchecked</label>
          </div>
        </div>
      </PreviewSection>

      {/* Radio */}
      <PreviewSection label="Radio Group">
        <WexRadioGroup defaultValue="opt1" className="flex gap-4">
          <div className="flex items-center gap-2">
            <WexRadioGroup.Item value="opt1" id="r1" />
            <label htmlFor="r1" className="text-sm">Option 1</label>
          </div>
          <div className="flex items-center gap-2">
            <WexRadioGroup.Item value="opt2" id="r2" />
            <label htmlFor="r2" className="text-sm">Option 2</label>
          </div>
        </WexRadioGroup>
      </PreviewSection>

      {/* Slider */}
      <PreviewSection label="Slider">
        <WexSlider defaultValue={[50]} max={100} step={1} className="w-full" />
      </PreviewSection>

      {/* Skeleton */}
      <PreviewSection label="Skeleton">
        <div className="flex items-center gap-3">
          <WexSkeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <WexSkeleton className="h-4 w-32" />
            <WexSkeleton className="h-3 w-24" />
          </div>
        </div>
      </PreviewSection>

      {/* Tabs */}
      <PreviewSection label="Tabs">
        <WexTabs defaultValue="tab1" className="w-full">
          <WexTabs.List>
            <WexTabs.Trigger value="tab1">Selected</WexTabs.Trigger>
            <WexTabs.Trigger value="tab2">Tab Two</WexTabs.Trigger>
          </WexTabs.List>
        </WexTabs>
      </PreviewSection>

      {/* Link */}
      <PreviewSection label="Link">
        <a href="#" className="text-primary hover:underline text-sm">
          Primary colored link
        </a>
      </PreviewSection>
    </div>
  );
}

/**
 * Preview for Destructive token
 */
function DestructivePreview() {
  return (
    <div className="space-y-4">
      {/* Button */}
      <PreviewSection label="Button">
        <div className="flex flex-wrap gap-2">
          <WexButton size="sm" intent="destructive">Destructive</WexButton>
          <WexButton size="sm" intent="destructive" disabled>Disabled</WexButton>
        </div>
      </PreviewSection>

      {/* Badge */}
      <PreviewSection label="Badge">
        <WexBadge intent="destructive">Destructive Badge</WexBadge>
      </PreviewSection>

      {/* Alert */}
      <PreviewSection label="Alert">
        <WexAlert intent="destructive">
          <WexAlert.Title>Destructive Alert</WexAlert.Title>
          <WexAlert.Description>
            This is an error or destructive message.
          </WexAlert.Description>
        </WexAlert>
      </PreviewSection>
    </div>
  );
}

/**
 * Preview for Success token
 */
function SuccessPreview() {
  return (
    <div className="space-y-4">
      {/* Badge */}
      <PreviewSection label="Badge">
        <WexBadge intent="success">Success Badge</WexBadge>
      </PreviewSection>

      {/* Alert */}
      <PreviewSection label="Alert">
        <WexAlert intent="success">
          <WexAlert.Title>Success Alert</WexAlert.Title>
          <WexAlert.Description>
            Operation completed successfully.
          </WexAlert.Description>
        </WexAlert>
      </PreviewSection>
    </div>
  );
}

/**
 * Preview for Warning token
 */
function WarningPreview() {
  return (
    <div className="space-y-4">
      {/* Badge */}
      <PreviewSection label="Badge">
        <WexBadge intent="warning">Warning Badge</WexBadge>
      </PreviewSection>

      {/* Alert */}
      <PreviewSection label="Alert">
        <WexAlert intent="warning">
          <WexAlert.Title>Warning Alert</WexAlert.Title>
          <WexAlert.Description>
            Please review this information carefully.
          </WexAlert.Description>
        </WexAlert>
      </PreviewSection>
    </div>
  );
}

/**
 * Preview for Info token
 */
function InfoPreview() {
  return (
    <div className="space-y-4">
      {/* Badge */}
      <PreviewSection label="Badge">
        <WexBadge intent="info">Info Badge</WexBadge>
      </PreviewSection>

      {/* Alert */}
      <PreviewSection label="Alert">
        <WexAlert intent="info">
          <WexAlert.Title>Info Alert</WexAlert.Title>
          <WexAlert.Description>
            Here is some helpful information.
          </WexAlert.Description>
        </WexAlert>
      </PreviewSection>
    </div>
  );
}

/**
 * Helper component for preview sections
 */
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

/**
 * Default preview when no token is selected
 */
function DefaultPreview() {
  return (
    <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
      Select a semantic token to preview affected components
    </div>
  );
}

/**
 * Main FilteredLivePreview component
 */
export function FilteredLivePreview({ 
  selectedToken, 
  className 
}: FilteredLivePreviewProps) {
  const PreviewComponent = selectedToken 
    ? TOKEN_PREVIEW_MAP[selectedToken] || DefaultPreview
    : DefaultPreview;

  return (
    <WexCard className={cn("h-full", className)}>
      <WexCard.Header className="pb-2">
        <WexCard.Title className="text-base">Live Preview</WexCard.Title>
        <WexCard.Description>
          {selectedToken 
            ? `Showing components affected by ${selectedToken.replace("--wex-", "")}`
            : "Components update in real-time as you make changes"
          }
        </WexCard.Description>
      </WexCard.Header>
      <WexCard.Content className="max-h-[500px] overflow-y-auto">
        <PreviewComponent />
      </WexCard.Content>
    </WexCard>
  );
}

