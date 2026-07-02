"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MOCK_PRODUCTS } from "../../lib/shopify/mock-data";
import { useCartStore } from "../../store/cart-store";
import { X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Configuration data for simulated customer orders
const BUYER_NAMES = [
  "Aurélien", "Sophia", "Matteo", "Charlotte", "Jean", "Elena", "Lucas", 
  "Giulia", "Noah", "Clara", "Antoine", "Chloé", "Gabriel", "Emma", "Pierre", "Inès"
];

const CITIES = {
  fr: ["Paris", "Florence", "Milan", "Bordeaux", "Rome", "Lyon", "Marseille", "Genève", "Bruxelles", "Toulouse"],
  en: ["Paris", "Florence", "Milan", "Bordeaux", "Rome", "London", "New York", "Tokyo", "Munich", "Geneva"]
};

const TIMES = {
  fr: ["il y a 2 min", "il y a 3 min", "il y a 5 min", "il y a 10 min", "il y a 15 min"],
  en: ["2 mins ago", "3 mins ago", "5 mins ago", "10 mins ago", "15 mins ago"]
};

interface PurchaseItem {
  buyerName: string;
  city: string;
  productTitle: string;
  productImage: string;
  productHandle: string;
  timeAgo: string;
}

export default function PurchaseNotification() {
  const locale = useCartStore((state) => state.locale);
  const [visible, setVisible] = useState(false);
  const [activeItem, setActiveItem] = useState<PurchaseItem | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleNextRef = useRef<() => void>(() => {});
  const triggerNotificationRef = useRef<() => void>(() => {});

  // Generate a random purchase notification item
  const generateRandomPurchase = (): PurchaseItem => {
    const randomProduct = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
    const buyerName = BUYER_NAMES[Math.floor(Math.random() * BUYER_NAMES.length)];
    
    const cityList = CITIES[locale] || CITIES.fr;
    const city = cityList[Math.floor(Math.random() * cityList.length)];
    
    const timeList = TIMES[locale] || TIMES.fr;
    const timeAgo = timeList[Math.floor(Math.random() * timeList.length)];

    return {
      buyerName,
      city,
      productTitle: locale === "en" ? randomProduct.title.en : randomProduct.title.fr,
      productImage: randomProduct.images[0]?.url || "",
      productHandle: randomProduct.handle,
      timeAgo
    };
  };

  // Sync refs on render to avoid circular dependency and hook warning
  useEffect(() => {
    scheduleNextRef.current = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      
      // Choose a random delay between 2m (120000ms) and 5m (300000ms)
      const minDelay = 120000;
      const maxDelay = 300000;
      const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
      
      timerRef.current = setTimeout(() => {
        triggerNotificationRef.current();
      }, randomDelay);
    };

    triggerNotificationRef.current = () => {
      // Generate new item
      const newItem = generateRandomPurchase();
      setActiveItem(newItem);
      setVisible(true);

      // Auto hide after 6 seconds (6000ms)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        setVisible(false);
        scheduleNextRef.current();
      }, 6000);
    };
  });

  useEffect(() => {
    // Standard conversion notification best-practice: trigger first popup 15 seconds after mounting
    // so it is immediately reviewable and does not keep the user waiting for 2 minutes.
    const initialTimer = setTimeout(() => {
      triggerNotificationRef.current();
    }, 15000);

    return () => {
      clearTimeout(initialTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [locale]); // Reset timers on locale change to align translations

  const handleManualDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(false);
    
    // Reschedule the next popup immediately
    scheduleNextRef.current();
  };

  return (
    <AnimatePresence>
      {visible && activeItem && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="fixed top-24 right-6 w-80 bg-[#F5F3EE] dark:bg-[#1A1917] border-2 border-[#1A1917] dark:border-[#F5F3EE] rounded-none p-4 shadow-brutal z-50 overflow-hidden"
          role="status"
          aria-live="polite"
        >
          {/* Dismiss control */}
          <button
            onClick={handleManualDismiss}
            className="absolute top-2 right-2 size-5 flex items-center justify-center border border-[#1A1917]/20 dark:border-[#F5F3EE]/20 hover:border-[#1A1917] dark:hover:border-[#F5F3EE] text-[#1A1917]/60 dark:text-[#F5F3EE]/60 hover:text-[#1A1917] dark:hover:text-[#F5F3EE] bg-transparent cursor-pointer transition-colors transition-transform duration-200 hover:scale-105 active:scale-95"
            aria-label={locale === "en" ? "Close notification" : "Fermer la notification"}
          >
            <X className="size-3" strokeWidth={2.5} />
          </button>

          {/* Main Link Wrapper */}
          <Link
            href={`/products/${activeItem.productHandle}`}
            className="flex gap-3.5 items-center select-none"
          >
            {/* Left Column: Product Thumbnail Frame */}
            <div className="size-16 border border-[#1A1917]/15 dark:border-[#F5F3EE]/15 bg-[#e9e5db] dark:bg-[#2c2b28] relative overflow-hidden shrink-0 rounded-none">
              {activeItem.productImage ? (
                <Image
                  src={activeItem.productImage}
                  alt={activeItem.productTitle}
                  fill
                  sizes="64px"
                  className="object-cover grayscale contrast-[1.02] brightness-95"
                />
              ) : (
                <div className="w-full h-full bg-[#1A1917]/5 dark:bg-[#F5F3EE]/5" />
              )}
            </div>

            {/* Right Column: Informative Copywriting */}
            <div className="flex-1 flex flex-col gap-0.5 pr-3">
              <p className="font-sans text-[10px] leading-snug text-[#1A1917]/70 dark:text-[#F5F3EE]/70 font-light">
                <span className="font-bold text-[#1A1917] dark:text-[#F5F3EE]">
                  {activeItem.buyerName}
                </span>{" "}
                {locale === "en" ? "in" : "à"}{" "}
                <span className="font-bold text-[#1A1917] dark:text-[#F5F3EE]">
                  {activeItem.city}
                </span>{" "}
                {locale === "en" ? "just purchased" : "vient d'acheter"} :
              </p>
              
              <h4 className="font-serif text-[12px] font-extrabold italic uppercase tracking-tight text-[#1A1917] dark:text-[#F5F3EE] leading-tight hover:text-[#C49B66] dark:hover:text-[#C49B66] transition-colors">
                {activeItem.productTitle}
              </h4>

              {/* Status Meta Info */}
              <div className="flex items-center gap-2 mt-1 text-[8px] font-mono font-bold uppercase tracking-wider">
                <span className="text-[#1A1917]/40 dark:text-[#F5F3EE]/40">
                  {activeItem.timeAgo}
                </span>
                <span className="text-[#1A1917]/20 dark:text-[#F5F3EE]/20">•</span>
                <span className="text-green-600 dark:text-green-400 flex items-center gap-0.5">
                  <Check className="size-2.5" strokeWidth={3} />
                  {locale === "en" ? "Verified" : "Vérifié"}
                </span>
              </div>
            </div>
          </Link>

          {/* Animated Countdown Progress Line */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 6, ease: "linear" }}
            className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#C49B66] origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
