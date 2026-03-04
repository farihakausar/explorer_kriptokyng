import React from "react";

interface TableAboutProps {
  t: (key: string) => string;
}

export function TableAbout({ t }: TableAboutProps) {
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
