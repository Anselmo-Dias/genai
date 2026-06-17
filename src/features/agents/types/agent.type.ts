// Espelha agent.type.ts / documents.type.ts do mobileXGenAI_Portal.

export type DocumentVersion = {
  name: string
  version_number: number
  is_active: number
  indexed_at: string | null
  index_status: string
  parse_status: string
}

export type DocumentBackends = {
  kb_local: boolean
  openai_vector_store: boolean
}

export type AgentDocument = {
  document_id: string
  title: string
  file_name: string
  mime_type: string
  status: string | null
  last_indexed_at: string | null
  backends: DocumentBackends
  kb_document_id: string | null
  openai_id: string | null
  can_delete: boolean
  version_count: number
  versions: DocumentVersion[]
}

export type Agent = {
  name: string
  title: string
  icon?: string
  description: string
  type: string
  model_name: string
  model_provider: string
  model_friendly_name: string
  documents: AgentDocument[]
  creation: string
  modified: string
  hasTools?: boolean
  enabled?: number
  thread_expiration_period?: number
  temporal_restriction_enabled?: 0 | 1
  temporal_allowed_days?: string
  temporal_start_time?: string
  temporal_end_time?: string
  temporal_timezone?: string
}
