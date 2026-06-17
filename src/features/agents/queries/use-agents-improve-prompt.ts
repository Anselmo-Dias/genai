import { useMutation } from "@tanstack/react-query"

import { agentsService } from "../services/agents.service"
import { type AgentsImprovePromptRequest } from "../types/agents-improve-prompt.type"

export function useAgentsImprovePrompt() {
  return useMutation({
    mutationFn: (data: AgentsImprovePromptRequest) =>
      agentsService.improvePrompt(data),
  })
}
