import { MoreVerticalIcon, PencilIcon, Trash2Icon, InfoIcon } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

import { type McpServer } from "../types/mcp.type"
import { useMcpDelete } from "../queries/use-mcp-delete"

type McpServersTableProps = {
  servers: McpServer[]
  isLoading: boolean
  onEdit: (server: McpServer) => void
  onViewDetails: (server: McpServer) => void
}

export function McpServersTable({
  servers,
  isLoading,
  onEdit,
  onViewDetails,
}: McpServersTableProps) {
  const deleteMutation = useMcpDelete()

  const handleDelete = (server: McpServer) => {
    if (confirm(`Deseja realmente excluir o servidor "${server.server_name}"?`)) {
      deleteMutation.mutate({ id: server.name }, {
        onSuccess: () => toast.success("Servidor excluído com sucesso"),
        onError: () => toast.error("Erro ao excluir servidor"),
      })
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Servidor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>URL Base</TableHead>
              <TableHead>Timeout</TableHead>
              <TableHead className="w-12 text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                <TableCell />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Servidor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>URL Base</TableHead>
            <TableHead>Timeout</TableHead>
            <TableHead className="w-12 text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {servers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                Nenhum item encontrado
              </TableCell>
            </TableRow>
          ) : (
            servers.map((server) => (
              <TableRow key={server.name} className="group hover:bg-muted/30">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{server.server_name}</span>
                    <span className="text-xs text-muted-foreground truncate max-w-xs">
                      {server.label}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={server.status === "active" ? "default" : "outline"}>
                    {server.status === "active" ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground font-mono text-xs">
                  {server.base_url}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">
                  {server.timeout_ms}ms
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreVerticalIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => onViewDetails(server)}>
                        <InfoIcon className="mr-2 size-4" />
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(server)}>
                        <PencilIcon className="mr-2 size-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => handleDelete(server)}
                      >
                        <Trash2Icon className="mr-2 size-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
