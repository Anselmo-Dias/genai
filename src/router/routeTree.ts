import { rootRoute } from "./routes/root.route"
import { appLayoutRoute } from "./routes/_layout.route"
import { homeRoute } from "./routes/home.route"
import { agentsListRoute } from "./routes/agents/list.route"
import { mcpListRoute } from "./routes/mcp.route"
import { landingRoute } from "./routes/landing.route"

export const routeTree = rootRoute.addChildren([
  landingRoute,
  appLayoutRoute.addChildren([homeRoute, agentsListRoute, mcpListRoute]),
])
