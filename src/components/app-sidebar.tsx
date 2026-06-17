import { Link, useLocation, type LinkProps } from "@tanstack/react-router"
import {
  Building2Icon,
  ChevronsUpDownIcon,
  ClipboardListIcon,
  ClockIcon,
  KeyRoundIcon,
  Link2Icon,
  LineChartIcon,
  LogOutIcon,
  type LucideIcon,
  MessageSquareIcon,
  ServerIcon,
  Settings as SettingsIcon,
  UserIcon,
  UsersIcon,
  WalletIcon,
  HouseIcon,
} from "lucide-react"

import { useAuth } from "@/auth/auth-context"
import { ADMIN_ROLES } from "@/auth/roles"
import { TenantSwitcher } from "@/features/clients/components/tenant-switcher"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

type NavItem = {
  title: string
  icon: LucideIcon
  /** Rota já registrada no router → item clicável. */
  to?: LinkProps["to"]
  /** Rota de destino ainda não criada → item exibido como placeholder. */
  path?: string
}

type NavGroup = {
  label: string
  /** Visível apenas para roles administrativas (mirror de *ngxPermissionsOnly). */
  adminOnly?: boolean
  items: NavItem[]
}

// Espelha os agrupamentos/links da sidebar do mobileXGenAI_Portal (Angular).
// Conforme as rotas forem criadas em router/routes, mover `path` -> `to`.
const navGroups: NavGroup[] = [
  {
    label: "Comece agora",
    items: [{ title: "Visão geral", icon: HouseIcon, to: "/home" }],
  },
  {
    label: "Agentes",
    adminOnly: true,
    items: [
      {
        title: "Gestão de agentes",
        icon: MessageSquareIcon,
        to: "/private/agents/list",
      },
    ],
  },
  {
    label: "Integrações",
    adminOnly: true,
    items: [
      { title: "Servidores MCP", icon: ServerIcon, to: "/private/mcp" },
      {
        title: "Chaves de Conexão",
        icon: Link2Icon,
        path: "/private/connection-keys",
      },
      {
        title: "Gestão de segredos",
        icon: KeyRoundIcon,
        path: "/private/ai-vault",
      },
    ],
  },
  {
    label: "Usuários",
    adminOnly: true,
    items: [
      { title: "Gestão de usuários", icon: UserIcon, path: "/private/users" },
      {
        title: "Grupos de usuários",
        icon: UsersIcon,
        path: "/private/user-groups",
      },
      { title: "Organização", icon: Building2Icon, path: "/private/clients" },
    ],
  },
  {
    label: "Monitoramento",
    adminOnly: true,
    items: [
      {
        title: "Relatório de uso",
        icon: LineChartIcon,
        path: "/private/observability",
      },
      {
        title: "Log de conversas",
        icon: ClipboardListIcon,
        path: "/private/conversation-log",
      },
      {
        title: "Políticas de consumo",
        icon: WalletIcon,
        path: "/private/budget-policies",
      },
      {
        title: "Tarefas agendadas",
        icon: ClockIcon,
        path: "/private/scheduled-tasks",
      },
    ],
  },
]

function getInitials(name?: string, fallback = "GP") {
  if (!name) return fallback
  const parts = name.trim().split(/\s+/)
  const initials = (parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")
  return initials.toUpperCase() || fallback
}

interface AppSidebarProps {
  onSettingsClick?: () => void
}

export function AppSidebar({ onSettingsClick }: AppSidebarProps) {
  const { pathname } = useLocation()
  const { profile, hasRole, logout } = useAuth()

  const visibleGroups = navGroups.filter(
    (group) => !group.adminOnly || hasRole(...ADMIN_ROLES),
  )

  const fullName =
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
    profile?.username

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TenantSwitcher />
      </SidebarHeader>

      <SidebarContent>
        {visibleGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.to ? (
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={pathname === item.to}
                      >
                        <Link to={item.to}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton tooltip={item.title} disabled>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" tooltip="Minha conta">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground">
                    <span className="text-xs font-medium">
                      {getInitials(fullName)}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5 text-left leading-none">
                    <span className="truncate font-medium">
                      {fullName ?? "Minha conta"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {profile?.email ?? "Gerenciar perfil"}
                    </span>
                  </div>
                  <ChevronsUpDownIcon className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="end"
                className="min-w-56"
              >
                <DropdownMenuLabel className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate font-medium">
                    {fullName ?? "Minha conta"}
                  </span>
                  {profile?.email ? (
                    <span className="truncate text-xs font-normal text-muted-foreground">
                      {profile.email}
                    </span>
                  ) : null}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSettingsClick}>
                  <SettingsIcon className="mr-2 size-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={() => logout()}>
                  <LogOutIcon />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
