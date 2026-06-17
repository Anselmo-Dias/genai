import { type Agent } from "./agent.type"

export type AgentDetail = Agent & {
  prompt: string
  api_key: string
  vault_key?: string
  model_uri: string
  model_provider_uri: string
  model_fullname: string
  document_path: string
  rag_available: "Habilitado" | "Desabilitado"
  mcp_tools: { mcp_server: string; tool: string; require_approval: 0 | 1 }[]
}

export type AgentsGetOneRequest = {
  name: string
}

export type AgentsGetOneResponse = AgentDetail
