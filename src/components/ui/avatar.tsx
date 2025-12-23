"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const avatarVariants = cva("relative flex shrink-0", {
  variants: {
    size: {
      xs: "h-6 w-6 text-xs",
      sm: "h-8 w-8 text-sm",
      md: "h-10 w-10 text-base",
      lg: "h-12 w-12 text-lg",
      xl: "h-16 w-16 text-xl",
      "2xl": "h-20 w-20 text-2xl",
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-md",
    },
  },
  defaultVariants: {
    size: "md",
    shape: "circle",
  },
})

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, shape, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, shape }), className)}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover overflow-hidden rounded-[inherit]", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center bg-wex-avatar-fallback-bg text-wex-avatar-fallback-fg font-medium overflow-hidden rounded-[inherit]",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// ============================================================
// Avatar Group - Stacked avatars
// ============================================================
interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum number of avatars to show before +N indicator */
  max?: number
  /** Total count for +N indicator */
  total?: number
  /** Size of avatars in group */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max, total, size = "md", ...props }, ref) => {
    const childrenArray = React.Children.toArray(children)
    const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray
    const hiddenCount = total ?? (max ? childrenArray.length - max : 0)
    const showOverflow = hiddenCount > 0 && max && childrenArray.length > max

    return (
      <div
        ref={ref}
        className={cn("flex -space-x-2", className)}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div
            key={index}
            className="ring-2 ring-wex-avatar-border rounded-full"
          >
            {child}
          </div>
        ))}
        {showOverflow && (
          <div
            className={cn(
              avatarVariants({ size, shape: "circle" }),
              "ring-2 ring-wex-avatar-border flex items-center justify-center bg-wex-avatar-fallback-bg text-wex-avatar-fallback-fg font-medium"
            )}
          >
            +{hiddenCount}
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

// ============================================================
// Avatar Badge - Status indicator overlay
// ============================================================
const avatarBadgeVariants = cva(
  "absolute rounded-full border-2 border-wex-avatar-border",
  {
    variants: {
      position: {
        "bottom-right": "bottom-0 right-0",
        "bottom-left": "bottom-0 left-0",
        "top-right": "top-0 right-0",
        "top-left": "top-0 left-0",
      },
      status: {
        online: "bg-green-500",
        offline: "bg-gray-400",
        busy: "bg-red-500",
        away: "bg-yellow-500",
      },
      size: {
        xs: "h-1.5 w-1.5",
        sm: "h-2 w-2",
        md: "h-2.5 w-2.5",
        lg: "h-3 w-3",
        xl: "h-3.5 w-3.5",
        "2xl": "h-4 w-4",
      },
    },
    defaultVariants: {
      position: "bottom-right",
      status: "online",
      size: "md",
    },
  }
)

export interface AvatarBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarBadgeVariants> {}

const AvatarBadge = React.forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  ({ className, position, status, size, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(avatarBadgeVariants({ position, status, size }), className)}
      {...props}
    />
  )
)
AvatarBadge.displayName = "AvatarBadge"

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarBadge, avatarVariants }
