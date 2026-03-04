import React from "react";
import { useBlockchainRichList } from "@/lib/hooks/use-blockchain-data";

interface TableRichListProps {
  t: (key: string) => string;
}

export function TableRichList({ t }: TableRichListProps) {
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
