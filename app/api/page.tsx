"use client";

import { Metadata } from "next";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";



export default function APIPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">{t("api.heading")}</h1>
        <p className="text-xl text-muted-foreground">{t("api.subheading")}</p>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              <strong>{t("api.note")}:</strong> {t("api.free_services_note")}
            </p>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("api.summary_api")}</h2>
        <p className="text-muted-foreground mb-4">
          {t("api.summary_description")}
        </p>
        <div className="bg-muted/50 p-4 rounded-lg mb-4 overflow-x-auto">
          <code className="text-sm font-mono break-all">https://kriptokyng.info/explorer/api.dws?q=summary</code>
        </div>
        <p className="text-muted-foreground">
          {t("api.summary_explanation")}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("api.api_root_heading")}</h2>
        <p className="text-muted-foreground mb-4">
          {t("api.api_root_description")}
        </p>
        <div className="bg-muted/50 p-4 rounded-lg mb-4 overflow-x-auto">
          <code className="text-sm font-mono break-all">https://kriptokyng.info/explorer/api.dws</code>
        </div>
        <p className="text-muted-foreground">
          {t("api.api_root_example")}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t("api.query_api")}</h2>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                <strong>{t("api.note")}:</strong> {t("api.query_limit_note")}
              </p>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mb-4">
          {t("api.query_parameter")}
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">{t("api.real_time_queries")}</h3>
        <div className="bg-muted/30 rounded-lg overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("api.query_column")}</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("api.description_column")}</th>
                </tr>
              </thead>
              <tbody className="bg-background divide-y divide-border">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono">addresses</code>
                  </td>
                  <td className="px-6 py-4">{t("api.addresses_query")}</td>
                </tr>
                <tr className="bg-muted/10">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono">circulating</code>
                  </td>
                  <td className="px-6 py-4">{t("api.circulating_query")}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono">getblockcount</code>
                  </td>
                  <td className="px-6 py-4">{t("api.getblockcount_query")}</td>
                </tr>
                <tr className="bg-muted/10">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono">getdifficulty</code>
                  </td>
                  <td className="px-6 py-4">{t("api.getdifficulty_query")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-2xl font-semibold text-foreground mb-6">{t("api.need_help")}</h2>
        <p className="text-muted-foreground mb-6">
          {t("api.help_description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="https://bitcointalk.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-muted/30 transition-colors"
          >
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.99 0C5.47 0 0 4.8 0 10.32c0 4.55 3.06 8.43 7.34 9.65-.12.98-.8 4.23 1.11 5.03 1.92 1.01 3.56.6 4.55.35.29-.55.8-1.75.8-1.75s-1.9.35-3.23-.35c-1.34-.7-2.54-2.11-2.54-2.11s.2-.15.55-.35c.35-.2.8-.4 1.2-.35 1.9.2 3.38.8 4.15 1.35.8.55 1.6 1.2 1.6 1.2s.8-1.35 1.6-2.54c.8-1.2 1.6-2.54 1.6-2.54s1.6 1.2 1.6 2.54c0 1.35-1.2 2.54-1.2 2.54s.8-.55 1.6-1.2c.8-.55 2.14-1.15 4.15-1.35.4-.05.85.15 1.2.35.35.2.55.35.55.35s-1.2 1.4-2.54 2.11c-1.34.7-3.23.35-3.23.35s.51 1.2.8 1.75c.99.25 2.63.66 4.55-.35 1.91-.8 1.23-4.05 1.11-5.03 4.28-1.22 7.34-5.1 7.34-9.65C24 4.8 18.52 0 11.99 0z"/>
            </svg>
            {t("api.bitcointalk")}
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-muted/30 transition-colors"
          >
            <svg className="h-5 w-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            {t("api.twitter")}
          </a>
          <a 
            href="mailto:contact@cryptoid.info" 
            className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-muted/30 transition-colors"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {t("api.email_us")}
          </a>
        </div>
      </div>
    </div>
  );
}
