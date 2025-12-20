import * as React from "react";

interface ExampleCardProps {
  title?: string;
  description?: string;
  /** Optional ID for the example, used by a11y testing to identify specific examples */
  exampleId?: string;
  children: React.ReactNode;
}

/**
 * Helper to generate a slug from title for data-example-id
 */
function generateExampleId(title?: string): string {
  if (title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
  return "";
}

/**
 * Container for interactive component examples
 * Shows component in a bordered preview area
 * 
 * The inner div has data-testid="component-example" for a11y test scoping.
 * Only the component example content (children) is tested, not the header.
 */
export function ExampleCard({ title, description, exampleId, children }: ExampleCardProps) {
  // Use React's useId for guaranteed unique IDs when no explicit ID or title is provided
  const reactId = React.useId();
  const resolvedExampleId = exampleId ?? (generateExampleId(title) || `example-${reactId.replace(/:/g, "")}`);
  
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {(title || description) && (
        <div className="px-4 py-3 border-b border-border bg-muted/50">
          {title && (
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
      <div 
        className="p-6 flex flex-wrap items-center gap-4"
        data-testid="component-example"
        data-example-id={resolvedExampleId}
      >
        {children}
      </div>
    </div>
  );
}
