import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  status: boolean;
  isverified: boolean;
  currentCity: string | null;
  userimage: string | null;
  firstname: string | null;
  login: (
    city?: string,
    verified?: boolean,
    name?: string,
    imageurl?: string
  ) => void;
  logout: () => void;
  updateCity: (city: string) => void;
  setVerified: (verified: boolean) => void;
  setname: (name: string) => void;
  setUserImgae: (imageurl: string) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      status: false,
      isverified: false,
      currentCity: "",
      firstname: "",
      userimage: "",
      login: (
        city?: string,
        verified?: boolean,
        name?: string,
        imageurl?: string
      ) =>
        set({
          status: true,
          currentCity: city,
          isverified: verified,
          firstname: name,
          userimage: imageurl || null,
        }),
      logout: () =>
        set({
          status: false,
          currentCity: null,
          isverified: false,
          firstname: "",
          userimage: null,
        }),
      updateCity: (city: string) => set({ currentCity: city }),
      setVerified: (verified: boolean) => set({ isverified: verified }),
      setname: (name: string) => set({ firstname: name }),
      setUserImgae: (imageurl: string) => set({ userimage: imageurl }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
