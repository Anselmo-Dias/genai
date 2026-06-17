import { useQuery } from "@tanstack/react-query"

import { mcpKeys } from "../keys/mcp.keys"
import { mcpService } from "../services/mcp.service"
import { type McpGetAllRequest } from "../types/mcp.type"

export function useMcpGetAll(params: McpGetAllRequest = {}) {
  return useQuery({
    queryKey: mcpKeys.getAllWithParams(params),
    queryFn: async () => mcpService.getAll(params),
  })
}
