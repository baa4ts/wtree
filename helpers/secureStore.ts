import * as SecureStore from "expo-secure-store";


export const secureStore = {

    save: async (key: string, value: string): Promise<void> => {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            console.error(`Error guardando ${key}:`, error);
        }
    },


    get: async (key: string): Promise<string | null> => {
        try {
            const value = await SecureStore.getItemAsync(key);
            return value;
        } catch (error) {
            console.error(`Error obteniendo ${key}:`, error);
            return null;
        }
    },


    delete: async (key: string): Promise<void> => {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.error(`Error borrando ${key}:`, error);
        }
    },
};
