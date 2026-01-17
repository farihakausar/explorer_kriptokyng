import { Metadata } from "next";
import { siteConfig } from "@/config/Site";

export const metadata: Metadata = {
  title: siteConfig.tagline,
  description: siteConfig.description,
};