"use client";

import { useState } from "react";
import { Search, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/Site";
import { useLanguage } from "@/contexts/language-context";
import { useAllBlockchains } from "@/lib/hooks/use-blockchain-data";

interface Blockchain {
  id: number;
  name: string;
  symbol: string;
  blockHeight: number;
  age: string;
  transactions: number;
  difficulty: string;
  price: string;
  marketCap: string;
  algorithm?: string;
  blockTime?: string;
  status?: string;
  minPayout?: number | string;
  fee?: string;
  website?: string;
}

const ITEMS_PER_PAGE = 10;

export default function BlockchainsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetails, setShowDetails] = useState<number | null>(null);

  // Fetch blockchain data using the hook
  const { data: allBlockchains, isLoading, error } = useAllBlockchains();

  // Filter blockchains based on search term
  const filteredBlockchains = allBlockchains?.filter(blockchain => 
    blockchain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blockchain.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const totalPages = Math.ceil(filteredBlockchains.length / ITEMS_PER_PAGE);
  const paginatedBlockchains = filteredBlockchains.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleDetails = (id: number) => {
    setShowDetails(showDetails === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("blockchain.title")}</h1>
          </div>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={t("blockchain.search")}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">

          {isLoading ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">{t("blockchain.loading_data")}</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-500 dark:text-red-400">{t("blockchain.error_loading_data")}: {(error as Error).message}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("blockchain.crypto_currency")}</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("blockchain.block_height")}</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("blockchain.age")}</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("blockchain.transactions")}</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("blockchain.difficulty_column")}</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("blockchain.price")}</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t("blockchain.market_cap_column")}</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {paginatedBlockchains.map((blockchain) => (
                    <tr 
                      key={blockchain.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => window.location.href = `/blockchains/${blockchain.id}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-muted text-foreground font-medium">
                            {blockchain.symbol[0]}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{blockchain.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{blockchain.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-gray-100 font-mono">
                        {blockchain.blockHeight.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                        {blockchain.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                        {blockchain.transactions.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white font-mono">
                        {blockchain.difficulty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900 dark:text-white">
                        {blockchain.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                        {blockchain.marketCap}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {allBlockchains && allBlockchains.length > 0 && (
            <div className="bg-white dark:bg-gray-800 px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {t("blockchain.showing_results")
                      .replace('{{start}}', String((currentPage - 1) * ITEMS_PER_PAGE + 1))
                      .replace('{{end}}', String(Math.min(currentPage * ITEMS_PER_PAGE, filteredBlockchains.length)))
                      .replace('{{total}}', String(filteredBlockchains.length))}
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1 || totalPages === 0}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-border bg-background text-sm font-medium text-muted-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
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
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === pageNum
                              ? 'z-10 bg-foreground text-background border-foreground'
                              : 'bg-background hover:bg-muted border-border text-foreground'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-border bg-background text-sm font-medium text-muted-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>


        {allBlockchains && allBlockchains.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-6 py-5 border-b">
              <h3 className="text-lg font-medium">{t("blockchain.disclaimer")}</h3>
            </div>
            <div className="px-6 py-5">
              <p className="text-muted-foreground mb-4">
                {t("blockchain.disclaimer_text")}
              </p>
              <p className="text-muted-foreground">
                Please review our full <a href="/terms" className="text-primary hover:underline font-medium">{t("blockchain.terms_of_service")}</a> for more information.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
