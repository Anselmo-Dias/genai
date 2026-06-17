import { WrenchIcon } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { useMcpGetTools } from "../queries/use-mcp-get-tools"

type McpToolsListProps = {
  serverName: string
}

export function McpToolsList({ serverName }: McpToolsListProps) {
  const { data, isLoading } = useMcpGetTools({ name: serverName })

  const tools = data?.tools ?? []

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    )
  }

  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <WrenchIcon className="size-12 mb-4 opacity-20" />
        <p>Nenhuma ferramenta disponível</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {tools.map((tool) => (
        <div key={tool.name} className="p-4 rounded-xl border bg-muted/30">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <WrenchIcon className="size-3.5" />
            {tool.name}
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            {tool.description}
          </p>
          {Object.keys(tool.input_schema.properties).length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.keys(tool.input_schema.properties).map((prop) => (
                <div
                  key={prop}
                  className="px-2 py-1 rounded bg-background border text-[10px] font-medium"
                >
                  {prop}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
