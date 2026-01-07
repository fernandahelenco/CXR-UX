import { useState, useMemo } from "react";
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
import { ConsumerNavigation } from "./ConsumerNavigation";
import { cn } from "@/lib/utils";
import emptyStateIllustration from "./img/empty-state-illustration.svg";
import {
  Star,
  Paperclip,
  MoreVertical,
  FileText,
  Settings,
  Inbox,
  Folder,
  Download,
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
    // Category filter
    return "You don't have any messages in this category yet";
  };

  const unreadCount = useMemo(() => {
    return messages.filter((message) => !message.isRead && !message.isArchived).length;
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
    // Category filter: show only non-archived messages in that category
    return messages.filter((message) => message.category === selectedCategory && !message.isArchived);
  }, [selectedCategory, messages]);

  const mobileFilterOptions = [
    { label: "All Messages", value: "all", section: "Activity" },
    { label: "Unread", value: "unread", section: "Activity" },
    { label: "Starred", value: "starred", section: "Activity" },
    { label: "Archive", value: "archive", section: "Manage" },
    { label: "Cards & Security", value: "Cards & Security", section: "Categories" },
    { label: "Contributions & Investments", value: "Contributions & Investments", section: "Categories" },
    { label: "Distributions", value: "Distributions", section: "Categories" },
    { label: "Statements & Tax Documents", value: "Statements & Tax Documents", section: "Categories" },
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
                  intent="outline"
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
                  intent="outline"
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
          <div className="flex flex-col gap-4 rounded-2xl md:flex-row md:gap-0">
            {/* Left Sidebar */}
            <WexCard className="hidden w-[260px] rounded-2xl rounded-r-none border-r-0 md:block">
              <WexCard.Content className="p-4">
                <div className="space-y-1">
                  {/* Activity Section */}
                  <div className="mb-4">
                    <div className="mb-2 px-3 py-2 text-xs font-medium uppercase tracking-[0.24px] text-[#243746]">
                      Activity
                    </div>
                    <div className="space-y-1">
                      <WexButton
                        intent="ghost"
                        onClick={() => setSelectedCategory(null)}
                        className={cn(
                          "w-full justify-start rounded-lg px-3 py-2.5 text-left text-sm",
                          selectedCategory === null
                            ? "bg-[#e4f5fd] text-[#003c70] font-semibold hover:bg-[#e4f5fd]"
                            : "text-[#243746]"
                        )}
                      >
                        All Messages
                      </WexButton>
                      <WexButton
                        intent="ghost"
                        className="w-full justify-start rounded-lg px-3 py-2.5 text-left text-sm text-[#243746]"
                      >
                        Urgent Items
                      </WexButton>
                      <WexButton
                        intent="ghost"
                        onClick={() => setSelectedCategory("unread")}
                        className={cn(
                          "w-full justify-start rounded-lg px-3 py-2.5 text-left text-sm",
                          selectedCategory === "unread"
                            ? "bg-[#e4f5fd] text-[#003c70] font-semibold hover:bg-[#e4f5fd]"
                            : "text-[#243746]"
                        )}
                      >
                        Unread ({unreadCount})
                      </WexButton>
                      <WexButton
                        intent="ghost"
                        onClick={() => setSelectedCategory("starred")}
                        className={cn(
                          "w-full justify-start rounded-lg px-3 py-2.5 text-left text-sm",
                          selectedCategory === "starred"
                            ? "bg-[#e4f5fd] text-[#003c70] font-semibold hover:bg-[#e4f5fd]"
                            : "text-[#243746]"
                        )}
                      >
                        Starred
                      </WexButton>
                      <WexButton
                        intent="ghost"
                        className="w-full justify-start rounded-lg px-3 py-2.5 text-left text-sm text-[#243746]"
                      >
                        Recently Viewed
                      </WexButton>
                    </div>
                  </div>

                  <WexSeparator className="my-3" />

                  {/* Categories Section */}
                  <div className="mb-4">
                    <div className="mb-2 px-3 py-2 text-xs font-medium uppercase tracking-[0.24px] text-[#243746]">
                      Categories
                    </div>
                    <div className="space-y-1">
                      <WexButton
                        intent="ghost"
                        onClick={() => setSelectedCategory("Cards & Security")}
                        className={cn(
                          "w-full justify-start rounded-lg px-3 py-2.5 text-left text-sm",
                          selectedCategory === "Cards & Security"
                            ? "bg-[#e4f5fd] text-[#003c70] font-semibold hover:bg-[#e4f5fd]"
                            : "text-[#4e5666]"
                        )}
                      >
                        Cards & Security
                      </WexButton>
                      <WexButton
                        intent="ghost"
                        onClick={() => setSelectedCategory("Contributions & Investments")}
                        className={cn(
                          "w-full justify-start rounded-lg px-3 py-2.5 text-left text-sm",
                          selectedCategory === "Contributions & Investments"
                            ? "bg-[#e4f5fd] text-[#003c70] font-semibold hover:bg-[#e4f5fd]"
                            : "text-[#243746]"
                        )}
                      >
                        Contributions & Investments
                      </WexButton>
                      <WexButton
                        intent="ghost"
                        onClick={() => setSelectedCategory("Distributions")}
                        className={cn(
                          "w-full justify-start rounded-lg px-3 py-2.5 text-left text-sm",
                          selectedCategory === "Distributions"
                            ? "bg-[#e4f5fd] text-[#003c70] font-semibold hover:bg-[#e4f5fd]"
                            : "text-[#4e5666]"
                        )}
                      >
                        Distributions
                      </WexButton>
                      <WexButton
                        intent="ghost"
                        onClick={() => setSelectedCategory("Statements & Tax Documents")}
                        className={cn(
                          "w-full justify-start rounded-lg px-3 py-2.5 text-left text-sm",
                          selectedCategory === "Statements & Tax Documents"
                            ? "bg-[#e4f5fd] text-[#003c70] font-semibold hover:bg-[#e4f5fd]"
                            : "text-[#4e5666]"
                        )}
                      >
                        Statements & Tax Documents
                      </WexButton>
                    </div>
                  </div>

                  <WexSeparator className="my-3" />

                  {/* Manage Section */}
                  <div>
                    <div className="mb-2 px-3 py-2 text-xs font-medium uppercase tracking-[0.24px] text-[#243746]">
                      Manage
                    </div>
                    <div className="space-y-1">
                      <WexButton
                        intent="ghost"
                        onClick={() => setSelectedCategory("archive")}
                        className={cn(
                          "w-full justify-start rounded-lg px-3 py-2.5 text-left text-sm",
                          selectedCategory === "archive"
                            ? "bg-[#e4f5fd] text-[#003c70] font-semibold hover:bg-[#e4f5fd]"
                            : "text-[#243746]"
                        )}
                      >
                        Archive
                      </WexButton>
                    </div>
                  </div>
                </div>
              </WexCard.Content>
            </WexCard>

            {/* Main Content Area - Table */}
            <WexCard className="flex-1 rounded-2xl md:rounded-l-none">
              <WexCard.Content className="p-4 sm:p-6">
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
                          className="shadow-sm"
                          onClick={() => handleMessageClick(message)}
                        >
                          <WexCard.Content className="space-y-3 p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex flex-1 items-start gap-2">
                                {message.hasAttachment && (
                                  <Paperclip className="mt-0.5 h-4 w-4 text-[#0058a3]" />
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
                                  <p className="text-xs text-[#4e5666]">{message.deliveryDate}</p>
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
                                className="rounded-md px-2 py-1 text-xs font-bold"
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
                                intent="ghost"
                                size="sm"
                                onClick={(e) => handleToggleReadStatus(message, e)}
                                className="px-3"
                              >
                                {message.isRead ? "Mark Unread" : "Mark Read"}
                              </WexButton>
                              {selectedCategory !== "archive" ? (
                                <WexButton
                                  intent="ghost"
                                  size="sm"
                                  onClick={(e) => handleArchive(message, e)}
                                  className="px-3"
                                >
                                  Archive
                                </WexButton>
                              ) : (
                                <WexButton
                                  intent="ghost"
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
                                <WexCheckbox />
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
                            {filteredMessages.map((message) => (
                            <WexTable.Row
                              key={message.id}
                              className="cursor-pointer border-b border-[#e4e6e9] hover:bg-gray-50"
                              onClick={() => handleMessageClick(message)}
                            >
                              <WexTable.Cell className="px-3.5 py-2.5">
                                <WexCheckbox />
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
                                  {message.hasAttachment && (
                                    <Paperclip className="h-3.5 w-3.5 text-[#0058a3]" />
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
                              <WexTable.Cell className="px-3.5 py-2.5">
                                <WexBadge
                                  className="rounded-md px-2 py-1 text-xs font-bold"
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
                                  className={`text-sm tracking-[-0.084px] ${
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
                                      intent="ghost"
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
                                              <Inbox className="h-3.5 w-3.5 shrink-0 text-[#7c858e]" />
                                              <span>Mark as read</span>
                                            </WexDropdownMenu.Item>
                                          )}
                                          {message.isRead && (
                                            <WexDropdownMenu.Item
                                              onClick={(e) => handleToggleReadStatus(message, e)}
                                              className="flex cursor-pointer items-center gap-[7px] rounded-[4px] px-[10.5px] py-[7px] text-sm text-[#243746] outline-none hover:bg-gray-50 focus:bg-gray-50"
                                            >
                                              <Inbox className="h-3.5 w-3.5 shrink-0 text-[#7c858e]" />
                                              <span>Mark as unread</span>
                                            </WexDropdownMenu.Item>
                                          )}
                                          <WexDropdownMenu.Item
                                            onClick={(e) => handleArchive(message, e)}
                                            className="flex cursor-pointer items-center gap-[7px] rounded-[4px] px-[10.5px] py-[7px] text-sm text-[#243746] outline-none hover:bg-gray-50 focus:bg-gray-50"
                                          >
                                            <Folder className="h-3.5 w-3.5 shrink-0 text-[#7c858e]" />
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
                          <WexPagination.First href="#" />
                        </WexPagination.Item>
                        <WexPagination.Item>
                          <WexPagination.Previous href="#" />
                        </WexPagination.Item>
                        <WexPagination.Item>
                          <WexPagination.Link href="#" isActive>
                            1
                          </WexPagination.Link>
                        </WexPagination.Item>
                        <WexPagination.Item>
                          <WexPagination.Link href="#">2</WexPagination.Link>
                        </WexPagination.Item>
                        <WexPagination.Item>
                          <WexPagination.Link href="#">3</WexPagination.Link>
                        </WexPagination.Item>
                        <WexPagination.Item>
                          <WexPagination.Link href="#">4</WexPagination.Link>
                        </WexPagination.Item>
                        <WexPagination.Item>
                          <WexPagination.Link href="#">5</WexPagination.Link>
                        </WexPagination.Item>
                        <WexPagination.Item>
                          <WexPagination.Next href="#" />
                        </WexPagination.Item>
                        <WexPagination.Item>
                          <WexPagination.Last href="#" />
                        </WexPagination.Item>
                      </WexPagination.Content>
                    </WexPagination>
                    <div className="md:ml-4">
                      <WexSelect defaultValue="10">
                        <WexSelect.Trigger className="h-[35px] w-[60px] border-[#a5aeb4] shadow-sm">
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
              </WexCard.Content>
            </WexCard>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-6">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#7c858e]">
            <WexButton
              intent="link"
              className="h-auto p-0 text-sm text-[#7c858e] underline"
            >
              Copyright
            </WexButton>
            <WexButton
              intent="link"
              className="h-auto p-0 text-sm text-[#7c858e] underline"
            >
              Disclaimer
            </WexButton>
            <WexButton
              intent="link"
              className="h-auto p-0 text-sm text-[#7c858e] underline"
            >
              Privacy Policy
            </WexButton>
            <WexButton
              intent="link"
              className="h-auto p-0 text-sm text-[#7c858e] underline"
            >
              Terms of Use
            </WexButton>
          </div>
          <p className="mt-4 text-center text-sm text-[#7c858e]">
            WEX Health Inc. 2004-2026. All rights reserved. Powered by WEX Health.
          </p>
        </div>
      </footer>

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
                      intent="ghost"
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

