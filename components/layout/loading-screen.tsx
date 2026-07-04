"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoadingStore } from "../../store/loading-store";

export default function LoadingScreen() {
  const { isLoading, hasLoadedOnce, finishLoading } = useLoadingStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // If it already loaded once in this session, skip the animation
    if (hasLoadedOnce) {
      finishLoading();
      return;
    }

    // Animate progress bar over 1.5s
    const startTime = Date.now();
    const duration = 1500; // 1.5s

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const computedProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(computedProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        // Smoothly exit after loading finishes
        setTimeout(() => {
          finishLoading();
        }, 200);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [hasLoadedOnce, finishLoading]);

  if (hasLoadedOnce || !isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 2.0, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0F0E0C] text-[#FDFBF7]"
        >
          {/* Subtle noise layer */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

          <div className="flex flex-col items-center max-w-xs w-full px-6 z-10 gap-6">
            {/* Logo */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-serif text-3xl md:text-4xl tracking-[0.15em] text-center"
            >
              MAISON ÉCORCE
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-[10px] tracking-[0.3em] uppercase font-sans font-light"
            >
              Artisan Maroquinier
            </motion.p>

            {/* Progress Bar Container */}
            <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden mt-2">
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-[#D4AF37]" // Gold accent
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
