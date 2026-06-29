import { motion } from "motion/react"

import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

const fadeSlideIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

const CARDS = [
  {
    role: "Como consumidor",
    roleStyle: "bg-[#532971]/10 text-[#532971] dark:text-[#8a5fb0]",
    title: "Os agentes usam o que já existe",
    description: (
      <>
        Os agentes leem dados e acionam serviços do <strong>Connect</strong>, do{" "}
        <strong>NEO</strong> e do <strong>Front</strong> — além dos seus sistemas
        atuais. O contexto que antes exigia desenvolvimento fica disponível de
        forma nativa.
      </>
    ),
  },
  {
    role: "Como provedor",
    roleStyle: "bg-[#FF720A]/10 text-[#e0620a]",
    title: "Os mesmos agentes viram serviço",
    description: (
      <>
        Os agentes ficam disponíveis para essas camadas: embarcados em um
        aplicativo do <strong>Front</strong>, chamados por uma automação ou
        consumidos por outro sistema via API. A inteligência passa a fazer parte
        das suas aplicações.
      </>
    ),
  },
]

export function EcosystemSection() {
  return (
    <SectionContainer id="ecossistema" className="mt-32 mb-0">
      <motion.div
        variants={fadeSlideIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
        className="flex flex-col gap-6 mb-12"
      >
        <span className="uppercase text-sm font-medium text-[#FF720A] tracking-widest">
          Integração nativa com o ecossistema mobileX
        </span>
        <div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-900 dark:text-white tracking-tighter font-manrope mb-4">
            Os agentes consomem e também são{" "}
            <span className="text-[#FF720A]">oferecidos como serviço</span>.
          </h2>
          <p className="text-lg font-light leading-relaxed text-neutral-600 dark:text-gray-400 max-w-2xl">
            O GenAI conversa nativamente com os demais componentes mobileX nos
            dois sentidos — sem integração manual a cada novo caso.
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
            <span className={`inline-block mb-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${card.roleStyle}`}>
              {card.role}
            </span>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3 tracking-tight">
              {card.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-zinc-400 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </motion.div>

      <motion.p
        variants={fadeSlideIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.5, ease: EASE_OUT }}
        className="mt-8 text-lg font-light leading-relaxed text-neutral-600 dark:text-gray-400 max-w-2xl"
      >
        E quando você precisar de mais — um novo app, uma nova integração, mais
        dados — tudo está no mesmo ecossistema, pronto. Você define o ritmo.
      </motion.p>
    </SectionContainer>
  )
}
