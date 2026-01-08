import * as React from "react";
import { WexCard } from "@/components/wex";
import { cn } from "@/lib/utils";

export interface IconItem {
  name: string;
  component: React.ComponentType<{ className?: string }>;
  category?: string;
}

interface IconGridProps {
  icons: IconItem[];
  selectedIcon: string | null;
  onIconClick: (icon: IconItem) => void;
}

export function IconGrid({ icons, selectedIcon, onIconClick }: IconGridProps) {
  if (icons.length === 0) {
    return (
      <WexCard className="p-12 text-center">
        <p className="text-muted-foreground">No icons found</p>
      </WexCard>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {icons.map((icon) => {
        const IconComponent = icon.component;
        const isSelected = selectedIcon === icon.name;

        return (
          <WexCard
            key={icon.name}
            className={cn(
              "p-4 cursor-pointer transition-all",
              "hover:shadow-md hover:border-primary/50 group",
              "flex flex-col items-center justify-center gap-3",
              "min-h-[120px]",
              isSelected && "border-primary shadow-md ring-2 ring-primary/20"
            )}
            onClick={() => onIconClick(icon)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onIconClick(icon);
              }
            }}
            aria-label={`Icon: ${icon.name}. Click to view details.`}
            aria-pressed={isSelected}
          >
            <div className="p-3 rounded-lg bg-muted group-hover:bg-muted/80 transition-colors flex items-center justify-center">
              <IconComponent className="h-6 w-6 text-foreground" />
            </div>
            <div className="text-center w-full">
              <p className="text-xs font-medium text-foreground truncate" title={icon.name}>
                {icon.name}
              </p>
            </div>
          </WexCard>
        );
      })}
    </div>
  );
}

