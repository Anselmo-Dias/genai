export type AgentVersion = {
  name: string
  title: string
  description: string
  creation: string
  creator: string
  agent: string
}

export type AgentsGetVersionsRequest = {
  name: string
  creator?: string
}

export type AgentsGetVersionsResponse = AgentVersion[]

export type AgentsCreateVersionRequest = {
  name: string
  body: {
    title: string
    description: string
  }
}

export type AgentsCreateVersionResponse = AgentVersion

export type AgentsDeleteVersionRequest = {
  versionId: string
  name?: string
}

export type AgentsDeleteVersionResponse = void
