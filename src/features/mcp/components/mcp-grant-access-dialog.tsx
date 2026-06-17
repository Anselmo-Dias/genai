import { useState } from "react"
import { PlusIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Switch } from "@/components/ui/switch"
import { Spinner } from "@/components/ui/spinner"
import { useClientStore } from "@/features/clients/store/client-store"
import { useUsersGetAll } from "@/features/users/queries/use-users-get-all"

import { useMcpGrantAccess } from "../queries/use-mcp-grant-access"
import { type GrantAccessPayload, type McpHeader, type McpServer } from "../types/mcp.type"

type McpGrantAccessDialogProps = {
  server: McpServer
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function McpGrantAccessDialog({
  server,
  open,
  onOpenChange,
}: McpGrantAccessDialogProps) {
  const { selectedClientName } = useClientStore()
  const grantMutation = useMcpGrantAccess()
  const { data: allUsers = [], isLoading: isLoadingUsers } = useUsersGetAll({
    clientId: selectedClientName || undefined,
  })

  const [userId, setUserId] = useState("")
  const [authType, setAuthType] = useState("jwt")
  const [enabled, setEnabled] = useState(true)
  const [headers, setHeaders] = useState<McpHeader[]>([])

  const handleAddHeader = () => {
    setHeaders([...headers, { header_name: "", default_value: "", enabled: true }])
  }

  const handleRemoveHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index))
  }

  const handleHeaderChange = (index: number, field: keyof McpHeader, value: string | boolean) => {
    const newHeaders = [...headers]
    newHeaders[index] = { ...newHeaders[index], [field]: value }
    setHeaders(newHeaders)
  }

  const handleSubmit = () => {
    const payload: GrantAccessPayload = {
      server: server.name,
      user: userId,
      auth_type: authType,
      enabled,
      headers,
      client: selectedClientName || undefined,
    }

    grantMutation.mutate(payload, {
      onSuccess: () => {
        onOpenChange(false)
        setUserId("")
        setHeaders([])
        toast.success("Acesso concedido com sucesso")
      },
      onError: () => {
        toast.error("Erro ao conceder acesso")
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg flex flex-col p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Conceder Acesso</DialogTitle>
          <DialogDescription>
            Libere o acesso ao servidor{" "}
            <strong className="text-foreground">{server.server_name}</strong> para um usuário.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="user">Usuário *</Label>
              <NativeSelect
                id="user"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                disabled={isLoadingUsers}
              >
                <NativeSelectOption value="">
                  {isLoadingUsers ? "Carregando usuários..." : "Selecione um usuário"}
                </NativeSelectOption>
                {allUsers.map((user) => (
                  <NativeSelectOption key={user.name} value={user.name}>
                    {user.full_name || user.username}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="auth_type">Tipo de Autenticação</Label>
              <NativeSelect
                id="auth_type"
                className="w-full"
                value={authType}
                onChange={(e) => setAuthType(e.target.value)}
              >

                <NativeSelectOption value="jwt">JWT</NativeSelectOption>
                <NativeSelectOption value="api_key">API Key</NativeSelectOption>
              </NativeSelect>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="enabled"
                checked={enabled}
                onCheckedChange={setEnabled}
              />
              <Label htmlFor="enabled">Acesso ativo?</Label>
            </div>

            <div className="mt-2">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-semibold">Headers Customizados</Label>
                <Button type="button" variant="outline" size="xs" onClick={handleAddHeader} className="h-7 gap-1 px-2">
                  <PlusIcon className="size-3" />
                  Add
                </Button>
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg border bg-muted/30">
                {headers.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-2">
                    Nenhum header customizado.
                  </p>
                ) : (
                  headers.map((header, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <Input
                          className="h-8 text-xs"
                          placeholder="Nome"
                          value={header.header_name}
                          onChange={(e) => handleHeaderChange(index, "header_name", e.target.value)}
                        />
                        <Input
                          className="h-8 text-xs"
                          placeholder="Valor"
                          value={header.default_value || ""}
                          onChange={(e) => handleHeaderChange(index, "default_value", e.target.value)}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="text-destructive shrink-0 size-8"
                        onClick={() => handleRemoveHeader(index)}
                      >
                        <Trash2Icon className="size-3.5" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!userId || grantMutation.isPending}
          >
            {grantMutation.isPending && <Spinner className="mr-2" />}
            Conceder Acesso
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
