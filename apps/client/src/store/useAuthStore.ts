import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  status: boolean;
  currentCity: string | null;
  login: (city: string) => void;
  logout: () => void;
  updateCity: (city: string) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      status: false,
      currentCity: "Portland",
      login: (city: string) => set({ status: true, currentCity: city }),
      logout: () => set({ status: false, currentCity: null }),
      updateCity: (city: string) => set({ currentCity: city }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
