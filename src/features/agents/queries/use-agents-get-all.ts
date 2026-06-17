import { useQuery } from "@tanstack/react-query"

import { agentsKeys } from "../keys/agents.keys"
import { agentsService } from "../services/agents.service"
import { type AgentsGetAllRequest } from "../types/agents-get-all.type"

export function useAgentsGetAll(params: AgentsGetAllRequest = {}) {
  return useQuery({
    queryKey: agentsKeys.getAllWithParams(params),
    queryFn: async () => agentsService.getAll(params),
  })
}
