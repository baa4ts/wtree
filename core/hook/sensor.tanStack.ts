import { useQuery } from "@tanstack/react-query";

import { actionSensorList } from "../actions/sensores.actions";

export function useSensor() {
  const query = useQuery({
    queryKey: ["sensor"],
    queryFn: async () => {
      return await actionSensorList();
    },
    staleTime: 3500,
    refetchInterval: 3500,
  });

  return query;
}
