import { api } from "@/services/api"

import { type AgentsGetOneRequest, type AgentsGetOneResponse } from "../types/agent-detail.type"
import {
  type AgentsCreateRequest,
  type AgentsCreateResponse,
  type AgentsDeleteRequest,
  type AgentsDeleteResponse,
  type AgentsUpdateRequest,
  type AgentsUpdateResponse,
} from "../types/agent-mutations.type"
import {
  type AgentsGetAllRequest,
  type AgentsGetAllResponse,
} from "../types/agents-get-all.type"
import {
  type AgentsGetUsersRequest,
  type AgentsGetUsersResponse,
} from "../types/agents-get-users.type"
import {
  type AgentsImprovePromptRequest,
  type AgentsImprovePromptResponse,
} from "../types/agents-improve-prompt.type"
import {
  type AgentsCreateVersionRequest,
  type AgentsCreateVersionResponse,
  type AgentsDeleteVersionRequest,
  type AgentsDeleteVersionResponse,
  type AgentsGetVersionsRequest,
  type AgentsGetVersionsResponse,
} from "../types/agents-versions.type"
import { type AgentsGetAllModelsResponse } from "../types/model.type"
import {
  type AgentsReportProblemRequest,
  type AgentsReportProblemResponse,
} from "../types/report-problem.type"

export const agentsService = {
  async getAll(data: AgentsGetAllRequest = {}): Promise<AgentsGetAllResponse> {
    const params: Record<string, string> = {}
    if (data.client) params.client = data.client
    if (data.limit !== undefined) params.limit = String(data.limit)
    if (data.limitStart !== undefined)
      params.limit_start = String(data.limitStart)
    if (data.search?.trim()) params.search = data.search.trim()

    const response = await api.get<AgentsGetAllResponse>("/agent", { params })
    return response.data
  },

  async getOne(data: AgentsGetOneRequest): Promise<AgentsGetOneResponse> {
    const response = await api.get<AgentsGetOneResponse>(`/agent/${data.name}`)
    return response.data
  },

  async create(data: AgentsCreateRequest): Promise<AgentsCreateResponse> {
    const response = await api.post<AgentsCreateResponse>("/agent", data)
    return response.data
  },

  async update(data: AgentsUpdateRequest): Promise<AgentsUpdateResponse> {
    const response = await api.put<AgentsUpdateResponse>(
      `/agent/${data.name}`,
      data.payload,
    )
    return response.data
  },

  async remove(data: AgentsDeleteRequest): Promise<AgentsDeleteResponse> {
    await api.delete(`/agent/${data.name}`)
  },

  async getAllModels(): Promise<AgentsGetAllModelsResponse> {
    const response = await api.get<AgentsGetAllModelsResponse>("/agent/models")
    return response.data
  },

  async getUsers(data: AgentsGetUsersRequest): Promise<AgentsGetUsersResponse> {
    const response = await api.get<AgentsGetUsersResponse>(
      `/agent/${data.name}/users`,
    )
    return response.data
  },

  async getVersions(
    data: AgentsGetVersionsRequest,
  ): Promise<AgentsGetVersionsResponse> {
    const params: Record<string, string> = {}
    if (data.creator) params.creator = data.creator
    const response = await api.get<AgentsGetVersionsResponse>(
      `/agent/${data.name}/versions`,
      { params },
    )
    return response.data
  },

  async createVersion(
    data: AgentsCreateVersionRequest,
  ): Promise<AgentsCreateVersionResponse> {
    const response = await api.post<AgentsCreateVersionResponse>(
      `/agent/${data.name}/versions`,
      data.body,
    )
    return response.data
  },

  async deleteVersion(
    data: AgentsDeleteVersionRequest,
  ): Promise<AgentsDeleteVersionResponse> {
    await api.delete(
      data.name
        ? `/agent/${data.name}/versions/${data.versionId}`
        : `/agent/versions/${data.versionId}`,
    )
  },

  async improvePrompt(
    data: AgentsImprovePromptRequest,
  ): Promise<AgentsImprovePromptResponse> {
    const response = await api.post<AgentsImprovePromptResponse>(
      "/agent/prompt/improve",
      { current_prompt: data.currentPrompt },
    )
    return response.data
  },

  async reportProblem(
    data: AgentsReportProblemRequest,
  ): Promise<AgentsReportProblemResponse> {
    const response = await api.post<AgentsReportProblemResponse>(
      `/agent/help/${data.agentId}`,
      { message: data.message },
    )
    return response.data
  },
}
