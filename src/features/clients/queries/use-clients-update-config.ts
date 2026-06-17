import { useMutation, useQueryClient } from "@tanstack/react-query"

import { clientsKeys } from "../keys/clients.keys"
import { clientsService } from "../services/clients.service"
import { type ClientsUpdateConfigRequest } from "../types/clients-update-config.type"

export function useClientsUpdateConfig() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ClientsUpdateConfigRequest) =>
      clientsService.updateConfig(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: clientsKeys.all })
    },
  })
}
