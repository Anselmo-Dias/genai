import { useEffect, useState } from "react"
import { MessagesSquareIcon, SearchIcon } from "lucide-react"
import { toast } from "sonner"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Skeleton } from "@/components/ui/skeleton"
import { AgentCard } from "@/features/agents/components/agent-card"
import { AgentCardSkeleton } from "@/features/agents/components/agent-card-skeleton"
import { useAgentsGetAll } from "@/features/agents/queries/use-agents-get-all"
import { useClientStore } from "@/features/clients/store/client-store"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { type AppError } from "@/shared/utils/normalize-error"

const ALL_TYPES = "all"

export function HomePage() {
  // Tenant selecionado é enviado no GET de agentes (mirror do agents-list).
  // Ao trocar de tenant, a queryKey muda e o React Query refaz a busca.
  const { selectedClientName } = useClientStore()

  const [search, setSearch] = useState("")
  const debouncedSearch = useDebouncedValue(search, 500)
  const [typeFilter, setTypeFilter] = useState<string>(ALL_TYPES)

  // Busca é server-side (param `search`, igual ao agents-list); muda a queryKey e refaz a busca.
  const { data, isLoading, isError, error } = useAgentsGetAll({
    client: selectedClientName || undefined,
    search: debouncedSearch || undefined,
  })

  useEffect(() => {
    if (isError) {
      toast.error(
        (error as AppError)?.message ??
          "Não foi possível carregar seus agentes. Aguarde alguns instantes e tente novamente.",
      )
    }
  }, [isError, error])

  const agents = data?.agents ?? []
  const types = Array.from(
    new Set(agents.map((agent) => agent.type).filter(Boolean)),
  )

  // Filtro por tipo é client-side sobre os resultados da página atual.
  const filteredAgents =
    typeFilter === ALL_TYPES
      ? agents
      : agents.filter((agent) => agent.type === typeFilter)

  const isFiltering = debouncedSearch !== "" || typeFilter !== ALL_TYPES

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <MessagesSquareIcon className="size-5 text-primary" />
          <h1 className="text-lg font-medium tracking-tight">
            Seus agentes de IA
          </h1>
          <span className="text-sm text-muted-foreground">
            ·{" "}
            {isLoading ? (
              <Skeleton className="inline-block h-4 w-6 align-middle" />
            ) : (
              filteredAgents.length
            )}
          </span>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar agentes..."
              className="h-8 w-56 pl-8"
            />
          </div>
          <NativeSelect
            size="sm"
            className="w-44"
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            aria-label="Filtrar por tipo"
          >
            <NativeSelectOption value={ALL_TYPES}>
              Todos os tipos
            </NativeSelectOption>
            {types.map((type) => (
              <NativeSelectOption key={type} value={type}>
                {type}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      </header>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <AgentCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredAgents.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessagesSquareIcon />
            </EmptyMedia>
            <EmptyTitle>
              {isFiltering
                ? "Nenhum agente encontrado"
                : "Nenhum agente disponível"}
            </EmptyTitle>
            <EmptyDescription>
              {isFiltering
                ? "Nenhum agente corresponde à sua busca ou filtro."
                : "Você ainda não tem agentes de IA disponíveis."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.name} agent={agent} />
          ))}
        </div>
      )}
    </section>
  )
}
