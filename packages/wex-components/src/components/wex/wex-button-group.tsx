import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "../ui/button-group";

/**
 * WexButtonGroup - WEX Design System Button Group Component
 *
 * Container for grouping related buttons.
 * Uses namespace pattern: WexButtonGroup.Separator, WexButtonGroup.Text
 *
 * @example
 * <WexButtonGroup>
 *   <WexButton variant="outline">Left</WexButton>
 *   <WexButton variant="outline">Center</WexButton>
 *   <WexButton variant="outline">Right</WexButton>
 * </WexButtonGroup>
 */

export const WexButtonGroup = Object.assign(ButtonGroup, {
  Separator: ButtonGroupSeparator,
  Text: ButtonGroupText,
});

