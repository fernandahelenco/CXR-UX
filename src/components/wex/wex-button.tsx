import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/**
 * WexButton - WEX Design System Button Component
 *
 * The primary interactive element for triggering actions.
 * Uses WEX semantic tokens and meets WCAG 2.5.5 touch target requirements.
 *
 * @example
 * <WexButton intent="primary">Save Changes</WexButton>
 * <WexButton intent="destructive" size="sm">Delete</WexButton>
 * <WexButton intent="success" rounded>Complete</WexButton>
 * <WexButton intent="primary" loading>Saving...</WexButton>
 */

const wexButtonVariants = cva(
  // Base classes - hardened with accessibility requirements
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap text-sm font-medium",
    "transition-colors cursor-pointer",
    // HARDENED: Focus ring - always visible on focus-visible
    "focus-visible:outline-none",
    "focus-visible:ring-[length:var(--wex-focus-ring-width)]",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-[length:var(--wex-focus-ring-offset)]",
    "focus-visible:ring-offset-background",
    // Disabled state - pointer-events in base, colors per-variant
    "disabled:pointer-events-none",
    // SVG handling
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      intent: {
        // PRIMARY - Layer 3 tokens with explicit disabled colors
        primary: [
          "bg-wex-button-primary-bg",
          "text-wex-button-primary-fg",
          "border border-wex-button-primary-border",
          "hover:bg-wex-button-primary-hover-bg",
          "active:bg-wex-button-primary-active-bg",
          "disabled:bg-wex-button-primary-disabled-bg",
          "disabled:text-wex-button-primary-disabled-fg",
          "disabled:opacity-[var(--wex-component-button-disabled-opacity)]",
        ].join(" "),
        // SECONDARY - Layer 3 tokens with explicit disabled colors
        secondary: [
          "bg-wex-button-secondary-bg",
          "text-wex-button-secondary-fg",
          "border border-wex-button-secondary-border",
          "hover:bg-wex-button-secondary-hover-bg",
          "active:bg-wex-button-secondary-active-bg",
          "disabled:bg-wex-button-secondary-disabled-bg",
          "disabled:text-wex-button-secondary-disabled-fg",
          "disabled:opacity-[var(--wex-component-button-disabled-opacity)]",
        ].join(" "),
        // DESTRUCTIVE - Layer 3 tokens with explicit disabled colors
        destructive: [
          "bg-wex-button-destructive-bg",
          "text-wex-button-destructive-fg",
          "border border-wex-button-destructive-border",
          "hover:bg-wex-button-destructive-hover-bg",
          "active:bg-wex-button-destructive-active-bg",
          "disabled:bg-wex-button-destructive-disabled-bg",
          "disabled:text-wex-button-destructive-disabled-fg",
          "disabled:opacity-[var(--wex-component-button-disabled-opacity)]",
        ].join(" "),
        // SUCCESS - Layer 3 tokens
        success: [
          "bg-wex-button-success-bg",
          "text-wex-button-success-fg",
          "border border-wex-button-success-border",
          "hover:bg-wex-button-success-hover-bg",
          "active:bg-wex-button-success-active-bg",
          "disabled:bg-wex-button-success-disabled-bg",
          "disabled:text-wex-button-success-disabled-fg",
          "disabled:opacity-[var(--wex-component-button-disabled-opacity)]",
        ].join(" "),
        // INFO - Layer 3 tokens
        info: [
          "bg-wex-button-info-bg",
          "text-wex-button-info-fg",
          "border border-wex-button-info-border",
          "hover:bg-wex-button-info-hover-bg",
          "active:bg-wex-button-info-active-bg",
          "disabled:bg-wex-button-info-disabled-bg",
          "disabled:text-wex-button-info-disabled-fg",
          "disabled:opacity-[var(--wex-component-button-disabled-opacity)]",
        ].join(" "),
        // WARNING - Layer 3 tokens
        warning: [
          "bg-wex-button-warning-bg",
          "text-wex-button-warning-fg",
          "border border-wex-button-warning-border",
          "hover:bg-wex-button-warning-hover-bg",
          "active:bg-wex-button-warning-active-bg",
          "disabled:bg-wex-button-warning-disabled-bg",
          "disabled:text-wex-button-warning-disabled-fg",
          "disabled:opacity-[var(--wex-component-button-disabled-opacity)]",
        ].join(" "),
        // HELP - Layer 3 tokens
        help: [
          "bg-wex-button-help-bg",
          "text-wex-button-help-fg",
          "border border-wex-button-help-border",
          "hover:bg-wex-button-help-hover-bg",
          "active:bg-wex-button-help-active-bg",
          "disabled:bg-wex-button-help-disabled-bg",
          "disabled:text-wex-button-help-disabled-fg",
          "disabled:opacity-[var(--wex-component-button-disabled-opacity)]",
        ].join(" "),
        // CONTRAST - Layer 3 tokens (inverts in dark mode)
        contrast: [
          "bg-wex-button-contrast-bg",
          "text-wex-button-contrast-fg",
          "border border-wex-button-contrast-border",
          "hover:bg-wex-button-contrast-hover-bg",
          "active:bg-wex-button-contrast-active-bg",
          "disabled:bg-wex-button-contrast-disabled-bg",
          "disabled:text-wex-button-contrast-disabled-fg",
          "disabled:opacity-[var(--wex-component-button-disabled-opacity)]",
        ].join(" "),
        // GHOST - transparent background, hover shows bg
        ghost: [
          "bg-transparent",
          "text-wex-button-tertiary-fg",
          "border border-transparent",
          "hover:bg-wex-button-tertiary-hover-bg",
          "active:bg-wex-button-tertiary-active-bg",
          "disabled:text-wex-button-tertiary-disabled-fg",
          "disabled:opacity-[var(--wex-component-button-disabled-opacity)]",
        ].join(" "),
        // OUTLINE - border visible, transparent background
        outline: [
          "bg-transparent",
          "text-wex-button-secondary-fg",
          "border border-wex-button-secondary-border",
          "hover:bg-wex-button-secondary-hover-bg",
          "active:bg-wex-button-secondary-active-bg",
          "disabled:text-wex-button-secondary-disabled-fg",
          "disabled:opacity-[var(--wex-component-button-disabled-opacity)]",
        ].join(" "),
        // LINK - styled as hyperlink
        link: [
          "bg-transparent",
          "text-wex-button-link-fg",
          "border-transparent",
          "underline-offset-4 hover:underline",
          "hover:text-wex-button-link-hover-fg",
          "active:text-wex-button-link-active-fg",
          "disabled:text-wex-button-link-disabled-fg",
          "disabled:no-underline",
          "disabled:opacity-[var(--wex-component-button-disabled-opacity)]",
        ].join(" "),
        // TINTED - Layer 3 tokens (tinted blue style)
        tinted: [
          "bg-wex-button-tinted-bg",
          "text-wex-button-tinted-fg",
          "border border-wex-button-tinted-border",
          "hover:bg-wex-button-tinted-hover-bg",
          "hover:border-wex-button-tinted-hover-border",
          "hover:text-wex-button-tinted-hover-fg",
          "active:bg-wex-button-tinted-active-bg",
          "disabled:opacity-[var(--wex-component-button-disabled-opacity)]",
        ].join(" "),
      },
      size: {
        // sm: Compact button, no WCAG target requirement (for dense UIs)
        sm: "h-8 px-3 text-xs",
        // md: Default - meets WCAG 2.5.5 minimum target size (44px)
        md: "h-11 min-h-target px-4 py-2",
        // lg: Large button, exceeds WCAG requirements
        lg: "h-12 min-h-12 px-8 text-base",
        // icon: Square icon button, meets WCAG requirements
        icon: "h-11 w-11 min-h-target min-w-target",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-md",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
      rounded: false,
    },
  }
);

export interface WexButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof wexButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const WexButton = React.forwardRef<HTMLButtonElement, WexButtonProps>(
  ({ className, intent, size, rounded, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;
    
    // When using asChild, Slot expects exactly ONE child element.
    // We cannot render the loading spinner alongside children when asChild is true.
    // Loading spinner is only shown for regular button mode.
    const renderChildren = () => {
      if (asChild) {
        // asChild mode: pass children directly to Slot (must be single element)
        return children;
      }
      // Regular button mode: can include loading spinner
      return (
        <>
          {loading && <Loader2 className="animate-spin" />}
          {children}
        </>
      );
    };
    
    return (
      <Comp
        className={cn(wexButtonVariants({ intent, size, rounded, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {renderChildren()}
      </Comp>
    );
  }
);
WexButton.displayName = "WexButton";

export { WexButton, wexButtonVariants };
