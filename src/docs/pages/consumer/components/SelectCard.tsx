import * as React from "react";
import { HelpCircle } from "lucide-react";
import { WexCard } from "@/components/wex/wex-card";
import { WexCheckbox } from "@/components/wex/wex-checkbox";
import { cn } from "@/lib/utils";

/**
 * SelectCard Props
 */
export interface SelectCardProps {
  id: string;
  title: string;
  description: string;
  subtext?: string;
  icon?: React.ReactNode;
  showLink?: boolean;
  linkText?: string;
  onLinkClick?: () => void;
  type?: "checkbox" | "radio";
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

/**
 * SelectCard Component
 * 
 * A card component that displays content with selection capabilities.
 * Supports both checkbox (multiple selection) and radio (single selection) modes.
 * 
 * Features:
 * - Optional icon (typically HelpCircle)
 * - Title and optional subtext
 * - Description text
 * - Optional "View more" link
 * - Checkbox or Radio button for selection
 * - States: default, checked, disabled
 */
export function SelectCard({
  id,
  title,
  description,
  subtext,
  icon,
  showLink = true,
  linkText = "View more",
  onLinkClick,
  type = "checkbox",
  checked = false,
  disabled = false,
  onCheckedChange,
  className,
}: SelectCardProps) {
  const handleCardClick = () => {
    if (disabled) return;
    if (type === "checkbox") {
      onCheckedChange?.(!checked);
    } else {
      // Radio mode: always set to true (parent handles deselecting others)
      if (!checked) {
        onCheckedChange?.(true);
      }
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    if (disabled) return;
    onCheckedChange?.(checked);
  };

  // Default icon is HelpCircle if icon prop is not provided
  const displayIcon = icon !== null ? (icon || <HelpCircle className="h-6 w-6 text-muted-foreground" />) : null;

  return (
    <WexCard
      className={cn(
        "w-[352px] p-6 cursor-pointer transition-all rounded-lg",
        !disabled && "shadow-sm hover:shadow-md",
        disabled && "cursor-not-allowed bg-muted shadow-none",
        checked && !disabled
          ? "border-primary"
          : "border-border",
        className
      )}
      onClick={handleCardClick}
      role={type === "radio" ? "radio" : "checkbox"}
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={`${title} card, ${checked ? "selected" : "not selected"}`}
    >
      <div className={cn("flex items-start", displayIcon && "gap-2")}>
        {/* Icon */}
        {displayIcon && (
          <div className="shrink-0 mt-0.5">
            {displayIcon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          {/* Header: Title, Subtext, and Checkbox/Radio */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              {/* Title */}
              <h3 className={cn(
                "text-base font-semibold leading-6 tracking-normal",
                disabled ? "text-muted-foreground" : "text-foreground"
              )}>
                {title}
              </h3>
              
              {/* Subtext */}
              {subtext && (
                <p className="text-xs font-normal leading-4 tracking-[0.18px] text-muted-foreground">
                  {subtext}
                </p>
              )}
            </div>

            {/* Checkbox or Radio */}
            <div
              className="shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {type === "checkbox" ? (
                <WexCheckbox
                  id={`select-card-${id}`}
                  checked={checked}
                  disabled={disabled}
                  onCheckedChange={handleCheckboxChange}
                  className="h-4 w-4"
                />
              ) : (
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border flex items-center justify-center transition-colors relative",
                    checked && !disabled
                      ? "border-primary bg-background"
                      : "border-border bg-background",
                    disabled && "opacity-50 border-muted"
                  )}
                  role="radio"
                  aria-checked={checked}
                  aria-label={`Select ${title}`}
                >
                  {checked && !disabled && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className={cn(
            "text-sm font-normal leading-[21px] tracking-[0.07px] text-muted-foreground",
            disabled && "text-muted-foreground/70"
          )}>
            {description}
          </p>

          {/* Link */}
          {showLink && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onLinkClick?.();
              }}
              disabled={disabled}
              className={cn(
                "text-sm font-semibold leading-[21px] tracking-[0.07px] text-left self-start whitespace-nowrap",
                disabled ? "text-muted-foreground cursor-not-allowed" : "text-foreground hover:underline",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded"
              )}
            >
              {linkText}
            </button>
          )}
        </div>
      </div>
    </WexCard>
  );
}

/**
 * SelectCardGroup Props
 */
export interface SelectCardGroupProps {
  type: "checkbox" | "radio";
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  cards: (Omit<SelectCardProps, "type" | "checked" | "onCheckedChange"> & { id: string })[];
  className?: string;
}

/**
 * SelectCardGroup Component
 * 
 * Container component that manages selection state for multiple SelectCard components.
 * 
 * - Checkbox mode: tracks array of selected card IDs
 * - Radio mode: tracks single selected card ID
 */
export function SelectCardGroup({
  type,
  value,
  onValueChange,
  cards,
  className,
}: SelectCardGroupProps) {
  const handleCardCheckedChange = (cardId: string, checked: boolean) => {
    if (type === "checkbox") {
      const currentValue = (value as string[]) || [];
      const newValue = checked
        ? [...currentValue, cardId]
        : currentValue.filter((id) => id !== cardId);
      onValueChange?.(newValue);
    } else {
      // Radio mode: only one can be selected
      onValueChange?.(checked ? cardId : "");
    }
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {cards.map((card) => {
        const isChecked =
          type === "checkbox"
            ? (value as string[] || []).includes(card.id)
            : value === card.id;

        return (
          <SelectCard
            key={card.id}
            {...card}
            type={type}
            checked={isChecked}
            onCheckedChange={(checked) =>
              handleCardCheckedChange(card.id, checked)
            }
          />
        );
      })}
    </div>
  );
}

