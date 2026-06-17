import { useQuery } from "@tanstack/react-query"

import { agentsKeys } from "../keys/agents.keys"
import { agentsService } from "../services/agents.service"
import { type AgentsGetOneRequest } from "../types/agent-detail.type"

type UseAgentsGetOneOptions = {
  enabled?: boolean
}

export function useAgentsGetOne(
  params: AgentsGetOneRequest,
  options: UseAgentsGetOneOptions = {},
) {
  return useQuery({
    queryKey: agentsKeys.getById(params.name),
    queryFn: async () => agentsService.getOne(params),
    enabled: (options.enabled ?? true) && !!params.name,
  })
}
