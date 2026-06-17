import { useQuery } from "@tanstack/react-query"

import { agentsKeys } from "../keys/agents.keys"
import { agentsService } from "../services/agents.service"
import { type AgentsGetUsersRequest } from "../types/agents-get-users.type"

export function useAgentsGetUsers(params: AgentsGetUsersRequest) {
  return useQuery({
    queryKey: agentsKeys.users(params.name),
    queryFn: async () => agentsService.getUsers(params),
    enabled: !!params.name,
  })
}
