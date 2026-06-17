import type { LucideIcon } from "lucide-react"
import { motion } from "motion/react"
import {
  MessageCircle,
  BookOpen,
  TrendingUp,
  FileText,
  Scale,
  Box,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

const fadeSlideIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

type UseCase = {
  number: string
  icon: LucideIcon
  title: string
  description: string
  featured?: boolean
}

const USE_CASES: UseCase[] = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Atendimento e suporte interno",
    description:
      "Agentes que respondem dúvidas de colaboradores e clientes com base em políticas, manuais e FAQs da empresa.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Q&A sobre documentos e políticas",
    description:
      "Consulta inteligente sobre contratos, regulamentos internos e políticas corporativas com RAG auditável.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Agente comercial",
    description:
      "Qualificação de leads, geração de propostas e suporte ao time de vendas com contexto do CRM integrado.",
  },
  {
    number: "04",
    icon: FileText,
    title: "Análise de documentos",
    description:
      "Extração, resumo e classificação automática de documentos financeiros, contratos e relatórios com alta precisão.",
  },
  {
    number: "05",
    icon: Scale,
    title: "Assistente jurídico",
    description:
      "Apoio à análise contratual, pesquisa legislativa e elaboração de pareceres com base em fontes auditáveis.",
  },
  {
    number: "06",
    icon: Box,
    title: "Agentes com RAG pré-configurado",
    description:
      "Templates prontos para casos comuns que sua equipe pode customizar e publicar em minutos, sem código.",
    featured: true,
  },
]

function UseCaseCard({ useCase }: { useCase: UseCase }) {
  const Icon = useCase.icon

  if (useCase.featured) {
    return (
      <div className="group relative bg-gradient-to-tl from-orange-500/[0.08] to-white p-8 transition-all duration-500 hover:bg-orange-500/5 dark:from-orange-500/[0.06] dark:to-[#050505]">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-8 flex items-start justify-between">
            <span className="font-mono text-xs font-medium text-orange-500/50">
              {useCase.number}
            </span>
            <div className="rounded-md border border-orange-500/20 bg-orange-500/10 p-2 text-orange-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500/20">
              <Icon size={18} strokeWidth={1.5} />
            </div>
          </div>
          <h3 className="mb-3 text-lg font-medium tracking-tight text-orange-600 dark:text-orange-100">
            {useCase.title}
          </h3>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-zinc-400 font-sans">
            {useCase.description}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative bg-white p-8 transition-all duration-500 hover:bg-neutral-50 dark:bg-black dark:hover:bg-zinc-900/60">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-8 flex items-start justify-between">
          <span className="font-mono text-xs font-medium text-neutral-400 transition-colors duration-300 group-hover:text-orange-500 dark:text-zinc-600">
            {useCase.number}
          </span>
          <div className="rounded-md border border-black/10 bg-neutral-100 p-2 text-neutral-500 transition-all duration-300 group-hover:scale-110 group-hover:border-neutral-300 group-hover:text-neutral-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:group-hover:border-zinc-700 dark:group-hover:text-white">
            <Icon size={18} strokeWidth={1.5} />
          </div>
        </div>
        <h3 className="mb-3 text-lg font-medium tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-100">
          {useCase.title}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-zinc-400 font-sans">
          {useCase.description}
        </p>
      </div>
    </div>
  )
}

export function UseCasesSection() {
  return (
    <SectionContainer
      id="casos"
      className="mt-32 mb-24 border-t border-black/10 pt-24 dark:border-white/5"
    >
      {/* Header */}
      <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div className="flex max-w-2xl flex-col gap-4">
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
              Em produção
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
            Casos de uso reais
          </motion.h2>
          <motion.p
            variants={fadeSlideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE_OUT }}
            className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 font-sans"
          >
            Do atendimento ao cliente à análise jurídica, agentes configurados na
            plataforma já operam em processos críticos de empresas que precisam de
            IA com controle e rastreabilidade.
          </motion.p>
        </div>
      </div>

      {/* Grid 3x2 */}
      <motion.div
        variants={fadeSlideIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
        className={cn(
          "grid grid-cols-1 gap-px bg-black/10 dark:bg-white/10 md:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {USE_CASES.map((useCase) => (
          <UseCaseCard key={useCase.number} useCase={useCase} />
        ))}
      </motion.div>
    </SectionContainer>
  )
}
