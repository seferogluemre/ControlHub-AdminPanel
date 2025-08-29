import { api } from "#lib/api.ts";
import { UserShowResponse } from "@onlyjs/api/modules/users/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface AuthState {
  user: UserShowResponse | null;
  fetchUser: () => Promise<UserShowResponse | null>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set) => ({
      user: null,
      fetchUser: async () => {
        const response = await api.auth.me.get();

        set({ user: response.data });

        return response.data;
      },
    })),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
