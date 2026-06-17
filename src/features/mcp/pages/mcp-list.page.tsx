import { useState } from "react"
import { LayoutGridIcon, ListIcon, PlusIcon, SearchIcon, ServerIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useClientStore } from "@/features/clients/store/client-store"
import { useDebouncedValue } from "@/hooks/use-debounced-value"

import { useMcpGetAll } from "../queries/use-mcp-get-all"
import { type McpServer } from "../types/mcp.type"
import { McpServerCard } from "../components/mcp-server-card"
import { McpServerFormDialog } from "../components/mcp-server-form-dialog"
import { McpServersTable } from "../components/mcp-servers-table"
import { McpServerDetailsDialog } from "../components/mcp-server-details-dialog"

export function McpListPage() {
  const { selectedClientName } = useClientStore()
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebouncedValue(search, 500)
  const [selectedServer, setSelectedServer] = useState<McpServer | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [serverToEdit, setServerToEdit] = useState<McpServer | undefined>()
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")

  const { data, isLoading } = useMcpGetAll({
    client: selectedClientName || undefined,
    withUsers: true,
  })

  const servers = data?.servers ?? []
  const filteredServers = servers.filter((server) =>
    server.server_name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    server.label.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  const handleCreateClick = () => {
    setServerToEdit(undefined)
    setIsFormOpen(true)
  }

  const handleEditClick = (server: McpServer) => {
    setServerToEdit(server)
    setIsFormOpen(true)
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Servidores MCP</h1>
          <p className="text-muted-foreground">
            Gerencie suas conexões e ferramentas MCP
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleCreateClick} className="gap-2">
            <PlusIcon className="size-4" />
            Criar Servidor
          </Button>
        </div>
      </header>

      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Procurar por um servidor..."
            className="pl-9"
          />
        </div>

        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => value && setViewMode(value as "cards" | "table")}
          spacing={0}
          variant="outline"
        >
          <ToggleGroupItem value="cards" aria-label="Visualização em cards">
            <LayoutGridIcon className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="table" aria-label="Visualização em tabela">
            <ListIcon className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <main className="flex-1 overflow-y-auto pr-2">
        {viewMode === "cards" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-32 rounded-xl border bg-card animate-pulse" />
              ))
            ) : filteredServers.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground border rounded-xl border-dashed">
                <ServerIcon className="size-12 mb-4 opacity-20" />
                <p>Nenhum servidor encontrado</p>
              </div>
            ) : (
              filteredServers.map((server) => (
                <McpServerCard
                  key={server.name}
                  server={server}
                  isSelected={false} // Não precisa mais de destaque lateral
                  onClick={() => setSelectedServer(server)}
                  onEdit={() => handleEditClick(server)}
                />
              ))
            )}
          </div>
        ) : (
          <McpServersTable
            servers={filteredServers}
            isLoading={isLoading}
            onEdit={handleEditClick}
            onViewDetails={setSelectedServer}
          />
        )}
      </main>

      <McpServerFormDialog
        server={serverToEdit}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      />

      <McpServerDetailsDialog
        server={selectedServer}
        open={!!selectedServer}
        onOpenChange={(open) => !open && setSelectedServer(null)}
      />
    </div>
  )
}
