import * as React from "react";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

/**
 * WexDialog - WEX Design System Dialog Component
 *
 * Modal dialog for focused content that requires user attention.
 * Uses namespace pattern: WexDialog.Trigger, WexDialog.Content, etc.
 *
 * @example
 * <WexDialog>
 *   <WexDialog.Trigger asChild>
 *     <WexButton>Open</WexButton>
 *   </WexDialog.Trigger>
 *   <WexDialog.Content>
 *     <WexDialog.Header>
 *       <WexDialog.Title>Title</WexDialog.Title>
 *       <WexDialog.Description>Description</WexDialog.Description>
 *     </WexDialog.Header>
 *     Content here
 *     <WexDialog.Footer>
 *       <WexButton>Confirm</WexButton>
 *     </WexDialog.Footer>
 *   </WexDialog.Content>
 * </WexDialog>
 */

// Create a wrapper component that renders Dialog but with namespace properties
// IMPORTANT: Do NOT use Object.assign on Dialog directly - it mutates the shared
// Radix primitive which is also used by Sheet, causing Content to be overwritten.
const WexDialogRoot: typeof Dialog & {
  Portal: typeof DialogPortal;
  Overlay: typeof DialogOverlay;
  Trigger: typeof DialogTrigger;
  Close: typeof DialogClose;
  Content: typeof DialogContent;
  Header: typeof DialogHeader;
  Footer: typeof DialogFooter;
  Title: typeof DialogTitle;
  Description: typeof DialogDescription;
} = Object.assign(
  // Create a new function that wraps Dialog, not mutates it
  ((props: React.ComponentProps<typeof Dialog>) => <Dialog {...props} />) as typeof Dialog,
  {
    Portal: DialogPortal,
    Overlay: DialogOverlay,
    Trigger: DialogTrigger,
    Close: DialogClose,
    Content: DialogContent,
    Header: DialogHeader,
    Footer: DialogFooter,
    Title: DialogTitle,
    Description: DialogDescription,
  }
);

export const WexDialog = WexDialogRoot;

