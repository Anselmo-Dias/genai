import { useState } from "react"
import { PlusIcon, Trash2Icon, UserIcon, UsersIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { type McpServer } from "../types/mcp.type"
import { useMcpGetUsersWithAccess } from "../queries/use-mcp-get-users-with-access"
import { useMcpDeleteAccess } from "../queries/use-mcp-delete-access"
import { McpGrantAccessDialog } from "./mcp-grant-access-dialog"

type McpAccessListProps = {
  server: McpServer
}

export function McpAccessList({ server }: McpAccessListProps) {
  const [isGrantDialogOpen, setIsGrantDialogOpen] = useState(false)
  const { data: users = [], isLoading } = useMcpGetUsersWithAccess({ id: server.name })
  const deleteAccessMutation = useMcpDeleteAccess()

  const handleDeleteAccess = (userId: string, userFullName: string) => {
    if (confirm(`Remover acesso de "${userFullName}" ao servidor "${server.server_name}"?`)) {
      deleteAccessMutation.mutate(
        { user: userId, server: server.name },
        {
          onSuccess: () => toast.success("Acesso removido com sucesso"),
          onError: () => toast.error("Erro ao remover acesso"),
        }
      )
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">Usuários com acesso</h4>
        <Button size="sm" onClick={() => setIsGrantDialogOpen(true)} className="gap-2 h-8">
          <PlusIcon className="size-3.5" />
          Conceder Acesso
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-xl" />
          ))
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <UsersIcon className="size-12 mb-4 opacity-20" />
            <p>Nenhum acesso concedido</p>
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.user}
              className="flex items-center justify-between p-3 rounded-xl border bg-card"
            >
              <div className="flex items-center gap-3">
                <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <UserIcon className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium leading-none">
                    {user.user_fullname}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {user.user}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => handleDeleteAccess(user.user, user.user_fullname)}
              >
                <Trash2Icon className="size-3.5" />
              </Button>
            </div>
          ))
        )}
      </div>

      <McpGrantAccessDialog
        server={server}
        open={isGrantDialogOpen}
        onOpenChange={setIsGrantDialogOpen}
      />
    </div>
  )
}
