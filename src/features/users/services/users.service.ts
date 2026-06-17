import { api } from "@/services/api"

import { type UserGetMeResponse } from "../types/user-get-me.type"
import { type UsersGetAllRequest, type UsersGetAllResponse } from "../types/users-get-all.type"

const USER_FIELDS = ["email", "first_name", "full_name", "last_name", "username", "name"]

export const usersService = {
  async getMe(): Promise<UserGetMeResponse> {
    const response = await api.get<UserGetMeResponse>("/userinfo/me")
    return response.data
  },

  async getAll(data: UsersGetAllRequest = {}): Promise<UsersGetAllResponse> {
    const params: Record<string, string> = {
      fields: JSON.stringify(USER_FIELDS),
    }

    if (data.clientId) {
      params.filters = JSON.stringify([["client", "=", data.clientId]])
    }

    const response = await api.get<UsersGetAllResponse>("/user", { params })
    return response.data
  },
}
