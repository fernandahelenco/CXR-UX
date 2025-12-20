import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Section wrapper with heading and optional description
 * Uses semantic h2 for section headings
 */
export function Section({ title, description, children, className }: SectionProps) {
  return (
    <section className={cn(className)}>
      <h2 className="text-xl font-display font-semibold text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground mb-6">{description}</p>
      )}
      <div>{children}</div>
    </section>
  );
}

