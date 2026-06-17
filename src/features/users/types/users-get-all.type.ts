import { type User } from "./user.type"

export type UsersGetAllRequest = {
  clientId?: string
}

export type UsersGetAllResponse = User[]
