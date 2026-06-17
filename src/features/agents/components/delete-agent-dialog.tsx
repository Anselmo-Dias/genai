import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Spinner } from "@/components/ui/spinner"
import { type AppError } from "@/shared/utils/normalize-error"

import { useAgentsDelete } from "../queries/use-delete-agent"
import { type Agent } from "../types/agent.type"

type DeleteAgentDialogProps = {
  agent: Agent | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteAgentDialog({
  agent,
  open,
  onOpenChange,
}: DeleteAgentDialogProps) {
  const { mutate, isPending } = useAgentsDelete()

  function handleConfirm() {
    if (!agent) return

    mutate({ name: agent.name }, {
      onSuccess: () => {
        onOpenChange(false)
        toast.success(`Agente "${agent.title}" excluído com sucesso.`)
      },
      onError: (error) => {
        toast.error(
          (error as AppError).message ?? "Erro ao excluir agente.",
        )
      },
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir agente</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o agente{" "}
            <strong className="text-foreground">{agent?.title}</strong>? Essa
            ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault()
              handleConfirm()
            }}
            disabled={isPending}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {isPending ? (
              <>
                <Spinner /> Excluindo...
              </>
            ) : (
              "Excluir"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
