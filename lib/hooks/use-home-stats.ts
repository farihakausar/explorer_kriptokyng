"use client";

import { useQuery } from "@tanstack/react-query";

export interface HomeStats {
  totalMiners: number;
  totalHashrate: number;
  hashrateUnit: string;
  totalBlocks: number;
  uptime: string;
  error?: string;
}

/**
 * Hook to fetch home page statistics
 */
export function useHomeStats() {
  return useQuery<HomeStats, Error>({
    queryKey: ["home-stats"],
    queryFn: async () => {
      const response = await fetch("/api/stats");
      if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    },
    staleTime: 1000 * 30, // 30 seconds
    retry: 1,
  });
}