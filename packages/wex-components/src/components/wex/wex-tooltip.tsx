import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";

/**
 * WexTooltip - WEX Design System Tooltip Component
 *
 * Popup info displayed on hover/focus.
 * Uses namespace pattern: WexTooltip.Trigger, WexTooltip.Content, WexTooltip.Provider
 *
 * @example
 * <WexTooltip.Provider>
 *   <WexTooltip>
 *     <WexTooltip.Trigger asChild>
 *       <WexButton variant="outline">Hover me</WexButton>
 *     </WexTooltip.Trigger>
 *     <WexTooltip.Content>
 *       <p>Tooltip content</p>
 *     </WexTooltip.Content>
 *   </WexTooltip>
 * </WexTooltip.Provider>
 */

export const WexTooltip = Object.assign(Tooltip, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Provider: TooltipProvider,
});

