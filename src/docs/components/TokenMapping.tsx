/**
 * TokenMapping Component
 * 
 * Displays the relationship between WEX CSS variables and their 
 * Tailwind utility classes and component usage.
 */

import * as React from "react";
import { WexBadge } from "@/components/wex";
import { cn } from "@/lib/utils";

export interface TokenMappingData {
  /** WEX CSS variable name */
  token: string;
  /** Tailwind utility classes that use this token */
  tailwindUtilities: string[];
  /** Components that use this token */
  components: string[];
}

interface TokenMappingProps {
  /** Token data to display */
  data: TokenMappingData;
  /** Optional className */
  className?: string;
}

/**
 * Single token mapping display
 */
export function TokenMapping({ data, className }: TokenMappingProps) {
  return (
    <div className={cn("text-xs space-y-1.5 p-2 rounded bg-muted/30 border border-border/50", className)}>
      <code className="font-mono text-primary text-[11px]">{data.token}</code>
      
      {data.tailwindUtilities.length > 0 && (
        <div className="flex flex-wrap gap-1">
          <span className="text-muted-foreground mr-1">Tailwind:</span>
          {data.tailwindUtilities.map((utility) => (
            <code
              key={utility}
              className="bg-muted px-1 py-0.5 rounded text-[10px] font-mono"
            >
              {utility}
            </code>
          ))}
        </div>
      )}
      
      {data.components.length > 0 && (
        <div className="flex flex-wrap gap-1">
          <span className="text-muted-foreground mr-1">Used by:</span>
          {data.components.map((component) => (
            <WexBadge key={component} intent="secondary" className="text-[10px] px-1.5 py-0">
              {component}
            </WexBadge>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Compact inline token mapping for use in editors
 */
interface TokenMappingInlineProps {
  token: string;
  className?: string;
}

export function TokenMappingInline({ token, className }: TokenMappingInlineProps) {
  const mapping = TOKEN_MAPPINGS[token];
  
  if (!mapping) return null;
  
  return (
    <div className={cn("flex flex-wrap items-center gap-1 text-[10px]", className)}>
      <span className="text-muted-foreground">→</span>
      {mapping.tailwindUtilities.slice(0, 2).map((utility) => (
        <code key={utility} className="bg-muted px-1 py-0.5 rounded font-mono">
          {utility}
        </code>
      ))}
      {mapping.tailwindUtilities.length > 2 && (
        <span className="text-muted-foreground">+{mapping.tailwindUtilities.length - 2}</span>
      )}
    </div>
  );
}

/**
 * Token to Tailwind/Component mapping registry
 */
export const TOKEN_MAPPINGS: Record<string, TokenMappingData> = {
  "--wex-primary": {
    token: "--wex-primary",
    tailwindUtilities: ["bg-primary", "text-primary", "border-primary", "ring-primary"],
    components: ["WexButton (default)", "WexBadge (default)", "WexProgress", "WexSwitch"],
  },
  "--wex-primary-contrast": {
    token: "--wex-primary-contrast",
    tailwindUtilities: ["text-primary-foreground"],
    components: ["WexButton (default)", "WexBadge (default)"],
  },
  "--wex-primary-hover": {
    token: "--wex-primary-hover",
    tailwindUtilities: ["hover:bg-primary/90"],
    components: ["WexButton (default)"],
  },
  "--wex-danger-bg": {
    token: "--wex-danger-bg",
    tailwindUtilities: ["bg-destructive", "border-destructive"],
    components: ["WexButton (destructive)", "WexBadge (destructive)", "WexAlert (destructive)"],
  },
  "--wex-danger-fg": {
    token: "--wex-danger-fg",
    tailwindUtilities: ["text-destructive-foreground", "text-destructive"],
    components: ["WexButton (destructive)", "WexAlert (destructive)"],
  },
  "--wex-success-bg": {
    token: "--wex-success-bg",
    tailwindUtilities: ["bg-success", "border-success"],
    components: ["WexBadge (success)", "WexAlert (success)"],
  },
  "--wex-success-fg": {
    token: "--wex-success-fg",
    tailwindUtilities: ["text-success", "text-success-foreground"],
    components: ["WexBadge (success)", "WexAlert (success)"],
  },
  "--wex-warning-bg": {
    token: "--wex-warning-bg",
    tailwindUtilities: ["bg-warning", "border-warning"],
    components: ["WexBadge (warning)", "WexAlert (warning)"],
  },
  "--wex-warning-fg": {
    token: "--wex-warning-fg",
    tailwindUtilities: ["text-warning", "text-warning-foreground"],
    components: ["WexBadge (warning)", "WexAlert (warning)"],
  },
  "--wex-info-bg": {
    token: "--wex-info-bg",
    tailwindUtilities: ["bg-info", "border-info"],
    components: ["WexBadge (info)", "WexAlert (info)"],
  },
  "--wex-info-fg": {
    token: "--wex-info-fg",
    tailwindUtilities: ["text-info", "text-info-foreground"],
    components: ["WexBadge (info)", "WexAlert (info)"],
  },
  "--wex-content-bg": {
    token: "--wex-content-bg",
    tailwindUtilities: ["bg-background", "bg-card", "bg-popover"],
    components: ["WexCard", "WexDialog", "WexSheet", "WexDropdown"],
  },
  "--wex-content-border": {
    token: "--wex-content-border",
    tailwindUtilities: ["border-border", "divide-border"],
    components: ["WexCard", "WexSeparator", "WexInput", "WexTable"],
  },
  "--wex-surface-subtle": {
    token: "--wex-surface-subtle",
    tailwindUtilities: ["bg-muted", "bg-accent"],
    components: ["WexTabs (selected)", "WexSelect (hover)", "WexCommand"],
  },
  "--wex-text": {
    token: "--wex-text",
    tailwindUtilities: ["text-foreground"],
    components: ["All text content"],
  },
  "--wex-text-muted": {
    token: "--wex-text-muted",
    tailwindUtilities: ["text-muted-foreground"],
    components: ["Labels", "Descriptions", "Placeholders"],
  },
  "--wex-input-border": {
    token: "--wex-input-border",
    tailwindUtilities: ["border-input"],
    components: ["WexInput", "WexSelect", "WexTextarea"],
  },
  "--wex-focus-ring-color": {
    token: "--wex-focus-ring-color",
    tailwindUtilities: ["ring-ring"],
    components: ["All focusable elements"],
  },
  "--wex-danger-hover": {
    token: "--wex-danger-hover",
    tailwindUtilities: ["hover:bg-destructive-hover"],
    components: ["WexButton (destructive)"],
  },
  "--wex-success-hover": {
    token: "--wex-success-hover",
    tailwindUtilities: ["hover:bg-success-hover"],
    components: ["WexButton (success)"],
  },
  "--wex-warning-hover": {
    token: "--wex-warning-hover",
    tailwindUtilities: ["hover:bg-warning-hover"],
    components: ["WexButton (warning)"],
  },
  "--wex-info-hover": {
    token: "--wex-info-hover",
    tailwindUtilities: ["hover:bg-info-hover"],
    components: ["WexButton (info)"],
  },
};

/**
 * Get mapping for a specific token
 */
export function getTokenMapping(token: string): TokenMappingData | undefined {
  return TOKEN_MAPPINGS[token];
}

