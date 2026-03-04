import { useState, useEffect } from 'react';

interface MinerStats {
  totalMiners: number;
  totalHashrate: number;
  hashrateUnit: string;
  totalBlocks: number;
  totalPaid: number;
  uptime: string;
  pools: number;
  countries: number;
}

export function useMinerStats() {
  const [minerStats, setMinerStats] = useState<MinerStats>({
    totalMiners: 0,
    totalHashrate: 0,
    hashrateUnit: "TH/s",
    totalBlocks: 0,
    totalPaid: 0,
    uptime: "99.9%",
    pools: 0,
    countries: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMinerStats = async () => {
      try {
        setIsLoading(true);
        
        // Fetch data from local API route (proxies Kriptokyng_Pool)
        const response = await fetch('/api/kriptokyng-pools');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch miner stats: ${response.statusText}`);
        }
        
        const poolsData = await response.json();
        
        if (Array.isArray(poolsData)) {
          // Calculate real miner statistics from pools data
          const stats = poolsData.reduce((acc, pool) => {
            const poolMiners = pool.poolStats?.connectedMiners || 0;
            const poolHashrate = pool.poolStats?.poolHashrate || 0;
            const poolBlocks = pool.totalBlocks || 0;
            const poolPaid = pool.totalPaid || 0;
            
            return {
              totalMiners: acc.totalMiners + poolMiners,
              totalHashrate: acc.totalHashrate + poolHashrate,
              totalBlocks: acc.totalBlocks + poolBlocks,
              totalPaid: acc.totalPaid + poolPaid,
              pools: acc.pools + 1
            };
          }, {
            totalMiners: 0,
            totalHashrate: 0,
            totalBlocks: 0,
            totalPaid: 0,
            pools: 0
          });

          // Format hashrate unit
          let hashrateUnit = "H/s";
          if (stats.totalHashrate >= 1e12) {
            hashrateUnit = "TH/s";
            stats.totalHashrate = stats.totalHashrate / 1e12;
          } else if (stats.totalHashrate >= 1e9) {
            hashrateUnit = "GH/s";
            stats.totalHashrate = stats.totalHashrate / 1e9;
          } else if (stats.totalHashrate >= 1e6) {
            hashrateUnit = "MH/s";
            stats.totalHashrate = stats.totalHashrate / 1e6;
          }

          // Get unique countries from pool locations (would need location data)
          const countries = new Set(poolsData.map(pool => pool.poolStats?.countryCode || 'Unknown')).size;

          setMinerStats({
            ...stats,
            hashrateUnit,
            countries,
            uptime: "99.9%" // Could be calculated from pool uptime
          });
        }
        
      } catch (err) {
        console.error('Failed to fetch miner stats:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMinerStats();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchMinerStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { minerStats, isLoading, error };
}
