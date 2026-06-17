import { useEffect, useState } from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Skeleton } from "@/components/ui/skeleton"
import { AgentFormDialog } from "@/features/agents/components/agent-form-dialog"
import { AgentsTable } from "@/features/agents/components/agents-table"
import { useAgentsGetAll } from "@/features/agents/queries/use-agents-get-all"
import { useClientStore } from "@/features/clients/store/client-store"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { type AppError } from "@/shared/utils/normalize-error"

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

export function AgentsListPage() {
  const { selectedClientName } = useClientStore()

  const [search, setSearch] = useState("")
  const debouncedSearch = useDebouncedValue(search, 500)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  // Volta para a primeira página ao alterar busca, tenant ou tamanho da página.
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, selectedClientName, limit])

  const { data, isLoading, isError, error } = useAgentsGetAll({
    client: selectedClientName || undefined,
    search: debouncedSearch || undefined,
    limit,
    limitStart: (page - 1) * limit,
  })

  useEffect(() => {
    if (isError) {
      toast.error(
        (error as AppError)?.message ??
          "Não foi possível carregar os agentes. Tente novamente.",
      )
    }
  }, [isError, error])

  const agents = data?.agents ?? []
  const hasNextPage = !!data?.next_page

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-medium tracking-tight">
            Gestão de agentes
          </h1>
          <span className="text-sm text-muted-foreground">
            ·{" "}
            {isLoading ? (
              <Skeleton className="inline-block h-4 w-6 align-middle" />
            ) : (
              agents.length
            )}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar agentes..."
              className="h-8 w-56 pl-8"
            />
          </div>
          <Button size="sm" onClick={() => setIsCreateOpen(true)}>
            <PlusIcon />
            Novo agente
          </Button>
        </div>
      </header>

      <AgentsTable agents={agents} isLoading={isLoading} />

      <footer className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Itens por página
          </span>
          <NativeSelect
            size="sm"
            className="w-20"
            value={String(limit)}
            onChange={(event) => setLimit(Number(event.target.value))}
            aria-label="Itens por página"
          >
            {PAGE_SIZE_OPTIONS.map((option) => (
              <NativeSelectOption key={option} value={String(option)}>
                {option}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Página {page}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1 || isLoading}
          >
            <ChevronLeftIcon />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((current) => current + 1)}
            disabled={!hasNextPage || isLoading}
          >
            Próxima
            <ChevronRightIcon />
          </Button>
        </div>
      </footer>

      <AgentFormDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </section>
  )
}
