import React from "react";
import { useBlockchainNetwork } from "@/lib/hooks/use-blockchain-data";

interface TableNetworkProps {
  t: (key: string) => string;
}

export function TableNetwork({ t }: TableNetworkProps) {
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
