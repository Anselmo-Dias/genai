import { motion } from "motion/react"
import { ShieldCheck } from "lucide-react"

import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

const fadeSlideIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

const CONSUMERS = [
  {
    title: "Usuários finais",
    sub: "Pessoas da operação e clientes",
    via: "Acesso via Chat — com login",
  },
  {
    title: "Aplicações e sistemas",
    sub: "Apps, automações e outros sistemas",
    via: "Acesso via API — identidade repassada",
  },
]

const TOOLS = [
  { title: "Connect", sub: "Integrações e conectores" },
  { title: "NEO", sub: "Dados e workflows" },
  { title: "Front", sub: "Apps e portais" },
  { title: "Sistemas externos", sub: "CRM, ERP, bases atuais" },
]

const HUB_PILLS = ["Configuração de agentes", "Governança por identidade", "Multi-provedor de LLM"]

const BOTTOM_CARDS = [
  { title: "Configura", description: "Todos os agentes criados, ajustados e versionados em um só painel." },
  { title: "Orquestra", description: "Orquestração agêntica centralizada, com o modelo e as regras de cada agente." },
  { title: "Conecta", description: "Consome ferramentas, dados e serviços via servidores MCP." },
  { title: "Entrega", description: "Disponibiliza os agentes por chat (pessoas) e por API (aplicações)." },
]


function FlowLine({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-4 text-xs font-semibold text-neutral-400">
      <span className="text-[#8a5fb0]">▲▼</span>
      <span className="rounded-full border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-zinc-900 px-3 py-1">
        {label}
      </span>
      <span className="text-[#8a5fb0]">▲▼</span>
    </div>
  )
}

export function ArchitectureSection() {
  return (
    <SectionContainer id="arquitetura" className="mt-32 mb-0">
      {/* Header */}
      <motion.div
        variants={fadeSlideIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
        className="flex flex-col gap-6 mb-12"
      >
        <span className="uppercase text-sm font-medium text-neutral-500 tracking-widest">
          Como funciona
        </span>
        <div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-900 dark:text-white tracking-tighter font-manrope mb-4">
            O GenAI no centro da sua{" "}
            <span className="text-[#532971]">operação de IA</span>.
          </h2>
          <p className="text-lg font-light leading-relaxed text-neutral-600 dark:text-gray-400 max-w-2xl">
            Você configura seus agentes em um só lugar. O GenAI orquestra esses
            agentes de forma centralizada, conecta-se às suas ferramentas e
            dados, e os entrega para quem precisa — pessoas e sistemas.
          </p>
        </div>
      </motion.div>

      {/* Diagrama */}
      <motion.div
        variants={fadeSlideIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
        className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900/20 p-6 lg:p-10"
      >
        {/* Camada: consumidores */}
        <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.1em] text-neutral-400">
          Quem usa os agentes
        </p>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          {CONSUMERS.map((node) => (
            <div key={node.title} className="rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-zinc-900 p-4 text-center">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">{node.title}</p>
              <p className="mt-0.5 text-xs text-neutral-500">{node.sub}</p>
              <span className="mt-2 inline-block rounded-full bg-[#532971]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#532971] dark:text-[#8a5fb0]">
                {node.via}
              </span>
            </div>
          ))}
        </div>

        <FlowLine label="Chat e API — pedido e resposta" />

        {/* Hub central */}
        <div className="mx-auto max-w-lg rounded-2xl bg-[#532971] px-8 py-6 text-center shadow-[0_18px_40px_-18px_rgba(83,41,113,0.7)]">
          <p className="text-xl font-bold text-white tracking-tight">mobileX GenAI</p>
          <p className="mt-1 text-sm text-white/75">Orquestração central de agentes</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {HUB_PILLS.map((pill) => (
              <span
                key={pill}
                className="rounded-full bg-white/[0.14] px-3 py-1 text-xs font-semibold text-white"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        <FlowLine label="via MCP — consome dados e serviços / disponibiliza agentes" />

        {/* Camada: ferramentas */}
        <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.1em] text-neutral-400">
          Ferramentas, dados e serviços
        </p>
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 lg:grid-cols-4">
          {TOOLS.map((node) => (
            <div key={node.title} className="rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-zinc-900 p-4 text-center">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">{node.title}</p>
              <p className="mt-0.5 text-xs text-neutral-500">{node.sub}</p>
            </div>
          ))}
        </div>

        {/* Trilha de identidade */}
        <div className="relative z-10 mt-8 flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#8a5fb0]/60 bg-[#532971]/5 px-4 py-3 text-sm font-semibold text-[#532971] dark:text-[#8a5fb0]">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          A identidade do usuário é preservada em todas as camadas — do chat ou da API até cada acesso a dados.
        </div>
      </motion.div>

      {/* 4 cards inferiores */}
      <motion.div
        variants={fadeSlideIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.4, ease: EASE_OUT }}
        className="mt-5 grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4"
      >
        {BOTTOM_CARDS.map((card) => (
          <div
            key={card.title}
            className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900/30 p-6 transition-all duration-300 hover:border-[#8a5fb0] hover:shadow-[0_10px_30px_-18px_rgba(83,41,113,0.45)]"
          >
            <h3 className="mb-2 text-base font-semibold tracking-tight text-neutral-900 dark:text-white">
              {card.title}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-zinc-400">
              {card.description}
            </p>
          </div>
        ))}
      </motion.div>
    </SectionContainer>
  )
}
