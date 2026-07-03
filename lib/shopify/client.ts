import axiosInstance from "../axios";
import { Product, Collection, Cart, ProductReview, ReviewAggregate } from "../../types/shopify";
import * as schemas from "../../schemas/shopify";

// Resolve environment variables supporting both server-only and client-safe public prefixes
const getStoreDomain = (): string => {
  return (
    process.env.SHOPIFY_STORE_DOMAIN ||
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
    ""
  );
};

const getStorefrontAccessToken = (): string => {
  return (
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
    ""
  );
};

// Custom fetch helper for Shopify GraphQL queries
const shopifyFetch = async <T>(query: string, variables: Record<string, unknown> = {}): Promise<T> => {
  const domain = getStoreDomain();
  const token = getStorefrontAccessToken();

  if (!domain || !token) {
    throw new Error(
      "Shopify domain or access token missing. Fill in SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN (or their NEXT_PUBLIC_ equivalents) to run the real client."
    );
  }

  const endpoint = `https://${domain}/api/2024-01/graphql.json`;
  
  const response = await axiosInstance.post(
    endpoint,
    { query, variables },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
    }
  );

  if (response.data.errors) {
    throw new Error(
      `Shopify API error: ${response.data.errors.map((e: { message: string }) => e.message).join(", ")}`
    );
  }

  return response.data.data;
};

// Graphql Query fragments
const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    availableForSale
    tags
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 5) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
    options {
      name
      values
    }
  }
`;

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
              }
              product {
                id
                title
                handle
                tags
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const realShopifyClient = {
  getProducts: async (params?: {
    collection?: string;
    query?: string;
    locale?: string;
  }): Promise<Product[]> => {
    try {
      let queryStr = "";
      const variables: Record<string, unknown> = {
        lang: params?.locale ? params.locale.toUpperCase() : "FR",
      };

      if (params?.collection) {
        queryStr = `
          query GetCollectionProducts($handle: String!, $lang: LanguageCode) @inContext(language: $lang) {
            collection(handle: $handle) {
              products(first: 50) {
                edges {
                  node {
                    ...ProductFields
                  }
                }
              }
            }
          }
          ${PRODUCT_FRAGMENT}
        `;
        variables.handle = params.collection;
        const data = await shopifyFetch<unknown>(queryStr, variables);
        const parsed = schemas.getCollectionProductsResponseSchema.parse(data);
        return parsed.collection?.products.edges.map((e) => e.node as Product) || [];
      } else {
        queryStr = `
          query GetProducts($lang: LanguageCode, $query: String) @inContext(language: $lang) {
            products(first: 50, query: $query) {
              edges {
                node {
                  ...ProductFields
                }
              }
            }
          }
          ${PRODUCT_FRAGMENT}
        `;
        variables.query = params?.query || null;
        const data = await shopifyFetch<unknown>(queryStr, variables);
        const parsed = schemas.getProductsResponseSchema.parse(data);
        return parsed.products.edges.map((e) => e.node as Product) || [];
      }
    } catch (error) {
      console.error("[shopifyClient.getProducts error]:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  },

  getProductByHandle: async (handle: string, locale?: string): Promise<Product | null> => {
    try {
      const queryStr = `
        query GetProductByHandle($handle: String!, $lang: LanguageCode) @inContext(language: $lang) {
          product(handle: $handle) {
            ...ProductFields
          }
        }
        ${PRODUCT_FRAGMENT}
      `;
      const data = await shopifyFetch<unknown>(queryStr, {
        handle,
        lang: locale ? locale.toUpperCase() : "FR",
      });
      const parsed = schemas.getProductByHandleResponseSchema.parse(data);
      return parsed.product as Product | null;
    } catch (error) {
      console.error("[shopifyClient.getProductByHandle error]:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  },

  getCollections: async (locale?: string): Promise<Collection[]> => {
    try {
      const queryStr = `
        query GetCollections($lang: LanguageCode) @inContext(language: $lang) {
          collections(first: 10) {
            edges {
              node {
                id
                handle
                title
                description
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      `;
      const data = await shopifyFetch<unknown>(queryStr, { lang: locale ? locale.toUpperCase() : "FR" });
      const parsed = schemas.getCollectionsResponseSchema.parse(data);
      return parsed.collections.edges.map((e) => e.node as Collection) || [];
    } catch (error) {
      console.error("[shopifyClient.getCollections error]:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  },

  createCart: async (locale?: string): Promise<Cart> => {
    try {
      const queryStr = `
        mutation CreateCart($lang: LanguageCode) @inContext(language: $lang) {
          cartCreate {
            cart {
              ...CartFields
            }
          }
        }
        ${CART_FRAGMENT}
      `;
      const data = await shopifyFetch<unknown>(queryStr, {
        lang: locale ? locale.toUpperCase() : "FR",
      });
      const parsed = schemas.cartCreateResponseSchema.parse(data);
      return parsed.cartCreate.cart as Cart;
    } catch (error) {
      console.error("[shopifyClient.createCart error]:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  },

  getCart: async (cartId: string, locale?: string): Promise<Cart | null> => {
    try {
      const queryStr = `
        query GetCart($cartId: ID!, $lang: LanguageCode) @inContext(language: $lang) {
          cart(id: $cartId) {
            ...CartFields
          }
        }
        ${CART_FRAGMENT}
      `;
      const data = await shopifyFetch<unknown>(queryStr, {
        cartId,
        lang: locale ? locale.toUpperCase() : "FR",
      });
      const parsed = schemas.getCartResponseSchema.parse(data);
      return parsed.cart as Cart | null;
    } catch (error) {
      console.error("[shopifyClient.getCart error]:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  },

  addToCart: async (
    cartId: string,
    lines: Array<{ merchandiseId: string; quantity: number }>,
    locale?: string
  ): Promise<Cart> => {
    try {
      const queryStr = `
        mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!, $lang: LanguageCode) @inContext(language: $lang) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              ...CartFields
            }
          }
        }
        ${CART_FRAGMENT}
      `;
      const data = await shopifyFetch<unknown>(queryStr, {
        cartId,
        lines: lines.map((l) => ({ merchandiseId: l.merchandiseId, quantity: l.quantity })),
        lang: locale ? locale.toUpperCase() : "FR",
      });
      const parsed = schemas.cartLinesAddResponseSchema.parse(data);
      return parsed.cartLinesAdd.cart as Cart;
    } catch (error) {
      console.error("[shopifyClient.addToCart error]:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  },

  updateCart: async (
    cartId: string,
    lines: Array<{ id: string; quantity: number }>,
    locale?: string
  ): Promise<Cart> => {
    try {
      const queryStr = `
        mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!, $lang: LanguageCode) @inContext(language: $lang) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
              ...CartFields
            }
          }
        }
        ${CART_FRAGMENT}
      `;
      const data = await shopifyFetch<unknown>(queryStr, {
        cartId,
        lines: lines.map((l) => ({ id: l.id, quantity: l.quantity })),
        lang: locale ? locale.toUpperCase() : "FR",
      });
      const parsed = schemas.cartLinesUpdateResponseSchema.parse(data);
      return parsed.cartLinesUpdate.cart as Cart;
    } catch (error) {
      console.error("[shopifyClient.updateCart error]:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  },

  removeFromCart: async (
    cartId: string,
    lineIds: string[],
    locale?: string
  ): Promise<Cart> => {
    try {
      const queryStr = `
        mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!, $lang: LanguageCode) @inContext(language: $lang) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart {
              ...CartFields
            }
          }
        }
        ${CART_FRAGMENT}
      `;
      const data = await shopifyFetch<unknown>(queryStr, {
        cartId,
        lineIds,
        lang: locale ? locale.toUpperCase() : "FR",
      });
      const parsed = schemas.cartLinesRemoveResponseSchema.parse(data);
      return parsed.cartLinesRemove.cart as Cart;
    } catch (error) {
      console.error("[shopifyClient.removeFromCart error]:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  },

  // Review stubs for compiler compliance
  getReviews: async (productHandle: string): Promise<ProductReview[]> => {
    try {
      const { mockClient } = await import("./mock-client");
      return await mockClient.getReviews(productHandle);
    } catch (error) {
      console.error("[shopifyClient.getReviews error]:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  },

  getReviewAggregate: async (productHandle: string): Promise<ReviewAggregate> => {
    try {
      const { mockClient } = await import("./mock-client");
      return await mockClient.getReviewAggregate(productHandle);
    } catch (error) {
      console.error("[shopifyClient.getReviewAggregate error]:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  },

  addReview: async (
    review: Omit<ProductReview, "id" | "createdAt">
  ): Promise<ProductReview> => {
    try {
      const { mockClient } = await import("./mock-client");
      return await mockClient.addReview(review);
    } catch (error) {
      console.error("[shopifyClient.addReview error]:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  },
};
