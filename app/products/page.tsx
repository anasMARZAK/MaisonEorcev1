import type { Metadata } from "next";
import ProductsClient from "./products-client";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "La Collection | Maison Écorce",
  description:
    "Découvrez notre collection de bottes, sandales et sacs en cuir d'exception, fabriqués à la main en Toscane.",
  alternates: {
    canonical: "https://maison-ecorce.vercel.app/products",
  },
};

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full bg-[#F5F3EE] dark:bg-[#1A1917] min-h-screen pt-28 pb-24 px-6 flex items-center justify-center">
          <span className="font-serif text-xl tracking-widest text-[#1A1917]/40 dark:text-[#F5F3EE]/40 uppercase animate-pulse">
            Maison Écorce...
          </span>
        </div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}
