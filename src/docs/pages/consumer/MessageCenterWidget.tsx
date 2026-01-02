import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WexCard } from "@/components/wex/wex-card";
import { WexButton } from "@/components/wex/wex-button";
import { WexBadge } from "@/components/wex/wex-badge";
import { WexSeparator } from "@/components/wex/wex-separator";
import { ChevronRight, AlertTriangle, Mail, Star, Clock, Bell, FileText } from "lucide-react";
import { 
  getInitialMessages, 
  calculateUnreadCount,
  UNREAD_COUNT_CHANGED_EVENT,
  type Message 
} from "./messageCenterUtils";

/**
 * Message Center Widget
 * 
 * Priority-focused message widget for the homepage displaying:
 * - Quick stats overview (urgent, unread, starred, recently viewed)
 * - To-do list of important messages
 * 
 * Designed for quick scanning with clean, sophisticated UI
 */

interface MessageItem {
  id: string;
  title: string;
  category: string;
  date: string;
  actionDescription: string;
  icon: "alert" | "bell" | "document";
  badge?: {
    label: string;
    intent: "destructive" | "info";
  };
}

// Initial messages data from Message Center
const getMessageData = (): Message[] => {
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
      body: "A withdrawal has been processed from your HSA account.",
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
      body: "Your HSA payment has been issued successfully.",
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
      body: "A purchase was made using your HSA card.",
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
      body: "Your password has been successfully changed.",
    },
  ];

  return getInitialMessages(initialMessages);
};

// Generate action description based on message content
const getActionDescription = (subject: string, category: string): string => {
  // Check for specific keywords to generate relevant action descriptions
  if (subject.toLowerCase().includes("contribution maximum") || subject.toLowerCase().includes("contribution warning")) {
    return "Review and adjust your contribution settings to stay within limits";
  }
  if (subject.toLowerCase().includes("contribution notification")) {
    return "Confirm contribution details and update records if needed";
  }
  if (subject.toLowerCase().includes("account summary")) {
    return "Review your monthly account activity and transactions";
  }
  if (subject.toLowerCase().includes("payment issued")) {
    return "Verify payment details and expected delivery date";
  }
  if (subject.toLowerCase().includes("password") && subject.toLowerCase().includes("changed")) {
    return "Verify this change was authorized and secure your account";
  }
  if (subject.toLowerCase().includes("withdrawal")) {
    return "Confirm withdrawal amount and destination account";
  }
  if (subject.toLowerCase().includes("purchase alert")) {
    return "Review transaction details and verify the purchase";
  }
  if (subject.toLowerCase().includes("tax form")) {
    return "Download and save your tax documents for filing";
  }
  
  // Default action based on category
  if (category.toLowerCase().includes("security")) {
    return "Review security alert and take necessary action";
  }
  if (category.toLowerCase().includes("contributions")) {
    return "Review contribution details and confirm accuracy";
  }
  if (category.toLowerCase().includes("statements")) {
    return "Review document and download for your records";
  }
  
  return "Review this message and take appropriate action";
};

// Mock message data for To Do list - using actual messages from Message Center
const getToDoMessages = (messages: Message[]): MessageItem[] => {
  // Get only urgent messages that require action (bold + unread)
  const actionRequiredMessages = messages
    .filter(msg => !msg.isArchived && msg.isBold && !msg.isRead)
    .slice(0, 3);

  return actionRequiredMessages.map(msg => ({
    id: msg.id,
    title: msg.subject,
    category: msg.category,
    date: msg.deliveryDate,
    actionDescription: getActionDescription(msg.subject, msg.category),
    icon: "alert" as const,
    badge: {
      label: "Action Required",
      intent: "destructive" as const,
    },
  }));
};

export function MessageCenterWidget() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(() => getMessageData());
  const [unreadCount, setUnreadCount] = useState<number>(() => calculateUnreadCount(messages));

  // Listen for unread count changes
  useEffect(() => {
    const handleUnreadCountChange = (event: CustomEvent) => {
      setUnreadCount(event.detail);
    };

    window.addEventListener(UNREAD_COUNT_CHANGED_EVENT as any, handleUnreadCountChange);
    
    // Refresh messages when component mounts or becomes visible
    const refreshMessages = () => {
      const updated = getMessageData();
      setMessages(updated);
      setUnreadCount(calculateUnreadCount(updated));
    };

    window.addEventListener('focus', refreshMessages);

    return () => {
      window.removeEventListener(UNREAD_COUNT_CHANGED_EVENT as any, handleUnreadCountChange);
      window.removeEventListener('focus', refreshMessages);
    };
  }, []);

  const getIcon = (iconType: "alert" | "bell" | "document") => {
    switch (iconType) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "bell":
        return <Bell className="h-5 w-5 text-primary" />;
      case "document":
        return <FileText className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Mail className="h-5 w-5 text-primary" />;
    }
  };

  // Calculate actual counts from message data
  const urgentCount = messages.filter(m => m.isBold && !m.isArchived && !m.isRead).length;
  const starredCount = messages.filter(m => m.isStarred && !m.isArchived).length;
  const readCount = messages.filter(m => m.isRead && !m.isArchived).length;

  // Stats data with actual counts
  const stats = [
    { label: "Urgent Items", count: urgentCount, icon: <AlertTriangle className="h-5 w-5 text-destructive" />, bgColor: "bg-destructive/10" },
    { label: "Unread Messages", count: unreadCount, icon: <Mail className="h-5 w-5 text-primary" />, bgColor: "bg-primary/10" },
    { label: "Starred Items", count: starredCount, icon: <Star className="h-5 w-5 text-warning" />, bgColor: "bg-warning/10" },
    { label: "Recently Viewed", count: readCount, icon: <Clock className="h-5 w-5 text-info" />, bgColor: "bg-info/10" },
  ];

  const toDoMessages = getToDoMessages(messages);

  return (
    <WexCard>
      <WexCard.Content className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Message Center
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Overview of your recent communications
              </p>
            </div>
            <WexButton 
              intent="link" 
              size="sm"
              onClick={() => navigate("/message-center")}
              className="text-primary hover:text-primary/80"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </WexButton>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative p-4 rounded-lg border border-border bg-card hover:shadow-sm transition-shadow"
              >
                <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-display font-semibold text-foreground mb-1">
                  {stat.count}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* To Do Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-display font-semibold text-foreground">
              To Do
            </h3>
            
            <div className="space-y-0">
              {toDoMessages.length > 0 ? (
                toDoMessages.map((message, index) => (
                  <div key={message.id}>
                    <button
                      onClick={() => navigate("/message-center")}
                      className="w-full text-left py-3 px-3 -mx-3 rounded-lg transition-colors hover:bg-muted/50 cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="mb-1">
                            <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                              {message.title}
                            </h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {message.actionDescription}
                          </p>
                        </div>
                      </div>
                    </button>
                    {index < toDoMessages.length - 1 && <WexSeparator className="my-0" />}
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No pending items
                </div>
              )}
            </div>
          </div>

        </div>
      </WexCard.Content>
    </WexCard>
  );
}
