"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { shopifyClient } from "../../lib/shopify";
import { useCartStore } from "../../store/cart-store";
import { t } from "../../lib/copy-dict";
import ProductCard from "../../components/product/product-card";
import { Skeleton } from "../../components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "../../components/ui/sheet";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CatalogFilters from "../../components/product/catalog-filters";

export default function ProductsClient() {
  const locale = useCartStore((state) => state.locale);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Filter & Sort state variables
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync state with URL query parameters on load
  useEffect(() => {
    const colParam = searchParams.get("collection");
    if (colParam) {
      setSelectedCollection(colParam);
    }
  }, [searchParams]);

  // Fetch all products via TanStack Query
  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ["products", { locale }],
    queryFn: () => shopifyClient.getProducts({ locale }),
  });

  const categories = [
    { handle: "bottes", label: locale === "en" ? "Boots" : "Bottes" },
    { handle: "sandales", label: locale === "en" ? "Sandals" : "Sandales" },
    { handle: "sacs-en-cuir", label: locale === "en" ? "Leather Bags" : "Sacs en Cuir" },
    { handle: "sacs", label: locale === "en" ? "Bags" : "Sacs" },
  ];

  const colors = [
    { value: "noir", label: locale === "en" ? "Black" : "Noir" },
    { value: "camel", label: locale === "en" ? "Camel" : "Camel" },
    { value: "cognac", label: locale === "en" ? "Cognac" : "Cognac" },
    { value: "bordeaux", label: locale === "en" ? "Burgundy" : "Bordeaux" },
    { value: "nude", label: locale === "en" ? "Nude" : "Nude" },
    { value: "gold", label: locale === "en" ? "Gold" : "Doré" },
    { value: "naturel", label: locale === "en" ? "Natural" : "Naturel" },
  ];

  // Apply filters locally
  let filteredProducts = [...products];

  // 1. Collection filter
  if (selectedCollection) {
    filteredProducts = filteredProducts.filter((p) => p.tags.includes(selectedCollection));
  }

  // 2. Color filter
  if (selectedColor) {
    filteredProducts = filteredProducts.filter((p) =>
      p.tags.some((tag) => tag.toLowerCase() === selectedColor.toLowerCase())
    );
  }

  // 3. Price range filters
  if (minPrice) {
    const minVal = parseFloat(minPrice);
    if (!isNaN(minVal)) {
      filteredProducts = filteredProducts.filter(
        (p) => parseFloat(p.priceRange.minVariantPrice.amount) >= minVal
      );
    }
  }

  if (maxPrice) {
    const maxVal = parseFloat(maxPrice);
    if (!isNaN(maxVal)) {
      filteredProducts = filteredProducts.filter(
        (p) => parseFloat(p.priceRange.minVariantPrice.amount) <= maxVal
      );
    }
  }

  // 4. Sort logic
  if (sortBy === "price-asc") {
    filteredProducts.sort(
      (a, b) =>
        parseFloat(a.priceRange.minVariantPrice.amount) -
        parseFloat(b.priceRange.minVariantPrice.amount)
    );
  } else if (sortBy === "price-desc") {
    filteredProducts.sort(
      (a, b) =>
        parseFloat(b.priceRange.minVariantPrice.amount) -
        parseFloat(a.priceRange.minVariantPrice.amount)
    );
  } else if (sortBy === "newest") {
    filteredProducts.sort((a, b) => {
      const aNew = a.tags.includes("new") ? 1 : 0;
      const bNew = b.tags.includes("new") ? 1 : 0;
      return bNew - aNew;
    });
  }

  const clearFilters = () => {
    setSelectedCollection("");
    setSelectedColor("");
    setMinPrice("");
    setMaxPrice("");
    router.replace("/products");
  };

  const hasActiveFilters = !!(selectedCollection || selectedColor || minPrice || maxPrice);

  return (
    <div className="w-full bg-[#F5F3EE] dark:bg-[#1A1917] min-h-screen pt-28 pb-24 px-6 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Page Title Header */}
        <div className="flex flex-col gap-4 border-b-2 border-[#1A1917]/10 dark:border-[#F5F3EE]/15 pb-8">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#C49B66] font-bold">
            Maison Écorce
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-[#1A1917] dark:text-[#F5F3EE] tracking-tight font-extrabold uppercase italic leading-none">
            {locale === "en" ? "The Catalog" : "La Collection"}
          </h1>
        </div>

        {/* Filters and Sorting Control Bar */}
        <div className="bg-transparent border-2 border-[#1A1917] dark:border-[#F5F3EE] p-4 rounded-none z-20">
          <div className="w-full flex items-center justify-between gap-4">
            
            {/* Left side trigger */}
            <div className="flex items-center gap-4">
              <span className="hidden lg:inline text-[9px] font-mono uppercase tracking-[0.25em] text-[#1A1917]/40 dark:text-[#F5F3EE]/40 font-bold">
                {t("filters", locale)}
              </span>

              {/* Mobile Filter Drawer Trigger */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger className="lg:hidden flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.15em] font-bold hover:text-[#C49B66] border-none bg-transparent cursor-pointer text-[#1A1917] dark:text-[#F5F3EE]">
                  <SlidersHorizontal className="size-3.5" strokeWidth={2} />
                  {t("filters", locale)}
                </SheetTrigger>
                <SheetContent side="left" className="w-[85%] sm:max-w-sm bg-[#F5F3EE] dark:bg-[#1A1917] border-r-2 border-[#1A1917] dark:border-[#F5F3EE] p-6 flex flex-col gap-6 overflow-y-auto z-[100] rounded-none">
                  <SheetHeader className="text-left gap-1 border-b border-[#1A1917]/10 dark:border-[#F5F3EE]/15 pb-4">
                    <SheetTitle className="font-serif text-xl font-extrabold uppercase italic">
                      {t("filters", locale)}
                    </SheetTitle>
                    <SheetDescription className="text-[9px] tracking-widest uppercase font-mono font-bold text-[#1A1917]/40 dark:text-[#F5F3EE]/40">
                      Ajuster votre recherche
                    </SheetDescription>
                  </SheetHeader>
                  
                  <CatalogFilters
                    selectedCollection={selectedCollection}
                    setSelectedCollection={setSelectedCollection}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    clearFilters={clearFilters}
                    hasActiveFilters={hasActiveFilters}
                    locale={locale}
                    categories={categories}
                    colors={colors}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* Middle Count Info Statement */}
            <div className="text-[9px] font-mono tracking-widest uppercase text-[#1A1917]/40 dark:text-[#F5F3EE]/40 font-bold">
              {isLoading ? (
                <Skeleton className="h-3.5 w-28 bg-[#1A1917]/10 dark:bg-[#F5F3EE]/10" />
              ) : (
                t("showingCount", locale)
                  .replace("{x}", String(filteredProducts.length))
                  .replace("{y}", String(products.length))
              )}
            </div>

            {/* Right side selector */}
            <div className="flex items-center gap-1 text-[9px] font-mono uppercase font-bold text-[#1A1917]/70 dark:text-[#F5F3EE]/70">
              <ArrowUpDown className="size-3.5 text-[#1A1917]/40 dark:text-[#F5F3EE]/40" strokeWidth={2} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-mono tracking-wider uppercase font-bold border-none outline-none focus:ring-0 cursor-pointer pr-4 text-[#1A1917] dark:text-[#F5F3EE]"
              >
                <option value="featured">{t("sortFeatured", locale)}</option>
                <option value="newest">{t("sortNewest", locale)}</option>
                <option value="price-asc">{t("sortPriceAsc", locale)}</option>
                <option value="price-desc">{t("sortPriceDesc", locale)}</option>
              </select>
            </div>

          </div>
        </div>

        {/* Catalog Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 border-2 border-[#1A1917] dark:border-[#F5F3EE] p-6 rounded-none bg-transparent shadow-brutal sticky top-24">
            <CatalogFilters
              selectedCollection={selectedCollection}
              setSelectedCollection={setSelectedCollection}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              clearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
              locale={locale}
              categories={categories}
              colors={colors}
            />
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-transparent p-4 border border-[#1A1917]/25 dark:border-[#F5F3EE]/25 rounded-none aspect-[4/6]"
                  >
                    <div className="flex flex-col gap-4 h-full">
                      <Skeleton className="w-full aspect-[4/5] rounded-none bg-[#1A1917]/10 dark:bg-[#F5F3EE]/10" />
                      <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-3/4 bg-[#1A1917]/10 dark:bg-[#F5F3EE]/10" />
                        <Skeleton className="h-3.5 w-1/3 bg-[#1A1917]/10 dark:bg-[#F5F3EE]/10 mt-1" />
                      </div>
                    </div>
                  </div>
                ))
              ) : isError ? (
                <div className="col-span-full py-24 border-2 border-dashed border-[#9B2C2C]/35 rounded-none flex flex-col items-center justify-center text-center p-8 gap-4 bg-transparent">
                  <p className="font-serif italic text-lg text-[#9B2C2C]">
                    {locale === "en" ? "Unable to load products." : "Impossible de charger les produits."}
                  </p>
                  <p className="font-mono text-[9px] tracking-widest uppercase text-[#1A1917]/40 dark:text-[#F5F3EE]/40">
                    {error?.message || (locale === "en" ? "An error occurred." : "Une erreur est survenue.")}
                  </p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="col-span-full py-24 border-2 border-dashed border-[#1A1917]/35 dark:border-[#F5F3EE]/35 rounded-none flex flex-col items-center justify-center text-center p-8 text-[#1A1917]/40 dark:text-[#F5F3EE]/40 gap-4 bg-transparent">
                  <p className="font-serif italic text-lg">Aucun produit ne correspond à vos filtres.</p>
                  <button
                    onClick={clearFilters}
                    className="font-mono text-[9px] tracking-widest uppercase font-bold border-2 border-[#1A1917] dark:border-[#F5F3EE] px-5 py-2.5 hover:bg-[#1A1917] hover:text-[#F5F3EE] dark:hover:bg-[#F5F3EE] dark:hover:text-[#1A1917] text-[#1A1917] dark:text-[#F5F3EE] rounded-none transition-all cursor-pointer"
                  >
                    {t("clearAll", locale)}
                  </button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </main>

        </div>

      </div>
    </div>
  );
}
