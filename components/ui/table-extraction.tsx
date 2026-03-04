import React from "react";
import { useBlockchainExtraction } from "@/lib/hooks/use-blockchain-data";

interface TableExtractionProps {
  t: (key: string) => string;
}

export function TableExtraction({ t }: TableExtractionProps) {
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
