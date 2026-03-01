import React from "react";
import { useBlockchainMarket } from "@/lib/hooks/use-blockchain-data";

interface TableMarketProps {
  t: (key: string) => string;
}

export function TableMarket({ t }: TableMarketProps) {
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
