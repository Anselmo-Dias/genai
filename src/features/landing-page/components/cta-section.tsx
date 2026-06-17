import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { useChatStore } from "@/features/chat/store/chat-store"
import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

const fadeSlideIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

export function CtaSection() {
  const openChat = useChatStore((state) => state.openChat)

  return (
    <SectionContainer className="mt-32 mb-32">
      <motion.div
        variants={fadeSlideIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        className="border-gradient relative overflow-hidden rounded-3xl bg-gradient-to-tr from-transparent via-black/[0.04] to-transparent p-10 backdrop-blur dark:via-white/[0.05] md:p-16 lg:p-20"
      >
        {/* glow superior */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-orange-500/10 blur-[100px]" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-[#F97316]">
            Comece agora
          </span>

          <h2 className="text-4xl font-medium tracking-tighter font-manrope text-neutral-900 dark:text-white md:text-6xl">
            Leve sua operação de IA da experimentação para a{" "}
            <span className="text-[#F97316]">governança em escala</span>.
          </h2>

          <p className="max-w-xl text-lg font-light leading-relaxed text-neutral-600 dark:text-gray-400">
            Unifique provedores de IA, RAG, MCP e observabilidade em uma única
            plataforma corporativa — com rastreabilidade e controle do
            experimento à produção.
          </p>

          <div className="mt-2 flex flex-col items-center gap-6 sm:flex-row">
            {/* CTA primário */}
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-[#F97316] px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:brightness-110"
            >
              Agendar demonstração
              <ArrowRight className="h-4 w-4" />
            </a>

            {/* CTA secundário — abre o chat */}
            <button
              type="button"
              onClick={openChat}
              className="group relative inline-flex items-center gap-2 pb-2 text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white"
            >
              Conversar com o assistente
              <span className="absolute bottom-0 left-0 h-px w-full bg-black/20 dark:bg-white/25" />
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#F97316] transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  )
}
