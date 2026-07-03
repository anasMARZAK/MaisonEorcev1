"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCartStore } from "../../store/cart-store";
import { t } from "../../lib/copy-dict";
import { Instagram } from "lucide-react";

export default function Ugc() {
  const locale = useCartStore((state) => state.locale);

  const ugcImages = [
    {
      id: "ugc-1",
      url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800",
      aspect: "aspect-[3/4]",
      colSpan: "lg:col-span-4",
    },
    {
      id: "ugc-2",
      url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800",
      aspect: "aspect-[1/1]",
      colSpan: "lg:col-span-4",
    },
    {
      id: "ugc-3",
      url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800",
      aspect: "aspect-[3/4]",
      colSpan: "lg:col-span-4",
    },
    {
      id: "ugc-4",
      url: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=800",
      aspect: "aspect-[1/1]",
      colSpan: "lg:col-span-4",
    },
    {
      id: "ugc-5",
      url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800",
      aspect: "aspect-[3/4]",
      colSpan: "lg:col-span-4",
    },
    {
      id: "ugc-6",
      url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800",
      aspect: "aspect-[1/1]",
      colSpan: "lg:col-span-4",
    },
  ];

  return (
    <section className="w-full bg-[#F5F3EE] dark:bg-[#1A1917] py-24 md:py-32 px-6 border-b-2 border-[#1A1917] dark:border-[#F5F3EE] relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#8B6230] dark:text-[#C49B66] font-bold">
            #MaisonEcorce
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-[#1A1917] dark:text-[#F5F3EE] tracking-tight font-extrabold uppercase italic lowercase leading-none">
            {t("sectionUgc", locale)}
          </h2>
        </div>

        {/* UGC Asymmetric Masonry Grid - Flat Newspaper Polaroid Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 items-center">
          {ugcImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`${img.colSpan} bg-transparent p-1.5 rounded-none border-2 border-[#1A1917] dark:border-[#F5F3EE] group relative overflow-hidden`}
            >
              {/* Inner core */}
              <div className={`relative ${img.aspect} w-full overflow-hidden rounded-none border border-[#1A1917]/20 dark:border-[#F5F3EE]/20 bg-[#e9e5db] dark:bg-[#2c2b28]`}>
                <Image
                  src={img.url}
                  alt="Customer community styling shot"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] grayscale contrast-[1.05]"
                />
                
                {/* Hover overlay details - High contrast solid black block */}
                <div className="absolute inset-0 bg-[#1A1917]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-[#F5F3EE] gap-2 pointer-events-none">
                  <Instagram strokeWidth={2} className="size-5 text-[#C49B66]" />
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase font-bold">
                    @maison.ecorce
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
