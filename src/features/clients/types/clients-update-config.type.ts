import { type Client, type ClientConfigPayload } from "./client.type"

export type ClientsUpdateConfigRequest = {
  name: string
  payload: ClientConfigPayload
}

export type ClientsUpdateConfigResponse = Client
