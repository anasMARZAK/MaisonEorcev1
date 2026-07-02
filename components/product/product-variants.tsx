"use client";

import React from "react";
import { ProductOption } from "../../types/shopify";
import { t } from "../../lib/copy-dict";

interface ProductVariantsProps {
  colorOption?: ProductOption;
  selectedColor: string;
  setSelectedColor: (val: string) => void;
  sizeOption?: ProductOption;
  selectedSize: string;
  setSelectedSize: (val: string) => void;
  locale: "fr" | "en";
}

export default function ProductVariants({
  colorOption,
  selectedColor,
  setSelectedColor,
  sizeOption,
  selectedSize,
  setSelectedSize,
  locale,
}: ProductVariantsProps) {
  return (
    <div className="flex flex-col gap-6 border-t-2 border-[#1A1917]/10 dark:border-[#F5F3EE]/15 pt-6">
      
      {/* Color Selector */}
      {colorOption && (
        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-[#1A1917]/40 dark:text-[#F5F3EE]/40">
            {t("colors", locale)} : <span className="text-[#C49B66]">{selectedColor}</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {colorOption.values.map((col) => {
              const active = selectedColor === col;
              return (
                <button
                  key={col}
                  onClick={() => setSelectedColor(col)}
                  className={`px-4 py-2 border-2 transition-all cursor-pointer rounded-none text-[9px] font-mono uppercase font-bold ${
                    active
                      ? "bg-[#1A1917] text-[#F5F3EE] border-[#1A1917] dark:bg-[#F5F3EE] dark:text-[#1A1917] dark:border-[#F5F3EE]"
                      : "border-[#1A1917]/15 hover:border-[#1A1917] text-[#1A1917]/70 dark:border-[#F5F3EE]/15 dark:hover:border-[#F5F3EE] dark:text-[#F5F3EE]/70"
                  }`}
                >
                  {col}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selector */}
      {sizeOption && (
        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-[#1A1917]/40 dark:text-[#F5F3EE]/40">
            {t("sizes", locale)} : <span className="text-[#C49B66]">{selectedSize}</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {sizeOption.values.map((sz) => {
              const active = selectedSize === sz;
              return (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-4 py-2 border-2 transition-all cursor-pointer rounded-none text-[9px] font-mono uppercase font-bold ${
                    active
                      ? "bg-[#1A1917] text-[#F5F3EE] border-[#1A1917] dark:bg-[#F5F3EE] dark:text-[#1A1917] dark:border-[#F5F3EE]"
                      : "border-[#1A1917]/15 hover:border-[#1A1917] text-[#1A1917]/70 dark:border-[#F5F3EE]/15 dark:hover:border-[#F5F3EE] dark:text-[#F5F3EE]/70"
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
