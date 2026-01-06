import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "../ui/dropdown-menu";

/**
 * WexDropdownMenu - WEX Design System Dropdown Menu Component
 *
 * Menu triggered by a button for actions and navigation.
 * Uses namespace pattern: WexDropdownMenu.Trigger, WexDropdownMenu.Content, etc.
 *
 * @example
 * <WexDropdownMenu>
 *   <WexDropdownMenu.Trigger asChild>
 *     <WexButton variant="outline">Open Menu</WexButton>
 *   </WexDropdownMenu.Trigger>
 *   <WexDropdownMenu.Content>
 *     <WexDropdownMenu.Label>My Account</WexDropdownMenu.Label>
 *     <WexDropdownMenu.Separator />
 *     <WexDropdownMenu.Item>Profile</WexDropdownMenu.Item>
 *     <WexDropdownMenu.Item>Settings</WexDropdownMenu.Item>
 *   </WexDropdownMenu.Content>
 * </WexDropdownMenu>
 */

export const WexDropdownMenu = Object.assign(DropdownMenu, {
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioItem: DropdownMenuRadioItem,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Group: DropdownMenuGroup,
  Portal: DropdownMenuPortal,
  Sub: DropdownMenuSub,
  SubContent: DropdownMenuSubContent,
  SubTrigger: DropdownMenuSubTrigger,
  RadioGroup: DropdownMenuRadioGroup,
});

