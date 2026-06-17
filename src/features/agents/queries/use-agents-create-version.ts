import { useMutation, useQueryClient } from "@tanstack/react-query"

import { agentsKeys } from "../keys/agents.keys"
import { agentsService } from "../services/agents.service"
import { type AgentsCreateVersionRequest } from "../types/agents-versions.type"

export function useAgentsCreateVersion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AgentsCreateVersionRequest) =>
      agentsService.createVersion(data),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: agentsKeys.versions({ name: variables.name }),
      })
    },
  })
}
