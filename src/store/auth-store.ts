import { createCrossTabChannel } from "@/lib/cross-tab-events";
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
const authChannel = createCrossTabChannel<AuthSyncEvent>("auth-session");

type AuthSyncEvent =
  | {
      type: "session:set";
      token: string;
      user: User;
    }
  | {
      type: "session:clear";
    };

let authSyncInitialized = false;

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  hydrated: false,
  setSession: (token, user) => {
    localStorage.setItem(storageKey, JSON.stringify({ token, user }));
    set({ token, user });
    authChannel.emit({ type: "session:set", token, user });
  },
  clearSession: () => {
    localStorage.removeItem(storageKey);
    set({ token: null, user: null });
    authChannel.emit({ type: "session:clear" });
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

export function initializeAuthSync() {
  if (authSyncInitialized) {
    return;
  }

  authSyncInitialized = true;

  authChannel.subscribe((event) => {
    if (event.type === "session:set") {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ token: event.token, user: event.user }),
      );
      useAuthStore.setState({
        token: event.token,
        user: event.user,
        hydrated: true,
      });
      return;
    }

    localStorage.removeItem(storageKey);
    useAuthStore.setState({
      token: null,
      user: null,
      hydrated: true,
    });
  });
}
