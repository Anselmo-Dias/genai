import { useQuery } from "@tanstack/react-query"

import { agentsKeys } from "../keys/agents.keys"
import { agentsService } from "../services/agents.service"
import { type AgentsGetVersionsRequest } from "../types/agents-versions.type"

export function useAgentsGetVersions(params: AgentsGetVersionsRequest) {
  return useQuery({
    queryKey: agentsKeys.versions(params),
    queryFn: async () => agentsService.getVersions(params),
    enabled: !!params.name,
  })
}
