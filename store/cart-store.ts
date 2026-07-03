import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Cart, CartLine } from "../types/shopify";
import { shopifyClient } from "../lib/shopify";
import { toast } from "sonner";

interface CartStore {
  cartId: string | null;
  cart: Cart | null;
  cartItems: CartLine[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  locale: "fr" | "en";
  isLoading: boolean;
  isUpdating: boolean;
  
  // Actions
  setIsOpen: (open: boolean) => void;
  setLocale: (locale: "fr" | "en") => void;
  setCartId: (id: string | null) => void;
  updateCart: (cart: Cart | null) => void;
  clearCart: () => void;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartId: null,
      cart: null,
      cartItems: [],
      totalItems: 0,
      totalPrice: 0,
      isOpen: false,
      locale: "fr",
      isLoading: false,
      isUpdating: false,
      
      setIsOpen: (open) => set({ isOpen: open }),
      setLocale: (locale) => set({ locale }),
      setCartId: (id) => set({ cartId: id }),
      
      updateCart: (cart) => {
        if (!cart) {
          set({
            cart: null,
            cartItems: [],
            totalItems: 0,
            totalPrice: 0,
          });
          return;
        }
        
        const cartItems = cart.lines.edges.map((e) => e.node);
        const totalItems = cart.totalQuantity;
        const totalPrice = parseFloat(cart.cost.totalAmount.amount);
        
        set({
          cart,
          cartItems,
          totalItems,
          totalPrice,
        });
      },
      
      clearCart: () => {
        set({
          cart: null,
          cartItems: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },

      addItem: async (merchandiseId: string, quantity = 1) => {
        const { cartId, locale, updateCart } = get();
        set({ isLoading: true });
        try {
          let activeCartId = cartId;
          
          // Resilient bypass: if the stored cart ID is a mock ID, discard it immediately
          if (activeCartId && activeCartId.startsWith("cart-")) {
            activeCartId = null;
          }
          
          if (!activeCartId) {
            const freshCart = await shopifyClient.createCart(locale);
            activeCartId = freshCart.id;
            set({ cartId: activeCartId });
          }
          
          try {
            const updatedCart = await shopifyClient.addToCart(
              activeCartId,
              [{ merchandiseId, quantity }],
              locale
            );
            updateCart(updatedCart);
            toast.success(locale === "en" ? "Added to bag" : "Ajouté au panier");
          } catch (err: any) {
            const errMsg = err.message || "";
            // If the cart is invalid, expired, or not found on Shopify servers, provision a new one and try again
            if (
              errMsg.includes("invalid") ||
              errMsg.includes("not found") ||
              errMsg.includes("Variable $cartId") ||
              errMsg.includes("Variable $id")
            ) {
              console.warn("Stale or invalid cart ID encountered. Re-provisioning a new Shopify cart...");
              const freshCart = await shopifyClient.createCart(locale);
              activeCartId = freshCart.id;
              set({ cartId: activeCartId });
              
              const updatedCart = await shopifyClient.addToCart(
                activeCartId,
                [{ merchandiseId, quantity }],
                locale
              );
              updateCart(updatedCart);
              toast.success(locale === "en" ? "Added to bag" : "Ajouté au panier");
            } else {
              throw err;
            }
          }
        } catch (err: any) {
          console.error(err);
          toast.error(err.message || (locale === "en" ? "An error occurred." : "Une erreur est survenue."));
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (lineId: string) => {
        const { cartId, locale, updateCart, clearCart } = get();
        if (!cartId) return;
        set({ isUpdating: true });
        try {
          const updatedCart = await shopifyClient.removeFromCart(cartId, [lineId], locale);
          updateCart(updatedCart);
        } catch (err: any) {
          console.error(err);
          const errMsg = err.message || "";
          if (
            errMsg.includes("invalid") ||
            errMsg.includes("not found") ||
            errMsg.includes("Variable $cartId")
          ) {
            set({ cartId: null });
            clearCart();
          }
          toast.error(err.message || (locale === "en" ? "An error occurred." : "Une erreur est survenue."));
        } finally {
          set({ isUpdating: false });
        }
      },

      updateQuantity: async (lineId: string, quantity: number) => {
        const { cartId, locale, updateCart, clearCart } = get();
        if (!cartId) return;
        set({ isUpdating: true });
        try {
          let updatedCart;
          if (quantity <= 0) {
            updatedCart = await shopifyClient.removeFromCart(cartId, [lineId], locale);
          } else {
            updatedCart = await shopifyClient.updateCart(
              cartId,
              [{ id: lineId, quantity }],
              locale
            );
          }
          updateCart(updatedCart);
        } catch (err: any) {
          console.error(err);
          const errMsg = err.message || "";
          if (
            errMsg.includes("invalid") ||
            errMsg.includes("not found") ||
            errMsg.includes("Variable $cartId")
          ) {
            set({ cartId: null });
            clearCart();
          }
          toast.error(err.message || (locale === "en" ? "An error occurred." : "Une erreur est survenue."));
        } finally {
          set({ isUpdating: false });
        }
      },
    }),
    {
      name: "maison_ecorce_cart_storage",
      partialize: (state) => ({
        cartId: state.cartId,
        locale: state.locale,
      }),
    }
  )
);
