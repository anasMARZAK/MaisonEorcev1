"use client";

import React from "react";
import Image from "next/image";
import { useCartStore } from "../../store/cart-store";
import { t } from "../../lib/copy-dict";
import { motion } from "framer-motion";

export default function AboutClient() {
  const locale = useCartStore((state) => state.locale);

  return (
    <div className="w-full bg-[#F5F3EE] dark:bg-[#1A1917] pt-28 pb-24 px-6 font-sans relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Title Block */}
        <div className="flex flex-col gap-4 border-b-2 border-[#1A1917]/10 dark:border-[#F5F3EE]/15 pb-8 max-w-xl">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#C49B66] font-bold">
            {locale === "en" ? "Our Heritage" : "Notre Héritage"}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-[#1A1917] dark:text-[#F5F3EE] tracking-tight font-extrabold uppercase italic lowercase leading-none">
            {t("aboutHeroTitle", locale)}
          </h1>
        </div>

        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Block (col-span-6) */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-[12px] sm:text-[13px] leading-relaxed text-[#1A1917]/80 dark:text-[#F5F3EE]/80 font-light">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:font-extrabold first-letter:text-[#C49B66] first-letter:leading-none"
            >
              {locale === "en"
                ? "Maison Écorce was born from a desire to create leather goods that balance structural, architectural lines with the natural, living qualities of organic materials. Founded in Paris and crafted by hand in our historical family workshop in Tuscany, Italy, we build pieces designed to accompany you through a lifetime of journeys."
                : "Maison Écorce est née du désir d'équilibrer des lignes architecturales rigoureuses avec le caractère vivant et organique du cuir véritable. Fondée à Paris et façonnée à la main dans notre atelier familial historique en Toscane, chaque pièce incarne un dialogue entre le temps, la matière et le geste."}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {locale === "en"
                ? "Our Tuscan leather is tanned using age-old ancestral recipes based on natural chestnut and oak bark extracts. This slow, chemical-free process preserves the leather's natural grain and allows it to develop a unique patina over the years, carrying the memory of your movements."
                : "Notre cuir de vachette de Toscane est tanné à l'aide d'extraits naturels d'écorce de châtaignier et de chêne. Ce procédé lent et respectueux préserve la texture naturelle du cuir et lui permet de développer une patine unique au fil des années, gravant la mémoire de vos mouvements."}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {locale === "en"
                ? "Every pair of boots is assembled using the Blake stitching technique, offering incomparable flexibility and ease from the first wear. By refusing compromise and choosing standard-setting craftsmanship, we build objects of utility that double as works of art."
                : "Toutes nos bottes sont montées selon la technique traditionnelle du cousu Blake, offrant une flexibilité et un confort immédiat incomparables. En refusant les compromis de la production de masse, nous créons des objets d'usage devenant des oeuvres d'art."}
            </motion.p>
          </div>

          {/* Right Image Frame (col-span-6) - Flat double outline box */}
          <div className="lg:col-span-6 bg-transparent p-1.5 border-2 border-[#1A1917] dark:border-[#F5F3EE] rounded-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] w-full rounded-none border border-[#1A1917]/20 dark:border-[#F5F3EE]/20 overflow-hidden bg-[#e9e5db] dark:bg-[#2c2b28]"
            >
              <Image
                src="/assets/images/maison_ecorce_about_workbench.png"
                alt="Artisan leather workshop bench in Tuscany"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale contrast-[1.02] brightness-95"
              />
              <div className="absolute inset-0 bg-[#1A1917]/5 pointer-events-none" />
            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
}
