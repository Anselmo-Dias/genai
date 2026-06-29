import { motion } from "motion/react"

import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

const fadeSlideIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

const STEPS = [
  {
    number: "1",
    title: "Vários agentes, várias funções",
    description:
      "Um agente atende clientes, outro apoia o jurídico, outro vive dentro de um aplicativo e outro é consumido por um sistema. Em pouco tempo, são muitos — espalhados.",
  },
  {
    number: "2",
    title: "Você não enxerga o que cada agente faz",
    description:
      "Sem um ponto central, falta visibilidade da operação: o que cada agente respondeu, quais dados acessou e quais ações executou. Quando ninguém vê o que a IA está fazendo, não há como auditar, corrigir ou confiar.",
  },
  {
    number: "3",
    title: "Usar a LLM direto prende você",
    description:
      "Dá para usar a plataforma de uma LLM de mercado. Mas você fica preso àquela infraestrutura: um único provedor, as regras dele e o controle dele. Trocar de modelo ou aplicar suas próprias políticas vira um problema.",
  },
  {
    number: "4",
    title: "Falta um ponto central",
    description:
      "O que falta é um lugar para configurar, orquestrar e governar todos os agentes — e entregá-los tanto a pessoas quanto a aplicações, com o seu controle, não o do fornecedor.",
  },
]

export function ProblemSection() {
  return (
    <SectionContainer id="conceito" className="mt-32 mb-0">
      {/* Header */}
      <div className="relative w-full mb-16">
        <div className="flex flex-col gap-6 mb-12">
          <motion.div
            variants={fadeSlideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
            className="flex gap-3 items-center"
          >
            <span className="uppercase text-sm font-medium text-[#FF720A] tracking-widest">
              O conceito
            </span>
          </motion.div>

          <motion.div
            variants={fadeSlideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE_OUT }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-900 dark:text-white tracking-tighter font-manrope mb-4">
              Usar IA de forma séria é gerenciar{" "}
              <span className="text-[#FF720A]">muitos agentes</span> — não
              apenas um.
            </h2>
            <p className="leading-relaxed text-lg font-light text-neutral-600 dark:text-gray-400 max-w-xl">
              Toda adoção de IA mais estruturada precisa de uma infraestrutura
              para administrar os vários agentes que passam a existir na
              operação. Sem ela, cada agente vira uma ilha, com seu próprio
              acesso, suas próprias regras e nenhuma visão do conjunto.
            </p>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute left-0 right-0 -bottom-8 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent" />
        <div className="pointer-events-none absolute left-0 right-0 -bottom-8 h-6 bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent blur-md" />
      </div>

      {/* Grid 2×2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
        {STEPS.map((step, index) => (
          <motion.div
            key={step.number}
            variants={fadeSlideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: EASE_OUT }}
            className="group relative p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900/30 transition-all duration-300 hover:border-[#8a5fb0] hover:shadow-[0_10px_30px_-18px_rgba(83,41,113,0.45)]"
          >
            <div className="flex flex-col h-full">
              <span className="text-[2rem] font-extrabold leading-none text-[#8a5fb0] mb-3">
                {step.number}
              </span>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-zinc-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  )
}
