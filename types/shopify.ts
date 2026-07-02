export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Image {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: SelectedOption[];
  image?: Image;
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: Image;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  compareAtPriceRange?: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  images: {
    edges: Array<{
      node: Image;
    }>;
  };
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
  options?: ProductOption[];
  tags: string[];
  collections?: {
    edges: Array<{
      node: Collection;
    }>;
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: ProductVariant & {
    product: {
      id: string;
      title: string;
      handle: string;
      tags: string[];
      images: {
        edges: Array<{
          node: Image;
        }>;
      };
    };
  };
  cost: {
    totalAmount: Money;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: CartLine;
    }>;
  };
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };
  totalQuantity: number;
}

// Custom simulated reviews matching Judge.me aggregates
export interface ProductReview {
  id: string;
  productHandle: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
}

export interface ReviewAggregate {
  ratingAverage: number;
  ratingCount: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}
