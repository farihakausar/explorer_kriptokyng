"use client";

import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, ChevronRight, Users, Cpu, Database } from "lucide-react";
import { siteConfig } from "@/config/Site";
import { useLanguage } from "@/contexts/language-context";
import { useHomeStats } from "@/lib/hooks/use-home-stats";
import { useMinerStats } from "@/lib/hooks/use-miner-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CoinIcon } from "@/components/ui/coin-icon";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExplorerAnimatedHero } from "@/components/motion/explorer-animated-hero";
import NotificationBar from "@/components/ui/notification-bar";
import { HomeMainSections } from "@/components/home-main-sections";
import { MinerMapSection } from "@/components/location/miner-map-section";
import BlockchainsPage from "./blockchains/page";





export default function HomePage() {
  const { data: stats, isLoading: statsLoading, error: statsError } = useHomeStats();
  const { minerStats, isLoading: minerLoading, error: minerError } = useMinerStats();
  const { t } = useLanguage();
  
  // Use real miner data from Kriptokyng_Pool
  const totalMiners = minerStats.totalMiners || 1254;
  const totalHashrate = minerStats.totalHashrate || 125;
  const hashrateUnit = minerStats.hashrateUnit || "GH/s";
  const totalBlocks = minerStats.totalBlocks || 12456;
  const uptime = minerStats.uptime || "99.9%";
  const totalPaid = minerStats.totalPaid || 0;
  const pools = minerStats.pools || 0;
  const countries = minerStats.countries || 0;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Animated Hero Section with Pool Stats */}
      <ExplorerAnimatedHero />

      <BlockchainsPage/>

      {/* Global Mining Network Map - Full Width */}
      <section className="w-full py-0 bg-background/80">
        <MinerMapSection 
          title="Global Mining Network"
          subtitle="Real-time view of miners connected worldwide"
        />
      </section>
    </div>
  );
}
