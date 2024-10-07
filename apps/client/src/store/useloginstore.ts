import { create } from "zustand";

interface AuthState {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
}

export const useloginstore = create<AuthState>((set) => ({
  isLoginOpen: false,
  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),
}));
