import { useMutation, useQueryClient } from "@tanstack/react-query"

import { mcpKeys } from "../keys/mcp.keys"
import { mcpService } from "../services/mcp.service"
import { type McpDeleteAccessRequest } from "../types/mcp.type"

export function useMcpDeleteAccess() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: McpDeleteAccessRequest) => mcpService.deleteAccess(data),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: mcpKeys.getUsersWithAccess(variables.server),
      })
    },
  })
}
