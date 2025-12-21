/**
 * Theme Builder Page
 * 
 * Professional design tool for customizing WEX design tokens.
 * 
 * Layout: App-style shell with three regions:
 * - Top bar: Title, mode toggle, actions
 * - Center workspace: Live preview + accessibility issues
 * - Right panel: Properties inspector
 * 
 * Features:
 * - Edit all WEX tokens (semantic, surfaces, borders, focus, radii)
 * - Live component preview
 * - A11y integration from compliance.json
 * - Export to JSON for package updates
 */

import * as React from "react";
import { ColorInput, CompactColorInput } from "@/docs/components/ColorInput";
import { useThemeOverrides } from "@/docs/hooks/useThemeOverrides";
import { resolveColorVariable, getContrastData, formatContrastRatio, type ContrastRating } from "@/docs/utils/contrast";
import {
  WexButton,
  WexCard,
  WexTabs,
  WexAlert,
  WexBadge,
  WexInput,
  WexSwitch,
  WexLabel,
  WexCollapsible,
  WexCheckbox,
  WexSeparator,
  WexTooltip,
  WexScrollArea,
} from "@/components/wex";
import { 
  Download, RotateCcw, Sun, Moon, ChevronDown, ChevronRight, Info, CheckCircle, 
  AlertTriangle, Palette, Type, Layers, Square, Focus, Circle, Eye, EyeOff,
  Wrench, ExternalLink, Filter, Grid3X3
} from "lucide-react";
import { parseHSL } from "@/docs/utils/color-convert";
import { ContrastPreview } from "@/docs/components/ContrastPreview";
import { cn } from "@/lib/utils";
import complianceData from "@/docs/registry/compliance.json";
import type { ComplianceResult } from "@/docs/hooks/useA11yCompliance";

// ============================================================
// TOKEN DEFINITIONS
// ============================================================

// Core semantic colors
const SEMANTIC_TOKENS = {
  primary: {
    label: "Primary",
    icon: <Palette className="h-3.5 w-3.5" />,
    tokens: [
      { token: "--wex-primary", label: "Primary", description: "Main brand color", tailwind: "bg-primary, text-primary" },
      { token: "--wex-primary-contrast", label: "Contrast", description: "Text on primary", tailwind: "text-primary-foreground" },
      { token: "--wex-primary-hover", label: "Hover", description: "Hover state", tailwind: "hover:bg-primary-hover" },
    ],
  },
  danger: {
    label: "Danger",
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
    tokens: [
      { token: "--wex-danger-bg", label: "Background", description: "Destructive actions", tailwind: "bg-destructive" },
      { token: "--wex-danger-fg", label: "Foreground", description: "Text on danger", tailwind: "text-destructive-foreground" },
      { token: "--wex-danger-hover", label: "Hover", description: "Hover state", tailwind: "hover:bg-destructive-hover" },
    ],
  },
  success: {
    label: "Success",
    icon: <CheckCircle className="h-3.5 w-3.5" />,
    tokens: [
      { token: "--wex-success-bg", label: "Background", description: "Positive feedback", tailwind: "bg-success" },
      { token: "--wex-success-fg", label: "Foreground", description: "Text on success", tailwind: "text-success-foreground" },
      { token: "--wex-success-hover", label: "Hover", description: "Hover state", tailwind: "hover:bg-success-hover" },
    ],
  },
  warning: {
    label: "Warning",
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
    tokens: [
      { token: "--wex-warning-bg", label: "Background", description: "Caution states", tailwind: "bg-warning" },
      { token: "--wex-warning-fg", label: "Foreground", description: "Text on warning", tailwind: "text-warning-foreground" },
      { token: "--wex-warning-hover", label: "Hover", description: "Hover state", tailwind: "hover:bg-warning-hover" },
    ],
  },
  info: {
    label: "Info",
    icon: <Info className="h-3.5 w-3.5" />,
    tokens: [
      { token: "--wex-info-bg", label: "Background", description: "Informational", tailwind: "bg-info" },
      { token: "--wex-info-fg", label: "Foreground", description: "Text on info", tailwind: "text-info-foreground" },
      { token: "--wex-info-hover", label: "Hover", description: "Hover state", tailwind: "hover:bg-info-hover" },
    ],
  },
};

// Surface & text tokens
const SURFACE_TOKENS = {
  surfaces: {
    label: "Surfaces",
    icon: <Layers className="h-3.5 w-3.5" />,
    tokens: [
      { token: "--wex-content-bg", label: "Content BG", description: "Page & card backgrounds", tailwind: "bg-background, bg-card" },
      { token: "--wex-surface-subtle", label: "Subtle Surface", description: "Muted areas, secondary surfaces", tailwind: "bg-muted, bg-accent" },
    ],
  },
  text: {
    label: "Text",
    icon: <Type className="h-3.5 w-3.5" />,
    tokens: [
      { token: "--wex-text", label: "Text", description: "Primary text color", tailwind: "text-foreground" },
      { token: "--wex-text-muted", label: "Muted Text", description: "Secondary text", tailwind: "text-muted-foreground" },
    ],
  },
  borders: {
    label: "Borders",
    icon: <Square className="h-3.5 w-3.5" />,
    tokens: [
      { token: "--wex-content-border", label: "Content Border", description: "Borders & dividers", tailwind: "border-border" },
      { token: "--wex-input-border", label: "Input Border", description: "Form input borders", tailwind: "border-input" },
    ],
  },
  focus: {
    label: "Focus",
    icon: <Focus className="h-3.5 w-3.5" />,
    tokens: [
      { token: "--wex-focus-ring-color", label: "Focus Ring", description: "Focus ring color", tailwind: "ring-ring" },
    ],
  },
};

// Palette ramps
const PALETTE_RAMPS = ["blue", "green", "amber", "red", "slate"] as const;
const PALETTE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

// Contrast pairings to validate
const CONTRAST_PAIRINGS = [
  { label: "Primary Button", fg: "--wex-primary-contrast", bg: "--wex-primary", component: "Button" },
  { label: "Danger Button", fg: "--wex-danger-fg", bg: "--wex-danger-bg", component: "Button" },
  { label: "Success Badge", fg: "--wex-success-fg", bg: "--wex-success-bg", component: "Badge" },
  { label: "Warning Badge", fg: "--wex-warning-fg", bg: "--wex-warning-bg", component: "Badge" },
  { label: "Info Badge", fg: "--wex-info-fg", bg: "--wex-info-bg", component: "Badge" },
  { label: "Text on Background", fg: "--wex-text", bg: "--wex-content-bg", component: "Card" },
  { label: "Muted Text", fg: "--wex-text-muted", bg: "--wex-content-bg", component: "Card" },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ThemeBuilderPage() {
  const { setToken, getToken, resetAll, hasOverrides, exportAsJSON, isLoaded, cascadePalette } = useThemeOverrides();
  const [editMode, setEditMode] = React.useState<"light" | "dark">("light");
  const [showOnlyFailures, setShowOnlyFailures] = React.useState(false);
  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(new Set(["primary", "surfaces"]));
  const [activeTab, setActiveTab] = React.useState<"preview" | "a11y">("preview");

  // Get current value for a token
  const getTokenValue = React.useCallback((token: string): string => {
    const override = getToken(token, editMode);
    if (override) return override;
    const computed = resolveColorVariable(token);
    return computed || "0 0% 50%";
  }, [getToken, editMode]);

  // Handle token change
  const handleTokenChange = React.useCallback((token: string, value: string) => {
    setToken(token, value, editMode);
  }, [setToken, editMode]);

  // Export JSON
  const handleExport = React.useCallback(() => {
    const json = exportAsJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wex-theme-overrides.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [exportAsJSON]);

  // Toggle section expansion
  const toggleSection = (key: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading Theme Builder...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 top-14 flex flex-col bg-background overflow-hidden">
      {/* ============================================================
          TOP BAR
          ============================================================ */}
      <header className="flex-shrink-0 h-12 border-b border-border bg-card flex items-center px-4 gap-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <Grid3X3 className="h-4 w-4 text-primary" />
          <h1 className="font-semibold text-foreground">Theme Builder</h1>
        </div>

        <WexSeparator orientation="vertical" className="h-6" />

        {/* Mode Toggle */}
        <div className="flex items-center gap-2">
          <WexTooltip>
            <WexTooltip.Trigger asChild>
              <button
                onClick={() => setEditMode("light")}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  editMode === "light" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Sun className="h-4 w-4" />
              </button>
            </WexTooltip.Trigger>
            <WexTooltip.Content>Edit Light Mode</WexTooltip.Content>
          </WexTooltip>
          <WexTooltip>
            <WexTooltip.Trigger asChild>
              <button
                onClick={() => setEditMode("dark")}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  editMode === "dark" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Moon className="h-4 w-4" />
              </button>
            </WexTooltip.Trigger>
            <WexTooltip.Content>Edit Dark Mode</WexTooltip.Content>
          </WexTooltip>
          <span className="text-xs text-muted-foreground">
            Editing <span className="text-foreground font-medium">{editMode}</span>
          </span>
        </div>

        <div className="flex-1" />

        {/* Status & Actions */}
        <div className="flex items-center gap-2">
          {hasOverrides && (
            <WexBadge intent="warning" className="text-xs">
              Unsaved Changes
            </WexBadge>
          )}
          <WexTooltip>
            <WexTooltip.Trigger asChild>
              <WexButton 
                intent="ghost" 
                size="sm" 
                onClick={resetAll} 
                disabled={!hasOverrides}
                className="h-8"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </WexButton>
            </WexTooltip.Trigger>
            <WexTooltip.Content>Reset All Changes</WexTooltip.Content>
          </WexTooltip>
          <WexButton size="sm" onClick={handleExport} className="h-8">
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export
          </WexButton>
        </div>
      </header>

      {/* ============================================================
          MAIN CONTENT: WORKSPACE + PROPERTIES
          ============================================================ */}
      <div className="flex-1 flex overflow-hidden">
        {/* CENTER WORKSPACE */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Workspace Tabs */}
          <div className="flex-shrink-0 border-b border-border bg-muted/30">
            <div className="flex items-center px-4 h-10 gap-4">
              <button
                onClick={() => setActiveTab("preview")}
                className={cn(
                  "text-sm font-medium transition-colors border-b-2 -mb-px pb-2.5 pt-2.5",
                  activeTab === "preview"
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Eye className="h-3.5 w-3.5 inline-block mr-1.5" />
                Preview
              </button>
              <button
                onClick={() => setActiveTab("a11y")}
                className={cn(
                  "text-sm font-medium transition-colors border-b-2 -mb-px pb-2.5 pt-2.5",
                  activeTab === "a11y"
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <AlertTriangle className="h-3.5 w-3.5 inline-block mr-1.5" />
                Accessibility
                <A11yBadge />
              </button>
            </div>
          </div>

          {/* Workspace Content */}
          <WexScrollArea className="flex-1">
            <div className="p-6">
              {activeTab === "preview" ? (
                <PreviewWorkspace />
              ) : (
                <A11yWorkspace 
                  showOnlyFailures={showOnlyFailures} 
                  setShowOnlyFailures={setShowOnlyFailures}
                  editMode={editMode}
                />
              )}
            </div>
          </WexScrollArea>
        </div>

        {/* RIGHT PROPERTIES PANEL */}
        <div className="w-[340px] flex-shrink-0 border-l border-border bg-card flex flex-col overflow-hidden">
          <div className="flex-shrink-0 px-4 py-3 border-b border-border">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Properties</h2>
          </div>
          
          <WexScrollArea className="flex-1">
            <div className="p-3 space-y-1">
              {/* Semantic Colors */}
              <PropertiesSection title="Semantic Colors" defaultOpen>
                {Object.entries(SEMANTIC_TOKENS).map(([key, group]) => (
                  <TokenGroup
                    key={key}
                    id={key}
                    label={group.label}
                    icon={group.icon}
                    tokens={group.tokens}
                    expanded={expandedSections.has(key)}
                    onToggle={() => toggleSection(key)}
                    getTokenValue={getTokenValue}
                    onTokenChange={handleTokenChange}
                  />
                ))}
              </PropertiesSection>

              {/* Surfaces & Text */}
              <PropertiesSection title="Surfaces & Text" defaultOpen>
                {Object.entries(SURFACE_TOKENS).map(([key, group]) => (
                  <TokenGroup
                    key={key}
                    id={key}
                    label={group.label}
                    icon={group.icon}
                    tokens={group.tokens}
                    expanded={expandedSections.has(key)}
                    onToggle={() => toggleSection(key)}
                    getTokenValue={getTokenValue}
                    onTokenChange={handleTokenChange}
                  />
                ))}
              </PropertiesSection>

              {/* Palette Ramps */}
              <PropertiesSection title="Palette Ramps">
                {PALETTE_RAMPS.map((rampName) => (
                  <PaletteRampEditor
                    key={rampName}
                    name={rampName}
                    expanded={expandedSections.has(`palette-${rampName}`)}
                    onToggle={() => toggleSection(`palette-${rampName}`)}
                    getTokenValue={getTokenValue}
                    onTokenChange={handleTokenChange}
                    onCascade={(h, s) => cascadePalette(rampName, h, s, editMode)}
                  />
                ))}
              </PropertiesSection>
            </div>
          </WexScrollArea>

          {/* Export Instructions */}
          <div className="flex-shrink-0 p-3 border-t border-border bg-muted/30">
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">How to apply changes:</p>
              <ol className="list-decimal list-inside space-y-0.5 text-[11px]">
                <li>Export JSON with your overrides</li>
                <li>Merge into tokens/ source files</li>
                <li>Re-run Style Dictionary build</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// WORKSPACE COMPONENTS
// ============================================================

function PreviewWorkspace() {
  return (
    <div className="space-y-6">
      {/* Component Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Buttons */}
        <PreviewCard title="Buttons">
          <div className="flex flex-wrap gap-2">
            <WexButton size="sm">Primary</WexButton>
            <WexButton intent="secondary" size="sm">Secondary</WexButton>
            <WexButton intent="destructive" size="sm">Destructive</WexButton>
            <WexButton intent="outline" size="sm">Outline</WexButton>
            <WexButton intent="ghost" size="sm">Ghost</WexButton>
          </div>
        </PreviewCard>

        {/* Badges */}
        <PreviewCard title="Badges">
          <div className="flex flex-wrap gap-2">
            <WexBadge>Default</WexBadge>
            <WexBadge intent="secondary">Secondary</WexBadge>
            <WexBadge intent="destructive">Destructive</WexBadge>
            <WexBadge intent="success">Success</WexBadge>
            <WexBadge intent="warning">Warning</WexBadge>
            <WexBadge intent="info">Info</WexBadge>
          </div>
        </PreviewCard>

        {/* Alerts */}
        <PreviewCard title="Alerts">
          <div className="space-y-2">
            <WexAlert>
              <Info className="h-4 w-4" />
              <WexAlert.Title>Default</WexAlert.Title>
            </WexAlert>
            <WexAlert intent="success">
              <CheckCircle className="h-4 w-4" />
              <WexAlert.Title>Success</WexAlert.Title>
            </WexAlert>
            <WexAlert intent="warning">
              <AlertTriangle className="h-4 w-4" />
              <WexAlert.Title>Warning</WexAlert.Title>
            </WexAlert>
            <WexAlert intent="destructive">
              <AlertTriangle className="h-4 w-4" />
              <WexAlert.Title>Error</WexAlert.Title>
            </WexAlert>
          </div>
        </PreviewCard>

        {/* Form Elements */}
        <PreviewCard title="Form Elements">
          <div className="space-y-3">
            <div className="space-y-1">
              <WexLabel className="text-xs">Text Input</WexLabel>
              <WexInput placeholder="Type here..." className="h-9" />
            </div>
            <div className="flex items-center gap-3">
              <WexCheckbox id="preview-check" />
              <WexLabel htmlFor="preview-check" className="text-xs">Checkbox</WexLabel>
            </div>
            <div className="flex items-center gap-3">
              <WexSwitch id="preview-switch" />
              <WexLabel htmlFor="preview-switch" className="text-xs">Switch</WexLabel>
            </div>
          </div>
        </PreviewCard>

        {/* Card Example */}
        <PreviewCard title="Card">
          <WexCard>
            <WexCard.Header className="py-2">
              <WexCard.Title className="text-sm">Sample Card</WexCard.Title>
              <WexCard.Description className="text-xs">Card description text</WexCard.Description>
            </WexCard.Header>
            <WexCard.Content className="py-2">
              <p className="text-xs text-muted-foreground">This demonstrates text and surface colors.</p>
            </WexCard.Content>
          </WexCard>
        </PreviewCard>

        {/* Focus States */}
        <PreviewCard title="Focus States">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground mb-2">Tab through to see focus rings:</p>
            <div className="flex gap-2">
              <WexButton size="sm" intent="outline">Focus Me</WexButton>
              <WexInput placeholder="Or me" className="h-9 w-28" />
            </div>
          </div>
        </PreviewCard>
      </div>

      {/* Contrast Validation */}
      <ContrastValidationPanel />
    </div>
  );
}

function A11yWorkspace({ 
  showOnlyFailures, 
  setShowOnlyFailures,
  editMode 
}: { 
  showOnlyFailures: boolean; 
  setShowOnlyFailures: (v: boolean) => void;
  editMode: "light" | "dark";
}) {
  // Parse compliance data
  const components = React.useMemo(() => {
    const entries: Array<{
      key: string;
      name: string;
      status: string;
      violations: number;
      issues: string[];
      modeStatus: string;
      levelAchieved: string | null;
    }> = [];

    Object.entries(complianceData).forEach(([key, value]) => {
      if (key === "_meta") return;
      const comp = value as ComplianceResult;
      const modeData = comp.modes?.[editMode];
      
      entries.push({
        key,
        name: key.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        status: comp.status,
        violations: comp.violations ?? 0,
        issues: comp.issues || [],
        modeStatus: modeData?.status || comp.status,
        levelAchieved: modeData?.levelAchieved || comp.levelAchieved,
      });
    });

    return entries;
  }, [editMode]);

  const filteredComponents = showOnlyFailures
    ? components.filter(c => c.modeStatus === "fail" || c.modeStatus === "partial")
    : components;

  const failingCount = components.filter(c => c.modeStatus === "fail" || c.modeStatus === "partial").length;
  const passingCount = components.filter(c => c.modeStatus === "pass").length;

  return (
    <div className="space-y-6">
      {/* Summary Bar */}
      <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{components.length}</div>
            <div className="text-xs text-muted-foreground">Components</div>
          </div>
          <WexSeparator orientation="vertical" className="h-10" />
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{passingCount}</div>
            <div className="text-xs text-muted-foreground">Passing</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">{failingCount}</div>
            <div className="text-xs text-muted-foreground">Failing</div>
          </div>
        </div>
        
        <div className="flex-1" />
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <WexCheckbox 
            id="filter-failures"
            checked={showOnlyFailures}
            onCheckedChange={(c) => setShowOnlyFailures(c === true)}
          />
          <WexLabel htmlFor="filter-failures" className="text-xs">
            Show only failing
          </WexLabel>
        </div>
      </div>

      {/* Info Banner */}
      <WexAlert>
        <Info className="h-4 w-4" />
        <WexAlert.Title>Viewing {editMode} mode results</WexAlert.Title>
        <WexAlert.Description>
          These results are from automated axe-core testing. Color contrast issues can be fixed by adjusting the tokens in the Properties panel.
          A full test run is required to verify fixes.
        </WexAlert.Description>
      </WexAlert>

      {/* Component List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredComponents.map((comp) => (
          <A11yComponentCard key={comp.key} component={comp} />
        ))}
      </div>

      {filteredComponents.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <CheckCircle className="h-12 w-12 mx-auto mb-3 text-success" />
          <p className="text-lg font-medium">All components passing!</p>
          <p className="text-sm">No accessibility issues in {editMode} mode.</p>
        </div>
      )}
    </div>
  );
}

// ============================================================
// PROPERTIES PANEL COMPONENTS
// ============================================================

function PropertiesSection({ 
  title, 
  children,
  defaultOpen = false,
}: { 
  title: string; 
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-border/50 pb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
      >
        {title}
        <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && <div className="space-y-1 pb-2">{children}</div>}
    </div>
  );
}

interface TokenGroupProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  tokens: Array<{ token: string; label: string; description: string; tailwind: string }>;
  expanded: boolean;
  onToggle: () => void;
  getTokenValue: (token: string) => string;
  onTokenChange: (token: string, value: string) => void;
}

function TokenGroup({ id, label, icon, tokens, expanded, onToggle, getTokenValue, onTokenChange }: TokenGroupProps) {
  return (
    <div className="rounded-md border border-border/50 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-2.5 py-2 bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <span className="text-muted-foreground">{icon}</span>
        <span className="text-sm font-medium text-foreground flex-1 text-left">{label}</span>
        <div className="flex gap-0.5">
          {tokens.slice(0, 3).map((t) => (
            <div
              key={t.token}
              className="w-4 h-4 rounded-sm border border-border/50"
              style={{ backgroundColor: `hsl(${getTokenValue(t.token)})` }}
            />
          ))}
        </div>
        <ChevronRight className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", expanded && "rotate-90")} />
      </button>
      
      {expanded && (
        <div className="p-3 space-y-4 border-t border-border/50">
          {tokens.map((tokenDef) => (
            <ColorInput
              key={tokenDef.token}
              token={tokenDef.token}
              label={tokenDef.label}
              description={tokenDef.description}
              value={getTokenValue(tokenDef.token)}
              onChange={(v) => onTokenChange(tokenDef.token, v)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface PaletteRampEditorProps {
  name: string;
  expanded: boolean;
  onToggle: () => void;
  getTokenValue: (token: string) => string;
  onTokenChange: (token: string, value: string) => void;
  onCascade: (h: number, s: number) => void;
}

function PaletteRampEditor({ name, expanded, onToggle, getTokenValue, onTokenChange, onCascade }: PaletteRampEditorProps) {
  const anchorToken = `--wex-palette-${name}-500`;
  const anchorValue = getTokenValue(anchorToken);
  const anchorHsl = parseHSL(anchorValue);

  return (
    <div className="rounded-md border border-border/50 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-2.5 py-2 bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <Circle className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground capitalize flex-1 text-left">{name}</span>
        <div className="flex gap-0.5">
          {PALETTE_STEPS.slice(0, 5).map((step) => (
            <div
              key={step}
              className="w-3 h-3 rounded-sm border border-border/50"
              style={{ backgroundColor: `hsl(var(--wex-palette-${name}-${step}))` }}
            />
          ))}
        </div>
        <ChevronRight className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", expanded && "rotate-90")} />
      </button>

      {expanded && (
        <div className="p-3 space-y-3 border-t border-border/50">
          {/* Cascade controls */}
          <div className="flex items-center gap-3 p-2 rounded bg-muted/30 border border-border/50">
            <span className="text-[10px] text-muted-foreground">Cascade:</span>
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-[9px] text-muted-foreground text-center">H°</span>
                <WexInput
                  type="number"
                  min={0}
                  max={360}
                  value={anchorHsl?.h ?? 0}
                  onChange={(e) => onCascade(parseInt(e.target.value, 10) || 0, anchorHsl?.s ?? 100)}
                  className="w-12 h-6 text-[10px] text-center font-mono"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-muted-foreground text-center">S%</span>
                <WexInput
                  type="number"
                  min={0}
                  max={100}
                  value={anchorHsl?.s ?? 100}
                  onChange={(e) => onCascade(anchorHsl?.h ?? 200, parseInt(e.target.value, 10) || 0)}
                  className="w-12 h-6 text-[10px] text-center font-mono"
                />
              </div>
            </div>
          </div>

          {/* All steps */}
          <div className="flex gap-1 justify-between">
            {PALETTE_STEPS.map((step) => {
              const token = `--wex-palette-${name}-${step}`;
              return (
                <CompactColorInput
                  key={step}
                  step={step}
                  value={getTokenValue(token)}
                  onChange={(v) => onTokenChange(token, v)}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// HELPER COMPONENTS
// ============================================================

function PreviewCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">{title}</h3>
      {children}
    </div>
  );
}

function A11yBadge() {
  const failingCount = React.useMemo(() => {
    let count = 0;
    Object.entries(complianceData).forEach(([key, value]) => {
      if (key === "_meta") return;
      const comp = value as ComplianceResult;
      if (comp.status === "fail" || comp.status === "partial") {
        count++;
      }
    });
    return count;
  }, []);

  if (failingCount === 0) return null;

  return (
    <span className="ml-1.5 bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 rounded-full font-medium">
      {failingCount}
    </span>
  );
}

function A11yComponentCard({ component }: { component: { key: string; name: string; modeStatus: string; issues: string[]; levelAchieved: string | null } }) {
  const isFailing = component.modeStatus === "fail" || component.modeStatus === "partial";
  const isColorContrast = component.issues.includes("color-contrast");

  return (
    <div className={cn(
      "p-3 rounded-lg border transition-colors",
      isFailing
        ? "border-destructive/50 bg-destructive/5"
        : "border-border bg-card"
    )}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-sm font-medium text-foreground">{component.name}</h4>
          {component.levelAchieved && (
            <span className="text-[10px] text-muted-foreground">WCAG {component.levelAchieved}</span>
          )}
        </div>
        <WexBadge 
          intent={isFailing ? "destructive" : "success"}
          className="text-[10px] px-1.5"
        >
          {component.modeStatus === "pass" ? "Pass" : component.modeStatus === "partial" ? "Partial" : "Fail"}
        </WexBadge>
      </div>
      
      {isFailing && component.issues.length > 0 && (
        <div className="mt-2 pt-2 border-t border-border/50">
          <div className="flex flex-wrap gap-1">
            {component.issues.map((issue) => (
              <code key={issue} className="text-[10px] bg-muted px-1.5 py-0.5 rounded">
                {issue}
              </code>
            ))}
          </div>
          {isColorContrast && (
            <p className="text-[10px] text-muted-foreground mt-1.5">
              → Adjust color tokens in Properties panel
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function ContrastValidationPanel() {
  const [contrastResults, setContrastResults] = React.useState<
    Array<{ label: string; fg: string; bg: string; ratio: number; rating: ContrastRating; passes: boolean; component: string }>
  >([]);

  React.useEffect(() => {
    const checkContrast = () => {
      const results = CONTRAST_PAIRINGS.map((pairing) => {
        const data = getContrastData(pairing.fg, pairing.bg);
        return {
          label: pairing.label,
          fg: pairing.fg,
          bg: pairing.bg,
          ratio: data?.ratio ?? 0,
          rating: data?.rating ?? "Fail" as ContrastRating,
          passes: data ? data.rating !== "Fail" : false,
          component: pairing.component,
        };
      });
      setContrastResults(results);
    };

    checkContrast();
    const observer = new MutationObserver(checkContrast);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
    const interval = setInterval(checkContrast, 1000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const failingPairings = contrastResults.filter((r) => !r.passes);

  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">Contrast Validation</h3>
        {failingPairings.length > 0 ? (
          <WexBadge intent="destructive" className="text-[10px]">
            {failingPairings.length} failing
          </WexBadge>
        ) : (
          <WexBadge intent="success" className="text-[10px]">
            All passing
          </WexBadge>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {contrastResults.map((result) => (
          <ContrastPreview
            key={result.label}
            label={result.label}
            fgToken={result.fg}
            bgToken={result.bg}
            compact
          />
        ))}
      </div>
    </div>
  );
}
