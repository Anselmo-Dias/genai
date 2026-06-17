import type { LucideIcon } from "lucide-react"
import { motion } from "motion/react"
import { Database, Cpu, Smartphone, Shield, Eye, Lock } from "lucide-react"

import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

const fadeSlideIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

type Component = {
  name: string
  label: string
}

const COMPONENTS: Component[] = [
  { name: "Connect", label: "Componente mobileX" },
  { name: "NEO", label: "Componente mobileX" },
  { name: "Front mobileX", label: "Componente mobileX" },
]

type OrbitItem = {
  name: string
  icon: LucideIcon
  transform: string
}

const ORBIT_ITEMS: OrbitItem[] = [
  {
    name: "Connect",
    icon: Database,
    transform: "translate(-50%, -50%) rotate(0deg) translateY(-170px) rotate(0deg)",
  },
  {
    name: "NEO",
    icon: Cpu,
    transform:
      "translate(-50%, -50%) rotate(120deg) translateY(-170px) rotate(-120deg)",
  },
  {
    name: "Front mobileX",
    icon: Smartphone,
    transform:
      "translate(-50%, -50%) rotate(240deg) translateY(-170px) rotate(-240deg)",
  },
]

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

const FEATURES: Feature[] = [
  {
    icon: Shield,
    title: "Contexto pleno",
    description:
      "Cada agente possui visibilidade completa sobre dados e ações do ecossistema mobileX via protocolo MCP.",
  },
  {
    icon: Eye,
    title: "Rastreabilidade absoluta",
    description:
      "Auditoria completa de todas as interações entre o GenAI e os componentes Connect, NEO e Front mobileX.",
  },
  {
    icon: Lock,
    title: "Governança rigorosa",
    description:
      "Controle e segurança de dados em todas as interações entre o GenAI e os componentes do ecossistema, sem integrações manuais.",
  },
]

function ComponentList() {
  return (
    <div className="relative z-10 flex flex-col gap-3">
      {COMPONENTS.map((component) => (
        <div
          key={component.name}
          className="group relative flex cursor-default items-center gap-3 rounded-xl border border-black/10 bg-black/[0.02] p-3 transition-all duration-300 hover:border-orange-500/20 hover:bg-orange-500/5 dark:border-white/5 dark:bg-white/[0.03]"
        >
          <div className="hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-black/10 bg-black/[0.04] transition-colors group-hover:border-orange-500/30 dark:border-white/10 dark:bg-white/5 md:flex">
            <div className="h-3 w-3 rounded-sm bg-black/30 transition-colors group-hover:bg-orange-400 dark:bg-white/30" />
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-900 dark:text-white font-sans">
              {component.name}
            </div>
            <div className="text-xs text-neutral-500 font-sans">
              {component.label}
            </div>
          </div>
          <div className="absolute right-3 top-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e] md:static md:right-auto md:top-auto md:ml-auto" />
        </div>
      ))}
    </div>
  )
}

function Orbit() {
  return (
    <div className="group/orbit relative flex min-h-[450px] items-center justify-center overflow-hidden rounded-3xl border border-black/10 bg-neutral-50 dark:border-white/10 dark:bg-[#0A0A0A]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.15)_0%,_rgba(0,0,0,0)_70%)] opacity-80" />

      <div className="relative flex h-full w-full scale-[0.65] items-center justify-center transition-transform duration-500 md:scale-100">
        {/* Anéis concêntricos */}
        <div className="pointer-events-none absolute flex items-center justify-center opacity-20">
          <div className="h-[180px] w-[180px] rounded-full border border-orange-500/30" />
        </div>
        <div className="pointer-events-none absolute flex items-center justify-center opacity-20">
          <div className="h-[340px] w-[340px] rounded-full border border-orange-500/20" />
        </div>
        <div className="pointer-events-none absolute flex items-center justify-center opacity-10">
          <div className="h-[500px] w-[500px] rounded-full border border-orange-500/10" />
        </div>

        {/* Hub central */}
        <div className="relative z-20 flex h-24 w-24 items-center justify-center rounded-full border border-orange-500/50 bg-[#120a05] shadow-[0_0_50px_-5px_rgba(249,115,22,0.5)]">
          <div className="absolute inset-0 animate-ping rounded-full border border-orange-500 opacity-20" />
          <span className="text-sm font-medium text-white font-sans">GenAI</span>
        </div>

        {/* Anel orbital */}
        <div className="animate-orbit absolute inset-0 flex items-center justify-center">
          {ORBIT_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.name}
                className="absolute left-1/2 top-1/2 z-10"
                style={{ transform: item.transform }}
              >
                <div className="animate-orbit-reverse flex flex-col items-center gap-2">
                  <div className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl border border-black/10 bg-white text-neutral-500 shadow-lg transition-all hover:scale-110 hover:border-orange-500/30 hover:bg-orange-500/5 hover:text-orange-500 dark:border-white/10 dark:bg-black dark:text-neutral-400 dark:hover:text-white">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="whitespace-nowrap font-mono text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
                    {item.name}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function ArchitectureSection() {
  return (
    <SectionContainer id="arquitetura" className="mt-32 mb-0">
      <motion.div
        variants={fadeSlideIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
        className="border-gradient relative rounded-3xl bg-gradient-to-tr from-transparent via-black/[0.04] to-transparent p-8 backdrop-blur dark:via-white/[0.05] lg:p-10"
      >
        {/* Header */}
        <div className="mb-0 flex items-center justify-between">
          <div className="flex flex-col gap-3 text-left">
            <h2 className="text-4xl font-light tracking-tight text-neutral-900 dark:text-white font-bricolage md:text-5xl">
              Arquitetura integrada mobileX
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 font-sans">
              O GenAI atua como um hub central, conectando-se nativamente aos
              componentes Connect, NEO e Front mobileX através do protocolo
              universal MCP (Model Context Protocol), unificando inteligência,
              dados e ações.
            </p>
          </div>
        </div>

        {/* Grid principal */}
        <div className="mt-12 mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Card esquerdo */}
          <div className="group/card relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/10 bg-white p-8 transition-colors duration-500 hover:border-black/20 dark:border-white/10 dark:bg-[#0A0A0A] dark:hover:border-white/20 md:p-10">
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-orange-500/10 opacity-50 blur-[100px] transition-opacity duration-500 group-hover/card:opacity-100" />

            <div className="relative z-10 mb-8">
              <p className="mb-4 mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 font-sans">
                Essa arquitetura hub-and-spoke, operada via servidor MCP, garante
                que cada agente possua contexto pleno e rastreabilidade absoluta.
              </p>
              <p className="text-sm leading-relaxed text-neutral-500 font-sans">
                Seus agentes já sabem o que acontece no Connect, no NEO e no
                Front — sem integração manual. O contexto que antes exigia
                desenvolvimento fica disponível nativamente.
              </p>
            </div>

            <ComponentList />
          </div>

          {/* Card direito: órbita */}
          <Orbit />
        </div>

        {/* Bottom features */}
        <div className="grid grid-cols-1 gap-12 border-t border-black/10 pt-12 dark:border-white/5 md:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="group flex flex-col items-start">
                <div className="mb-6 h-px w-8 bg-neutral-400 transition-colors duration-300 group-hover:bg-orange-500 dark:bg-neutral-700" />
                <Icon
                  className="mb-5 text-neutral-500 transition-colors duration-300 group-hover:text-orange-500 dark:text-neutral-400"
                  size={24}
                  strokeWidth={1.5}
                />
                <h3 className="mb-3 text-xl text-neutral-900 dark:text-white font-sans">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600 transition-colors group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-300 font-sans">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </motion.div>
    </SectionContainer>
  )
}
