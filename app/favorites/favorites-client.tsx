"use client";

import React from "react";
import Link from "next/link";
import { useFavoritesStore } from "../../store/favorites-store";
import { useCartStore } from "../../store/cart-store";
import { t } from "../../lib/copy-dict";
import ProductCard from "../../components/product/product-card";
import { ArrowLeft } from "lucide-react";

export default function FavoritesClient() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const locale = useCartStore((state) => state.locale);

  return (
    <div className="w-full bg-[#F5F3EE] dark:bg-[#1A1917] min-h-screen pt-28 pb-24 px-6 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Page Title Header */}
        <div className="flex flex-col gap-4 border-b-2 border-[#1A1917]/10 dark:border-[#F5F3EE]/15 pb-8">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#C49B66] font-bold">
            Maison Écorce
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-[#1A1917] dark:text-[#F5F3EE] tracking-tight font-extrabold uppercase italic leading-none">
            {t("favoritesTitle", locale)}
          </h1>
        </div>

        {/* Favorites Grid / Empty state */}
        {favorites.length === 0 ? (
          <div className="py-24 border-2 border-dashed border-[#1A1917]/35 dark:border-[#F5F3EE]/35 rounded-none flex flex-col items-center justify-center text-center p-8 text-[#1A1917]/40 dark:text-[#F5F3EE]/40 gap-6 bg-transparent">
            <p className="font-serif italic text-lg text-[#1A1917]/60 dark:text-[#F5F3EE]/60">
              {t("favoritesEmpty", locale)}
            </p>
            <Link
              href="/products"
              className="font-mono text-[9px] tracking-widest uppercase font-bold border-2 border-[#1A1917] dark:border-[#F5F3EE] px-6 py-3 hover:bg-[#1A1917] hover:text-[#F5F3EE] dark:hover:bg-[#F5F3EE] dark:hover:text-[#1A1917] text-[#1A1917] dark:text-[#F5F3EE] rounded-none transition-all cursor-pointer flex items-center gap-2 shadow-brutal hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              <ArrowLeft className="size-3.5" />
              {t("continueShopping", locale)}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}
