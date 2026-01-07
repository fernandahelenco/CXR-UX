/**
 * ComponentSelector Component
 * 
 * Visual grid/list of editable components for the Theme Builder.
 * Shows 5 MVP components: Button, Card, Input, Badge, Alert
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Square,
  CreditCard,
  Type,
  Tag,
  AlertCircle,
} from "lucide-react";

export type MVPComponent = "button" | "card" | "input" | "badge" | "alert";

export interface ComponentInfo {
  id: MVPComponent;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const COMPONENTS: ComponentInfo[] = [
  {
    id: "button",
    label: "Button",
    icon: Square,
    description: "Buttons with variants (primary, secondary, destructive)",
  },
  {
    id: "card",
    label: "Card",
    icon: CreditCard,
    description: "Card containers with borders and backgrounds",
  },
  {
    id: "input",
    label: "Input",
    icon: Type,
    description: "Text input fields and form controls",
  },
  {
    id: "badge",
    label: "Badge",
    icon: Tag,
    description: "Status badges with intent colors",
  },
  {
    id: "alert",
    label: "Alert",
    icon: AlertCircle,
    description: "Alert messages with variants",
  },
];

export interface ComponentSelectorProps {
  /** Currently selected component */
  selectedComponent: MVPComponent | null;
  /** Callback when component is selected */
  onSelectComponent: (component: MVPComponent) => void;
  /** Optional className */
  className?: string;
}

export function ComponentSelector({
  selectedComponent,
  onSelectComponent,
  className,
}: ComponentSelectorProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1 mb-2">
        Components
      </div>
      <div className="grid grid-cols-1 gap-1.5">
        {COMPONENTS.map((component) => {
          const Icon = component.icon;
          const isSelected = selectedComponent === component.id;
          
          return (
            <button
              key={component.id}
              type="button"
              onClick={() => onSelectComponent(component.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md border transition-all text-left",
                "hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                  : "border-border bg-background"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0",
                  isSelected
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className={cn(
                    "text-sm font-medium",
                    isSelected ? "text-foreground" : "text-foreground"
                  )}
                >
                  {component.label}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {component.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

