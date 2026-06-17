import { useMutation, useQueryClient } from "@tanstack/react-query"

import { mcpKeys } from "../keys/mcp.keys"
import { mcpService } from "../services/mcp.service"
import { type McpGrantAccessRequest } from "../types/mcp.type"

export function useMcpGrantAccess() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: McpGrantAccessRequest) => mcpService.grantAccess(data),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: mcpKeys.getUsersWithAccess(variables.server),
      })
    },
  })
}
