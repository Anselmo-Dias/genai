import { type McpGetAllRequest, type McpGetToolsRequest } from "../types/mcp.type"

export const mcpKeys = {
  all: ["mcp"] as const,
  getAll: ["mcp", "getAll"] as const,
  getAllWithParams: (params: McpGetAllRequest) =>
    ["mcp", "getAll", params] as const,
  getById: (id: string) => ["mcp", "getById", id] as const,
  getTools: (params: McpGetToolsRequest) => ["mcp", "getTools", params] as const,
  getUsersWithAccess: (id: string) => ["mcp", "getUsersWithAccess", id] as const,
  getAccess: (accessId: string) => ["mcp", "getAccess", accessId] as const,
}
