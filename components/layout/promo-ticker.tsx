"use client";

import React from "react";
import { useCartStore } from "../../store/cart-store";
import { t } from "../../lib/copy-dict";

export default function PromoTicker() {
  const locale = useCartStore((state) => state.locale);
  const text = t("announcementTicker", locale);

  return (
    <div className="w-full bg-[#0F0E0C] text-[#FDFBF7] py-2.5 overflow-hidden border-b border-white/5 relative z-40 text-[10px] font-sans tracking-[0.2em] uppercase font-light">
      <div className="flex whitespace-nowrap">
        {/* Seamless scrolling loops */}
        <div className="flex shrink-0 animate-marquee gap-12 pr-12 items-center">
          <span>{text}</span>
          <span className="text-[#D4AF37] text-xs">•</span>
          <span>{t("valueHandcrafted", locale)}</span>
          <span className="text-[#D4AF37] text-xs">•</span>
          <span>{t("valueReturns", locale)}</span>
          <span className="text-[#D4AF37] text-xs">•</span>
        </div>
        <div className="flex shrink-0 animate-marquee gap-12 pr-12 items-center" aria-hidden="true">
          <span>{text}</span>
          <span className="text-[#D4AF37] text-xs">•</span>
          <span>{t("valueHandcrafted", locale)}</span>
          <span className="text-[#D4AF37] text-xs">•</span>
          <span>{t("valueReturns", locale)}</span>
          <span className="text-[#D4AF37] text-xs">•</span>
        </div>
      </div>
    </div>
  );
}
