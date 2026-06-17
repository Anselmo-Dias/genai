import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

const fadeSlideIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

type Metric = {
  value: string
  /** Sufixo curto colorido junto ao número (ex.: "+", "%"). */
  suffix?: string
  /** Rótulo inline ao lado do número (ex.: "chaves expostas"). */
  suffixLabel?: string
  /** Destaca o número em laranja + overlay radial. */
  highlight?: boolean
  title: string
  description: string
}

const METRICS: Metric[] = [
  {
    value: "9",
    suffix: "+",
    title: "Provedores de LLM",
    description: "Suportados nativamente com troca sem retrabalho de integração.",
  },
  {
    value: "100",
    suffix: "%",
    highlight: true,
    title: "Rastreabilidade",
    description: "Cada interação registrada com usuário, agente, custo e contexto.",
  },
  {
    value: "1",
    title: "Plataforma unificada",
    description:
      "Para criar, configurar, integrar e monitorar todos os seus agentes.",
  },
  {
    value: "0",
    suffixLabel: "chaves expostas",
    title: "Segurança de credenciais",
    description:
      "Armazenamento criptografado elimina o risco de credenciais vazadas.",
  },
]

function MetricCard({ metric }: { metric: Metric }) {
  const valueColor = metric.highlight
    ? "text-orange-500"
    : "text-neutral-900 dark:text-white"
  const suffixColor = metric.highlight ? "text-orange-400" : "text-orange-500"

  return (
    <div className="group relative bg-white dark:bg-[#050505] hover:bg-neutral-50 dark:hover:bg-zinc-900/50 transition-colors duration-500 p-10 flex flex-col gap-4 overflow-hidden">
      {metric.highlight && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,0.07),transparent_60%)] pointer-events-none" />
      )}

      <div className="relative z-10">
        {metric.suffixLabel ? (
          <div className="flex items-end gap-2 leading-none">
            <span
              className={cn(
                "text-6xl font-medium font-manrope tracking-tighter leading-none",
                valueColor,
              )}
            >
              {metric.value}
            </span>
            <span className="text-base text-neutral-500 dark:text-zinc-500 font-mono mb-1.5">
              {metric.suffixLabel}
            </span>
          </div>
        ) : (
          <div
            className={cn(
              "text-6xl font-medium font-manrope tracking-tighter leading-none",
              valueColor,
            )}
          >
            {metric.value}
            {metric.suffix && <span className={suffixColor}>{metric.suffix}</span>}
          </div>
        )}
      </div>

      <div className="relative z-10">
        <div className="text-base font-semibold text-neutral-900 dark:text-white font-sans mb-1">
          {metric.title}
        </div>
        <p className="text-sm text-neutral-500 dark:text-zinc-500 font-sans leading-relaxed">
          {metric.description}
        </p>
      </div>
    </div>
  )
}

export function WhyItMattersSection() {
  return (
    <SectionContainer id="por-que-importa" className="mt-32 mb-0">
      {/* Statement */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
        <motion.div
          variants={fadeSlideIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          <span className="uppercase tracking-widest text-xs font-medium text-neutral-500">
            Por que isso importa
          </span>
        </motion.div>

        <motion.p
          variants={fadeSlideIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
          className="text-3xl md:text-4xl font-medium text-neutral-900 dark:text-white tracking-tight font-manrope leading-snug mb-5"
        >
          A adoção de IA em empresas não falha por falta de modelos — falha por{" "}
          <span className="text-orange-500">falta de controle</span>.
        </motion.p>

        <motion.p
          variants={fadeSlideIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE_OUT }}
          className="text-lg text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed"
        >
          Nossa plataforma existe para que você possa escalar com confiança.
        </motion.p>
      </div>

      {/* 4 métricas */}
      <motion.div
        variants={fadeSlideIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.4, ease: EASE_OUT }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10"
      >
        {METRICS.map((metric) => (
          <MetricCard key={metric.title} metric={metric} />
        ))}
      </motion.div>
    </SectionContainer>
  )
}
