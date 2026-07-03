import { SEEDED_PRODUCTS, MOCK_COLLECTIONS, MockProduct } from "./mock-data";
import {
  Product,
  Collection,
  Cart,
  CartLine,
  ProductVariant,
  ProductReview,
  ReviewAggregate,
} from "../../types/shopify";

// Helper to simulate network latency (500ms - 1000ms)
const sleep = (ms: number = 800) => new Promise((resolve) => setTimeout(resolve, ms));

const getLocale = (locale?: string): string => {
  return locale === "en" ? "en" : "fr";
};

// --- Mock Reviews Infrastructure ---
const AUTHORS = [
  "Clara B.", "Pierre M.", "Marie L.", "Julien D.", "Camille R.",
  "Lucas G.", "Emma V.", "Thomas P.", "Sarah H.", "Antoine F.",
  "Chloé S.", "Maxime N.", "Léa K.", "Nicolas B.", "Manon T."
];

const REVIEWS_POOL = [
  {
    rating: 5,
    title: { fr: "Qualité exceptionnelle", en: "Exceptional quality" },
    body: {
      fr: "Le cuir est d'une finesse incroyable et les finitions sont parfaites. On sent le vrai savoir-faire artisanal toscan.",
      en: "The leather is incredibly fine and the finishes are perfect. You can feel the true Tuscan craftsmanship."
    }
  },
  {
    rating: 5,
    title: { fr: "Rien à redire", en: "Perfect in every way" },
    body: {
      fr: "Confortable dès le premier jour. Le design minimaliste s'accorde avec absolument toutes mes tenues.",
      en: "Comfortable from day one. The minimalist design matches absolutely all of my outfits."
    }
  },
  {
    rating: 4,
    title: { fr: "Très bel objet", en: "Beautiful piece" },
    body: {
      fr: "Superbe silhouette. Le cuir a l'air très résistant. Il taille juste un tout petit peu grand.",
      en: "Superb silhouette. The leather feels very durable. Fits just a little bit large."
    }
  },
  {
    rating: 5,
    title: { fr: "Un investissement que je ne regrette pas", en: "Worth every penny" },
    body: {
      fr: "Le cuir commence déjà à se patiner magnifiquement après quelques semaines d'utilisation. Je recommande chaudement.",
      en: "The leather is already patinating beautifully after a few weeks of use. Highly recommended."
    }
  },
  {
    rating: 4,
    title: { fr: "Magnifique couleur", en: "Gorgeous color" },
    body: {
      fr: "La couleur est profonde et conforme aux photos. Très bon maintien et coutures très soignées.",
      en: "The color is deep and true to the photos. Great support and very neat stitching."
    }
  },
  {
    rating: 5,
    title: { fr: "Superbe expérience d'achat", en: "Superb buying experience" },
    body: {
      fr: "Livraison rapide dans un emballage très soigné. Le produit est tout simplement magnifique.",
      en: "Fast delivery in very neat packaging. The product is simply beautiful."
    }
  }
];

const generateMockReviews = (productHandle: string): ProductReview[] => {
  const count = 3 + Math.floor(Math.random() * 4); // 3 to 6 reviews
  const generated: ProductReview[] = [];
  
  // Seed random generator based on productHandle name to get consistent reviews per product
  let seed = 0;
  for (let i = 0; i < productHandle.length; i++) {
    seed += productHandle.charCodeAt(i);
  }
  
  const getSeededRandom = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  // Simple shuffle helper using seeded random
  const shuffle = <T>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(getSeededRandom() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const shuffledAuthors = shuffle(AUTHORS);
  const shuffledPool = shuffle(REVIEWS_POOL);

  for (let i = 0; i < Math.min(count, shuffledPool.length); i++) {
    const poolItem = shuffledPool[i];
    const author = shuffledAuthors[i % shuffledAuthors.length];
    
    // Random date in the last 6 months
    const daysAgo = Math.floor(getSeededRandom() * 180);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    generated.push({
      id: `rev-gen-${productHandle}-${i}`,
      productHandle,
      author,
      rating: poolItem.rating,
      title: poolItem.title.fr,
      body: poolItem.body.fr,
      createdAt: date.toISOString(),
    });
  }

  return generated;
};

// Default seed reviews
const DEFAULT_REVIEWS: ProductReview[] = [
  {
    id: "rev-1",
    productHandle: "bottine-chelsea-faubourg",
    author: "Sophie M.",
    rating: 5,
    title: "Absolument magnifiques",
    body: "Le cuir est d'une qualité incroyable. Très confortables dès la première fois.",
    createdAt: "2026-06-15T10:30:00Z",
  },
  {
    id: "rev-2",
    productHandle: "bottine-chelsea-faubourg",
    author: "Thomas B.",
    rating: 4,
    title: "Excellente qualité, taille un peu grand",
    body: "Très belles bottines Chelsea. Prenez une demi-pointure en dessous si vous hésitez.",
    createdAt: "2026-06-20T14:15:00Z",
  },
  {
    id: "rev-3",
    productHandle: "cabas-grand-opera",
    author: "Hélène D.",
    rating: 5,
    title: "Le cabas parfait",
    body: "Grand, logeable, cuir robuste et finitions impeccables. Je ne m'en sépare plus !",
    createdAt: "2026-06-28T09:00:00Z",
  },
];

// Translate a seeded mock product to target locale
const translateProduct = (prod: MockProduct, locale: string): Product => {
  return {
    id: prod.id,
    title: locale === "en" ? prod.title.en : prod.title.fr,
    handle: prod.handle,
    description: locale === "en" ? prod.description.en : prod.description.fr,
    availableForSale: true,
    priceRange: {
      minVariantPrice: prod.price,
      maxVariantPrice: prod.price,
    },
    compareAtPriceRange: prod.compareAtPrice
      ? {
          minVariantPrice: prod.compareAtPrice,
          maxVariantPrice: prod.compareAtPrice,
        }
      : undefined,
    images: {
      edges: prod.images.map((img) => ({ node: img })),
    },
    variants: {
      edges: prod.variants.map((v) => ({ node: v })),
    },
    options: prod.options,
    tags: prod.tags,
  };
};

// Translate collection to target locale
const translateCollection = (col: typeof MOCK_COLLECTIONS[0], locale: string): Collection => {
  return {
    id: col.id,
    handle: col.handle,
    title: locale === "en" ? col.title.en : col.title.fr,
    description: locale === "en" ? col.description.en : col.description.fr,
    image: col.image,
  };
};

// Local storage keys
const CART_STORAGE_KEY = "maison_ecorce_carts";
const REVIEWS_STORAGE_KEY = "maison_ecorce_reviews";

// Helper for local storage access
const getStoredCarts = (): Record<string, Cart> => {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem(CART_STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

const setStoredCarts = (carts: Record<string, Cart>) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(carts));
};

const getStoredReviews = (): ProductReview[] => {
  if (typeof window === "undefined") return DEFAULT_REVIEWS;
  const data = localStorage.getItem(REVIEWS_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(DEFAULT_REVIEWS));
    return DEFAULT_REVIEWS;
  }
  return JSON.parse(data);
};

const setStoredReviews = (reviews: ProductReview[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
};

// Review code moved to the top to prevent hosting ReferenceErrors during build time.

// Mock Shopify client operations
export const mockClient = {
  getProducts: async (params?: {
    collection?: string;
    query?: string;
    locale?: string;
  }): Promise<Product[]> => {
    await sleep();
    const activeLocale = getLocale(params?.locale);
    let products = SEEDED_PRODUCTS;

    if (params?.collection) {
      products = products.filter((p) => p.collections.includes(params.collection!));
    }

    if (params?.query) {
      const q = params.query.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.fr.toLowerCase().includes(q) ||
          p.title.en.toLowerCase().includes(q) ||
          p.description.fr.toLowerCase().includes(q) ||
          p.description.en.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return products.map((p) => translateProduct(p, activeLocale));
  },

  getProductByHandle: async (handle: string, locale?: string): Promise<Product | null> => {
    await sleep();
    const activeLocale = getLocale(locale);
    const product = SEEDED_PRODUCTS.find((p) => p.handle === handle);
    if (!product) return null;
    return translateProduct(product, activeLocale);
  },

  getCollections: async (locale?: string): Promise<Collection[]> => {
    await sleep();
    const activeLocale = getLocale(locale);
    return MOCK_COLLECTIONS.map((c) => translateCollection(c, activeLocale));
  },

  createCart: async (locale?: string): Promise<Cart> => {
    void locale;
    await sleep();
    const id = `cart-${Math.random().toString(36).substring(2, 9)}`;
    const newCart: Cart = {
      id,
      checkoutUrl: `https://checkout.maison-ecorce.myshopify.com/checkout/mock-${id}`,
      lines: { edges: [] },
      cost: {
        subtotalAmount: { amount: "0.00", currencyCode: "EUR" },
        totalAmount: { amount: "0.00", currencyCode: "EUR" },
      },
      totalQuantity: 0,
    };
    const carts = getStoredCarts();
    carts[id] = newCart;
    setStoredCarts(carts);
    return newCart;
  },

  getCart: async (cartId: string, locale?: string): Promise<Cart | null> => {
    void locale;
    await sleep();
    const carts = getStoredCarts();
    return carts[cartId] || null;
  },

  addToCart: async (
    cartId: string,
    lines: Array<{ merchandiseId: string; quantity: number }>,
    locale?: string
  ): Promise<Cart> => {
    await sleep();
    const carts = getStoredCarts();
    let cart = carts[cartId];

    if (!cart) {
      cart = {
        id: cartId,
        checkoutUrl: `https://checkout.maison-ecorce.myshopify.com/checkout/mock-${cartId}`,
        lines: { edges: [] },
        cost: {
          subtotalAmount: { amount: "0.00", currencyCode: "EUR" },
          totalAmount: { amount: "0.00", currencyCode: "EUR" },
        },
        totalQuantity: 0,
      };
    }

    lines.forEach((item) => {
      // Find variant across all seeded products
      let foundVariant: ProductVariant | null = null;
      let foundProduct: MockProduct | null = null;

      for (const p of SEEDED_PRODUCTS) {
        const variant = p.variants.find((v) => v.id === item.merchandiseId);
        if (variant) {
          foundVariant = variant;
          foundProduct = p;
          break;
        }
      }

      if (!foundVariant || !foundProduct) return;

      // Check if item already in cart
      const existingLineIdx = cart.lines.edges.findIndex(
        (edge) => edge.node.merchandise.id === item.merchandiseId
      );

      if (existingLineIdx > -1) {
        cart.lines.edges[existingLineIdx].node.quantity += item.quantity;
      } else {
        const lineId = `line-${Math.random().toString(36).substring(2, 9)}`;
        const newLineLine: CartLine = {
          id: lineId,
          quantity: item.quantity,
          merchandise: {
            ...foundVariant,
            product: {
              id: foundProduct.id,
              title: foundProduct.title[getLocale(locale) === "en" ? "en" : "fr"],
              handle: foundProduct.handle,
              tags: foundProduct.tags,
              images: { edges: foundProduct.images.map((img) => ({ node: img })) },
            },
          },
          cost: {
            totalAmount: {
              amount: (parseFloat(foundVariant.price.amount) * item.quantity).toFixed(2),
              currencyCode: foundVariant.price.currencyCode,
            },
          },
        };
        cart.lines.edges.push({ node: newLineLine });
      }
    });

    // Recalculate totals
    recalculateCart(cart);
    carts[cart.id] = cart;
    setStoredCarts(carts);
    return cart;
  },

  updateCart: async (
    cartId: string,
    lines: Array<{ id: string; quantity: number }>,
    locale?: string
  ): Promise<Cart> => {
    void locale;
    await sleep();
    const carts = getStoredCarts();
    const cart = carts[cartId];
    if (!cart) throw new Error("Cart not found");

    lines.forEach((item) => {
      const edgeIdx = cart.lines.edges.findIndex((edge) => edge.node.id === item.id);
      if (edgeIdx > -1) {
        const line = cart.lines.edges[edgeIdx].node;
        line.quantity = item.quantity;
        line.cost.totalAmount.amount = (
          parseFloat(line.merchandise.price.amount) * item.quantity
        ).toFixed(2);
      }
    });

    recalculateCart(cart);
    carts[cartId] = cart;
    setStoredCarts(carts);
    return cart;
  },

  removeFromCart: async (
    cartId: string,
    lineIds: string[],
    locale?: string
  ): Promise<Cart> => {
    void locale;
    await sleep();
    const carts = getStoredCarts();
    const cart = carts[cartId];
    if (!cart) throw new Error("Cart not found");

    cart.lines.edges = cart.lines.edges.filter((edge) => !lineIds.includes(edge.node.id));

    recalculateCart(cart);
    carts[cartId] = cart;
    setStoredCarts(carts);
    return cart;
  },

  // Review-specific CRUD operations
  getReviews: async (productHandle: string): Promise<ProductReview[]> => {
    await sleep(400); // slightly faster response for reviews
    let reviews = getStoredReviews();
    
    // Check if we have any reviews for this handle
    const hasReviews = reviews.some((r) => r.productHandle === productHandle);
    if (!hasReviews) {
      const generated = generateMockReviews(productHandle);
      reviews = [...reviews, ...generated];
      setStoredReviews(reviews);
    }
    
    return reviews
      .filter((r) => r.productHandle === productHandle)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getReviewAggregate: async (productHandle: string): Promise<ReviewAggregate> => {
    await sleep(300);
    const reviews = getStoredReviews().filter((r) => r.productHandle === productHandle);

    if (reviews.length === 0) {
      return {
        ratingAverage: 0,
        ratingCount: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };
    }

    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    const ratingAverage = parseFloat((total / reviews.length).toFixed(1));

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const rating = r.rating as 5 | 4 | 3 | 2 | 1;
      if (rating in distribution) {
        distribution[rating]++;
      }
    });

    return {
      ratingAverage,
      ratingCount: reviews.length,
      distribution,
    };
  },

  addReview: async (
    review: Omit<ProductReview, "id" | "createdAt">
  ): Promise<ProductReview> => {
    await sleep();
    const reviews = getStoredReviews();
    const newReview: ProductReview = {
      ...review,
      id: `rev-${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    reviews.push(newReview);
    setStoredReviews(reviews);
    return newReview;
  },
};

// Helper to recalculate cost and quantity totals on a cart
const recalculateCart = (cart: Cart) => {
  let totalQty = 0;
  let totalVal = 0;
  let currency = "EUR";

  cart.lines.edges = cart.lines.edges.filter((edge) => edge.node.quantity > 0);

  cart.lines.edges.forEach((edge) => {
    const line = edge.node;
    totalQty += line.quantity;
    totalVal += parseFloat(line.merchandise.price.amount) * line.quantity;
    currency = line.merchandise.price.currencyCode;
  });

  cart.totalQuantity = totalQty;
  cart.cost.subtotalAmount = {
    amount: totalVal.toFixed(2),
    currencyCode: currency,
  };
  cart.cost.totalAmount = {
    amount: totalVal.toFixed(2),
    currencyCode: currency,
  };
};
