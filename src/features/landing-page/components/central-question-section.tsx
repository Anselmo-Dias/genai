import { motion } from "motion/react"

import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

export function CentralQuestionSection() {
  return (
    <SectionContainer className="mt-16 mb-0">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
        className="rounded-3xl bg-[#532971] px-10 py-14 text-center"
      >
        <span className="inline-block mb-5 rounded-full bg-white/[0.14] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-white">
          A pergunta central
        </span>

        <h2 className="mx-auto max-w-[24ch] text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
          E se você tivesse um só lugar para criar, governar e entregar todos os
          seus agentes de IA?
        </h2>

        <p className="mx-auto mt-5 max-w-[620px] text-sm md:text-base leading-relaxed text-white/85">
          Atendendo pessoas no chat ou abastecendo aplicações via API — cada
          agente com o modelo certo, as permissões do usuário e o registro de
          tudo o que faz. É exatamente isso que o mobileX GenAI entrega.
        </p>
      </motion.div>
    </SectionContainer>
  )
}
