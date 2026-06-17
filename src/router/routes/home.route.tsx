import { createRoute } from "@tanstack/react-router"

import { appLayoutRoute } from "./_layout.route"
import { HomePage } from "@/features/home/pages/home.page"

export const homeRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/home",
  component: HomePage,
})
