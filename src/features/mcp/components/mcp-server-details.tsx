import { useState } from "react"
import { UsersIcon, WrenchIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { type McpServer } from "../types/mcp.type"
import { McpToolsList } from "./mcp-tools-list"
import { McpAccessList } from "./mcp-access-list"

type McpServerDetailsProps = {
  server: McpServer
  onClose: () => void
}

export function McpServerDetails({ server }: McpServerDetailsProps) {
  const [activeTab, setActiveTab] = useState("tools")

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-start justify-between p-6 border-b">
        <div className="flex gap-4">
          <div className="flex aspect-square size-12 items-center justify-center rounded-xl border bg-muted/50 text-muted-foreground">
            <WrenchIcon className="size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{server.server_name}</h2>
              <Badge variant={server.status === "active" ? "default" : "outline"}>
                {server.status === "active" ? "Ativo" : "Inativo"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {server.description || "Nenhuma descrição fornecida."}
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col gap-0">
          <div className="px-6 py-4 border-b bg-muted/20">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="tools" className="flex-1 md:flex-none md:min-w-32">
                <WrenchIcon className="size-4" />
                Ferramentas
              </TabsTrigger>
              <TabsTrigger value="access" className="flex-1 md:flex-none md:min-w-32">
                <UsersIcon className="size-4" />
                Acessos
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <TabsContent value="tools" className="m-0">
              <McpToolsList serverName={server.name} />
            </TabsContent>
            <TabsContent value="access" className="m-0">
              <McpAccessList server={server} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
