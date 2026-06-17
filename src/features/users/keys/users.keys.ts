import { type UsersGetAllRequest } from "../types/users-get-all.type"

export const usersKeys = {
  all: ["users"] as const,
  me: ["users", "me"] as const,
  getAll: ["users", "getAll"] as const,
  getAllWithParams: (params: UsersGetAllRequest) => ["users", "getAll", params] as const,
}
