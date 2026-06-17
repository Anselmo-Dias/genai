import { type Agent } from "./agent.type"

export type AgentsGetAllRequest = {
  client?: string
  limit?: number
  limitStart?: number
  search?: string
}

// Mirror do tipo `getAgents` (GET /agent).
export type AgentsGetAllResponse = {
  user: string
  full_name: string
  agents: Agent[]
  next_page?: boolean
}
