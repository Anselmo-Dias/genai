import { useMutation, useQueryClient } from "@tanstack/react-query"

import { mcpKeys } from "../keys/mcp.keys"
import { mcpService } from "../services/mcp.service"
import { type McpUpdateRequest } from "../types/mcp.type"

export function useMcpUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: McpUpdateRequest) => mcpService.update(data),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: mcpKeys.all })
      void queryClient.invalidateQueries({
        queryKey: mcpKeys.getById(variables.id),
      })
    },
  })
}
