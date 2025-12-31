import { WexCard } from "@/components/wex/wex-card";
import { WexButton } from "@/components/wex/wex-button";
import { ChevronRight } from "lucide-react";
import { infoCardsData } from "./mockData";

/**
 * Info Cards Section Component
 * 
 * Grid of 4 informational cards with:
 * - Placeholder image
 * - Title
 * - Description
 * - Call-to-action button
 * 
 * Responsive: 4 cols desktop, 2 cols tablet, 1 col mobile
 */
export function InfoCardsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {infoCardsData.map((card, index) => (
        <WexCard key={index} className="flex flex-col">
          {/* Image Placeholder */}
          <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-info/10 rounded-t-lg flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-sm text-muted-foreground">{card.imageAlt}</div>
            </div>
          </div>

          <WexCard.Content className="p-6 flex-1 flex flex-col">
            <div className="space-y-4 flex-1">
              {/* Title */}
              <h3 className="text-lg font-display font-semibold text-foreground leading-snug">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Button */}
            <div className="mt-6">
              <WexButton 
                intent="link" 
                size="md"
              >
                {card.buttonText}
                <ChevronRight className="h-4 w-4" />
              </WexButton>
            </div>
          </WexCard.Content>
        </WexCard>
      ))}
    </div>
  );
}

