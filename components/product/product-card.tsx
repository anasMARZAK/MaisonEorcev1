"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../types/shopify";
import { useCartStore } from "../../store/cart-store";
import { useCart } from "../../hooks/use-cart";
import { t } from "../../lib/copy-dict";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const locale = useCartStore((state) => state.locale);
  const { addToCart, isLoading } = useCart();
  const [hovered, setHovered] = useState(false);

  const images = product.images.edges.map((e) => e.node);
  const mainImage = images[0];
  const hoverImage = images[1] || images[0];

  const price = product.priceRange.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice;
  const isOnSale = !!compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  const isBestseller = product.tags.includes("bestseller");
  const isNew = product.tags.includes("new");

  const defaultVariantId = product.variants.edges[0]?.node.id;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (defaultVariantId) {
      addToCart(defaultVariantId, 1);
    }
  };

  return (
    <Link href={`/products/${product.handle}`} className="block h-full cursor-pointer group">
      {/* Editorial Brutalist outline card with pressing transition */}
      <div 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="bg-[#F5F3EE] dark:bg-[#1A1917] border-2 border-[#1A1917] dark:border-[#F5F3EE] p-4 h-full flex flex-col justify-between transition-all duration-200 shadow-brutal hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] rounded-none relative overflow-hidden"
      >
        <div>
          {/* Flush-to-edge Card Image Display */}
          <div className="relative aspect-[4/5] -mx-4 -mt-4 overflow-hidden bg-[#e9e5db] dark:bg-[#2c2b28] border-b-2 border-[#1A1917] dark:border-[#F5F3EE]">
            {mainImage ? (
              <>
                {/* Main image */}
                <Image
                  src={mainImage.url}
                  alt={mainImage.altText || product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  quality={70}
                  className={`object-cover transition-opacity duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] grayscale contrast-[1.02] ${
                    hovered && images[1] ? "opacity-0" : "opacity-100"
                  }`}
                />
                {/* Hover detail image */}
                {images[1] && (
                  <Image
                    src={hoverImage.url}
                    alt={hoverImage.altText || product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    quality={70}
                    className={`object-cover absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] scale-100 grayscale contrast-[1.05] ${
                      hovered ? "opacity-100 scale-105" : "opacity-0"
                    }`}
                  />
                )}
              </>
            ) : (
              <div className="w-full h-full bg-[#1A1917]/10 dark:bg-[#F5F3EE]/10" />
            )}

            {/* dynamic status badges - flat & square */}
            <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
              {isOnSale && (
                <span className="bg-[#9B2C2C] text-[#F5F3EE] font-mono text-[8px] font-bold tracking-[0.15em] px-2.5 py-0.5 border border-[#F5F3EE]/10 uppercase rounded-none">
                  {locale === "en" ? "SALE" : "SOLDES"}
                </span>
              )}
              {isNew && (
                <span className="bg-[#1A1917] text-[#F5F3EE] dark:bg-[#F5F3EE] dark:text-[#1A1917] font-mono text-[8px] font-bold tracking-[0.15em] px-2.5 py-0.5 border border-[#1A1917]/10 dark:border-[#F5F3EE]/10 uppercase rounded-none">
                  {locale === "en" ? "NEW" : "NOUVEAU"}
                </span>
              )}
              {isBestseller && !isNew && (
                <span className="bg-[#C49B66] text-[#1A1917] font-mono text-[8px] font-bold tracking-[0.15em] px-2.5 py-0.5 uppercase rounded-none">
                  BESTSELLER
                </span>
              )}
            </div>

            {/* Quick Add Overlay on Hover - Flat coupon style button */}
            <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 z-10 pointer-events-none">
              <button
                onClick={handleQuickAdd}
                disabled={isLoading}
                className="pointer-events-auto bg-[#1A1917] text-[#F5F3EE] dark:bg-[#F5F3EE] dark:text-[#1A1917] border border-[#1A1917] dark:border-[#F5F3EE] rounded-none px-4 py-2 text-[9px] font-mono tracking-widest uppercase font-bold hover:bg-[#F5F3EE] hover:text-[#1A1917] dark:hover:bg-[#1A1917] dark:hover:text-[#F5F3EE] transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                + {t("quickAdd", locale)}
              </button>
            </div>
          </div>

          {/* Product metadata */}
          <div className="flex flex-col gap-1 flex-1 mt-3">
            <h3 className="font-serif text-sm md:text-base font-extrabold uppercase text-[#1A1917] dark:text-[#F5F3EE] leading-snug group-hover:text-[#C49B66] transition-colors duration-200">
              {product.title}
            </h3>
            
            {/* Price display with strikethrough */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-mono font-bold text-[#1A1917] dark:text-[#F5F3EE]">
                {parseFloat(price.amount).toFixed(2)}{" "}
                {price.currencyCode === "EUR" ? "€" : price.currencyCode}
              </span>
              {isOnSale && compareAtPrice && (
                <span className="text-[10px] font-mono text-[#1A1917]/40 dark:text-[#F5F3EE]/40 line-through font-medium">
                  {parseFloat(compareAtPrice.amount).toFixed(2)}{" "}
                  {compareAtPrice.currencyCode === "EUR" ? "€" : compareAtPrice.currencyCode}
                </span>
              )}
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}
