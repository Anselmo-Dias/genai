import { createRoute } from "@tanstack/react-router"

import { appLayoutRoute } from "../_layout.route"
import { requireRole } from "@/router/guards/require-auth"
import { ADMIN_ROLES } from "@/auth/roles"
import { AgentsListPage } from "@/features/agents/pages/agents-list.page"

export const agentsListRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/private/agents/list",
  beforeLoad: requireRole(...ADMIN_ROLES),
  component: AgentsListPage,
})
