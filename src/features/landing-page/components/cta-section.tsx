import { motion } from "motion/react"
import { Building2, Calendar, Check, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

const fadeSlideIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

type ValueProp = {
  icon: LucideIcon
  title: string
  description: string
  accent: "green" | "orange" | "blue"
}

const VALUE_PROPS: ValueProp[] = [
  {
    icon: Check,
    title: "Governança desde o primeiro agente",
    description:
      "Permissões, auditoria e rastreabilidade disponíveis desde o início, não como add-on.",
    accent: "green",
  },
  {
    icon: Zap,
    title: "Tempo de valor reduzido",
    description:
      "Templates, fluxo guiado e integrações prontas permitem produção em dias, não meses.",
    accent: "orange",
  },
  {
    icon: Building2,
    title: "Pronto para enterprise e setor público",
    description:
      "Arquitetura multi-tenant, isolamento de dados e conformidade para ambientes exigentes.",
    accent: "blue",
  },
]

const ACCENT_CLASSES: Record<
  ValueProp["accent"],
  { chip: string; hover: string }
> = {
  green: {
    chip: "bg-green-500/15 border-green-500/25 text-green-600 dark:text-green-400",
    hover: "hover:border-green-500/30 dark:hover:border-green-500/20",
  },
  orange: {
    chip: "bg-orange-500/15 border-orange-500/25 text-orange-600 dark:text-orange-400",
    hover: "hover:border-orange-500/30 dark:hover:border-orange-500/20",
  },
  blue: {
    chip: "bg-blue-500/15 border-blue-500/25 text-blue-600 dark:text-blue-400",
    hover: "hover:border-blue-500/30 dark:hover:border-blue-500/20",
  },
}

export function CtaSection() {
  return (
    <SectionContainer className="mt-32 mb-24">
      <motion.div
        variants={fadeSlideIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: EASE_OUT }}
        className="relative flex flex-col items-center overflow-hidden border border-black/10 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,_rgba(249,115,22,0.08)_0%,_#fafafa_70%)] px-8 py-20 text-center dark:border-white/10 dark:bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,_rgba(249,115,22,0.10)_0%,_#050505_70%)] md:px-16 md:py-28"
      >
        {/* Linha de brilho superior */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

        {/* Decorações de canto */}
        <div className="pointer-events-none absolute left-0 top-0 h-16 w-16 border-l border-t border-orange-500/20" />
        <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 border-r border-t border-orange-500/20" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 border-b border-l border-black/10 dark:border-white/5" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 border-b border-r border-black/10 dark:border-white/5" />

        {/* Headline */}
        <h2 className="mb-6 max-w-4xl text-4xl font-medium leading-[1.1] tracking-tight text-neutral-900 dark:text-white font-manrope md:text-5xl lg:text-[3.5rem]">
          Leve sua operação de IA da experimentação para a{" "}
          <span className="text-orange-500">governança em escala</span>.
        </h2>

        {/* Descrição */}
        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 font-sans">
          Centralize agentes, integrações, conhecimento e observabilidade em uma
          única plataforma preparada para ambientes corporativos. Pare de
          gerenciar IA com planilhas e credenciais soltas — comece a operar com
          controle real.
        </p>

        {/* 3 value props */}
        <div className="mb-14 grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3">
          {VALUE_PROPS.map((prop) => {
            const Icon = prop.icon
            const accent = ACCENT_CLASSES[prop.accent]
            return (
              <div
                key={prop.title}
                className={cn(
                  "flex items-start gap-3 border border-black/5 bg-black/[0.02] p-4 text-left transition-colors duration-300 dark:border-white/5 dark:bg-white/[0.02]",
                  accent.hover,
                )}
              >
                <div
                  className={cn(
                    "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border",
                    accent.chip,
                  )}
                >
                  <Icon className="h-3 w-3" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="mb-1 text-sm font-semibold text-neutral-900 dark:text-white font-sans">
                    {prop.title}
                  </div>
                  <p className="text-xs leading-relaxed text-neutral-500 dark:text-zinc-500 font-sans">
                    {prop.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Botão CTA — borda com brilho animado (shimmer) */}
        <a
          href="#"
          className="group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden bg-transparent px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)] dark:text-white"
        >
          <span className="absolute inset-0 -z-20 overflow-hidden">
            <span className="absolute inset-[-100%] block h-[300%] w-[300%] animate-[spin_3s_linear_infinite]">
              <span
                className="absolute inset-0 block"
                style={{
                  background:
                    "conic-gradient(from 225deg, transparent 0, #F97316 90deg, transparent 90deg)",
                }}
              />
            </span>
          </span>
          <span className="absolute inset-[1px] -z-10 bg-[#fafafa] transition-colors duration-300 group-hover:bg-white dark:bg-[#050505] dark:group-hover:bg-[#0A0A0A]" />
          <Calendar className="h-[18px] w-[18px] text-orange-500" strokeWidth={2} />
          Agendar demonstração
        </a>

        {/* Linha inferior */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/[0.08]" />
      </motion.div>
    </SectionContainer>
  )
}
