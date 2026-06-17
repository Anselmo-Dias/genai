import { createRoute } from "@tanstack/react-router"

import { appLayoutRoute } from "./_layout.route"
import { requireRole } from "@/router/guards/require-auth"
import { ADMIN_ROLES } from "@/auth/roles"
import { McpListPage } from "@/features/mcp/pages/mcp-list.page"

export const mcpListRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/private/mcp",
  beforeLoad: requireRole(...ADMIN_ROLES),
  component: McpListPage,
})
