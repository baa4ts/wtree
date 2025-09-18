import { create } from "zustand";

import { SecureStorageAdapter } from "@/helpers/secureStore";
import { LoginData, RegisterData } from "@/interfaces/user.interface";

import {
  actionInformacion,
  actionLogin,
  actionRegister,
} from "../actions/user.action";

interface UserStore {
  username?: string;
  gmail?: string;
  token?: string;
  id?: number;
  status: "authenticated" | "unauthenticated" | "checking";

  resetUser: () => Promise<void>;
  loginUser: (data: LoginData) => Promise<boolean>;
  registerUser: (data: RegisterData) => Promise<boolean>;
  checkUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  username: undefined,
  gmail: undefined,
  token: undefined,
  id: undefined,
  status: "unauthenticated",

  resetUser: async () => {
    set({
      id: undefined,
      username: undefined,
      gmail: undefined,
      token: undefined,
      status: "unauthenticated",
    });
    await SecureStorageAdapter.deleteItem("token");
  },

  loginUser: async (data: LoginData): Promise<boolean> => {
    const response = await actionLogin(data);
    if (!response?.token) {
      await get().resetUser();
      return false;
    }

    await SecureStorageAdapter.setItem("token", response.token);
    set({ token: response.token, status: "authenticated" });
    return true;
  },

  registerUser: async (data: RegisterData): Promise<boolean> => {
    const response = await actionRegister(data);
    if (!response?.token) {
      await get().resetUser();
      return false;
    }

    await SecureStorageAdapter.setItem("token", response.token);
    set({ token: response.token, status: "authenticated" });
    return true;
  },

  checkUser: async (): Promise<void> => {
    set({ status: "checking" });

    const token = await SecureStorageAdapter.getItem("token");
    if (!token) {
      await get().resetUser();
      return;
    }

    const response = await actionInformacion();
    if (!response?.usuario) {
      await get().resetUser();
      return;
    }

    const { usuario } = response;
    set({
      id: usuario.id,
      username: usuario.username,
      gmail: usuario.gmail,
      token,
      status: "authenticated",
    });
  },
}));
