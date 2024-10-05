import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartState {
  cartcount: number;
  setCartCount: (count: number) => void;
  pluscart: () => void;
  minuscart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartcount: 0,
      setCartCount: (count: number) => set(() => ({ cartcount: count })),
      pluscart: () => set((state) => ({ cartcount: state.cartcount + 1 })),
      minuscart: () =>
        set((state) => ({
          cartcount: state.cartcount > 0 ? state.cartcount - 1 : 0,
        })),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
