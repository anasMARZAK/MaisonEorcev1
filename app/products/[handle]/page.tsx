import type { Metadata } from "next";
import ProductDetailClient from "./product-detail-client";
import { shopifyClient } from "../../../lib/shopify";

interface Props {
  params: Promise<{
    handle: string;
  }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await shopifyClient.getProductByHandle(resolvedParams.handle, "fr");
  if (!product) {
    return {
      title: "Produit Introuvable | Maison Écorce",
    };
  }

  const mainImage = product.images.edges[0]?.node.url || "";
  
  return {
    title: `${product.title} | Maison Écorce`,
    description: product.description.substring(0, 160) + "...",
    alternates: {
      canonical: `https://maison-ecorce.vercel.app/products/${resolvedParams.handle}`,
    },
    openGraph: {
      title: `${product.title} | Maison Écorce`,
      description: product.description.substring(0, 160) + "...",
      images: [{ url: mainImage }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Maison Écorce`,
      description: product.description.substring(0, 160) + "...",
      images: [mainImage],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  
  // Fetch product on the server for initial render
  const product = await shopifyClient.getProductByHandle(resolvedParams.handle, "fr");
  
  // Fetch recommendations
  const allProducts = await shopifyClient.getProducts({ locale: "fr" });
  
  return (
    <ProductDetailClient 
      initialProduct={product} 
      allProducts={allProducts} 
      handle={resolvedParams.handle} 
    />
  );
}
