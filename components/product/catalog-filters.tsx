"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { t } from "../../lib/copy-dict";

interface CatalogFiltersProps {
  selectedCollection: string;
  setSelectedCollection: (val: string) => void;
  selectedColor: string;
  setSelectedColor: (val: string) => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  locale: "fr" | "en";
  categories: Array<{ handle: string; label: string }>;
  colors: Array<{ value: string; label: string }>;
}

export default function CatalogFilters({
  selectedCollection,
  setSelectedCollection,
  selectedColor,
  setSelectedColor,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  clearFilters,
  hasActiveFilters,
  locale,
  categories,
  colors,
}: CatalogFiltersProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8 font-mono text-[10px] uppercase font-bold text-[#1A1917] dark:text-[#F5F3EE]">
      {/* Category Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="tracking-[0.25em] text-[#C49B66]">
          {t("filterCategory", locale)}
        </h4>
        <div className="flex flex-col gap-2 items-start">
          {categories.map((cat) => (
            <button
              key={cat.handle}
              onClick={() => {
                setSelectedCollection(cat.handle);
                router.replace(`/products?collection=${cat.handle}`);
              }}
              className={`text-left tracking-widest hover:text-[#C49B66] transition-colors py-0.5 cursor-pointer ${
                selectedCollection === cat.handle
                  ? "text-[#C49B66] underline decoration-2 underline-offset-4"
                  : "text-[#1A1917]/70 dark:text-[#F5F3EE]/70"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="tracking-[0.25em] text-[#C49B66]">
          {t("filterColor", locale)}
        </h4>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const active = selectedColor === color.value;
            return (
              <button
                key={color.value}
                onClick={() => setSelectedColor(active ? "" : color.value)}
                className={`px-3 py-1.5 border-2 transition-all cursor-pointer rounded-none text-[8px] font-bold uppercase tracking-wider ${
                  active
                    ? "bg-[#1A1917] text-[#F5F3EE] border-[#1A1917] dark:bg-[#F5F3EE] dark:text-[#1A1917] dark:border-[#F5F3EE]"
                    : "border-[#1A1917]/20 hover:border-[#1A1917] text-[#1A1917]/70 dark:border-[#F5F3EE]/20 dark:hover:border-[#F5F3EE] dark:text-[#F5F3EE]/70"
                }`}
              >
                {color.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Filter Inputs */}
      <div className="flex flex-col gap-3">
        <h4 className="tracking-[0.25em] text-[#C49B66]">
          {t("filterPrice", locale)}
        </h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min (€)"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full bg-transparent border-2 border-[#1A1917] dark:border-[#F5F3EE] rounded-none px-3 py-2 text-[10px] font-bold outline-none text-[#1A1917] dark:text-[#F5F3EE]"
          />
          <span className="text-[#1A1917]/40 dark:text-[#F5F3EE]/40 font-bold">—</span>
          <input
            type="number"
            placeholder="Max (€)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-transparent border-2 border-[#1A1917] dark:border-[#F5F3EE] rounded-none px-3 py-2 text-[10px] font-bold outline-none text-[#1A1917] dark:text-[#F5F3EE]"
          />
        </div>
      </div>

      {/* Clear Action */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center justify-center gap-2 border-2 border-red-700 text-red-700 dark:border-red-500 dark:text-red-500 hover:bg-red-700 hover:text-[#F5F3EE] dark:hover:bg-red-500 dark:hover:text-[#1A1917] py-2.5 rounded-none text-[9px] uppercase tracking-widest font-bold transition-all mt-4 cursor-pointer"
        >
          <X className="size-3.5" strokeWidth={2} />
          {t("clearAll", locale)}
        </button>
      )}
    </div>
  );
}
