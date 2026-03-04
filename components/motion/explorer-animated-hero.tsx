"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Cpu, Database, CheckCircle } from "lucide-react";
import { formatHashrate, formatNumber, formatCurrency } from "@/lib/utils/format";
import { useMinerStats } from "@/lib/hooks/use-miner-stats";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const statsVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

export function ExplorerAnimatedHero() {
  const { minerStats, isLoading } = useMinerStats();
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Design - Match Table Background */}
      <div className="absolute inset-0 bg-white  dark:bg-[#1a1a1a]" />
      
    

      {/* Main Content */}
      <div className="relative w-full max-w-6xl mx-auto py-20 md:py-28 overflow-x-hidden">
        <motion.div 
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="text-center space-y-6" variants={itemVariants}>
            <div className="flex justify-center mb-6">
           
            </div>
            <h1 
              className="text-6xl md:text-8xl lg:text-7xl font-medium text-gray-900 dark:text-white leading-tight"
              style={{ fontFamily: "Whisper, cursive" }}
            >
              Kriptokyng Explorer
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
          </motion.div>
          
          {/* Pool Statistics */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={statsVariants}
          >
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#2a2a2a] shadow-lg">
              <div className="flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-gray-600 dark:text-orange-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {formatNumber(minerStats.totalMiners, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t('home.stats.miners')}</div>
              {isLoading && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-500">Live</span>
                </div>
              )}
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#2a2a2a] shadow-lg">
              <div className="flex items-center justify-center mb-3">
                <Cpu className="h-6 w-6 text-gray-600 dark:text-orange-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-baseline justify-center">
                {formatHashrate(minerStats.totalHashrate).split(' ')[0]}
                <span className="ml-1 text-lg text-gray-600 dark:text-gray-400">
                  {formatHashrate(minerStats.totalHashrate).split(' ')[1]}
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t('home.stats.hashrate')}</div>
              {isLoading && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-500">Live</span>
                </div>
              )}
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#2a2a2a] shadow-lg">
              <div className="flex items-center justify-center mb-3">
                <Database className="h-6 w-6 text-gray-600 dark:text-orange-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {formatNumber(minerStats.totalBlocks, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t('home.stats.blocks_found')}</div>
              {isLoading && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-500">Live</span>
                </div>
              )}
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#2a2a2a] shadow-lg">
              <div className="flex items-center justify-center mb-3">
                <CheckCircle className="h-6 w-6 text-gray-600 dark:text-orange-400" />
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                  {minerStats.uptime}
                </div>
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t('home.stats.uptime')}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
