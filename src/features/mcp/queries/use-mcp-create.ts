import { useMutation, useQueryClient } from "@tanstack/react-query"

import { mcpKeys } from "../keys/mcp.keys"
import { mcpService } from "../services/mcp.service"
import { type McpCreateRequest } from "../types/mcp.type"

export function useMcpCreate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: McpCreateRequest) => mcpService.create(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: mcpKeys.all })
    },
  })
}
