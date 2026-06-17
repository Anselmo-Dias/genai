import { useState } from "react"
import { Outlet } from "@tanstack/react-router"
import { Settings } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SettingsDialog } from "@/features/settings/components"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function AppLayout() {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <SidebarProvider>
      <AppSidebar onSettingsClick={() => setSettingsOpen(true)} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm font-medium">GenAI Portal</span>
          <div className="ml-auto flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="size-8"
                    onClick={() => setSettingsOpen(true)}
                  >
                    <Settings className="size-4" />
                    <span className="sr-only">Configurações</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Configurações</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </SidebarProvider>
  )
}
