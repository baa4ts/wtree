import { create } from "zustand";

interface UserStore {
    id: number | null;
    username: string | null;
    gmail: string | null;
    token: string | null;
    setUser: (user: Partial<Omit<UserStore, 'setUser'>>) => void;
    resetUser: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
    id: null,
    username: null,
    gmail: null,
    token: null,

    // Acción para actualizar usuario
    setUser: (user) => set((state) => ({ ...state, ...user })),

    // Acción para resetear
    resetUser: () => set({ id: null, username: null, gmail: null, token: null }),
}));
