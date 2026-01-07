import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "../ui/popover";

/**
 * WexPopover - WEX Design System Popover Component
 *
 * Floating content triggered by a button.
 * Uses namespace pattern: WexPopover.Trigger, WexPopover.Content
 *
 * @example
 * <WexPopover>
 *   <WexPopover.Trigger asChild>
 *     <WexButton variant="outline">Open Popover</WexButton>
 *   </WexPopover.Trigger>
 *   <WexPopover.Content>
 *     Popover content here
 *   </WexPopover.Content>
 * </WexPopover>
 */

export const WexPopover = Object.assign(Popover, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Anchor: PopoverAnchor,
});

