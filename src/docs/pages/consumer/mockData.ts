/**
 * Mock Data for Consumer Experience Page
 * 
 * Centralized data for all sections of the consumer experience demo.
 */

export interface Account {
  type: string;
  balance: string;
  daysLeft?: number;
  hasAlert?: boolean;
}

export interface AccountCard {
  title: string;
  accounts: Account[];
}

export interface HSAAccountData {
  title: string;
  subtitle: string;
  totalAccountValue: string;
  availableCash: string;
  investments: string;
}

export interface FSAAccountData {
  title: string;
  subtitle: string;
  availableBalance: string;
  useYourFundsText: string;
  timeRemaining: number;
}

export interface Transaction {
  date: string;
  merchant: string;
  account: string;
  amount: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  isPending: boolean;
  actionLabel: string;
  category?: string;
  isUrgent?: boolean;
}

export interface QuickLink {
  label: string;
}

export interface InfoCard {
  title: string;
  description: string;
  buttonText: string;
  imageAlt: string;
}

export interface ChartData {
  year: string;
  amount: number;
}

export interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
}

// Accounts Data (legacy - kept for backward compatibility)
export const hsaData: AccountCard = {
  title: "HSA For Life®",
  accounts: [
    { type: "Cash Account", balance: "$0.00" },
    { type: "Investment Account", balance: "$0.00" },
  ],
};

export const fsaData: AccountCard = {
  title: "01/01/2025 - 12/31/2025",
  accounts: [
    { 
      type: "Health FSA", 
      balance: "$250.00", 
      daysLeft: 49,
      hasAlert: true 
    },
  ],
};

// New Account Data Structure
export const hsaAccountData: HSAAccountData = {
  title: "HSA For Life®",
  subtitle: "Health Savings Account • 2025 Plan Year",
  totalAccountValue: "$0.00",
  availableCash: "$0.00",
  investments: "$0.00",
};

export const fsaAccountData: FSAAccountData = {
  title: "Health Care FSA",
  subtitle: "Flexible Spending Account • 2025 Plan Year",
  availableBalance: "$250.00",
  useYourFundsText: "Submit receipts to get reimbursed",
  timeRemaining: 49,
};

// Tasks Data
export const tasksData: Task[] = [
  {
    id: "1",
    title: "Set up Direct Deposit",
    description: "Get your money faster by linking your bank account.",
    isPending: true,
    actionLabel: "Add Account",
    category: "banking",
  },
  {
    id: "2",
    title: "LSA Expiring Soon",
    description: "Today is the last day to spend your remaining balance.",
    isPending: true,
    actionLabel: "View Balance",
    isUrgent: true,
    category: "clock",
  },
  {
    id: "3",
    title: "Verify your Email",
    description: "Secure your account by confirming your email address.",
    isPending: true,
    actionLabel: "Verify Now",
    category: "mail",
  },
];

// Transactions Data
export const transactionsData: Transaction[] = [
  {
    date: "Pending",
    merchant: "Payroll Contribution",
    account: "HSA",
    amount: "$158.00",
  },
  {
    date: "01/16/2025",
    merchant: "Walgreens",
    account: "HSA",
    amount: "- $26.00",
  },
  {
    date: "01/16/2025",
    merchant: "Payroll Contribution",
    account: "HSA",
    amount: "$158.00",
  },
  {
    date: "01/16/2025",
    merchant: "Little One's Daycare",
    account: "Dependent Care FSA",
    amount: "- $146.00",
  },
];

// Quick Links Data
export const quickLinksData: QuickLink[] = [
  { label: "Contribute to HSA" },
  { label: "Send Payment" },
  { label: "Manage Investments" },
  { label: "Set up update bank account" },
  { label: "Reimburse Myself" },
  { label: "Add/HSA beneficiary" },
  { label: "Manage My Expenses" },
  { label: "View statement and notifications" },
  { label: "Update notification preferences" },
];

// AI Chat Suggestions
export const aiSuggestions: string[] = [
  "Reimburse Myself",
  "Send Payment",
  "Contribute to HSA",
  "Manage Investments",
  "Manage My Expenses",
  "Enroll in HSA",
];

// Info Cards Data
export const infoCardsData: InfoCard[] = [
  {
    title: "HSA +401(k) = Retire a millionaire",
    description: "With an HSA in hand plus a 401(k), standard that you can exceed your retirement savings goal to retirement with $1M+ after 40(k), standard that you can exceed your retirement savings goal",
    buttonText: "Learn More",
    imageAlt: "Family together",
  },
  {
    title: "Don't put off designating a beneficiary",
    description: "Designate a beneficiary for your Health Savings Account so your loved ones can be in your account and easily transfer funds to their accounts. Once a claim is approved.",
    buttonText: "Get Started",
    imageAlt: "Beneficiary designation",
  },
  {
    title: "Get reimbursed faster",
    description: "If you've paid for qualified health care expenses with your own money, you can access your benefit account checks instead to use the eligible health care expenses using our tool.",
    buttonText: "Learn More",
    imageAlt: "Reimbursement process",
  },
  {
    title: "App like change and stabilization process",
    description: "When using the tools in your Health and benefit account to pay for eligible health care expenses. It's where it is calculated, it handles all receipts and transaction. A fee legit tax.",
    buttonText: "Learn More",
    imageAlt: "Account tools",
  },
];

// Chart Data - HSA Contributions by Tax Year
export const hsaContributionsData: ChartData[] = [
  { year: "2025", amount: 8550 },
  { year: "2024", amount: 8300 },
  { year: "2023", amount: 7750 },
];

// Chart Data - Paid Claims by Category
export const paidClaimsCategoryData: CategoryData[] = [
  { category: "Medical", amount: 450, percentage: 60 },
  { category: "Dental", amount: 200, percentage: 27 },
  { category: "Vision", amount: 100, percentage: 13 },
];

// Navigation Menu Items
export const navigationItems = [
  { label: "Home", href: "/", icon: "home", hasDropdown: false },
  { 
    label: "Accounts", 
    href: "#", 
    icon: "wallet", 
    hasDropdown: true,
    subItems: [
      { label: "Account Overview", href: "/account-overview" },
      { label: "Health Savings Account (HSA)", href: "/account-overview?account=hsa" },
      { label: "Flexible Savings Account (FSA)", href: "/account-overview?account=fsa" },
      { label: "Dependent Care", href: "/account-overview?account=dependent-care" },
      { label: "Lifestyle Spending Account", href: "/account-overview?account=lifestyle" },
    ]
  },
  { label: "Claims", href: "/claims", icon: "receipt", hasDropdown: false },
  { label: "Resources", href: "/resources", icon: "file-text", hasDropdown: false },
];

