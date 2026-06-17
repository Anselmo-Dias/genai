export type McpHeader = {
  header_name: string
  default_value?: string
  default_value_vault?: string
  enabled: boolean
}

export type McpTool = {
  name: string
  description: string
  input_schema: {
    type: string
    properties: {
      [key: string]: {
        type: string
        title: string
        description: string
      }
    }
    required: string[]
  }
}

export type McpUser = {
  name: string
  user: string
  user_fullname: string
  enabled: number
}

export type McpServer = {
  name: string
  creation: string
  modified: string
  modified_by: string
  owner: string
  docstatus: number
  idx: number
  server_name: string
  label: string
  client: string
  status: "active" | "inactive"
  description: string
  base_url: string
  transport: string
  healthcheck_path: string | null
  timeout_ms: number
  users?: McpUser[]
  accessCount?: number
  headers: McpHeader[]
  enabled: boolean
}

export type McpServerAccess = {
  auth_type: string
  client: string
  creation: string
  docstatus: number
  doctype: string
  enabled: number
  headers: McpHeader[]
  idx: number
  modified: string
  modified_by: string
  name: string
  owner: string
  server: string
  server_name: string
  user: string
  user_fullname: string
}

export type McpToolGroupItem = {
  tool: string
  require_approval: 0 | 1
}

export type McpToolGroup = {
  name?: string
  mcp_server: string
  tools: McpToolGroupItem[]
  count: number | string
  require_approval?: 0 | 1
}

// Service Types
export type CreateMcpServerPayload = {
  server_name: string
  label: string
  base_url: string
  client?: string
  description?: string
  status?: string
  transport?: string
  healthcheck_path?: string
  timeout_ms?: number
  headers?: McpHeader[]
}

export type GrantAccessPayload = {
  server: string
  client?: string
  user: string
  enabled: boolean
  auth_type?: string
  headers?: McpHeader[]
}

export type McpGetAllRequest = {
  withUsers?: boolean
  client?: string
}

export type McpGetAllResponse = {
  servers: McpServer[]
  next_page: boolean
}

export type McpGetOneRequest = {
  id: string
}

export type McpGetOneResponse = McpServer

export type McpCreateRequest = CreateMcpServerPayload

export type McpCreateResponse = McpGetAllResponse // Based on Angular service return type

export type McpUpdateRequest = {
  id: string
  payload: Partial<CreateMcpServerPayload>
}

export type McpUpdateResponse = McpGetAllResponse

export type McpDeleteRequest = {
  id: string
}

export type McpDeleteResponse = void

export type McpGetToolsRequest = {
  name: string
}

export type McpGetToolsResponse = {
  tools: McpTool[]
}

export type McpGetUsersWithAccessRequest = {
  id: string
}

export type McpGetUsersWithAccessResponse = McpUser[]

export type McpGrantAccessRequest = GrantAccessPayload

export type McpGrantAccessResponse = any

export type McpGetAccessRequest = {
  accessId: string
}

export type McpGetAccessResponse = McpServerAccess

export type McpUpdateAccessRequest = {
  accessId: string
  payload: Partial<GrantAccessPayload>
}

export type McpUpdateAccessResponse = any

export type McpDeleteAccessRequest = {
  user: string
  server: string
}

export type McpDeleteAccessResponse = void
