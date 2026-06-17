import { useMutation, useQueryClient } from "@tanstack/react-query"

import { agentsKeys } from "../keys/agents.keys"
import { agentsService } from "../services/agents.service"
import { type AgentsDeleteVersionRequest } from "../types/agents-versions.type"

export function useAgentsDeleteVersion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AgentsDeleteVersionRequest) =>
      agentsService.deleteVersion(data),
    onSuccess: (_, variables) => {
      if (variables.name) {
        void queryClient.invalidateQueries({
          queryKey: agentsKeys.versions({ name: variables.name }),
        })
      } else {
        // Se não tiver nome, invalida todas as versões (menos comum)
        void queryClient.invalidateQueries({ queryKey: ["agents", "versions"] })
      }
    },
  })
}
