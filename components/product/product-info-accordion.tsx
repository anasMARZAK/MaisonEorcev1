"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { t } from "../../lib/copy-dict";

interface ProductInfoAccordionProps {
  description: string;
  locale: "fr" | "en";
}

export default function ProductInfoAccordion({
  description,
  locale,
}: ProductInfoAccordionProps) {
  const [openSection, setOpenSection] = useState<string | null>("desc");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: "desc",
      title: t("description", locale),
      content: description,
    },
    {
      id: "details",
      title: t("details", locale),
      content:
        locale === "en"
          ? "• Handcrafted Blake stitch construction\n• Lining: Breathable full lambskin lining\n• Hardware: Polished antiqued solid brass hooks\n• Fits true to European size sizing standards. For intermediate measurements, select the larger size."
          : "• Montage cousu Blake fait main hautement flexible\n• Doublure : Doublure intégrale en cuir de mouton respirant\n• Finitions : Bouclerie en laiton massif vieilli et poli\n• Taille conforme aux standards de pointures européennes. En cas de demi-pointure, nous suggérons la taille supérieure.",
    },
    {
      id: "shipping",
      title: t("navPolicies", locale),
      content:
        locale === "en"
          ? "Shipping:\nComplimentary standard delivery on all European orders over €150. Dispatch within 48h.\n\nReturns:\nEnjoy a 30-day trial period on your purchases. Items must remain in brand new condition, unworn."
          : "Livraison :\nLivraison standard offerte en Europe pour toute commande dès 150 €. Expédition sous 48h.\n\nRetours :\nVous bénéficiez d'une période d'essai de 30 jours. Les retours s'effectuent aux frais du client.",
    },
  ];

  return (
    <div className="flex flex-col border-t-2 border-[#1A1917] dark:border-[#F5F3EE] pt-2 font-sans text-xs">
      {sections.map((tab) => {
        const open = openSection === tab.id;
        return (
          <div key={tab.id} className="border-b-2 border-[#1A1917] dark:border-[#F5F3EE] py-4">
            <button
              onClick={() => toggleSection(tab.id)}
              className="w-full flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#1A1917] dark:text-[#F5F3EE] font-bold cursor-pointer"
            >
              <span>{tab.title}</span>
              <ChevronDown
                strokeWidth={2}
                className={`size-4 text-[#C49B66] transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 0.8 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden font-sans font-light text-xs leading-relaxed whitespace-pre-line mt-3 pr-4 text-[#1A1917]/90 dark:text-[#F5F3EE]/90"
                >
                  {tab.content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
