import { ConsumerNavigation } from "./consumer/ConsumerNavigation";
import { AIChatSection } from "./consumer/AIChatSection";
import { AccountsSection } from "./consumer/AccountsSection";
import { MessageCenterWidget } from "./consumer/MessageCenterWidget";
import { QuickLinksSection } from "./consumer/QuickLinksSection";
import { TransactionsAndLinks } from "./consumer/TransactionsAndLinks";
import { InfoCardsSection } from "./consumer/InfoCardsSection";
import { QuickViewSection } from "./consumer/QuickViewSection";
import { PromoBanner } from "./consumer/PromoBanner";
import { ConsumerFooter } from "./consumer/Footer";

/**
 * Consumer Experience Page
 * 
 * Standalone page showcasing consumer-facing features:
 * - Custom navigation header (bypasses DocsLayout)
 * - AI-powered chat interface
 * - Account management (HSA/FSA)
 * - Message Center widget
 * - Tasks and transactions
 * - Quick links and info cards
 * - Data visualization charts
 * - Promotional banner
 * 
 * This page demonstrates a complete consumer experience
 * using WEX Design System components with mock data.
 */
export default function ConsumerExperiencePage() {
  return (
    <div className="min-h-screen bg-[#F1FAFE]">
      {/* Custom Navigation Header */}
      <ConsumerNavigation />

      {/* Main Content */}
      <main className="w-full max-w-[1440px] mx-auto px-8 py-7 space-y-6">
        {/* Welcome Header */}
        <div className="pt-2">
          <h1 className="text-3xl font-display font-semibold text-foreground leading-10">
            Welcome back, Crystal
          </h1>
        </div>

        {/* AI Chat Assistant */}
        <AIChatSection />

        {/* Accounts Overview */}
        <AccountsSection />

        {/* Message Center & Quick Links Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Message Center - Takes 2 columns */}
          <div className="lg:col-span-2">
            <MessageCenterWidget />
          </div>

          {/* Quick Links - Takes 1 column */}
          <QuickLinksSection />
        </div>

        {/* Recent Transactions */}
        <TransactionsAndLinks />

        {/* Info Cards Grid */}
        <InfoCardsSection />

        {/* Charts & Quick View */}
        <QuickViewSection />

        {/* Promotional Banner */}
        <PromoBanner />
      </main>

      <ConsumerFooter />
    </div>
  );
}
