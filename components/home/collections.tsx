"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from "../../store/cart-store";
import { t } from "../../lib/copy-dict";
import { MOCK_COLLECTIONS } from "../../lib/shopify/mock-data";

export default function Collections() {
  const locale = useCartStore((state) => state.locale);

  return (
    <section className="w-full bg-[#F5F3EE] dark:bg-[#1A1917] py-24 md:py-32 px-6 border-b-2 border-[#1A1917] dark:border-[#F5F3EE] relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#8B6230] dark:text-[#C49B66] font-bold">
            {locale === "en" ? "Curated Universes" : "Univers Choisis"}
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-[#1A1917] dark:text-[#F5F3EE] tracking-tight font-extrabold uppercase italic lowercase leading-none">
            {t("sectionCollections", locale)}
          </h2>
        </div>

        {/* Collections Table Grid (Brutalist newspaper grid borders) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t-2 border-l-2 border-[#1A1917] dark:border-[#F5F3EE]">
          {MOCK_COLLECTIONS.map((col, idx) => {
            const title = locale === "en" ? col.title.en : col.title.fr;
            const description = locale === "en" ? col.description.en : col.description.fr;
            
            return (
              <motion.div
                key={col.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-transparent border-r-2 border-b-2 border-[#1A1917] dark:border-[#F5F3EE] group flex flex-col justify-between h-full"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/5] w-full overflow-hidden border-b-2 border-[#1A1917] dark:border-[#F5F3EE] bg-[#e9e5db] dark:bg-[#2c2b28]">
                  <Image
                    src={col.image.url}
                    alt={col.image.altText || title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 276px"
                    quality={60}
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo grayscale contrast-[1.02]"
                  />
                  {/* Subtle hover dark layer */}
                  <div className="absolute inset-0 bg-[#1A1917]/5 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Text Details Section */}
                <div className="p-6 flex flex-col justify-between flex-1 gap-6 bg-transparent">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif text-xl font-extrabold text-[#1A1917] dark:text-[#F5F3EE] uppercase tracking-wide leading-tight">
                      {title}
                    </h3>
                    <p className="text-[9px] leading-relaxed text-[#1A1917]/50 dark:text-[#F5F3EE]/50 font-mono uppercase font-bold tracking-wider">
                      {description}
                    </p>
                  </div>
                  
                  {/* Outline Monospace Link */}
                  <Link
                    href={`/products?collection=${col.handle}`}
                    className="inline-block border border-[#1A1917] dark:border-[#F5F3EE] px-4 py-2 hover:bg-[#1A1917] hover:text-[#F5F3EE] dark:hover:bg-[#F5F3EE] dark:hover:text-[#1A1917] transition-all duration-300 font-mono text-[9px] font-bold uppercase tracking-wider w-max rounded-none cursor-pointer"
                  >
                    {locale === "en" ? "Explore" : "Découvrir"} →
                  </Link>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
