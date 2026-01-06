import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "../ui/drawer";

/**
 * WexDrawer - WEX Design System Drawer Component
 *
 * Slide-out panel for mobile navigation.
 * Uses namespace pattern: WexDrawer.Trigger, WexDrawer.Content, etc.
 *
 * @example
 * <WexDrawer>
 *   <WexDrawer.Trigger asChild>
 *     <WexButton variant="outline">Open Drawer</WexButton>
 *   </WexDrawer.Trigger>
 *   <WexDrawer.Content>
 *     <WexDrawer.Header>
 *       <WexDrawer.Title>Drawer Title</WexDrawer.Title>
 *       <WexDrawer.Description>Description</WexDrawer.Description>
 *     </WexDrawer.Header>
 *     Content here
 *   </WexDrawer.Content>
 * </WexDrawer>
 */

export const WexDrawer = Object.assign(Drawer, {
  Portal: DrawerPortal,
  Overlay: DrawerOverlay,
  Trigger: DrawerTrigger,
  Close: DrawerClose,
  Content: DrawerContent,
  Header: DrawerHeader,
  Footer: DrawerFooter,
  Title: DrawerTitle,
  Description: DrawerDescription,
});

