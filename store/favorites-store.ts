import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/shopify";

interface FavoritesStore {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (product) =>
        set((state) => {
          if (state.favorites.some((p) => p.id === product.id)) return state;
          return { favorites: [...state.favorites, product] };
        }),
      removeFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== productId),
        })),
      toggleFavorite: (product) =>
        set((state) => {
          const exists = state.favorites.some((p) => p.id === product.id);
          if (exists) {
            return { favorites: state.favorites.filter((p) => p.id !== product.id) };
          } else {
            return { favorites: [...state.favorites, product] };
          }
        }),
    }),
    {
      name: "maison_ecorce_favorites_storage",
    }
  )
);

export default useFavoritesStore;
