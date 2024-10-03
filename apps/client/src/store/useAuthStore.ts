import { create } from "zustand";

interface AuthState {
  status: boolean;
  currentCity: string | null;
  login: (city: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  status: false,
  currentCity: null,
  login: (city) => set({ status: true, currentCity: city }),
  logout: () => set({ status: false, currentCity: null }),
}));

export default useAuthStore;
