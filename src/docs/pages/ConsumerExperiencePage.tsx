import { ConsumerNavigation } from "./consumer/ConsumerNavigation";
import { AIChatSection } from "./consumer/AIChatSection";
import { AccountsSection } from "./consumer/AccountsSection";
import { TasksSection } from "./consumer/TasksSection";
import { TransactionsAndLinks } from "./consumer/TransactionsAndLinks";
import { InfoCardsSection } from "./consumer/InfoCardsSection";
import { QuickViewSection } from "./consumer/QuickViewSection";
import { PromoBanner } from "./consumer/PromoBanner";

/**
 * Consumer Experience Page
 * 
 * Standalone page showcasing consumer-facing features:
 * - Custom navigation header (bypasses DocsLayout)
 * - AI-powered chat interface
 * - Account management (HSA/FSA)
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

        {/* Pending Tasks */}
        <TasksSection />

        {/* Transactions & Quick Links */}
        <TransactionsAndLinks />

        {/* Info Cards Grid */}
        <InfoCardsSection />

        {/* Charts & Quick View */}
        <QuickViewSection />

        {/* Promotional Banner */}
        <PromoBanner />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-12">
        <div className="w-full max-w-[1440px] mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
              <span className="text-muted">•</span>
              <a href="#" className="hover:text-foreground transition-colors">Disclaimer</a>
              <span className="text-muted">•</span>
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <span className="text-muted">•</span>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Use</a>
            </div>
            <div className="text-center md:text-right">
              <p>WEX Health, Inc. 2025-2028. All rights reserved. Powered by WEX Health.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

