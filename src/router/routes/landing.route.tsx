import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./root.route"
import { LandingPage } from "@/features/landing-page/pages/landing-page"

export const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
})
