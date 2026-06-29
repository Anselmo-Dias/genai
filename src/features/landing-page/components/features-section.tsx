import { motion } from "motion/react"

import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

const fadeSlideIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

const FEATURES = [
  {
    title: "Multi-provedor de LLM",
    description:
      "OpenAI, Anthropic, Gemini e modelos open source em uma só interface, com seleção por agente — sem ficar preso a um fornecedor.",
  },
  {
    title: "Base de conhecimento por agente",
    description:
      "Cada agente responde com base nos documentos da sua empresa e cita as fontes da resposta.",
  },
  {
    title: "Memória dos agentes",
    description:
      "O agente lembra do contexto entre conversas — o usuário não precisa repetir tudo a cada interação.",
  },
  {
    title: "Ferramentas e ações via MCP",
    description:
      "Os agentes executam ações em sistemas reais, conectando-se a servidores internos e externos.",
  },
  {
    title: "Histórico e auditoria completos",
    description:
      "Toda conversa e cada ação ficam registradas, com filtros por agente, usuário e período.",
  },
  {
    title: "Controle de acesso granular",
    description:
      "Defina quem pode criar, editar, usar ou ver cada agente — por usuário, grupo e perfil.",
  },
  {
    title: "Gestão segura de chaves",
    description:
      "Credenciais criptografadas e isoladas por cliente e por agente — nada exposto em código ou logs.",
  },
  {
    title: "Políticas e custos por agente",
    description:
      "Defina limites de uso e acompanhe quanto cada agente consome — em tokens e em reais, em tempo real.",
  },
  {
    title: "Confirmação humana e multi-tenant",
    description:
      "Ações sensíveis pedem aprovação humana, e cada cliente opera com dados totalmente isolados.",
  },
]

export function FeaturesSection() {
  return (
    <SectionContainer id="funcionalidades" className="mt-32 mb-0">
      <motion.div
        variants={fadeSlideIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
        className="flex flex-col gap-6 mb-12"
      >
        <span className="uppercase text-sm font-medium text-neutral-500 tracking-widest">
          Funcionalidades
        </span>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-900 dark:text-white tracking-tighter font-manrope">
          Tudo que sua equipe precisa para operar IA{" "}
          <span className="text-[#532971]">com controle</span>.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={fadeSlideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.1 + index * 0.05, ease: EASE_OUT }}
            className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900/30 p-6 transition-all duration-300 hover:border-[#8a5fb0] hover:shadow-[0_10px_30px_-18px_rgba(83,41,113,0.45)]"
          >
            <h3 className="flex items-start gap-2.5 text-base font-semibold text-neutral-900 dark:text-white mb-2 tracking-tight">
              <span className="mt-[7px] flex-none w-2 h-2 rounded-sm bg-[#FF720A]" />
              {feature.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-zinc-400 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  )
}
