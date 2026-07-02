import { useCartStore } from "../store/cart-store";
import { useQuery } from "@tanstack/react-query";
import { shopifyClient } from "../lib/shopify";

export function useCart() {
  const {
    cart,
    cartId,
    isOpen,
    setIsOpen,
    locale,
    updateCart,
    addItem,
    removeItem,
    updateQuantity,
    isLoading,
    isUpdating,
  } = useCartStore();

  // Query to automatically refresh/sync cart data on mount
  useQuery({
    queryKey: ["cart", cartId, locale],
    queryFn: async () => {
      if (!cartId) return null;
      try {
        const data = await shopifyClient.getCart(cartId, locale);
        if (data) {
          updateCart(data);
        }
        return data;
      } catch (err) {
        console.error("Failed to sync cart:", err);
        return null;
      }
    },
    enabled: !!cartId,
  });

  return {
    cart,
    isLoading,
    isUpdating,
    isOpen,
    setIsOpen,
    addToCart: addItem,
    updateQuantity,
    removeItem,
    checkoutUrl: cart?.checkoutUrl || "",
  };
}
