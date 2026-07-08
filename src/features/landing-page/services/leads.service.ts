import { api } from "@/services/api"

import type {
  LeadsCreateRequest,
  LeadsCreateResponse,
} from "../types/leads.types"

export const leadsService = {
  async create(data: LeadsCreateRequest): Promise<LeadsCreateResponse> {
    const response = await api.post("/leads", data)
    return response.data
  },
}
