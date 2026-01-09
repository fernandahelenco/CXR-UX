import { useState } from "react";
import { cn } from "@/lib/utils";
import { WexSheet } from "@/components/wex/wex-sheet";
import { WexButton } from "@/components/wex/wex-button";
import { WexBadge } from "@/components/wex/wex-badge";
import { WexTabs } from "@/components/wex/wex-tabs";
import { WexSeparator } from "@/components/wex/wex-separator";
import { WexScrollArea } from "@/components/wex/wex-scroll-area";
import { Calendar, Trash2, Send } from "lucide-react";

// Base Claim interface - matches Claims.tsx
export interface Claim {
  id: string;
  dateSubmitted: string;
  status: "document-needed" | "denied" | "in-review" | "submitted" | "not-submitted" | "approved";
  providerService: string;
  dateOfService: string;
  recipient: string;
  amount: string;
  hasRefresh?: boolean;
  // Extended fields for sidebar
  claimId?: string;
  payFrom?: string;
  payTo?: {
    recipient: string;
    address: string;
  };
  categoryType?: string;
  statusMessage?: string;
  statusDate?: string;
  isRecurring?: boolean;
  hasDocuments?: boolean;
  documents?: Array<{ name: string; url?: string }>;
  timeline?: Array<{
    date: string;
    event: string;
    description?: string;
  }>;
  letters?: Array<{
    title: string;
    date: string;
    url?: string;
  }>;
}

// Extended Claim interface for sidebar (alias for convenience)
export type ClaimDetail = Claim;

interface ClaimDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  claim: Claim | null;
}

// Configuration interface for sidebar actions
type SidebarIntent = "ghost" | "outline" | "primary" | "destructive";

interface SidebarActionConfig {
  leftActions: Array<{
    label: string;
    intent: SidebarIntent;
    icon?: React.ReactNode;
    onClick: () => void;
    className?: string;
  }>;
  rightActions: Array<{
    label: string;
    intent: SidebarIntent;
    icon?: React.ReactNode;
    onClick: () => void;
    className?: string;
  }>;
}

// Helper function to get status badge props
const getStatusBadge = (status: Claim["status"]) => {
  switch (status) {
    case "document-needed":
      return { intent: "warning" as const, label: "Document needed" };
    case "denied":
      return { intent: "destructive" as const, label: "Denied" };
    case "in-review":
      return { intent: "info" as const, label: "In review" };
    case "submitted":
      return { intent: "info" as const, label: "Submitted" };
    case "not-submitted":
      return { intent: "default" as const, label: "Not submitted" };
    case "approved":
      return { intent: "success" as const, label: "Approved" };
    default:
      return { intent: "default" as const, label: status };
  }
};

// Get sidebar action configuration based on claim status
const getSidebarActions = (claim: Claim): SidebarActionConfig => {
  const baseDeleteAction = {
    label: "Delete claim",
    intent: "ghost" as const,
    icon: <Trash2 className="h-4 w-4 mr-2" />,
    onClick: () => console.log("Delete claim:", claim.id),
    className: "text-destructive hover:text-destructive hover:bg-destructive/10",
  };

  switch (claim.status) {
    case "not-submitted":
      return {
        leftActions: [baseDeleteAction],
        rightActions: [
          {
            label: "Upload documentation",
            intent: "outline",
            onClick: () => console.log("Upload documentation for claim:", claim.id),
          },
          {
            label: "Submit",
            intent: "primary",
            icon: <Send className="h-4 w-4 mr-2" />,
            onClick: () => console.log("Submit claim:", claim.id),
          },
        ],
      };

    case "submitted":
    case "in-review": // Same as submitted
      return {
        leftActions: [
          {
            label: "Cancel claim",
            intent: "outline",
            onClick: () => console.log("Cancel claim:", claim.id),
            className: "text-primary",
          },
        ],
        rightActions: [
          {
            label: "Upload documentation",
            intent: "outline",
            onClick: () => console.log("Upload documentation for claim:", claim.id),
          },
        ],
      };

    case "document-needed":
    case "denied":
    case "approved":
      return {
        leftActions: [
          {
            label: "Cancel claim",
            intent: "outline",
            onClick: () => console.log("Cancel claim:", claim.id),
            className: "text-primary",
          },
        ],
        rightActions: [
          {
            label: "Upload documentation",
            intent: "outline",
            onClick: () => console.log("Upload documentation for claim:", claim.id),
          },
        ],
      };

    default:
      return {
        leftActions: [baseDeleteAction],
        rightActions: [
          {
            label: "Upload documentation",
            intent: "outline",
            onClick: () => console.log("Upload documentation for claim:", claim.id),
          },
        ],
      };
  }
};

/**
 * Claim Detail Sheet Component
 * 
 * Slide-out panel from the right displaying detailed claim information.
 * Follows the Figma design with:
 * - Header with title and close button
 * - Claim ID card with badges
 * - Navigation tabs (Details, Timeline, Letters)
 * - Status details section
 * - Claim information section
 * - Uploaded documentation section
 * - Action buttons at the bottom
 */
export function ClaimDetailSheet({
  open,
  onOpenChange,
  claim,
}: ClaimDetailSheetProps) {
  const [activeTab, setActiveTab] = useState("details");

  if (!claim) {
    return null;
  }

  const statusBadge = getStatusBadge(claim.status);
  const sidebarActions = getSidebarActions(claim);

  return (
    <WexSheet open={open} onOpenChange={onOpenChange}>
      <WexSheet.Content side="right" className="w-[480px] max-w-[90vw] p-0 flex flex-col h-full">
        <WexScrollArea className="flex-1 min-h-0">
          <div className="p-6 space-y-6">
            {/* Header */}
            <WexSheet.Header className="space-y-1">
              <WexSheet.Title className="text-[30px] font-bold leading-[40px] tracking-[-0.63px] text-foreground">
                Claim details
              </WexSheet.Title>
            </WexSheet.Header>

            {/* Claim ID Card Section */}
            <div className="bg-white border border-[var(--slate-25,#d1d6d8)] rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">Claim ID</p>
                  <p className="text-sm font-medium text-foreground break-words">
                    {claim.claimId || `CLM-${claim.id.padStart(12, "0")}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
                  {claim.isRecurring && (
                    <WexBadge intent="info" size="md" className="rounded-md px-2 py-1 whitespace-nowrap">
                      <Calendar className="h-3 w-3 mr-1" />
                      Recurring
                    </WexBadge>
                  )}
                  <WexBadge intent={statusBadge.intent} size="md" className="rounded-md px-2 py-1 whitespace-nowrap">
                    {statusBadge.label}
                  </WexBadge>
                </div>
              </div>
              <WexSeparator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date of service</p>
                  <p className="text-sm text-foreground">{claim.dateOfService}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Amount</p>
                  <p className="text-sm font-medium text-foreground">{claim.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Recipient</p>
                  <p className="text-sm text-foreground">{claim.recipient}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Provider</p>
                  <p className="text-sm text-foreground">{claim.providerService}</p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <WexTabs value={activeTab} onValueChange={setActiveTab}>
              <WexTabs.List className="w-full">
                <WexTabs.Trigger value="details">Details</WexTabs.Trigger>
                <WexTabs.Trigger value="timeline">Timeline</WexTabs.Trigger>
                <WexTabs.Trigger value="letters">Letters</WexTabs.Trigger>
              </WexTabs.List>

              {/* Details Tab Content */}
              <WexTabs.Content value="details" className="space-y-6 mt-6">
                {/* Status Details Section */}
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-foreground">Status details</h3>
                  {claim.statusDate && (
                    <p className="text-sm text-muted-foreground">{claim.statusDate}</p>
                  )}
                  {claim.statusMessage && (
                    <p className="text-sm text-foreground">{claim.statusMessage}</p>
                  )}
                  {!claim.statusMessage && (
                    <p className="text-sm text-foreground">
                      {claim.status === "not-submitted"
                        ? "You have successfully created the claim. Submit to get reimbursed."
                        : claim.status === "submitted"
                        ? "Your claims has been submitted and will be reviewed by a claim processor."
                        : `Claim status: ${statusBadge.label}`}
                    </p>
                  )}
                </div>

                <WexSeparator />

                {/* Claim Information Section */}
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-foreground">Claim information</h3>
                  <div className="space-y-0">
                    {claim.payFrom && (
                      <DataRow label="Pay from" value={claim.payFrom} />
                    )}
                    {claim.payTo && (
                      <div className="flex items-start justify-between py-3 border-b border-border">
                        <span className="text-sm text-muted-foreground">Pay to</span>
                        <div className="text-sm text-foreground text-right">
                          <p>{claim.payTo.recipient}</p>
                          <p className="text-muted-foreground whitespace-pre-line">{claim.payTo.address}</p>
                        </div>
                      </div>
                    )}
                    <DataRow label="Recipient" value={claim.recipient} />
                    <DataRow label="Date of service" value={claim.dateOfService} />
                    {claim.categoryType && (
                      <DataRow label="Category & type" value={claim.categoryType} />
                    )}
                    <DataRow label="Provider" value={claim.providerService} />
                    <DataRow label="Amount" value={claim.amount} />
                  </div>
                </div>

                <WexSeparator />

                {/* Uploaded Documentation Section */}
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-foreground">
                    Uploaded documentation
                  </h3>
                  {claim.hasDocuments && claim.documents && claim.documents.length > 0 ? (
                    <div className="space-y-2">
                      {claim.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 border border-border rounded-md"
                        >
                          <span className="text-sm text-foreground">{doc.name}</span>
                          {doc.url && (
                            <WexButton variant="ghost" size="sm" asChild>
                              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                View
                              </a>
                            </WexButton>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No document uploaded</p>
                  )}
                </div>
              </WexTabs.Content>

              {/* Timeline Tab Content */}
              <WexTabs.Content value="timeline" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-foreground">Timeline</h3>
                  {claim.timeline && claim.timeline.length > 0 ? (
                    <div className="space-y-4">
                      {claim.timeline.map((event, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground mb-1">
                              {event.date}
                            </p>
                            <p className="text-sm text-foreground mb-1">
                              {event.event}
                            </p>
                            {event.description && (
                              <p className="text-sm text-muted-foreground">
                                {event.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {claim.statusDate || claim.dateSubmitted}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Claim {claim.status === "not-submitted" ? "created" : "status updated"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </WexTabs.Content>

              {/* Letters Tab Content */}
              <WexTabs.Content value="letters" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-foreground">Letters</h3>
                  {claim.letters && claim.letters.length > 0 ? (
                    <div className="space-y-0">
                      {claim.letters.map((letter, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {letter.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {letter.date}
                            </p>
                          </div>
                          {letter.url && (
                            <WexButton intent="primary" variant="link" size="sm" asChild>
                              <a href={letter.url} target="_blank" rel="noopener noreferrer">
                                View
                              </a>
                            </WexButton>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No letters available for this claim.
                    </p>
                  )}
                </div>
              </WexTabs.Content>
            </WexTabs>
          </div>
        </WexScrollArea>

        {/* Action Buttons Footer - Fixed at bottom */}
        <div className="flex items-center justify-between gap-4 p-6 pt-4 border-t border-border flex-shrink-0 bg-wex-sheet-bg">
          {/* Left Actions */}
          <div className="flex items-center gap-2">
            {sidebarActions.leftActions.map((action, index) => (
              <WexButton
                key={index}
                intent="primary"
                variant="outline"
                size="md"
                className={cn("text-primary border-primary hover:bg-primary/10 active:bg-primary/20", action.className)}
                onClick={action.onClick}
              >
                {action.icon}
                {action.label}
              </WexButton>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {sidebarActions.rightActions.map((action, index) => (
              <WexButton
                key={index}
                intent="primary"
                variant="outline"
                size="md"
                onClick={action.onClick}
              >
                {action.icon}
                {action.label}
              </WexButton>
            ))}
          </div>
        </div>
      </WexSheet.Content>
    </WexSheet>
  );
}

/**
 * Data Row Component - Label/Value pair with bottom border
 */
function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground text-right">{value}</span>
    </div>
  );
}

