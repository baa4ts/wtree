import { AuthResponse } from "@/interfaces/auth.response.interface";
import { LoginData, RegisterData, UserInformation } from "@/interfaces/user.interface";
import { API } from "./API";

export const actionLogin = async (data: LoginData): Promise<AuthResponse | null> => {
    try {
        const r = await API.put<AuthResponse>("/user", data);

        if (r.status !== 200) {
            throw new Error("Respuesta no válida");
        }

        return r.data;
    } catch (error) {
        return null;
    }
};

export const actionRegister = async (data: RegisterData): Promise<AuthResponse | null> => {
    try {
        const r = await API.post<AuthResponse>("/user", data);

        if (r.status !== 200) {
            throw new Error("Respuesta no válida");
        }

        return r.data;
    } catch (error) {
        return null;
    }
};

export const actionInformacion = async (): Promise<UserInformation | null> => {
    try {
        const r = await API.get<UserInformation>("/user");

        if (r.status !== 200) {
            throw new Error("Respuesta no válida");
        }

        return r.data;
    } catch (error) {
        return null;
    }
};
