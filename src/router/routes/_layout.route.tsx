import { createRoute } from "@tanstack/react-router"

import { rootRoute } from "./root.route"
import { AppLayout } from "@/layouts/app-layout"
import { requireAuth } from "../guards/require-auth"

export const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app-layout",
  beforeLoad: requireAuth,
  component: AppLayout,
})
