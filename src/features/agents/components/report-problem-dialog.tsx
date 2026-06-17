import { useState } from "react"
import { FlagIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { type AppError } from "@/shared/utils/normalize-error"

import { useAgentsReportProblem } from "../queries/use-report-problem"
import { type Agent } from "../types/agent.type"

type ReportProblemDialogProps = {
  agent: Agent
  /** Modo controlado (ex.: aberto a partir de um menu). */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Exibe o botão-gatilho (ícone de bandeira). Default: true. */
  showTrigger?: boolean
}

export function ReportProblemDialog({
  agent,
  open: openProp,
  onOpenChange,
  showTrigger = true,
}: ReportProblemDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [description, setDescription] = useState("")
  const { mutate, isPending } = useAgentsReportProblem()

  const open = openProp ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen

  function handleSubmit() {
    const message = description.trim()
    if (!message) return

    mutate(
      { agentId: agent.name, message },
      {
        onSuccess: () => {
          setOpen(false)
          setDescription("")
          toast.success("Problema reportado com sucesso.")
        },
        onError: (error) => {
          toast.error(
            (error as AppError).message ??
              "Não foi possível enviar o reporte. Tente novamente.",
          )
        },
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {showTrigger ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Reportar problema"
              >
                <FlagIcon />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Reportar problema</TooltipContent>
        </Tooltip>
      ) : null}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reportar problema</DialogTitle>
          <DialogDescription>
            Descreva o problema encontrado no agente{" "}
            <strong className="text-foreground">{agent.title}</strong>.
          </DialogDescription>
        </DialogHeader>

        <Textarea
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Ex: O agente não responde corretamente quando pergunto sobre..."
        />

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!description.trim() || isPending}
          >
            {isPending ? (
              <>
                <Spinner /> Enviando...
              </>
            ) : (
              "Enviar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
