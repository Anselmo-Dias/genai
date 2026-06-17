import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { type McpServer } from "../types/mcp.type"
import { McpServerDetails } from "./mcp-server-details"

type McpServerDetailsDialogProps = {
  server: McpServer | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function McpServerDetailsDialog({
  server,
  open,
  onOpenChange,
}: McpServerDetailsDialogProps) {
  if (!server) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl h-[85vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Detalhes do Servidor MCP</DialogTitle>
        </DialogHeader>
        <McpServerDetails server={server} onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
