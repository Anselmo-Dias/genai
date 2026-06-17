import { useQuery } from "@tanstack/react-query"

import { usersKeys } from "../keys/users.keys"
import { usersService } from "../services/users.service"

export function useUsersGetMe() {
  return useQuery({
    queryKey: usersKeys.me,
    queryFn: async () => usersService.getMe(),
    staleTime: 5 * 60 * 1000,
  })
}
