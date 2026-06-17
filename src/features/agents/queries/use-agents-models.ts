import { useQuery } from "@tanstack/react-query"

import { agentsKeys } from "../keys/agents.keys"
import { agentsService } from "../services/agents.service"

type UseAgentsGetAllModelsOptions = {
  enabled?: boolean
}

export function useAgentsGetAllModels(options: UseAgentsGetAllModelsOptions = {}) {
  return useQuery({
    queryKey: agentsKeys.models,
    queryFn: async () => agentsService.getAllModels(),
    enabled: options.enabled,
    staleTime: 1000 * 60 * 60, // 1 hora
  })
}
