import { api } from "@/services/api"

import {
  type ClientsGetAllResponse,
} from "../types/clients-get-all.type"
import {
  type ClientsGetOneRequest,
  type ClientsGetOneResponse,
} from "../types/clients-get-one.type"
import {
  type ClientsUpdateConfigRequest,
  type ClientsUpdateConfigResponse,
} from "../types/clients-update-config.type"

export const clientsService = {
  // GET /ai_application retorna todos os registros sem paginação (array direto).
  async getAll(): Promise<ClientsGetAllResponse> {
    const response = await api.get<ClientsGetAllResponse>("/ai_application")
    return response.data
  },

  async getOne(data: ClientsGetOneRequest): Promise<ClientsGetOneResponse> {
    const response = await api.get<ClientsGetOneResponse>(`/ai_application/${data.name}`)
    return response.data
  },

  async updateConfig(
    data: ClientsUpdateConfigRequest,
  ): Promise<ClientsUpdateConfigResponse> {
    const response = await api.put<ClientsUpdateConfigResponse>(
      `/ai_application/${data.name}`,
      data.payload,
    )
    return response.data
  },
}
