import { secureStore } from "@/helpers/secureStore";
import { LoginData, RegisterData } from "@/interfaces/user.interface";
import { create } from "zustand";
import { actionInformacion, actionLogin, actionRegister } from "../actions/user.action";

interface UserStore {
    username: string | null;
    gmail: string | null;
    token: string | null;
    id: number | null;

    resetUser: () => void;
    loginUser: (data: LoginData) => Promise<boolean>;
    registerUser: (data: RegisterData) => Promise<boolean>;
    checkUser: () => Promise<boolean>;
}

export const useUserStore = create<UserStore>((set, get) => ({
    username: null,
    gmail: null,
    token: null,
    id: null,

    resetUser: () =>
        set({
            id: null,
            username: null,
            gmail: null,
            token: null,
        }),

    loginUser: async (data: LoginData) => {
        try {
            const response = await actionLogin(data);

            if (!response) {
                get().resetUser();
                await secureStore.delete("token");
                return false;
            }

            set({ token: response.token });
            await secureStore.save("token", response.token);
            return true;
        } catch (error) {
            get().resetUser();
            await secureStore.delete("token");
            return false;
        }
    },

    registerUser: async (data: RegisterData) => {
        try {
            const response = await actionRegister(data);

            if (!response) {
                get().resetUser();
                await secureStore.delete("token");
                return false;
            }

            set({ token: response.token });
            await secureStore.save("token", response.token);
            return true;
        } catch (error) {
            get().resetUser();
            await secureStore.delete("token");
            return false;
        }
    },

    checkUser: async () => {
        try {
            const key = await secureStore.get("token");

            if (!key) {
                get().resetUser();
                return false;
            }

            const response = await actionInformacion();

            if (!response) {
                get().resetUser();
                await secureStore.delete("token");
                return false;
            }

            const { token, usuario } = response;
            set({ id: usuario.id, gmail: usuario.gmail, username: usuario.username, token: token });
            return true;
        } catch (error) {
            get().resetUser();
            await secureStore.delete("token");
            return false;
        }
    },
}));
