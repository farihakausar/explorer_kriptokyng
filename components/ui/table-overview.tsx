import React from "react";
import { useBlockchainOverview } from "@/lib/hooks/use-blockchain-data";

interface TableOverviewProps {
  t: (key: string) => string;
}

export function TableOverview({ t }: TableOverviewProps) {
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
