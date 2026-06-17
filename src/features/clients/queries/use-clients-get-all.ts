import { useQuery } from "@tanstack/react-query"

import { clientsKeys } from "../keys/clients.keys"
import { clientsService } from "../services/clients.service"

type UseClientsGetAllOptions = {
  enabled?: boolean
}

export function useClientsGetAll(options: UseClientsGetAllOptions = {}) {
  return useQuery({
    queryKey: clientsKeys.getAll,
    queryFn: async () => clientsService.getAll(),
    enabled: options.enabled,
  })
}
