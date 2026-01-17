"use client";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";



export default function TermsPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 dark:to-muted/10">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header with Logo */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <div className="flex items-center justify-center">
              <Image
                src="/logo-mini.png"
                alt=" Kriptokyng Explorer"
                width={200}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </div>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t("terms.title")}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto my-4"></div>
        </div>

        {/* Content */}
        <div className="bg-background/80 dark:bg-background/90 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              {t("terms.main_disclaimer")}
            </p>
            
            <p className="text-muted-foreground mb-6">
              {t("terms.contact_us")} <a href="https://bitcointalk.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{t("terms.bitcointalk")}</a>, <a href="https://twitter.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{t("terms.twitter")}</a> {t("terms.email")} <a href="mailto:contact@cryptoid.info" className="text-primary hover:underline">contact@cryptoid.info</a>
            </p>

            <p className="text-muted-foreground mb-6">
              {t("terms.agreement_notice")} <Link href="/terms" className="text-primary hover:underline">{t("terms.terms_link")}</Link> {t("terms.exit_page")}
            </p>

            <div className="mt-12 pt-6 border-t border-border/30">
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t("terms.terms_of_service")}</h2>
              <p className="text-muted-foreground mb-4">
                {t("terms.acceptance")}
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">{t("terms.use_of_service")}</h3>
              <p className="text-muted-foreground mb-4">
                {t("terms.service_description")}
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">{t("terms.no_investment_advice")}</h3>
              <p className="text-muted-foreground mb-4">
                {t("terms.investment_warning")}
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">{t("terms.limitation_of_liability")}</h3>
              <p className="text-muted-foreground mb-4">
                {t("terms.liability_clause")}
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">{t("terms.changes_to_terms")}</h3>
              <p className="text-muted-foreground">
                {t("terms.terms_modification")}
              </p>

              <p className="text-sm text-muted-foreground mt-8 pt-4 border-t border-border/20">
                {t("terms.last_updated")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
