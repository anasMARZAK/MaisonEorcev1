import { create } from "zustand";

interface LoadingStore {
  isLoading: boolean;
  hasLoadedOnce: boolean;
  finishLoading: () => void;
  resetLoading: () => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: true,
  hasLoadedOnce: false,
  finishLoading: () => set({ isLoading: false, hasLoadedOnce: true }),
  resetLoading: () => set({ isLoading: true, hasLoadedOnce: false }),
}));
export default useLoadingStore;
