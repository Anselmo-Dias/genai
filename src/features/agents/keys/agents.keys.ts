import { type AgentsGetAllRequest } from "../types/agents-get-all.type"
import { type AgentsGetVersionsRequest } from "../types/agents-versions.type"

export const agentsKeys = {
  all: ["agents"] as const,
  getAll: ["agents", "getAll"] as const,
  getAllWithParams: (params: AgentsGetAllRequest) =>
    ["agents", "getAll", params] as const,
  getById: (name: string) => ["agents", "getById", name] as const,
  models: ["agents", "models"] as const,
  users: (name: string) => ["agents", "users", name] as const,
  versions: (params: AgentsGetVersionsRequest) =>
    ["agents", "versions", params] as const,
  improvePrompt: ["agents", "improvePrompt"] as const,
}
