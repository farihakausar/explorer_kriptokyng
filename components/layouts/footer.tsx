"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/Site";
import { useLanguage } from "@/contexts/language-context";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className={cn("border-t bg-background", className)}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright").replace("2026", currentYear.toString())}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.terms_of_service")}
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.privacy_policy")}
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.contact_us")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}