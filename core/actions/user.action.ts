import { AuthResponse } from "@/interfaces/auth.response.interface";
import {
  LoginData,
  RegisterData,
  UserInformation,
} from "@/interfaces/user.interface";

import { API } from "./API";

export const actionLogin = async (
  data: LoginData,
): Promise<AuthResponse | null> => {
  try {
    const response = await API.put<AuthResponse>("/user", data);

    if (response.status !== 200) {
      throw new Error("Respuesta no válida");
    }

    return response.data;
  } catch {
    // console.error("Error en actionLogin:", error);
    return null;
  }
};

export const actionRegister = async (
  data: RegisterData,
): Promise<AuthResponse | null> => {
  try {
    const response = await API.post<AuthResponse>("/user", data);

    if (response.status !== 200) {
      throw new Error("Respuesta no válida");
    }

    return response.data;
  } catch {
    // console.error("Error en actionRegister:", error);
    return null;
  }
};

export const actionInformacion = async (): Promise<UserInformation | null> => {
  try {
    const response = await API.get<UserInformation>("/user");

    if (response.status !== 200) {
      throw new Error("Respuesta no válida");
    }

    return response.data;
  } catch {
    // console.error("Error en actionInformacion:", error);
    return null;
  }
};
