import { api } from "@/services/api"

import {
  type McpCreateRequest,
  type McpCreateResponse,
  type McpDeleteAccessRequest,
  type McpDeleteAccessResponse,
  type McpDeleteRequest,
  type McpDeleteResponse,
  type McpGetAccessRequest,
  type McpGetAccessResponse,
  type McpGetAllRequest,
  type McpGetAllResponse,
  type McpGetOneRequest,
  type McpGetOneResponse,
  type McpGetToolsRequest,
  type McpGetToolsResponse,
  type McpGetUsersWithAccessRequest,
  type McpGetUsersWithAccessResponse,
  type McpGrantAccessRequest,
  type McpGrantAccessResponse,
  type McpUpdateAccessRequest,
  type McpUpdateAccessResponse,
  type McpUpdateRequest,
  type McpUpdateResponse,
} from "../types/mcp.type"

export const mcpService = {
  async getAll(data: McpGetAllRequest = {}): Promise<McpGetAllResponse> {
    const params: Record<string, string> = {}
    if (data.withUsers) params.count = "true"
    if (data.client) params.client = data.client

    const response = await api.get<McpGetAllResponse>("/mcpservers", { params })
    return response.data
  },

  async getOne(data: McpGetOneRequest): Promise<McpGetOneResponse> {
    const response = await api.get<McpGetOneResponse>(`/mcpservers/${data.id}`)
    return response.data
  },

  async create(data: McpCreateRequest): Promise<McpCreateResponse> {
    const response = await api.post<McpCreateResponse>("/mcpservers", data)
    return response.data
  },

  async update(data: McpUpdateRequest): Promise<McpUpdateResponse> {
    const response = await api.put<McpUpdateResponse>(
      `/mcpservers/${data.id}`,
      data.payload,
    )
    return response.data
  },

  async remove(data: McpDeleteRequest): Promise<McpDeleteResponse> {
    await api.delete(`/mcpservers/${data.id}`)
  },

  async getTools(data: McpGetToolsRequest): Promise<McpGetToolsResponse> {
    const response = await api.get<McpGetToolsResponse>(
      `/mcpservers/${data.name}/tools`,
    )
    return response.data
  },

  async getUsersWithAccess(
    data: McpGetUsersWithAccessRequest,
  ): Promise<McpGetUsersWithAccessResponse> {
    const response = await api.get<McpGetUsersWithAccessResponse>(
      `/mcpservers/${data.id}/users`,
    )
    return response.data
  },

  async grantAccess(data: McpGrantAccessRequest): Promise<McpGrantAccessResponse> {
    const response = await api.post<McpGrantAccessResponse>(
      "/mcpservers/access",
      data,
    )
    return response.data
  },

  async getAccess(data: McpGetAccessRequest): Promise<McpGetAccessResponse> {
    const response = await api.get<McpGetAccessResponse>(
      `/mcpservers/access/${data.accessId}`,
    )
    return response.data
  },

  async updateAccess(
    data: McpUpdateAccessRequest,
  ): Promise<McpUpdateAccessResponse> {
    const response = await api.put<McpUpdateAccessResponse>(
      `/mcpservers/access/${data.accessId}`,
      data.payload,
    )
    return response.data
  },

  async deleteAccess(
    data: McpDeleteAccessRequest,
  ): Promise<McpDeleteAccessResponse> {
    await api.delete("/mcpservers/access", {
      data: {
        user: data.user,
        server: data.server,
      },
    })
  },
}
