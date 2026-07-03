import { z } from "zod";

export const moneySchema = z.object({
  amount: z.string(),
  currencyCode: z.string(),
});

export const imageSchema = z.object({
  url: z.string(),
  altText: z.string().nullable(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const productOptionSchema = z.object({
  name: z.string(),
  values: z.array(z.string()),
});

export const selectedOptionSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export const productVariantSchema = z.object({
  id: z.string(),
  title: z.string(),
  availableForSale: z.boolean(),
  price: moneySchema,
  compareAtPrice: moneySchema.optional().nullable(),
  selectedOptions: z.array(selectedOptionSchema),
  image: imageSchema.optional().nullable(),
});

export const collectionSchema = z.object({
  id: z.string(),
  handle: z.string(),
  title: z.string(),
  description: z.string(),
  image: imageSchema.optional().nullable(),
});

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  handle: z.string(),
  description: z.string(),
  descriptionHtml: z.string().optional().nullable(),
  availableForSale: z.boolean(),
  priceRange: z.object({
    minVariantPrice: moneySchema,
    maxVariantPrice: moneySchema,
  }),
  compareAtPriceRange: z
    .object({
      minVariantPrice: moneySchema,
      maxVariantPrice: moneySchema,
    })
    .optional()
    .nullable(),
  images: z.object({
    edges: z.array(
      z.object({
        node: imageSchema,
      })
    ),
  }),
  variants: z.object({
    edges: z.array(
      z.object({
        node: productVariantSchema,
      })
    ),
  }),
  options: z.array(productOptionSchema).optional().nullable(),
  tags: z.array(z.string()),
  collections: z
    .object({
      edges: z.array(
        z.object({
          node: collectionSchema,
        })
      ),
    })
    .optional()
    .nullable(),
});

export const cartLineSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  merchandise: productVariantSchema.and(
    z.object({
      product: z.object({
        id: z.string(),
        title: z.string(),
        handle: z.string(),
        tags: z.array(z.string()),
        images: z.object({
          edges: z.array(
            z.object({
              node: imageSchema,
            })
          ),
        }),
      }),
    })
  ),
  cost: z.object({
    totalAmount: moneySchema,
  }),
});

export const cartSchema = z.object({
  id: z.string(),
  checkoutUrl: z.string(),
  lines: z.object({
    edges: z.array(
      z.object({
        node: cartLineSchema,
      })
    ),
  }),
  cost: z.object({
    subtotalAmount: moneySchema,
    totalAmount: moneySchema,
  }),
  totalQuantity: z.number(),
});

// Response validation envelope schemas
export const getProductsResponseSchema = z.object({
  products: z.object({
    edges: z.array(
      z.object({
        node: productSchema,
      })
    ),
  }),
});

export const getCollectionProductsResponseSchema = z.object({
  collection: z
    .object({
      products: z.object({
        edges: z.array(
          z.object({
            node: productSchema,
          })
        ),
      }),
    })
    .nullable(),
});

export const getProductByHandleResponseSchema = z.object({
  product: productSchema.nullable(),
});

export const getCollectionsResponseSchema = z.object({
  collections: z.object({
    edges: z.array(
      z.object({
        node: collectionSchema,
      })
    ),
  }),
});

export const cartCreateResponseSchema = z.object({
  cartCreate: z.object({
    cart: cartSchema,
  }),
});

export const getCartResponseSchema = z.object({
  cart: cartSchema.nullable(),
});

export const cartLinesAddResponseSchema = z.object({
  cartLinesAdd: z.object({
    cart: cartSchema,
  }),
});

export const cartLinesUpdateResponseSchema = z.object({
  cartLinesUpdate: z.object({
    cart: cartSchema,
  }),
});

export const cartLinesRemoveResponseSchema = z.object({
  cartLinesRemove: z.object({
    cart: cartSchema,
  }),
});
