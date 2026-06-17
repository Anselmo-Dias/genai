import { useMutation, useQueryClient } from "@tanstack/react-query"

import { agentsKeys } from "../keys/agents.keys"
import { agentsService } from "../services/agents.service"
import {
  type AgentsCreateRequest,
} from "../types/agent-mutations.type"

export function useAgentsCreate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AgentsCreateRequest) => agentsService.create(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: agentsKeys.all })
    },
  })
}
