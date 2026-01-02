import { useNavigate } from "react-router-dom";
import { WexCard } from "@/components/wex/wex-card";
import { WexButton } from "@/components/wex/wex-button";
import { WexSeparator } from "@/components/wex/wex-separator";
import { ChevronRight, Clock, TrendingUp, Plus } from "lucide-react";
import { hsaAccountData, fsaAccountData } from "./mockData";

/**
 * Accounts Section Component
 * 
 * Displays HSA and FSA account cards with new design:
 * - Section header with action buttons
 * - Two cards side-by-side with detailed account information
 * - HSA card: Total account value, cash, investments, contribute button
 * - FSA card: Available balance, time remaining, file claim button
 */
export function AccountsSection() {
  const navigate = useNavigate();
  
  return (
    <WexCard>
      <WexCard.Content className="p-6">
        <div className="space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-semibold text-foreground">
              Accounts
            </h2>
            <div className="flex items-center gap-4">
              <WexButton 
                intent="link" 
                size="md"
                onClick={() => {
                  navigate("/account-overview");
                }}
              >
                View All Accounts
                <ChevronRight className="h-4 w-4" />
              </WexButton>
              <WexButton intent="destructive" size="md">
                Reimburse Myself
              </WexButton>
            </div>
          </div>

          {/* Account Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* HSA Card */}
            <WexCard>
              <WexCard.Content className="p-0">
                {/* Top Section */}
                <div className="p-4 space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-display font-bold text-foreground">
                        {hsaAccountData.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {hsaAccountData.subtitle}
                      </p>
                    </div>
                    <WexButton
                      intent="link"
                      size="sm"
                      className="h-auto px-0 font-medium"
                      onClick={() => {
                        navigate("/account-overview");
                      }}
                    >
                      Details
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </WexButton>
                  </div>

                  {/* Total Account Value */}
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-bold text-muted-foreground tracking-wide">
                      TOTAL ACCOUNT VALUE
                    </div>
                    <div className="text-2xl font-display font-bold text-foreground leading-tight">
                      {hsaAccountData.totalAccountValue}
                    </div>
                  </div>
                </div>

                <WexSeparator />

                {/* Bottom Section - Two Column Layout */}
                <div className="grid grid-cols-2">
                  {/* Left Column - Available Cash */}
                  <div className="p-4 space-y-4">
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-bold text-muted-foreground tracking-wide uppercase">
                        CASH ACCOUNT
                      </div>
                      <div className="text-lg font-display font-bold text-foreground">
                        {hsaAccountData.availableCash}
                      </div>
                    </div>
                    <WexButton 
                      intent="outline" 
                      size="sm" 
                      className="w-full h-9 text-sm font-medium rounded-lg"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Contribute
                    </WexButton>
                  </div>

                  {/* Right Column - Investments */}
                  <div className="p-4 space-y-4 border-l border-border">
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-bold text-muted-foreground tracking-wide">
                        INVESTMENTS
                      </div>
                      <div className="text-lg font-display font-bold text-foreground">
                        {hsaAccountData.investments}
                      </div>
                    </div>
                    <div className="flex items-center pt-1">
                      <WexButton
                        intent="link"
                        size="sm"
                        className="h-auto px-0 text-muted-foreground hover:text-foreground font-normal text-xs"
                      >
                        <TrendingUp className="h-3.5 w-3.5 mr-1.5 opacity-60" />
                        Performance view
                      </WexButton>
                    </div>
                  </div>
                </div>
              </WexCard.Content>
            </WexCard>

            {/* FSA Card */}
            <WexCard>
              <WexCard.Content className="p-0">
                {/* Top Section */}
                <div className="p-4 space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-display font-bold text-foreground">
                        {fsaAccountData.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {fsaAccountData.subtitle}
                      </p>
                    </div>
                    <WexButton
                      intent="link"
                      size="sm"
                      className="h-auto px-0 font-medium"
                      onClick={() => {
                        navigate("/account-overview");
                      }}
                    >
                      Details
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </WexButton>
                  </div>

                  {/* Available Balance */}
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-bold text-muted-foreground tracking-wide">
                      AVAILABLE BALANCE
                    </div>
                    <div className="text-2xl font-display font-bold text-foreground leading-tight">
                      {fsaAccountData.availableBalance}
                    </div>
                  </div>
                </div>

                <WexSeparator />

                {/* Bottom Section - Two Column Layout */}
                <div className="grid grid-cols-2">
                  {/* Left Column - Use Your Funds */}
                  <div className="p-4 space-y-4">
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-bold text-muted-foreground tracking-wide uppercase">
                        Use Your Funds
                      </div>
                      <div className="text-xs text-foreground">
                        {fsaAccountData.useYourFundsText}
                      </div>
                    </div>
                    <WexButton 
                      intent="outline" 
                      size="sm" 
                      className="w-full h-9 text-sm font-medium rounded-lg"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      File Claim
                    </WexButton>
                  </div>

                  {/* Right Column - Time Remaining */}
                  <div className="p-4 space-y-4 border-l border-border">
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-bold text-muted-foreground tracking-wide uppercase">
                        DAY(S) LEFT TO SPEND
                      </div>
                      <div className="text-lg font-display font-bold text-foreground">
                        {fsaAccountData.timeRemaining} days
                      </div>
                    </div>
                    <div className="flex items-center pt-1">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#C2410C]" />
                        <span className="text-xs text-[#C2410C] font-medium">
                          Use it or lose it
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </WexCard.Content>
            </WexCard>
          </div>
        </div>
      </WexCard.Content>
    </WexCard>
  );
}

