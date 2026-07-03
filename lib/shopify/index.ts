import { mockClient } from "./mock-client";
import { realShopifyClient } from "./client";

const getHasToken = (): boolean => {
  // Check both server-only and public env vars on either side
  const domain =
    process.env.SHOPIFY_STORE_DOMAIN ||
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token =
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  return !!(domain && token);
};

export const useMock = !getHasToken();

export const shopifyClient = useMock ? mockClient : realShopifyClient;
export default shopifyClient;
