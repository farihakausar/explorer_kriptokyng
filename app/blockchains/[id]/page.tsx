"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useBlockchainDetail, useBlockchainBlocks, useBlockchainRichList, useBlockchainOverview, useBlockchainExtraction, useBlockchainNetwork, useBlockchainMarket } from "@/lib/hooks/use-blockchain-data";

// Helper function to translate with parameters
const translateWithParams = (str: string, params: Record<string, string>): string => {
  let result = str;
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  return result;
};

// ---------------------------------------------------------
// DYNAMIC BLOCKCHAIN HEADER DATA
// ---------------------------------------------------------

// ---------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------

export default function BlockchainExplorer({ params }: { params: { id: string } }) {
  const { t } = useLanguage();
  const blockchainId = params.id;
  
  // Fetch blockchain data using the hooks
  const { data: blockchain, isLoading, error } = useBlockchainDetail(blockchainId);
  const { data: blocks, isLoading: blocksLoading } = useBlockchainBlocks(blockchainId);
  const { data: richList, isLoading: richListLoading } = useBlockchainRichList(blockchainId);
  const { data: overview, isLoading: overviewLoading } = useBlockchainOverview(blockchainId);
  const { data: extraction, isLoading: extractionLoading } = useBlockchainExtraction(blockchainId);
  const { data: network, isLoading: networkLoading } = useBlockchainNetwork(blockchainId);
  const { data: market, isLoading: marketLoading } = useBlockchainMarket(blockchainId);
  
  const [tab, setTab] = useState<"blocks" | "richlist" | "overview" | "extraction" | "network" | "market" | "difficulty" | "inflation" | "about">("blocks");

  return (
    <div className="container mx-auto px-4 py-10">

      {/* BACK LINK */}
      <Link href="/blockchains" className="inline-flex items-center text-primary mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("blockchain.back_to_blockchains")}
      </Link>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <p className="text-muted-foreground">{t("blockchain.loading_data")}</p>
        </div>
      ) : error ? (
        <div className="flex justify-center py-10">
          <p className="text-red-500">{t("blockchain.error_loading_data")}: {(error as Error).message}</p>
        </div>
      ) : blockchain ? (
        <>
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{blockchain.name}</h1>
                <span className="px-3 py-1 text-sm rounded-full bg-muted">{blockchain.symbol}</span>
              </div>
              <p className="text-muted-foreground mt-1">{t("blockchain.blockchain_explorer")}</p>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href={blockchain.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border rounded-md hover:bg-muted transition"
              >
                {t("blockchain.visit_website")}
              </a>
            </div>
          </div>

          {/* TOP STATS */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            <Stat title={t("blockchain.btc_price")} value={blockchain.price} />
            <Stat title={t("blockchain.usd_price")} value={blockchain.usdPrice} />
            <Stat title={t("blockchain.market_cap")} value={blockchain.marketCap} />
            <Stat title={t("blockchain.hashrate")} value={blockchain.hashrate} />
            <Link href={`/difficulty`} className="block">
              <Stat 
                title={t("blockchain.difficulty")} 
                value={blockchain.difficulty} 
                className="hover:bg-muted/50 rounded-md p-2 -m-2 transition-colors cursor-pointer"
              />
            </Link>
            <Link href={`/inflation`} className="block">
              <Stat 
                title={t("blockchain.outstanding")} 
                value={blockchain.outstanding} 
                className="hover:bg-muted/50 rounded-md p-2 -m-2 transition-colors cursor-pointer"
              />
            </Link>
          </div>
        </>
      ) : null}

      {/* TABS */}
      <div className="flex gap-4 border-b mb-8">
        <TabButton active={tab === "blocks"} onClick={() => setTab("blocks")}>{t("blockchain.latest_blocks")}</TabButton>
        <TabButton active={tab === "richlist"} onClick={() => setTab("richlist")}>{t("blockchain.rich_list")}</TabButton>
        <TabButton active={tab === "overview"} onClick={() => setTab("overview")}>{t("blockchain.overview")}</TabButton>
        <TabButton active={tab === "extraction"} onClick={() => setTab("extraction")}>{t("blockchain.extraction")}</TabButton>
        <TabButton active={tab === "network"} onClick={() => setTab("network")}>{t("blockchain.network")}</TabButton>
        <TabButton active={tab === "market"} onClick={() => setTab("market")}>{t("blockchain.market")}</TabButton>
        <TabButton active={tab === "about"} onClick={() => setTab("about")}>{t("blockchain.about")}</TabButton>
      </div>

      {/* TAB CONTENT */}
      {tab === "blocks" && (
        <>
          <SectionTitle title={t("blockchain.latest_btc_blocks")} />
          <TableLatestBlocks blockchainId={params.id} t={t} />
        </>
      )}

      {tab === "richlist" && (
        <>
          <SectionTitle title={t("blockchain.richest_btc_addresses")} />
          <TableRichList t={t} />
        </>
      )}

      {tab === "overview" && (
        <>
          <SectionTitle title={t("blockchain.overview_daily_stats")} />
          <TableOverview t={t} />
        </>
      )}

      {tab === "extraction" && (
        <>
          <SectionTitle title={t("blockchain.hashrate_distribution")} />
          <TableExtraction t={t} />
        </>
      )}

      {tab === "network" && (
        <>
          <SectionTitle title={t("blockchain.network_clients")} />
          <TableNetwork t={t} />
        </>
      )}

      {tab === "market" && (
        <>
          <SectionTitle title={t("blockchain.markets_exchanges")} />
          <TableMarket t={t} />
        </>
      )}

      {tab === "difficulty" && (
        <div className="space-y-6">
          <SectionTitle title={t("blockchain.network_difficulty")} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted/30 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">{t("blockchain.current_difficulty")}</h3>
              <p className="text-3xl font-bold">{blockchain?.difficulty || 'N/A'}</p>
              <p className="text-muted-foreground mt-2">
                {translateWithParams(t("blockchain.current_difficulty_desc"), { currency: blockchain?.symbol || 'N/A' })}
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">{t("blockchain.outstanding_supply")}</h3>
              <p className="text-3xl font-bold">{blockchain?.outstanding || 'N/A'}</p>
              <p className="text-muted-foreground mt-2">
                {translateWithParams(t("blockchain.outstanding_supply_desc"), { currency: blockchain?.symbol || 'N/A' })}
              </p>
            </div>
          </div>
          <div className="bg-muted/30 p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">{t("blockchain.difficulty_chart")}</h3>
            <div className="h-80 bg-muted/50 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">{t("blockchain.difficulty_chart_placeholder")}</p>
            </div>
          </div>
        </div>
      )}

      {tab === "inflation" && (
        <div className="space-y-6">
          <SectionTitle title={t("blockchain.inflation_supply")} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted/30 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">{t("blockchain.current_inflation_rate")}</h3>
              <p className="text-3xl font-bold">~1.8%</p>
              <p className="text-muted-foreground mt-2">
                {translateWithParams(t("blockchain.current_inflation_desc"), { currency: blockchain?.symbol || 'N/A' })}
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">{t("blockchain.next_halving")}</h3>
              <p className="text-3xl font-bold">~April 2024</p>
              <p className="text-muted-foreground mt-2">
                {t("blockchain.next_halving_desc")}
              </p>
            </div>
          </div>
          <div className="bg-muted/30 p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">{t("blockchain.inflation_chart")}</h3>
            <div className="h-80 bg-muted/50 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">{t("blockchain.inflation_chart_placeholder")}</p>
            </div>
          </div>
        </div>
      )}

      {tab === "about" && (
        <>
          <SectionTitle title={t("blockchain.about_bitcoin")} />
          <TableAbout t={t} />
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------
// TABLE COMPONENTS
// ---------------------------------------------------------

function TableLatestBlocks({ blockchainId, t }: { blockchainId: string; t: (key: string) => string }) {
  const { data: blocks, isLoading, error } = useBlockchainBlocks(blockchainId);
  
  if (isLoading) {
    return (
      <div className="overflow-x-auto mb-16">
        <table className="w-full text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>
              <th className="py-2">{t("blockchain.block_height")}</th>
              <th>{t("blockchain.age")}</th>
              <th>{t("blockchain.transactions")}</th>
              <th>{t("blockchain.value_out")}</th>
              <th>{t("blockchain.difficulty_column")}</th>
              <th>{t("blockchain.extracted_by")}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b last:border-none hover:bg-muted/50">
              <td className="py-2" colSpan={6}>
                <div className="text-center py-4 text-muted-foreground">
                  {t("blockchain.loading_data")}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  if (error || !blocks || blocks.length === 0) {
    return (
      <div className="overflow-x-auto mb-16">
        <table className="w-full text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>
              <th className="py-2">{t("blockchain.block_height")}</th>
              <th>{t("blockchain.age")}</th>
              <th>{t("blockchain.transactions")}</th>
              <th>{t("blockchain.value_out")}</th>
              <th>{t("blockchain.difficulty_column")}</th>
              <th>{t("blockchain.extracted_by")}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b last:border-none hover:bg-muted/50">
              <td className="py-2" colSpan={6}>
                <div className="text-center py-4 text-muted-foreground">
                  {t("blockchain.no_data_available")}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto mb-16">
      <table className="w-full text-sm">
        <thead className="border-b text-muted-foreground">
          <tr>
            <th className="py-2">{t("blockchain.block_height")}</th>
            <th>{t("blockchain.age")}</th>
            <th>{t("blockchain.transactions")}</th>
            <th>{t("blockchain.value_out")}</th>
            <th>{t("blockchain.difficulty_column")}</th>
            <th>{t("blockchain.extracted_by")}</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block, i) => (
            <tr key={i} className="border-b last:border-none hover:bg-muted/50">
              <td className="py-2">
                <Link href={`/blockchains/${blockchainId}/blocks/${block.height}`} className="text-primary hover:underline">
                  {block.height.toLocaleString()}
                </Link>
              </td>
              <td>{block.age}</td>
              <td>{block.tx.toLocaleString()}</td>
              <td>{block.value}</td>
              <td>{block.difficulty}</td>
              <td className="text-primary">{block.minedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableRichList({ t }: { t: (key: string) => string }) {
  const { data: richList, isLoading, error } = useBlockchainRichList(''); // Empty string for now since we don't have blockchain-specific rich list data
  
  if (isLoading) {
    return (
      <div className="overflow-x-auto mb-16">
        <table className="w-full text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>
              <th className="py-2">{t("blockchain.rank")}</th>
              <th>{t("blockchain.address")}</th>
              <th>{t("blockchain.amount")}</th>
              <th>{t("blockchain.percent")}</th>
              <th>{t("blockchain.last_change")}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b last:border-none">
              <td className="py-2" colSpan={5}>
                <div className="text-center py-4 text-muted-foreground">
                  {t("blockchain.loading_data")}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  if (error || !richList || richList.length === 0) {
    return (
      <div className="overflow-x-auto mb-16">
        <table className="w-full text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>
              <th className="py-2">{t("blockchain.rank")}</th>
              <th>{t("blockchain.address")}</th>
              <th>{t("blockchain.amount")}</th>
              <th>{t("blockchain.percent")}</th>
              <th>{t("blockchain.last_change")}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b last:border-none">
              <td className="py-2" colSpan={5}>
                <div className="text-center py-4 text-muted-foreground">
                  {t("blockchain.no_data_available")}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto mb-16">
      <table className="w-full text-sm">
        <thead className="border-b text-muted-foreground">
          <tr>
            <th className="py-2">{t("blockchain.rank")}</th>
            <th>{t("blockchain.address")}</th>
            <th>{t("blockchain.amount")}</th>
            <th>{t("blockchain.percent")}</th>
            <th>{t("blockchain.last_change")}</th>
          </tr>
        </thead>
        <tbody>
          {richList.map((entry, i) => (
            <tr key={i} className="border-b last:border-none">
              <td className="py-2">{entry.rank}</td>
              <td className="text-primary">{entry.address}</td>
              <td>{entry.amount}</td>
              <td>{entry.pct}</td>
              <td>{entry.last}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableOverview({ t }: { t: (key: string) => string }) {
  const { data: overview, isLoading, error } = useBlockchainOverview(''); // Empty string for now
  
  if (isLoading) {
    return (
      <div className="overflow-x-auto mb-16">
        <table className="w-full text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>
              <th className="py-2">{t("blockchain.date_time")}</th>
              <th>{t("blockchain.blocks")}</th>
              <th>{t("blockchain.height")}</th>
              <th>{t("blockchain.interval")}</th>
              <th>{t("blockchain.transactions")}</th>
              <th>{t("blockchain.value_out")}</th>
              <th>{t("blockchain.difficulty_column")}</th>
              <th>{t("blockchain.generated")}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b last:border-none">
              <td className="py-2" colSpan={8}>
                <div className="text-center py-4 text-muted-foreground">
                  {t("blockchain.loading_data")}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  if (error || !overview || overview.length === 0) {
    return (
      <div className="overflow-x-auto mb-16">
        <table className="w-full text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>
              <th className="py-2">{t("blockchain.date_time")}</th>
              <th>{t("blockchain.blocks")}</th>
              <th>{t("blockchain.height")}</th>
              <th>{t("blockchain.interval")}</th>
              <th>{t("blockchain.transactions")}</th>
              <th>{t("blockchain.value_out")}</th>
              <th>{t("blockchain.difficulty_column")}</th>
              <th>{t("blockchain.generated")}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b last:border-none">
              <td className="py-2" colSpan={8}>
                <div className="text-center py-4 text-muted-foreground">
                  {t("blockchain.no_data_available")}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto mb-16">
      <table className="w-full text-sm">
        <thead className="border-b text-muted-foreground">
          <tr>
            <th className="py-2">{t("blockchain.date_time")}</th>
            <th>{t("blockchain.blocks")}</th>
            <th>{t("blockchain.height")}</th>
            <th>{t("blockchain.interval")}</th>
            <th>{t("blockchain.transactions")}</th>
            <th>{t("blockchain.value_out")}</th>
            <th>{t("blockchain.difficulty_column")}</th>
            <th>{t("blockchain.generated")}</th>
          </tr>
        </thead>
        <tbody>
          {overview.map((row, i) => (
            <tr key={i} className="border-b last:border-none">
              <td className="py-2">{row.date}</td>
              <td>{row.blocks}</td>
              <td>{row.height}</td>
              <td>{row.interval}</td>
              <td>{row.tx.toLocaleString()}</td>
              <td>{row.value}</td>
              <td>{row.difficulty}</td>
              <td>{row.generated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableExtraction({ t }: { t: (key: string) => string }) {
  const { data: extraction, isLoading, error } = useBlockchainExtraction(''); // Empty string for now
  
  if (isLoading) {
    return (
      <div className="overflow-x-auto mb-16">
        <table className="w-full text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>
              <th className="py-2">{t("blockchain.rank")}</th>
              <th>{t("blockchain.pool_miner")}</th>
              <th>{t("blockchain.last_100")}</th>
              <th>{t("blockchain.last_1000")}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b last:border-none">
              <td className="py-2" colSpan={4}>
                <div className="text-center py-4 text-muted-foreground">
                  {t("blockchain.loading_data")}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  if (error || !extraction || extraction.length === 0) {
    return (
      <div className="overflow-x-auto mb-16">
        <table className="w-full text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>
              <th className="py-2">{t("blockchain.rank")}</th>
              <th>{t("blockchain.pool_miner")}</th>
              <th>{t("blockchain.last_100")}</th>
              <th>{t("blockchain.last_1000")}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b last:border-none">
              <td className="py-2" colSpan={4}>
                <div className="text-center py-4 text-muted-foreground">
                  {t("blockchain.no_data_available")}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto mb-16">
      <table className="w-full text-sm">
        <thead className="border-b text-muted-foreground">
          <tr>
            <th className="py-2">{t("blockchain.rank")}</th>
            <th>{t("blockchain.pool_miner")}</th>
            <th>{t("blockchain.last_100")}</th>
            <th>{t("blockchain.last_1000")}</th>
          </tr>
        </thead>
        <tbody>
          {extraction.map((row, i) => (
            <tr key={i} className="border-b last:border-none">
              <td className="py-2">{row.rank}</td>
              <td className="text-primary">{row.pool}</td>
              <td>{row.last100}</td>
              <td>{row.last1000}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableNetwork({ t }: { t: (key: string) => string }) {
  const { data: network, isLoading, error } = useBlockchainNetwork(''); // Empty string for now
  
  if (isLoading) {
    return (
      <div className="overflow-x-auto mb-16">
        <table className="w-full text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>
              <th className="py-2">{t("blockchain.rank")}</th>
              <th>{t("blockchain.client")}</th>
              <th>{t("blockchain.node_count")}</th>
              <th>{t("blockchain.share")}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b last:border-none">
              <td className="py-2" colSpan={4}>
                <div className="text-center py-4 text-muted-foreground">
                  {t("blockchain.loading_data")}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  if (error || !network || network.length === 0) {
    return (
      <div className="overflow-x-auto mb-16">
        <table className="w-full text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>
              <th className="py-2">{t("blockchain.rank")}</th>
              <th>{t("blockchain.client")}</th>
              <th>{t("blockchain.node_count")}</th>
              <th>{t("blockchain.share")}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b last:border-none">
              <td className="py-2" colSpan={4}>
                <div className="text-center py-4 text-muted-foreground">
                  {t("blockchain.no_data_available")}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto mb-16">
      <table className="w-full text-sm">
        <thead className="border-b text-muted-foreground">
          <tr>
            <th className="py-2">{t("blockchain.rank")}</th>
            <th>{t("blockchain.client")}</th>
            <th>{t("blockchain.node_count")}</th>
            <th>{t("blockchain.share")}</th>
          </tr>
        </thead>
        <tbody>
          {network.map((row, i) => (
            <tr key={i} className="border-b last:border-none">
              <td className="py-2">{row.rank}</td>
              <td className="text-primary">{row.client}</td>
              <td>{row.count.toLocaleString()}</td>
              <td>{row.share}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------
// NEW MARKET SECTION
// ---------------------------------------------------------

function TableMarket({ t }: { t: (key: string) => string }) {
  const { data: market, isLoading, error } = useBlockchainMarket(''); // Empty string for now
  
  if (isLoading) {
    return (
      <div className="mb-16">
        <div className="bg-muted/30 rounded-lg border overflow-hidden">
          <div className="bg-muted px-4 py-2 border-b">
            <h3 className="font-semibold">{t("blockchain.markets")}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b text-muted-foreground">
                <tr>
                  <th className="text-left p-3">{t("blockchain.exchange")}</th>
                  <th className="text-left p-3">{t("blockchain.markets")}</th>
                  <th className="text-right p-3">{t("blockchain.usd_price")}</th>
                  <th className="text-right p-3">{t("blockchain.volume_24h")}</th>
                  <th className="text-right p-3">{t("blockchain.share")}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-muted/50">
                  <td className="p-3" colSpan={5}>
                    <div className="text-center py-4 text-muted-foreground">
                      {t("blockchain.loading_data")}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !market || market.length === 0) {
    return (
      <div className="mb-16">
        <div className="bg-muted/30 rounded-lg border overflow-hidden">
          <div className="bg-muted px-4 py-2 border-b">
            <h3 className="font-semibold">{t("blockchain.markets")}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b text-muted-foreground">
                <tr>
                  <th className="text-left p-3">{t("blockchain.exchange")}</th>
                  <th className="text-left p-3">{t("blockchain.markets")}</th>
                  <th className="text-right p-3">{t("blockchain.usd_price")}</th>
                  <th className="text-right p-3">{t("blockchain.volume_24h")}</th>
                  <th className="text-right p-3">{t("blockchain.share")}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-muted/50">
                  <td className="p-3" colSpan={5}>
                    <div className="text-center py-4 text-muted-foreground">
                      {t("blockchain.no_data_available")}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-16">
      <div className="bg-muted/30 rounded-lg border overflow-hidden">
        <div className="bg-muted px-4 py-2 border-b">
          <h3 className="font-semibold">{t("blockchain.markets")}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b text-muted-foreground">
              <tr>
                <th className="text-left p-3">{t("blockchain.exchange")}</th>
                <th className="text-left p-3">{t("blockchain.markets")}</th>
                <th className="text-right p-3">{t("blockchain.usd_price")}</th>
                <th className="text-right p-3">{t("blockchain.volume_24h")}</th>
                <th className="text-right p-3">{t("blockchain.share")}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {market.map((entry, index) => (
                <tr key={index} className="hover:bg-muted/50">
                  <td className="p-3">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-muted mr-2 flex items-center justify-center text-xs">
                        {entry.exchange[0]}
                      </div>
                      {entry.exchange}
                    </div>
                  </td>
                  <td className="p-3">{entry.pair}</td>
                  <td className="p-3 text-right font-medium">{entry.price}</td>
                  <td className="p-3 text-right">{entry.volume}</td>
                  <td className="p-3 text-right">{entry.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// ABOUT SECTION
// ---------------------------------------------------------

function TableAbout({ t }: { t: (key: string) => string }) {
  // In a real implementation, this would come from the blockchain detail data
  const blockchainInfo = {
    name: "Bitcoin",
    symbol: "BTC",
    algorithm: "SHA-256",
    firstBlock: "2009-01-03",
    website: "https://bitcoin.org"
  };
  
  return (
    <div className="mb-16">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Information Table */}
        <div className="flex-1">
          <div className="bg-muted/30 rounded-lg border overflow-hidden">
            <div className="bg-muted px-4 py-2 border-b">
              <h3 className="font-semibold">{t("blockchain.information")}</h3>
            </div>
            <div className="divide-y">
              <div className="flex p-4">
                <div className="w-1/3 text-muted-foreground">{t("blockchain.name_tag")}</div>
                <div className="w-2/3 font-medium">{blockchainInfo.name} ({blockchainInfo.symbol})</div>
              </div>
              <div className="flex p-4">
                <div className="w-1/3 text-muted-foreground">{t("blockchain.algorithm")}</div>
                <div className="w-2/3">{blockchainInfo.algorithm}</div>
              </div>
              <div className="flex p-4">
                <div className="w-1/3 text-muted-foreground">{t("blockchain.wallet_version")}</div>
                <div className="w-2/3">0.21.1</div>
              </div>
              <div className="flex p-4">
                <div className="w-1/3 text-muted-foreground">{t("blockchain.social_nets")}</div>
                <div className="w-2/3 flex gap-2">
                  <a href={blockchainInfo.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {t("blockchain.visit_website")}
                  </a>
                  <a href="https://twitter.com/bitcoin" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Twitter
                  </a>
                  <a href="https://github.com/bitcoin" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    GitHub
                  </a>
                </div>
              </div>
              <div className="flex p-4">
                <div className="w-1/3 text-muted-foreground">{t("blockchain.first_block")}</div>
                <div className="w-2/3">{blockchainInfo.firstBlock}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Logo Section */}
        <div className="w-full md:w-64">
          <div className="bg-muted/30 rounded-lg border overflow-hidden h-full">
            <div className="bg-muted px-4 py-2 border-b">
              <h3 className="font-semibold">{t("blockchain.logo")}</h3>
            </div>
            <div className="p-6 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-4xl">₿</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// UI HELPERS
// ---------------------------------------------------------

function TabButton({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void; }) {
  return (
    <button
      onClick={onClick}
      className={`pb-3 px-1 border-b-2 transition ${
        active
          ? "border-primary text-primary font-medium"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Stat({ title, value, className = '' }: { title: string; value: string; className?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-sm text-muted-foreground">{title}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className="text-xl font-semibold mb-4 mt-6">{title}</h2>;
}


