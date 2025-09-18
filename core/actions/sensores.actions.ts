import { SensorResponse } from "@/interfaces/sensor.interfaces";

import { API } from "./API";

interface SensorListResult {
  datos: SensorResponse[];
  code: number;
}

export const actionSensorList = async (): Promise<SensorListResult | null> => {
  try {
    const response = await API.get<SensorResponse[]>("/reports");

    if (response.status >= 500) {
      throw new Error("Error del servidor al obtener los reportes");
    }

    return { datos: response.data, code: response.status };
  } catch {
    // console.error("Error en actionSensorList:", error);
    return null;
  }
};
