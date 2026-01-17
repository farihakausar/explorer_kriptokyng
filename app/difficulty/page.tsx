"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { useLanguage } from "@/contexts/language-context";



export default function DifficultyPage() {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("difficulty.title")}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("difficulty.current_difficulty")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">149.30 T</div>
            <p className="text-muted-foreground mt-2">
              {t("difficulty.mining_difficulty")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("difficulty.outstanding_supply")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">19,958,099 BTC</div>
            <p className="text-muted-foreground mt-2">
              {t("difficulty.total_mined")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("difficulty.difficulty_chart")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-muted/50 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">{t("difficulty.chart_placeholder")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
