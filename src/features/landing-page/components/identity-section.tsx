import { motion } from "motion/react"

import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

const fadeSlideIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

const CARDS = [
  {
    title: "No chat",
    description:
      "O usuário se autentica para acessar o chat. O agente passa a agir com a identidade e as permissões dessa pessoa — ele só vê e faz o que ela poderia ver e fazer.",
  },
  {
    title: "Na API",
    description:
      "A aplicação repassa, na chamada, quem é o usuário por trás do agente. Mesmo automatizado, o agente continua associado a uma identidade real — e tudo fica auditável.",
  },
]

export function IdentitySection() {
  return (
    <SectionContainer id="identidade" className="mt-32 mb-0">
      <motion.div
        variants={fadeSlideIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
        className="flex flex-col gap-6 mb-12"
      >
        <span className="uppercase text-sm font-medium text-[#FF720A] tracking-widest">
          Identidade do usuário
        </span>
        <div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-900 dark:text-white tracking-tighter font-manrope mb-4">
            O agente sempre sabe{" "}
            <span className="text-[#FF720A]">em nome de quem</span> está agindo.
          </h2>
          <p className="text-lg font-light leading-relaxed text-neutral-600 dark:text-gray-400 max-w-2xl">
            Em qualquer caminho de acesso, a identidade da pessoa acompanha a
            ação do início ao fim — com as permissões dela e o registro do que
            foi feito.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={fadeSlideIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.4, ease: EASE_OUT }}
        className="grid grid-cols-1 md:grid-cols-2 gap-[22px]"
      >
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900/30 p-6 transition-all duration-300 hover:border-[#8a5fb0] hover:shadow-[0_10px_30px_-18px_rgba(83,41,113,0.45)]"
          >
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3 tracking-tight">
              {card.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-zinc-400 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </motion.div>
    </SectionContainer>
  )
}
