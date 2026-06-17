import { ChevronRightIcon, PencilIcon, ServerIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { type McpServer } from "../types/mcp.type"
import { useMcpDelete } from "../queries/use-mcp-delete"

type McpServerCardProps = {
  server: McpServer
  isSelected: boolean
  onClick: () => void
  onEdit: () => void
}

export function McpServerCard({
  server,
  isSelected,
  onClick,
  onEdit,
}: McpServerCardProps) {
  const deleteMutation = useMcpDelete()

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm(`Deseja realmente excluir o servidor "${server.server_name}"?`)) {
      deleteMutation.mutate({ id: server.name }, {
        onSuccess: () => toast.success("Servidor excluído com sucesso"),
        onError: () => toast.error("Erro ao excluir servidor"),
      })
    }
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md",
        isSelected
          ? "border-primary bg-primary/5"
          : "bg-card hover:border-foreground/20"
      )}
    >
      <div className={cn(
        "flex aspect-square size-10 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors group-hover:text-foreground",
        isSelected && "border-primary text-primary"
      )}>
        <ServerIcon className="size-5" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">{server.server_name}</h3>
        <div className="flex items-center gap-2 mt-0.5">
          <Badge
            variant={server.status === "active" ? "default" : "outline"}
            className="text-[10px] uppercase tracking-wider h-4 px-1"
          >
            {server.status === "active" ? "Ativo" : "Inativo"}
          </Badge>
          <span className="text-xs text-muted-foreground truncate">
            {server.base_url}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
        >
          <PencilIcon className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleDelete}
        >
          <Trash2Icon className="size-3.5" />
        </Button>
      </div>

      <ChevronRightIcon className={cn(
        "size-4 text-muted-foreground transition-transform",
        isSelected && "translate-x-1 text-primary"
      )} />
    </div>
  )
}
