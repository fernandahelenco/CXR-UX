import * as React from "react";
import { Check, AlertTriangle, X } from "lucide-react";
import {
  getContrastData,
  formatContrastRatio,
  type ContrastRating,
} from "@/docs/utils/contrast";
import { WexTooltip } from "@/components/wex";

/**
 * ContrastBadge - Displays contrast ratio signal for color pairings
 *
 * Shows:
 * - Contrast ratio (e.g., "4.62:1")
 * - Rating tag: "Contrast: AA"
 *
 * This is a SIGNAL, not a compliance certification.
 *
 * @example
 * ```tsx
 * <ContrastBadge fgVar="--wex-text" bgVar="--wex-content-bg" />
 * ```
 */

interface ContrastBadgeProps {
  /** CSS variable name for foreground color (e.g., "--wex-text") */
  fgVar: string;
  /** CSS variable name for background color (e.g., "--wex-content-bg") */
  bgVar: string;
  /** Show compact version (just rating, no ratio) */
  compact?: boolean;
}

export function ContrastBadge({ fgVar, bgVar, compact = false }: ContrastBadgeProps) {
  const [contrastData, setContrastData] = React.useState<{
    ratio: number;
    rating: ContrastRating;
  } | null>(null);

  React.useEffect(() => {
    // Compute contrast on client-side only
    const computeContrast = () => {
      const data = getContrastData(fgVar, bgVar);
      if (data) {
        setContrastData({ ratio: data.ratio, rating: data.rating });
      }
    };

    computeContrast();

    // Listen for theme changes (dark mode toggle)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          // Re-compute when .dark class changes
          computeContrast();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, [fgVar, bgVar]);

  if (!contrastData) {
    return (
      <span className="text-[10px] text-muted-foreground">
        Loading...
      </span>
    );
  }

  const { ratio, rating } = contrastData;
  const config = getBadgeConfig(rating);

  const RatingIcon = getRatingIcon(rating);

  return (
    <WexTooltip.Provider>
      <WexTooltip>
        <WexTooltip.Trigger asChild>
          <span className={config.className}>
            <RatingIcon className="h-3 w-3" />
            {compact ? (
              rating
            ) : (
              <>
                {formatContrastRatio(ratio)} {rating}
              </>
            )}
          </span>
        </WexTooltip.Trigger>
        <WexTooltip.Content side="top" className="max-w-xs">
          <TooltipContentComponent
            ratio={ratio}
            rating={rating}
            fgVar={fgVar}
            bgVar={bgVar}
          />
        </WexTooltip.Content>
      </WexTooltip>
    </WexTooltip.Provider>
  );
}

interface TooltipContentProps {
  ratio: number;
  rating: ContrastRating;
  fgVar: string;
  bgVar: string;
}

function TooltipContentComponent({ ratio, rating, fgVar, bgVar }: TooltipContentProps) {
  return (
    <div className="space-y-2 text-xs">
      <p className="font-semibold text-foreground">Contrast Signal</p>
      <p className="text-muted-foreground">
        Computed contrast ratio for text readability.
        This is a signal, not a certification.
      </p>
      <div className="border-t border-border pt-2 space-y-1">
        <p><span className="text-muted-foreground">Ratio:</span> {formatContrastRatio(ratio)}</p>
        <p><span className="text-muted-foreground">Rating:</span> {rating}</p>
        <p><span className="text-muted-foreground">Foreground:</span> {fgVar}</p>
        <p><span className="text-muted-foreground">Background:</span> {bgVar}</p>
        {rating === "AA-large" && (
          <p className="text-warning bg-warning/10 px-1 py-0.5 rounded text-[10px]">
            Passes AA for large text (≥18pt or 14pt bold) only
          </p>
        )}
        {rating === "Fail" && (
          <p className="text-destructive bg-destructive/10 px-1 py-0.5 rounded text-[10px]">
            Does not meet WCAG AA requirements for text
          </p>
        )}
      </div>
    </div>
  );
}

interface BadgeConfig {
  className: string;
}

function getBadgeConfig(rating: ContrastRating): BadgeConfig {
  // Improved styling: larger text, better padding, clear visual hierarchy
  // Use semantic colors that work in both light and dark modes
  const baseClasses = "inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded cursor-help transition-colors";

  switch (rating) {
    case "AAA":
      return {
        // Green badge - text-success is green, visible in both modes
        className: `${baseClasses} bg-success/20 text-success border border-success/50`,
      };
    case "AA":
      return {
        className: `${baseClasses} bg-success/20 text-success border border-success/50`,
      };
    case "AA-large":
      return {
        // Amber badge - use foreground for text which adapts to theme
        className: `${baseClasses} bg-warning/25 text-foreground border border-warning/50`,
      };
    case "Fail":
      return {
        // Red badge - text-destructive is red, visible in both modes
        className: `${baseClasses} bg-destructive/20 text-destructive border border-destructive/50`,
      };
  }
}

function getRatingIcon(rating: ContrastRating): React.ComponentType<{ className?: string }> {
  switch (rating) {
    case "AAA":
    case "AA":
      return Check;
    case "AA-large":
      return AlertTriangle;
    case "Fail":
      return X;
  }
}

/**
 * Inline contrast indicator for use within swatch components
 * Shows the rating as a compact badge with icon
 */
export function ContrastIndicator({ fgVar, bgVar }: Omit<ContrastBadgeProps, "compact">) {
  const [contrastData, setContrastData] = React.useState<{
    ratio: number;
    rating: ContrastRating;
  } | null>(null);

  React.useEffect(() => {
    const computeContrast = () => {
      const data = getContrastData(fgVar, bgVar);
      if (data) {
        setContrastData({ ratio: data.ratio, rating: data.rating });
      }
    };

    computeContrast();

    // Listen for theme changes (dark mode toggle)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          computeContrast();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, [fgVar, bgVar]);

  if (!contrastData) {
    return null;
  }

  const { ratio, rating } = contrastData;
  const config = getIndicatorConfig(rating);
  const RatingIcon = getRatingIcon(rating);

  return (
    <WexTooltip.Provider>
      <WexTooltip>
        <WexTooltip.Trigger asChild>
          <span className={config.className}>
            <RatingIcon className="h-2.5 w-2.5" />
            <span>{rating}</span>
          </span>
        </WexTooltip.Trigger>
        <WexTooltip.Content side="top" className="max-w-xs">
          <TooltipContentComponent
            ratio={ratio}
            rating={rating}
            fgVar={fgVar}
            bgVar={bgVar}
          />
        </WexTooltip.Content>
      </WexTooltip>
    </WexTooltip.Provider>
  );
}

function getIndicatorConfig(rating: ContrastRating): { className: string } {
  const baseClasses = "inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded cursor-help";

  switch (rating) {
    case "AAA":
    case "AA":
      return { className: `${baseClasses} bg-success/25 text-success` };
    case "AA-large":
      // Use foreground text which adapts to light/dark mode
      return { className: `${baseClasses} bg-warning/30 text-foreground` };
    case "Fail":
      return { className: `${baseClasses} bg-destructive/25 text-destructive` };
  }
}
