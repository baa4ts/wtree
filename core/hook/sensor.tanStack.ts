import { useQuery } from "@tanstack/react-query";

import { config } from "@/constants/vars";

import {
  actionSensorList,
  actionSensorNotificaction,
  actionSpecificSensor,
} from "../actions/sensores.actions";

interface UseSpecificSensorProps {
  sensorID: string;
}
export function useSensorNotification() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => await actionSensorNotificaction(),
    staleTime: config.staleTime,
    refetchInterval: config.refetchInterval,
  });
}

export function useSpecificSensor({ sensorID }: UseSpecificSensorProps) {
  return useQuery({
    queryKey: ["spesificSensor", sensorID],
    queryFn: async () => {
      return await actionSpecificSensor({ sensorID });
    },
    staleTime: config.staleTime,
    refetchInterval: config.refetchInterval,
  });
}

export function useSensorList() {
  return useQuery({
    queryKey: ["sensorList"],
    queryFn: async () => await actionSensorList(),
    staleTime: config.staleTime,
    refetchInterval: config.refetchInterval,
  });
}
