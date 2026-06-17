import { useState } from "react"
import {
  FlagIcon,
  MoreVerticalIcon,
  PencilIcon,
  Trash2Icon,
  WrenchIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { type AppError } from "@/shared/utils/normalize-error"

import { useAgentsUpdate } from "../queries/use-update-agent"
import { type Agent } from "../types/agent.type"
import { AgentFormDialog } from "./agent-form-dialog"
import { DeleteAgentDialog } from "./delete-agent-dialog"
import { ReportProblemDialog } from "./report-problem-dialog"

const SKELETON_ROWS = 5

function getInitials(title: string) {
  const parts = title.trim().split(/\s+/)
  const initials = (parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")
  return initials.toUpperCase() || "IA"
}

type AgentsTableProps = {
  agents: Agent[]
  isLoading: boolean
}

export function AgentsTable({ agents, isLoading }: AgentsTableProps) {
  const updateAgent = useAgentsUpdate()
  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null)
  const [agentToReport, setAgentToReport] = useState<Agent | null>(null)
  const [agentToEdit, setAgentToEdit] = useState<Agent | null>(null)

  function handleToggleEnabled(agent: Agent) {
    const nextEnabled = agent.enabled === 1 ? 0 : 1
    updateAgent.mutate(
      { name: agent.name, payload: { enabled: nextEnabled } },
      {
        onSuccess: () => {
          toast.success(
            nextEnabled === 1
              ? "Agente ativado com sucesso."
              : "Agente desativado com sucesso.",
          )
        },
        onError: (error) => {
          toast.error(
            (error as AppError).message ??
              "Não foi possível alterar o status do agente.",
          )
        },
      },
    )
  }

  return (
    <>
      <div className="rounded-xl ring-1 ring-foreground/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead className="text-center">Documentos</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: SKELETON_ROWS }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-8 rounded-full" />
                      <div className="flex flex-col gap-1.5">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-40" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="mx-auto h-4 w-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-9 rounded-full" />
                  </TableCell>
                  <TableCell />
                </TableRow>
              ))
            ) : agents.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum item encontrado
                </TableCell>
              </TableRow>
            ) : (
              agents.map((agent) => (
                <TableRow key={agent.name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        {agent.icon ? (
                          <AvatarImage src={agent.icon} alt={agent.title} />
                        ) : null}
                        <AvatarFallback className="text-xs">
                          {getInitials(agent.title)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate font-medium">
                          {agent.title}
                        </span>
                        <span className="max-w-xs truncate text-xs text-muted-foreground">
                          {agent.description}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{agent.type}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      {agent.model_friendly_name}
                      {agent.hasTools ? (
                        <WrenchIcon className="size-3.5" />
                      ) : null}
                    </span>
                  </TableCell>
                  <TableCell className="text-center tabular-nums">
                    {agent.documents?.length ?? 0}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={agent.enabled === 1}
                      onCheckedChange={() => handleToggleEnabled(agent)}
                      aria-label={
                        agent.enabled === 1
                          ? "Desativar agente"
                          : "Ativar agente"
                      }
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Ações do agente"
                        >
                          <MoreVerticalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          className="whitespace-nowrap"
                          onClick={() => setAgentToEdit(agent)}
                        >
                          <PencilIcon />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="whitespace-nowrap"
                          onClick={() => setAgentToReport(agent)}
                        >
                          <FlagIcon />
                          Reportar problema
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          className="whitespace-nowrap"
                          onClick={() => setAgentToDelete(agent)}
                        >
                          <Trash2Icon />
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

      <DeleteAgentDialog
        agent={agentToDelete}
        open={agentToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setAgentToDelete(null)
        }}
      />

      {agentToReport ? (
        <ReportProblemDialog
          agent={agentToReport}
          open
          showTrigger={false}
          onOpenChange={(open) => {
            if (!open) setAgentToReport(null)
          }}
        />
      ) : null}

      {agentToEdit ? (
        <AgentFormDialog
          agent={agentToEdit}
          open
          onOpenChange={(open) => {
            if (!open) setAgentToEdit(null)
          }}
        />
      ) : null}
    </>
  )
}
