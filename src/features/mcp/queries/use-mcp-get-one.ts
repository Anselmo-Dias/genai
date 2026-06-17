import { useQuery } from "@tanstack/react-query"

import { mcpKeys } from "../keys/mcp.keys"
import { mcpService } from "../services/mcp.service"
import { type McpGetOneRequest } from "../types/mcp.type"

export function useMcpGetOne(params: McpGetOneRequest) {
  return useQuery({
    queryKey: mcpKeys.getById(params.id),
    queryFn: async () => mcpService.getOne(params),
    enabled: !!params.id,
  })
}
