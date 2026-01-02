import { useNavigate } from "react-router-dom";
import { WexCard } from "@/components/wex/wex-card";
import { WexButton } from "@/components/wex/wex-button";
import { WexSeparator } from "@/components/wex/wex-separator";
import { ChevronRight } from "lucide-react";
import { transactionsData, quickLinksData } from "./mockData";

/**
 * Transactions and Quick Links Section
 * 
 * Two-column layout with:
 * - Left: Recent Transactions list
 * - Right: Quick Links grid
 */
export function TransactionsAndLinks() {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent Transactions - Takes 2 columns on large screens */}
      <div className="lg:col-span-2">
        <WexCard>
          <WexCard.Content className="p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-semibold text-foreground">
                  Recent Transactions
                </h2>
                <WexButton 
                  intent="link" 
                  size="md"
                  className="px-0"
                  onClick={() => {
                    navigate("/account-overview");
                  }}
                >
                  View All Transactions
                  <ChevronRight className="h-4 w-4" />
                </WexButton>
              </div>

              {/* Transactions List */}
              <div className="space-y-0">
                {transactionsData.map((transaction, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start py-4">
                      {/* Left: Date and Merchant */}
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground mb-1">
                          {transaction.date}
                        </div>
                        <div className="text-base font-display font-medium">
                          {transaction.merchant}
                        </div>
                      </div>

                      {/* Right: Account and Amount */}
                      <div className="text-right ml-4">
                        <div className="text-sm text-muted-foreground mb-1">
                          {transaction.account}
                        </div>
                        <div className={`text-base font-display font-medium ${
                          transaction.amount.startsWith('-') 
                            ? 'text-foreground' 
                            : 'text-success'
                        }`}>
                          {transaction.amount}
                        </div>
                      </div>
                    </div>
                    {index < transactionsData.length - 1 && <WexSeparator />}
                  </div>
                ))}
              </div>
            </div>
          </WexCard.Content>
        </WexCard>
      </div>

      {/* Quick Links - Takes 1 column on large screens */}
      <div className="h-full">
        <WexCard className="h-full">
          <WexCard.Content className="p-6 h-full">
            <div className="space-y-6">
              {/* Header */}
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Quick Links
              </h2>

              {/* Quick Links Grid */}
              <div className="flex flex-wrap gap-2">
                {quickLinksData.map((link, index) => (
                  <WexButton
                    key={index}
                    intent="ghost"
                    size="md"
                    className="rounded-[32px] bg-info/10 text-primary hover:bg-info/20 shrink-0 h-auto py-1"
                  >
                    {link.label}
                  </WexButton>
                ))}
              </div>
            </div>
          </WexCard.Content>
        </WexCard>
      </div>
    </div>
  );
}

