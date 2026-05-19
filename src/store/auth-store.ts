import type { User } from "@/types";
import { create } from "zustand";

type AuthState = {
  token: string | null;
  user: User | null;
  hydrated: boolean;
  setSession: (token: string, user: User) => void;
  clearSession: () => void;
  hydrate: () => void;
};

const storageKey = "matrix-crm-session";

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  hydrated: false,
  setSession: (token, user) => {
    localStorage.setItem(storageKey, JSON.stringify({ token, user }));
    set({ token, user });
  },
  clearSession: () => {
    localStorage.removeItem(storageKey);
    set({ token: null, user: null });
  },
  hydrate: () => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      set({ hydrated: true });
      return;
    }

    const parsed = JSON.parse(raw) as { token: string; user: User };
    set({ token: parsed.token, user: parsed.user, hydrated: true });
  },
}));
