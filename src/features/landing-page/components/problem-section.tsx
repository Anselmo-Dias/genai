import { motion } from "motion/react"
import { Cpu, Plug, ShieldX, Shuffle, TrendingDown } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

const fadeSlideIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

type Problem = {
  number: string
  icon: LucideIcon
  title: string
  description: string
}

const PROBLEMS: Problem[] = [
  {
    number: "01",
    icon: Shuffle,
    title: "Múltiplos modelos sem padronização",
    description:
      "Times usando diferentes LLMs sem controle centralizado, gerando inconsistência e retrabalho operacional.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Agentes espalhados e sem governança",
    description:
      "Agentes criados de forma isolada, sem versionamento, permissões ou histórico auditável.",
  },
  {
    number: "03",
    icon: Plug,
    title: "Dificuldade de integrar sistemas",
    description:
      "Conectar APIs, CRMs, ERPs e bases de conhecimento exige esforço técnico elevado a cada nova integração.",
  },
  {
    number: "04",
    icon: ShieldX,
    title: "Risco com credenciais e permissões",
    description:
      "Chaves de API expostas, acessos não segmentados e ausência de controle granular por agente ou usuário.",
  },
  {
    number: "05",
    icon: TrendingDown,
    title: "Baixa visibilidade de custo e uso",
    description:
      "Sem métricas de consumo, latência e falhas, é impossível otimizar ou justificar o investimento em IA.",
  },
]

type ProblemCardProps = {
  problem: Problem
  index: number
  isLast: boolean
}

function ProblemCard({ problem, index, isLast }: ProblemCardProps) {
  const Icon = problem.icon

  return (
    <motion.div
      variants={fadeSlideIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: EASE_OUT }}
      className={cn(
        "group relative p-8 transition-all duration-500 hover:bg-neutral-50 dark:hover:bg-zinc-900/20",
        !isLast &&
          "border-b border-black/10 dark:border-white/10 lg:border-b-0 lg:border-r",
      )}
    >
      {/* linha superior em gradiente (hover) */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F97316] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {/* overlay sutil (hover) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] dark:from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-8">
          <span className="font-mono text-xs font-medium text-neutral-400 dark:text-zinc-600 transition-colors duration-300 group-hover:text-[#F97316]">
            {problem.number}
          </span>
          <div className="p-2 rounded-md bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 text-neutral-500 dark:text-zinc-400 transition-all duration-300 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:border-neutral-300 dark:group-hover:border-zinc-700 group-hover:scale-110">
            <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </div>
        </div>
        <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-3 tracking-tight transition-colors duration-300 group-hover:text-[#F97316]">
          {problem.title}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-zinc-400 leading-relaxed font-sans">
          {problem.description}
        </p>
      </div>
    </motion.div>
  )
}

export function ProblemSection() {
  return (
    <SectionContainer id="problema" className="mt-32 mb-0">
      {/* Header */}
      <div className="relative w-full mb-16">
        <div className="flex flex-col max-w-2xl gap-6 mb-12">
          <motion.div
            variants={fadeSlideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
            className="flex gap-3 items-center"
          >
            <span className="uppercase text-sm font-medium text-neutral-500 tracking-widest">
              O problema
            </span>
          </motion.div>

          <motion.div
            variants={fadeSlideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE_OUT }}
          >
            <h2 className="md:text-6xl text-5xl font-medium text-neutral-900 dark:text-white tracking-tighter font-manrope mb-4">
              O problema que <span className="text-[#F97316]">resolvemos</span>
            </h2>
            <p className="leading-relaxed text-lg font-light text-neutral-600 dark:text-gray-400 max-w-xl">
              Empresas querem adotar IA, mas acabam enfrentando fragmentação de
              fornecedores, falta de controle sobre agentes, dificuldade de
              integrar sistemas, ausência de governança e pouca visibilidade de
              custo e uso. O resultado é uma operação de IA cara, arriscada e
              impossível de escalar com segurança.
            </p>
          </motion.div>
        </div>

        {/* divisores em gradiente no rodapé do header */}
        <div className="pointer-events-none absolute left-0 right-0 -bottom-8 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent" />
        <div className="pointer-events-none absolute left-0 right-0 -bottom-8 h-6 bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent blur-md" />
      </div>

      {/* Grid de problemas */}
      <div className="bg-white dark:bg-black w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 bg-white dark:bg-black w-full border border-black/10 dark:border-white/10">
          {PROBLEMS.map((problem, index) => (
            <ProblemCard
              key={problem.number}
              problem={problem}
              index={index}
              isLast={index === PROBLEMS.length - 1}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
