import { ConsumerNavigation } from "./consumer/ConsumerNavigation";
import { TitleBar } from "./account-overview/TitleBar";
import { AccountSummaryCards } from "./account-overview/AccountSummaryCards";
import { RecentTransactionsTable } from "./account-overview/RecentTransactionsTable";
import { PreviousPlanYearTable } from "./account-overview/PreviousPlanYearTable";
import { ConsumerFooter } from "./consumer/Footer";

/**
 * Account Overview Page
 * 
 * Standalone page showing detailed account information:
 * - Custom navigation header (reused from Consumer Experience)
 * - Title bar with action buttons
 * - Account summary cards
 * - Recent transactions table with filters
 * - Previous plan year table
 * - Footer
 * 
 * All components use WEX Design System components.
 */
export default function AccountOverviewPage() {
  return (
    <div className="min-h-screen bg-[#F1FAFE]">
      {/* Navigation Header */}
      <ConsumerNavigation />

      {/* Main Content */}
      <main className="w-full max-w-[1440px] mx-auto px-8 py-7 space-y-6">
        {/* Title Bar */}
        <TitleBar />

        {/* Account Summary Cards */}
        <AccountSummaryCards />

        {/* Recent Transactions */}
        <RecentTransactionsTable />

        {/* Previous Plan Year */}
        <PreviousPlanYearTable />
      </main>

      {/* Footer */}
      <ConsumerFooter />
    </div>
  );
}

