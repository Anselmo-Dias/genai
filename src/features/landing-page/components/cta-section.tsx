import { motion } from "motion/react"

import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

export function CtaSection() {
  return (
    <SectionContainer id="demo" className="mt-32 mb-24">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: EASE_OUT }}
        className="rounded-[26px] bg-gradient-to-br from-[#3f1f57] to-[#532971] px-10 py-16 text-center"
      >
        <h2 className="mx-auto max-w-[22ch] text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug mb-5">
          Um só lugar para criar, orquestrar e governar seus agentes de IA.
        </h2>
        <p className="mx-auto max-w-[640px] text-sm md:text-base leading-relaxed text-white/85 mb-8">
          Pare de espalhar IA por ferramentas e credenciais soltas. Centralize
          seus agentes, com o seu controle e o seu modelo — entregues a pessoas
          e a sistemas, com identidade e auditoria em tudo.
        </p>
        <a
          href="#"
          className="inline-flex items-center bg-[#FF720A] hover:bg-[#e0620a] text-white font-bold text-sm px-6 py-3 rounded-full transition-colors duration-200"
        >
          Agendar demonstração
        </a>
      </motion.div>
    </SectionContainer>
  )
}
