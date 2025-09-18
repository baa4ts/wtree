import { useQuery } from "@tanstack/react-query";

import { SensorResponse } from "@/interfaces/sensor.interfaces";
import { config } from "@/constants/vars";

import { actionSensorList } from "../actions/sensores.actions";

export function useSensor() {
  return useQuery<{ datos: SensorResponse[]; code: number } | null>({
    queryKey: ["sensor"],
    queryFn: async () => {
      const result = await actionSensorList();
      return result;
    },
    staleTime: config.staleTime,
    refetchInterval: config.refetchInterval,
  });
}
