"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { shopifyClient } from "../../lib/shopify";
import { useCartStore } from "../../store/cart-store";
import { t } from "../../lib/copy-dict";
import ProductCard from "../product/product-card";
import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";

export default function Bestsellers() {
  const locale = useCartStore((state) => state.locale);

  // Fetch all products using TanStack Query
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products", { locale }],
    queryFn: () => shopifyClient.getProducts({ locale }),
  });

  // Filter products for those tagged as 'bestseller'
  const bestsellers = products ? products.filter((p) => p.tags.includes("bestseller")) : [];

  return (
    <section className="w-full bg-[#F5F3EE] dark:bg-[#1A1917] py-24 pb-36 md:py-32 md:pb-44 px-6 border-t-2 border-[#1A1917] dark:border-[#F5F3EE] relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#8B6230] dark:text-[#C49B66] font-bold">
            {locale === "en" ? "Permanent Collection" : "Collection Permanente"}
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-[#1A1917] dark:text-[#F5F3EE] tracking-tight font-extrabold uppercase italic lowercase leading-none">
            {t("sectionBestsellers", locale)}
          </h2>
        </div>

        {/* Bestsellers Asymmetric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {isLoading ? (
            // Render 4 skeleton cards matching the real layout
            Array.from({ length: 4 }).map((_, idx) => (
              <div 
                key={idx}
                className={`bg-transparent p-4 border border-[#1A1917]/25 dark:border-[#F5F3EE]/25 rounded-none aspect-[4/6] ${
                  idx % 2 === 1 ? "lg:translate-y-8" : ""
                }`}
              >
                <div className="flex flex-col gap-4 h-full">
                  {/* Image box */}
                  <Skeleton className="w-full aspect-[4/5] rounded-none bg-[#1A1917]/10 dark:bg-[#F5F3EE]/10" />
                  {/* Title lines */}
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-3/4 bg-[#1A1917]/10 dark:bg-[#F5F3EE]/10" />
                    <Skeleton className="h-3.5 w-1/4 bg-[#1A1917]/10 dark:bg-[#F5F3EE]/10 mt-1" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            bestsellers.length === 0 && !isLoading ? (
              <div className="col-span-full py-12 text-center">
                <p className="font-mono text-[9px] tracking-widest uppercase text-[#1A1917]/40 dark:text-[#F5F3EE]/40 font-bold">
                  {isError
                    ? (locale === "en" ? "Unable to load products" : "Impossible de charger les produits")
                    : (locale === "en" ? "No bestsellers found" : "Aucun bestseller trouvé")}
                </p>
              </div>
            ) : (
            bestsellers.slice(0, 4).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
                className={idx % 2 === 1 ? "lg:translate-y-8" : ""}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
            )
          )}
        </div>

      </div>
    </section>
  );
}
