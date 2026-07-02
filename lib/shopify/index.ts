import { mockClient } from "./mock-client";
import { realShopifyClient } from "./client";

const getHasToken = (): boolean => {
  // Server-side environment checks
  if (typeof window === "undefined") {
    return !!(
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN &&
      process.env.SHOPIFY_STORE_DOMAIN
    );
  }
  // Client-side environment checks (Storefront API keys are safe to expose publicly)
  return !!(
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN &&
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  );
};

export const useMock = !getHasToken();

export const shopifyClient = useMock ? mockClient : realShopifyClient;
export default shopifyClient;
