import { API } from "./API";


export const actionSensorList = async () => {
    try {
        const r = await API.put("/ultimos-reportes", );

        if (r.status !== 200) {
            throw new Error("Respuesta no válida");
        }

        return r.data;
    } catch {
        return null;
    }
};
