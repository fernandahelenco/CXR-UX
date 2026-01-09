import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WexButton } from "@/components/wex/wex-button";
import { WexCard } from "@/components/wex/wex-card";
import { WexBadge } from "@/components/wex/wex-badge";
import { WexCheckbox } from "@/components/wex/wex-checkbox";
import { WexSelect } from "@/components/wex/wex-select";
import { WexSeparator } from "@/components/wex/wex-separator";
import { WexDropdownMenu } from "@/components/wex/wex-dropdown-menu";
import { WexTable } from "@/components/wex/wex-table";
import { WexPagination } from "@/components/wex/wex-pagination";
import { WexDialog } from "@/components/wex/wex-dialog";
import { WexEmpty } from "@/components/wex/wex-empty";
import { WexSidebar } from "@/components/wex/wex-sidebar";
import { ConsumerNavigation } from "./ConsumerNavigation";
import { ConsumerFooter } from "./Footer";
import { cn } from "@/lib/utils";
import emptyStateIllustration from "./img/empty-state-illustration.svg";
import {
  Star,
  Paperclip,
  MoreVertical,
  FileText,
  Settings,
  Inbox,
  Download,
  Trash2,
} from "lucide-react";
import type { Message } from "./messageCenterUtils";
import {
  getInitialMessages as getInitialMessagesUtil,
  calculateUnreadCount,
  updateUnreadCount,
  saveReadStatus,
  saveArchiveStatus,
} from "./messageCenterUtils";

const getInitialMessages = (): Message[] => {
  const initialMessages: Message[] = [
    {
      id: "1",
      subject: "HSA Contribution Maximum Warning",
      hasAttachment: true,
      category: "Contributions & Investments",
      categoryColor: "#ffbca7",
      categoryTextColor: "#66230e",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your HSA contribution is approaching the annual maximum limit. Please review your contribution settings.",
      attachmentFileName: "HSA_Contribution_Warning_11_23.pdf",
    },
    {
      id: "2",
      subject: "HSA Contribution Notification",
      hasAttachment: true,
      category: "Contributions & Investments",
      categoryColor: "#ffbca7",
      categoryTextColor: "#66230e",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "A new contribution has been processed to your HSA account.",
      attachmentFileName: "Contribution_Notification_11_23.pdf",
    },
    {
      id: "3",
      subject: "HSA Account Summary (11/01/2025-11/30/2025)",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryColor: "#fff7b1",
      categoryTextColor: "#665e18",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your monthly account summary is now available.",
      attachmentFileName: "Account_Summary_11_2025.pdf",
    },
    {
      id: "4",
      subject: "Tax Form Available: 1099-SA",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryColor: "#fff7b1",
      categoryTextColor: "#665e18",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your 1099-SA tax form is now available for download.",
      attachmentFileName: "1099-SA_2025.pdf",
    },
    {
      id: "5",
      subject: "HSA Withdrawal Notification",
      hasAttachment: false,
      category: "Distributions",
      categoryColor: "#9ddcfb",
      categoryTextColor: "#044362",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "A withdrawal has been processed from your HSA account. The funds have been transferred to your linked bank account.",
    },
    {
      id: "6",
      subject: "HSA Payment Issued",
      hasAttachment: false,
      category: "Distributions",
      categoryColor: "#9ddcfb",
      categoryTextColor: "#044362",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your HSA payment has been issued successfully. You should receive the payment within 3-5 business days.",
    },
    {
      id: "7",
      subject: "Purchase Alert",
      hasAttachment: true,
      category: "Cards & Security",
      categoryColor: "#e8a6cc",
      categoryTextColor: "#4f0d33",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "A purchase was made using your HSA card. Please review the transaction details.",
      attachmentFileName: "Purchase_Alert_11_23.pdf",
    },
    {
      id: "8",
      subject: "HSA Account Summary (10/01/2025-10/31/2025)",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryColor: "#fff7b1",
      categoryTextColor: "#665e18",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your monthly account summary is now available.",
      attachmentFileName: "Account_Summary_10_2025.pdf",
    },
    {
      id: "9",
      subject: "HSA Account Summary (09/01/2025-09/30/2025)",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryColor: "#fff7b1",
      categoryTextColor: "#665e18",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your monthly account summary is now available.",
      attachmentFileName: "Account_Summary_09_2025.pdf",
    },
    {
      id: "10",
      subject: "Password Successfully Changed",
      hasAttachment: false,
      category: "Cards & Security",
      categoryColor: "#e8a6cc",
      categoryTextColor: "#4f0d33",
      deliveryDate: "11/23/25 11:05AM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your password has been successfully changed. If you did not make this change, please contact support immediately.",
    },
    {
      id: "11",
      subject: "Monthly Investment Performance Report",
      hasAttachment: true,
      category: "Contributions & Investments",
      categoryColor: "#ffbca7",
      categoryTextColor: "#66230e",
      deliveryDate: "11/22/25 10:30AM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your monthly investment performance report is now available. Review your portfolio performance and allocations.",
      attachmentFileName: "Investment_Report_11_2025.pdf",
    },
    {
      id: "12",
      subject: "Account Statement Available",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryColor: "#fff7b1",
      categoryTextColor: "#665e18",
      deliveryDate: "11/22/25 09:15AM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your account statement for the previous month is now available for download.",
      attachmentFileName: "Statement_11_2025.pdf",
    },
    {
      id: "13",
      subject: "Withdrawal Processed Successfully",
      hasAttachment: false,
      category: "Distributions",
      categoryColor: "#9ddcfb",
      categoryTextColor: "#044362",
      deliveryDate: "11/21/25 03:45PM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your HSA withdrawal request has been processed. Funds will be available in your linked account within 2-3 business days.",
    },
    {
      id: "14",
      subject: "Card Transaction Notification",
      hasAttachment: false,
      category: "Cards & Security",
      categoryColor: "#e8a6cc",
      categoryTextColor: "#4f0d33",
      deliveryDate: "11/21/25 02:20PM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "A transaction was made using your HSA card. Please verify this transaction is authorized.",
    },
    {
      id: "15",
      subject: "Investment Allocation Update",
      hasAttachment: true,
      category: "Contributions & Investments",
      categoryColor: "#ffbca7",
      categoryTextColor: "#66230e",
      deliveryDate: "11/21/25 11:00AM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your investment allocation has been updated. Review the changes in your account.",
      attachmentFileName: "Allocation_Update_11_21.pdf",
    },
    {
      id: "16",
      subject: "HSA Account Summary (08/01/2025-08/31/2025)",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryColor: "#fff7b1",
      categoryTextColor: "#665e18",
      deliveryDate: "11/20/25 04:30PM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your monthly account summary is now available.",
      attachmentFileName: "Account_Summary_08_2025.pdf",
    },
    {
      id: "17",
      subject: "Payment Confirmation",
      hasAttachment: false,
      category: "Distributions",
      categoryColor: "#9ddcfb",
      categoryTextColor: "#044362",
      deliveryDate: "11/20/25 01:15PM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your HSA payment has been confirmed and processed. The payment will be sent to the specified recipient.",
    },
    {
      id: "18",
      subject: "Security Alert: New Login Detected",
      hasAttachment: false,
      category: "Cards & Security",
      categoryColor: "#e8a6cc",
      categoryTextColor: "#4f0d33",
      deliveryDate: "11/19/25 10:45AM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "A new login was detected from an unrecognized device. If this was not you, please secure your account immediately.",
    },
    {
      id: "19",
      subject: "Quarterly Investment Summary",
      hasAttachment: true,
      category: "Contributions & Investments",
      categoryColor: "#ffbca7",
      categoryTextColor: "#66230e",
      deliveryDate: "11/19/25 09:30AM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your quarterly investment summary is now available. Review your portfolio performance for Q3 2025.",
      attachmentFileName: "Q3_Investment_Summary_2025.pdf",
    },
    {
      id: "20",
      subject: "Tax Document: Form 1099-SA Available",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryColor: "#fff7b1",
      categoryTextColor: "#665e18",
      deliveryDate: "11/18/25 02:00PM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your 1099-SA tax form for the current tax year is now available for download.",
      attachmentFileName: "1099-SA_2025.pdf",
    },
    {
      id: "21",
      subject: "HSA Contribution Received",
      hasAttachment: false,
      category: "Contributions & Investments",
      categoryColor: "#ffbca7",
      categoryTextColor: "#66230e",
      deliveryDate: "11/18/25 11:20AM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "A new contribution has been received and deposited into your HSA account. The funds are now available for use.",
    },
    {
      id: "22",
      subject: "Account Summary (07/01/2025-07/31/2025)",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryColor: "#fff7b1",
      categoryTextColor: "#665e18",
      deliveryDate: "11/17/25 03:10PM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your monthly account summary is now available.",
      attachmentFileName: "Account_Summary_07_2025.pdf",
    },
    {
      id: "23",
      subject: "Withdrawal Request Approved",
      hasAttachment: false,
      category: "Distributions",
      categoryColor: "#9ddcfb",
      categoryTextColor: "#044362",
      deliveryDate: "11/17/25 12:45PM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your withdrawal request has been approved. The funds will be transferred to your linked bank account.",
    },
    {
      id: "24",
      subject: "Card Replacement Shipped",
      hasAttachment: false,
      category: "Cards & Security",
      categoryColor: "#e8a6cc",
      categoryTextColor: "#4f0d33",
      deliveryDate: "11/16/25 10:00AM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your replacement HSA card has been shipped. You should receive it within 7-10 business days.",
    },
    {
      id: "25",
      subject: "Investment Options Updated",
      hasAttachment: true,
      category: "Contributions & Investments",
      categoryColor: "#ffbca7",
      categoryTextColor: "#66230e",
      deliveryDate: "11/16/25 09:15AM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "New investment options have been added to your HSA account. Review the available options and update your allocations.",
      attachmentFileName: "Investment_Options_Update_11_16.pdf",
    },
    {
      id: "26",
      subject: "Monthly Statement Ready",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryColor: "#fff7b1",
      categoryTextColor: "#665e18",
      deliveryDate: "11/15/25 04:20PM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your monthly statement is now ready for review and download.",
      attachmentFileName: "Statement_11_15_2025.pdf",
    },
    {
      id: "27",
      subject: "HSA Payment Processed",
      hasAttachment: false,
      category: "Distributions",
      categoryColor: "#9ddcfb",
      categoryTextColor: "#044362",
      deliveryDate: "11/15/25 01:30PM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your HSA payment has been processed successfully. The payment will be sent to the healthcare provider.",
    },
    {
      id: "28",
      subject: "PIN Change Confirmation",
      hasAttachment: false,
      category: "Cards & Security",
      categoryColor: "#e8a6cc",
      categoryTextColor: "#4f0d33",
      deliveryDate: "11/14/25 11:45AM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your card PIN has been successfully changed. Please keep your new PIN secure and do not share it with anyone.",
    },
    {
      id: "29",
      subject: "Contribution Limit Reminder",
      hasAttachment: true,
      category: "Contributions & Investments",
      categoryColor: "#ffbca7",
      categoryTextColor: "#66230e",
      deliveryDate: "11/14/25 10:10AM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "You are approaching your annual HSA contribution limit. Please review your contribution amounts to avoid exceeding the limit.",
      attachmentFileName: "Contribution_Limit_Reminder_11_14.pdf",
    },
    {
      id: "30",
      subject: "Annual Tax Summary Available",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryColor: "#fff7b1",
      categoryTextColor: "#665e18",
      deliveryDate: "11/13/25 02:50PM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your annual tax summary for 2025 is now available. This document contains important information for your tax filing.",
      attachmentFileName: "Annual_Tax_Summary_2025.pdf",
    },
    {
      id: "31",
      subject: "Distribution Request Submitted",
      hasAttachment: false,
      category: "Distributions",
      categoryColor: "#9ddcfb",
      categoryTextColor: "#044362",
      deliveryDate: "11/13/25 12:00PM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your distribution request has been submitted and is being processed. You will receive a confirmation once it's complete.",
    },
    {
      id: "32",
      subject: "Fraud Alert: Suspicious Activity",
      hasAttachment: false,
      category: "Cards & Security",
      categoryColor: "#e8a6cc",
      categoryTextColor: "#4f0d33",
      deliveryDate: "11/12/25 03:30PM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "We detected suspicious activity on your account. Please verify your recent transactions and contact us if you notice any unauthorized activity.",
    },
    {
      id: "33",
      subject: "Investment Performance Update",
      hasAttachment: true,
      category: "Contributions & Investments",
      categoryColor: "#ffbca7",
      categoryTextColor: "#66230e",
      deliveryDate: "11/12/25 09:45AM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your investment performance has been updated. Review your portfolio gains and losses for the current period.",
      attachmentFileName: "Performance_Update_11_12.pdf",
    },
    {
      id: "34",
      subject: "Account Summary (06/01/2025-06/30/2025)",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryColor: "#fff7b1",
      categoryTextColor: "#665e18",
      deliveryDate: "11/11/25 01:20PM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your monthly account summary is now available.",
      attachmentFileName: "Account_Summary_06_2025.pdf",
    },
    {
      id: "35",
      subject: "Withdrawal Completed",
      hasAttachment: false,
      category: "Distributions",
      categoryColor: "#9ddcfb",
      categoryTextColor: "#044362",
      deliveryDate: "11/11/25 10:30AM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your withdrawal has been completed. The funds have been transferred to your linked account.",
    },
    {
      id: "36",
      subject: "Card Activation Required",
      hasAttachment: false,
      category: "Cards & Security",
      categoryColor: "#e8a6cc",
      categoryTextColor: "#4f0d33",
      deliveryDate: "11/10/25 02:15PM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your new HSA card requires activation. Please activate your card before first use to ensure it's ready for transactions.",
    },
    {
      id: "37",
      subject: "HSA Contribution Limit Reached",
      hasAttachment: true,
      category: "Contributions & Investments",
      categoryColor: "#ffbca7",
      categoryTextColor: "#66230e",
      deliveryDate: "11/10/25 11:00AM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "You have reached your annual HSA contribution limit. No further contributions will be accepted for this tax year.",
      attachmentFileName: "Contribution_Limit_Reached_11_10.pdf",
    },
    {
      id: "38",
      subject: "Tax Form 1099-SA Ready for Download",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryColor: "#fff7b1",
      categoryTextColor: "#665e18",
      deliveryDate: "11/09/25 03:45PM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your 1099-SA tax form is ready for download. This form is required for your tax filing.",
      attachmentFileName: "1099-SA_2025.pdf",
    },
    {
      id: "39",
      subject: "Payment Authorization Confirmed",
      hasAttachment: false,
      category: "Distributions",
      categoryColor: "#9ddcfb",
      categoryTextColor: "#044362",
      deliveryDate: "11/09/25 12:30PM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your payment authorization has been confirmed. The payment will be processed according to your instructions.",
    },
    {
      id: "40",
      subject: "Account Security Settings Updated",
      hasAttachment: false,
      category: "Cards & Security",
      categoryColor: "#e8a6cc",
      categoryTextColor: "#4f0d33",
      deliveryDate: "11/08/25 10:15AM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your account security settings have been updated. Review the changes to ensure they match your preferences.",
    },
    {
      id: "41",
      subject: "Investment Rebalancing Notice",
      hasAttachment: true,
      category: "Contributions & Investments",
      categoryColor: "#ffbca7",
      categoryTextColor: "#66230e",
      deliveryDate: "11/07/25 02:00PM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your investment portfolio has been automatically rebalanced to maintain your target allocation percentages.",
      attachmentFileName: "Rebalancing_Notice_11_07.pdf",
    },
    {
      id: "42",
      subject: "Account Summary (05/01/2025-05/31/2025)",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryColor: "#fff7b1",
      categoryTextColor: "#665e18",
      deliveryDate: "11/06/25 01:45PM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your monthly account summary is now available.",
      attachmentFileName: "Account_Summary_05_2025.pdf",
    },
    {
      id: "43",
      subject: "Distribution Processing",
      hasAttachment: false,
      category: "Distributions",
      categoryColor: "#9ddcfb",
      categoryTextColor: "#044362",
      deliveryDate: "11/05/25 11:20AM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your distribution request is currently being processed. You will receive a notification once it's complete.",
    },
    {
      id: "44",
      subject: "Two-Factor Authentication Enabled",
      hasAttachment: false,
      category: "Cards & Security",
      categoryColor: "#e8a6cc",
      categoryTextColor: "#4f0d33",
      deliveryDate: "11/04/25 03:00PM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Two-factor authentication has been enabled on your account for enhanced security.",
    },
    {
      id: "45",
      subject: "Contribution Schedule Updated",
      hasAttachment: true,
      category: "Contributions & Investments",
      categoryColor: "#ffbca7",
      categoryTextColor: "#66230e",
      deliveryDate: "11/03/25 10:30AM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your contribution schedule has been updated. Review the new schedule to ensure it meets your needs.",
      attachmentFileName: "Contribution_Schedule_Update_11_03.pdf",
    },
    {
      id: "46",
      subject: "Quarterly Statement Available",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryColor: "#fff7b1",
      categoryTextColor: "#665e18",
      deliveryDate: "11/02/25 09:15AM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your quarterly statement for Q3 2025 is now available for download.",
      attachmentFileName: "Q3_Statement_2025.pdf",
    },
    {
      id: "47",
      subject: "Payment Reversal Notice",
      hasAttachment: false,
      category: "Distributions",
      categoryColor: "#9ddcfb",
      categoryTextColor: "#044362",
      deliveryDate: "11/01/25 02:45PM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "A payment has been reversed and the funds have been returned to your HSA account.",
    },
    {
      id: "48",
      subject: "Card Expiration Reminder",
      hasAttachment: false,
      category: "Cards & Security",
      categoryColor: "#e8a6cc",
      categoryTextColor: "#4f0d33",
      deliveryDate: "10/31/25 01:00PM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "Your HSA card will expire soon. A replacement card will be automatically sent to your registered address.",
    },
    {
      id: "49",
      subject: "Investment Fee Schedule Update",
      hasAttachment: true,
      category: "Contributions & Investments",
      categoryColor: "#ffbca7",
      categoryTextColor: "#66230e",
      deliveryDate: "10/30/25 11:30AM",
      isStarred: false,
      isBold: false,
      isRead: false,
      isArchived: false,
      body: "The investment fee schedule has been updated. Review the new fee structure for your investment options.",
      attachmentFileName: "Fee_Schedule_Update_10_30.pdf",
    },
    {
      id: "50",
      subject: "Year-End Tax Preparation Guide",
      hasAttachment: true,
      category: "Statements & Tax Documents",
      categoryColor: "#fff7b1",
      categoryTextColor: "#665e18",
      deliveryDate: "10/29/25 10:00AM",
      isStarred: false,
      isBold: true,
      isRead: false,
      isArchived: false,
      body: "Your year-end tax preparation guide is now available. This guide will help you prepare for tax filing season.",
      attachmentFileName: "Tax_Prep_Guide_2025.pdf",
    },
  ];

  return getInitialMessagesUtil(initialMessages);
};

export default function MessageCenter() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(() => {
    const initial = getInitialMessages();
    // Initialize unread count on mount
    const initialUnreadCount = calculateUnreadCount(initial);
    updateUnreadCount(initialUnreadCount);
    return initial;
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedMessageIds, setSelectedMessageIds] = useState<Set<string>>(new Set());

  const updateMessage = (id: string, updates: Partial<Message>) => {
    setMessages((prev) => {
      const updated = prev.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg));
      
      // Save read status to localStorage and update unread count
      if (updates.hasOwnProperty("isRead")) {
        saveReadStatus(id, updates.isRead as boolean);
        const newUnreadCount = calculateUnreadCount(updated);
        updateUnreadCount(newUnreadCount);
      }
      
      // Save archive status to localStorage and update unread count
      if (updates.hasOwnProperty("isArchived")) {
        saveArchiveStatus(id, updates.isArchived as boolean);
        const newUnreadCount = calculateUnreadCount(updated);
        updateUnreadCount(newUnreadCount);
      }
      
      return updated;
    });
    
    // Update selectedMessage if it's the message being updated
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
    if (!message.isRead) {
      updateMessage(message.id, { isRead: true });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  const handleToggleReadStatus = (message: Message, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    updateMessage(message.id, { isRead: !message.isRead });
  };

  const handleToggleStar = (message: Message, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    updateMessage(message.id, { isStarred: !message.isStarred });
  };

  const handleArchive = (message: Message, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    updateMessage(message.id, { isArchived: true });
  };

  const handleUnarchive = (message: Message, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    updateMessage(message.id, { isArchived: false });
  };

  const getEmptyStateText = (): string => {
    if (selectedCategory === null) {
      return "You don't have any messages yet";
    }
    if (selectedCategory === "archive") {
      return "You don't have any archived messages yet";
    }
    if (selectedCategory === "starred") {
      return "You don't have any starred messages yet";
    }
    if (selectedCategory === "unread") {
      return "You don't have any unread messages yet";
    }
    if (selectedCategory === "recently-viewed") {
      return "You don't have any recently viewed messages yet";
    }
    // Category filter
    return "You don't have any messages in this category yet";
  };

  const unreadCount = useMemo(() => {
    return messages.filter((message) => !message.isRead && !message.isArchived).length;
  }, [messages]);

  const recentlyViewedCount = useMemo(() => {
    return messages.filter((message) => message.isRead && !message.isArchived).length;
  }, [messages]);

  const filteredMessages = useMemo(() => {
    if (selectedCategory === null) {
      // All Messages: show only non-archived messages
      return messages.filter((message) => !message.isArchived);
    }
    if (selectedCategory === "archive") {
      // Archive view: show only archived messages
      return messages.filter((message) => message.isArchived === true);
    }
    if (selectedCategory === "starred") {
      // Starred: show only non-archived starred messages
      return messages.filter((message) => message.isStarred === true && !message.isArchived);
    }
    if (selectedCategory === "unread") {
      // Unread: show only non-archived unread messages
      return messages.filter((message) => message.isRead === false && !message.isArchived);
    }
    if (selectedCategory === "recently-viewed") {
      // Recently Viewed: show only non-archived read messages (previously opened)
      return messages.filter((message) => message.isRead === true && !message.isArchived);
    }
    // Category filter: show only non-archived messages in that category
    return messages.filter((message) => message.category === selectedCategory && !message.isArchived);
  }, [selectedCategory, messages]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMessages = filteredMessages.slice(startIndex, endIndex);

  // Reset to page 1 when filters or items per page change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, itemsPerPage]);

  const mobileFilterOptions = [
    { label: "All Messages", value: "all", section: "Activity" },
    { label: "Unread", value: "unread", section: "Activity" },
    { label: "Recently Viewed", value: "recently-viewed", section: "Activity" },
    { label: "Starred", value: "starred", section: "Activity" },
    { label: "Archive", value: "archive", section: "Manage" },
    { label: "Cards & Security", value: "Cards & Security", section: "Categories" },
    { label: "Investments", value: "Contributions & Investments", section: "Categories" },
    { label: "Distributions", value: "Distributions", section: "Categories" },
    { label: "Documents", value: "Statements & Tax Documents", section: "Categories" },
  ];

  const handleMobileSelect = (value: string) => {
    setSelectedCategory(value === "all" ? null : value);
  };

  return (
    <div className="min-h-screen bg-[#F1FAFE]">
      {/* Navigation Bar */}
      <ConsumerNavigation />

      {/* Main Content */}
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-[1376px]">
          {/* Page Header */}
          <div className="mb-6 space-y-3 md:mb-8">
            {/* Mobile: title + icon buttons right-aligned */}
            <div className="flex items-center justify-between md:hidden">
              <h1 className="text-2xl font-bold leading-[34px] tracking-[-0.63px] text-black">
                Message Center
              </h1>
              <div className="flex items-center gap-2">
                <WexButton
                  intent="primary"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-[#0058a3] text-[#0058a3]"
                >
                  <FileText className="h-4 w-4" />
                </WexButton>
                <WexButton
                  intent="primary"
                  size="icon"
                  className="h-10 w-10 bg-[#0058a3] text-white hover:bg-[#0058a3]/90"
                  onClick={() => navigate("/my-profile?subPage=communication")}
                >
                  <Settings className="h-4 w-4" />
                </WexButton>
              </div>
            </div>

            {/* Desktop: title + full buttons */}
            <div className="hidden items-center justify-between md:flex">
              <h1 className="text-2xl font-bold leading-[34px] tracking-[-0.63px] text-black md:text-[30px] md:leading-[40px]">
                Message Center
              </h1>
              <div className="flex w-full flex-wrap gap-3 md:w-auto md:flex-nowrap md:gap-4">
                <WexButton
                  intent="primary"
                  variant="outline"
                  className="flex items-center gap-2 border-[#0058a3] text-[#0058a3] md:h-[44px]"
                >
                  <FileText className="h-4 w-4" />
                  Account Documents
                </WexButton>
                <WexButton
                  intent="primary"
                  className="flex items-center gap-2 bg-[#0058a3] text-white hover:bg-[#0058a3]/90 md:h-[44px]"
                  onClick={() => navigate("/my-profile?subPage=communication")}
                >
                  <Settings className="h-4 w-4" />
                  Communication Preferences
                </WexButton>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="mb-4 md:hidden">
            <WexCard className="rounded-2xl">
              <WexCard.Content className="space-y-3 p-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-[0.24px] text-[#243746]">
                    Filter Messages
                  </p>
                  <WexSelect value={selectedCategory ?? "all"} onValueChange={handleMobileSelect}>
                    <WexSelect.Trigger className="h-[44px] w-full">
                      <WexSelect.Value placeholder="Choose filter" />
                    </WexSelect.Trigger>
                    <WexSelect.Content>
                      <WexSelect.Group>
                        <WexSelect.Label>Activity</WexSelect.Label>
                        {mobileFilterOptions
                          .filter((o) => o.section === "Activity")
                          .map((o) => (
                            <WexSelect.Item key={o.value} value={o.value}>
                              {o.label === "Unread" ? `Unread (${unreadCount})` : o.label}
                            </WexSelect.Item>
                          ))}
                      </WexSelect.Group>
                      <WexSelect.Separator />
                      <WexSelect.Group>
                        <WexSelect.Label>Categories</WexSelect.Label>
                        {mobileFilterOptions
                          .filter((o) => o.section === "Categories")
                          .map((o) => (
                            <WexSelect.Item key={o.value} value={o.value}>
                              {o.label}
                            </WexSelect.Item>
                          ))}
                      </WexSelect.Group>
                      <WexSelect.Separator />
                      <WexSelect.Group>
                        <WexSelect.Label>Manage</WexSelect.Label>
                        <WexSelect.Item value="archive">Archive</WexSelect.Item>
                      </WexSelect.Group>
                    </WexSelect.Content>
                  </WexSelect>
                </div>
              </WexCard.Content>
            </WexCard>
          </div>

          {/* Content Container */}
          <WexSidebar.Provider defaultOpen={true} className="h-full">
            <WexCard className="rounded-2xl overflow-hidden h-full w-full">
              <div className="flex h-full w-full">
                {/* Left Sidebar */}
                <WexSidebar
                  collapsible="none"
                  className="hidden md:flex w-[240px] border-r border-wex-card-border bg-wex-card-bg flex-col h-auto"
                >
                  <WexSidebar.Content className="flex-1 h-full px-2 py-4">
                    <WexSidebar.Group className="flex-1 h-full">
                      <WexSidebar.GroupContent className="flex-1 h-full">
                        <WexSidebar.Menu className="flex-1 h-full">
                          {/* Activity Section */}
                          <WexSidebar.GroupLabel className="px-3">
                            ACTIVITY
                          </WexSidebar.GroupLabel>
                          <WexSidebar.MenuItem>
                            <WexSidebar.MenuButton
                              isActive={selectedCategory === null}
                              onClick={() => setSelectedCategory(null)}
                              className="h-[31px] min-h-[31px] whitespace-normal px-3 py-[6px] data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-normal"
                            >
                              All Messages
                            </WexSidebar.MenuButton>
                          </WexSidebar.MenuItem>
                          <WexSidebar.MenuItem>
                            <WexSidebar.MenuButton
                              isActive={false}
                              className="h-[31px] min-h-[31px] whitespace-normal px-3 py-[6px]"
                            >
                              Urgent Items
                            </WexSidebar.MenuButton>
                          </WexSidebar.MenuItem>
                          <WexSidebar.MenuItem>
                            <WexSidebar.MenuButton
                              isActive={selectedCategory === "unread"}
                              onClick={() => setSelectedCategory("unread")}
                              className="h-[31px] min-h-[31px] whitespace-normal px-3 py-[6px] data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-normal"
                            >
                              Unread ({unreadCount})
                            </WexSidebar.MenuButton>
                          </WexSidebar.MenuItem>
                          <WexSidebar.MenuItem>
                            <WexSidebar.MenuButton
                              isActive={selectedCategory === "starred"}
                              onClick={() => setSelectedCategory("starred")}
                              className="h-[31px] min-h-[31px] whitespace-normal px-3 py-[6px] data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-normal"
                            >
                              Starred
                            </WexSidebar.MenuButton>
                          </WexSidebar.MenuItem>
                          <WexSidebar.MenuItem>
                            <WexSidebar.MenuButton
                              isActive={selectedCategory === "recently-viewed"}
                              onClick={() => setSelectedCategory("recently-viewed")}
                              className="h-[31px] min-h-[31px] whitespace-normal px-3 py-[6px] data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-normal"
                            >
                              Recently Viewed ({recentlyViewedCount})
                            </WexSidebar.MenuButton>
                          </WexSidebar.MenuItem>


                          <WexSidebar.GroupLabel className="px-3 mt-6">
                            CATEGORIES
                          </WexSidebar.GroupLabel>
                          <WexSidebar.MenuItem>
                            <WexSidebar.MenuButton
                              isActive={selectedCategory === "Cards & Security"}
                              onClick={() => setSelectedCategory("Cards & Security")}
                              className="h-[31px] min-h-[31px] whitespace-normal px-3 py-[6px] data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-normal"
                            >
                              Cards & Security
                            </WexSidebar.MenuButton>
                          </WexSidebar.MenuItem>
                          <WexSidebar.MenuItem>
                            <WexSidebar.MenuButton
                              isActive={selectedCategory === "Contributions & Investments"}
                              onClick={() => setSelectedCategory("Contributions & Investments")}
                              className="h-[31px] min-h-[31px] whitespace-normal px-3 py-[6px] data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-normal"
                            >
                              Investments
                            </WexSidebar.MenuButton>
                          </WexSidebar.MenuItem>
                          <WexSidebar.MenuItem>
                            <WexSidebar.MenuButton
                              isActive={selectedCategory === "Distributions"}
                              onClick={() => setSelectedCategory("Distributions")}
                              className="h-[31px] min-h-[31px] whitespace-normal px-3 py-[6px] data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-normal"
                            >
                              Distributions
                            </WexSidebar.MenuButton>
                          </WexSidebar.MenuItem>
                          <WexSidebar.MenuItem>
                            <WexSidebar.MenuButton
                              isActive={selectedCategory === "Statements & Tax Documents"}
                              onClick={() => setSelectedCategory("Statements & Tax Documents")}
                              className="h-[31px] min-h-[31px] whitespace-normal px-3 py-[6px] data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-normal"
                            >
                              Documents
                            </WexSidebar.MenuButton>
                          </WexSidebar.MenuItem>


                          <WexSidebar.GroupLabel className="px-3 mt-6">
                            MANAGE
                          </WexSidebar.GroupLabel>
                          <WexSidebar.MenuItem>
                            <WexSidebar.MenuButton
                              isActive={selectedCategory === "archive"}
                              onClick={() => setSelectedCategory("archive")}
                              className="h-[31px] min-h-[31px] whitespace-normal px-3 py-[6px] data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-normal"
                            >
                              Archive
                            </WexSidebar.MenuButton>
                          </WexSidebar.MenuItem>
                        </WexSidebar.Menu>
                      </WexSidebar.GroupContent>
                    </WexSidebar.Group>
                  </WexSidebar.Content>
                </WexSidebar>

                {/* Main Content Area */}
                <WexSidebar.Inset className="flex-1 min-w-0 bg-wex-card-bg md:peer-data-[variant=inset]:!m-0 md:peer-data-[variant=inset]:!rounded-none md:peer-data-[variant=inset]:!shadow-none md:peer-data-[variant=inset]:!ml-0 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:!ml-0">
                  <div className="flex h-full flex-col">
                    <div className="p-4 sm:p-6">
                {filteredMessages.length === 0 ? (
                  /* Empty State */
                  <WexEmpty className="border-0 py-12">
                    <WexEmpty.Header>
                      <WexEmpty.Media variant="default">
                        <img 
                          src={emptyStateIllustration} 
                          alt="" 
                          className="h-[191px] w-[235px]"
                        />
                      </WexEmpty.Media>
                      <WexEmpty.Title className="text-base font-normal text-[#243746]">
                        {getEmptyStateText()}
                      </WexEmpty.Title>
                    </WexEmpty.Header>
                  </WexEmpty>
                ) : (
                  <>
                    {/* Mobile Card List */}
                    <div className="space-y-3 md:hidden">
                      {filteredMessages.map((message) => (
                        <WexCard
                          key={message.id}
                          className="shadow-sm cursor-pointer"
                          onClick={(e) => {
                            // Don't open modal if clicking on interactive elements
                            const target = e.target as HTMLElement;
                            if (target.closest('button') || target.closest('[role="checkbox"]') || target.closest('input[type="checkbox"]')) {
                              return;
                            }
                            handleMessageClick(message);
                          }}
                        >
                          <WexCard.Content className="space-y-3 p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex flex-1 items-start gap-2">
                                {message.hasAttachment ? (
                                  <Paperclip className="mt-0.5 h-4 w-4 shrink-0 text-[#0058a3]" />
                                ) : (
                                  <div className="h-4 w-4 shrink-0" />
                                )}
                                <div className="space-y-1">
                                  <p
                                    className={`text-sm tracking-[-0.084px] ${
                                      !message.isRead
                                        ? "font-bold text-[#243746]"
                                        : "font-normal text-[#243746]"
                                    }`}
                                  >
                                    {message.subject}
                                  </p>
                                  <p className="text-xs text-[#4e5666] whitespace-nowrap">{message.deliveryDate}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={(e) => handleToggleStar(message, e)}
                                  className="cursor-pointer rounded-full p-2 hover:bg-gray-100"
                                  aria-label={message.isStarred ? "Unstar message" : "Star message"}
                                >
                                  <Star
                                    className={cn(
                                      "h-4 w-4",
                                      message.isStarred
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-[#a5aeb4]"
                                    )}
                                  />
                                </button>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <WexBadge
                                className="rounded-md px-2 py-1 text-xs font-bold whitespace-nowrap"
                                style={{
                                  backgroundColor: message.categoryColor,
                                  color: message.categoryTextColor,
                                }}
                              >
                                {message.category}
                              </WexBadge>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <WexButton
                                variant="ghost"
                                size="sm"
                                onClick={(e) => handleToggleReadStatus(message, e)}
                                className="px-3"
                              >
                                {message.isRead ? "Mark Unread" : "Mark Read"}
                              </WexButton>
                              {selectedCategory !== "archive" ? (
                                <WexButton
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => handleArchive(message, e)}
                                  className="px-3"
                                >
                                  Archive
                                </WexButton>
                              ) : (
                                <WexButton
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => handleUnarchive(message, e)}
                                  className="px-3"
                                >
                                  Move to inbox
                                </WexButton>
                              )}
                            </div>
                          </WexCard.Content>
                        </WexCard>
                      ))}
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block">
                      <div className="overflow-x-auto">
                        <WexTable>
                          {/* Table Header */}
                          <WexTable.Header>
                            <WexTable.Row className="border-b border-[#e4e6e9]">
                              <WexTable.Head className="w-[47px] px-3.5 py-2.5 text-left">
                                <WexCheckbox
                                  checked={
                                    paginatedMessages.length > 0 &&
                                    paginatedMessages.every((msg) => selectedMessageIds.has(msg.id))
                                  }
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      // Select all messages on current page
                                      const newSelected = new Set(selectedMessageIds);
                                      paginatedMessages.forEach((msg) => newSelected.add(msg.id));
                                      setSelectedMessageIds(newSelected);
                                    } else {
                                      // Deselect all messages on current page
                                      const newSelected = new Set(selectedMessageIds);
                                      paginatedMessages.forEach((msg) => newSelected.delete(msg.id));
                                      setSelectedMessageIds(newSelected);
                                    }
                                  }}
                                />
                              </WexTable.Head>
                              <WexTable.Head className="w-[47px] px-3.5 py-2.5"></WexTable.Head>
                              <WexTable.Head className="w-[401px] px-3.5 py-2.5 text-left">
                                <span className="text-sm font-semibold text-[#243746]">Subject</span>
                              </WexTable.Head>
                              <WexTable.Head className="w-[277px] px-3.5 py-2.5 text-left">
                                <span className="text-sm font-semibold text-[#243746]">Category</span>
                              </WexTable.Head>
                              <WexTable.Head className="w-[170px] px-3.5 py-2.5 text-left">
                                <span className="text-sm font-semibold text-[#243746]">Delivery Date</span>
                              </WexTable.Head>
                              <WexTable.Head className="w-[129px] px-3.5 py-2.5 text-right">
                                <span className="text-sm font-semibold text-[#243746]">Action</span>
                              </WexTable.Head>
                            </WexTable.Row>
                          </WexTable.Header>
                          {/* Table Body */}
                          <WexTable.Body>
                            {paginatedMessages.map((message) => (
                            <WexTable.Row
                              key={message.id}
                              className="cursor-pointer border-b border-[#e4e6e9] hover:bg-gray-50"
                              onClick={(e) => {
                                // Don't open modal if clicking on checkbox, star button, or dropdown menu
                                const target = e.target as HTMLElement;
                                if (target.closest('button') || target.closest('[role="checkbox"]') || target.closest('input[type="checkbox"]') || target.closest('[role="menu"]')) {
                                  return;
                                }
                                handleMessageClick(message);
                              }}
                            >
                              <WexTable.Cell className="px-3.5 py-2.5">
                                <WexCheckbox
                                  checked={selectedMessageIds.has(message.id)}
                                  onCheckedChange={(checked) => {
                                    const newSelected = new Set(selectedMessageIds);
                                    if (checked) {
                                      newSelected.add(message.id);
                                    } else {
                                      newSelected.delete(message.id);
                                    }
                                    setSelectedMessageIds(newSelected);
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                />
                              </WexTable.Cell>
                              <WexTable.Cell className="px-3.5 py-2.5">
                                <button
                                  onClick={(e) => handleToggleStar(message, e)}
                                  className="cursor-pointer hover:opacity-80 transition-opacity"
                                  aria-label={message.isStarred ? "Unstar message" : "Star message"}
                                >
                                  <Star
                                    className={cn(
                                      "h-4 w-4",
                                      message.isStarred
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-[#a5aeb4]"
                                    )}
                                  />
                                </button>
                              </WexTable.Cell>
                              <WexTable.Cell className="px-3.5 py-2.5">
                                <div className="flex items-center gap-2">
                                  {message.hasAttachment ? (
                                    <Paperclip className="h-4 w-4 shrink-0 text-[#0058a3]" />
                                  ) : (
                                    <div className="h-4 w-4 shrink-0" />
                                  )}
                                  <span
                                    className={`text-sm tracking-[-0.084px] ${
                                      !message.isRead
                                        ? "font-bold text-[#243746]"
                                        : "font-normal text-[#243746]"
                                    }`}
                                  >
                                    {message.subject}
                                  </span>
                                </div>
                              </WexTable.Cell>
                              <WexTable.Cell className="px-3.5 py-2.5 min-w-[200px]">
                                <WexBadge
                                  className="rounded-md px-2 py-1 text-xs font-bold whitespace-nowrap"
                                  style={{
                                    backgroundColor: message.categoryColor,
                                    color: message.categoryTextColor,
                                  }}
                                >
                                  {message.category}
                                </WexBadge>
                              </WexTable.Cell>
                              <WexTable.Cell className="px-3.5 py-2.5">
                                <span
                                  className={`text-sm tracking-[-0.084px] whitespace-nowrap ${
                                    !message.isRead
                                      ? "font-bold text-[#243746]"
                                      : "font-normal text-[#243746]"
                                  }`}
                                >
                                  {message.deliveryDate}
                                </span>
                              </WexTable.Cell>
                              <WexTable.Cell className="px-3.5 py-2.5 text-right">
                                <WexDropdownMenu>
                                  <WexDropdownMenu.Trigger asChild>
                                    <WexButton
                                      variant="ghost"
                                      size="icon"
                                      className="h-4 w-4"
                                    >
                                      <MoreVertical className="h-4 w-4 text-[#12181d]" />
                                    </WexButton>
                                  </WexDropdownMenu.Trigger>
                                  <WexDropdownMenu.Content
                                    align="end"
                                    className="w-[180px] rounded-[6px] border border-[#e4e6e9] bg-white p-[3.5px] shadow-md"
                                  >
                                    <div className="flex flex-col gap-[2px]">
                                      {selectedCategory !== "archive" && (
                                        <>
                                          {!message.isRead && (
                                            <WexDropdownMenu.Item
                                              onClick={(e) => handleToggleReadStatus(message, e)}
                                              className="flex cursor-pointer items-center gap-[7px] rounded-[4px] px-[10.5px] py-[7px] text-sm text-[#243746] outline-none hover:bg-gray-50 focus:bg-gray-50"
                                            >
                                              <Inbox className="h-3.5 w-3.5 shrink-0 text-[#243746]" />
                                              <span>Mark as read</span>
                                            </WexDropdownMenu.Item>
                                          )}
                                          {message.isRead && (
                                            <WexDropdownMenu.Item
                                              onClick={(e) => handleToggleReadStatus(message, e)}
                                              className="flex cursor-pointer items-center gap-[7px] rounded-[4px] px-[10.5px] py-[7px] text-sm text-[#243746] outline-none hover:bg-gray-50 focus:bg-gray-50"
                                            >
                                              <Inbox className="h-3.5 w-3.5 shrink-0 text-[#243746]" />
                                              <span>Mark as unread</span>
                                            </WexDropdownMenu.Item>
                                          )}
                                          <WexDropdownMenu.Item
                                            onClick={(e) => handleArchive(message, e)}
                                            className="flex cursor-pointer items-center gap-[7px] rounded-[4px] px-[10.5px] py-[7px] text-sm text-[#243746] outline-none hover:bg-gray-50 focus:bg-gray-50"
                                          >
                                            <Trash2 className="h-3.5 w-3.5 shrink-0 text-[#243746]" />
                                            <span>Archive</span>
                                          </WexDropdownMenu.Item>
                                        </>
                                      )}
                                      {selectedCategory === "archive" && (
                                        <WexDropdownMenu.Item
                                          onClick={(e) => handleUnarchive(message, e)}
                                          className="flex cursor-pointer items-center gap-[7px] rounded-[4px] px-[10.5px] py-[7px] text-sm text-[#243746] outline-none hover:bg-gray-50 focus:bg-gray-50"
                                        >
                                          <Inbox className="h-3.5 w-3.5 shrink-0 text-[#7c858e]" />
                                          <span>Move to inbox</span>
                                        </WexDropdownMenu.Item>
                                      )}
                                    </div>
                                  </WexDropdownMenu.Content>
                                </WexDropdownMenu>
                              </WexTable.Cell>
                            </WexTable.Row>
                          ))}
                        </WexTable.Body>
                      </WexTable>
                    </div>
                  </div>
                  </>
                )}

                {/* Pagination */}
                {filteredMessages.length > 0 && (
                  <div className="mt-6 flex flex-col items-center gap-3 border-t border-[#e4e6e9] pt-4 md:flex-row md:justify-center">
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
                          let pageNum: number;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
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
                    <div className="md:ml-4">
                      <WexSelect
                        value={itemsPerPage.toString()}
                        onValueChange={(value) => {
                          setItemsPerPage(Number(value));
                          setCurrentPage(1);
                        }}
                      >
                        <WexSelect.Trigger className="h-[35px] min-w-[70px] w-[70px] border-[#a5aeb4] shadow-sm">
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
                    )}
                    </div>
                  </div>
                </WexSidebar.Inset>
              </div>
            </WexCard>
          </WexSidebar.Provider>
        </div>
      </div>

      <ConsumerFooter />

      {/* Message Detail Modal */}
      <WexDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <WexDialog.Content className="w-full max-w-lg p-6 md:w-[442px]">
          <div className="space-y-0">
            {/* Header */}
            <div className="space-y-0 mb-4">
              <WexDialog.Title className="text-base font-semibold text-[#1d2c38] tracking-[-0.176px] leading-6 mb-0">
                {selectedMessage?.subject}
              </WexDialog.Title>
              <p className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6 mt-3">
                {selectedMessage?.deliveryDate}
              </p>
              <WexSeparator className="my-3.5" />
            </div>

            {/* Content */}
            <div className="space-y-0 min-h-[173px]">
              <p className="text-sm text-[#1d2c38] tracking-[-0.084px] leading-6 mb-4">
                {selectedMessage?.body || "Please see attachment."}
              </p>
              
              {selectedMessage?.hasAttachment && (
                <div className="border border-[#edeff0] rounded-md h-[68px] px-4 py-0 bg-white flex items-center">
                  <div className="flex items-center gap-4 w-full">
                    <FileText className="h-[22px] w-[22px] text-[#0058a3] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0058a3] tracking-[-0.084px] leading-6 truncate">
                        {selectedMessage.attachmentFileName || "Attachment.pdf"}
                      </p>
                    </div>
                    <WexButton
                      variant="ghost"
                      size="icon"
                      className="h-[22px] w-[22px] shrink-0"
                      aria-label="Download attachment"
                    >
                      <Download className="h-[22px] w-[22px] text-[#1d2c38]" />
                    </WexButton>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-4 mt-4">
              <WexButton intent="primary" onClick={handleCloseModal} className="px-3 py-2">
                Close
              </WexButton>
            </div>
          </div>
        </WexDialog.Content>
      </WexDialog>
    </div>
  );
}

