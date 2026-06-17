import { useQuery } from "@tanstack/react-query"

import { mcpKeys } from "../keys/mcp.keys"
import { mcpService } from "../services/mcp.service"
import { type McpGetUsersWithAccessRequest } from "../types/mcp.type"

export function useMcpGetUsersWithAccess(params: McpGetUsersWithAccessRequest) {
  return useQuery({
    queryKey: mcpKeys.getUsersWithAccess(params.id),
    queryFn: async () => mcpService.getUsersWithAccess(params),
    enabled: !!params.id,
  })
}
