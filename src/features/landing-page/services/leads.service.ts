import { api } from "@/services/api"

import type {
  LeadsCreateRequest,
  LeadsCreateResponse,
} from "../types/leads.types"

// Endpoint que registra o lead e dispara o e-mail para o time comercial.
const LEADS_ENDPOINT = import.meta.env.VITE_LEADS_ENDPOINT ?? "/leads"

export const leadsService = {
  async create(data: LeadsCreateRequest): Promise<LeadsCreateResponse> {
    const response = await api.post(LEADS_ENDPOINT, data)
    return response.data
  },
}
