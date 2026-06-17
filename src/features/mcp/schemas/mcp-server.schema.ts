import { z } from "zod"

export const mcpServerSchema = z.object({
  name: z.string(),
  server_name: z.string(),
  label: z.string(),
  client: z.string(),
  status: z.enum(["active", "inactive"]),
  description: z.string().optional(),
  base_url: z.string().url(),
  transport: z.string(),
  healthcheck_path: z.string().nullable(),
  timeout_ms: z.number(),
  enabled: z.boolean(),
  creation: z.string(),
  modified: z.string(),
})

export type McpServerRowData = z.infer<typeof mcpServerSchema>
