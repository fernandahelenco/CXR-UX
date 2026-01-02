import { WexCard } from "@/components/wex/wex-card";
import { WexButton } from "@/components/wex/wex-button";
import { quickLinksData } from "./mockData";

/**
 * Quick Links Section
 * 
 * Displays quick action links in a pill-style button layout
 */
export function QuickLinksSection() {
  return (
    <WexCard className="h-full">
      <WexCard.Content className="p-6 h-full">
        <div className="space-y-6">
          {/* Header */}
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Quick Links
          </h2>

          {/* Quick Links Grid */}
          <div className="flex flex-wrap gap-2">
            {quickLinksData.map((link, index) => (
              <WexButton
                key={index}
                intent="outline"
                size="sm"
                className="rounded-[32px] h-auto py-0.5 text-sm font-medium shrink-0"
              >
                {link.label}
              </WexButton>
            ))}
          </div>
        </div>
      </WexCard.Content>
    </WexCard>
  );
}

