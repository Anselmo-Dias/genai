import { useQuery } from "@tanstack/react-query"

import { usersKeys } from "../keys/users.keys"
import { usersService } from "../services/users.service"
import { type UsersGetAllRequest } from "../types/users-get-all.type"

export function useUsersGetAll(params: UsersGetAllRequest = {}) {
  return useQuery({
    queryKey: usersKeys.getAllWithParams(params),
    queryFn: async () => usersService.getAll(params),
  })
}
