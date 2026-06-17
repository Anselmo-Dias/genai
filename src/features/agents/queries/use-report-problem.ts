import { useMutation } from "@tanstack/react-query"

import { agentsService } from "../services/agents.service"
import { type AgentsReportProblemRequest } from "../types/report-problem.type"

export function useAgentsReportProblem() {
  return useMutation({
    mutationFn: (data: AgentsReportProblemRequest) =>
      agentsService.reportProblem(data),
  })
}
