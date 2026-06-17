import type { ReactNode } from "react"
import { motion } from "motion/react"

import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

const fadeSlideIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

type Step = {
  number: string
  title: string
  description: string
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Definição das políticas corporativas",
    description:
      "Definição das políticas corporativas de uso dos agentes por usuário, agentes e plataformas.",
  },
  {
    number: "02",
    title: "Conecte provedores e credenciais",
    description:
      "Adicione chaves de API de múltiplos provedores de LLM (OpenAI, Anthropic, Azure, etc.) com armazenamento seguro e isolado.",
  },
  {
    number: "03",
    title: "Crie agentes e defina permissões",
    description:
      "Configure agentes com modelo, instruções, parâmetros e controle granular de quem pode acessar, usar e modificar cada agente.",
  },
  {
    number: "04",
    title: "Defina políticas de uso",
    description:
      "Estabeleça diretrizes claras sobre como os agentes devem ser utilizados, incluindo limites de uso, auditoria e conformidade.",
  },
  {
    number: "05",
    title: "Conecte tools e servidores MCP",
    description:
      "Registre ferramentas externas, APIs e servidores MCP para que os agentes possam executar ações em sistemas reais com segurança.",
  },
]

type Detail = {
  label: string
  text: ReactNode
}

const FINAL_STEP = {
  number: "06",
  kicker: "Observabilidade em tempo real",
  title: "Monitore uso, custo e desempenho",
  details: [
    {
      label: "Consumo",
      text: "Acompanhe tokens consumidos por agente, usuário e período com granularidade total.",
    },
    {
      label: "Desempenho",
      text: "Monitore latência e taxa de erro em tempo real para identificar gargalos e otimizar respostas.",
    },
    {
      label: "Custo",
      text: (
        <>
          Controle gastos por agente e provedor com{" "}
          <span className="font-semibold text-orange-400">visibilidade total</span>{" "}
          para justificar e otimizar o investimento em IA.
        </>
      ),
    },
  ] satisfies Detail[],
}

function StepRow({ step, index }: { step: Step; index: number }) {
  return (
    <motion.div
      variants={fadeSlideIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: EASE_OUT }}
      className="group relative border-b border-black/5 dark:border-white/5 transition-colors duration-300 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-x-6 gap-y-4 pt-8 pb-8">
        <div className="col-span-1 md:col-span-3 flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500 transition-colors group-hover:text-neutral-900 dark:group-hover:text-white">
            {step.number}
          </span>
        </div>
        <div className="col-span-1 md:col-span-8 flex flex-col gap-3">
          <span className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
            {step.title}
          </span>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 transition-colors group-hover:text-neutral-800 dark:group-hover:text-neutral-300">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function FinalStepRow() {
  return (
    <motion.div
      variants={fadeSlideIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay: 0.7, ease: EASE_OUT }}
      className="relative border-b border-black/5 dark:border-white/5"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-x-6 gap-y-4 pt-8 pb-8">
        <div className="col-span-1 md:col-span-3 flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">
            {FINAL_STEP.number}
          </span>
          <span className="text-[10px] font-medium text-neutral-500">
            {FINAL_STEP.kicker}
          </span>
        </div>
        <div className="col-span-1 md:col-span-8 flex flex-col gap-3">
          <span className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
            {FINAL_STEP.title}
          </span>
        </div>
        <div className="col-span-1" />
      </div>

      {/* Detalhe expandido */}
      <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-x-8 gap-y-8 pb-12">
        <div className="relative hidden md:block md:col-span-3">
          <div className="absolute right-8 top-0 bottom-4 w-px bg-gradient-to-b from-black/10 dark:from-white/10 to-transparent" />
        </div>
        <div className="col-span-1 md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:pl-0 md:pr-4">
          {FINAL_STEP.details.map((detail) => (
            <div key={detail.label} className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                {detail.label}
              </span>
              <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {detail.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function HowItWorksSection() {
  return (
    <SectionContainer id="como-funciona" className="mt-32 mb-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 mb-20">
        <motion.h2
          variants={fadeSlideIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
          className="text-5xl md:text-6xl font-medium tracking-tighter font-manrope text-neutral-900 dark:text-white"
        >
          Como funciona
        </motion.h2>

        <motion.div
          variants={fadeSlideIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
          className="mb-1 flex items-center gap-2 text-sm font-medium text-neutral-500"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          <span className="uppercase tracking-widest text-xs">Passo a passo</span>
        </motion.div>
      </div>

      <motion.p
        variants={fadeSlideIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.4, ease: EASE_OUT }}
        className="-mt-10 mb-16 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed"
      >
        Um fluxo estruturado e progressivo que leva sua equipe da configuração
        inicial ao monitoramento contínuo em produção — sem complexidade
        desnecessária.
      </motion.p>

      {/* Lista de passos */}
      <div className="flex w-full flex-col border-t border-black/5 dark:border-white/5">
        {STEPS.map((step, index) => (
          <StepRow key={step.number} step={step} index={index} />
        ))}
        <FinalStepRow />
      </div>
    </SectionContainer>
  )
}
