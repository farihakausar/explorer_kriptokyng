"use client";

import { useQuery } from "@tanstack/react-query";

export interface Blockchain {
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

export interface BlockchainDetail {
  id: string;
  name: string;
  symbol: string;
  price: string;
  usdPrice: string;
  marketCap: string;
  hashrate: string;
  difficulty: string;
  outstanding: string;
  website: string;
  // Additional details that might come from the API
  algorithm?: string;
  blockTime?: string;
  status?: string;
  minPayout?: number | string;
  fee?: string;
}

export interface Block {
  height: number;
  age: string;
  tx: number;
  value: string;
  difficulty: string;
  minedBy: string;
  hash?: string;
  timestamp?: string;
}

export interface RichListEntry {
  rank: number;
  address: string;
  amount: string;
  pct: string;
  last: string;
}

export interface OverviewEntry {
  date: string;
  blocks: number;
  height: number;
  interval: string;
  tx: number;
  value: string;
  difficulty: string;
  generated: string;
}

export interface ExtractionEntry {
  rank: number;
  pool: string;
  last100: string;
  last1000: string;
}

export interface NetworkClient {
  rank: number;
  client: string;
  count: number;
  share: string;
}

export interface MarketEntry {
  exchange: string;
  pair: string;
  price: string;
  volume: string;
  share: string;
}

/**
 * Hook to fetch all blockchain data
 */
export function useAllBlockchains() {
  return useQuery<Blockchain[], Error>({
    queryKey: ["blockchains"],
    queryFn: async () => {
      const response = await fetch("/api/blockchains");
      if (!response.ok) {
        throw new Error(`Failed to fetch blockchains: ${response.statusText}`);
      }
      const data = await response.json();
      
      // Transform the data from the API to match our interface
      // The API likely returns pool data, so we need to transform it appropriately
      if (Array.isArray(data)) {
        return data.map((item: any, index: number) => ({
          id: item.id || item.poolId || item.uid || index + 1,
          name: item.name || item.poolName || item.displayName || item.coin?.name || "Unknown",
          symbol: item.coin?.symbol || item.symbol || item.ticker || "N/A",
          blockHeight: item.stats?.networkBlockHeight || item.blockHeight || 0,
          age: item.stats?.lastNetworkBlockTime ? formatTimeDiff(item.stats.lastNetworkBlockTime) : 
               item.lastBlockTime ? formatTimeDiff(item.lastBlockTime) : "< 1 min",
          transactions: item.stats?.networkTransactions || item.transactions || 0,
          difficulty: formatDifficulty(item.stats?.networkDifficulty || item.difficulty) || "N/A",
          price: item.stats?.price?.usd ? `$${parseFloat(item.stats.price.usd).toFixed(2)}` : 
                 item.price ? `$${parseFloat(item.price).toFixed(2)}` : "N/A",
          marketCap: item.stats?.marketCap ? formatMarketCap(item.stats.marketCap) : 
                    item.marketCap ? formatMarketCap(item.marketCap) : "N/A",
          algorithm: item.coin?.algorithm || item.algorithm,
          blockTime: item.coin?.blockTime || item.blockTime,
          status: item.status || item.isActive ? "Active" : "Inactive",
          minPayout: item.settings?.minimumPayment || item.minPayout,
          fee: item.feePercent ? `${item.feePercent}%` : item.fee ? `${item.fee}%` : "N/A",
          website: item.coin?.website || item.website || "#"
        }));
      } else if (data.pools) {
        // Handle response with pools property
        return data.pools.map((item: any, index: number) => ({
          id: item.id || item.poolId || item.uid || index + 1,
          name: item.name || item.poolName || item.displayName || item.coin?.name || "Unknown",
          symbol: item.coin?.symbol || item.symbol || item.ticker || "N/A",
          blockHeight: item.stats?.networkBlockHeight || item.blockHeight || 0,
          age: item.stats?.lastNetworkBlockTime ? formatTimeDiff(item.stats.lastNetworkBlockTime) : 
               item.lastBlockTime ? formatTimeDiff(item.lastBlockTime) : "< 1 min",
          transactions: item.stats?.networkTransactions || item.transactions || 0,
          difficulty: formatDifficulty(item.stats?.networkDifficulty || item.difficulty) || "N/A",
          price: item.stats?.price?.usd ? `$${parseFloat(item.stats.price.usd).toFixed(2)}` : 
                 item.price ? `$${parseFloat(item.price).toFixed(2)}` : "N/A",
          marketCap: item.stats?.marketCap ? formatMarketCap(item.stats.marketCap) : 
                    item.marketCap ? formatMarketCap(item.marketCap) : "N/A",
          algorithm: item.coin?.algorithm || item.algorithm,
          blockTime: item.coin?.blockTime || item.blockTime,
          status: item.status || item.isActive ? "Active" : "Inactive",
          minPayout: item.settings?.minimumPayment || item.minPayout,
          fee: item.feePercent ? `${item.feePercent}%` : item.fee ? `${item.fee}%` : "N/A",
          website: item.coin?.website || item.website || "#"
        }));
      } else {
        // If the API doesn't return an array, try to extract blockchain data differently
        return [];
      }
    },
    staleTime: 1000 * 30, // 30 seconds
    retry: 1,
  });
}

/**
 * Hook to fetch specific blockchain detail data
 */
export function useBlockchainDetail(id: string) {
  return useQuery<BlockchainDetail, Error>({
    queryKey: ["blockchain-detail", id],
    queryFn: async () => {
      const response = await fetch(`/api/blockchains/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Blockchain with id "${id}" not found`);
        }
        throw new Error(`Failed to fetch blockchain: ${response.statusText}`);
      }
      const data = await response.json();
      
      // Transform the API response to match our interface
      // Handle both single blockchain data and pool data structures
      const blockchainData = data.coin ? data : { coin: { ...data } };
      
      return {
        id: data.poolId || data.id || id,
        name: data.name || data.coin?.name || data.displayName || "Unknown",
        symbol: data.coin?.symbol || data.symbol || data.ticker || "N/A",
        price: data.stats?.price?.usd ? `$${parseFloat(data.stats.price.usd).toFixed(2)}` : 
               data.price ? `$${parseFloat(data.price).toFixed(2)}` : "N/A",
        usdPrice: data.stats?.price?.usd ? `$${parseFloat(data.stats.price.usd).toFixed(2)}` : 
                   data.usdPrice ? `$${parseFloat(data.usdPrice).toFixed(2)}` : "N/A",
        marketCap: data.stats?.marketCap ? formatMarketCap(data.stats.marketCap) : 
                    data.marketCap ? formatMarketCap(data.marketCap) : "N/A",
        hashrate: formatHashrate(data.stats?.networkHashrate || data.hashrate) || "N/A",
        difficulty: formatDifficulty(data.stats?.networkDifficulty || data.difficulty) || "N/A",
        outstanding: data.stats?.networkDifficulty ? formatSupply(data.stats.networkDifficulty) : 
                     data.totalSupply ? formatSupply(data.totalSupply) : "N/A",
        website: data.coin?.website || data.website || "#",
        algorithm: data.coin?.algorithm || data.algorithm,
        blockTime: data.coin?.blockTime || data.blockTime,
        status: data.status || data.isActive ? "Active" : "Inactive",
        minPayout: data.settings?.minimumPayment || data.minPayout,
        fee: data.feePercent ? `${data.feePercent}%` : 
             data.fee ? `${data.fee}%` : "N/A"
      };
    },
    enabled: !!id,
    staleTime: 1000 * 30, // 30 seconds
    retry: 1,
  });
}

/**
 * Hook to fetch blockchain blocks data
 */
export function useBlockchainBlocks(id: string) {
  return useQuery<Block[], Error>({
    queryKey: ["blockchain-blocks", id],
    queryFn: async () => {
      const response = await fetch(`/api/blockchains/${id}/blocks`);
      if (!response.ok) {
        throw new Error(`Failed to fetch blocks: ${response.statusText}`);
      }
      const data = await response.json();
      
      // Transform the API response to match our interface
      if (Array.isArray(data.blocks || data)) {
        const blocks = data.blocks || data;
        return blocks.map((item: any, index: number) => ({
          height: item.height || item.blockHeight || index,
          age: item.age || item.timestamp ? formatTimeDiff(item.timestamp) : "< 1 min",
          tx: item.transactions || item.tx || 0,
          value: item.value || item.totalValue || "0",
          difficulty: formatDifficulty(item.difficulty) || "N/A",
          minedBy: item.minedBy || item.miner || "Unknown",
          hash: item.hash,
          timestamp: item.timestamp
        }));
      }
      return [];
    },
    enabled: !!id,
    staleTime: 1000 * 30, // 30 seconds
    retry: 1,
  });
}

/**
 * Hook to fetch blockchain rich list data
 */
export function useBlockchainRichList(id: string) {
  return useQuery<RichListEntry[], Error>({
    queryKey: ["blockchain-richlist", id],
    queryFn: async () => {
      const response = await fetch(`/api/blockchains/${id}/richlist`);
      if (!response.ok) {
        throw new Error(`Failed to fetch rich list: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60, // 1 minute
    retry: 1,
  });
}

/**
 * Hook to fetch blockchain overview data
 */
export function useBlockchainOverview(id: string) {
  return useQuery<OverviewEntry[], Error>({
    queryKey: ["blockchain-overview", id],
    queryFn: async () => {
      const response = await fetch(`/api/blockchains/${id}/overview`);
      if (!response.ok) {
        throw new Error(`Failed to fetch overview: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60, // 1 minute
    retry: 1,
  });
}

/**
 * Hook to fetch blockchain extraction data
 */
export function useBlockchainExtraction(id: string) {
  return useQuery<ExtractionEntry[], Error>({
    queryKey: ["blockchain-extraction", id],
    queryFn: async () => {
      const response = await fetch(`/api/blockchains/${id}/extraction`);
      if (!response.ok) {
        throw new Error(`Failed to fetch extraction: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60, // 1 minute
    retry: 1,
  });
}

/**
 * Hook to fetch blockchain network data
 */
export function useBlockchainNetwork(id: string) {
  return useQuery<NetworkClient[], Error>({
    queryKey: ["blockchain-network", id],
    queryFn: async () => {
      const response = await fetch(`/api/blockchains/${id}/network`);
      if (!response.ok) {
        throw new Error(`Failed to fetch network: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60, // 1 minute
    retry: 1,
  });
}

/**
 * Hook to fetch blockchain market data
 */
export function useBlockchainMarket(id: string) {
  return useQuery<MarketEntry[], Error>({
    queryKey: ["blockchain-market", id],
    queryFn: async () => {
      const response = await fetch(`/api/blockchains/${id}/market`);
      if (!response.ok) {
        throw new Error(`Failed to fetch market: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60, // 1 minute
    retry: 1,
  });
}

// Helper functions to format data appropriately
function formatTimeDiff(timestamp: string | number): string {
  if (!timestamp) return "< 1 min";
  
  const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp * 1000); // Assuming Unix timestamp
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return "< 1 min";
  } else if (diffInSeconds < 120) {
    return "1 min";
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)} mins`;
  } else {
    return `${Math.floor(diffInSeconds / 3600)} hrs`;
  }
}

function formatDifficulty(difficulty: number | string | undefined): string {
  if (difficulty === undefined || difficulty === null) return "N/A";
  
  const num = typeof difficulty === 'string' ? parseFloat(difficulty) : difficulty;
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(2)} T`;
  } else if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)} B`;
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(2)} M`;
  } else if (num >= 1e3) {
    return `${(num / 1e3).toFixed(2)} K`;
  }
  return num.toFixed(2);
}

function formatMarketCap(marketCap: number | string | undefined): string {
  if (marketCap === undefined || marketCap === null) return "N/A";
  
  const num = typeof marketCap === 'string' ? parseFloat(marketCap) : marketCap;
  if (num >= 1e12) {
    return `$${(num / 1e12).toFixed(2)}T`;
  } else if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(2)}B`;
  } else if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(2)}M`;
  } else if (num >= 1e3) {
    return `$${(num / 1e3).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
}

function formatHashrate(hashrate: number | string | undefined): string {
  if (hashrate === undefined || hashrate === null) return "N/A";
  
  const num = typeof hashrate === 'string' ? parseFloat(hashrate) : hashrate;
  if (num >= 1e15) {
    return `${(num / 1e15).toFixed(2)} PH/s`;
  } else if (num >= 1e12) {
    return `${(num / 1e12).toFixed(2)} TH/s`;
  } else if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)} GH/s`;
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(2)} MH/s`;
  } else if (num >= 1e3) {
    return `${(num / 1e3).toFixed(2)} KH/s`;
  }
  return `${num.toFixed(2)} H/s`;
}

function formatSupply(supply: number | string | undefined): string {
  if (supply === undefined || supply === null) return "N/A";
  
  const num = typeof supply === 'string' ? parseFloat(supply) : supply;
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)} B`;
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(2)} M`;
  } else if (num >= 1e3) {
    return `${(num / 1e3).toFixed(2)} K`;
  }
  return num.toFixed(2);
}