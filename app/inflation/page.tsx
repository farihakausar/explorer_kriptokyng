"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { useLanguage } from "@/contexts/language-context";



export default function InflationPage() {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("inflation.title")}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("inflation.current_inflation_rate")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">~1.8%</div>
            <p className="text-muted-foreground mt-2">
              {t("inflation.annual_inflation")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("inflation.next_halving")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">~April 2024</div>
            <p className="text-muted-foreground mt-2">
              {t("inflation.estimated_date")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("inflation.inflation_chart")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-muted/50 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">{t("inflation.chart_placeholder")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
