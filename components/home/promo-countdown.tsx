"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "../../store/cart-store";
import { t } from "../../lib/copy-dict";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PromoCountdown() {
  const locale = useCartStore((state) => state.locale);
  
  // Set a dynamic target date: exactly 3 days and 12 hours from current time
  const [targetDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    date.setHours(date.getHours() + 12);
    return date.getTime();
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft((prev) => ({ ...prev, isExpired: true }));
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const countdownUnits = [
    { label: locale === "en" ? "Days" : "Jours", value: timeLeft.days },
    { label: locale === "en" ? "Hours" : "Heures", value: timeLeft.hours },
    { label: locale === "en" ? "Minutes" : "Minutes", value: timeLeft.minutes },
    { label: locale === "en" ? "Seconds" : "Secondes", value: timeLeft.seconds },
  ];

  return (
    <section className="w-full bg-[#1A1917] text-[#F5F3EE] py-24 md:py-32 px-6 border-b-2 border-[#1A1917] dark:border-[#F5F3EE] relative overflow-hidden z-20">
      
      {/* Editorial layout elements */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-30" />
      <div className="absolute top-0 left-8 bottom-0 w-[1px] bg-white/5 hidden md:block" />
      <div className="absolute top-0 right-8 bottom-0 w-[1px] bg-white/5 hidden md:block" />

      {/* Main Ticket Box */}
      <div className="max-w-3xl mx-auto border-2 border-dashed border-[#F5F3EE]/30 p-8 md:p-12 flex flex-col items-center text-center gap-12 relative z-10 rounded-none bg-transparent">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-4 max-w-lg">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#C49B66] font-bold">
            {t("sectionPromo", locale)}
          </span>
          <h2 className="font-serif text-3.5xl md:text-5xl tracking-tight font-extrabold uppercase italic lowercase leading-tight">
            {locale === "en" ? "Private Sales: -20% Off Our Icons" : "Ventes Privées : -20% sur nos Icônes"}
          </h2>
          <p className="font-mono text-[9px] tracking-wider uppercase font-bold text-[#F5F3EE]/50 max-w-sm leading-relaxed mt-2">
            {locale === "en"
              ? "Access exclusive pricing on a selection of boots and leather bags. Automatically applied at checkout."
              : "Bénéficiez de tarifs exclusifs sur une sélection de bottes et sacs. Remise appliquée automatiquement."}
          </p>
        </div>

        {/* Live Countdown digits */}
        {!timeLeft.isExpired ? (
          <div className="flex gap-3 md:gap-6 items-center justify-center select-none font-mono">
            {countdownUnits.map((unit, idx) => (
              <React.Fragment key={unit.label}>
                {idx > 0 && (
                  <span className="text-[#C49B66] font-mono text-xl md:text-2xl font-bold mb-5">:</span>
                )}
                <div className="flex flex-col items-center gap-2 min-w-[65px] md:min-w-[85px]">
                  {/* Flat Ticket Digit Box */}
                  <div className="bg-[#F5F3EE] text-[#1A1917] border-2 border-[#1A1917] rounded-none p-3 w-full aspect-square flex items-center justify-center shadow-[4px_4px_0px_0px_#C49B66]">
                    <span className="font-mono text-2xl md:text-4xl font-extrabold tracking-tighter">
                      {String(unit.value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-[8px] tracking-wider uppercase text-[#F5F3EE]/40 font-bold mt-1">
                    {unit.label}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="bg-transparent border-2 border-[#C49B66] px-6 py-3 font-mono text-[10px] uppercase font-bold text-[#C49B66] tracking-widest rounded-none">
            {t("promoEnded", locale)}
          </div>
        )}

        {/* CTA Button */}
        <Link href="/products" className="mt-2 inline-block">
          <button className="bg-[#F5F3EE] text-[#1A1917] border-2 border-[#F5F3EE] hover:bg-[#1A1917] hover:text-[#F5F3EE] px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.25em] rounded-none transition-all duration-300 shadow-[4px_4px_0px_0px_#C49B66] hover:shadow-none flex items-center gap-3 cursor-pointer">
            {locale === "en" ? "Shop Private Access" : "Accéder à la Vente"}
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </button>
        </Link>

      </div>
    </section>
  );
}
