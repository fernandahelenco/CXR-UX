import * as React from "react";
import { StatusBadge } from "./StatusBadge";
import { A11ySignalBadge } from "./A11ySignalBadge";
import { A11yResultsSection } from "./A11yResultsSection";
import type { ComponentStatus } from "@/docs/registry/types";

interface ComponentPageProps {
  title: string;
  description: string;
  status: ComponentStatus;
  /**
   * Registry key for the component (e.g., "button", "accordion")
   * Used to look up a11y test results from compliance.json
   */
  registryKey: string;
  children: React.ReactNode;
}

/**
 * Reusable wrapper for component documentation pages
 *
 * Provides consistent header with:
 * - Title
 * - Status badge (Alpha/Beta/Stable)
 * - A11y signal badge (from automated testing)
 * - Description
 * - Accessibility results summary section
 */
export function ComponentPage({
  title,
  description,
  status,
  registryKey,
  children,
}: ComponentPageProps) {
  return (
    <article>
      <header className="mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-display font-bold text-foreground">
            {title}
          </h1>
          <StatusBadge status={status} />
          <A11ySignalBadge registryKey={registryKey} />
        </div>
        <p className="text-lg text-muted-foreground">{description}</p>
      </header>
      
      {/* Accessibility Results Section - summary with link to dashboard */}
      <A11yResultsSection registryKey={registryKey} />
      
      <div className="space-y-12">{children}</div>
    </article>
  );
}
