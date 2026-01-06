import {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";

/**
 * WexSheet - WEX Design System Sheet Component
 *
 * Slide-out panel from screen edge.
 * Uses namespace pattern: WexSheet.Trigger, WexSheet.Content, etc.
 *
 * @example
 * <WexSheet>
 *   <WexSheet.Trigger asChild>
 *     <WexButton variant="outline">Open Sheet</WexButton>
 *   </WexSheet.Trigger>
 *   <WexSheet.Content>
 *     <WexSheet.Header>
 *       <WexSheet.Title>Sheet Title</WexSheet.Title>
 *       <WexSheet.Description>Sheet description</WexSheet.Description>
 *     </WexSheet.Header>
 *     Content here
 *   </WexSheet.Content>
 * </WexSheet>
 */

import * as React from "react";

// Create a wrapper component that renders Sheet but with namespace properties
// IMPORTANT: Do NOT use Object.assign on Sheet directly - it shares the same
// Radix primitive as Dialog, causing Content to be overwritten.
const WexSheetRoot: typeof Sheet & {
  Portal: typeof SheetPortal;
  Overlay: typeof SheetOverlay;
  Trigger: typeof SheetTrigger;
  Close: typeof SheetClose;
  Content: typeof SheetContent;
  Header: typeof SheetHeader;
  Footer: typeof SheetFooter;
  Title: typeof SheetTitle;
  Description: typeof SheetDescription;
} = Object.assign(
  ((props: React.ComponentProps<typeof Sheet>) => <Sheet {...props} />) as typeof Sheet,
  {
    Portal: SheetPortal,
    Overlay: SheetOverlay,
    Trigger: SheetTrigger,
    Close: SheetClose,
    Content: SheetContent,
    Header: SheetHeader,
    Footer: SheetFooter,
    Title: SheetTitle,
    Description: SheetDescription,
  }
);

export const WexSheet = WexSheetRoot;

