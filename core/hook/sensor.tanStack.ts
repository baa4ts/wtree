import { useQuery } from "@tanstack/react-query";

import { config } from "@/constants/vars";

import {
  actionSensorList,
  actionSpecificSensor,
} from "../actions/sensores.actions";

export function useSensor() {
  return useQuery({
    queryKey: ["sensor"],
    queryFn: async () => await actionSensorList(),
    staleTime: config.staleTime,
    refetchInterval: config.refetchInterval,
  });
}

interface UseSpecificSensorProps {
  sensorID: string;
}

export function useSpecificSensor({ sensorID }: UseSpecificSensorProps) {
  return useQuery({
    queryKey: ["SpecificSensor", sensorID],
    queryFn: async () => {
      return await actionSpecificSensor({ sensorID });
    },
    staleTime: config.staleTime,
    refetchInterval: config.refetchInterval,
  });
}
