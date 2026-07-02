import { MetadataRoute } from "next";
import { SEEDED_PRODUCTS } from "../lib/shopify/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://maison-ecorce.vercel.app";

  const staticUrls = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/products`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/policies`, lastModified: new Date() },
  ];

  const productUrls = SEEDED_PRODUCTS.map((prod) => ({
    url: `${baseUrl}/products/${prod.handle}`,
    lastModified: new Date(),
  }));

  return [...staticUrls, ...productUrls];
}
