"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCartStore } from "../../store/cart-store";
import { t } from "../../lib/copy-dict";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const locale = useCartStore((state) => state.locale);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Scroll Bindings for image only
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 180]);
  const scaleBg = useTransform(scrollY, [0, 1000], [1.02, 1.15]);

  return (
    <section
      ref={containerRef}
      className="w-full min-h-[100dvh] grid grid-cols-1 lg:grid-cols-12 pt-16 bg-[#F5F3EE] dark:bg-[#1A1917] border-b-2 border-[#1A1917] dark:border-[#F5F3EE]"
    >
      {/* Left Column: Bold Editorial Text Block */}
      <div className="col-span-1 lg:col-span-7 flex flex-col justify-center px-6 md:px-16 lg:px-20 py-16 lg:py-24 text-[#1A1917] dark:text-[#F5F3EE] relative z-10">
        
        {/* Subtle dot print texture background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.005)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-xl flex flex-col gap-6 relative z-10">
          {/* Collection Tag */}
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[#C49B66]"
          >
            {locale === "en" ? "Autumn - Winter 2026 Collection" : "Collection Automne - Hiver 2026"}
          </motion.span>

          {/* Huge Editorial Serif Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="font-serif text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] tracking-tight leading-[0.85] font-extrabold uppercase italic lowercase"
          >
            {t("heroTitle", locale)}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-xs sm:text-sm md:text-base font-light tracking-wide leading-relaxed text-[#1A1917]/95 dark:text-[#F5F3EE]/95 mt-2"
          >
            {t("heroSubtitle", locale)}
          </motion.p>

          {/* CTA Brutalist Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-6"
          >
            <Link href="/products" className="inline-block">
              <button className="bg-[#1A1917] text-[#F5F3EE] dark:bg-[#F5F3EE] dark:text-[#1A1917] border-2 border-[#1A1917] dark:border-[#F5F3EE] px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.25em] rounded-none hover:bg-[#F5F3EE] hover:text-[#1A1917] dark:hover:bg-[#1A1917] dark:hover:text-[#F5F3EE] transition-all duration-300 shadow-brutal hover:shadow-none flex items-center gap-3 cursor-pointer">
                {t("heroCta", locale)}
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Right Column: Industrial Framing & Parallax Image */}
      <div className="col-span-1 lg:col-span-5 relative min-h-[50vh] lg:min-h-full border-t-2 lg:border-t-0 lg:border-l-2 border-[#1A1917] dark:border-[#F5F3EE] overflow-hidden bg-[#e9e5db] dark:bg-[#2c2b28]">
        <motion.div
          style={{ y: yBg, scale: scaleBg }}
          className="absolute inset-0 w-full h-[120%]"
        >
          <Image
            src="/assets/images/generated/maison_ecorce_hero_editorial.png"
            alt="Maison Écorce leather collection"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover grayscale brightness-[0.9] contrast-[1.05]"
            /* Temporary inline styling so it runs smoothly even if image does not resolve immediately */
            onError={(e) => {
              // Fallback image url if local path is not generated yet
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=800";
            }}
          />
          {/* Subtle noise mesh on right column */}
          <div className="absolute inset-0 bg-black/5 dark:bg-transparent pointer-events-none" />
        </motion.div>

        {/* Diagonal corner print tag (Brutalist decorative detail) */}
        <div className="absolute bottom-6 right-6 bg-[#1A1917] text-[#F5F3EE] dark:bg-[#F5F3EE] dark:text-[#1A1917] border border-[#1A1917] dark:border-[#F5F3EE] px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-widest pointer-events-none z-10">
          ART. FL-2026
        </div>
      </div>
    </section>
  );
}
