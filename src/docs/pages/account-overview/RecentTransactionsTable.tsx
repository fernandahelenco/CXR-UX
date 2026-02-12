import { useState, useMemo, useEffect } from "react";
import { WexCard } from "@/components/wex/wex-card";
import { WexInput } from "@/components/wex/wex-input";
import { WexBadge } from "@/components/wex/wex-badge";
import { WexTable } from "@/components/wex/wex-table";
import { WexPagination } from "@/components/wex/wex-pagination";
import { Search, ArrowDown } from "lucide-react";
import { transactionsData, type Transaction } from "./mockData";
import { TransactionDetailSheet } from "./TransactionDetailSheet";

/**
 * Recent Transactions Table Component
 * 
 * Data table with:
 * - Search input
 * - Sortable table headers
 * - Status badges (Pending=warning, Complete=success)
 * - Amount formatting (green for positive)
 * - Pagination controls
 * - Click to open transaction detail sheet
 */
export function RecentTransactionsTable() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsSheetOpen(true);
  };

  // Filter transactions based on search query
  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) return transactionsData;
    
    const query = searchQuery.toLowerCase();
    return transactionsData.filter((transaction) => {
      return (
        transaction.date.toLowerCase().includes(query) ||
        transaction.status.toLowerCase().includes(query) ||
        transaction.account.toLowerCase().includes(query) ||
        transaction.description.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query) ||
        transaction.amount.toLowerCase().includes(query) ||
        (transaction.subtext?.toLowerCase().includes(query) ?? false)
      );
    });
  }, [searchQuery]);

  // Pagination calculations
  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

  // Reset to page 1 when search query changes
  useEffect(() => {
    queueMicrotask(() => setCurrentPage(1));
  }, [searchQuery]);

  return (
    <>
      <WexCard>
        <WexCard.Content className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Recent Transactions
              </h2>
              <div className="w-[332px]">
                <WexInput
                  inputSize="md"
                  type="text"
                  placeholder="Search"
                  leftIcon={<Search className="h-4 w-4" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <WexTable>
                <WexTable.Header>
                  <WexTable.Row>
                    <WexTable.Head>
                      <div className="flex items-center gap-1">
                        Date
                        <ArrowDown className="h-3 w-3" />
                      </div>
                    </WexTable.Head>
                    <WexTable.Head>Status</WexTable.Head>
                    <WexTable.Head>Account</WexTable.Head>
                    <WexTable.Head>Description</WexTable.Head>
                    <WexTable.Head>Category</WexTable.Head>
                    <WexTable.Head className="text-right">Amount</WexTable.Head>
                  </WexTable.Row>
                </WexTable.Header>
                <WexTable.Body>
                  {paginatedTransactions.map((transaction) => (
                    <TransactionRow 
                      key={transaction.id} 
                      transaction={transaction}
                      onClick={() => handleRowClick(transaction)}
                    />
                  ))}
                </WexTable.Body>
              </WexTable>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <WexPagination.RowsPerPage
                value={rowsPerPage}
                onChange={(value) => {
                  setRowsPerPage(value);
                  setCurrentPage(1);
                }}
                options={[10, 25, 50]}
              />
              
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
                        setCurrentPage((p) => Math.max(1, p - 1));
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
                        setCurrentPage((p) => Math.min(totalPages, p + 1));
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

              <WexPagination.PageReport
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={rowsPerPage}
              />
            </div>
          </div>
        </WexCard.Content>
      </WexCard>

      {/* Transaction Detail Sheet */}
      <TransactionDetailSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        transaction={selectedTransaction}
      />
    </>
  );
}

/**
 * Transaction Row Component
 */
function TransactionRow({ 
  transaction, 
  onClick 
}: { 
  transaction: Transaction;
  onClick: () => void;
}) {
  return (
    <WexTable.Row 
      className="cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <WexTable.Cell>{transaction.date}</WexTable.Cell>
      <WexTable.Cell>
        <WexBadge 
          intent={transaction.status === "Pending" ? "warning" : "success"}
          className="text-xs"
        >
          {transaction.status}
        </WexBadge>
      </WexTable.Cell>
      <WexTable.Cell>{transaction.account}</WexTable.Cell>
      <WexTable.Cell>
        <div className="flex flex-col">
          <span>{transaction.description}</span>
          {transaction.subtext && (
            <span className="text-xs text-muted-foreground">{transaction.subtext}</span>
          )}
        </div>
      </WexTable.Cell>
      <WexTable.Cell>{transaction.category}</WexTable.Cell>
      <WexTable.Cell className={`text-right ${transaction.isPositive ? "text-success" : ""}`}>
        {transaction.amount}
      </WexTable.Cell>
    </WexTable.Row>
  );
}
