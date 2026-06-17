import { useMutation, useQueryClient } from "@tanstack/react-query"

import { agentsKeys } from "../keys/agents.keys"
import { agentsService } from "../services/agents.service"
import {
  type AgentsUpdateRequest,
} from "../types/agent-mutations.type"

export function useAgentsUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AgentsUpdateRequest) => agentsService.update(data),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: agentsKeys.all })
      void queryClient.invalidateQueries({
        queryKey: agentsKeys.getById(variables.name),
      })
    },
  })
}
