import type { ReactNode } from "react"
import { motion } from "motion/react"
import { Maximize2, MessageSquare, Lock, ArrowRight } from "lucide-react"

import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

const fadeSlideIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

const MOCKUP_BOX =
  "h-36 rounded-xl bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 overflow-hidden p-4 mb-6"

type Capability = {
  number: string
  title: string
  description: string
  mockup: ReactNode
}

/* ---------- Mockups ---------- */

function MockMultiProvider() {
  return (
    <div className={`${MOCKUP_BOX} flex items-center justify-center gap-3`}>
      <div className="flex flex-col items-center gap-1.5">
        {["bg-blue-400/60", "bg-emerald-400/60", "bg-purple-400/60"].map((bar) => (
          <div
            key={bar}
            className="flex h-6 w-16 items-center justify-center rounded bg-black/10 dark:bg-white/10"
          >
            <div className={`h-1.5 w-10 rounded ${bar}`} />
          </div>
        ))}
      </div>
      <Maximize2 className="text-black/30 dark:text-white/30" size={20} strokeWidth={1.5} />
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-black/10 bg-black/10 p-2 dark:border-white/10 dark:bg-white/10">
        <MessageSquare className="text-blue-400" size={20} strokeWidth={1.5} />
      </div>
    </div>
  )
}

function MockRag() {
  return (
    <div className={`${MOCKUP_BOX} flex items-center justify-center`}>
      <div className="w-full space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-emerald-400/20">
            <div className="h-2 w-2 rounded-sm bg-emerald-400" />
          </div>
          <div className="h-2 flex-1 rounded bg-black/15 dark:bg-white/20" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-emerald-400/40">
            <div className="h-2 w-2 rounded-sm bg-emerald-400" />
          </div>
          <div className="h-2 flex-1 rounded bg-emerald-400/30" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-black/[0.04] dark:bg-white/5">
            <div className="h-2 w-2 rounded-sm bg-black/20 dark:bg-white/20" />
          </div>
          <div className="h-2 w-4/5 flex-1 rounded bg-black/10 dark:bg-white/10" />
        </div>
        <div className="mt-3 font-mono text-[10px] text-emerald-500/80 dark:text-emerald-400/70">
          ↗ 2 trechos recuperados
        </div>
      </div>
    </div>
  )
}

function MockHistory() {
  const rows = [
    { dot: "bg-black/30 dark:bg-white/30", bar: "bg-black/10 dark:bg-white/10 w-3/4", time: "09:14" },
    { dot: "bg-blue-400/60", bar: "bg-blue-400/20 w-5/6", time: "09:15" },
    { dot: "bg-black/30 dark:bg-white/30", bar: "bg-black/10 dark:bg-white/10 w-2/3", time: "09:17" },
    { dot: "bg-blue-400/60", bar: "bg-blue-400/20 w-4/5", time: "09:18" },
  ]
  return (
    <div className={`${MOCKUP_BOX} flex flex-col justify-center gap-2`}>
      {rows.map((row) => (
        <div key={row.time} className="flex items-center gap-2">
          <div className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${row.dot}`} />
          <div className={`h-1.5 rounded ${row.bar}`} />
          <span className="ml-auto font-mono text-[9px] text-black/30 dark:text-white/30">
            {row.time}
          </span>
        </div>
      ))}
    </div>
  )
}

function MockStreaming() {
  return (
    <div className={`${MOCKUP_BOX} flex items-center justify-center`}>
      <div className="w-full space-y-1.5">
        <div className="h-2 w-full rounded bg-black/15 dark:bg-white/20" />
        <div className="h-2 w-5/6 rounded bg-black/15 dark:bg-white/20" />
        <div className="h-2 w-4/5 rounded bg-black/15 dark:bg-white/20" />
        <div className="mt-2 flex items-center gap-1">
          <div className="h-4 w-1.5 animate-pulse rounded-sm bg-blue-400" />
          <div className="h-2 w-2/3 rounded bg-black/10 dark:bg-white/10" />
        </div>
      </div>
    </div>
  )
}

function MockPermissions() {
  const rows = [
    {
      role: "admin",
      badges: [
        { label: "R/W", cls: "bg-emerald-400/30 text-emerald-500 dark:text-emerald-400" },
        { label: "EXE", cls: "bg-emerald-400/30 text-emerald-500 dark:text-emerald-400" },
      ],
    },
    {
      role: "dev",
      badges: [
        { label: "R/W", cls: "bg-blue-400/30 text-blue-500 dark:text-blue-400" },
        { label: "—", cls: "bg-black/10 text-black/30 dark:bg-white/10 dark:text-white/30" },
      ],
    },
    {
      role: "user",
      badges: [
        { label: "R", cls: "bg-black/10 text-black/30 dark:bg-white/10 dark:text-white/30" },
        { label: "—", cls: "bg-black/10 text-black/30 dark:bg-white/10 dark:text-white/30" },
      ],
    },
  ]
  return (
    <div className={`${MOCKUP_BOX} flex items-center justify-center`}>
      <div className="w-full space-y-2">
        {rows.map((row) => (
          <div key={row.role} className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-black/50 dark:text-white/50">
              {row.role}
            </span>
            <div className="flex gap-1">
              {row.badges.map((badge, i) => (
                <div
                  key={i}
                  className={`flex h-4 w-8 items-center justify-center rounded text-[8px] ${badge.cls}`}
                >
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MockKeys() {
  const keys = ["sk-••••••••••••••••4f2a", "az-••••••••••••••••9c1e"]
  return (
    <div className={`${MOCKUP_BOX} flex items-center justify-center`}>
      <div className="w-full space-y-2">
        {keys.map((key) => (
          <div
            key={key}
            className="flex items-center gap-2 rounded-lg bg-black/[0.04] px-3 py-2 dark:bg-white/5"
          >
            <Lock className="text-black/40 dark:text-white/40" size={12} strokeWidth={2} />
            <div className="font-mono text-[10px] text-black/50 dark:text-white/50">
              {key}
            </div>
            <div className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </div>
        ))}
      </div>
    </div>
  )
}

function MockFunctionCalling() {
  return (
    <div className={`${MOCKUP_BOX} flex items-center justify-center`}>
      <div className="w-full rounded-lg bg-neutral-900/90 p-3 font-mono text-[10px]">
        <div className="text-purple-400/80">tool_call:</div>
        <div className="pl-2 text-white/60">
          get_customer(<span className="text-blue-400/80">id</span>:{" "}
          <span className="text-emerald-400/80">"c_291"</span>)
        </div>
        <div className="mt-1 text-white/30">
          → <span className="text-emerald-400/60">200 OK</span>
        </div>
        <div className="pl-2 text-white/40">{"{ name: \"Acme Corp\" }"}</div>
      </div>
    </div>
  )
}

function MockMcp() {
  return (
    <div className={`${MOCKUP_BOX} flex items-center justify-center gap-3`}>
      <div className="flex flex-col gap-2">
        {["CRM", "ERP", "DB"].map((label) => (
          <div
            key={label}
            className="flex h-6 w-14 items-center justify-center rounded bg-black/10 font-mono text-[9px] text-black/40 dark:bg-white/10 dark:text-white/40"
          >
            {label}
          </div>
        ))}
      </div>
      <ArrowRight className="text-black/20 dark:text-white/20" size={16} strokeWidth={1.5} />
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/10">
        <span className="font-mono text-[9px] font-bold text-blue-400">MCP</span>
      </div>
    </div>
  )
}

function MockObservability() {
  const bars = [
    { h: "30%", color: "bg-black/20 dark:bg-white/20", label: "lat", labelColor: "text-black/30 dark:text-white/30" },
    { h: "55%", color: "bg-blue-400/50", label: "tok", labelColor: "text-black/30 dark:text-white/30" },
    { h: "40%", color: "bg-black/20 dark:bg-white/20", label: "err", labelColor: "text-black/30 dark:text-white/30" },
    { h: "75%", color: "bg-blue-400/80", label: "$", labelColor: "text-blue-400" },
  ]
  return (
    <div className={`${MOCKUP_BOX} flex items-end justify-between gap-2`}>
      {bars.map((bar) => (
        <div key={bar.label} className="flex flex-col items-center gap-1">
          <div className={`w-6 rounded-t ${bar.color}`} style={{ height: bar.h }} />
          <span className={`font-mono text-[8px] ${bar.labelColor}`}>{bar.label}</span>
        </div>
      ))}
    </div>
  )
}

const CAPABILITIES: Capability[] = [
  {
    number: "01",
    title: "Multi-provedor de LLM",
    description:
      "OpenAI, Anthropic, Azure, Gemini e outros em uma única interface padronizada.",
    mockup: <MockMultiProvider />,
  },
  {
    number: "02",
    title: "RAG e Vector Stores",
    description:
      "Indexação, retrieval e gestão de bases de conhecimento corporativas.",
    mockup: <MockRag />,
  },
  {
    number: "03",
    title: "Histórico e threads",
    description:
      "Contexto persistente por sessão com rastreabilidade completa de cada conversa.",
    mockup: <MockHistory />,
  },
  {
    number: "04",
    title: "Streaming",
    description:
      "Respostas em tempo real para experiências de usuário fluidas e responsivas.",
    mockup: <MockStreaming />,
  },
  {
    number: "05",
    title: "Controle granular de permissões",
    description:
      "Acesso por agente, grupo, papel e escopo — nenhum usuário vê mais do que deve.",
    mockup: <MockPermissions />,
  },
  {
    number: "06",
    title: "Gestão segura de chaves",
    description:
      "Armazenamento criptografado e isolado de credenciais de API por cliente e agente.",
    mockup: <MockKeys />,
  },
  {
    number: "07",
    title: "Function calling / tools",
    description:
      "Defina e execute ferramentas customizadas diretamente a partir dos agentes.",
    mockup: <MockFunctionCalling />,
  },
  {
    number: "08",
    title: "MCP para integrações",
    description:
      "Suporte nativo a Model Context Protocol para conectar servidores externos.",
    mockup: <MockMcp />,
  },
  {
    number: "09",
    title: "Observabilidade e métricas",
    description:
      "Logs, custos, latência e erros com granularidade por agente e por usuário.",
    mockup: <MockObservability />,
  },
]

function CapabilityCard({ capability, index }: { capability: Capability; index: number }) {
  return (
    <motion.div
      variants={fadeSlideIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.1 + index * 0.07, ease: EASE_OUT }}
      className="border-gradient relative flex flex-col rounded-3xl bg-gradient-to-tl from-transparent via-black/[0.04] to-transparent p-6 dark:via-white/[0.05] sm:p-8"
    >
      <span className="absolute -top-3.5 left-6 inline-flex items-center rounded-full border border-black/15 bg-white px-3 py-1 text-xs tracking-tight text-neutral-900 dark:border-white/20 dark:bg-neutral-950 dark:text-white">
        {capability.number}
      </span>

      {capability.mockup}

      <h3 className="text-2xl tracking-tighter text-neutral-900 dark:text-white sm:text-3xl">
        {capability.title}
      </h3>
      <p className="mt-2 text-sm tracking-tight text-neutral-600 dark:text-neutral-300 sm:text-base">
        {capability.description}
      </p>
    </motion.div>
  )
}

export function CapabilitiesSection() {
  return (
    <SectionContainer id="capacidades" className="mt-32 mb-0">
      <div className="border-gradient relative rounded-3xl bg-gradient-to-tl from-transparent via-black/[0.04] to-transparent p-6 backdrop-blur dark:via-white/[0.05] sm:p-8">
        {/* Header */}
        <motion.div
          variants={fadeSlideIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
          className="flex flex-wrap items-center gap-4 px-1 sm:gap-6"
        >
          <h2 className="text-[40px] leading-[0.9] tracking-tighter text-neutral-900 dark:text-white sm:text-5xl lg:text-6xl">
            Capacidades corporativas
          </h2>
          <span className="hidden h-10 w-px bg-black/20 dark:bg-white/20 sm:block" />
          <p className="mt-1 max-w-md text-sm tracking-tight text-neutral-600 dark:text-slate-300 sm:text-base">
            Tudo que equipes técnicas precisam para operar IA em escala — com
            seriedade, segurança e rastreabilidade.
          </p>
        </motion.div>
        <div className="mt-4 h-px bg-black/15 dark:bg-white/20" />

        {/* Grid de 9 capacidades */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {CAPABILITIES.map((capability, index) => (
            <CapabilityCard
              key={capability.number}
              capability={capability}
              index={index}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
