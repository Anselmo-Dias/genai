import { useQuery } from "@tanstack/react-query"

import { mcpKeys } from "../keys/mcp.keys"
import { mcpService } from "../services/mcp.service"
import { type McpGetToolsRequest } from "../types/mcp.type"

export function useMcpGetTools(params: McpGetToolsRequest) {
  return useQuery({
    queryKey: mcpKeys.getTools(params),
    queryFn: async () => mcpService.getTools(params),
    enabled: !!params.name,
  })
}
