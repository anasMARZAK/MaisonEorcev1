"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { shopifyClient } from "../../../lib/shopify";
import { useCartStore } from "../../../store/cart-store";
import { useCart } from "../../../hooks/use-cart";
import { t } from "../../../lib/copy-dict";
import { Product, ProductVariant } from "../../../types/shopify";
import ProductCard from "../../../components/product/product-card";
import Reviews from "../../../components/home/reviews";
import ProductGallery from "../../../components/product/product-gallery";
import ProductVariants from "../../../components/product/product-variants";
import ProductInfoAccordion from "../../../components/product/product-info-accordion";
import { Award, Globe, ShoppingBag } from "lucide-react";

interface ProductDetailClientProps {
  initialProduct: Product | null;
  allProducts: Product[];
  handle: string;
}

export default function ProductDetailClient({
  initialProduct,
  allProducts,
  handle,
}: ProductDetailClientProps) {
  const locale = useCartStore((state) => state.locale);
  const { addToCart, isLoading } = useCart();

  // 1. Fetch product
  const { data: product } = useQuery({
    queryKey: ["product", handle, locale],
    queryFn: () => shopifyClient.getProductByHandle(handle, locale),
    initialData: initialProduct,
    enabled: !!handle,
  });

  // 2. Local states
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Reset states when product handle changes
  useEffect(() => {
    if (product) {
      setActiveImgIdx(0);
      setQuantity(1);
      
      const colorOpt = product.options?.find((o) => o.name === "Color");
      const sizeOpt = product.options?.find((o) => o.name === "Size");
      
      if (colorOpt) setSelectedColor(colorOpt.values[0]);
      if (sizeOpt) setSelectedSize(sizeOpt.values[0]);
    }
  }, [product, handle]);

  const images = useMemo(() => product?.images?.edges?.map((e) => e.node) || [], [product]);

  // Resolve matching variant based on selections
  const activeVariant: ProductVariant | undefined = product
    ? product.variants.edges.find(({ node }) => {
        const colorMatch = !selectedColor || node.selectedOptions.some((o) => o.name === "Color" && o.value === selectedColor);
        const sizeMatch = !selectedSize || node.selectedOptions.some((o) => o.name === "Size" && o.value === selectedSize);
        return colorMatch && sizeMatch;
      })?.node || product.variants.edges[0]?.node
    : undefined;

  // Sync activeImgIdx with selected variant image
  useEffect(() => {
    const imageUrl = activeVariant?.image?.url;
    if (imageUrl) {
      const idx = images.findIndex((img) => img.url === imageUrl);
      if (idx > -1) {
        setActiveImgIdx(idx);
      }
    }
  }, [activeVariant?.image?.url, images]);

  if (!product) {
    return (
      <div className="w-full text-center py-32 font-mono text-xs uppercase font-bold">
        Produit introuvable.
      </div>
    );
  }

  const price = activeVariant?.price || product.priceRange.minVariantPrice;
  const compareAtPrice = activeVariant?.compareAtPrice || product.compareAtPriceRange?.minVariantPrice;
  const isOnSale = !!compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  const handleAddToCart = () => {
    if (activeVariant) {
      addToCart(activeVariant.id, quantity);
    }
  };

  // Filter recommendations: items matching category tags (excluding current)
  const categoryTag = product.tags.find((t) => ["bottes", "sandales", "sacs-en-cuir", "sacs"].includes(t));
  const recommendations = allProducts
    .filter((p) => p.id !== product.id && p.tags.includes(categoryTag || ""))
    .slice(0, 3);

  const colorOption = product.options?.find((o) => o.name === "Color");
  const sizeOption = product.options?.find((o) => o.name === "Size");

  return (
    <div className="w-full bg-[#F5F3EE] dark:bg-[#1A1917] pt-28 pb-24 px-6 font-sans relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-24">
        
        {/* Product Detail Main Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Image Gallery (col-span-7) */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={images}
              productTitle={product.title}
              activeImgIdx={activeImgIdx}
              setActiveImgIdx={setActiveImgIdx}
              isOnSale={isOnSale}
              locale={locale}
            />
          </div>

          {/* Right Column: Checkout Info & Accordion (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-28">
            
            {/* Headings */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#C49B66] font-bold">
                Maison Écorce
              </span>
              <h1 className="font-serif text-4xl md:text-5xl text-[#1A1917] dark:text-[#F5F3EE] tracking-tight font-extrabold uppercase italic lowercase leading-[1.05]">
                {product.title}
              </h1>
              
              {/* Price Row */}
              <div className="flex items-center gap-3 mt-2">
                <span className="font-mono text-xl font-bold text-[#1A1917] dark:text-[#F5F3EE]">
                  {parseFloat(price.amount).toFixed(2)}{" "}
                  {price.currencyCode === "EUR" ? "€" : price.currencyCode}
                </span>
                {isOnSale && compareAtPrice && (
                  <span className="font-mono text-sm text-[#1A1917]/40 dark:text-[#F5F3EE]/40 line-through">
                    {parseFloat(compareAtPrice.amount).toFixed(2)}{" "}
                    {compareAtPrice.currencyCode === "EUR" ? "€" : compareAtPrice.currencyCode}
                  </span>
                )}
              </div>
            </div>

            {/* Options Selection */}
            <ProductVariants
              colorOption={colorOption}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              sizeOption={sizeOption}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              locale={locale}
            />

            {/* Stepper + Add to Bag CTA */}
            <div className="flex gap-4 border-t-2 border-[#1A1917]/10 dark:border-[#F5F3EE]/15 pt-6 items-center">
              
              {/* Stepper - Flat monospace square block */}
              <div className="flex items-center border-2 border-[#1A1917] dark:border-[#F5F3EE] rounded-none h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 hover:bg-[#1A1917]/10 dark:hover:bg-[#F5F3EE]/10 h-full text-[#1A1917]/70 dark:text-[#F5F3EE]/70 font-mono text-xs cursor-pointer font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 text-[10px] font-mono font-bold min-w-[24px] text-center text-[#1A1917] dark:text-[#F5F3EE] border-x border-[#1A1917] dark:border-[#F5F3EE] h-full flex items-center justify-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 hover:bg-[#1A1917]/10 dark:hover:bg-[#F5F3EE]/10 h-full text-[#1A1917]/70 dark:text-[#F5F3EE]/70 font-mono text-xs cursor-pointer font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add CTA - Brutalist shadow button */}
              <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="flex-1 bg-[#1A1917] text-[#F5F3EE] dark:bg-[#F5F3EE] dark:text-[#1A1917] border-2 border-[#1A1917] dark:border-[#F5F3EE] rounded-none h-12 text-[10px] font-mono tracking-[0.25em] uppercase font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-brutal hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] cursor-pointer"
              >
                <ShoppingBag strokeWidth={2} className="size-4" />
                {isLoading ? t("loading", locale) : t("addToBag", locale)}
              </button>
            </div>

            {/* Brand Value Accents */}
            <div className="grid grid-cols-2 gap-4 border-t border-[#1A1917]/10 dark:border-[#F5F3EE]/15 pt-6 text-[9px] font-mono font-bold uppercase tracking-wider text-[#1A1917]/60 dark:text-[#F5F3EE]/60">
              <div className="flex items-center gap-2">
                <Award className="size-4 text-[#C49B66] shrink-0" strokeWidth={2} />
                <span>Atelier Toscan</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="size-4 text-[#C49B66] shrink-0" strokeWidth={2} />
                <span>Tannage Végétal</span>
              </div>
            </div>

            {/* Collapsible Accordion Tabs */}
            <ProductInfoAccordion description={product.description} locale={locale} />

          </div>
        </div>

        {/* Dynamic Reviews Deck */}
        <Reviews productHandle={product.handle} />

        {/* Related recommendations Section */}
        {recommendations.length > 0 && (
          <div className="flex flex-col gap-12 border-t-2 border-[#1A1917]/10 dark:border-[#F5F3EE]/15 pt-20">
            <h2 className="font-serif text-4xl md:text-5xl text-center text-[#1A1917] dark:text-[#F5F3EE] tracking-tight font-extrabold uppercase italic lowercase leading-none mb-4">
              {t("relatedProducts", locale)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {recommendations.map((p, idx) => (
                <div key={p.id} className={idx === 1 ? "lg:translate-y-8" : ""}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
