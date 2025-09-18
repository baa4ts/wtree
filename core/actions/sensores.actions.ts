import { SensorResponse } from "@/interfaces/sensor.interfaces";

import { API } from "./API";

export const actionSensorList = async () => {
  try {
    const r = await API.get<SensorResponse[]>("/reports");

    if (r.status === 500) {
      throw new Error("Respuesta no válida");
    }

    return { datos: r.data, code: r.status };
  } catch {
    return null;
  }
};
