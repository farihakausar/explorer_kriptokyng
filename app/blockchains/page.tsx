"use client";

import { useState } from "react";
import { Search, ArrowLeft, ArrowRight, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/Site";
import { useLanguage } from "@/contexts/language-context";
import { useAllBlockchains } from "@/lib/hooks/use-blockchain-data";
import { CoinIcon } from "@/components/ui/coin-icon";

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
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Fetch blockchain data using the hook
  const { data: allBlockchains, isLoading, error } = useAllBlockchains();

  // Filter blockchains based on search term
  const filteredBlockchains = allBlockchains?.filter(blockchain => 
    blockchain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blockchain.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Sort blockchains
  const sortedBlockchains = [...filteredBlockchains].sort((a, b) => {
    let aValue: any;
    let bValue: any;
    
    switch (sortField) {
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case "symbol":
        aValue = a.symbol.toLowerCase();
        bValue = b.symbol.toLowerCase();
        break;
      case "blockHeight":
        aValue = a.blockHeight;
        bValue = b.blockHeight;
        break;
      case "age":
        aValue = a.age;
        bValue = b.age;
        break;
      case "transactions":
        aValue = a.transactions;
        bValue = b.transactions;
        break;
      case "difficulty":
        aValue = parseFloat(a.difficulty.replace(/[^\d.]/g, "")) || 0;
        bValue = parseFloat(b.difficulty.replace(/[^\d.]/g, "")) || 0;
        break;
      case "price":
        aValue = parseFloat(a.price.replace(/[^\d.]/g, "")) || 0;
        bValue = parseFloat(b.price.replace(/[^\d.]/g, "")) || 0;
        break;
      case "marketCap":
        aValue = parseFloat(a.marketCap.replace(/[^\d.]/g, "")) || 0;
        bValue = parseFloat(b.marketCap.replace(/[^\d.]/g, "")) || 0;
        break;
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
    }
    
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedBlockchains.length / ITEMS_PER_PAGE);
  const paginatedBlockchains = sortedBlockchains.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleDetails = (id: number) => {
    setShowDetails(showDetails === id ? null : id);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ChevronUp className="w-4 h-4 text-gray-400" />;
    }
    return sortDirection === "asc" ? 
      <ChevronUp className="w-4 h-4 text-orange-400" /> : 
      <ChevronDown className="w-4 h-4 text-orange-400" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("blockchain.title")}</h1>
          </div>
          <div className="relative w-full sm:w-64">
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

        <div className="bg-white dark:bg-[#1a1a1a] shadow overflow-hidden rounded-lg border border-gray-200 dark:border-[#2a2a2a]">

          {isLoading ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">{t("blockchain.loading_data")}</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-500 dark:text-red-400">{t("blockchain.error_loading_data")}: {(error as Error).message}</p>
            </div>
          ) : (
            <div>
              {/* Mobile Card Layout */}
              <div className="sm:hidden">
                {paginatedBlockchains.map((blockchain) => (
                  <Link 
                    key={blockchain.id}
                    href={`/blockchains/${blockchain.id}`}
                    className="block bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-4 mb-3 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
                  >
                    <div className="flex items-center mb-3">
                      <div className="relative">
                        <CoinIcon
                          symbol={blockchain.symbol.toLowerCase()}
                          name={blockchain.name}
                          size={40}
                          className="w-10 h-10"
                        />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#1a1a1a]"></div>
                      </div>
                      <div className="ml-3">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{blockchain.name}</div>
                        <div className="text-sm text-gray-500 dark:text-[#9ca3af]">({blockchain.symbol})</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-gray-500 dark:text-[#9ca3af] mb-1">{t("blockchain.block_height")}</div>
                        <div className="font-mono text-gray-900 dark:text-[#e5e7eb]">{blockchain.blockHeight.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 dark:text-[#9ca3af] mb-1">{t("blockchain.age")}</div>
                        <div className="text-gray-900 dark:text-[#e5e7eb]">{blockchain.age}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 dark:text-[#9ca3af] mb-1">{t("blockchain.transactions")}</div>
                        <div className="text-gray-900 dark:text-[#e5e7eb]">{blockchain.transactions.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 dark:text-[#9ca3af] mb-1">{t("blockchain.price")}</div>
                        <div className="font-semibold text-gray-900 dark:text-white">{blockchain.price}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-[#2a2a2a]">
                      <div className="flex justify-between text-xs text-gray-500 dark:text-[#9ca3af]">
                        <span>{t("blockchain.difficulty_column")}: {blockchain.difficulty}</span>
                        <span>{t("blockchain.market_cap_column")}: {blockchain.marketCap}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Desktop Table Layout */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-[#2a2a2a]">
                    <tr>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9ca3af] uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center gap-2">
                          {t("blockchain.crypto_currency")}
                          {getSortIcon("name")}
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9ca3af] uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => handleSort("blockHeight")}
                      >
                        <div className="flex items-center gap-2">
                          {t("blockchain.block_height")}
                          {getSortIcon("blockHeight")}
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9ca3af] uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => handleSort("age")}
                      >
                        <div className="flex items-center gap-2">
                          {t("blockchain.age")}
                          {getSortIcon("age")}
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9ca3af] uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => handleSort("transactions")}
                      >
                        <div className="flex items-center gap-2">
                          {t("blockchain.transactions")}
                          {getSortIcon("transactions")}
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9ca3af] uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => handleSort("difficulty")}
                      >
                        <div className="flex items-center gap-2">
                          {t("blockchain.difficulty_column")}
                          {getSortIcon("difficulty")}
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9ca3af] uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => handleSort("price")}
                      >
                        <div className="flex items-center gap-2">
                          {t("blockchain.price")}
                          {getSortIcon("price")}
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#9ca3af] uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => handleSort("marketCap")}
                      >
                        <div className="flex items-center gap-2">
                          {t("blockchain.market_cap_column")}
                          {getSortIcon("marketCap")}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#1a1a1a] divide-y divide-gray-200 dark:divide-[#2a2a2a]">
                    {paginatedBlockchains.map((blockchain) => (
                      <tr 
                        key={blockchain.id}
                        className="hover:bg-gray-50 dark:hover:bg-[#2a2a2a] cursor-pointer transition-colors"
                        onClick={() => window.location.href = `/blockchains/${blockchain.id}`}
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <CoinIcon
                                symbol={blockchain.symbol.toLowerCase()}
                                name={blockchain.name}
                                size={32}
                                className="w-8 h-8"
                              />
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#1a1a1a]"></div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{blockchain.name}</div>
                              <div className="text-xs text-gray-500 dark:text-[#9ca3af]">({blockchain.symbol})</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-[#e5e7eb] font-mono">
                          {blockchain.blockHeight.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-[#9ca3af]">
                          {blockchain.age}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-[#e5e7eb]">
                          {blockchain.transactions.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-[#e5e7eb] font-mono">
                          {blockchain.difficulty}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {blockchain.price}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-[#e5e7eb]">
                          {blockchain.marketCap}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {allBlockchains && allBlockchains.length > 0 && (
            <div className="bg-white dark:bg-[#1a1a1a] px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 dark:border-[#2a2a2a] gap-3">
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-[#9ca3af] text-center sm:text-left">
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
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#2a2a2a] text-sm font-medium text-gray-500 dark:text-[#9ca3af] hover:bg-gray-50 dark:hover:bg-[#3a3a3a] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  
                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage <= 2) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 1) {
                      pageNum = totalPages - 2 + i;
                    } else {
                      pageNum = currentPage - 1 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`relative inline-flex items-center px-3 py-2 border text-sm font-medium ${
                          currentPage === pageNum
                            ? 'z-10 bg-orange-500 text-white border-orange-500'
                            : 'bg-white dark:bg-[#2a2a2a] hover:bg-gray-50 dark:hover:bg-[#3a3a3a] border-gray-300 dark:border-[#2a2a2a] text-gray-700 dark:text-[#e5e7eb]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#2a2a2a] text-sm font-medium text-gray-500 dark:text-[#9ca3af] hover:bg-gray-50 dark:hover:bg-[#3a3a3a] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>


        {allBlockchains && allBlockchains.length > 0 && (
          <div className="mt-8 bg-white dark:bg-[#1a1a1a] shadow overflow-hidden rounded-lg border border-gray-200 dark:border-[#2a2a2a]">
            <div className="px-4 py-4 sm:px-6 border-b border-gray-200 dark:border-[#2a2a2a]">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t("blockchain.disclaimer")}</h3>
            </div>
            <div className="px-4 py-4 sm:px-6">
              <p className="text-gray-600 dark:text-[#9ca3af] mb-4 text-sm leading-relaxed">
                {t("blockchain.disclaimer_text")}
              </p>
              <p className="text-gray-600 dark:text-[#9ca3af] text-sm">
                Please review our full <a href="/terms" className="text-orange-400 hover:text-orange-300 font-medium">{t("blockchain.terms_of_service")}</a> for more information.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
