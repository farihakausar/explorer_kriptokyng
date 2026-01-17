"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Coins, Shield, Zap, Users, Settings, HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

// FAQ data structure using translations
const getFaqData = (t: (key: string) => string) => [
  {
    category: t("faq.payout_systems"),
    icon: <Coins className="w-5 h-5" />,
    questions: [
      {
        question: t("faq.what_is_pplns"),
        answer: t("faq.what_is_pplns_answer")
      },
      {
        question: t("faq.what_is_solo"),
        answer: t("faq.what_is_solo_answer")
      },
      {
        question: t("faq.how_does_pps_work"),
        answer: t("faq.how_does_pps_work_answer")
      },
      {
        question: t("faq.what_is_ppbs"),
        answer: t("faq.what_is_ppbs_answer")
      },
      {
        question: t("faq.how_does_pplnsbf_work"),
        answer: t("faq.how_does_pplnsbf_work_answer")
      }
    ]
  },
  {
    category: t("faq.pool_features"),
    icon: <Zap className="w-5 h-5" />,
    questions: [
      {
        question: t("faq.what_is_multi_stratum"),
        answer: t("faq.what_is_multi_stratum_answer")
      },
      {
        question: t("faq.how_does_vardiff_work"),
        answer: t("faq.how_does_vardiff_work_answer")
      },
      {
        question: t("faq.what_regions_supported"),
        answer: t("faq.what_regions_supported_answer")
      }
    ]
  },
  {
    category: t("faq.getting_started"),
    icon: <Users className="w-5 h-5" />,
    questions: [
      {
        question: t("faq.how_to_start_mining"),
        answer: t("faq.how_to_start_mining_answer")
      },
      {
        question: t("faq.what_software_supported"),
        answer: t("faq.what_software_supported_answer")
      },
      {
        question: t("faq.what_are_minimum_payouts"),
        answer: t("faq.what_are_minimum_payouts_answer")
      }
    ]
  },
  {
    category: t("faq.security_reliability"),
    icon: <Shield className="w-5 h-5" />,
    questions: [
      {
        question: t("faq.how_secure_is_pool"),
        answer: t("faq.how_secure_is_pool_answer")
      },
      {
        question: t("faq.how_prevent_pool_hopping"),
        answer: t("faq.how_prevent_pool_hopping_answer")
      },
      {
        question: t("faq.what_if_pool_down"),
        answer: t("faq.what_if_pool_down_answer")
      }
    ]
  },
  {
    category: t("faq.technical_details"),
    icon: <Settings className="w-5 h-5" />,
    questions: [
      {
        question: t("faq.what_algorithms_supported"),
        answer: t("faq.what_algorithms_supported_answer")
      },
      {
        question: t("faq.how_often_payouts_processed"),
        answer: t("faq.how_often_payouts_processed_answer")
      },
      {
        question: t("faq.can_monitor_progress"),
        answer: t("faq.can_monitor_progress_answer")
      }
    ]
  },
  {
    category: t("faq.fees_economics"),
    icon: <HelpCircle className="w-5 h-5" />,
    questions: [
      {
        question: t("faq.what_are_pool_fees"),
        answer: t("faq.what_are_pool_fees_answer")
      },
      {
        question: t("faq.how_handled_transaction_fees"),
        answer: t("faq.how_handled_transaction_fees_answer")
      }
    ]
  }
];

export function FAQClient() {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);
  const { t } = useLanguage();
  
  // Get translated FAQ data
  const faqData = getFaqData(t);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleQuestion = (question: string) => {
    setOpenQuestions(prev => 
      prev.includes(question) 
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

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

  return (
    <section className="relative w-full overflow-hidden min-h-screen">
      {/* Background Design - Theme Aware */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30 dark:to-muted/10" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs - Theme Aware */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/20 dark:to-secondary/20 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-blue-500/15 to-purple-500/15 dark:from-blue-500/15 dark:to-purple-500/15 rounded-full blur-3xl"
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Grid Pattern - Theme Aware */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Floating Icons - Theme Aware */}
        <motion.div
          className="absolute top-32 right-32 text-primary/15 dark:text-primary/10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-32 text-secondary/15 dark:text-secondary/10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-medium text-foreground leading-tight mb-4"
            variants={itemVariants}
          >
            {t("faq.title") || "Frequently Asked Questions"}
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t("faq.description") || "Find answers to common questions about our mining pool"}
          </motion.p>
          <motion.div 
            className="bg-background/80 dark:bg-background/90 backdrop-blur-sm border border-border/50 rounded-2xl p-6 my-8 text-center"
            variants={itemVariants}
          >
            <p className="text-muted-foreground mb-4">
              {t("faq.disclaimer") || "This site provides blockchain explorers for several crypto-currencies. We do not provide any currency exchange, wallet or money services. We only present public blockchain data."}
            </p>
            <p className="text-muted-foreground">
              {t("faq.terms_message") || "Please review our"} <Link href="/terms" className="text-primary hover:underline font-medium">{t("faq.terms_link") || "Disclaimer & Terms of Service"}</Link> {t("faq.terms_suffix") || "for more information."}
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {faqData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="bg-background/80 dark:bg-background/90 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg"
              variants={itemVariants}
            >
              <button
                onClick={() => toggleCategory(category.category)}
                className="w-full p-6 text-left hover:bg-muted/30 transition-colors duration-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg text-primary">
                    {category.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{category.category}</h2>
                </div>
                {openCategories.includes(category.category) ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-200" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform duration-200" />
                )}
              </button>
              
              {openCategories.includes(category.category) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-border/30"
                >
                  {category.questions.map((faq, questionIndex) => (
                    <div key={questionIndex} className="border-b border-border/20 last:border-b-0">
                      <button
                        onClick={() => toggleQuestion(faq.question)}
                        className="w-full p-6 text-left hover:bg-muted/20 transition-colors duration-200 flex items-center justify-between"
                      >
                        <h3 className="text-lg font-medium text-foreground pr-4">{faq.question}</h3>
                        {openQuestions.includes(faq.question) ? (
                          <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0" />
                        )}
                      </button>
                      
                      {openQuestions.includes(faq.question) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6"
                        >
                          <div className="bg-muted/30 dark:bg-muted/40 rounded-lg p-4 border-l-4 border-primary/40">
                            <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-8 border border-border/30">
            <h3 className="text-xl font-semibold text-foreground mb-2">{t("faq.need_more_help")}</h3>
            <p className="text-muted-foreground mb-4">
              {t("faq.cant_find_answer")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/support" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                {t("faq.contact_support")}
              </a>
              <a 
                href="/docs" 
                className="inline-flex items-center justify-center px-6 py-3 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors duration-200"
              >
                {t("faq.view_documentation")}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Arabic Section */}
        <motion.div 
          className="mt-16 bg-background/80 dark:bg-background/90 backdrop-blur-sm border border-border/50 rounded-2xl p-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          dir="rtl"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">{t("terms.title")}</h3>
        </motion.div>
      </div>
    </section>
  );
}