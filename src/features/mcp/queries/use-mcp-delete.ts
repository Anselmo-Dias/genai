import { useMutation, useQueryClient } from "@tanstack/react-query"

import { mcpKeys } from "../keys/mcp.keys"
import { mcpService } from "../services/mcp.service"
import { type McpDeleteRequest } from "../types/mcp.type"

export function useMcpDelete() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: McpDeleteRequest) => mcpService.remove(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: mcpKeys.all })
    },
  })
}
