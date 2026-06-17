import { type Agent } from "./agent.type"

export type UpsertAgentPayload = {
  title?: string
  type?: string
  description?: string
  prompt?: string
  model_name?: string
  provider?: string
  api_key?: string
  vault_key?: string
  rag_available?: "Habilitado" | "Desabilitado"
  document_path?: string
  enabled?: 0 | 1
  client?: string
  thread_expiration_period?: number
  temporal_restriction_enabled?: 0 | 1
  temporal_allowed_days?: string
  temporal_start_time?: string
  temporal_end_time?: string
  temporal_timezone?: string
  mcp_tools?: { mcp_server: string; tool: string; require_approval: 0 | 1 }[]
}

export type AgentsCreateRequest = UpsertAgentPayload | FormData

export type AgentsCreateResponse = Agent

export type AgentsUpdateRequest = {
  name: string
  payload: UpsertAgentPayload | FormData
}

export type AgentsUpdateResponse = Agent

export type AgentsDeleteRequest = {
  name: string
}

export type AgentsDeleteResponse = void
