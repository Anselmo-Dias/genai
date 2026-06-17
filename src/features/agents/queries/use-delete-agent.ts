import { useMutation, useQueryClient } from "@tanstack/react-query"

import { agentsKeys } from "../keys/agents.keys"
import { agentsService } from "../services/agents.service"
import { type AgentsDeleteRequest } from "../types/agent-mutations.type"

export function useAgentsDelete() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AgentsDeleteRequest) => agentsService.remove(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: agentsKeys.all })
    },
  })
}
