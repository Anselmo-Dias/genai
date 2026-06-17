export type Model = {
  name: string
  creation: string
  modified: string
  modified_by: string
  owner: string
  docstatus: number
  idx: number
  model_name: string
  friendly_name: string
  provider: string
  uri: string
  base_url?: string
  api_key?: string
}

export type AgentsGetAllModelsRequest = Record<string, never>

export type AgentsGetAllModelsResponse = Model[]
