import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TooltipProvider } from "@/components/ui/tooltip";

export const rootRoute = createRootRoute({
  component: () => (
    <TooltipProvider>
      <Outlet />
    </TooltipProvider>
  ),
})