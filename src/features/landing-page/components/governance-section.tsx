import type { LucideIcon } from "lucide-react"
import { motion } from "motion/react"
import { Users, ShieldCheck, Lock, FileText, Monitor } from "lucide-react"

import { cn } from "@/lib/utils"
import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

const fadeSlideIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

type LogEntry = {
  time: string
  tag: string
  tagColor: string
  textColor: string
  message: string
  delay: string
}

const LOG_ENTRIES: LogEntry[] = [
  {
    time: "09:41:02",
    tag: "[ALLOW]",
    tagColor: "text-green-600 dark:text-green-400",
    textColor: "text-neutral-700 dark:text-zinc-300",
    message: "user:ana.silva → agent:atendimento-l1",
    delay: "0.1s",
  },
  {
    time: "09:41:07",
    tag: "[DENY]",
    tagColor: "text-red-600 dark:text-red-400",
    textColor: "text-neutral-500 dark:text-zinc-500",
    message: "user:ext_user → agent:financeiro",
    delay: "0.6s",
  },
  {
    time: "09:41:15",
    tag: "[ALLOW]",
    tagColor: "text-green-600 dark:text-green-400",
    textColor: "text-neutral-700 dark:text-zinc-300",
    message: "user:dev.team → key:sk-az-9c1e",
    delay: "1.1s",
  },
  {
    time: "09:41:22",
    tag: "[AUDIT]",
    tagColor: "text-orange-600 dark:text-orange-400",
    textColor: "text-neutral-600 dark:text-zinc-400",
    message: "config:agent-v2.1 → tenant:acme",
    delay: "1.6s",
  },
  {
    time: "09:41:30",
    tag: "[ALLOW]",
    tagColor: "text-green-600 dark:text-green-400",
    textColor: "text-neutral-700 dark:text-zinc-300",
    message: "user:admin → scope:full-access",
    delay: "2.1s",
  },
]

type MatrixRow = {
  role: string
  cells: { label: string; cls: string }[]
}

const GRANTED = "bg-green-500/20 text-green-600 dark:text-green-400"
const GRANTED_BLUE = "bg-blue-400/20 text-blue-600 dark:text-blue-400"
const DENIED = "bg-black/5 text-black/20 dark:bg-white/5 dark:text-white/20"
const READ_ONLY = "bg-black/5 text-black/40 dark:bg-white/5 dark:text-white/30"

const MATRIX: MatrixRow[] = [
  {
    role: "admin",
    cells: [
      { label: "R/W", cls: GRANTED },
      { label: "EXE", cls: GRANTED },
      { label: "DEL", cls: GRANTED },
    ],
  },
  {
    role: "dev",
    cells: [
      { label: "R/W", cls: GRANTED_BLUE },
      { label: "EXE", cls: GRANTED_BLUE },
      { label: "—", cls: DENIED },
    ],
  },
  {
    role: "user",
    cells: [
      { label: "R", cls: READ_ONLY },
      { label: "—", cls: DENIED },
      { label: "—", cls: DENIED },
    ],
  },
]

type SecurityFeature = {
  icon: LucideIcon
  title: string
  description: string
}

const FEATURES: SecurityFeature[] = [
  {
    icon: Users,
    title: "Autenticação e segregação de acesso",
    description:
      "Identidade integrada com controles por tenant, grupo e perfil de usuário. Nenhum acesso sem autenticação e autorização explícita.",
  },
  {
    icon: ShieldCheck,
    title: "Permissionamento granular por agente",
    description:
      "Defina quem pode criar, editar, usar ou visualizar cada agente. Controle total sobre o escopo de cada ator na plataforma.",
  },
  {
    icon: Lock,
    title: "Gestão de chaves e segredos",
    description:
      "Credenciais de API armazenadas de forma criptografada e isolada por cliente. Nenhuma chave exposta em código ou logs.",
  },
  {
    icon: FileText,
    title: "Auditabilidade e rastreabilidade",
    description:
      "Cada interação, configuração e acesso é registrado com timestamp, usuário e contexto — pronto para auditoria interna ou regulatória.",
  },
  {
    icon: Monitor,
    title: "Seus dados ficam seus",
    description:
      "Arquitetura multi-tenant com segregação completa de dados, agentes e configurações entre diferentes clientes e ambientes.",
  },
]

/** Card de audit log + matriz de acesso (estética de terminal, escuro nos dois temas). */
function AuditCard() {
  return (
    <motion.div
      variants={fadeSlideIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
      className="group relative overflow-hidden border border-black/10 bg-neutral-50 p-8 transition-all duration-300 hover:border-black/20 dark:border-zinc-800 dark:bg-black dark:hover:border-white/20 lg:col-span-2"
    >
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-orange-500 dark:text-orange-400">
            Audit log
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-green-600 dark:text-green-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            live
          </span>
        </div>

        <div className="space-y-2.5 font-mono text-[11px]">
          {LOG_ENTRIES.map((entry) => (
            <div
              key={entry.time}
              className="animate-agent-item flex items-start gap-2"
              style={{ animationDelay: entry.delay }}
            >
              <span className="shrink-0 text-neutral-400 dark:text-zinc-600">
                {entry.time}
              </span>
              <span className={cn("shrink-0 font-medium", entry.tagColor)}>
                {entry.tag}
              </span>
              <span className={entry.textColor}>{entry.message}</span>
            </div>
          ))}
        </div>

        {/* Matriz de acesso */}
        <div className="mt-8 border-t border-black/10 pt-6 dark:border-white/5">
          <div className="mb-3 font-mono text-[9px] uppercase tracking-widest text-neutral-400 dark:text-zinc-600">
            Matriz de acesso
          </div>
          <div className="space-y-2">
            {MATRIX.map((row) => (
              <div key={row.role} className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-neutral-500 dark:text-zinc-500">
                  {row.role}
                </span>
                <div className="flex gap-1">
                  {row.cells.map((cell, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex h-4 w-8 items-center justify-center rounded text-[8px]",
                        cell.cls,
                      )}
                    >
                      {cell.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function FeatureRow({
  feature,
  isLast,
}: {
  feature: SecurityFeature
  isLast: boolean
}) {
  const Icon = feature.icon
  return (
    <div
      className={cn(
        "group relative cursor-default transition-colors duration-300 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]",
        !isLast && "border-b border-black/10 dark:border-white/5",
      )}
    >
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-orange-500/0 via-orange-500/40 to-orange-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="grid grid-cols-12 items-start gap-6 px-4 py-8">
        <div className="col-span-2 pt-0.5 sm:col-span-1">
          <div className="w-fit rounded-md border border-black/10 bg-neutral-100 p-2 text-neutral-500 transition-all duration-300 group-hover:border-neutral-300 group-hover:text-neutral-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:group-hover:border-zinc-700 dark:group-hover:text-white">
            <Icon size={16} strokeWidth={1.5} />
          </div>
        </div>
        <div className="col-span-10 sm:col-span-11">
          <h3 className="mb-2 text-base font-semibold tracking-tight text-neutral-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-100">
            {feature.title}
          </h3>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-zinc-400">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function GovernanceSection() {
  return (
    <SectionContainer
      id="seguranca"
      className="mt-32 mb-0 border-t border-black/10 pt-24 dark:border-white/5"
    >
      {/* Header */}
      <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div className="flex flex-col gap-4">
          <motion.div
            variants={fadeSlideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
            className="flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            <span className="text-xs font-medium uppercase tracking-widest text-neutral-500">
              Segurança corporativa
            </span>
          </motion.div>
          <motion.h2
            variants={fadeSlideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
            className="text-5xl font-medium tracking-tighter text-neutral-900 dark:text-white font-manrope md:text-6xl"
          >
            Governança e segurança
            <br />
            <span className="text-neutral-400 dark:text-neutral-600">
              para ambientes exigentes
            </span>
          </motion.h2>
        </div>
        <motion.p
          variants={fadeSlideIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE_OUT }}
          className="mb-1 max-w-sm text-lg leading-relaxed text-neutral-600 dark:text-neutral-400"
        >
          Cada camada da plataforma foi construída com isolamento,
          rastreabilidade e controle de acesso como pilares fundamentais — não
          como adicionais.
        </motion.p>
      </div>

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5">
        <AuditCard />

        <motion.div
          variants={fadeSlideIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE_OUT }}
          className="flex flex-col border-t border-black/10 dark:border-white/5 lg:col-span-3"
        >
          {FEATURES.map((feature, index) => (
            <FeatureRow
              key={feature.title}
              feature={feature}
              isLast={index === FEATURES.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  )
}
