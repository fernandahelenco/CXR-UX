import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WexButton } from "@/components/wex/wex-button";
import { ConsumerFooter } from "./Footer";
import { WexCard } from "@/components/wex/wex-card";
import { WexTable } from "@/components/wex/wex-table";
import { WexBadge } from "@/components/wex/wex-badge";
import { WexPagination } from "@/components/wex/wex-pagination";
import { WexSelect } from "@/components/wex/wex-select";
import { ConsumerNavigation } from "./ConsumerNavigation";
import { ClaimDetailSheet } from "./ClaimDetailSheet";
import {
  DollarSign,
  Inbox,
  Receipt,
  RefreshCw,
  ArrowUpDown,
  CreditCard,
  Wallet,
} from "lucide-react";

// TypeScript interfaces for Claim data
interface Claim {
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

interface SummaryStats {
  totalReimbursed: string;
  totalNotSubmitted: string;
  totalClaims: number;
}

// Mock data for summary statistics
const summaryStats: SummaryStats = {
  totalReimbursed: "$5,300.00",
  totalNotSubmitted: "$2,150.00",
  totalClaims: 200,
};

// Mock data for Action Required claims
const actionRequiredClaims: Claim[] = [
  {
    id: "1",
    dateSubmitted: "6/12/2025",
    status: "document-needed",
    providerService: "Dr. John Doe",
    dateOfService: "6/12/2025",
    recipient: "Crystal Kant",
    amount: "$150.00",
    claimId: "456789132541224",
    payFrom: "Medical FSA",
    payTo: {
      recipient: "me (check)",
      address: "123 elmo st.\nsesame home, ID, 11111",
    },
    categoryType: "Medical - Office visit",
    statusMessage: "Receipt is missing date of service (DOS). Please provide documentation with the required information.",
    statusDate: "6/24/2025",
    isRecurring: false,
    hasDocuments: true,
    documents: [{ name: "doc_01.jpg - 3MB" }],
    timeline: [
      {
        date: "6/9/2025",
        event: "Claim created (not submitted)",
      },
      {
        date: "6/12/2025",
        event: "Claim submitted",
      },
      {
        date: "6/24/2025",
        event: "Additional documentation needed",
        description: "Document does not contain Date of Service (DOS). The DOS is the date the service was provided, not the date you paid. Information must be in the document.",
      },
    ],
    letters: [
      {
        title: "Submit letter",
        date: "6/9/2025",
        url: "#",
      },
      {
        title: "Document needed letter",
        date: "6/12/2025",
        url: "#",
      },
    ],
  },
  {
    id: "2",
    dateSubmitted: "5/10/2025",
    status: "document-needed",
    providerService: "Pharmacy",
    dateOfService: "6/10/2025",
    recipient: "Crystal Kant",
    amount: "$150.00",
    claimId: "456789132541225",
    payFrom: "Medical FSA",
    payTo: {
      recipient: "me (check)",
      address: "123 elmo st.\nsesame home, ID, 11111",
    },
    categoryType: "Medical - Prescription",
    statusMessage: "Please upload receipt for this claim.",
    statusDate: "5/8/2025",
    isRecurring: true,
    hasDocuments: false,
  },
  {
    id: "3",
    dateSubmitted: "5/21/2025",
    status: "denied",
    providerService: "Pharmacy",
    dateOfService: "5/21/2025",
    recipient: "Crystal Kant",
    amount: "$150.00",
    claimId: "456789132541226",
    payFrom: "Medical FSA",
    payTo: {
      recipient: "me (check)",
      address: "123 elmo st.\nsesame home, ID, 11111",
    },
    categoryType: "Medical - Prescription",
    statusMessage: "This claim was denied. Please review the reason.",
    statusDate: "5/20/2025",
    isRecurring: false,
    hasDocuments: true,
    documents: [{ name: "receipt.pdf" }],
  },
  {
    id: "4",
    dateSubmitted: "5/1/2025",
    status: "denied",
    providerService: "Dr. John Doe",
    dateOfService: "5/1/2025",
    recipient: "Crystal Kant",
    amount: "$150.00",
    claimId: "456789132541227",
    payFrom: "Medical FSA",
    payTo: {
      recipient: "me (check)",
      address: "123 elmo st.\nsesame home, ID, 11111",
    },
    categoryType: "Medical - Office visit",
    statusMessage: "This claim was denied due to insufficient documentation.",
    statusDate: "4/30/2025",
    isRecurring: false,
    hasDocuments: false,
  },
];

// Mock data for all Claims
const allClaims: Claim[] = [
  {
    id: "5",
    dateSubmitted: "4/30/2025",
    status: "in-review",
    providerService: "Pharmacy",
    dateOfService: "4/30/2025",
    recipient: "Crystal Kant",
    amount: "$150.00",
    claimId: "456789132541229",
    payFrom: "Medical FSA",
    payTo: {
      recipient: "me (check)",
      address: "123 elmo st.\nsesame home, ID, 11111",
    },
    categoryType: "Medical - Prescription",
    statusMessage: "Your claim is currently under review.",
    statusDate: "4/30/2025",
    isRecurring: false,
    hasDocuments: true,
    documents: [{ name: "receipt.pdf" }],
  },
  {
    id: "6",
    dateSubmitted: "4/28/2025",
    status: "in-review",
    providerService: "Dr. Jane Dan",
    dateOfService: "4/28/2025",
    recipient: "Crystal Kant",
    amount: "$150.00",
    hasRefresh: true,
    claimId: "456789132541230",
    payFrom: "Medical FSA",
    payTo: {
      recipient: "me (check)",
      address: "123 elmo st.\nsesame home, ID, 11111",
    },
    categoryType: "Medical - Office visit",
    statusMessage: "Your claim is currently under review.",
    statusDate: "4/28/2025",
    isRecurring: true,
    hasDocuments: true,
    documents: [{ name: "invoice.pdf" }],
  },
  {
    id: "7",
    dateSubmitted: "4/18/2025",
    status: "in-review",
    providerService: "Pharmacy",
    dateOfService: "4/18/2025",
    recipient: "Crystal Kant",
    amount: "$150.00",
    claimId: "456789132541231",
    payFrom: "Medical FSA",
    payTo: {
      recipient: "me (check)",
      address: "123 elmo st.\nsesame home, ID, 11111",
    },
    categoryType: "Medical - Prescription",
    statusMessage: "Your claim is currently under review.",
    statusDate: "4/18/2025",
    isRecurring: false,
    hasDocuments: false,
  },
  {
    id: "8",
    dateSubmitted: "3/22/2025",
    status: "submitted",
    providerService: "Dr. John Doe",
    dateOfService: "3/22/2025",
    recipient: "Crystal Kant",
    amount: "$150.00",
    claimId: "456789132541232",
    payFrom: "Medical FSA",
    payTo: {
      recipient: "me (check)",
      address: "123 elmo st.\nsesame home, ID, 11111",
    },
    categoryType: "Medical - Office visit",
    statusMessage: "Your claim has been submitted successfully.",
    statusDate: "3/22/2025",
    isRecurring: false,
    hasDocuments: true,
    documents: [{ name: "receipt.pdf" }],
  },
  {
    id: "9",
    dateSubmitted: "-",
    status: "not-submitted",
    providerService: "Dr. John Doe",
    dateOfService: "3/8/2025",
    recipient: "Crystal Kant",
    amount: "$150.00",
    claimId: "456789132541228",
    payFrom: "Medical FSA",
    payTo: {
      recipient: "me (check)",
      address: "123 elmo st.\nsesame home, ID, 11111",
    },
    categoryType: "Medical - Office visit",
    statusMessage: "You have successfully created the claim. Submit to get reimbursed.",
    statusDate: "3/8/2025",
    isRecurring: false,
    hasDocuments: false,
  },
  {
    id: "10",
    dateSubmitted: "2/14/2025",
    status: "approved",
    providerService: "Dr. Jane Dan",
    dateOfService: "2/14/2025",
    recipient: "Crystal Kant",
    amount: "$150.00",
    hasRefresh: true,
    claimId: "456789132541233",
    payFrom: "Medical FSA",
    payTo: {
      recipient: "me (check)",
      address: "123 elmo st.\nsesame home, ID, 11111",
    },
    categoryType: "Medical - Office visit",
    statusMessage: "Your claim has been approved and payment is being processed.",
    statusDate: "2/15/2025",
    isRecurring: false,
    hasDocuments: true,
    documents: [{ name: "receipt.pdf" }, { name: "invoice.pdf" }],
  },
  {
    id: "11",
    dateSubmitted: "2/14/2025",
    status: "approved",
    providerService: "Dr. Jane Dan",
    dateOfService: "2/14/2025",
    recipient: "Crystal Kant",
    amount: "$150.00",
  },
  {
    id: "12",
    dateSubmitted: "2/14/2025",
    status: "approved",
    providerService: "Dr. Jane Dan",
    dateOfService: "2/14/2025",
    recipient: "Crystal Kant",
    amount: "$150.00",
  },
  {
    id: "13",
    dateSubmitted: "2/14/2025",
    status: "approved",
    providerService: "Dr. Jane Dan",
    dateOfService: "2/14/2025",
    recipient: "Crystal Kant",
    amount: "$150.00",
  },
  {
    id: "14",
    dateSubmitted: "2/14/2025",
    status: "approved",
    providerService: "Dr. Jane Dan",
    dateOfService: "2/14/2025",
    recipient: "Crystal Kant",
    amount: "$150.00",
  },
];

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
      return { intent: "info" as const, label: "Submitted" }; // Using info as closest match for purple
    case "not-submitted":
      return { intent: "default" as const, label: "Not submitted" };
    case "approved":
      return { intent: "success" as const, label: "Approved" };
    default:
      return { intent: "default" as const, label: status };
  }
};

export default function Claims() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleRowClick = (claim: Claim) => {
    setSelectedClaim(claim);
    setIsSheetOpen(true);
  };

  // Calculate pagination
  const totalPages = Math.ceil(allClaims.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedClaims = allClaims.slice(startIndex, endIndex);

  const handleSort = () => {
    if (sortDirection === null) {
      setSortDirection("asc");
    } else if (sortDirection === "asc") {
      setSortDirection("desc");
    } else {
      setSortDirection(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1FAFE]">
      <ConsumerNavigation />

      {/* Main Content */}
      <div className="mx-auto max-w-[1440px] px-8 py-8">
        <div className="mx-auto max-w-[1376px]">
          {/* Page Header */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-[30px] font-bold leading-[40px] tracking-[-0.63px] text-foreground">
              Claims
            </h1>
            <div className="flex gap-4">
              <WexButton intent="primary" variant="outline" className="border-primary text-primary">
                <CreditCard className="h-4 w-4" />
                Pay provider
              </WexButton>
              <WexButton intent="primary" onClick={() => navigate("/reimburse")}>
                <Wallet className="h-4 w-4" />
                Reimburse myself
              </WexButton>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="mb-6 flex flex-col lg:flex-row gap-6">
            {/* Total Reimbursed */}
            <WexCard className="flex-1">
              <WexCard.Content className="p-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-[var(--surface-success-default,#e8f5f4)] rounded-full p-3 shrink-0">
                    <DollarSign className="h-5 w-5 text-[var(--utility-success-80,#003f38)]" />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <p className="text-sm font-medium text-foreground tracking-[-0.084px]">
                      Total reimbursed
                    </p>
                    <p className="text-[20px] font-semibold leading-[32px] tracking-[-0.34px] text-foreground">
                      {summaryStats.totalReimbursed}
                    </p>
                  </div>
                </div>
              </WexCard.Content>
            </WexCard>

            {/* Total Not Submitted */}
            <WexCard className="flex-1">
              <WexCard.Content className="p-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-[var(--slate-20,#e4e6e9)] rounded-full p-3 shrink-0">
                    <Inbox className="h-5 w-5 text-[var(--slate-90,#16202a)]" />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <p className="text-sm font-medium text-foreground tracking-[-0.084px]">
                      Total not submitted
                    </p>
                    <p className="text-[20px] font-semibold leading-[32px] tracking-[-0.34px] text-foreground">
                      {summaryStats.totalNotSubmitted}
                    </p>
                  </div>
                </div>
              </WexCard.Content>
            </WexCard>

            {/* Total Claims */}
            <WexCard className="flex-1">
              <WexCard.Content className="p-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-[var(--utility-info-10,#d4effc)] rounded-full p-3 shrink-0">
                    <Receipt className="h-5 w-5 text-[var(--sky-60,#00437c)]" />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <p className="text-sm font-medium text-foreground tracking-[-0.084px]">
                      Total claims
                    </p>
                    <p className="text-[20px] font-semibold leading-[32px] tracking-[-0.34px] text-foreground">
                      {summaryStats.totalClaims}
                    </p>
                  </div>
                </div>
              </WexCard.Content>
            </WexCard>
          </div>

          {/* Action Required Table */}
          <WexCard className="mb-6">
            <WexCard.Content className="p-6">
              <h2 className="text-[24px] font-semibold leading-[32px] tracking-[-0.456px] text-foreground mb-6">
                Action required
              </h2>
              <div className="overflow-x-auto">
                <WexTable>
                  <WexTable.Header>
                    <WexTable.Row className="bg-[var(--surface-read-only,#f7f7f7)] border-b border-[var(--border-disabled,#e4e6e9)]">
                      <WexTable.Head className="w-[168px] px-4 py-2 text-left">
                        <span className="text-sm font-semibold text-foreground">Date submitted</span>
                      </WexTable.Head>
                      <WexTable.Head className="w-[184px] px-4 py-2 text-left">
                        <button
                          onClick={handleSort}
                          className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
                        >
                          Status
                          {sortDirection === "asc" && <ArrowUpDown className="h-3.5 w-3.5" />}
                        </button>
                      </WexTable.Head>
                      <WexTable.Head className="flex-1 px-4 py-2 text-left">
                        <span className="text-sm font-semibold text-foreground">Provider/Service</span>
                      </WexTable.Head>
                      <WexTable.Head className="w-[168px] px-4 py-2 text-left">
                        <span className="text-sm font-semibold text-foreground">Date of service</span>
                      </WexTable.Head>
                      <WexTable.Head className="flex-1 px-4 py-2 text-left">
                        <span className="text-sm font-semibold text-foreground">Recipient</span>
                      </WexTable.Head>
                      <WexTable.Head className="w-[128px] px-4 py-2 text-right">
                        <span className="text-sm font-semibold text-foreground">Amount</span>
                      </WexTable.Head>
                    </WexTable.Row>
                  </WexTable.Header>
                  <WexTable.Body>
                    {actionRequiredClaims.map((claim) => {
                      const badge = getStatusBadge(claim.status);
                      return (
                        <WexTable.Row
                          key={claim.id}
                          className="border-b border-[var(--border-disabled,#e4e6e9)] cursor-pointer hover:bg-muted/50"
                          onClick={() => handleRowClick(claim)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleRowClick(claim);
                            }
                          }}
                        >
                          <WexTable.Cell className="px-4 py-3 text-sm tracking-[-0.084px] text-foreground">
                            {claim.dateSubmitted}
                          </WexTable.Cell>
                          <WexTable.Cell className="px-4 py-3">
                            <WexBadge intent={badge.intent} size="md" className="rounded-md px-2 py-1 text-xs font-medium">
                              {badge.label}
                            </WexBadge>
                          </WexTable.Cell>
                          <WexTable.Cell className="px-4 py-3 text-sm tracking-[-0.084px] text-foreground">
                            {claim.providerService}
                          </WexTable.Cell>
                          <WexTable.Cell className="px-4 py-3 text-sm tracking-[-0.084px] text-foreground">
                            {claim.dateOfService}
                          </WexTable.Cell>
                          <WexTable.Cell className="px-4 py-3 text-sm tracking-[-0.084px] text-foreground">
                            {claim.recipient}
                          </WexTable.Cell>
                          <WexTable.Cell className="px-4 py-3 text-sm tracking-[-0.084px] text-foreground text-right">
                            {claim.amount}
                          </WexTable.Cell>
                        </WexTable.Row>
                      );
                    })}
                  </WexTable.Body>
                </WexTable>
              </div>
            </WexCard.Content>
          </WexCard>

          {/* Claims Table */}
          <WexCard>
            <WexCard.Content className="p-6">
              <h2 className="text-[24px] font-semibold leading-[32px] tracking-[-0.456px] text-foreground mb-6">
                Claims
              </h2>
              <div className="overflow-x-auto">
                <WexTable>
                  <WexTable.Header>
                    <WexTable.Row className="bg-[var(--surface-read-only,#f7f7f7)] border-b border-[var(--border-disabled,#e4e6e9)]">
                      <WexTable.Head className="w-[168px] px-4 py-2 text-left">
                        <span className="text-sm font-semibold text-foreground">Date submitted</span>
                      </WexTable.Head>
                      <WexTable.Head className="w-[184px] px-4 py-2 text-left">
                        <button
                          onClick={handleSort}
                          className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
                        >
                          Status
                          {sortDirection === "asc" && <ArrowUpDown className="h-3.5 w-3.5" />}
                        </button>
                      </WexTable.Head>
                      <WexTable.Head className="flex-1 px-4 py-2 text-left">
                        <span className="text-sm font-semibold text-foreground">Provider/Service</span>
                      </WexTable.Head>
                      <WexTable.Head className="w-[168px] px-4 py-2 text-left">
                        <span className="text-sm font-semibold text-foreground">Date of service</span>
                      </WexTable.Head>
                      <WexTable.Head className="flex-1 px-4 py-2 text-left">
                        <span className="text-sm font-semibold text-foreground">Recipient</span>
                      </WexTable.Head>
                      <WexTable.Head className="w-[128px] px-4 py-2 text-right">
                        <span className="text-sm font-semibold text-foreground">Amount</span>
                      </WexTable.Head>
                    </WexTable.Row>
                  </WexTable.Header>
                  <WexTable.Body>
                    {paginatedClaims.map((claim) => {
                      const badge = getStatusBadge(claim.status);
                      return (
                        <WexTable.Row
                          key={claim.id}
                          className="border-b border-[var(--border-disabled,#e4e6e9)] relative cursor-pointer hover:bg-muted/50"
                          onClick={() => handleRowClick(claim)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleRowClick(claim);
                            }
                          }}
                        >
                          <WexTable.Cell className="px-4 py-3 text-sm tracking-[-0.084px] text-foreground">
                            {claim.dateSubmitted}
                          </WexTable.Cell>
                          <WexTable.Cell className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <WexBadge intent={badge.intent} size="md" className="rounded-md px-2 py-1 text-xs font-medium">
                                {badge.label}
                              </WexBadge>
                              {claim.hasRefresh && (
                                <WexButton
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 bg-[var(--utility-info-10,#d4effc)] rounded-full hover:bg-[var(--utility-info-20,#a9dff9)]"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle refresh action
                                    console.log("Refresh claim:", claim.id);
                                  }}
                                >
                                  <RefreshCw className="h-3 w-3 text-[var(--text-utility-info-dark,#0058a3)]" />
                                </WexButton>
                              )}
                            </div>
                          </WexTable.Cell>
                          <WexTable.Cell className="px-4 py-3 text-sm tracking-[-0.084px] text-foreground">
                            {claim.providerService}
                          </WexTable.Cell>
                          <WexTable.Cell className="px-4 py-3 text-sm tracking-[-0.084px] text-foreground">
                            {claim.dateOfService}
                          </WexTable.Cell>
                          <WexTable.Cell className="px-4 py-3 text-sm tracking-[-0.084px] text-foreground">
                            {claim.recipient}
                          </WexTable.Cell>
                          <WexTable.Cell className="px-4 py-3 text-sm tracking-[-0.084px] text-foreground text-right">
                            {claim.amount}
                          </WexTable.Cell>
                        </WexTable.Row>
                      );
                    })}
                  </WexTable.Body>
                </WexTable>
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-center gap-3 border-t border-[var(--border-disabled,#e4e6e9)] pt-4">
                <WexPagination>
                  <WexPagination.Content>
                    <WexPagination.Item>
                      <WexPagination.First
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(1);
                        }}
                      />
                    </WexPagination.Item>
                    <WexPagination.Item>
                      <WexPagination.Previous
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                      />
                    </WexPagination.Item>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <WexPagination.Item key={pageNum}>
                          <WexPagination.Link
                            href="#"
                            isActive={currentPage === pageNum}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(pageNum);
                            }}
                          >
                            {pageNum}
                          </WexPagination.Link>
                        </WexPagination.Item>
                      );
                    })}
                    <WexPagination.Item>
                      <WexPagination.Next
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                      />
                    </WexPagination.Item>
                    <WexPagination.Item>
                      <WexPagination.Last
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(totalPages);
                        }}
                      />
                    </WexPagination.Item>
                  </WexPagination.Content>
                </WexPagination>
                <div className="ml-4">
                  <WexSelect
                    value={rowsPerPage.toString()}
                    onValueChange={(value) => {
                      setRowsPerPage(Number(value));
                      setCurrentPage(1);
                    }}
                  >
                    <WexSelect.Trigger className="h-[35px] w-[60px]">
                      <WexSelect.Value />
                    </WexSelect.Trigger>
                    <WexSelect.Content>
                      <WexSelect.Item value="10">10</WexSelect.Item>
                      <WexSelect.Item value="20">20</WexSelect.Item>
                      <WexSelect.Item value="50">50</WexSelect.Item>
                    </WexSelect.Content>
                  </WexSelect>
                </div>
              </div>
            </WexCard.Content>
          </WexCard>
        </div>
      </div>

      <ConsumerFooter />

      {/* Claim Detail Sheet */}
      <ClaimDetailSheet
        open={isSheetOpen}
        onOpenChange={(open) => {
          setIsSheetOpen(open);
          if (!open) {
            setSelectedClaim(null);
          }
        }}
        claim={selectedClaim}
      />
    </div>
  );
}

