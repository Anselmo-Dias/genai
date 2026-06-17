// Espelha client.type.ts do mobileXGenAI_Portal.

export type Client = {
  client_name: string
  creation: string
  docstatus: number
  idx: number
  modified: string
  modified_by: string
  name: string
  owner: string
  status: string
  log_conversation: 0 | 1
  allow_favorite_threads: 0 | 1
  allow_delete_threads: 0 | 1
  thread_expiration_period: number
}

export type ClientConfigPayload = {
  log_conversation: boolean
  allow_favorite_threads: boolean
  allow_delete_threads: boolean
  thread_expiration_period: number
}
