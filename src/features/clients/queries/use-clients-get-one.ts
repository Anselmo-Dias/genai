import { useQuery } from "@tanstack/react-query"

import { clientsKeys } from "../keys/clients.keys"
import { clientsService } from "../services/clients.service"
import { type ClientsGetOneRequest } from "../types/clients-get-one.type"

export function useClientsGetOne(params: ClientsGetOneRequest) {
  return useQuery({
    queryKey: clientsKeys.getById(params.name),
    queryFn: async () => clientsService.getOne(params),
    enabled: !!params.name,
  })
}
