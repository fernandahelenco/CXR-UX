import * as React from "react";
import { WexDialog } from "@/components/wex/wex-dialog";
import { WexButton } from "@/components/wex/wex-button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Workspace Props
 */
export interface WorkspaceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  showFooter?: boolean;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  tertiaryButton?: React.ReactNode;
  stepperContent?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Workspace Component
 * 
 * A full-screen overlay workspace with header, content area, and footer with up to 3 buttons.
 * 
 * Features:
 * - Opens as full-screen overlay with 24px margins (top/left/right)
 * - Max width of 1920px
 * - Header with title and close button
 * - Main content area
 * - Footer with optional buttons (primary, secondary, tertiary)
 * - Closes via header close button only
 * 
 * @example
 * <Workspace
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="My Workspace"
 *   showFooter
 *   primaryButton={<WexButton>Save</WexButton>}
 *   secondaryButton={<WexButton variant="outline">Cancel</WexButton>}
 *   tertiaryButton={<WexButton variant="ghost">Reset</WexButton>}
 * >
 *   <div>Main content here</div>
 * </Workspace>
 */
export function Workspace({
  open,
  onOpenChange,
  title = "Workspace title",
  showFooter = true,
  primaryButton,
  secondaryButton,
  tertiaryButton,
  stepperContent,
  children,
  className,
}: WorkspaceProps) {
  return (
    <WexDialog open={open} onOpenChange={onOpenChange}>
      <WexDialog.Content
        className={cn(
          "bg-transparent border-0 shadow-none pt-6 px-6 pb-0 w-full h-screen max-h-screen max-w-none flex items-start",
          "[&>div:last-child]:hidden", // Hide default close button
          className
        )}
        onPointerDownOutside={(e) => e.preventDefault()} // Prevent closing on overlay click
        onEscapeKeyDown={(e) => e.preventDefault()} // Prevent closing on Esc key
      >
        {/* Centered Panel with margins */}
        <div className="mx-auto w-full h-[calc(100vh-24px)] max-w-[1920px] flex flex-col">
          {/* Main Panel */}
          <div className="bg-white rounded-t-2xl shadow-[0px_8px_16px_0px_rgba(2,13,36,0.15),0px_0px_1px_0px_rgba(2,13,36,0.3)] flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="h-16 border-b border-[#e4e6e9] bg-white rounded-tl-2xl rounded-tr-2xl flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center">
                <h2 className="text-lg font-medium text-[#1d2c38] tracking-[-0.252px] leading-6">
                  {title}
                </h2>
              </div>
              <WexButton
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 rounded-full hover:bg-gray-100"
                aria-label="Close workspace"
              >
                <X className="h-4 w-4 text-[#1d2c38]" />
              </WexButton>
            </div>

            {/* Body: Content */}
            <div className="flex flex-1 min-h-0 overflow-hidden">
              {stepperContent && (
                <div className="w-[280px] min-h-0 border-r border-[#e4e6e9] bg-[#f7f7f7] p-6 overflow-y-auto">
                  {stepperContent}
                </div>
              )}
              {/* Main Content Area */}
              <div className="flex-1 min-h-0 bg-white overflow-y-auto">
                {children}
              </div>
            </div>

            {/* Footer */}
            {showFooter && (
              <div className="h-[72px] border-t border-[#e4e6e9] bg-white flex items-center px-4 shrink-0">
                <div className="flex-1">{tertiaryButton}</div>
                <div className="flex items-center gap-2">
                  {secondaryButton}
                  {primaryButton}
                </div>
              </div>
            )}
          </div>
        </div>
      </WexDialog.Content>
    </WexDialog>
  );
}

