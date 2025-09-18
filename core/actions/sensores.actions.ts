import {
  Resultado,
  SensorResponse,
  SpecificSensor,
} from "@/interfaces/sensor.interfaces";

import { API } from "./API";

interface SensorListResult {
  datos: SensorResponse[];
  code: number;
}

interface SpecificSensorProps {
  sensorID: string;
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

export const actionSpecificSensor = async ({
  sensorID,
}: SpecificSensorProps): Promise<Resultado | null> => {
  try {
    const response = await API.get<SpecificSensor>(`/sensor/${sensorID}`);

    if (response.status >= 500) {
      throw new Error("Error del servidor al obtener los reportes");
    }

    return response.data.resultado;
  } catch {
    // console.error("Error en actionSensorList:", error);
    return null;
  }
};
