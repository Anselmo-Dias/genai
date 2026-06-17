import { useEffect, useState } from "react"
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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { useClientStore } from "@/features/clients/store/client-store"

import { useMcpCreate } from "../queries/use-mcp-create"
import { useMcpUpdate } from "../queries/use-mcp-update"
import { type CreateMcpServerPayload, type McpHeader, type McpServer } from "../types/mcp.type"

type McpServerFormDialogProps = {
  server?: McpServer
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function McpServerFormDialog({
  server,
  open,
  onOpenChange,
}: McpServerFormDialogProps) {
  const isEdit = !!server
  const { selectedClientName } = useClientStore()
  const createMutation = useMcpCreate()
  const updateMutation = useMcpUpdate()
  const isPending = createMutation.isPending || updateMutation.isPending

  const [serverName, setServerName] = useState("")
  const [label, setLabel] = useState("")
  const [description, setDescription] = useState("")
  const [baseUrl, setBaseUrl] = useState("")
  const [transport, setTransport] = useState("https")
  const [healthcheckPath, setHealthcheckPath] = useState("/health")
  const [timeoutMs, setTimeoutMs] = useState(30000)
  const [status, setStatus] = useState(true)
  const [headers, setHeaders] = useState<McpHeader[]>([])

  useEffect(() => {
    if (!open) return
    if (server) {
      setServerName(server.server_name)
      setLabel(server.label)
      setDescription(server.description)
      setBaseUrl(server.base_url)
      setTransport(server.transport)
      setHealthcheckPath(server.healthcheck_path || "/health")
      setTimeoutMs(server.timeout_ms)
      setStatus(server.status === "active")
      setHeaders(server.headers || [])
    } else {
      setServerName("")
      setLabel("")
      setDescription("")
      setBaseUrl("")
      setTransport("https")
      setHealthcheckPath("/health")
      setTimeoutMs(30000)
      setStatus(true)
      setHeaders([])
    }
  }, [open, server])

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
    const payload: CreateMcpServerPayload = {
      server_name: serverName,
      label,
      description,
      base_url: baseUrl,
      transport,
      healthcheck_path: healthcheckPath,
      timeout_ms: timeoutMs,
      status: status ? "active" : "inactive",
      headers,
      client: selectedClientName || undefined,
    }

    const onSuccess = () => {
      onOpenChange(false)
      toast.success(isEdit ? "Servidor atualizado" : "Servidor criado")
    }

    const onError = () => {
      toast.error(isEdit ? "Erro ao atualizar" : "Erro ao criar")
    }

    if (isEdit && server) {
      updateMutation.mutate({ id: server.name, payload }, { onSuccess, onError })
    } else {
      createMutation.mutate(payload, { onSuccess, onError })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl flex flex-col p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>{isEdit ? "Editar Servidor" : "Novo Servidor"}</DialogTitle>
          <DialogDescription>
            Configure as informações de conexão do servidor MCP.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="server_name">Nome *</Label>
              <Input
                id="server_name"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder="Ex: main-mcp"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="label">Rótulo *</Label>
              <Input
                id="label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Ex: Servidor Principal"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Para que serve este servidor?"
                rows={2}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="base_url">URL Base *</Label>
              <Input
                id="base_url"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://mcp.exemplo.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="transport">Transporte</Label>
              <Input
                id="transport"
                value={transport}
                onChange={(e) => setTransport(e.target.value)}
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="healthcheck">Caminho Healthcheck</Label>
              <Input
                id="healthcheck"
                value={healthcheckPath}
                onChange={(e) => setHealthcheckPath(e.target.value)}
                placeholder="/health"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="timeout">Timeout (ms)</Label>
              <Input
                id="timeout"
                type="number"
                value={timeoutMs}
                onChange={(e) => setTimeoutMs(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center gap-2 pt-8">
              <Switch
                id="status"
                checked={status}
                onCheckedChange={setStatus}
              />
              <Label htmlFor="status">Servidor ativo?</Label>
            </div>

            <div className="col-span-2 mt-4">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-base font-semibold">Headers Padrão</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddHeader} className="gap-2">
                  <PlusIcon className="size-3.5" />
                  Adicionar
                </Button>
              </div>
              <div className="flex flex-col gap-3 p-4 rounded-xl border bg-muted/30">
                {headers.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhum header configurado.
                  </p>
                ) : (
                  headers.map((header, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Nome"
                          value={header.header_name}
                          onChange={(e) => handleHeaderChange(index, "header_name", e.target.value)}
                        />
                        <Input
                          placeholder="Valor"
                          value={header.default_value || ""}
                          onChange={(e) => handleHeaderChange(index, "default_value", e.target.value)}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive shrink-0"
                        onClick={() => handleRemoveHeader(index)}
                      >
                        <Trash2Icon className="size-4" />
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
            disabled={!serverName || !label || !baseUrl || isPending}
          >
            {isPending && <Spinner className="mr-2" />}
            {isEdit ? "Salvar Alterações" : "Criar Servidor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
