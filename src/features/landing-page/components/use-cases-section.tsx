import { motion } from "motion/react"

import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

const fadeSlideIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

const USE_CASES = [
  {
    number: "01",
    title: "Atendimento e suporte interno",
    description:
      "Agentes que respondem dúvidas de colaboradores e clientes com base nas políticas e manuais da empresa.",
  },
  {
    number: "02",
    title: "Consulta a documentos e políticas",
    description:
      "Perguntas sobre contratos, regulamentos e normas internas, com respostas auditáveis e fontes citadas.",
  },
  {
    number: "03",
    title: "Apoio comercial",
    description:
      "Qualificação de leads e suporte às vendas com contexto do CRM, integrado pela plataforma.",
  },
  {
    number: "04",
    title: "Análise de documentos",
    description:
      "Extração, resumo e classificação de contratos, relatórios e documentos financeiros.",
  },
  {
    number: "05",
    title: "Apoio jurídico",
    description:
      "Suporte à análise contratual e à pesquisa, sempre a partir de fontes auditáveis.",
  },
  {
    number: "06",
    title: "IA dentro das suas aplicações",
    description:
      "Agentes oferecidos via API e embarcados em apps, levando inteligência para sistemas que você já usa.",
  },
]

export function UseCasesSection() {
  return (
    <SectionContainer id="casos" className="mt-32 mb-0">
      <motion.div
        variants={fadeSlideIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
        className="flex flex-col gap-6 mb-12"
      >
        <span className="uppercase text-sm font-medium text-neutral-500 tracking-widest">
          Casos de uso
        </span>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-900 dark:text-white tracking-tighter font-manrope">
          O que sua organização faz{" "}
          <span className="text-[#532971]">com o GenAI</span>.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
        {USE_CASES.map((item, index) => (
          <motion.div
            key={item.number}
            variants={fadeSlideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.1 + index * 0.05, ease: EASE_OUT }}
            className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900/30 p-6 transition-all duration-300 hover:border-[#8a5fb0] hover:shadow-[0_10px_30px_-18px_rgba(83,41,113,0.45)]"
          >
            <h3 className="flex items-center gap-3 text-base font-semibold text-neutral-900 dark:text-white mb-3 tracking-tight">
              <span className="grid place-items-center w-8 h-8 flex-none rounded-lg bg-[#532971]/10 text-[#532971] dark:text-[#8a5fb0] text-xs font-bold">
                {item.number}
              </span>
              {item.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-zinc-400 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  )
}
