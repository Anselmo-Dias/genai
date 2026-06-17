import { useEffect } from "react"
import { Link } from "@tanstack/react-router"
import { CheckIcon, ChevronsUpDownIcon, SparklesIcon } from "lucide-react"

import { useAuth } from "@/auth/auth-context"
import { RoleEnum } from "@/auth/roles"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useUsersGetMe } from "@/features/users/queries/use-me"

import { useClientsGetAll } from "../queries/use-clients-get-all"
import { useClientStore } from "../store/client-store"

const SELF_ORG_LABEL = "Minha organização"

function BrandIcon() {
  return (
    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
      <SparklesIcon className="size-4" />
    </div>
  )
}

export function TenantSwitcher() {
  const { hasRole } = useAuth()
  const isSuperAdmin = hasRole(RoleEnum.superAdmin)
  const { isMobile } = useSidebar()

  const { data: clients = [] } = useClientsGetAll({ enabled: isSuperAdmin })
  const { data: me } = useUsersGetMe()
  const { selectedClientName, setSelectedClient } = useClientStore()

  // Define o tenant padrão a partir do /userinfo/me (mirror do layout-private).
  useEffect(() => {
    if (me?.client && !selectedClientName) {
      setSelectedClient(me.client)
    }
  }, [me, selectedClientName, setSelectedClient])

  // Regra de permissão por role: apenas SuperAdmin troca de tenant.
  // Demais usuários veem a marca estática.
  if (!isSuperAdmin) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <Link to="/home">
              <BrandIcon />
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">GenAI Portal</span>
                <span className="text-xs text-muted-foreground">
                  Painel de IA
                </span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  const activeLabel =
    clients.find((client) => client.name === selectedClientName)?.client_name ??
    SELF_ORG_LABEL

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" tooltip={activeLabel}>
              <BrandIcon />
              <div className="flex min-w-0 flex-col gap-0.5 leading-none">
                <span className="truncate font-semibold">{activeLabel}</span>
                <span className="truncate text-xs text-muted-foreground">
                  GenAI Portal
                </span>
              </div>
              <ChevronsUpDownIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={isMobile ? "bottom" : "right"}
            align="start"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organizações
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setSelectedClient("")}>
              {SELF_ORG_LABEL}
              {selectedClientName === "" ? (
                <CheckIcon className="ml-auto" />
              ) : null}
            </DropdownMenuItem>
            {clients.length > 0 ? <DropdownMenuSeparator /> : null}
            {clients.map((client) => (
              <DropdownMenuItem
                key={client.name}
                onClick={() => setSelectedClient(client.name)}
              >
                <span className="truncate">{client.client_name}</span>
                {selectedClientName === client.name ? (
                  <CheckIcon className="ml-auto" />
                ) : null}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
