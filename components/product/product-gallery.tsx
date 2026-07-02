"use client";

import React from "react";
import Image from "next/image";
import { Image as ShopifyImage } from "../../types/shopify";

interface ProductGalleryProps {
  images: ShopifyImage[];
  productTitle: string;
  activeImgIdx: number;
  setActiveImgIdx: (idx: number) => void;
  isOnSale: boolean;
  locale: "fr" | "en";
}

export default function ProductGallery({
  images,
  productTitle,
  activeImgIdx,
  setActiveImgIdx,
  isOnSale,
  locale,
}: ProductGalleryProps) {
  const activeImage = images[activeImgIdx] || images[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Stage Frame */}
      <div className="bg-transparent p-1.5 border-2 border-[#1A1917] dark:border-[#F5F3EE] rounded-none relative overflow-hidden">
        <div className="relative aspect-[4/5] w-full border border-[#1A1917]/20 dark:border-[#F5F3EE]/20 bg-[#e9e5db] dark:bg-[#2c2b28] rounded-none overflow-hidden">
          {activeImage ? (
            <Image
              src={activeImage.url}
              alt={activeImage.altText || productTitle}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover grayscale contrast-[1.02]"
            />
          ) : (
            <div className="w-full h-full bg-[#1A1917]/10 dark:bg-[#F5F3EE]/10 animate-pulse" />
          )}

          {isOnSale && (
            <span className="absolute top-4 left-4 bg-[#9B2C2C] text-[#F5F3EE] font-mono text-[8px] font-bold tracking-[0.25em] px-2.5 py-1 uppercase z-10 border border-[#F5F3EE]/15">
              {locale === "en" ? "SALE" : "SOLDES"}
            </span>
          )}
        </div>
      </div>

      {/* Thumbnail Navigation Row */}
      {images.length > 1 && (
        <div className="flex gap-3 px-1 overflow-x-auto pb-2">
          {images.map((img, idx) => {
            const active = idx === activeImgIdx;
            return (
              <button
                key={idx}
                onClick={() => setActiveImgIdx(idx)}
                className={`relative size-16 bg-[#e9e5db] dark:bg-[#2c2b28] shrink-0 border-2 transition-all cursor-pointer rounded-none ${
                  active
                    ? "border-[#C49B66]"
                    : "border-[#1A1917]/15 dark:border-[#F5F3EE]/15 opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.url}
                  alt={`Detail thumbnail ${idx + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover grayscale contrast-[1.02]"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
